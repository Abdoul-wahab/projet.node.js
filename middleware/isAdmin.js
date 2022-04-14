module.exports = function isAdmin(req, res, next) {
    if (req.user.role == 'admin') {
      next();
    } else {
      res.send(401, "Unauthorized");
    }
};