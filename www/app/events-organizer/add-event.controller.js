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
    'userService',
    'utilsService',
    '$cordovaDatePicker',
    '$cordovaCamera',
    'eventTypeService',
    'eventService',
    'perkService',
    '$ionicModal',
    '$cordovaToast',
    '$state',
    '$ionicHistory',
    'imgurService',
    '$q'
  ];

  function AddEventController( $scope, $translate, $localStorage, userService , utilsService, $cordovaDatePicker, $cordovaCamera, eventTypeService, eventService, perkService, $ionicModal, $cordovaToast, $state, $ionicHistory, imgurService, $q) {

    var vm = this;
    vm.newEvent = {};
    vm.newSponsor = {};
    vm.isNewSponsor = true;
    vm.eventTypes = [];
    vm.sponsors = [];
    vm.userAuth = $localStorage.userAuth;
    vm.modalSponsor = null;
    vm.imageURI = null;

    vm.clickedStartDate = clickedStartDate;
    vm.clickedEndDate = clickedEndDate;
    vm.clickedStartTime = clickedStartTime;
    vm.clickedEndTime = clickedEndTime;
    vm.getPhoto = getPhoto;
    vm.createEvent = createEvent;
    vm.openModalSponsor = openModalSponsor;
    vm.closeModalSponsor = closeModalSponsor;
    vm.createSponsor = createSponsor;
    vm.editSponsor = editSponsor;
    vm.deleteSponsor = deleteSponsor;
    vm.submitSponsor = submitSponsor;

    activate();

    ////////////

    function activate(){

      vm.sponsors = [];
      vm.newEvent.access = true;
      vm.newEvent.starttime = "00:00:00";
      vm.newEvent.start = "2015-12-28";
      vm.newEvent.endtime = "01:00:00";
      vm.newEvent.end = "2015-12-28";

      $ionicModal.fromTemplateUrl('app/events-organizer/sponsor-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalSponsor = modal;
      });
      
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
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture( options )
        .then( complete )
        .catch( failed );

      function complete( imageURI ){
        vm.imageURI = imageURI;
        vm.newEvent.image = "data:image/jpeg;base64," + imageURI;
      }

      function failed( error ){
        console.log( error );
      }
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
          createPerks( event.id );
          vm.newEvent = {};
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $state.go("organizer.events.list");
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
        .then( complete )
        .catch( failed );

        function complete( eventTypes ){
          vm.eventTypes = eventTypes;
          if(vm.eventTypes.length > 0) vm.newEvent.type = vm.eventTypes[0];
        }

        function failed( error ){
          console.log( error );
        }
    }

    function preparateData() {

      function joinDate(date, time) {
        date = moment(date,"YYYY-MM-DD").format("YYYY-MM-DD");
        time = moment(date + " " + time).format("HH:mm:ss");
        return date + " " + time;
      }

      return {
        title: vm.newEvent.title,
        location: vm.newEvent.location,
        location_reference: "referencia",
        description: vm.newEvent.description,
        starts: joinDate(vm.newEvent.start, vm.newEvent.starttime),
        ends: joinDate(vm.newEvent.end, vm.newEvent.endtime),
        image: vm.newEvent.image ? vm.newEvent.image : "http://i.imgur.com/t8YehGM.jpg",
        privacy: vm.newEvent.access ? 0 : 1,
        lang: $translate.use(),
        organizer: vm.userAuth.id,
        category: 1,
        type: vm.newEvent.type.id
      }
    }

    /*-------------- Perks --------------*/

    function createPerks( idEvent ){
      var size = vm.sponsors.length;
      for (var i = 0; i < size; i++) {
        var data = vm.sponsors[i];
        data.id_event = idEvent;
        data.reserved_quantity = 0;
        createPerk( data );
      };
    }

    function createPerk( data ){
      return perkService.createPerk( data )
        .then( complete )
        .catch( failed );

        function complete( response ){
          console.log( response );
        }

        function failed( error ){
          console.log( error );
        }
    }

    function openModalSponsor(){
      vm.modalSponsor.show();
    }

    function closeModalSponsor( form ){
      vm.modalSponsor.hide();
      utilsService.resetForm( form );
      vm.newSponsor = {};
    } 

    function createSponsor(){
      vm.isNewSponsor = true;
      vm.openModalSponsor();
    }

    function editSponsor( data ){
      vm.isNewSponsor = false;
      vm.newSponsor = data;
      vm.openModalSponsor();
    }

    function addSponsor(){
      vm.sponsors.push( vm.newSponsor );
      vm.closeModalSponsor();
    }

    function deleteSponsor(){
      var index = vm.sponsors.indexOf( vm.newSponsor );
      vm.sponsors.splice(index, 1);
      vm.closeModalSponsor();
    }

    function updateSponsor(){
      vm.closeModalSponsor();
    }

    function submitSponsor( form ){
      if(vm.isNewSponsor){
        addSponsor();
        utilsService.resetForm( form );
      }else{
        updateSponsor();
        utilsService.resetForm( form );
      }
    }

    

  }
})();