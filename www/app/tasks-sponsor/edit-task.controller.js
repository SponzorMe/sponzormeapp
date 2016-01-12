/**
* @Controller for Add Task
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.tasks-sponsor')
    .controller('EditTaskSponsorController', EditTaskSponsorController);

  EditTaskSponsorController.$inject = [
    '$localStorage',
    'perkTaskService',
    'perkService',
    'userService',
    'utilsService',
    '$state',
    '$stateParams',
    '$ionicHistory',
    '$q',
    'tasksSponsorService'
  ];

  function EditTaskSponsorController( $localStorage, perkTaskService, perkService, userService, utilsService, $state, $stateParams, $ionicHistory, $q, tasksSponsorService) {

    var vm = this;
    vm.newTask = {};
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    vm.perks = [];
    vm.editTask = editTask;
    vm.deleteTask = deleteTask;

    activate();

    ////////////

    function activate(){
      getData();
    }

    function getData(){
      utilsService.showLoad();

      var promises = [
        userService.getUser( vm.userAuth.id ),
        perkService.allPerks(),
        perkTaskService.getPerkTask( $stateParams.id ),
      ];

      $q.all(promises)
        .then( complete )
        .catch( failed );

        function complete( data ){
          utilsService.hideLoad();
          getEvents( data[0] );
          getPerks( data[1] );
          getTask( data[2] );
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
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
          $ionicHistory.clearCache().then(function(){
            $ionicHistory.goBack();
          });
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

     function deleteTask(){
      utilsService.showLoad();
      perkTaskService.deletePerkTask( $stateParams.id )
        .then( complete )
        .catch( failed );

        function complete( data ){
          vm.newTask = {};
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $state.go("organizer.tasks");
        }

        function failed( error ){
          utilsService.hideLoad();
          utilsService.alert({
            template: error.data.message
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

    function getEvents( user ){
      vm.events = user.events;
    }

    function getPerks( perks ){
      vm.perks = perks;
    }

    function getTask( task ){
      vm.newTask = task;
      vm.newTask.status = task.status == '1' ? true : false ;
      for (var i = 0; i < vm.events.length; i++) {
        if(vm.events[i].id == vm.newTask.event_id){
          vm.newTask.event = vm.events[i];
          break;
        }
      }
      for (var i = 0; i < vm.perks.length; i++) {
        if(vm.perks[i].id == vm.newTask.perk.id){
          vm.newTask.perk = vm.perks[i];
          break;
        }
      }
    }
    

  }
})();