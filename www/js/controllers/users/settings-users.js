angular.module('App').controller('settingUserController', function ($scope, $state, $base64, $cookies, $location, $translate, userRequest, Utils, Camera) {
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
  };


});
