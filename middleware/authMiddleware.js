module.exports = {
  requireAuth: async (req, res, next) => {
    if (!req.session || !req.session.user) {
      console.log("User is not logged in");
      res.send({ redirect: "auth/login" });
    }
    else {
      console.log("User is logged in");
      next();
    }
  }
}