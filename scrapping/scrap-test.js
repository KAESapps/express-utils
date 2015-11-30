var fs = require('fs')
var scrapHotelsList = require('./scrapHotelsList')
var when = require('when')

when()
.then(function () {
  return fs.readFileSync('ParisHotels.html')
})
.then(scrapHotelsList)
.then(function (data) {
  console.log(data)
}, function (err) {
  console.log('errur', err)
})
