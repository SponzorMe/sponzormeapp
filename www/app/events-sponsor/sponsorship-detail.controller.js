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
    'tasksSponsorService',
    'userAuthService',
    'notificationService'
  ];

  function SponsorshipSponsorDetailController( $scope, utilsService, $stateParams, $localStorage, $ionicModal, $ionicHistory, $cordovaToast, $translate, tasksSponsorService, userAuthService, notificationService) {

    var vm = this;
    vm.sponzorship = {};
    vm.userAuth = userAuthService.getUserAuth();
    
    vm.modalTask = null;
    vm.isNewTask = true;
    vm.showModalTask = showModalTask;
    vm.sponsorTask = {};
    vm.hideModalTask = hideModalTask;
    vm.newTask = newTask;
    vm.editTask = editTask;
    vm.submitTask = submitTask;
    vm.deleteTask = deleteTask;
    
    vm.indexSlide = 0;
    vm.slideChange = slideChange;

    activate();
    ////////////

    function activate(){
      vm.sponsorTask = { task: {} }
      vm.sponzorship = _.findWhere(vm.userAuth.sponzorships, {id: $stateParams.id});
      vm.sponzorship.task_sponzor = vm.sponzorship.task_sponzor.filter( filterTaskSponsor );

      $ionicModal.fromTemplateUrl('app/events-sponsor/task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalTask = modal;
      });
    }
    
    function filterTaskSponsor( item ) {
      return item.task.user_id == vm.userAuth.id;
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
      vm.sponsorTask = { task: {} }
    }

    function editTask( task ){
      vm.isNewTask = false;
      vm.sponsorTask = angular.copy(task);
      vm.showModalTask();
    }

    function createTask( form ){
      utilsService.showLoad();
      tasksSponsorService.createTask( preparateTask() )
      .then( complete )
      .catch( failed );
      
      function complete( TaskSponzor ) {
        vm.sponzorship.perk.tasks.push( TaskSponzor.task );
        vm.sponzorship.task_sponzor.push( TaskSponzor );
        vm.hideModalTask( form );
        notificationService.sendNotification({}, TaskSponzor.organizer_id);
        utilsService.hideLoad();
      }
      
      function failed() {
        utilsService.hideLoad();
      }
    }
    
    function preparateTask( task ){
      return {
        type: 1, //Because is created by the Sponzor
        status: vm.sponsorTask.task.status ? 1 : 0,
        perk_id: vm.sponzorship.perk.id,
        event_id: vm.sponzorship.event.id,
        sponzorship_id: vm.sponzorship.id,
        user_id: vm.userAuth.id,
        organizer_id: vm.sponzorship.organizer.id,
        sponzor_id: vm.userAuth.id,
        title: vm.sponsorTask.task.title,
        description: vm.sponsorTask.task.description,
        task_id: vm.sponsorTask.task.id
      }
    }

    function deleteTask( form ){
      utilsService.showLoad();
      tasksSponsorService.deleteTask( vm.sponsorTask.id )
      .then( complete )
      .catch( failed );
      
      function complete( data ) {
        var perkTask = _.findWhere( vm.sponzorship.perk.tasks, {id: vm.sponsorTask.task.id} );
        var taskSponzor = _.findWhere( vm.sponzorship.task_sponzor, {id: vm.sponsorTask.id} );
        var indexPerkTask = _.indexOf(vm.sponzorship.perk.tasks, perkTask);
        var indexSponzorTask = _.indexOf(vm.sponzorship.task_sponzor, taskSponzor);
        vm.sponzorship.perk.tasks.splice(indexPerkTask, 1);
        vm.sponzorship.task_sponzor.splice(indexSponzorTask, 1);
        vm.hideModalTask( form );
        utilsService.hideLoad();
      }
      
      function failed() {
        vm.hideModalTask( form );
        utilsService.hideLoad();
      }
    }

    function updateTask( form ){
      utilsService.showLoad();
      var task = preparateTask();
      task.id = vm.sponsorTask.id;
      tasksSponsorService.editPutTask( task.id, task )
      .then( complete )
      .catch( failed );
      
      function complete( TaskSponsor ) {
        var perkTask = _.findWhere( vm.sponzorship.perk.tasks, {id: vm.sponsorTask.task.id} );
        var taskSponzor = _.findWhere( vm.sponzorship.task_sponzor, {id: vm.sponsorTask.id} );
        var indexPerkTask = _.indexOf(vm.sponzorship.perk.tasks, perkTask);
        var indexSponzorTask = _.indexOf(vm.sponzorship.task_sponzor, taskSponzor);
        vm.sponzorship.perk.tasks[indexPerkTask] = vm.sponsorTask.task;
        vm.sponzorship.task_sponzor[indexSponzorTask] = vm.sponsorTask;
        notificationService.sendNotification({}, TaskSponsor.organizer_id);
        vm.hideModalTask( form );
        utilsService.hideLoad();
      }
      
      function failed() {
        vm.hideModalTask( form );
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