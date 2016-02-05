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
    .controller('AddTaskController', AddTaskController);

  AddTaskController.$inject = [
    '$localStorage',
    'perkTaskService',
    'perkService',
    'userService',
    'utilsService',
    '$ionicHistory'
  ];

  function AddTaskController( $localStorage, perkTaskService, perkService, userService, utilsService, $ionicHistory) {

    var vm = this;
    vm.newTask = {};
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    vm.perks = [];
    vm.createTask = createTask;

    activate();

    ////////////

    function activate(){
      getEvents();
      getPerks();
    }

    function createTask( form ){
      utilsService.showLoad();
      perkTaskService.createPerkTask( preparateData() )
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

    function preparateData(){
      return {
        user_id: vm.userAuth.id,
        event_id: vm.newTask.event.id,
        perk_id: vm.newTask.perk.id,
        title: vm.newTask.title,
        description: vm.newTask.description,
        type: 0,
        status: 0
      }
    }

    function getEvents(){
      utilsService.showLoad();
      userService.getUser( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          utilsService.hideLoad();
          vm.events = user.events;
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

    function getPerks(){
      utilsService.showLoad();
      perkService.allPerks()
        .then( complete )
        .catch( failed );

        function complete( perks ){
          utilsService.hideLoad();
          vm.perks = perks;
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }
    

  }
})();