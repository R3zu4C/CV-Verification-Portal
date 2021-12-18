const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy;
const passport = require("passport");
const jwt = require('jsonwebtoken');

passport.use(new AzureAdOAuth2Strategy({
    clientID: '60e0ddff-dae2-47eb-8d4e-05e24635727e',
    clientSecret: 'LlY7Q~oRuSomYAhAMO5ZHCkPnb7Gyw5N-ezAZ',
    callbackURL: 'http://localhost:3000/auth/azureadoauth2/callback2' // dont you dare change this
    // resource: '00000002-0000-0000-c000-000000000000',
    // tenant: 'iitg.ac.in.onmicrosoft.com'
},
    function (accessToken, refresh_token, params, profile, done) {
        var waadProfile = jwt.decode(params.id_token);

        // User.findOrCreate({ id: waadProfile.upn }, function (err, user) {
        //     done(err, user);
        // });
        console.log(waadProfile);
        // console.log(params);
        // console.log(profile);
        done(null, waadProfile);
    }));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});