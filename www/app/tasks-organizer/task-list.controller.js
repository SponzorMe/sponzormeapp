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
    'userService',
    'utilsService',
    '$scope',
    '$rootScope',
    '$ionicModal'
  ];

  function TaskListController( $localStorage, perkTaskService , userService, utilsService, $scope, $rootScope, $ionicModal) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;

    vm.indexEvent = -1;
    vm.indexPerk = -1;
    vm.indexTask = -1;
    vm.modalTask = null;
    vm.isNewTask = true;
    vm.task = {};
    vm.showModalTask = showModalTask;
    vm.newTask = newTask;
    vm.hideModalTask = hideModalTask;
    vm.editTask = editTask;
    vm.submitTask = submitTask;
    vm.deleteTask = deleteTask;
    
    activate();
    ////////////

    function activate(){
      vm.events = vm.userAuth.events.filter( filterEvents );
      vm.showEmptyState = vm.events.length == 0 ? true : false;
      
      $ionicModal.fromTemplateUrl('app/tasks-organizer/task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalTask = modal;
      });
    }
    
    function countTasks( events ) {
      return events
        .reduce(function(a,b){ return a.concat(b.perks)}, [])
        .reduce(function(a,b){ return a.concat(b.tasks)}, []);
    }
    
    function countTasksDone( events ) {
      return countTasks(events)
        .filter( filterByDone )
    }
    
    function filterByDone( task ){
      return task.status == "1";
    }
    
    function filterEvents( event ){
      var count = event.perks.reduce(function(a,b){ return a.concat(b.tasks)}, []);
      var today = moment( new Date() ).subtract(1, 'days');
      return moment( event.ends ).isAfter( today ) && count.length > 0;
    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth = $localStorage.userAuth = user;
          vm.events = vm.userAuth.events.filter( filterEvents );
          vm.showEmptyState = vm.events.length == 0 ? true : false;
          console.log(countTasksDone(vm.events).length);
          $rootScope.$broadcast('Menu:count_tasks', countTasksDone(vm.events).length);
        }

        function failed( error ){
          console.log( error);
        }
    }
    
    function showModalTask(){
      vm.modalTask.show();
    }

    function newTask( perk, indexEvent, indexPerk ){
      vm.isNewTask = true;
      vm.indexEvent = indexEvent;
      vm.indexPerk = indexPerk;
      vm.task.perk_id = perk.id;
      vm.task.event_id = perk.id_event;
      vm.showModalTask();
    }

    function hideModalTask( form ){
      vm.modalTask.hide();
      if (form) utilsService.resetForm( form );
      vm.task = {};
    }

    function editTask( task, indexEvent, indexPerk, indexTask ){
      vm.isNewTask = false;
      vm.indexEvent = indexEvent;
      vm.indexPerk = indexPerk;
      vm.indexTask = indexTask;
      vm.task = angular.copy(task);
      vm.task.status = vm.task.status == 1 ? true : false;
      vm.showModalTask();
    }

    function createTask( form ){
      utilsService.showLoad();
      perkTaskService.createPerkTask( preparateTask() )
        .then( complete )
        .catch( failed );

        function complete( data ){
          vm.userAuth.sponzorships_like_organizer = $localStorage.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
          vm.events[vm.indexEvent].perks[vm.indexPerk].tasks.push( data.PerkTask );
          utilsService.resetForm( form );
          vm.hideModalTask();
          utilsService.hideLoad();
          $rootScope.$broadcast('Menu:count_tasks', countTasksDone(vm.events).length);
        }

        function failed( error ){
          utilsService.resetForm( form );
          vm.hideModalTask();
          utilsService.hideLoad();
        }
    }

    function preparateTask(){
      return {
        user_id: vm.userAuth.id,
        event_id: vm.task.event_id,
        perk_id: vm.task.perk_id,
        title: vm.task.title,
        description: vm.task.description,
        type: 0,
        status: vm.task.status ? 1 : 0
      }
    }

    function deleteTask( form ){
      utilsService.showLoad();
      perkTaskService.deletePerkTask( vm.task.id )
      .then( complete )
      .catch( failed );

      function complete( data ){
        vm.userAuth.sponzorships_like_organizer = $localStorage.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
        if( form ) utilsService.resetForm( form );
        vm.events[vm.indexEvent].perks[vm.indexPerk].tasks.splice(vm.indexTask, 1);
        vm.hideModalTask();
        utilsService.hideLoad();
      }

      function failed( error ){
        vm.hideModalTask();
        if( form ) utilsService.resetForm( form );
        utilsService.alert({
          template: error.message
        });
        utilsService.hideLoad();
      }
    }

    function updateTask( form ){
      utilsService.showLoad();
      vm.task.status = vm.task.status ? 1 : 0;
      perkTaskService.editPerkTaskPatch( vm.task.id, vm.task )
      .then( complete )
      .catch( failed );

      function complete( task ){
        vm.events[vm.indexEvent].perks[vm.indexPerk].tasks[vm.indexTask] = task;
        utilsService.resetForm( form );
        vm.hideModalTask();
        utilsService.hideLoad();
        $rootScope.$broadcast('Menu:count_tasks', countTasksDone(vm.events).length);
      }

      function failed( error ){
        utilsService.resetForm( form );
        vm.hideModalTask();
        utilsService.hideLoad();
      }
    }

    function submitTask( form ){
      if(vm.isNewTask){
        createTask( form );
      }else{
        updateTask( form );
      }
    }

    

  }
})();