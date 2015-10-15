'use strict';
(function(){
angular.module("App")
.controller("taskOrganizerController", function($scope, $state, $log, $location, $localStorage, Utils){
    $scope.newEvent = function(){
      $state.go('menuorganizers.addTask');
    };
});
})();
