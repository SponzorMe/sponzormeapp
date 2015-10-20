'use strict';
(function(){
angular.module('App').controller('sponzoringEventsController',sponzoringEventsController );
function sponzoringEventsController($scope, $state, $localStorage, $location, $translate, $log, sponzorshipRequest, Utils) {
    $scope.init = function(){
      Utils.show();
      var userId = $localStorage.userAuth.id;
      sponzorshipRequest.sponzorshipBySponzor($localStorage.userAuth.id).success(
        function(data){
          $log.log("Data: " + angular.toJson(data) + " Contenido: " + data.SponzorsEvents.length);

          $scope.sponzorships = [];
          angular.forEach(data.SponzorsEvents, function(value, key) {
            if (value.status == 1) {
              $scope.sponzorships.push(value);
              $log.log("Valor en sponzorships: " + angular.toJson(value));
            }
          });
          Utils.hide();
        }
      )
      .error(
        function(data,headers,status,config){
          $log.log("Error: " + angular.toJson(data));
          Utils.hide();
        }
      );
    };
  };
})();
