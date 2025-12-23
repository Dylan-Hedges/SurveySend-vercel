const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
//Must come before Passport.js as the model needs to be defined first
require('./models/user');
require('./models/Survey');
//Must come after User.js as model can only be called after it is defined
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

//----------APP MIDDLEWARE--------
//Parses POST, PUT, PATCH requests and assigns it to req.body (middleware)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Enables cookes in our App (using Express) - sets time it lasts (milliseconds) & an encryption key (a random string used to encrypt the cookie)
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
//----Tells passport to use cookies to manage authentication----
app.use(passport.initialize());
app.use(passport.session());

//----Passes in Express to auth routes--- Calls the arrow function in authRoutes.js passes in app
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//-------PRODUCTION CONFIG-------
if (process.env.NODE_ENV === 'production'){
  //Look for a specific file in the client/build folder e.g main.js
  app.use(express.static('client/build'));
  //Return index.html if route not found (e.g react-router route, catach all - all other route matching has failed & cant find specific file)
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//----Listen on the Heroku environment variable OR port 5000----
const PORT = process.env.PORT || 5000;
app.listen(PORT);
