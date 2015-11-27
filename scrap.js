var Xray = require('x-ray')
var x = Xray()

module.exports = function (hotels) {
  return function (req, res, next) {
    // var url = req.params.url
    var url = 'http://www.booking.com/hotel/fr/montaigne-paris1.fr.html?label=gen173nr-15CAEoggJCAlhYSDNiBW5vcmVmaE2IAQGYAQ24AQTIAQTYAQPoAQE;sid=8cc5957cf26fde0a1200a73aafa5e696;dcid=4;dist=0;group_adults=2;room1=A%2CA;sb_price_type=total;srfid=a79972a044aac720e8a1a9a98a3faf927c2ae4ceX1;type=total;ucfs=1&'

    //   name: '#hp_hotel_name',
      // adress: '#hp_address_subtitle',
    x('https://www.google.fr', 'img@data-lazy')(function (err, data) {
      if (err) next(err)
      res.json(data)
    })
  }
}
