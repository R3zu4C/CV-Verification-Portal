module.exports = {
  requireAuth: async (req, res, next) => {
    // console.log(req.session,"requireAuth");
    if(req.isAuthenticated()) {
      console.log("Authentication Successful!!")
      next();}
    else res.status(401).send({ redirect: "/auth/login" });
  }
}
