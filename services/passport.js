const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require ('../config/keys');

//Pulls  the 'user' model class from mongoose - used to create collections in MongoDB
const User = mongoose.model('users');

//Inserts id into cookie - we use the id created in Mongo as not everyone has a Google profile.id and may want to sign in using Twitter, Facebook etc.
passport.serializeUser((user, done)=>{
  done(null, user.id);
});

//Takes id in cookie and turns it into a user - added in the request to a route handler as req.user
passport.deserializeUser((id, done)=>{
  User.findById(id)
    .then(user =>{
      done(null, user);
    })
});

//Sets up passport - passport.use() tells app you want to authenticate with a strategy; (new GoogleStrategy()) specifies you want to use Google Passport Strategy (creates new isntance)
passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  //Executes function to find user in DB for login
  async (accessToken, refreshToken, profile, done) => {
    //Checks to see if user is already in the DB
    const existingUser = await User.findOne({ googleId: profile.id})
      if(existingUser){
        //User exists in the DB - end the callback
        done(null, existingUser);
      }else{
        //User doesnt exist in DB - Create a new record in the MongoDB (model instance), user - this is a new model instance returned after saving to the DB
        const user = await new User({ googleId: profile.id }).save()
        done(null, user);
      }
    }
  )
);
