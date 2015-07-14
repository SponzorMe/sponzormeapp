angular.module('App').controller('userController', function ($scope, $state, loginRequest) {
  $scope.signIn = function (user) {
    console.log("Usuario " + user.email);
    console.log("Pass " + user.password);
    loginRequest.login(user);
  };

});
