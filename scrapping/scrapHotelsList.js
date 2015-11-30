var Xray = require('x-ray')
var x = Xray()

module.exports = function (html) {
  return new Promise(function(resolve, reject) {
    x(html, ['.hotel_name_link@href'])(function (err, res) {
      if (err) reject(err)
      resolve(res)
    })
  }).then(function (urls) {
    return urls.map(function (url) {
      return url.split('?')[0]
    })
  })
}
