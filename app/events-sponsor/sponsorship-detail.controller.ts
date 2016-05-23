/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class SponsorshipSponsorDetailCtrl{
  
  $inject = [
    '$scope',
    '$rootScope',
    '$stateParams',
    '$translate',
    '$ionicModal',
    '$ionicHistory',
    '$cordovaToast',
    'utilsService',
    'taskSponsorService',
    'userAuthService',
    'notificationService',
    'ionicMaterialInk'
  ];
  sponsorship:any = {};
  userAuth:userModule.User;
  modalTask: ionic.modal.IonicModalController = null;
  isNewTask:boolean = true;
  sponsorTask:any = { task: {} };
  indexSlide:number = 0;
  
  constructor(
    private $scope: angular.IScope,
    private $rootScope: angular.IRootScopeService,
    private $stateParams,
    private $translate,
    private $ionicModal: ionic.modal.IonicModalService,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private $cordovaToast,
    private utilsService: utilsServiceModule.IUtilsService,
    private taskSponsorService: taskSponsorModule.ITasksSponsor,
    private userAuthService: userAuthModule.IUserAuthService,
    private notificationService: notificationModule.INotificationService,
    private ionicMaterialInk
  ){
    if(ionic.Platform.isAndroid()){
      this.ionicMaterialInk.displayEffect();
    }
    
    this.userAuth = this.userAuthService.getUserAuth();
    this.sponsorship = _.findWhere(this.userAuth.sponzorships, {id: this.$stateParams.id});
    this.sponsorship.task_sponzor = this.sponsorship.task_sponzor.filter( item => item.task.user_id == this.userAuth.id);
    
    this._loadModalTask(); 
    this._registerListenerSponsorshipDetail();
  }
  
  slideChange( index ) {
    this.indexSlide = index;
  }
  
  showModalTask(){
    this.modalTask.show();
  }

  newTask(){
    this.isNewTask = true;
    this.showModalTask();
  }
  
  hideModalTask( form ){
    this.modalTask.hide();
    if (form) this.utilsService.resetForm( form );
    this.sponsorTask = { task: {} }
  }

  editTask( task ){
    this.isNewTask = false;
    this.sponsorTask = angular.copy(task);
    this.sponsorTask.status = this.sponsorTask.status == 1 ? true:false;
    this.showModalTask();
  }
  
  createTask( form ){
    this.utilsService.showLoad();
    this.taskSponsorService.createTask( this._preparateTask() )
    .then( data => {
      this.sponsorship.perk.tasks.push( data.TaskSponzor.task );
      this.sponsorship.task_sponzor.push( data.TaskSponzor );
      this.hideModalTask( form );
      
      this.notificationService.sendNewTaskSponsor(
        {
          text: data.TaskSponzor.task.title,
          modelId: this.sponsorship.id
        },
        data.TaskSponzor.organizer_id,
        data.TaskSponzor.organizer_ionic_id
      );
      
      this.utilsService.hideLoad();
    })
    .catch( error => {
      this.utilsService.hideLoad();
    });
  }
  
  deleteTask( form ){
    this.utilsService.showLoad();
    this.taskSponsorService.deleteTask( this.sponsorTask.id )
    .then( data => {
      let perkTask = _.findWhere( this.sponsorship.perk.tasks, {id: this.sponsorTask.task.id} );
      let taskSponzor = _.findWhere( this.sponsorship.task_sponzor, {id: this.sponsorTask.id} );
      let indexPerkTask = _.indexOf(this.sponsorship.perk.tasks, perkTask);
      let indexSponzorTask = _.indexOf(this.sponsorship.task_sponzor, taskSponzor);
      this.sponsorship.perk.tasks.splice(indexPerkTask, 1);
      this.sponsorship.task_sponzor.splice(indexSponzorTask, 1);
      this.hideModalTask( form );
      this.utilsService.hideLoad();
    })
    .catch( error => {
      this.hideModalTask( form );
      this.utilsService.hideLoad();
    });
  }
  
  updateTask( form ){
    this.utilsService.showLoad();
    
    let task = this._preparateTask();
    task.id = this.sponsorTask.id;
    
    this.taskSponsorService.editPutTask( String(task.id), task )
    .then( TaskSponsor => {
      
      let perkTask = _.findWhere( this.sponsorship.perk.tasks, {id: this.sponsorTask.task.id} );
      let taskSponzor = _.findWhere( this.sponsorship.task_sponzor, {id: this.sponsorTask.id} );
      let indexPerkTask = _.indexOf(this.sponsorship.perk.tasks, perkTask);
      let indexSponzorTask = _.indexOf(this.sponsorship.task_sponzor, taskSponzor);
      
      if(this.sponsorTask.status == 1 && TaskSponsor.status == "1"){
        this.notificationService.sendDoneTaskSponsor(
          {
            text: this.sponsorTask.task.title,
            modelId: this.sponsorship.id
          }, 
          TaskSponsor.organizer_id,
          TaskSponsor.organizer_ionic_id
        );
      }else{
        this.notificationService.sendUpdateTaskSponsor(
          {
            text: this.sponsorTask.task.title,
            modelId: this.sponsorship.id
          }, 
          TaskSponsor.organizer_id,
          TaskSponsor.organizer_ionic_id
        );
      }
      
      this.sponsorship.perk.tasks[indexPerkTask] = this.sponsorTask.task;
      this.sponsorship.task_sponzor[indexSponzorTask] = this.sponsorTask;
      this.hideModalTask( form );
      this.utilsService.hideLoad();
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
  
  private _preparateTask(){
    return {
      id: -1,
      type: 1, //Because is created by the Sponzor
      status: this.sponsorTask.status ? 1 : 0,
      perk_id: this.sponsorship.perk.id,
      event_id: this.sponsorship.event.id,
      sponzorship_id: this.sponsorship.id,
      user_id: this.userAuth.id,
      organizer_id: this.sponsorship.organizer.id,
      sponzor_id: this.userAuth.id,
      title: this.sponsorTask.task.title,
      description: this.sponsorTask.task.description,
      task_id: this.sponsorTask.task.id
    }
  }
  
  private _loadModalTask(){
    this.$ionicModal.fromTemplateUrl('templates/events-sponsor/task-modal.html', {
      scope: this.$scope,
      animation: 'slide-in-up'
    }).then(modal => {
      this.modalTask = modal;
    });
  }
  
  private _registerListenerSponsorshipDetail(){
    this.$rootScope.$on('SponsorshipSponsorDetailCtrl:update', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.sponsorship = _.findWhere(this.userAuth.sponzorships, {id: this.$stateParams.id});
      this.sponsorship.task_sponzor = this.sponsorship.task_sponzor.filter( item => item.task.user_id == this.userAuth.id);
    });
  }
  
}
angular
  .module('app.events-sponzor')
  .controller('SponsorshipSponsorDetailCtrl', SponsorshipSponsorDetailCtrl);