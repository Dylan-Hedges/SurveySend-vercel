const { Resend } = require('resend');
const keys = require('../config/keys');

//Creates Mailer object that is sent to the email provider
class Mailer {
  constructor({ subject, recipients }, content) {
    this.resend = new Resend(keys.resendApiKey);
    //Who the email is from
    this.from = keys.resendSender;
    //The subject of the email
    this.subject = subject;
    //The body of the email (HTML content)
    this.html = content;
    //Who it is being sent to - extract email addresses
    this.recipients = recipients.map(({ email }) => email);
  }

  //Sends email using Resend API
  async send() {
    const response = await this.resend.emails.send({
      from: this.from,
      to: this.recipients,
      subject: this.subject,
      html: this.html,
      // Resend enables click tracking by default
    });
    return response;
  }
}

module.exports = Mailer;
