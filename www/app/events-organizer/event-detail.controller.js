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
    .controller('EventDetailOrganizerController', EventDetailOrganizerController);

  EventDetailOrganizerController.$inject = [
    '$scope',
    'eventService',
    'utilsService',
    '$stateParams',
    '$state',
    'perkService',
    '$ionicModal',
    'sponzorshipService',
    '$ionicPopup',
    'userService'
  ];

  function EventDetailOrganizerController( $scope, eventService , utilsService, $stateParams, $state, perkService, $ionicModal, sponzorshipService, $ionicPopup, userService) {

    var vm = this;
    vm.event = {};
    vm.remove = remove;
    vm.perks = [];
    vm.detailSponzor = {};
    /* -- CRUD PERKS -- */
    vm.modalPerk = null;
    vm.newPerk = {};
    vm.isNewPerk = true;
    vm.openModalPerk = openModalPerk;
    vm.closeModalPerk = closeModalPerk;
    vm.createPerk = createPerk;
    vm.editPerk = editPerk;
    vm.deletePerk = deletePerk;
    vm.submitPerk = submitPerk;
    vm.confirmPopup = confirmPopup;
    vm.getSponzor = getSponzor;

    activate();

    ////////////

    function activate(){
      getEvent();

      $ionicModal.fromTemplateUrl('app/events-organizer/perk-modal-edit.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalPerk = modal;
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
          vm.perks = preparatePerks( vm.event );
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error.data );
        }
    }

    function preparatePerks( event ){
      var perks = event.perks;
      for (var i = 0; i < perks.length; i++) {
        perks[i].sponzorships = _.where(event.sponzorships, {perk_id: perks[i].id});
      }
      return perks;
    }

    function remove(){
      utilsService.showLoad();
      eventService.deleteEvent( $stateParams.idEvent )
        .then( complete )
        .catch( failed );

        function complete( event ){
          utilsService.hideLoad();
          $state.go('organizer.events');
        }

        function failed( error ){
          console.log( error );
          utilsService.hideLoad();
          utilsService.alert({
            title: 'Error',
            template: error.message
          });
        }
    }

    function openModalPerk(){
      vm.modalPerk.show();
    }

    function closeModalPerk(){
      vm.modalPerk.hide();
      vm.newPerk = {};
    } 

    function createPerk(){
      vm.isNewPerk = true;
      vm.openModalPerk();
    }

    function editPerk( data ){
      vm.isNewPerk = false;
      vm.newPerk = data;
      vm.newPerk.total_quantity = parseInt( vm.newPerk.total_quantity );
      vm.newPerk.usd = parseInt( vm.newPerk.usd );
      vm.openModalPerk();
    }

    function addPerk(){
      var data = vm.newPerk;
      data.id_event = $stateParams.idEvent;
      data.reserved_quantity = 0;
      perkService.createPerk( data )
        .then( complete )
        .catch( failed );

        function complete( response ){
          vm.closeModalPerk();
          getEvent();
        }

        function failed( error ){
          vm.closeModalPerk();
        }
      
    }

    function deletePerk(){
      perkService.deletePerk( vm.newPerk.id )
        .then( complete )
        .catch( failed );

        function complete( response ){
          vm.closeModalPerk();
          getEvent();
        }

        function failed( error ){
          vm.closeModalPerk();
          utilsService.alert({
            template: error.message,
          });
        }
    }

    function updatePerk(){
      perkService.editPerkPatch( vm.newPerk.id , vm.newPerk )
        .then( complete )
        .catch( failed );

        function complete( response ){
          vm.closeModalPerk();
          getEvent();
        }

        function failed( error ){
          vm.closeModalPerk();
        }
    }

    function submitPerk(){
      if(vm.isNewPerk){
        addPerk();
      }else{
        updatePerk();
      }
    }

    function sponzorAccept( index ){
      confirmPopup('Are you sure?', 'In accept the sponsor')
        .then( complete );

        function complete( rta ){
          if( rta ) updateSponsorship( 1 ); //Accepted 
        }
    }

    function sponzorReject( index ){
      confirmPopup('Are you sure?', 'In reject the sponsor')
        .then( complete );

        function complete( rta ){
          if( rta ) updateSponsorship( 2 ); //Deny
        }
    }

    function getSponzor( sponsorship ){
      userService.getUser( sponsorship.sponzor_id )
        .then( complete )
        .catch( failed );

        function complete( sponzor ){
          console.log( sponzor );
          vm.detailSponzor = sponzor;
          confirmPopup();
        }

        function failed( error ){
          console.log( error );
        }
    }

    function confirmPopup( sponsorship ){
      return $ionicPopup.show({
        title: "Sponzor",
        templateUrl: "app/events-organizer/detail-sponzor.html",
        scope: $scope,
      });
    }

    function updateSponsorship( sponsorship, status ){
      utilsService.showLoad();
      var sponsorshipCopy = angular.copy( sponsorship );
      sponsorshipCopy.status = status;
      sponzorshipService.editSponzorshipPut( sponsorshipCopy.id, sponsorshipCopy )
        .then( complete )
        .catch( failed );

        function complete( sponsorshipRta ){
          utilsService.hideLoad();
          sponsorship.status = sponsorshipRta.status;
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }

    }
    

  }
})();