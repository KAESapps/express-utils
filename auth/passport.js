var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var bcrypt   = require('bcrypt-nodejs');
var ObjectID = require('mongodb').ObjectID

module.exports = function (users) {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  })

  passport.deserializeUser(function (id, done) {
    users.find({'_id': ObjectID(id)}).limit(1).next(done)
  })

  passport.use('local', new LocalStrategy(function(username, password, done) {
    users.find({'auth.local.username': username}).limit(1).next(function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (bcrypt.compareSync(password, user.auth.local.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    })
  }))
  return passport
}
