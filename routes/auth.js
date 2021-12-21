const router = require("express").Router();
const passport = require("passport");
const { User, Admin } = require("../models/index")

router.get("/azureadoauth2", passport.authenticate("azure_ad_oauth2"));

router.get('/login', (req, res)=> res.redirect('/auth/azureadoauth2'));

router.get(
  "/azureadoauth2/callback2",
  passport.authenticate("azure_ad_oauth2", { failureRedirect: "/login" }),
  async (req, res) => {
    // Successful authentication, redirect home.
    let user_email = req.user.unique_name;
    try {
      let user = await User.findByPk(user_email);
      if (user) {
        req.session.user = user;
        let admin = await Admin.findOne({ where: {email: user_email } });
        let permission = {};
        if (admin) {
          req.session.admin = admin;
          console.log(admin);
          permission = await admin.getPermissions();
          req.session.admin.permission = permission;
          console.log(permission);
        }

        res.send(JSON.stringify({ user, admin, permission }));
      }
      else {
        res.send(JSON.stringify("User not found"));
      }

    }
    catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect("/");
});

module.exports = router;
