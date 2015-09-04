'use strict';
(function () {
angular.module('App').controller('settingUserController', function ($scope, $state, $base64, $cookies, $location, $translate, $log, $cordovaFile, $cordovaCamera, userRequest, Utils, imgurConfig, imgurUpload, Camera) {
  $scope.user = $cookies.getObject('userAuth');
  $log.log("userAuth",JSON.stringify($scope.user));

  $scope.uploadProgress = 0;
  $scope.imageuri = "";
  $scope.file = "";

  $scope.upload = function() {
    //Utils.show();
    var image = $scope.file;
    $log.log("imguri:",$scope.imageuri);
    var clientId = imgurConfig.client_id;
    $log.log("clientId:", imgurConfig.client_id);
          imgurUpload.setClientId("bdff09d775f47b9");
          imgurUpload
            .upload(image)
            //.upload(image, {clientId: clientId})
            .then(function(result) {
              $scope.sending = false;
              $scope.result = result;

            }, function(err) {
              $scope.sending = false;
              $scope.error = err;

            }, function(progress) {
              $timeout(function() {
                $scope.progress = progress;
              });
            });

  $scope.sending = true;
  $scope.error = false;

      };


  var options = {
      quality: 50,
      destinationType: navigator.camera.DestinationType.FILE_URI,
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

  $scope.getBase64Image = function(imgElem) {
// imgElem must be on the same server otherwise a cross-origin error will be thrown "SECURITY_ERR: DOM Exception 18"
    var canvas = document.createElement("canvas");
    canvas.width = imgElem.clientWidth;
    canvas.height = imgElem.clientHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgElem, 0, 0);
    var dataURL = canvas.toDataURL("image/jpeg");
    dataURL = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    return dataURL;
 };

 $scope.convertImgToBase64URL  =  function(url){
            //alert();
            var canvas = document.createElement('CANVAS'),
                ctx = canvas.getContext('2d'),
                img = new Image;
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                var dataURL;
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                dataURL = canvas.toDataURL("image/jpeg");
                dataURL = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                $scope.callback(dataURL);
                // console.log("hhhh dataurl : "dataURL);
                canvas = null;
            };
            img.src = "";
            return img;
        }

  document.addEventListener("deviceready", function () {

  $scope.fromAlbum=function(){

        Utils.show();

        $cordovaCamera.getPicture(options).then(function(imageData) {
          var image = document.getElementById('myImage');
          $scope.file = $scope.convertImgToBase64URL(imageData);
          $log.log("imageData: ", imageData);

          //A hack that you should include to catch bug on Android 4.4 (bug < Cordova 3.5):
            if (imageData.substring(0,21)=="content://com.android") {
              var photo_split=imageData.split("%3A");
              imageData="content://media/external/images/media/"+photo_split[1];
            }
          $scope.file.src = imageData;

          $scope.imageuri = imageData;
          image.src = imageData;
          Utils.hide();
        }, function(err) {
          // error
        });

    };

    $scope.loadImage=function(imageSrc){

          if (imageSrc.substring(0,21)=="content://com.android") {
            photo_split=imageSrc.split("%3A");
            imageSrc="content://media/external/images/media/"+photo_split[1];
          }

          UserImages.tmpImage=imageSrc;
          $scope.uimg=imageSrc;
      };
      }, false);

});
})();
