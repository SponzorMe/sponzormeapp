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
    .controller('EventDetailTasksSponzorController', EventDetailTasksSponzorController);

  EventDetailTasksSponzorController.$inject = [
    '$scope',
    'eventService',
    'utilsService',
    '$stateParams',
    'sponsorshipService',
    '$localStorage',
    '$ionicModal',
    '$ionicHistory',
    '$cordovaToast',
    '$translate'
  ];

  function EventDetailTasksSponzorController( $scope, eventService, utilsService, $stateParams, sponsorshipService, $localStorage, $ionicModal, $ionicHistory, $cordovaToast, $translate) {

    var vm = this;
    vm.event = {};
    vm.userAuth = $localStorage.userAuth;
    vm.perks_tasks = [];
    vm.perks_sponsorships = [];
    vm.idSponsorShip = null;

    activate();

    ////////////

    function activate(){
      getEvent();

      $ionicModal.fromTemplateUrl('app/events-sponsor/sponsor-it-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalSponsorIt = modal;
      });
    }

    function getEvent(){
      utilsService.showLoad();
      //eventService.getEvent( $stateParams.idEvent )
      eventService.getEvent( 1 )
        .then( complete )
        .catch( failed );

        function complete( event ){
          utilsService.hideLoad();
          vm.event = event;
          vm.idSponsorShip = getIdSponsorship( vm.event.sponzorships ).id;
          vm.perks_tasks = preparatePerksTasks( vm.event );
          vm.perks_sponsorships = preparatePerksSponsorships( vm.event );
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

    function getIdSponsorship( sponzorships ){
      sponzorships = sponzorships.filter(function( sponsorship ){
        return sponsorship.sponzor_id == vm.userAuth.id;
      });
      if(sponzorships.length > 0) return sponzorships[0];
      return null;
    }

    function preparatePerksTasks( event ){
      var perks = filterBySponsorship( event );
      for (var i = 0; i < perks.length; i++) {
        perks[i].tasks = _.where( event.perk_tasks.filter( filterByUser ), {perk_id: perks[i].id});
      }
      return perks;
    }

    function preparatePerksSponsorships( event ){
      var perks = event.perks;
      for (var i = 0; i < perks.length; i++) {
        perks[i].sponsorships = _.where(event.sponzorships, {perk_id: perks[i].id});
      }
      return perks;
    }

    function filterBySponsorship( event ){
      var perks = [];
      for (var i = 0; i < event.sponzorships.length; i++) {
        if (event.sponzorships[i].sponzor_id == vm.userAuth.id) perks.push(event.sponzorships[i].perk_id);
      };
      return event.perks.filter(function( perk ){
        return perks.indexOf( perk.id ) !== -1;
      });
    }

    function filterByUser( task ){
      return task.type == '1' && vm.userAuth.id == task.user_id; //Is a sponsor
    }
    

  }
})();