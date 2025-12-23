const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//Creates Mailer object that is sent to the email provider
class Mailer extends helper.Mail{
  constructor({ subject, recipients}, content){
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    //Who the email is from
    this.from_email = new helper.Email(keys.sendGridSender);
    //The subject of the email
    this.subject = subject;
    //The body of the email
    this.body = new helper.Content('text/html', content);
    //Who it is being sent to
    this.recipients = this.formatAddresses(recipients);

    //SendGrid required helper functions
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }
  //Formats each email in the array with the sendgrid helper function and returns them in a new array
  formatAddresses(recipients){
    return recipients.map(({email}) =>{
      return new helper.Email(email);
    });
  }
  //SendGrid Required config - Helper function that set up tracking for links in emails (changes links)
  addClickTracking(){
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  //SendGrid Required config - Adds Recipients to the personalize object
  addRecipients(){
    const personalize = new helper.Personalization();
    //For each formatted recipient add it to the personalize object then call addPersonalization on the object
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
  //Sends Mailer object to sendgrid API
  async send(){
    //Creates the request (converts to JSON)
    const request = this.sgApi.emptyRequest({
      method:'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    //Sends the request to sendgrid API
    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
