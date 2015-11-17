/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-organizer')
    .controller('EventDetailController', EventDetailController);

  EventDetailController.$inject = [
    'eventService',
    'utilsService',
    '$stateParams'
  ];

  function EventDetailController( eventService , utilsService, $stateParams) {

    var vm = this;
    vm.event = {};

    activate();

    ////////////

    function activate(){
      getEvent();
    }

    function getEvent(){
      utilsService.showLoad();
      eventService.getEvent( $stateParams.idEvent )
        .then( complete )
        .catch( failed );

        function complete( event ){
          utilsService.hideLoad();
          vm.event = event;
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }
    

  }
})();