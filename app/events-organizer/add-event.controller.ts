/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Add Events
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class AddEventCtrl{
  
  $inject = [
    '$scope',
    '$translate',
    'utilsService',
    '$cordovaDatePicker',
    '$cordovaCamera',
    'eventTypeService',
    'eventService',
    '$ionicModal',
    '$cordovaToast',
    '$ionicHistory',
    'imgurService',
    '$state',
    'notificationService',
    'userAuthService',
    '$rootScope',
    'BackendVariables',
    'ionicMaterialInk'
  ];
  newEvent:any = {};
  newPerk:any = {};
  isNewPerk:boolean = true;
  eventTypes:eventTypeModule.EventType[] = [];
  userAuth:userModule.User;
  modalPerk:any = null;
  imageURI:any = null;
  
  constructor(
    private $scope: angular.IScope,
    private $translate,
    private utilsService: utilsServiceModule.IUtilsService,
    private $cordovaDatePicker,
    private $cordovaCamera,
    private eventTypeService: eventTypeModule.IEventTypeService,
    private eventService: eventModule.IEventService,
    private $ionicModal: ionic.modal.IonicModalService,
    private $cordovaToast,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private imgurService: imgurModule.IImgurService,
    private $state: angular.ui.IStateService,
    private notificationService: notificationModule.INotificationService,
    private userAuthService: userAuthModule.IUserAuthService,
    private $rootScope,
    private BackendVariables,
    private ionicMaterialInk
  ){
    
    if(ionic.Platform.isAndroid()){
      this.ionicMaterialInk.displayEffect();
    }
    
    this.userAuth = userAuthService.getUserAuth();
    
    this.newEvent.access = true;
    this.newEvent.perks = [];
    
    if(this.BackendVariables.debug){
      this.newEvent.starttime = "13:00:00";
      this.newEvent.start = moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD');
      this.newEvent.endtime = "15:00:00";
      this.newEvent.end = moment(new Date().getTime()).add(4, 'days').format('YYYY-MM-DD');
    }
    
    this.$rootScope.hideTabs = '';
    
    this.loadModal();
    this.getEventsTypes();
  }
  
  loadModal(){
    this.$ionicModal.fromTemplateUrl('templates/events-organizer/perk-modal.html', {
      scope: this.$scope,
      animation: 'slide-in-up'
    }).then( modal => this.modalPerk = modal );
  }
  
  getEventsTypes(){
    this.eventTypeService.allEventTypes()
      .then( eventTypes => {
        this.eventTypes = eventTypes;
        if(this.eventTypes.length > 0) this.newEvent.type = this.eventTypes[0];
      });
  }
  
  clickedStartDate(){
    let minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
    this._showDatePicker({
      date: minDate,
      mode: 'date', // or 'time'
      minDate: minDate,
      allowOldDates: true,
      allowFutureDates: true,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#F2F3F4',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    })
    .then( date => { this.newEvent.start = moment(date).format('YYYY-MM-DD') });
  }
  
  clickedEndDate(){
    let minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
    this._showDatePicker({
      date: minDate,
      mode: 'date', // or 'time'
      minDate: minDate,
      allowOldDates: true,
      allowFutureDates: true,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#F2F3F4',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    })
    .then( date => { this.newEvent.end = moment(date).format('YYYY-MM-DD') });
  };
  
  clickedStartTime(){
    let minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
    this._showDatePicker({
      date: minDate,
      mode: 'time', // or 'time'
      minDate: minDate,
      allowOldDates: true,
      allowFutureDates: true,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#F2F3F4',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    })
    .then( date => { this.newEvent.starttime = moment(date).format('HH:mm:ss') });
  }
  
  clickedEndTime(){
    let minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
    this._showDatePicker({
      date: minDate,
      mode: 'time', // or 'time'
      minDate: minDate,
      allowOldDates: true,
      allowFutureDates: true,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#F2F3F4',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    })
    .then( date => { this.newEvent.endtime = moment(date).format('HH:mm:ss') });
  }
  
  getPhoto(){
    let options = {
      quality: 100,
      destinationType:  Camera.DestinationType.DATA_URL,
      sourceType:  Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      //popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
    };

    this.$cordovaCamera.getPicture( options )
    .then( imageURI => {
      this.imageURI = imageURI;
      this.newEvent.image = "data:image/jpeg;base64," + imageURI;
    });
  }
  
  submitEvent( form ){
    this.utilsService.showLoad();
    if(this.imageURI){
      this._createEventWithImage(form);
    }else{
      this._createEvent(form);
    }
  }
    
  private _createEventWithImage(form:any){
    this.imgurService.uploadImage( this.imageURI )
    .then(image => {
      this.newEvent.image = image;
      return this.eventService.createEvent( this._preparateData() );
    })
    .then( event => {
      this.utilsService.hideLoad();
      this.utilsService.resetForm( form );
      this.newEvent = {};
      this.userAuth.events.push( event );
      this.userAuthService.updateUserAuth( this.userAuth );
      this.$ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
      });
      this.$ionicHistory.clearCache().then(() => {
        this.notificationService.sendNewEvent();
        
        this.$rootScope.$broadcast('MenuOrganizerCtrl:count_events');
        this.$rootScope.$broadcast('EventsTabsCtrl:count_events');
        this.$rootScope.$broadcast('EventListOrganizerCtrl:getEvents');
        
        this.$state.go("organizer.events.list");
      });
      this.$cordovaToast.showShortBottom(this.$translate.instant("MESSAGES.succ_event_mess"));
    })
    .catch( error => {
      this.utilsService.hideLoad();
      this.utilsService.alert({
        title: this.$translate.instant("ERRORS.addeventsform_error_tit"),
        template: this.$translate.instant("ERRORS.addeventsform_error_mess"),
      });
    });
  }
    
  private _createEvent(form:any){
    this.eventService.createEvent( this._preparateData() )
      .then( event => {
        
        this.utilsService.resetForm( form );
        this.newEvent = {};
        this.userAuth.events.push( event );
        this.userAuthService.updateUserAuth( this.userAuth );
        this.$ionicHistory.nextViewOptions({
          disableAnimate: false,
          disableBack: true
        });
        this.$ionicHistory.clearCache()
        .then(() => {
          this.notificationService.sendNewEvent();
          
          this.$rootScope.$broadcast('MenuOrganizerCtrl:count_events');
          this.$rootScope.$broadcast('EventsTabsCtrl:count_events');
          this.$rootScope.$broadcast('EventListOrganizerCtrl:getEvents');
          this.utilsService.hideLoad();
          this.$cordovaToast.showShortBottom(this.$translate.instant("MESSAGES.succ_event_mess"));
          this.$state.go("organizer.events.list");
        })
        .catch( error => {
          this.utilsService.hideLoad();
        })
        
      })
      .catch( error => {
        this.utilsService.hideLoad();
        this.utilsService.alert({
          title: this.$translate.instant("ERRORS.addeventsform_error_tit"),
          template: this.$translate.instant("ERRORS.addeventsform_error_mess"),
        });
      });
  }
    
  openModalPerk(){
    this.modalPerk.show();
  }

  closeModalPerk( form? ){
    this.modalPerk.hide();
    if (form) this.utilsService.resetForm( form );
    this.newPerk = {};
  } 

  createPerk(){
    this.isNewPerk = true;
    this.openModalPerk();
  }

  editPerk( data ){
    this.isNewPerk = false;
    this.newPerk = data;
    this.openModalPerk();
  }

  addPerk(){
    this.newEvent.perks.push({
      kind: this.newPerk.kind,
      usd: this.newPerk.usd,
      total_quantity: this.newPerk.total_quantity,
      reserved_quantity: 0
    });
    this.closeModalPerk();
  }

  deletePerk(){
    let index = this.newEvent.perks.indexOf( this.newPerk );
    this.newEvent.perks.splice(index, 1);
    this.closeModalPerk();
  }

  updatePerk(){
    this.closeModalPerk();
  }

  submitPerk( form ){
    if(this.isNewPerk){
      this.addPerk();
      this.utilsService.resetForm( form );
    }else{
      this.updatePerk();
      this.utilsService.resetForm( form );
    }
  }
  
  private _showDatePicker( options ) {
    return this.$cordovaDatePicker.show( options );
  }
  
  private _preparateData() {

    function joinDate(date, time) {
      date = moment(date,"YYYY-MM-DD").format("YYYY-MM-DD");
      time = moment(date + " " + time).format("HH:mm:ss");
      return date + " " + time;
    }

    return {
      title: this.newEvent.title,
      location: this.newEvent.location.formatted_address,
      location_reference: this.newEvent.location.place_id,
      description: this.newEvent.description,
      starts: joinDate(this.newEvent.start, this.newEvent.starttime),
      ends: joinDate(this.newEvent.end, this.newEvent.endtime),
      image: this.newEvent.image ? this.newEvent.image : "http://i.imgur.com/t8YehGM.jpg",
      privacy: this.newEvent.privacy ? 0 : 1,
      lang: this.$translate.use(),
      organizer: this.userAuth.id,
      category: 1,
      type: this.newEvent.type.id,
      perks: this.newEvent.perks,
      sumary: this.newEvent.description.substr(0, 159)
    }
  }
  
  
  
}
angular
  .module('app.dashboard-sponzor')
  .controller('AddEventCtrl', AddEventCtrl);