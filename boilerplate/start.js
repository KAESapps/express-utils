var http = require('http');
var port = process.env.PORT || 3000;

var MongoClient = require('mongodb').MongoClient
var config = require('./config')[process.env.NODE_ENV || 'dev']

// open db connection before starting server
MongoClient.connect(config.dbUrl).then(function (db) {
  console.info('db opened')

  var app = require('./app')(db)

  var server = http.createServer(app);
  server.on('error', function (err) {
    throw err
  })
  server.on('listening', function () {
    console.log('Server listening on port ' + port);
  })
  server.listen(port);

}).catch(function (err) {
  console.log('Error starting server', err);
  process.exit(1);
})
