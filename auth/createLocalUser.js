var insertWithLocalCredential = require('./mongo').insertWithLocalCredential

module.exports = function (users) {
  return function (req, res, next) {
    insertWithLocalCredential(users, req.body.username, req.body.password).then(function (user) {
      req.login(user, function(err) {
        if (err) { return next(err); }
        req.flash('success', "Bienvenue !")
        return res.redirect(req.session.returnTo || '/');
      })
    }, function (err) {
      if (err.message === 'userAlreadyExists') {
        req.flash('error', "Cet utilisateur existe déjà")
        return res.redirect('/signup')
      }
      next(err)
    })
  }
}
