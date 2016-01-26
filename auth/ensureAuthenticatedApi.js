// route middleware to ensure user is logged in
module.exports = function (req, res, next) {
  // console.log("authenticated api", req.isAuthenticated())
  if (req.isAuthenticated()) return next()
  res.status(403).end()
}
