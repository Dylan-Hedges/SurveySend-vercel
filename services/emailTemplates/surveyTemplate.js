const keys = require('../../config/keys');
//Return HTML for email
module.exports = (survey, recipientEmail) => {
  //Defines how email to recipients will look - uses HTML, ensure the first ` is on the same line as return
  return`
      <html>
        <body>
          <div style="text-align: center;">
            <h3>I'd like your input</h3>
            <p>Please answer the following question</p>
            <p>${survey.body}</p>
            <div>
              <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes?email=${encodeURIComponent(recipientEmail)}">Yes</a>
            </div>
            <div>
              <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no?email=${encodeURIComponent(recipientEmail)}">No</a>
            </div>
          </div>
        </body>
      </html>
    `;
};
