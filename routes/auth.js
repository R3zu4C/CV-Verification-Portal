const router = require("express").Router();
const passport = require("passport");
<<<<<<< HEAD
const {
  login,
  loginCallback,
  logout,
} = require("../controllers/authController");

router.get("/azureadoauth2", passport.authenticate("azure_ad_oauth2"));

router.get("/login", login);
=======
const { loginCallback, logout } = require("../controllers/authController");

router.get("/azureadoauth2", passport.authenticate("azure_ad_oauth2"));

router.get('/login', (req, res) => res.redirect('/auth/azureadoauth2'));
>>>>>>> 432db78e288b315d7ce79da3cfc83d53f7436476

router.get(
  "/azureadoauth2/callback2",
  passport.authenticate("azure_ad_oauth2", { failureRedirect: "/login" }),
  loginCallback
);

router.get("/logout", logout);

module.exports = router;
