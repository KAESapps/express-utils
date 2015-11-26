/* global angular */

var myApp = angular.module('myApp', ['ng-admin']);
// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
  // create an admin application
  var admin = nga.application('Winwinks admin')
    .baseApiUrl('http://localhost:3000/api/')
    // users
    var guest = nga.entity('guests')
      .identifier(nga.field('_id'));
    guest.listView().fields([
      nga.field('profile.name').isDetailLink(true),
      nga.field('profile.email'),
    ]);
    guest.creationView().fields([
      nga.field('profile.name'),
      nga.field('profile.email', 'email'),
      nga.field('profile.address.street').label('Street'),
      nga.field('profile.address.city').label('City'),
      nga.field('profile.address.zipcode').label('Zipcode'),
    ]);
    // use the same fields for the editionView as for the creationView
    guest.editionView().fields(guest.creationView().fields());
    admin.addEntity(guest)
    // reservations
    var reservation = nga.entity('reservations')
      .identifier(nga.field('_id'));
    reservation.listView().fields([
      nga.field('_id').isDetailLink(true),
      nga.field('arrival'),
      nga.field('departure', 'date'),
      nga.field('guest', 'reference')
        .targetEntity(guest)
        .targetField(nga.field('profile.name')),
    ]);
    reservation.creationView().fields([
      nga.field('created', 'date'),
      nga.field('arrival', 'date'),
      nga.field('departure', 'date'),
      nga.field('guest', 'reference')
        .targetEntity(guest)
        .targetField(nga.field('profile.name')),
    ]);
    // use the same fields for the editionView as for the creationView
    reservation.editionView().fields(reservation.creationView().fields());
    admin.addEntity(reservation)
  // attach the admin application to the DOM and execute it
  nga.configure(admin);
}])
