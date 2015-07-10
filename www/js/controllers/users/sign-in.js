angular.module('App').controller('userController', function ($scope, $state, loginRequest) {
  $scope.signIn = function (user) {
    console.log("Usuario " + $scope.user.email);

    loginRequest.login(user);
  };

});
