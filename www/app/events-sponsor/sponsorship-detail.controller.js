/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-sponzor')
    .controller('SponsorshipSponsorDetailController', SponsorshipSponsorDetailController);

  SponsorshipSponsorDetailController.$inject = [
    '$scope',
    'utilsService',
    '$stateParams',
    '$localStorage',
    '$ionicModal',
    '$ionicHistory',
    '$cordovaToast',
    '$translate',
    'tasksSponsorService'
  ];

  function SponsorshipSponsorDetailController( $scope, utilsService, $stateParams, $localStorage, $ionicModal, $ionicHistory, $cordovaToast, $translate, tasksSponsorService) {

    var vm = this;
    vm.sponzorship = {};
    vm.userAuth = $localStorage.userAuth;
    
    vm.modalTask = null;
    vm.isNewTask = true;
    vm.task = {};
    vm.showModalTask = showModalTask;
    vm.newTask = newTask;
    vm.hideModalTask = hideModalTask;
    vm.editTask = editTask;
    vm.submitTask = submitTask;
    vm.deleteTask = deleteTask;
    
    vm.indexSlide = 0;
    vm.slideChange = slideChange;

    activate();
    ////////////

    function activate(){
      vm.sponzorship = _.findWhere(vm.userAuth.sponzorships, {id: $stateParams.id});

      $ionicModal.fromTemplateUrl('app/events-sponsor/task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalTask = modal;
      });
    }
    
    function slideChange( index ) {
      vm.indexSlide = index;
    }
    
    function showModalTask(){
      vm.modalTask.show();
    }

    function newTask(){
      vm.isNewTask = true;
      vm.showModalTask();
    }

    function hideModalTask( form ){
      vm.modalTask.hide();
      if (form) utilsService.resetForm( form );
      vm.task = {};
    }

    function editTask( task ){
      vm.isNewTask = false;
      vm.newTask = task;
      vm.newTask.title = vm.newTask.task.title,
      vm.newTask.description = vm.newTask.task.description
      vm.newTask.status = vm.newTask.task.status == 1 ? true : false;
      vm.showModalTask();
    }

    function createTask( form ){
      tasksSponsorService.createTask( preparateTask() )
      .then( complete )
      .catch( failed );
      
      function complete( data ) {
        vm.sponzorship.perk.tasks.push( data.PerkTask );
        vm.sponzorship.task_sponzor.push( data.TaskSponzor );
        vm.hideModalTask( form );
      }
      
      function failed(params) {
        
      }
    }
    
    function preparateTask( task ){
      return {
        type: 1, //Because is created by the Sponzor
        status: vm.newTask.status ? 1 : 0,
        perk_id: vm.sponzorship.perk.id,
        event_id: vm.sponzorship.event.id,
        sponzorship_id: vm.sponzorship.id,
        user_id: vm.userAuth.id,
        organizer_id: vm.sponzorship.organizer.id,
        sponzor_id: vm.userAuth.id,
        title: vm.newTask.title,
        description: vm.newTask.description
      }
    }

    function deleteTask( form ){
      
    }

    function updateTask( form ){
      vm.task.status = vm.task.status ? 1 : 0;
      
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