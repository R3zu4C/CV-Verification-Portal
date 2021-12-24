const router = require("express").Router();
const passport = require("passport");
const {
  login,
  loginCallback,
  logout,
} = require("../controllers/authController");

router.get("/azureadoauth2", passport.authenticate("azure_ad_oauth2"));

router.get("/login", login);

router.get(
  "/azureadoauth2/callback2",
  passport.authenticate("azure_ad_oauth2", { failureRedirect: "/login" }),
  loginCallback
);

router.get("/logout", logout);

module.exports = router;
