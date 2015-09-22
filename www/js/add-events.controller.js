'use strict';
(function(){
angular.module("App")
.controller("AddEventsController", function( $scope, $state, $location, $log){

  $scope.addEvent = function(event){
    $log.log("add Event");
  };

});
})();
