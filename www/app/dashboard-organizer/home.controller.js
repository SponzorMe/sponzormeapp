/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('HomeOrganizerController', HomeOrganizerController);

  HomeOrganizerController.$inject = ['$translate', '$localStorage' ,'userService', 'utilsService', 'sponzorshipService'];

  function HomeOrganizerController( $translate, $localStorage, userService , utilsService, sponzorshipService) {

    var vm = this;
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    vm.sponzorships = [];

    activate();

    ////////////

    function activate(){
      getEvents();
      getSponzorships();
    }

    function getEvents(){
      utilsService.showLoad();
      userService.getUser( vm.userAuth.id )
        .then( getEventsComplete )
        .catch( getEventsFailed );

        function getEventsComplete( user ){
          utilsService.hideLoad();
          vm.events = spliceEvents( user.events );
        }

        function spliceEvents( events ){
          return events.length > 3 ? events.splice( events.length - 3 , events.length) : events;
        }

        function getEventsFailed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

    function getSponzorships(){
      sponzorshipService.sponzorshipByOrganizer( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( sponzors ) {
          vm.sponzorships = spliceSponzors( sponzors );
        }

        function spliceSponzors( sponzors ){
          return sponzors.length > 3 ? sponzors.splice( sponzors.length - 3 , sponzors.length) : sponzors;
        }

        function failed( error ) {
          console.log( error );
        }
    }
    

  }
})();