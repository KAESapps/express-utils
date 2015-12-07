// store the requested url in req.session.returnTo to allow passport to return after authentication, except for the list of paths provided
module.exports = function (exceptions) {
  return function (req, res, next) {
    var path = req.path
    // TODO: test regex exceptions
    if (exceptions.indexOf(path) < 0) {
      req.session.returnTo = path
    }
    next()
  }
}
