angular.module('App').controller('forgotController', function ($scope, $state) {
  $scope.resetPass = function (user) {
    console.log("Usuario " + user.email);
    console.log("Pass " + user.password);
    //loginRequest.login(user);
  };

});
