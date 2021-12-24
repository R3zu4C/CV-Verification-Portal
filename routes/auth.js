const router = require("express").Router();
const passport = require("passport");
const {
  login,
  loginCallback,
  logout,
  status,
} = require("../controllers/authController");

router.get("/azureadoauth2", passport.authenticate("azure_ad_oauth2"));

router.get("/login", login);

router.get(
  "/azureadoauth2/callback2",
  passport.authenticate("azure_ad_oauth2", { failureRedirect: "/login" }),
  loginCallback
);

router.get("/status", status);

router.get("/logout", logout);

module.exports = router;
