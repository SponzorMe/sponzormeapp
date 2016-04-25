/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class TaskListCtrl{
  
  $inject = [
    '$scope',
    '$rootScope',
    '$ionicModal',
    'perkTaskService',
    'userService',
    'utilsService',
    'userAuthService',
    'notificationService'
  ];
  userAuth:userModule.User;
  events:eventModule.Event[] = [];
  showEmptyState:boolean = false;
  indexEvent:number = -1;
  indexPerk:number = -1;
  indexTask:number = -1;
  modalTask:ionic.modal.IonicModalController = null;
  isNewTask:boolean = true;
  task:any = {};
  
  constructor(
    private $scope: angular.IScope,
    private $rootScope: angular.IRootScopeService,
    private $ionicModal: ionic.modal.IonicModalService,
    private perkTaskService: perkTaskModule.IPerkTaskService,
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService,
    private userAuthService: userAuthModule.IUserAuthService,
    private notificationService: notificationModule.INotificationService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
    this.events = this.userAuth.events.filter( this._filterEvents );
    this.events.forEach( this._preparateEvents, this );
    this.showEmptyState = this.events.length == 0 ? true : false;
    this._loadTaskModal();
  }
  
  private _filterEvents( event ){
    let count = event.perks.reduce((a,b) => a.concat(b.tasks), []);
    let today = moment( new Date() ).subtract(1, 'days');
    return moment( event.ends ).isAfter( today ) && count.length > 0;
  }
  
  private _preparateEvents( event ){
    event.perks.forEach( perk => {
      perk.sponzorship = _.where(this.userAuth.sponzorships_like_organizer, {perk_id: perk.id});
    });
  }
  
  private _loadTaskModal(){
    this.$ionicModal.fromTemplateUrl('templates/tasks-organizer/task-modal.html', {
      scope: this.$scope,
      animation: 'slide-in-up'
    }).then(modal => {
      this.modalTask = modal;
    });
  }
  
   doRefresh(){
    this.userService.home( this.userAuth.id )
    .then( user => {
      this.$scope.$broadcast('scroll.refreshComplete');
      this.userAuth = this.userAuthService.updateUserAuth( user );
      this.events = this.userAuth.events.filter( this._filterEvents );
      this.events.forEach( this._preparateEvents, this );
      this.showEmptyState = this.events.length == 0 ? true : false;
      this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
      this.$rootScope.$broadcast('TaskTabsCtrl:count_tasks');
    })
    .catch( error => {
      this.$scope.$broadcast('scroll.refreshComplete');
    });
  }
  
  sendNewTaskNotification( text ) {
    for (let index = 0; index < this.events[this.indexEvent].perks[this.indexPerk].sponzorship.length; index++) {
      let sponsorship = this.events[this.indexEvent].perks[this.indexPerk].sponzorship[index];
      this.notificationService.sendNewTaskOrganizer(
        {
          text: text,
          modelId: sponsorship.id
        }, 
        sponsorship.sponzor_id,
        sponsorship.sponzor_ionic_id
      );
    }
  }
  
  sendUpdateTaskNotification( text, done ) {
    for (let index = 0; index < this.events[this.indexEvent].perks[this.indexPerk].sponzorship.length; index++) {
      let sponsorship = this.events[this.indexEvent].perks[this.indexPerk].sponzorship[index];
      if(done){
        this.notificationService.sendDoneTaskOrganizer(
          {
            text: text,
            modelId: sponsorship.id
          },
          sponsorship.sponzor_id,
          sponsorship.sponzor_ionic_id
        );
      }else{
        this.notificationService.sendUpdateTaskOrganizer(
          {
            text: text,
            modelId: sponsorship.id
          }, 
          sponsorship.sponzor_id,
          sponsorship.sponzor_ionic_id
        );
      }
    }
  }
  
  showModalTask(){
    this.modalTask.show();
  }

  newTask( perk, indexEvent, indexPerk ){
    this.isNewTask = true;
    this.indexEvent = indexEvent;
    this.indexPerk = indexPerk;
    this.task.perk_id = perk.id;
    this.task.event_id = perk.id_event;
    this.showModalTask();
  }

  hideModalTask( form ){
    this.modalTask.hide();
    if (form) this.utilsService.resetForm( form );
    this.task = {};
  }

  editTask( task, indexEvent, indexPerk, indexTask ){
    this.isNewTask = false;
    this.indexEvent = indexEvent;
    this.indexPerk = indexPerk;
    this.indexTask = indexTask;
    this.task = angular.copy(task);
    this.task.status = this.task.status == 1 ? true : false;
    this.showModalTask();
  }

  createTask( form ){
    this.utilsService.showLoad();
    this.perkTaskService.createPerkTask( this.preparateTask() )
    .then( data => {
      this.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
      this.userAuth = this.userAuthService.updateUserAuth( this.userAuth );
      this.events[this.indexEvent].perks[this.indexPerk].tasks.push( data.PerkTask );
      this.hideModalTask( form );
      this.utilsService.hideLoad();
      this.sendNewTaskNotification( data.PerkTask.title );
      this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
    })
    .catch( error => {
      this.hideModalTask( form );
      this.utilsService.hideLoad();
    });
  }

  preparateTask(){
    return {
      user_id: this.userAuth.id,
      event_id: this.task.event_id,
      perk_id: this.task.perk_id,
      title: this.task.title,
      description: this.task.description,
      type: 0,
      status: this.task.status ? 1 : 0
    }
  }

  deleteTask( form ){
    this.utilsService.showLoad();
    this.perkTaskService.deletePerkTask( this.task.id )
    .then( data => {
      this.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
      this.userAuth = this.userAuthService.updateUserAuth( this.userAuth );
      this.events[this.indexEvent].perks[this.indexPerk].tasks.splice(this.indexTask, 1);
      this.hideModalTask( form );
      this.utilsService.hideLoad();
      this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
      this.$rootScope.$broadcast('TaskTabsController:count_tasks');
    })
    .catch( error => {
      this.hideModalTask( form );
      this.utilsService.alert({
        template: error.message
      });
      this.utilsService.hideLoad();
    });
  }

  updateTask( form ){
    
    this.utilsService.showLoad();
    this.task.status = this.task.status ? 1 : 0;
    this.perkTaskService.editPerkTaskPatch( this.task.id, this.task )
    .then( task => {
      this.utilsService.resetForm( form );
      this.sendUpdateTaskNotification( task.title, this.events[this.indexEvent].perks[this.indexPerk].tasks[this.indexTask].status == 0 && task.status == 1);
      this.events[this.indexEvent].perks[this.indexPerk].tasks[this.indexTask] = task;
      this.hideModalTask( form );
      this.utilsService.hideLoad();
      this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
      this.$rootScope.$broadcast('TaskTabsController:count_tasks');
    })
    .catch( error => {
      this.hideModalTask( form );
      this.utilsService.hideLoad();
    });
  }

  submitTask( form ){
    if(this.isNewTask){
      this.createTask( form );
    }else{
      this.updateTask( form );
    }
  }
  
}
angular
  .module('app.tasks-organizer')
  .controller('TaskListCtrl', TaskListCtrl);