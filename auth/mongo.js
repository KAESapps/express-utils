var bcrypt   = require('bcrypt-nodejs')

module.exports = {
  insertWithLocalCredential: function insertWithLocalCredential (users, username, password) {
    return users.find({'auth.local.username': username}).limit(1).next().then(function (existingUser) {
      if (existingUser) {
        throw new Error('userAlreadyExists')
      }
      var encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
      return users.insertOne({
        auth: {
          local: {
            username: username,
            password: encryptedPassword,
          },
        },
        profile: {
          name: username,
        },
      })
    }).then(function (res) {
      var user = res.ops[0]
      return user
    })
  },

}
