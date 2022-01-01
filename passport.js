const AzureAdOAuth2Strategy = require("passport-azure-ad-oauth2").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

passport.use(
  new AzureAdOAuth2Strategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_CALLBACK_URL,
    },
    (accessToken, refresh_token, params, profile, done) => {
      const waadProfile = jwt.decode(params.id_token);
      
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
