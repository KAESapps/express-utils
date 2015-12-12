var express  = require('express');
var flash    = require('connect-flash');
var renderPage = require('express-utils/renderPage')
var ensureAuthenticatedOrRedirect = require('express-utils/auth/ensureAuthenticatedOrRedirect')

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var ngAdminDefault = require('./handlers/default')
var ngAdminUsers = require('./handlers/users')
var config = require('./config')[process.env.NODE_ENV || 'dev']

module.exports = function (db) {
  var app = express();
  app.locals.title = "winwinks admin"
  // models
  var admins = db.collection('admins')
  var guests = db.collection('guests')
  var hoteliers = db.collection('hoteliers')
  var hotels = db.collection('hotels')
  var reservations = db.collection('reservations')
  var contrats = db.collection('contrats')

  // common middlewares
  app.use(morgan('dev')); // log every request to the console
  app.use(cookieParser()); // read cookies (needed for auth)
  app.use(bodyParser.json()); // get information from html forms
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set('view engine', 'hbs');
  app.use(session({ secret: config.sessionSecret })); // session secret
  app.use(flash()); // use connect-flash for flash messages stored in session
  var passport = require('express-utils/auth/passport')(admins)
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  console.info('middlewares loaded')

  app.get('/scrap', require('./scrap')(hotels))
  // html routes
  app.route('/login')
    .get(renderPage('login.hbs'))
    .post(passport.authenticate('local', {
       failureRedirect: '/login',
       successRedirect: '/',
       failureFlash: true,
    }))
  app.get('/logout', require('express-utils/auth/logout'))


  // api routes
  //app.use(ensureAuthenticatedOrRedirect('/login'))
  app.use(express.static('static'))
  app.use('/api', express.Router()
    .use('/admins', ngAdminUsers(admins))
    .use('/guests', ngAdminUsers(guests))
    .use('/hoteliers', ngAdminUsers(hoteliers))
    .use('/hotels', ngAdminDefault(hotels))
    .use('/reservations', ngAdminDefault(reservations))
    .use('/contrats', ngAdminDefault(contrats))
  )
  console.info('routes loaded')

  return app
}
