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
    '$ionicModal',
    '$ionicActionSheet',
    '$cordovaSocialSharing',
    '$cordovaCalendar',
    '$ionicSideMenuDelegate',
    '$ionicHistory',
    '$cordovaToast',
    '$translate',
    'BackendVariables',
    'perkTaskService',
    '$localStorage',
    'userAuthService',
    'notificationService',
    '$rootScope'
  ];

  function EventDetailOrganizerController( $scope, eventService , utilsService, $stateParams, $state, sponsorshipService, $ionicPopup, $ionicModal, $ionicActionSheet, $cordovaSocialSharing, $cordovaCalendar, $ionicSideMenuDelegate, $ionicHistory, $cordovaToast, $translate, BackendVariables, perkTaskService, $localStorage, userAuthService, notificationService, $rootScope) {

    var vm = this;
    var popupOptionsSponsorship = null;
    var hideSheet = null;
    vm.optionsActionSheet = [];
    var url = BackendVariables.url_web;
    //Attributes
    vm.event = {};
    vm.deleteEvent = deleteEvent;
    vm.userAuth = userAuthService.getUserAuth();

    vm.indexPerk = -1;
    vm.indexTask = -1;
    vm.modalTask = null;
    vm.isNewTask = true;
    vm.task = {};
    vm.showModalTask = showModalTask;
    vm.newTask = newTask;
    vm.hideModalTask = hideModalTask;
    vm.editTask = editTask;
    vm.submitTask = submitTask;
    vm.deleteTask = deleteTask;
    
    
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
      
      vm.event = _.findWhere(vm.userAuth.events, {id: $stateParams.idEvent});
      vm.event.perks = vm.event.perks.map( preparatePerks );
      
      $ionicSideMenuDelegate.canDragContent(false);
      
      vm.optionsActionSheet = [
        editEvent,
        shareEvent,
        addToCalendar
      ];

      $ionicModal.fromTemplateUrl('app/events-organizer/task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalTask = modal;
      });
    }

    function preparatePerks( perk ){
      perk.sponzorship = _.where(vm.userAuth.sponzorships_like_organizer, {perk_id: perk.id});
      perk.tasks = _.where(perk.tasks, {user_id: vm.userAuth.id});
      return perk;
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
        title: $translate.instant("EVENTDETAIL.options_title"),
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

        function complete( sponsorship ){
          utilsService.hideLoad();
          vm.sponsorshipSelected.status = sponsorship.status; 
          
          var notification = {
            text: vm.event.title,
            link: '#/sponzors/sponzoring',
            modelId: sponsorship.id
          };
          
          if(sponsorship.status == 1){ //Accepted 
            notificationService.sendAcceptSponsorship(notification, sponsorship.sponzor_id);
          }else if(sponsorship.status == 2){//Deny
            notificationService.sendRejectSponsorship(notification, sponsorship.sponzor_id);
          }
          closeOptionsSponsorship();
           
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
          { text: '<i class="icon ion-edit"></i> ' + $translate.instant("EVENTDETAIL.edit_event") },
          { text: '<i class="icon ion-share"></i> <b> ' + $translate.instant("EVENTDETAIL.share") + ' </br>' },
          { text: '<i class="icon ion-calendar"></i> ' + $translate.instant("EVENTDETAIL.add_calendar") }
        ],
        destructiveText: '<i class="icon ion-trash-a"></i> ' + $translate.instant("EVENTDETAIL.delete_event"),
        titleText: $translate.instant("EVENTDETAIL.options"),
        cancelText: '<i class="icon ion-close"></i> ' + $translate.instant("EVENTDETAIL.cancel"),
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

    function showModalTask(){
      vm.modalTask.show();
    }

    function newTask( perk, indexPerk ){
      vm.isNewTask = true;
      vm.indexPerk = indexPerk; 
      vm.task.perk_id = perk.id;
      vm.task.event_id = vm.event.id;
      vm.showModalTask();
    }

    function hideModalTask( form ){
      vm.modalTask.hide();
      if (form) utilsService.resetForm( form );
      vm.task = {};
      vm.indexPerk = -1; 
      vm.indexTask = -1;
    }

    function editTask( task, indexPerk, indexTask ){
      vm.isNewTask = false;
      vm.indexPerk = indexPerk; 
      vm.indexTask = indexTask;
      vm.task = angular.copy( task );
      vm.task.status = vm.task.status == 1 ? true : false;
      vm.showModalTask();
    }

    function createTask( form ){
      utilsService.showLoad();
      perkTaskService.createPerkTask( preparateTask() )
        .then( complete )
        .catch( failed );

        function complete( data ){
          vm.event.perks[vm.indexPerk].tasks.push( data.PerkTask );
          vm.userAuth.sponzorships_like_organizer = $localStorage.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
          userAuthService.updateUserAuth( vm.userAuth );
          sendNewTaskNotification( data.PerkTask.title );
          
          $rootScope.$broadcast('MenuOrganizer:count_tasks');
          
          utilsService.resetForm( form );
          vm.hideModalTask();
          utilsService.hideLoad();
        }

        function failed( error ){
          utilsService.resetForm( form );
          vm.hideModalTask();
          utilsService.hideLoad();
        }
    }
    
    function sendNewTaskNotification( text ) {
      for (var index = 0; index < vm.event.perks[vm.indexPerk].sponzorship.length; index++) {
        var sponzorship = vm.event.perks[vm.indexPerk].sponzorship[index];
        notificationService.sendNewTaskOrganizer({
          text: text,
          modelId: sponzorship.id
        }, sponzorship.sponzor_id);
      }
    }
    
    function sendUpdateTaskNotification( text, done ) {
      for (var index = 0; index < vm.event.perks[vm.indexPerk].sponzorship.length; index++) {
        var sponzorship = vm.event.perks[vm.indexPerk].sponzorship[index];
        if(done){
          notificationService.sendDoneTaskOrganizer({
            text: text,
            modelId: sponzorship.id
          }, sponzorship.sponzor_id);
        }else{
          notificationService.sendUpdateTaskOrganizer({
            text: text,
            modelId: sponzorship.id
          }, sponzorship.sponzor_id);
        }
      }
    }

    function preparateTask(){
      return {
        user_id: vm.userAuth.id,
        event_id: vm.task.event_id,
        perk_id: vm.task.perk_id,
        title: vm.task.title,
        description: vm.task.description,
        type: 0,
        status: 0
      }
    }

    function deleteTask( form ){
      utilsService.showLoad();
      perkTaskService.deletePerkTask( vm.task.id )
      .then( complete )
      .catch( failed );

      function complete( data ){
        vm.userAuth.sponzorships_like_organizer = $localStorage.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
        vm.event.perks[vm.indexPerk].tasks.splice(vm.indexTask, 1);
        userAuthService.updateUserAuth( vm.userAuth );
        if( form ) utilsService.resetForm( form );
        vm.hideModalTask();
        utilsService.hideLoad();
        $rootScope.$broadcast('MenuOrganizer:count_tasks');
        $rootScope.$broadcast('TaskTabsController:count_tasks');
      }

      function failed( error ){
        vm.hideModalTask();
        if( form ) utilsService.resetForm( form );
        utilsService.alert({
          template: error.message
        });
        utilsService.hideLoad();
      }
    }

    function updateTask( form ){
      utilsService.showLoad();
      vm.task.status = vm.task.status ? 1 : 0;
      perkTaskService.editPerkTaskPatch( vm.task.id, vm.task )
      .then( complete )
      .catch( failed );

      function complete( task ){
        sendUpdateTaskNotification( task.title, vm.event.perks[vm.indexPerk].tasks[vm.indexTask].status == 0 && task.status == 1);
        vm.event.perks[vm.indexPerk].tasks[vm.indexTask] = task;
        utilsService.resetForm( form );
        
        $rootScope.$broadcast('MenuOrganizer:count_tasks');
        $rootScope.$broadcast('TaskTabsController:count_tasks');
        
        vm.hideModalTask();
        utilsService.hideLoad();
      }

      function failed( error ){
        utilsService.resetForm( form );
        vm.hideModalTask();
        utilsService.hideLoad();
      }
    }

    function submitTask( form ){
      if(vm.isNewTask){
        createTask( form );
      }else{
        updateTask( form );
      }
    }

  }
})();