const AzureAdOAuth2Strategy = require("passport-azure-ad-oauth2").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

passport.use(
  new AzureAdOAuth2Strategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_CALLBACK_URL, // dont you dare change this
      // resource: '00000002-0000-0000-c000-000000000000',
      // tenant: 'iitg.ac.in.onmicrosoft.com'
    },
    function (accessToken, refresh_token, params, profile, done) {
      const waadProfile = jwt.decode(params.id_token);

      // User.findOrCreate({ id: waadProfile.upn }, function (err, user) {
      //     done(err, user);
      // });
      // console.log(waadProfile);
      // console.log(params);
      // console.log(profile);
      done(null, waadProfile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
