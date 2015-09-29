'use strict';
(function(){
angular.module("App")
.controller("AddEventsController", function( $scope, $state, $location, $log, $cordovaDatePicker, Camera,eventRequest){


  document.addEventListener("deviceready", function () {
    $scope.getPhoto = function() {
      var optionsCamera = {
          quality: 50,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: navigator.camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
        };
    Camera.getPicture(optionsCamera).then(function(imageURI) {
      $log.log(imageURI);
      $scope.imageURI = "data:image/jpeg;base64," + imageURI;
    }, function(err) {
      $log.log(err);
    });
    };

    $scope.selectStart = function(){
      var options = {
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      };

      $cordovaDatePicker.show(options).then(function(date){
          $scope.event.start = moment(date).format('MMMM Do YYYY');
          $log.log("event start", $scope.event.start);
      });
    };

    $scope.selectEnd = function(){
      var options2 = {
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      };

      $cordovaDatePicker.show(options2).then(function(date2){
          $scope.event.end = moment(date2).format('MMMM Do YYYY');
          $log.log("event end", $scope.event.end);
      });
    };

    $scope.selectStartTime = function(){
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

      $cordovaDatePicker.show(options).then(function(date3){
          $scope.event.starttime = moment(date3).format('h:mm:ss a');
          $log.log("event start time", $scope.event.starttime);
      });
    };

    $scope.selectEndTime = function(){
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

      $cordovaDatePicker.show(options).then(function(date4){
          $scope.event.endtime = moment(date4).format('h:mm:ss a');
          $log.log("event start time", $scope.event.endtime);
      });
    };

  }, false);

  $scope.init = function(){
    $scope.imageURI = "";
    $scope.event = {};
  };

  $scope.addEvent = function(event){
    $log.log("add Event" + angular.toJson(event));

    $scope.objuser = {}

    eventRequest.createUser($scope.objuser).success(function(adata){
          $log.log("adata=" + angular.toJson(adata));

    }).
    error(function (data, status, headers, config) {

        });
  };

});
})();
