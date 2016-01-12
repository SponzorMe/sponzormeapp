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
    '$ionicHistory'
  ];

  function AddTaskSponsorController( $localStorage, tasksSponsorService, perkService, userService, utilsService, $state, $stateParams, $ionicHistory) {

    var vm = this;
    vm.newTask = {};
    vm.userAuth = $localStorage.userAuth;
    vm.createTask = createTask;
    vm.idEvent = 0;
    vm.idPerk = 0;

    activate();

    ////////////

    function activate(){
      vm.idEvent = $stateParams.idEvent;
      vm.idPerk = $stateParams.idPerk;
      console.log( vm.idEvent, vm.idPerk );
      //getPerks();
    }

    function createTask( form ){
      utilsService.showLoad();
      perkTaskService.createPerkTask( preparateTask() )
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

    function preparateTask(){
      return {
        user_id: vm.userAuth.id,
        event_id: vm.newTask.event.id,
        perk_id: vm.newTask.perk.id,
        title: vm.newTask.title,
        description: vm.newTask.description,
        type: 1, // Is a sponsor
        status: 0
      }
    }
    

  }
})();