module.exports = {
  requireAuth: async (req, res, next) => {
    console.log(req.session,"requireAuth");
    if(req.isAuthenticated()) next();
    else res.status(401).send({ redirect: "/auth/login" });
  }
}
