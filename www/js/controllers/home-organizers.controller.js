'use strict';
(function(){
angular.module('App')
.controller('HomeOrganizersController', function ($scope, $state, $log, $location, $localStorage, userRequest, sponzorshipRequest, Utils) {
  $scope.events = [];

  $scope.init = function(){
    Utils.show();
    var userId = $localStorage.userAuth.id;
    $log.log("userId", userId);
    userRequest.oneUser(userId).success(function(adata){
        $log.log("all events", angular.toJson(adata));
        //$scope.events = adata.data.user.events;
        angular.forEach(adata.data.user.events, function(element) {
          element.starts = moment(element.starts).format('MMMM Do YYYY');
          $scope.events.push(element);
          if($scope.events.length > 3 ){
            $scope.events.shift();
          }
        });
        Utils.hide();

    }).
    error(function(data, status, headers, config){
        $log.error("Error when get events", angular.toJson(data));
        Utils.hide();
    });
  };

  sponzorshipRequest.allSponzorships().success(function(adata2){
    $log.log("all perks", angular.toJson(adata2));
    
  }
  ).
  error(function(data2, status, headers, config){
      $log.error("Error when get events", angular.toJson(data2));
  });

  });
})();
