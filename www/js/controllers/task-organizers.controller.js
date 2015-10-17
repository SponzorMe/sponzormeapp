'use strict';
(function(){
angular.module("App")
.controller("taskOrganizerController", function($scope, $state, $log, $location, $localStorage, sponzorshipRequest, Utils){

    $scope.newEvent = function(){
      $state.go('menuorganizers.addTask');
    };

    $scope.init = function(){

      var userId = $localStorage.userAuth.id;


      sponzorshipRequest.sponzorshipByOrganizer(userId).success(
      function(data){
        $log.log(data);
      }
      ).
      error(
        function(data, status, headers, config){
        $log.log(data)
        }
      );

    };
});
})();
