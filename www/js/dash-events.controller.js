'use strict';
(function(){
angular.module('App')
.controller('DashEventsController', function ($scope, $state, $location) {
  $scope.newEvent = function () {
    $state.go('menuorganizers.addevent');
    };
  });
})();
