/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.tasks-organizer')
    .controller('TaskListController', TaskListController);

  TaskListController.$inject = [
    '$localStorage',
    'perkTaskService',
    'utilsService'  
  ];

  function TaskListController( $localStorage, perkTaskService , utilsService) {

    var vm = this;
    vm.userAuth = $localStorage.userAuth;
    vm.tasks = [];
    vm.showEmptyState = false;

    activate();

    ////////////

    function activate(){
      getTasks();
    }

    function getTasks(){
      utilsService.showLoad();
      perkTaskService.allPerkTasks(  )
        .then( complete )
        .catch( failed );

        function complete( tasks ){
          utilsService.hideLoad();
          vm.tasks = tasks;
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

    
    

  }
})();