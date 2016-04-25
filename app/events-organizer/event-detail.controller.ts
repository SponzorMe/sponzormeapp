/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class EventDetailOrganizerCtrl{
  
  $inject = [
    '$scope',
    '$stateParams',
    '$state',
    '$translate',
    '$rootScope',
    '$ionicPopup',
    '$ionicActionSheet',
    '$ionicSideMenuDelegate',
    '$ionicHistory',
    '$ionicModal',
    '$cordovaSocialSharing',
    '$cordovaCalendar',
    '$cordovaToast',
    'BackendVariables',
    'eventService',
    'utilsService',
    'sponsorshipService',
    'notificationService',
    'userAuthService',
    'perkTaskService'
  ];
  popupOptionsSponsorship:any = null;
  hideSheet:any = null;
  url_image:string = '';
  event:eventModule.Event;
  userAuth:userModule.User; 
  indexPerk:number = -1;
  indexTask:number = -1;
  modalTask:any = null;
  isNewTask:boolean = true;
  task:any = {};
  sponsorshipSelected:any = {};
  
  constructor(
    private $scope: angular.IScope,
    private $stateParams,
    private $state: angular.ui.IStateService,
    private $translate,
    private $rootScope,
    private $ionicPopup: ionic.popup.IonicPopupService,
    private $ionicActionSheet: ionic.actionSheet.IonicActionSheetService,
    private $ionicSideMenuDelegate: ionic.sideMenu.IonicSideMenuDelegate,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private $ionicModal: ionic.modal.IonicModalService,
    private $cordovaSocialSharing,
    private $cordovaCalendar,
    private $cordovaToast,
    private BackendVariables,
    private eventService: eventModule.IEventService,
    private utilsService: utilsServiceModule.IUtilsService,
    private sponsorshipService: sponsorshipModule.ISponsorshipService,
    private notificationService: notificationModule.INotificationService,
    private userAuthService: userAuthModule.IUserAuthService,
    private perkTaskService: perkTaskModule.IPerkTaskService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
    
    this.event = _.findWhere(this.userAuth.events, {id: $stateParams.id});
    this.event.perks.forEach( this._preparatePerks, this );
    
    this.$ionicSideMenuDelegate.canDragContent(false);
    this._loadTaskModal();    
  }
  
  private _preparatePerks( perk ){
    perk.sponzorship = _.where(this.userAuth.sponzorships_like_organizer, {perk_id: perk.id});
    perk.tasks = _.where(perk.tasks, {user_id: this.userAuth.id});
  }
  
  private _loadTaskModal(){
    this.$ionicModal.fromTemplateUrl('templates/events-organizer/task-modal.html', {
      scope: this.$scope,
      animation: 'slide-in-up'
    }).then((modal) => {
      this.modalTask = modal;
    });
  }
  
  //Options for sponsorship modal
  
  private  _editEvent(){
    this.$state.go('organizer.editevent', { id: this.event.id });
  }
  
  private _shareEvent(){
    let message = this.event.title;
    let subject = this.event.description;
    let image = this.event.image;
    let link =  this.url_image + '#/event/' + this.event.id;
    this.$cordovaSocialSharing
    .share( message, subject, image, link) // Share via native share sheet
    .then( () => {
      this.$cordovaToast.showShortBottom(  this.$translate.instant("MESSAGES.succ_add_to_calendar") );
    });
  }

  private _addToCalendar(){
    this.$cordovaCalendar
    .createEvent({
      title: this.event.title,
      location: this.event.location,
      notes: this.event.description,
      startDate: this.event.starts,
      endDate: this.event.ends
    })
    .then( () => {
      this.$cordovaToast.showShortBottom(this.$translate.instant("MESSAGES.succ_add_to_calendar"));
    });
  }
  
  //Send Notifications
  
  private _sendNewTaskNotification( text ) {
    for (let index = 0; index < this.event.perks[this.indexPerk].sponzorship.length; index++) {
      let sponsorship = this.event.perks[this.indexPerk].sponzorship[index];
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
    
  private _sendUpdateTaskNotification( text, done ) {
    for (let index = 0; index < this.event.perks[this.indexPerk].sponzorship.length; index++) {
      let sponsorship = this.event.perks[this.indexPerk].sponzorship[index];
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
  
  //Popup Sponsorship
  
  openOptionsSponsorship( sponsorship ){
    this.sponsorshipSelected = sponsorship;
    this.popupOptionsSponsorship = this.$ionicPopup.show({
      title: this.$translate.instant("EVENTDETAIL.options_title"),
      templateUrl: "templates/events-organizer/options-sponsorship.html",
      scope: this.$scope,
    });
  }
  
  closeOptionsSponsorship(){
    this.popupOptionsSponsorship.close();
  }
  
  //deleteEvent
  
  deleteEvent(){
    this.utilsService.showLoad();
    this.eventService.deleteEvent( this.$stateParams.id )
    .then( event => {
      this.utilsService.hideLoad();
      this.hideActionSheet();
      this.$ionicHistory.clearCache();
      this.$ionicHistory.goBack();
    })
    .catch( error => {
      this.utilsService.hideLoad();
      this.hideActionSheet();
      this.utilsService.alert({
        title: 'Error',
        template: error.message
      });
    });
  }
  
  updateSponsorship( status ){
    this.utilsService.showLoad();
    var sponsorship = angular.copy( this.sponsorshipSelected );
    sponsorship.status = status;
    this.sponsorshipService.editSponzorshipPut( sponsorship.id, sponsorship )
    .then( sponsorship => {
      this.utilsService.hideLoad();
      this.sponsorshipSelected.status = sponsorship.status; 
      
      var notification = {
        text: this.event.title,
        link: '#/sponzors/sponzoring',
        modelId: sponsorship.id
      };
      
      if(sponsorship.status == 1){ //Accepted 
        this.notificationService.sendAcceptSponsorship(notification, sponsorship.sponzor_id, sponsorship.ionic_id);
      }else if(sponsorship.status == 2){//Deny
        this.notificationService.sendRejectSponsorship(notification, sponsorship.sponzor_id, sponsorship.ionic_id);
      }
      
      this.closeOptionsSponsorship();
    })
    .catch( error => {
      this.utilsService.hideLoad();
      this.closeOptionsSponsorship();
    });

  }
  
  showActionSheet(){
    this.hideSheet = this.$ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-edit"></i> ' + this.$translate.instant("EVENTDETAIL.edit_event") },
        { text: '<i class="icon ion-share"></i> <b> ' + this.$translate.instant("EVENTDETAIL.share") + ' </br>' },
        { text: '<i class="icon ion-calendar"></i> ' + this.$translate.instant("EVENTDETAIL.add_calendar") }
      ],
      destructiveText: '<i class="icon ion-trash-a"></i> ' + this.$translate.instant("EVENTDETAIL.delete_event"),
      titleText: this.$translate.instant("EVENTDETAIL.options"),
      cancelText: '<i class="icon ion-close"></i> ' + this.$translate.instant("EVENTDETAIL.cancel"),
      buttonClicked: index => {
        
        if(index == 0){
          this._editEvent();
        }else if(index == 1){
          this._shareEvent();
        }else if(index == 2){
          this._addToCalendar();
        }
      
        return true;
      },
      destructiveButtonClicked: () => {
        this.deleteEvent();
        return true;
      }
    });
  }
  
  hideActionSheet(){
    this.hideSheet();
  }
  
  showModalTask(){
    this.modalTask.show();
  }

  newTask( perk, indexPerk ){
    this.isNewTask = true;
    this.indexPerk = indexPerk; 
    this.task.perk_id = perk.id;
    this.task.event_id = this.event.id;
    this.showModalTask();
  }

  editTask( task, indexPerk, indexTask ){
    this.isNewTask = false;
    this.indexPerk = indexPerk; 
    this.indexTask = indexTask;
    this.task = angular.copy( task );
    this.task.status = this.task.status == 1 ? true : false;
    this.showModalTask();
  }
  
  createTask( form ){
    this.utilsService.showLoad();
    this.perkTaskService.createPerkTask( this.preparateTask() )
    .then( data => {
      this.event.perks[this.indexPerk].tasks.push( data.PerkTask );
      this.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
      this.userAuthService.updateUserAuth( this.userAuth );
      this._sendNewTaskNotification( data.PerkTask.title );
      
      this.$rootScope.$broadcast('MenuOrganizer:count_tasks');
      
      this.utilsService.resetForm( form );
      this._hideModalTask( form );
      this.utilsService.hideLoad();
    })
    .catch( error => {
      this.utilsService.resetForm( form );
      this._hideModalTask( form );
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
      status: 0
    }
  }

  deleteTask( form ){
    this.utilsService.showLoad();
    this.perkTaskService.deletePerkTask( this.task.id )
    .then( data => {
      this.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
      this.event.perks[this.indexPerk].tasks.splice(this.indexTask, 1);
      this.userAuthService.updateUserAuth( this.userAuth );
      if( form ) this.utilsService.resetForm( form );
      this._hideModalTask( form );
      this.utilsService.hideLoad();
      this.$rootScope.$broadcast('MenuOrganizer:count_tasks');
      this.$rootScope.$broadcast('TaskTabsController:count_tasks');
    })
    .catch( error => {
      this._hideModalTask( form );
      if( form ) this.utilsService.resetForm( form );
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
      this._sendUpdateTaskNotification( task.title, this.event.perks[this.indexPerk].tasks[this.indexTask].status == 0 && task.status == 1);
      this.event.perks[this.indexPerk].tasks[this.indexTask] = task;
      this.utilsService.resetForm( form );
      
      this.$rootScope.$broadcast('MenuOrganizer:count_tasks');
      this.$rootScope.$broadcast('TaskTabsController:count_tasks');
      
      this._hideModalTask( form );
      this.utilsService.hideLoad();
    })
    .catch( error => {
      this.utilsService.resetForm( form );
      this._hideModalTask( form );
      this.utilsService.hideLoad();
    });
  }

  submitTask( form ){
    if(this.isNewTask){
      this.createTask( form );
    }else{
     this. updateTask( form );
    }
  }
  
  private _hideModalTask( form ){
    this.modalTask.hide();
    if (form) this.utilsService.resetForm( form );
    this.task = {};
    this.indexPerk = -1; 
    this.indexTask = -1;
  }
  
  private _filterByTypePerk( task ){
    return task.type == '0'; //Organizer
  }
  
}
angular
  .module('app.events-organizer')
  .controller('EventDetailOrganizerCtrl', EventDetailOrganizerCtrl);