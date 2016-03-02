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
    'sponsorshipService',
    '$localStorage',
    '$ionicModal',
    '$ionicHistory',
    '$cordovaToast',
    '$translate',
    'notificationService',
    '$rootScope',
    'userAuthService'
  ];

  function EventDetailSponzorController( $scope, eventService, utilsService, $stateParams, sponsorshipService, $localStorage, $ionicModal, $ionicHistory, $cordovaToast, $translate, notificationService, $rootScope, userAuthService) {

    var vm = this;
    vm.event = {};
    vm.userAuth = userAuthService.getUserAuth();

    vm.modalSponsorIt = null;
    vm.newSponsorIt = {};
    vm.openModalSponsorIt = openModalSponsorIt;
    vm.closeModalSponsorIt = closeModalSponsorIt;
    vm.createSponsorIt = createSponsorIt;
    vm.submitSponsorIt = submitSponsorIt;

    activate();

    ////////////

    function activate(){
      
      vm.event = _.findWhere(vm.userAuth.events, {id: $stateParams.idEvent});
      console.log( vm.event );
      vm.event.perks = preparatePerks( vm.event );

      $ionicModal.fromTemplateUrl('app/events-sponsor/sponsor-it-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalSponsorIt = modal;
      });
    }
    
    function preparatePerks( event ){
      var perks = event.perks;
      for (var i = 0; i < perks.length; i++) {
        perks[i].sponzorship = _.where(event.sponzorship, {perk_id: perks[i].id});
        perks[i].already = _.findWhere(perks[i].sponzorship , {sponzor_id: vm.userAuth.id});
      }
      return perks;
    }

    function filterByTypePerk( task ){
      return task.type == '0'; //Organizer
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
      sponsorshipService.createSponzorship( preparateDataSponzorship() )
        .then( complete )
        .catch( failed );

        function complete( newSponsorship ){
          vm.closeModalSponsorIt();
          vm.userAuth.sponzorships.push( newSponsorship );
          userAuthService.updateUserAuth( vm.userAuth );
          $rootScope.$broadcast('FollowEventsController:getSponzorships');
          $rootScope.$broadcast('Menu:count_following');
          var notification = {
            text: vm.event.title,
            link: '#/organizers/sponzors',
            modelId: newSponsorship.id,
          };
          notificationService.sendNewSponsorship(notification, vm.event.user_organizer.id);
          $cordovaToast.showShortBottom($translate.instant("MESSAGES.succ_sponsor_it"));
        }

        function failed( error ){
          vm.closeModalSponsorIt();
        }
    }

    function preparateDataSponzorship(){
      return {
        sponzor_id: vm.userAuth.id,
        perk_id: vm.newSponsorIt.perk.id,
        event_id: vm.event.id,
        organizer_id: vm.event.user_organizer.id,
        status: 0,
        cause: vm.newSponsorIt.cause
      }
    }
    

  }
})();