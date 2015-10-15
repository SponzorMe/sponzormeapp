'use strict';
(function(){
angular.module("App")
.controller("DashSponzorsController",function ($scope, $state, $log, $location, $localStorage, perkTaskRequest, sponzorshipRequest, Utils) {
    $scope.sponzorships={};
    $scope.tasks={};

    $scope.init = function(){
      Utils.show();
      var userId = $localStorage.userAuth.id;
      $log.log("userId", userId);
      sponzorshipRequest.sponzorshipByOrganizer(userId).success(function(data){
        $log.log("Sponzorships: " + angular.toJson(data));
        Utils.hide();
      }
      ).
      error(function(data, status, headers, config){
        $log.log("error perkTask", angular.toJson(data));
        Utils.hide();
      });

    };

});
})();
