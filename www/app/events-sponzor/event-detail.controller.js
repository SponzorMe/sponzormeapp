/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-sponzor')
    .controller('EventDetailSponzorController', EventDetailSponzorController);

  EventDetailSponzorController.$inject = [
    '$scope',
    'eventService',
    'utilsService',
    '$stateParams',
    'sponzorshipService',
    '$localStorage',
    '$ionicModal'
  ];

  function EventDetailSponzorController( $scope, eventService , utilsService, $stateParams, sponzorshipService, $localStorage, $ionicModal) {

    var vm = this;
    vm.event = {};
    vm.userAuth = $localStorage.userAuth;

    vm.modalSponsorIt = null;
    vm.newSponsorIt = {};
    vm.openModalSponsorIt = openModalSponsorIt;
    vm.closeModalSponsorIt = closeModalSponsorIt;
    vm.createSponsorIt = createSponsorIt;
    vm.submitSponsorIt = submitSponsorIt;

    activate();

    ////////////

    function activate(){
      getEvent();

      $ionicModal.fromTemplateUrl('app/events-sponzor/sponzor-it-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalSponsorIt = modal;
      });
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
    

    function openModalSponsorIt(){
      vm.modalSponsorIt.show();
    }

    function closeModalSponsorIt(){
      vm.modalSponsorIt.hide();
      vm.newSponsorIt = {};
    } 

    function createSponsorIt( perk ){
      vm.newSponsorIt.perk = perk;
      vm.openModalSponsorIt();
    } 

    function submitSponsorIt(){
      sponzorshipService.createSponzorship( preparateDataSponzorship() )
        .then( complete )
        .catch( failed );

        function complete( event ){
          vm.closeModalSponsorIt();
          console.log( event );
        }

        function failed( error ){
          vm.closeModalSponsorIt();
          console.log( error );
        }
    }

    function preparateDataSponzorship(){
      return {
        sponzor_id: vm.userAuth.id,
        perk_id: vm.newSponsorIt.perk.id,
        event_id: vm.event.id,
        organizer_id: vm.event.organizer.id,
        status: 0,
        cause: vm.newSponsorIt.cause
      }
    }
    

  }
})();