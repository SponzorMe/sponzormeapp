angular.module('App').controller('userController', function ($scope, $user, $state) {
  $scope.signIn = function () {
    $scope.getInfo = function () {
      $user.getInfo($user.info.key).then(function(response){
        debugger;
      }, function (error) {
        debugger;
      });
    };

    $user.signIn($scope.user).then(function (response) {
      $scope.user.key = $user.info.key;
      $scope.getInfo();
      // do more sign up things :)
      $scope.user.userId = $user.info.userId;
      if($scope.user.userId > 0){
        $state.go('eventmenu.home');
      }
      // success
    }, function (error){
      debugger;
      // show error message
      // maybe wrong login
      // maybe error server
    });
  };

});
