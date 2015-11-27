var Router = require('express').Router
var mongo = require('../mongo')
var bcrypt   = require('bcrypt-nodejs')


var respondAsJson = function (res) {
  return function (data) {
    res.json(data)
  }
}

module.exports = function (collection) {
  return Router()
    .get('/:id', function (req, res, next) {
      mongo.get(collection, req.params.id).then(respondAsJson(res), next)
    })
    .get('/', function (req, res, next) {
      mongo.find(collection, req.query).then(respondAsJson(res), next)
    })
    .post('/', function (req, res, next) {
      var password = req.body.auth.local.password
      var encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
      req.body.auth.local.password = encryptedPassword
      mongo.insert(collection, req.body).then(respondAsJson(res), next)
    })
    .put('/:id', function (req, res, next) {
      var data = req.body
      delete data._id
      mongo.update(collection, req.params.id, data).then(respondAsJson(res), next)
    })
    .delete('/:id', function (req, res, next) {
      mongo.delete(collection, req.params.id).then(respondAsJson(res), next)
    })
}
