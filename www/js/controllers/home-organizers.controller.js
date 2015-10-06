'use strict';
(function(){
angular.module('App')
.controller('HomeOrganizersController', function ($scope, $state, $log, $location, $localStorage, userRequest, Utils) {
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
            $scope.pop();
          }
        });
        Utils.hide();

    }).
    error(function(data, status, headers, config){
        $log.error("Error when get events", angular.toJson(data));
        Utils.hide();
    });
  };

  });
})();
