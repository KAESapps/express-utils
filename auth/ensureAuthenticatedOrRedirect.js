// route middleware to ensure user is logged in
module.exports = function (unauthenitcatedRedirect) {
  return function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect(unauthenitcatedRedirect);
  }
}
