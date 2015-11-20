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
    .controller('HomeSponzorController', HomeSponzorController);

  HomeSponzorController.$inject = [
    '$translate',
    '$localStorage',
    'eventService',
    'utilsService'
  ];

  function HomeSponzorController( $translate, $localStorage, eventService, utilsService) {

    var vm = this;
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];

    activate();

    ////////////

    function activate(){
      getEvents();
    }

    function getEvents(){
      utilsService.showLoad();
      eventService.allEvents( )
        .then( complete )
        .catch(failed );

        function complete( events ){
          utilsService.hideLoad();
          vm.events = events;
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }
    

  }
})();