'use strict';
(function () {
angular.module('App').controller('settingUserController', function ($scope, $state, $base64, $cookies, $location, $translate, $log, $cordovaFile, $cordovaCamera, $cordovaFileTransfer, $imgur, userRequest, Utils, imgurConfig, Camera) {
  $scope.user = $cookies.getObject('userAuth');
  $log.log("userAuth",JSON.stringify($scope.user));

  //var imgurInstance = new $imgur(imgurConfig.client_id);

  $scope.uploadProgress = 0;
  //$scope.imageuri = "";
  $scope.file = "";
  //$scope.picData = "";

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

  /*
  $scope.getBase64Image = function(imageUri) {
    var c=document.createElement('canvas');
     var ctx=c.getContext("2d");
     var img=new Image();
     img.onload = function(){
       c.width=this.width;
       c.height=this.height;
       ctx.drawImage(img, 0,0);
     };
     img.src=imageUri;
     var dataURL = c.toDataURL("image/jpeg");
     return dataURL;
     };
    */

  document.addEventListener("deviceready", function () {

  $scope.fromAlbum=function(){

        Utils.show();

        $cordovaCamera.getPicture(options).then(function(imageData) {
          var image = document.getElementById('myImage');


          //A hack that you should include to catch bug on Android 4.4 (bug < Cordova 3.5):
          /*
            if (imageData.substring(0,21)=="content://com.android") {
              var photo_split=imageData.split("%3A");
              imageData="content://media/external/images/media/"+photo_split[1];
            }

          $scope.file = $scope.getBase64Image(imageData);
          $log.log("getBase64Image: ", $scope.file);


          $scope.imageuri = imageData;
          window.resolveLocalFileSystemURL($scope.imageuri, function(fileEntry) {
  				$scope.picData = fileEntry.nativeURL;
          $log.log("$scope.picData: ", $scope.picData);
        }); */
          image.src = "data:image/jpeg;base64," + imageData;
          $scope.file = imageData;
          $log.log("imageData: ", imageData);
          Utils.hide();
        }, function(err) {
          // error
        });

    };

      $scope.upload = function() {
        //Utils.show();
        var imageData = $scope.file;
        $log.log("data:",imageData);

        var clientId = imgurConfig.client_id;
        $log.log("clientId:", imgurConfig.client_id);



        /*
        var fileURL = $scope.picData;
        $log.log("fileURL: ", fileURL);
        var fileNameOpt = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        $log.log("fileNameOpt:", fileNameOpt);
        fileURL = fileNameOpt.replace(/\.[^/.]+$/, "");
        $log.log("fileURL: ", fileURL);
        */

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
        /*
                var options = {
                    fileKey: "file",
                    fileName: "file.jpg",
                    chunkedMode: false,
                    mimeType: "image/jpeg",
                    headers: {
                        "Authorization": "Client-ID " + imgurConfig.client_id
                    }
                };

                var params = {
                  image: imageData,
                  type: "file"
                };
                $cordovaFileTransfer.upload("https://api.imgur.com/3/image", params, options).then(function(result) {
                    $log.log(result);
                }, function(error) {
                    $log.error(error);
                }).then(function() {
                    Utils.hide();
                }); */

          };

  }, false);

});
})();
