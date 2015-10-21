'use strict';
(function(){
function AddTasksController($scope, $state, $log, $location, $localStorage, perkTaskRequest, sponzorshipRequest, Utils){

    $scope.addTask = function(task){
      Utils.show();
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
        Utils.hide();
      }
      ).
      error(function(data, status, headers, config){
        $log.log("error perkTask:" + angular.toJson(data));
        Utils.hide();
      }
      );

    };

    $scope.init = function(){
      // TODO get all users events


      // TODO get user type of sponzors
      $log.log("init");

    };

  };
angular.module("App").controller("AddTasksController", AddTasksController);
})();
