module.exports = {
  requireAuth: async (req, res, next) => {
    if(req.isAuthenticated()) next();
    else res.send({ redirect: "/auth/login" });
  }
}
