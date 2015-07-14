angular.module('App').controller('registerController', function ($scope, $state, userRequest) {
  $scope.register = function (user) {
    console.log("Usuario " + user.email);
    console.log("Pass " + user.password);
    userRequest.createUser(user);
  };

});
