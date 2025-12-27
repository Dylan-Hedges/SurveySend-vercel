const { Resend } = require('resend');
const keys = require('../config/keys');

//Creates Mailer object that is sent to the email provider
class Mailer {
  constructor({ subject }, recipientEmail, content) {
    this.resend = new Resend(keys.resendApiKey);
    //Who the email is from
    this.from = keys.resendSender;
    //The subject of the email
    this.subject = subject;
    //The body of the email (HTML content)
    this.html = content;
    //Who it is being sent to - single recipient email
    this.recipient = recipientEmail;
  }

  //Sends email using Resend API
  async send() {
    const emailData = {
      from: this.from,
      to: this.recipient,
      subject: this.subject,
      html: this.html,
    };

    console.log('Sending email with data:', {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      htmlLength: emailData.html?.length
    });

    const response = await this.resend.emails.send(emailData);
    return response;
  }
}

module.exports = Mailer;
