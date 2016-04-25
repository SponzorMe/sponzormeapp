/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="user.service.ts" />
/// <reference path="userAuth.service.ts" />
/// <reference path="push.service.ts" />

module notificationModule{
  
  export interface INotificationService{
    activate():void;
    getNotifications(userId:string): any;
    sendNewSponsorship(notification: any, to:string, ionicId:string): void;
    sendAcceptSponsorship(notification: any, to:string, ionicId:string): void,
    sendRejectSponsorship(notification: any, to:string, ionicId:string): void,
    sendNewTaskOrganizer(notification: any, to:string, ionicId:string): void,
    sendUpdateTaskOrganizer(notification: any, to:string, ionicId:string): void,
    sendDoneTaskOrganizer(notification: any, to:string, ionicId:string): void,
    sendNewTaskSponsor(notification: any, to:string, ionicId:string): void,
    sendUpdateTaskSponsor(notification: any, to:string, ionicId:string): void,
    sendDoneTaskSponsor(notification: any, to:string, ionicId:string): void,
    sendNewEvent(): void,
    sendUpdateEvent(): void,
  }
  
  export interface Notification{
    title:string;
    message: string;
    date: number;
    to: string;
    fromApp: string;
    toApp: string;
    read: boolean;
    typeNotification: string;
    type: string;
    text: string;
    modelId: string;
    ionicId: string;
  }
  
  export class notificationService implements INotificationService{
    
    $inject = [
      '$http',
      '$q',
      '$localStorage',
      '$rootScope',
      '$translate',
      '$firebaseArray',
      '$ionicHistory',
      'BackendVariables',
      'userService',
      'userAuthService',
      'pushService'
    ];
    path:string;
    userAuth:userModule.User;
    
    constructor(
      private $http: angular.IHttpService,
      private $q: angular.IQService,
      private $localStorage,
      private $rootScope: angular.IRootScopeService,
      private $translate,
      private $firebaseArray,
      private $ionicHistory: ionic.navigation.IonicHistoryService,
      private BackendVariables,
      private userService: userModule.IUserService,
      private userAuthService: userAuthModule.IUserAuthService,
      private pushService: pushModule.IPushService
    ){
      this.path = this.BackendVariables.f_url;
    }
    
    activate() {
      this.userAuth = this.userAuthService.getUserAuth();
      this._notificationForMe();
      if(this.userAuth.type == '1') this._updateEvents();
    }
    
    getNotifications( userId:string ) {
      let url = `${this.path}notifications/${userId}`;
      return this.$firebaseArray( new Firebase( url ));
    }
    
    sendNewSponsorship(notification: Notification, to:string, ionicId:string):void {
      notification.typeNotification = "newSponsorship";
      notification.type = "sponsorship";
      this._sendNotification(notification, to, ionicId);
    }
    
    sendAcceptSponsorship(notification: Notification, to:string, ionicId:string):void {
      notification.typeNotification = "acceptSponsorship";
      notification.type = "sponsorship";
      this._sendNotification(notification, to, ionicId);
    }
    
    sendRejectSponsorship(notification: Notification, to:string, ionicId:string):void {
      notification.typeNotification = "rejectSponsorship";
      notification.type = "sponsorship";
      this._sendNotification(notification, to, ionicId);
    }
    
    sendNewTaskOrganizer(notification: Notification, to:string, ionicId:string):void {
      notification.typeNotification = "newTaskOrganizer";
      notification.type = "task";
      this._sendNotification(notification, to, ionicId);
    }
    
    sendUpdateTaskOrganizer(notification: Notification, to:string, ionicId:string):void {
      notification.typeNotification = "doneTaskOrganizer";
      notification.type = "task";
      this._sendNotification(notification, to, ionicId);
    }
    
    sendDoneTaskOrganizer(notification: Notification, to:string, ionicId:string):void {
      notification.typeNotification = "updateTaskOrganizer";
      notification.type = "task";
      this._sendNotification(notification, to, ionicId);
    }
    
    sendNewTaskSponsor(notification: Notification, to:string, ionicId:string):void {
      notification.typeNotification = "newTaskSponsor";
      notification.type = "task";
      this._sendNotification(notification, to, ionicId);
    }
    
    sendUpdateTaskSponsor(notification: Notification, to:string, ionicId:string):void{
      notification.typeNotification = "updateTaskSponsor";
      notification.type = "task";
      this._sendNotification(notification, to, ionicId);
    }
    
    sendDoneTaskSponsor(notification: Notification, to:string, ionicId:string):void{
      notification.typeNotification = "doneTaskSponsor";
      notification.type = "task";
      this._sendNotification(notification, to, ionicId);
    }
    
    sendNewEvent():void{
      let notification:any = {};
      
      notification.date = new Date().getTime();
      notification.fromApp = 'mobileApp';
      notification.toApp = 'mobileApp';
      
      let url = this.path + 'notifications/events';
      let notificationsRef =  this.$firebaseArray( new Firebase( url ));
      
      notificationsRef.$add(notification);
    }
    
    sendUpdateEvent():void{
      let notification:any = {};
      notification.date = new Date().getTime();
      notification.fromApp = 'mobileApp';
      notification.toApp = 'mobileApp';
      
      let url = this.path + 'notifications/events';
      let notificationsRef =  this.$firebaseArray( new Firebase( url ));
      
      notificationsRef.$add(notification);
    }
    
    private _sendNotification(notification: Notification, to:string, ionicId:string):void{
      
      notification.date = new Date().getTime();
      notification.to = to;
      notification.fromApp = 'mobileApp';
      notification.toApp = 'mobileApp';
      notification.read = false;
      notification.title = this._getTitle( notification.typeNotification );
      notification.message = this._getText( notification.typeNotification, notification.text );
      notification.ionicId = ionicId;
      
      if(notification.ionicId  && notification.ionicId != ""){
        this.pushService.sendPushNotification([ notification.ionicId ], notification);
      }
      
      let url = this.path + 'notifications/' + to;
      let notificationsRef =  this.$firebaseArray( new Firebase( url ));
      notificationsRef.$add(notification);
      
    }
    
    private _notificationForMe():void {
      let url = `${this.path}notifications/${this.userAuth.id}`;
      let reference =  new Firebase( url );
      reference.on('child_added', snapshot => {
        let current = snapshot.val();
        if(this.$localStorage.lastUpdate < current.date){
          this.userAuthService.refresh();
        }
      });
    }
    
    private _getTitle(typeNotification){
      return this.$translate.instant(`NOTIFICATIONS.${typeNotification}_title`);
    }
    
    private _getText(typeNotification, text){
      return this.$translate.instant(`NOTIFICATIONS.${typeNotification}_message`).replace('TEXT', text || '');
    }
    
    private _updateEvents():void {
      let url = `${this.path}notifications/events`;
      let reference =  new Firebase( url );
      reference.on('child_added', snapshot => {
        let current = snapshot.val();
        if(this.$localStorage.lastUpdate < current.date){
          this.userService
          .home( this.userAuth.id )
          .then( user => {
            this.userAuth = this.userAuthService.updateUserAuth( user );
            this.$rootScope.$broadcast('HomeSponzorController:getEvents');
            this.$rootScope.$broadcast('MenuSponzor:counts');
          });
        }
      });
    }
  }
  
  angular
    .module('app')
    .service('notificationService', notificationService);
}