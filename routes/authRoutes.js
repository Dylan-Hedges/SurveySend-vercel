const passport = require('passport');

module.exports = (app) => {
  //Route Handler to authenticate with Google landing page - specifies we want to authenticate with google and what info we want from the users account
  app.get( '/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  //RH to get Google profile info  - puts user on hold, sends code to google, gets back user info
  app.get(
    '/auth/google/callback',
    //Uses passport to authenticate with google & get back user info
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  //RH to log user out
  app.get('/api/logout', (req, res)=>{
    //Logs out user
    req.logout();
    //Redirects user back to main page
    res.redirect('/');
  });

  //RH to check current user logged in
  app.get('/api/current_user', (req, res) => {
    //Send back page to browser with logged in users id
    res.send(req.user);
  });
}
