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
    .controller('AddTaskSponsorController', AddTaskSponsorController);

  AddTaskSponsorController.$inject = [
    '$localStorage',
    'perkTaskService',
    'perkService',
    'userService',
    'utilsService',
    '$state',
    '$stateParams',
    '$ionicHistory',
    'tasksSponsorService'
  ];

  function AddTaskSponsorController( $localStorage, perkTaskService, perkService, userService, utilsService, $state, $stateParams, $ionicHistory, tasksSponsorService) {

    var vm = this;
    vm.newTask = {};
    vm.userAuth = $localStorage.userAuth;
    vm.createTask = createTask;
    vm.idEvent = null;
    vm.idPerk = null;
    vm.idOrganizer = null;
    vm.idSponsorship = null;

    activate();

    ////////////

    function activate(){
      vm.idEvent = $stateParams.idEvent;
      vm.idPerk = $stateParams.idPerk;
      vm.idOrganizer = $stateParams.idOrganizer;
      vm.idSponsorship = $stateParams.idSponsorship;
    }

    function createTask( form ){
      utilsService.showLoad();
      perkTaskService.createPerkTask( preparateTask() )
        .then( createTaskSponsor )
        .then( complete )
        .catch( failed );

        function createTaskSponsor( task ){
          return tasksSponsorService.createTask( preparateTaskSponsor( task ) )
        }


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

    function preparateTask(){
      return {
        user_id: vm.userAuth.id,
        event_id: vm.idEvent,
        perk_id: vm.idPerk,
        title: vm.newTask.title,
        description: vm.newTask.description,
        type: 1, // Is a sponsor
        status: 0
      }
    }

    function preparateTaskSponsor( task ){
      return {
        task_id: task.id,
        perk_id: vm.idPerk,
        sponzor_id: vm.userAuth.id,
        organizer_id: vm.idOrganizer, 
        event_id: vm.idEvent,
        sponzorship_id: vm.idSponsorship
      }
    }
    

  }
})();