const _ = require('lodash');
const {Path} = require('path-parser');
//Helpers than can be used to parse URLs - comes with Node
const {URL} = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
//Imports the survey model class
const Survey = mongoose.model('surveys');

module.exports = (app) => {
  //Route Handler that retrives the users surveys
  app.get('/api/surveys', requireLogin, async (req, res) => {
    //Find all surveys for a particular user - compares the logged user id (req.user.id) with user ids in Mongo
    const surveys = await Survey.find({_user: req.user.id})
    //Specifies not to return the list of recipients with the surveys - Mongoose query, prevents huge requests being returned due to the recipients sub-document collection
    .select({recipients: false});
    //Sends back the surveys to the browser
    res.send(surveys);
  });


  //RH that displays text after clicking Yes or No - :surveyID & :choice are wildcards
  app.get('/api/surveys/:surveyId/:choice', (req, res) =>{
    res.send('Thanks for voting');
  });

  //RH to create a new survey & send to recipients
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) =>{
    const {title, subject, body, recipients} = req.body;
    //Creates a new instance of the Survey
    const survey = new Survey({
      //Survey title
      title: title,
      //Email subject
      subject: subject,
      //Email body
      body: body,
      //Recipients List - Mongoose automatically creates sub document collection -Takes string of email addres and splits it into an array of strings, maps over each element and turns it into an array of objects
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      //Points at the user who owns the survey - this is the id genreated by Mongo
      _user: req.user.id,
      //Records when survey is sent
      dateSent: Date.now()
    });
    //Creates a new instance of the mail object - passes in the survey (subject & recipients) data & the email template
    const mailer = new Mailer(survey, surveyTemplate(survey));
    //Error Handeling - Tries the below and returns error code if there is an issue
    try{
      //Sends the Mailer object to the sendgrid API (email provider)
      await mailer.send();
      //Saves the survey to the DB
      await survey.save();
      //Reduces user credits by 1
      req.user.credits -= 1;
      //Saves the user (overwrites the old one)
      const user = await req.user.save();
      //Send the updated user model to the browser so that the credits can update in header
      res.send(user);
    } catch(err){
      res.status(422).send(err);
    }
  });

  //RH that deletes a survey
  app.post('/api/surveys/deletesurvey', async (req, res) => {
    //Mongoose query that matches the passed in survey id in the MongoDB and deletes that survey (deletes 1 document) - await is required as this request must be completed before finding all the surveys for that user again, otherwise the page will not reflect the deleted survey
    await Survey.deleteOne({_id: req.body.surveyid})
    //Sends the query to the MongoDB to be executed
    .exec();;
    //Find all surveys for a particular user - compares the logged user id (req.user.id) with user ids in Mongo
    const surveys = await Survey.find({_user: req.user.id}).select({recipients: false});
    //Send back the array of surveys to the AC
    res.send(surveys);
  });

  //RH for updating DB with responses - URL is created when user clicks yes or no, extracts survey id, response & email, MongoDB query that searches DB for survey and updates response = true and +1 to yes or no count
  app.post('/api/surveys/webhooks',(req, res) => {
    //Extracts the surveyId and choice from the URL
    const p = new Path('/api/surveys/:surveyId/:choice');
    //Chains .map().compact().uniqBy().values() without needing temporary varibles inbetween each
    _.chain(req.body)
      // Maps over & extracts the survey id and choice from the URL that is generated after the user clicks yes or no
      .map(({ email, url }) => {
        //Extracts the route part of the URL % saves the surveyId & choice into a new object (will be a new object or null if there was no surveyId or choice)
        const match = p.test(new URL(url).pathname);
        //If there is an object, return an object with only the email, survey id & choice (yes or no)
        if (match){
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      //Removes any undefined elements
      .compact()
      //Removes any elements that have a duplicate email AND surveyId
      .uniqBy('email', 'surveyId')
      //For each element in the array extract surveyId, email & choice then execute function
      .each(({surveyId, email, choice}) => {
        //Finds and updates a survey with user responds - Mongo query executed on MongoDB side, more effective as we dont pass data Mongo <-> Express
        Survey.updateOne(
        {
          //Find a survey with a matching survey id AND email AND responded = false
          _id: surveyId,
          recipients:{
            $elemMatch: { email: email, responded: false }
          }
        },
        {
          //Increases yes or no by 1
          $inc:{ [choice]: 1 },
          //Sets responded to true so that user cant vote again
          $set: { 'recipients.$.responded': true},
          //Sets a new last responded time so client knows if responses are past deadline or if survey needs to be stopped
          lastResponded: new Date()
        }
        //Sends the query to the MongoDB to be executed
        ).exec();
      })
      //Returns the value (array)
      .value();
      res.send({});
  });

};
