const router  = require("express").Router();
const passport = require("passport");

router.get('/azureadoauth2',
    passport.authenticate('azure_ad_oauth2'));


router.get('/azureadoauth2/callback2',
    passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        
        res.send(JSON.stringify(req.user));
    });

module.exports = router;