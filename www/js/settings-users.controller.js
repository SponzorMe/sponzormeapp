'use strict';
(function () {
angular.module('App')
.controller('settingUserController', function ($scope, $state, $base64, $localStorage, $location, $translate, $log, $cordovaFile, $cordovaCamera, $cordovaFileTransfer, $timeout, $imgur, userRequest, Utils, imgurConfig, Camera) {
  $scope.user = $localStorage.userAuth;
  $log.log("userAuth",angular.toJson($scope.user));

  $scope.myPicture = "data:image/jpeg;base64,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";
  $scope.file = "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";
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

  $scope.init = function(){
    //check the session
    if(!userRequest.checkSession($localStorage.token,$localStorage.userAuth)){
      $state.go("signin");
    }
    // TODO - download the current user profile image and convert to base64
    $log.log("User image " + $localStorage.userAuth.image);
    var filepath = $scope.downloadImage($localStorage.userAuth.image);
    $log.log("filepath = " + filepath);
    $scope.savePhoto(filepath.nativeURL);
  };

  $scope.editUser = function(user){
    $log.log("User", angular.toJson(user));

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
      $log.log('Success: ' + angular.toJson(response));

      user.image = response.data.link;
      $log.log("User Image:", user.image);

      userRequest.editUserPatch($scope.user.id, user)
      .success(function(response){
      $log.log("response" +  angular.toJson(response));
      //$state.go("introorganizers");
      Utils.alertshow("Success","User Updated.");
      })
      .error(function(data, status) {
      $log.error('editUserPatch error', status, data);
      Utils.alertshow("Error","Ops. Something happened. Try later...");
      })
      .finally(function() {
        $log.log("finally finished editUserPatch");
      });

      Utils.hide();
    }, function(reason) {
      $log.error('Failed: ' + angular.toJson(reason));
      Utils.hide();
    });


  };

  $scope.savePhoto = function (fileUrl) {
            Camera.resizeImage(fileUrl).then(function (_result) {
                var binImage = "data:image/jpeg;base64," + _result.imageData;
                $log.log("binImage=", binImage)
                return binImage;
            }).then(function (_convertedBase64) {
                $log.log("convert base image ");
            }, function (_error) {
                $log.log(_error);
            });
        };
        /*
        $scope.___savePhoto = function () {
            Camera.toBase64Image($scope.lastPhoto).then(function (_result) {
                console.log("convert base image ");
            }, function (_error) {
                console.log(_error);
            });
        };
        */

  document.addEventListener("deviceready", function () {

  $scope.fromAlbum = function(){

        Utils.show();

        $cordovaCamera.getPicture(options).then(function(imageData) {
          $scope.myPicture = "data:image/jpeg;base64," + imageData;
          $scope.file = imageData;
          $log.log("imageData: ", imageData);
          Utils.hide();
        }, function(err) {
          // error
        });

    };

  $scope.downloadImage = function(urlImage){
    var url = urlImage;
    var targetPath = cordova.file.applicationStorageDirectory + "spzProfile.png";
    $log.log("url " + url);
    $log.log("targetPath " + targetPath);
    var trustHosts = true
    var options = {};

    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
      .then(function(result) {
        // Success!
        return result;
        $log.log("Download image success" + angular.toJson(result));
      }, function(err) {
        // Error
        return err;
        $log.log("Download image Error" + angular.toJson(result));
      }, function (progress) {
        $timeout(function () {
          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        })
      });
  };

  }, false);

});
})();
