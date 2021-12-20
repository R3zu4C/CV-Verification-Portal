const router = require("express").Router();
const passport = require("passport");
const { User, Admin } = require("../models/index")

router.get("/azureadoauth2", passport.authenticate("azure_ad_oauth2"));

router.get(
  "/azureadoauth2/callback2",
  passport.authenticate("azure_ad_oauth2", { failureRedirect: "/login" }),
  async (req, res) => {
    // Successful authentication, redirect home.
    let user_email = req.user.unique_name;
    try {
      let user = await User.findOne({ where: { email: user_email } });
      if (user) {
        req.session.user = user;
        let admin = await Admin.findByPk(user.s_id);
        if (admin) {
          req.session.admin = admin;
          console.log(admin);
          let permission = admin.getPermissions()
          console.log(permission);
        }

        res.send(JSON.stringify({ user, admin }));
      }
      else {
        res.send("User not found");
      }

    }
    catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

module.exports = router;
