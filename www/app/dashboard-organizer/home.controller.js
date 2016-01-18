/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.dashboard-organizer')
    .controller('HomeOrganizerController', HomeOrganizerController);

  HomeOrganizerController.$inject = [
    '$localStorage',
    'userService',
    'utilsService',
    'sponsorshipService',
    '$q'
  ];

  function HomeOrganizerController( $localStorage, userService , utilsService, sponsorshipService, $q) {

    var vm = this;
    //Atributes
    vm.count_events = 0;
    vm.count_sponsors = 0;
    vm.count_comunity = 0;
    vm.userAuth = $localStorage.userAuth;

    activate();

    ////////////

    function activate(){
      getData();
    }

    function getData(){
      utilsService.showLoad();

      var promises = [
        userService.getUser( vm.userAuth.id ),
        sponsorshipService.sponzorshipByOrganizer( vm.userAuth.id )
      ];

      $q.all( promises )
        .then( complete )
        .catch( failed );

        function complete( data ){
          utilsService.hideLoad();
          getEvents( data[0]  );
          getSponzorships( data[1] );
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

    function getEvents( user ){
      vm.count_events = user.events.filter( filterDate ).length;
      vm.count_comunity = user.comunity_size || 0;

      function filterDate( item ){
        return moment(item.ends).isAfter(new Date());
      }
    }

    function getSponzorships( sponsors ){
      vm.count_sponsors = sponsors.length;
    }
    

  }
})();