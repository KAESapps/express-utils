var MongoClient = require('mongodb').MongoClient
var pipeline = require('when/pipeline')

var scrapHotel = require('./scrapHotel')
var scrapHotelsList = require('./scrapHotelsList')
var requestAsChrome = require('./requestAsChrome')
var dbUrl = 'mongodb://localhost:27017/winwinks'


MongoClient.connect(dbUrl).then(function(db) {
  var hotels = db.collection('hotels')
  return serie([
    requestAsChrome,
    scrapHotelsList,
      each(serie([
        addDates,
        log('url'),
        requestAsChrome,
        scrapHotel,
        log('scrap'),
        upsertHotel(hotels),
      ])),
    log('done'),
    function () {
      return db.close()
    },
  ])('http://www.booking.com/searchresults.fr.html?aid=331424&sid=d0b637656b278664e140008dc3297553&dcid=4&checkin_monthday=16&checkin_year_month=2015-12&checkout_monthday=17&checkout_year_month=2015-12&class_interval=1&csflt=%7B%7D&dest_id=-1456928&dest_type=city&dtdisc=0&from_history=1&group_adults=2&group_children=0&hlrd=0&hyb_red=0&inac=0&label_click=undef&nha_red=0&no_rooms=1&redirected_from_city=0&redirected_from_landmark=0&redirected_from_region=0&review_score_group=empty&room1=A%2CA&sb_price_type=total&score_min=0&si=ai&si=ci&si=co&si=di&si=la&si=re&ss_all=0&ssb=empty&sshis=0&rows=15&offset=15')
}).catch(log('erreur'))



function addDates(url) {
  return 'http://www.booking.com'+url+'?checkin=2015-12-15;checkout=2015-12-16'
}



function upsertHotel(db) {
  return function(hotel) {
    var bookingId = hotel.id
    return db.updateOne({
      'booking.id': bookingId,
    }, {$set: hotel}, {
      upsert: true,
    }).then(prop('result'))
  }
}

function prop(property) {
  return function (obj) {
    return obj[property]
  }
}
function log (label) {
  return function (data) {
    console.log(label, data)
    return data
  }
}

function each(task) {
  return function (results) {
    return Promise.all(results.map(function (result) {
      return task(result)
    }))
  }
}
function serie(tasks) {
  return function (val) {
    return pipeline(tasks, val)
  }
}
// function parallel (tasks) {
//   return function (val) {
//     return Promise.all(tasks.map(function (task) {
//       return task(val)
//     }))
//   }
// }
