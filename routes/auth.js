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
    const user_email = req.user.unique_name;
    try {
      const user = await User.findByPk(user_email);
      if (user) {
        req.session.user = user;
        const admin = await Admin.findOne({ where: {admin_id: user_email } });
        let permission = {};
        if (admin) {
          req.session.admin = admin;
          permission = await admin.getPermissions();
          req.session.admin.permission = permission;
        }
        res.redirect("/");
      }
      else {
        res.redirect("/");
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
