'use strict';
(function () {
function SearchController($scope, $http, $localStorage, $location, $translate, $log, eventRequest, Utils) {
    $scope.events = [];
    $scope.init = function(){
        Utils.show();
        eventRequest.allEvents().success(function(data){
          $scope.events = data.events;
          Utils.hide();

        }).error(function(data,headers,status, config){
          $log.log("Data: " + angular.toJson(data));
          Utils.hide();
        }
      );
    };
  };
angular.module('App').controller('SearchController', SearchController);
})();
