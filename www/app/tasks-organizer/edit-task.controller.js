/**
* @Controller for Add Task
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.tasks-organizer')
    .controller('EditTaskController', EditTaskController);

  EditTaskController.$inject = [
    '$localStorage',
    'perkTaskService',
    'utilsService',
    '$stateParams',
    '$ionicHistory'
  ];

  function EditTaskController( $localStorage, perkTaskService, utilsService, $stateParams, $ionicHistory) {

    var vm = this;
    vm.newTask = {};
    vm.userAuth = $localStorage.userAuth;
    vm.editTask = editTask;
    vm.deleteTask = deleteTask;

    activate();

    ////////////

    function activate(){
      getTask( $stateParams.id );
    }

    function getTask( idTask ){
      utilsService.showLoad();

      perkTaskService.getPerkTask( idTask )
        .then( complete )
        .catch( failed );

        function complete( task ){

          utilsService.hideLoad();
          vm.newTask = task;
          vm.newTask.status = task.status == '1' ? true : false ;
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

    

    function editTask( form ){
      utilsService.showLoad();
      perkTaskService.editPerkTaskPatch( $stateParams.id, preparateData() )
        .then( complete )
        .catch( failed );

        function complete( data ){
          utilsService.hideLoad();
          utilsService.resetForm( form );
          vm.newTask = {};
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $ionicHistory.clearCache();
          $ionicHistory.goBack();
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

     function deleteTask(){
      utilsService.showLoad();
      perkTaskService.deletePerkTask( $stateParams.id )
        .then( complete )
        .catch( failed );

        function complete( data ){
          vm.newTask = {};
          utilsService.hideLoad();
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $ionicHistory.clearCache();
          $ionicHistory.goBack();
        }

        function failed( error ){
          utilsService.hideLoad();
          utilsService.alert({
            template: error.message
          });
        }
    }

    function preparateData(){
      return {
        user_id: vm.userAuth.id,
        event_id: vm.newTask.event.id,
        perk_id: vm.newTask.perk.id,
        title: vm.newTask.title,
        description: vm.newTask.description,
        type: 0,
        status: vm.newTask.status ? "1" : "0"
      }
    }    

  }
})();