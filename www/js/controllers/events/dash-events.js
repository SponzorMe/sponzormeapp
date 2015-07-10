angular.module('App')
.controller('EventsController', function ($scope) {
  $scope.addEvent = function () {
    $state.go('addevent');
    };
  });
