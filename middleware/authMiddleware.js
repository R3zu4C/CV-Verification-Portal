module.exports = {
  requireAuth: async (req, res, next) => {
    console.log(req.headers, "cookie");
    if(req.isAuthenticated()) next();
    else res.status(401).send({ redirect: "/auth/login" });
  }
}
