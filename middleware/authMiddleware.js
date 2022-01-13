module.exports = {
  requireAuth: async (req, res, next) => {
    if(req.isAuthenticated()) next();
    else res.status(401).send({ redirect: "/auth/login" });
  }
}
