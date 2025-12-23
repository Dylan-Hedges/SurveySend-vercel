const proxy = require('http-proxy-middleware');

//Proxy for localtunnel - when in dev environment and need to test webhook data (SendGrid recording Yes & No responses in emails)
module.exports = function(app) {
  app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
  app.use(proxy('/api/**', { target: 'http://localhost:5000' }));
};
