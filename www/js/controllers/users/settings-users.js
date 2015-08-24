'use strict';
(function () {
angular.module('App').controller('settingUserController', function ($scope, $state, $base64, $cookies, $location, $translate, $log, userRequest, Utils, Camera) {
  $scope.user = $cookies.getObject('userAuth');
  console.log("userAuth",JSON.stringify($scope.user));

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });
  };

  $scope.editUser = function(user){
    console.log("User", JSON.stringify(user));

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


});
})();
