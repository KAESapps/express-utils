var ObjectID = require('mongodb').ObjectID


var helpers = {
  get: function (collection, id, done) {
    return collection.find({'_id': ObjectID(id)}).limit(1).next(done)
  },
  find: function (collection, query) {
    var page = parseInt(query._page, 10)
    var itemByPage =parseInt(query._perPage, 10)
    var sort = {}
    sort[query._sortField] = (query._sortDir === 'DESC' ? -1 : 1)
    var match = query._filters ? JSON.parse(query._filters) : {}
    console.log('filteers', match)
    console.log('filters type', typeof match)
    return collection.find(match)
      .skip((page-1)*itemByPage)
      .limit(itemByPage)
      .sort(sort)
      .toArray()
  },
  insert: function (collection, data) {
    return collection.insertOne(data).then(function (res) {
      return res.ops[0]
    })
  },
  replace: function (collection, id, data) {
    return collection.findOneAndReplace(
      {_id: ObjectID(id)},
      data
    ).then(function (res) {
      return res.ok
    })
  },
  update: function (collection, id, data) {
    return collection.findOneAndReplace(
      {_id: ObjectID(id)},
      {$set: data}
    ).then(function (res) {
      return res.ok
    })
  },
  delete: function (collection, id) {
    return collection.deleteOne({_id: ObjectID(id)})
  },

}
module.exports = helpers
