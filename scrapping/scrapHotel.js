var Xray = require('x-ray')
var x = Xray()

module.exports = function (html) {
  return new Promise(function(resolve, reject) {
    x(html, {
      id: '#wrap-hotelpage-top input[name="hotel_id"]@value',
      name: '#hotel_share_center div.details h3',
      title: 'meta[name="twitter:title"]@content',
      url: '#hotel_share_center div.details small',
      description: 'meta[name="description"]@content',
      keywords: 'meta[name="keywords"]@content',
      photos: ['#hotel_main_content img[data-lazy]@data-lazy'],
      address: '#hp_address_subtitle',
      summary: '#summary',
      equipments: x('#hp_facilities_box .facilitiesChecklistSection', [{
        sectionLabel: 'h5',
        list: ['li'],
      }]),
      rooms: x('#maxotel_rooms tbody tr', [{
        id: 'td.roomType div.rt-room-info@id',
        type: 'td.roomType a',
        equipments: x('td.roomType span.highlighted_facilities_reinforcement', [{
          id: 'span i@class',
          label: 'span',
        }]),
        occupancy: '@data-occupancy',
        prices: x('td.roomMultiRoomPrice select option', [{
          nb: '@value',
          price: '@data-price-raw',
        }]),
        policies: ['td.ratepolicy span'],
      }]),

    })(function (err, res) {
      if (err) reject(err)
      resolve(res)
    })
  })
}
