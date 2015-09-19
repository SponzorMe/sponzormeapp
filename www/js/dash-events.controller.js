'use strict';
(function(){
angular.module('App')
.controller('DashEventsController', function ($scope, $state, $location) {
  $scope.addEvent = function () {
    $state.go('addevent');
    };
  });
})();
