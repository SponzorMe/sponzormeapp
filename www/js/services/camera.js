'use strict';
(function () {
angular.module('App').factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    },
    launchPhotoLibrary: function() {
    $scope.image = document.getElementById('myImage');
    if (navigator.camera) {
      navigator.camera.getPicture( cameraSuccess, cameraError,
                                 { sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY } );
    } else {
      $scope.image.src = "http://unicornify.appspot.com/avatar/ba95799ceedd18316033196cb243cfc0?s=128";
      console.log('default image was set');
        }
      },
    cameraSuccess: function(imageURI) {
        // hack until cordova 3.5.0 is released
        if (imageURI.substring(0,21)=="content://com.android") {
          var photo_split=imageURI.split("%3A");
          imageURI="content://media/external/images/media/"+photo_split[1];
        }
        $scope.image.src = imageURI;
      },
    cameraError: function(message) {
      alert('Failed because: ' + message);
    }
  }
}]);
})();
