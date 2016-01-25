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
    'sponsorshipService',
    '$ionicPopup',
    '$ionicActionSheet',
    '$cordovaSocialSharing',
    '$cordovaCalendar',
    '$ionicSideMenuDelegate',
    '$ionicHistory',
    '$cordovaToast',
    '$translate',
    'BackendVariables'
  ];

  function EventDetailOrganizerController( $scope, eventService , utilsService, $stateParams, $state, sponsorshipService, $ionicPopup, $ionicActionSheet, $cordovaSocialSharing, $cordovaCalendar, $ionicSideMenuDelegate, $ionicHistory, $cordovaToast, $translate, BackendVariables) {

    var vm = this;
    var popupOptionsSponsorship = null;
    var hideSheet = null;
    vm.optionsActionSheet = [];
    var url = BackendVariables.url_web;
    //Attributes
    vm.event = {};
    vm.deleteEvent = deleteEvent;
    vm.perks = [];
    
    /*----- Options sponsorship  -----*/
    vm.sponsorshipSelected = {};
    vm.openOptionsSponsorship = openOptionsSponsorship;
    vm.closeOptionsSponsorship = closeOptionsSponsorship;
    vm.updateSponsorship = updateSponsorship;
    /*----- Options ActionSheet  -----*/
    vm.showActionSheet = showActionSheet;
    vm.hideActionSheet = hideActionSheet;

    activate();

    ////////////

    function activate(){
      getEvent();
      $ionicSideMenuDelegate.canDragContent(false);
      vm.optionsActionSheet = [
        editEvent,
        shareEvent,
        addToCalendar
      ];
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
        }
    }

    function preparatePerks( event ){
      var perks = event.perks;
      for (var i = 0; i < perks.length; i++) {
        perks[i].sponsorships = _.where(event.sponzorships, {perk_id: perks[i].id});
        perks[i].tasks = _.where(event.perk_tasks.filter( filterByTypePerk )  , {perk_id: perks[i].id});
      }
      return perks;
    }

    function filterByTypePerk( task ){
      return task.type == '0'; //Organizer
    }

    function deleteEvent(){
      utilsService.showLoad();
      eventService.deleteEvent( $stateParams.idEvent )
        .then( complete )
        .catch( failed );

        function complete( event ){
          utilsService.hideLoad();
          hideActionSheet();
          $ionicHistory.clearCache();
          $ionicHistory.goBack();
        }

        function failed( error ){
          utilsService.hideLoad();
          hideActionSheet();
          utilsService.alert({
            title: 'Error',
            template: error.message
          });
        }
    }

    /*---------*/

    function openOptionsSponsorship( sponsorship ){
      vm.sponsorshipSelected = sponsorship;
      popupOptionsSponsorship = $ionicPopup.show({
        title: "Options",
        templateUrl: "app/events-organizer/options-sponsorship.html",
        scope: $scope,
      });
    }

    function closeOptionsSponsorship(){
      popupOptionsSponsorship.close();
    }

    function updateSponsorship( status ){
      utilsService.showLoad();
      var sponsorship = angular.copy( vm.sponsorshipSelected );
      sponsorship.status = status;
      sponsorshipService.editSponzorshipPut( sponsorship.id, sponsorship )
        .then( complete )
        .catch( failed );

        function complete( sponsorshipRta ){
          utilsService.hideLoad();
          closeOptionsSponsorship();
          vm.sponsorshipSelected.status = sponsorshipRta.status;  
        }

        function failed( error ){
          utilsService.hideLoad();
          closeOptionsSponsorship();
        }

    }

    /**/
    function showActionSheet(){

      hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '<i class="icon ion-edit"></i> Edit event' },
          { text: '<i class="icon ion-share"></i> <b>Share</b> This' },
          { text: '<i class="icon ion-calendar"></i> Add to calendar' }
        ],
        destructiveText: '<i class="icon ion-trash-a"></i> Delete event',
        titleText: 'Options',
        cancelText: '<i class="icon ion-close"></i> Cancel',
        buttonClicked: function(index) {
          vm.optionsActionSheet[index]();
          return true;
        },
        destructiveButtonClicked: deleteEvent
     });
    }

    function hideActionSheet(){
      hideSheet();
    }

    function shareEvent(){
      var message = vm.event.title;
      var subject = vm.event.description;
      var image = vm.event.image;
      var link =  url + '#/event/' + vm.event.id;
      $cordovaSocialSharing
        .share( message, subject, image, link) // Share via native share sheet
        .then( complete );
        //.catch( failed );

        function complete(){
          $cordovaToast.showShortBottom($translate.instant("MESSAGES.succ_add_to_calendar"));
        }
        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function editEvent(){
      $state.go('organizer.editevent', { id: vm.event.id });
    }

    function addToCalendar(){
      $cordovaCalendar
        .createEvent({
          title: vm.event.title,
          location: vm.event.location,
          notes: vm.event.description,
          startDate: vm.event.starts,
          endDate: vm.event.ends
        })
        .then( complete );
        //.catch( failed );

        function complete(){
          $cordovaToast.showShortBottom($translate.instant("MESSAGES.succ_add_to_calendar"));
        }

        /*
        function failed( error ){
          console.log( error );
        }*/
    }
    

  }
})();