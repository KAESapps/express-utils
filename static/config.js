/* global angular */

var myApp = angular.module('myApp', ['ng-admin']);
// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
  var ngaApp = nga.application('Winwinks admin')
    .baseApiUrl('http://localhost:3000/api/')

    // admin users
    var admins = nga.entity('admins')
      .identifier(nga.field('_id'));
    admins.listView().fields([
      nga.field('auth.local.username').label('Nom').isDetailLink(true),
    ]);
    admins.creationView().fields([
      nga.field('auth.local.username'),
      nga.field('auth.local.password'),
    ]);
    admins.editionView().fields(admins.creationView().fields());
    ngaApp.addEntity(admins)


    // guests
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
    guest.editionView().fields(guest.creationView().fields());
    ngaApp.addEntity(guest)

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
      nga.field('comment'),
      nga.field('guest', 'reference')
        .targetEntity(guest)
        .targetField(nga.field('profile.name')),
    ]);
    reservation.editionView().fields(reservation.creationView().fields());
    ngaApp.addEntity(reservation)

    // hotels
    var hotels = nga.entity('hotels')
      .identifier(nga.field('_id'));
    hotels.listView().fields([
      nga.field('nom').isDetailLink(true),
      nga.field('type'),
    ]);
    hotels.creationView().fields([
      nga.field('nom'),
      nga.field('type'),
      nga.field('rooms', 'embedded_list')
        .targetFields([
          nga.field('_id'),
          nga.field('type'),
        ]),
    ]);
    hotels.editionView().fields(hotels.creationView().fields());
    ngaApp.addEntity(hotels)


  nga.configure(ngaApp);
}])
