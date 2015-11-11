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

  AddEventController.$inject = ['$translate', '$localStorage' ,'userService', 'utilsService', '$cordovaDatePicker', '$cordovaCamera'];

  function AddEventController( $translate, $localStorage, userService , utilsService, $cordovaDatePicker, $cordovaCamera) {

    var vm = this;
    vm.newEvent = {};
    vm.userAuth = $localStorage.userAuth;

    vm.clickedStartDate = clickedStartDate;
    vm.clickedEndDate = clickedEndDate;
    vm.clickedStartTime = clickedStartTime;
    vm.clickedEndTime = clickedEndTime;
    vm.getPhoto = getPhoto;
    vm.addEvent = addEvent;

    activate();

    ////////////

    function activate(){
      //getEvents();
    }

    function showDatePicker( options ) {
      return $cordovaDatePicker.show( options );
    }

    function clickedStartDate(){
      showDatePicker({
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );

      function complete( date ){
        vm.addEvent.start = moment(date).format('YYYY-MM-DD');
      }
    }

    function clickedEndDate = function(){
      showDatePicker({
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );
      
      function complete( date ){
        vm.addEvent.end = moment(date).format('YYYY-MM-DD');
      }
    };

    function clickedStartTime(){
      showDatePicker({
        date: new Date(),
        mode: 'time', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );
      
      function complete( date ){
        vm.addEvent.starttime = moment(date).format('HH:mm:ss');
      }
    }

    function clickedEndTime(){
      showDatePicker({
        date: new Date(),
        mode: 'time', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );
      
      function complete( date ){
        vm.addEvent.endtime = moment(date).format('HH:mm:ss');
      }
    }

    function selectEndTime(){
      var options = {
        date: new Date(),
        mode: 'time', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      };
      $cordovaDatePicker.show( options ).then(function( date ){
        vm.addEvent.start = moment(date).format('YYYY-MM-DD');
      });
    }

    function getPhoto(){
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 150,
        targetHeight: 150,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture( options )
        .then( complete )
        .catch( failed );

      function complete( imageURI ){
        console.log( imageURI );
      }

      function failed( error ){
        console.log( error );
      }
    }

    function addEvent(){
      eventRequest.createEvent( preparateData() )
        .then( addEventComplete )
        .catch( addEventFailed );

      function addEventComplete( response ) {
        console.log( response );
      }

      function addEventFailed( error ) {
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
        privacy: vm.newEvent.public,
        lang: $translate.use(),
        organizer: vm.userAuth.id,
        category: 1,
        type: vm.newEvent.type
      }
    }
    

  }
})();