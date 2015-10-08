'use strict';
(function(){
angular.module("App")
.controller("AddEventsController", function( $scope, $state, $location, $log, $translate, $localStorage, $cordovaDatePicker, Camera, eventRequest, Utils, $imgur, imgurConfig){


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
      var imageData = imageURI;
      $scope.imageURI = "data:image/jpeg;base64," + imageURI;
      //TODO upload image to imgur and update $scope.event.image
      var params = {
        image: imageData
      };
      $imgur.imageUpload(params).
      then(function(response) {
        $log.log("Response: " + angular.toJson(response));
        $scope.event.image = response.data.link;
        $log.log("Event.image ", $scope.event.image);
      }, function(reason) {
        $log.error('Failed: ' + angular.toJson(reason));
      });
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
          $scope.event.start = moment(date).format('YYYY-MM-DD');
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
          $scope.event.end = moment(date2).format('YYYY-MM-DD');
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
          $scope.event.starttime = moment(date3).format('HH:mm:ss');
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
          $scope.event.endtime = moment(date4).format('HH:mm:ss');
          $log.log("event start time", $scope.event.endtime);
      });
    };

  }, false);

  $scope.init = function(){
    $scope.imageURI = "";
    $scope.event = {};
  };

  $scope.addEvent = function(event){
    Utils.show();
    $log.log("add Event" + angular.toJson(event));

    var timeini, dateini, timedate;

    $scope.objevent = {}
    $scope.objevent.title = $scope.event.title;
    $scope.objevent.location = $scope.event.location;
    $scope.objevent.location_reference = "referencia";
    $scope.objevent.description = $scope.event.description;
    dateini = moment($scope.event.start,"YYYY-MM-DD").format("YYYY-MM-DD");
    $log.log("dateini ", dateini);
    timeini = moment(dateini + " " + $scope.event.starttime).format("HH:mm:ss");
    $log.log("timeini ", timeini);
    timedate = dateini + " " + timeini;
    $log.log("timedate ", timedate);
    $scope.objevent.starts = timedate;
    //$scope.objevent.starttime = $scope.event.starttime;
    $scope.objevent.ends = $scope.event.end;
    dateini = moment($scope.event.end).format("YYYY-MM-DD");
    $log.log("datefin ", dateini);
    timeini = moment(dateini + " " + $scope.event.endtime).format("HH:mm:ss");
    $log.log("timefin ", timeini);
    timedate = dateini + " " + timeini;
    $log.log("timedate ", timedate);
    //$scope.objevent.image = $scope.event.image;
    //$scope.objevent.image = $scope.event.image;
    if(angular.isDefined($scope.event.image)){
      $scope.objevent.image = $scope.event.image;
    }
    else{
    $scope.objevent.image = "http://i.imgur.com/t8YehGM.jpg";
    }
    $scope.objevent.privacy = $scope.event.public;
    $scope.objevent.lang = $translate.use();
    $scope.objevent.organizer = $localStorage.userAuth.id;
    $scope.objevent.category = 1;
    $scope.objevent.type = $scope.event.type;


    $log.log("Event curated:" + angular.toJson($scope.objevent));

    eventRequest.createEvent($scope.objevent).success(function(adata){
          $log.log("adata=" + angular.toJson(adata));

          Utils.hide();
          if(Utils.trim(adata.message) === "Inserted"){
            Utils.alertshow($translate.instant("MESSAGES.succ_event_tit"),$translate.instant("MESSAGES.succ_event_mess"));
            $scope.event = {};
            $state.go("menuorganizers.organizershome");
          }

    }).
    error(function (data, status, headers, config) {
          $log.error('Error fetching feed:', angular.toJson(data));
          $scope.event = {};
          Utils.hide();
          Utils.alertshow($translate.instant("ERRORS.addeventsform_error_tit"),$translate.instant("ERRORS.addeventsform_error_mess"));
        });
  };

});
})();
