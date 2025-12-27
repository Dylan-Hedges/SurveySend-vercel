//Keys for production - access Heroku environment variables
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
	resendApiKey: process.env.RESEND_API_KEY,
  resendSender: process.env.RESEND_SENDER,
  redirectDomain: process.env.REDIRECT_DOMAIN
}
