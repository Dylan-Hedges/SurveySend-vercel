//Requires in API keys
const keys = require('../config/keys');
//Requires in Stripe & passes in Stripe key
const stripe = require('stripe')(keys.stripeSecretKey);
//Middleware - checks if user is logged in
const requireLogin = require('../middlewares/requireLogin');


module.exports = (app) => {
  //RH used to increase number of credits & charge user (Stripe)
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //Specifies the amount to charge the user, currency and description text - takes in Stripe auth token
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '5 credits for $5',
      source: req.body.id
    });
    //Updates the user model (local) - adds 5 credits
    req.user.credits +=5;
    //Saves it to the DB
    const user = await req.user.save();
    //Sends updated user back to the browser
    res.send(user);
  });
};
