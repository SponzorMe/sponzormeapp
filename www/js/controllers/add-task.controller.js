'use strict';
(function(){
angular.module("App")
.controller("AddTasksController", function($scope, $state, $log, $location, $localStorage, perkTaskRequest, Utils){

  $scope.addTask = function(task){
    $log.log("task" +  angular.toJson(task));

    var newPerkTask = {};
    newPerkTask.user_id = $localStorage.userAuth.id;
    newPerkTask.event_id = task.type;
    newPerkTask.perk_id = task.kind;
    newPerkTask.title = task.title;
    newPerkTask.description = task.description;
    newPerkTask.type = 0;
    newPerkTask.status = 0;

    perkTaskRequest.createPerkTask(newPerkTask).success(function(data){
      $log.log("new Perk Task: " + angular.toJson(data));
    }
    ).
    error(funtion(data, status, headers, config){
      $log.log("error perkTask:" + angular.toJson(data));
    }
    );

  };

  $scope.init() = function(){
    // TODO get all users events

    // TODO get user type of sponzors

  };

});
})();
