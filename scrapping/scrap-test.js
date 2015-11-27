var fs = require('fs')
var Xray = require('x-ray')
var x = Xray()


// var url = 'http://www.booking.com/hotel/fr/montaigne-paris1.fr.html'
var html = fs.readFileSync('./montaigne-dates.html')

x(html, {
  title: 'meta[name="twitter:title"]@content',
  url: '#hotel_share_center div.details small',
  name: '#hotel_share_center div.details h3',
  description: 'meta[name="description"]@content',
  keywords: 'meta[name="keywords"]@content',
  photos: ['#hotel_main_content img[data-lazy]@data-lazy'],
  adress: '#hp_address_subtitle',
  hotelId: '#wrap-hotelpage-top input[name="hotel_id"]@value',
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
    occupation: '@data-occupancy',
    prices: x('td.roomMultiRoomPrice select option', [{
      nb: '@value',
      price: '@data-price-raw',
    }]),
    policies: ['td.ratepolicy span'],
  }]),

}).write('results.json')
