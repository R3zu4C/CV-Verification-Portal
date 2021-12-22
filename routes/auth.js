const router = require("express").Router();
const passport = require("passport");
const { loginCallback, logout } = require("../controllers/authController");

router.get("/azureadoauth2", passport.authenticate("azure_ad_oauth2"));

router.get('/login', (req, res) => res.redirect('/auth/azureadoauth2'));

router.get(
  "/azureadoauth2/callback2",
  passport.authenticate("azure_ad_oauth2", { failureRedirect: "/login" }),
  loginCallback
);

router.get("/logout", logout);

module.exports = router;
