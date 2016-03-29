/// <reference path="../../typings/main.d.ts" />
/**
* @Controller for Add Events
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-organizer')
    .controller('AddEventController', AddEventController);

  AddEventController.$inject = [
    '$scope',
    '$translate',
    '$localStorage',
    'utilsService',
    '$cordovaDatePicker',
    '$cordovaCamera',
    'eventTypeService',
    'eventService',
    '$ionicModal',
    '$cordovaToast',
    '$ionicHistory',
    'imgurService',
    '$q',
    '$state',
    'notificationService',
    'userAuthService',
    'userService',
    '$rootScope',
  ];

  function AddEventController( $scope, $translate, $localStorage, utilsService, $cordovaDatePicker, $cordovaCamera, eventTypeService, eventService, $ionicModal, $cordovaToast, $ionicHistory, imgurService, $q, $state, notificationService, userAuthService, userService, $rootScope) {

    var vm = this;
    vm.newEvent = {};
    vm.newPerk = {};
    vm.isNewPerk = true;
    vm.eventTypes = [];
    vm.userAuth = userAuthService.getUserAuth();
    vm.modalPerk = null;
    vm.imageURI = null;

    vm.clickedStartDate = clickedStartDate;
    vm.clickedEndDate = clickedEndDate;
    vm.clickedStartTime = clickedStartTime;
    vm.clickedEndTime = clickedEndTime;
    vm.getPhoto = getPhoto;
    vm.createEvent = createEvent;
    vm.openModalPerk = openModalPerk;
    vm.closeModalPerk = closeModalPerk;
    vm.createPerk = createPerk;
    vm.editPerk = editPerk;
    vm.deletePerk = deletePerk;
    vm.submitPerk = submitPerk;

    activate();

    ////////////

    function activate(){
      vm.newEvent.access = true;
      vm.newEvent.perks = [];
      vm.newEvent.starttime = "13:00:00";
      vm.newEvent.start = moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD');
      vm.newEvent.endtime = "15:00:00";
      vm.newEvent.end = moment(new Date().getTime()).add(4, 'days').format('YYYY-MM-DD');

      $ionicModal.fromTemplateUrl('app/events-organizer/perk-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalPerk = modal;
      });
      
      $rootScope.hideTabs = '';
      
      getEventsTypes();
    }

    /*-------------- DatePickers   --------------*/

    function showDatePicker( options ) {
      return $cordovaDatePicker.show( options );
    }

    function clickedStartDate(){
      var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
      showDatePicker({
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: minDate,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );

      function complete( date ){
        vm.newEvent.start = moment(date).format('YYYY-MM-DD');
      }
    }

    function clickedEndDate(){
      var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
      showDatePicker({
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: minDate,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );
      
      function complete( date ){
        vm.newEvent.end = moment(date).format('YYYY-MM-DD');
      }
    };

    function clickedStartTime(){
      var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
      showDatePicker({
        date: new Date(),
        mode: 'time', // or 'time'
        minDate: minDate,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );
      
      function complete( date ){
        vm.newEvent.starttime = moment(date).format('HH:mm:ss');
      }
    }

    function clickedEndTime(){
      var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
      showDatePicker({
        date: new Date(),
        mode: 'time', // or 'time'
        minDate: minDate,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );
      
      function complete( date ){
        vm.newEvent.endtime = moment(date).format('HH:mm:ss');
      }
    }

    /*-------------- Image --------------*/

    function getPhoto(){

      var options = {
        quality: 100,
        destinationType:  Camera.DestinationType.DATA_URL,
        sourceType:  Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
      };

      $cordovaCamera.getPicture( options )
        .then( complete );
        //.catch( failed );

      function complete( imageURI ){
        vm.imageURI = imageURI;
        vm.newEvent.image = "data:image/jpeg;base64," + imageURI;
      }

      /*
      function failed( error ){
        console.log( error );
      */
    }

    /*-------------- Create Event --------------*/

    function createEvent( form ){
      utilsService.showLoad();
      
      if(vm.imageURI){
        imgurService.uploadImage( vm.imageURI )
          .then( updateImage )
          .then( complete )
          .catch( failed );
      }else{
        eventService.createEvent( preparateData() )
          .then( complete )
          .catch( failed );
      }

        function updateImage( image ){
          vm.newEvent.image = image;
          return eventService.createEvent( preparateData() );
        }

        function complete( event ) {
          utilsService.hideLoad();
          utilsService.resetForm( form );
          vm.newEvent = {};
          event.image = (event.image == "event_dummy.png") ? 'img/banner.jpg' : event.image;
          event.starts = moment(event.starts).toDate();
          event.ends = moment(event.ends).toDate();
          vm.userAuth.events.push( event );
          userAuthService.updateUserAuth( vm.userAuth );
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $ionicHistory.clearCache().then(function() {
            notificationService.sendNewEvent();
            $rootScope.$broadcast('MenuOrganizer:count_events');
            $rootScope.$broadcast('EventsTabsController:count_events');
            $rootScope.$broadcast('HomeOrganizerController:count_events');
            $state.go("organizer.events.list");
          });
          $cordovaToast.showShortBottom($translate.instant("MESSAGES.succ_event_mess"));
        }

        function failed( error ) {
          utilsService.hideLoad();
          utilsService.alert({
            title: $translate.instant("ERRORS.addeventsform_error_tit"),
            template: $translate.instant("ERRORS.addeventsform_error_mess"),
          });
        }

    }

    function getEventsTypes(){
      eventTypeService.allEventTypes()
        .then( complete );
        //.catch( failed );

        function complete( eventTypes ){
          vm.eventTypes = eventTypes;
          if(vm.eventTypes.length > 0) vm.newEvent.type = vm.eventTypes[0];
        }

        /*
        function failed( error ){
          console.log( error );
        }
        */
    }

    function preparateData() {

      function joinDate(date, time) {
        date = moment(date,"YYYY-MM-DD").format("YYYY-MM-DD");
        time = moment(date + " " + time).format("HH:mm:ss");
        return date + " " + time;
      }

      return {
        title: vm.newEvent.title,
        location: vm.newEvent.location.formatted_address,
        location_reference: vm.newEvent.location.place_id,
        description: vm.newEvent.description,
        starts: joinDate(vm.newEvent.start, vm.newEvent.starttime),
        ends: joinDate(vm.newEvent.end, vm.newEvent.endtime),
        image: vm.newEvent.image ? vm.newEvent.image : "http://i.imgur.com/t8YehGM.jpg",
        privacy: vm.newEvent.access ? 0 : 1,
        lang: $translate.use(),
        organizer: vm.userAuth.id,
        category: 1,
        type: vm.newEvent.type.id,
        perks: vm.newEvent.perks
      }
    }

    /*-------------- Perks --------------*/

    

    function openModalPerk(){
      vm.modalPerk.show();
    }

    function closeModalPerk( form ){
      vm.modalPerk.hide();
      if (form) utilsService.resetForm( form );
      vm.newPerk = {};
    } 

    function createPerk(){
      vm.isNewPerk = true;
      vm.openModalPerk();
    }

    function editPerk( data ){
      vm.isNewPerk = false;
      vm.newPerk = data;
      vm.openModalPerk();
    }

    function addPerk(){
      vm.newEvent.perks.push({
        kind: vm.newPerk.kind,
        usd: vm.newPerk.usd,
        total_quantity: vm.newPerk.total_quantity,
        reserved_quantity: 0
      });
      vm.closeModalPerk();
    }

    function deletePerk(){
      var index = vm.newEvent.perks.indexOf( vm.newPerk );
      vm.newEvent.perks.splice(index, 1);
      vm.closeModalPerk();
    }

    function updatePerk(){
      vm.closeModalPerk();
    }

    function submitPerk( form ){
      if(vm.isNewPerk){
        addPerk();
        utilsService.resetForm( form );
      }else{
        updatePerk();
        utilsService.resetForm( form );
      }
    }

    

  }
})();