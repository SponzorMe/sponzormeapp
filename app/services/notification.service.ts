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
    sendDeleteTaskOrganizer(notification: any, to:string, ionicId:string): void,
    sendDoneTaskOrganizer(notification: any, to:string, ionicId:string): void,
    sendNewTaskSponsor(notification: any, to:string, ionicId:string): void,
    sendUpdateTaskSponsor(notification: any, to:string, ionicId:string): void,
    sendDoneTaskSponsor(notification: any, to:string, ionicId:string): void,
    sendDeleteTaskSponsor(notification: any, to:string, ionicId:string): void,
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
    pushNotification: boolean;
    hide: boolean;
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
      notification.pushNotification = true;
      notification.hide = false;
      this._sendNotification(notification, to, ionicId);
    }
    
    sendAcceptSponsorship(notification: Notification, to:string, ionicId:string):void {
      notification.typeNotification = "acceptSponsorship";
      notification.type = "sponsorship";
      notification.pushNotification = true;
      notification.hide = false;
      this._sendNotification(notification, to, ionicId);
    }
    
    sendRejectSponsorship(notification: Notification, to:string, ionicId:string):void {
      notification.typeNotification = "rejectSponsorship";
      notification.type = "sponsorship";
      notification.pushNotification = true;
      notification.hide = false;
      this._sendNotification(notification, to, ionicId);
    }
    
    sendNewTaskOrganizer(notification: Notification, to:string, ionicId:string):void {
      notification.typeNotification = "newTaskOrganizer";
      notification.type = "task";
      notification.pushNotification = true;
      notification.hide = false;
      this._sendNotification(notification, to, ionicId);
    }
    
    sendUpdateTaskOrganizer(notification: Notification, to:string, ionicId:string):void {
      notification.typeNotification = "updateTaskOrganizer";
      notification.type = "task";
      notification.pushNotification = true;
      notification.hide = false;
      this._sendNotification(notification, to, ionicId);
    }
    
    sendDoneTaskOrganizer(notification: Notification, to:string, ionicId:string):void {
      notification.typeNotification = "doneTaskOrganizer";
      notification.type = "task";
      notification.pushNotification = true;
      notification.hide = false;
      this._sendNotification(notification, to, ionicId);
    }
    
    sendDeleteTaskOrganizer(notification: Notification, to:string, ionicId:string):void{
      notification.typeNotification = "deleteTaskSponsor";
      notification.type = "task";
      notification.pushNotification = false;
      notification.hide = true;
      this._sendNotification(notification, to, ionicId);
    }
    
    sendNewTaskSponsor(notification: Notification, to:string, ionicId:string):void {
      notification.typeNotification = "newTaskSponsor";
      notification.type = "task";
      notification.pushNotification = false;
      notification.hide = true;
      this._sendNotification(notification, to, ionicId);
    }
    
    sendUpdateTaskSponsor(notification: Notification, to:string, ionicId:string):void{
      notification.typeNotification = "updateTaskSponsor";
      notification.type = "task";
      notification.pushNotification = false;
      notification.hide = true;
      this._sendNotification(notification, to, ionicId);
    }
    
    sendDoneTaskSponsor(notification: Notification, to:string, ionicId:string):void{
      notification.typeNotification = "doneTaskSponsor";
      notification.type = "task";
      notification.pushNotification = false;
      notification.hide = true;
      this._sendNotification(notification, to, ionicId);
    }
    
    sendDeleteTaskSponsor(notification: Notification, to:string, ionicId:string):void{
      notification.typeNotification = "deleteTaskSponsor";
      notification.type = "task";
      notification.pushNotification = false;
      notification.hide = true;
      this._sendNotification(notification, to, ionicId);
    }
    
    sendNewEvent():void{
      let notification:any = {};
      
      notification.date = new Date().getTime();
      notification.fromApp = 'mobileApp';
      notification.toApp = 'mobileApp';
      notification.pushNotification = false;
      notification.hide = true;
      
      let url = this.path + 'notifications/events';
      let notificationsRef =  this.$firebaseArray( new Firebase( url ));
      
      notificationsRef.$add(notification);
    }
    
    sendUpdateEvent():void{
      let notification:any = {};
      notification.date = new Date().getTime();
      notification.fromApp = 'mobileApp';
      notification.toApp = 'mobileApp';
      notification.pushNotification = false;
      notification.hide = true;
      
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
      notification.ionicId = ionicId || "";
      
      let promises = [ 
        this._getTitle( notification.typeNotification ),
        this._getText( notification.typeNotification, notification.text )
      ];
      
      this.$q.all(  promises )
      .then( response => {
        
        notification.title = String(response[0]);
        notification.message = String(response[1]);
        
        if(notification.pushNotification){
          this.pushService.sendPushNotification([ notification.ionicId ], notification)
          .then(data => {
            console.log( data );
          })
          .catch( error => {
            console.log( error );
          });
        }
        
        let url = this.path + 'notifications/' + to;
        let notificationsRef =  this.$firebaseArray( new Firebase( url ));
        notificationsRef.$add(notification);
        
      })
      .catch(error => {
        console.log(error);
      });
      
    }
    
    private _notificationForMe():void {
      let url = `${this.path}notifications/${this.userAuth.id}`;
      let reference =  new Firebase( url );
      reference.on('child_added', snapshot => {
        let current = snapshot.val();
        if(this.$localStorage.lastUpdate < current.date){
          this.userService
          .home( this.userAuth.id )
          .then( user => {
            this.userAuth = this.userAuthService.updateUserAuth( user );
            this.userAuthService.refresh();
          });
        }
      });
    }
    
    private _getTitle(typeNotification){
      return this.$translate(`NOTIFICATIONS.${typeNotification}_title`)
      .then( message => { return this.$q.when( message ); } )
      .catch( data => { return this.$q.reject( null ); } );
    }
    
    private _getText(typeNotification, text){
      return this.$translate(`NOTIFICATIONS.${typeNotification}_text`)
      .then( message => { return this.$q.when( message.replace('TEXT', text || '') ); } )
      .catch( error => { return this.$q.reject( null ); } );
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
            this.userAuthService.refresh();
          });
        }
      });
    }
  }
  
  angular
    .module('app')
    .service('notificationService', notificationService);
}