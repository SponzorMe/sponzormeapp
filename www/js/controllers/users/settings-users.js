'use strict';
(function () {
angular.module('App').controller('settingUserController', function ($scope, $state, $base64, $cookies, $location, $translate, $log, $cordovaFile, $cordovaCamera, $cordovaFileTransfer, $imgur, userRequest, Utils, imgurConfig) {
  $scope.user = $cookies.getObject('userAuth');
  $log.log("userAuth",JSON.stringify($scope.user));
  $scope.file = "";

  var options = {
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

  $scope.editUser = function(user){
    $log.log("User", JSON.stringify(user));

    userRequest.editUserPatch($scope.user.id, user)
    .success(function(response){
    $log.log("response" +  JSON.stringify(response));
    $state.go("introorganizers");
    })
    .error(function(data, status) {
    console.error('editUserPatch error', status, data);
    })
    .finally(function() {
      $log.log("finally finished editUserPatch");
    });
  };

  document.addEventListener("deviceready", function () {

  $scope.fromAlbum=function(){

        Utils.show();

        $cordovaCamera.getPicture(options).then(function(imageData) {
          var image = document.getElementById('myImage');
          image.src = "data:image/jpeg;base64," + imageData;
          $scope.file = imageData;
          $log.log("imageData: ", imageData);
          Utils.hide();
        }, function(err) {
          // error
        });

    };

      $scope.upload = function() {
        var imageData = $scope.file;
        $log.log("data:",imageData);

        var clientId = imgurConfig.client_id;
        $log.log("clientId:", imgurConfig.client_id);

        Utils.show();
        var params = {
          image: imageData
        };
        $imgur.imageUpload(params).
        then(function(response) {
          $log.log('Success: ' + JSON.stringify(response));
          Utils.hide();
        }, function(reason) {
          $log.error('Failed: ' + JSON.stringify(reason));
          Utils.hide();
        });
          };

  }, false);

});
})();
