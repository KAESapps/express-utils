/* global angular */

var myApp = angular.module('myApp', ['ng-admin']);
// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
  var ngaApp = nga.application('Winwinks admin')
    .baseApiUrl('http://localhost:3000/api/')

    var reservation = reservation = nga.entity('reservations')
      .identifier(nga.field('_id'));


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


    // hotels
    var hotels = nga.entity('hotels')
      .identifier(nga.field('_id'));
    hotels.listView().fields([
      nga.field('title').isDetailLink(true),
      nga.field('url'),
    ]);
    hotels.creationView().fields([
      nga.field('name'),
      nga.field('description', 'text'),
      nga.field('summary', 'text'),
      nga.field('address'),
      nga.field('rooms', 'embedded_list')
        .targetFields([
          nga.field('id'),
          nga.field('type'),
          nga.field('occupancy'),
          nga.field('equipments', 'embedded_list')
            .targetFields([
              nga.field('id'),
              nga.field('label'),
            ]),
          nga.field('prices', 'embedded_list')
            .targetFields([
              nga.field('nb'),
              nga.field('price'),
            ]),
          //nga.field('policies', 'json'),
        ]),
    ]);
    hotels.editionView().fields(hotels.creationView().fields());
    ngaApp.addEntity(hotels)

    // guests
    var guest = nga.entity('guests')
      .identifier(nga.field('_id'));
    guest.listView().fields([
      nga.field('profile.name').isDetailLink(true),
      nga.field('profile.email'),
    ]);
    guest.creationView().fields([
      nga.field('auth.local.username'),
      nga.field('auth.local.password'),
      nga.field('profile.name'),
      nga.field('profile.email', 'email'),
      nga.field('profile.address.street').label('Street'),
      nga.field('profile.address.city').label('City'),
      nga.field('profile.address.zipcode').label('Zipcode'),
      nga.field('bookings', 'referenced_list')
        .targetEntity(reservation)
        .targetReferenceField('guest')
        .targetFields([ // which comment fields to display in the datagrid
          nga.field('arrival', 'date'),
          nga.field('departure', 'date'),
          nga.field('hotel', 'reference')
            .targetEntity(hotels)
            .targetField(nga.field('name')),
        ]),
    ]);
    guest.editionView().fields(guest.creationView().fields());
    ngaApp.addEntity(guest)


    // reservations
    reservation.listView().fields([
      nga.field('_id').isDetailLink(true),
      nga.field('arrival'),
      nga.field('departure', 'date'),
      nga.field('guest', 'reference')
        .targetEntity(guest)
        .targetField(nga.field('profile.name')),
      nga.field('hotel', 'reference')
        .targetEntity(hotels)
        .targetField(nga.field('name')),
    ]);
    reservation.creationView().fields([
      nga.field('created', 'date'),
      nga.field('arrival', 'date'),
      nga.field('departure', 'date'),
      nga.field('comment'),
      nga.field('guest', 'reference')
        .targetEntity(guest)
        .targetField(nga.field('profile.name')),
      nga.field('hotel', 'reference')
        .targetEntity(hotels)
        .targetField(nga.field('name')),
    ]);
    reservation.editionView().fields(reservation.creationView().fields());
    ngaApp.addEntity(reservation)


  nga.configure(ngaApp);
}])
