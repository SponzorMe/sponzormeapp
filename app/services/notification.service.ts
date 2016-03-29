/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="user.service.ts" />
/// <reference path="userAuth.service.ts" />

module notificationModule{
  
  export interface INotificationService{
    activate(): void;
    getNotifications(userId:string): any;
    sendNewSponsorship(notification: Notification, to:string): void;
    sendAcceptSponsorship(notification: Notification, to:string): void,
    sendRejectSponsorship(notification: Notification, to:string): void,
    sendNewTaskOrganizer(notification: Notification, to:string): void,
    sendUpdateTaskOrganizer(notification: Notification, to:string): void,
    sendDoneTaskOrganizer(notification: Notification, to:string): void,
    sendNewTaskSponsor(notification: Notification, to:string): void,
    sendUpdateTaskSponsor(notification: Notification, to:string): void,
    sendDoneTaskSponsor(notification: Notification, to:string): void,
    sendNewEvent(): void,
    sendUpdateEvent(): void,
  }
  
  export interface Notification{
    date: number;
    to: string;
    fromApp: string;
    toApp: string;
    read: boolean;
    typeNotification: string;
    type: string;
    text: string;
    modelId: string;
  }
  
  export class notificationService implements INotificationService{
    
    $inject = [
      '$http',
      '$q',
      '$firebaseArray',
      'BackendVariables',
      'userService',
      '$rootScope',
      '$ionicHistory',
      'userAuthService',
      '$localStorage'
    ];
    path:string;
    userAuth:any;
    
    constructor(
      private $http: angular.IHttpService,
      private $q: angular.IQService,
      private $firebaseArray,
      private BackendVariables,
      private userService: userModule.IUserService,
      private $rootScope: angular.IRootScopeService,
      private $ionicHistory: ionic.navigation.IonicHistoryService,
      private userAuthService: userAuthModule.IUserAuthService,
      private $localStorage
    ){
      this.path = this.BackendVariables.f_url;
      this.userAuth = this.userAuthService.getUserAuth();
    }
    
    activate() {
      this._notificationForMe();
      if(this.userAuth.type == '1') this._updateEvents();
    }
    
    getNotifications( userId:string ) {
      let url = `${this.path}notifications/${userId}`;
      return this.$firebaseArray( new Firebase( url ));
    }
    
    sendNewSponsorship(notification: Notification, to:string):void {
      notification.typeNotification = "newSponsorship";
      notification.type = "sponsorship";
      this._sendNotification(notification, to);
    }
    
    sendAcceptSponsorship(notification: Notification, to:string):void {
      notification.typeNotification = "acceptSponsorship";
      notification.type = "sponsorship";
      this._sendNotification(notification, to);
    }
    
    sendRejectSponsorship(notification: Notification, to:string):void {
      notification.typeNotification = "rejectSponsorship";
      notification.type = "sponsorship";
      this._sendNotification(notification, to);
    }
    
    sendNewTaskOrganizer(notification: Notification, to:string):void {
      notification.typeNotification = "newTaskOrganizer";
      notification.type = "task";
      this._sendNotification(notification, to);
    }
    
    sendUpdateTaskOrganizer(notification: Notification, to:string):void {
      notification.typeNotification = "doneTaskOrganizer";
      notification.type = "task";
      this._sendNotification(notification, to);
    }
    
    sendDoneTaskOrganizer(notification: Notification, to:string):void {
      notification.typeNotification = "updateTaskOrganizer";
      notification.type = "task";
      this._sendNotification(notification, to);
    }
    
    sendNewTaskSponsor(notification: Notification, to:string):void {
      notification.typeNotification = "newTaskSponsor";
      notification.type = "task";
      this._sendNotification(notification, to);
    }
    
    sendUpdateTaskSponsor(notification: Notification, to:string):void{
      notification.typeNotification = "updateTaskSponsor";
      notification.type = "task";
      this._sendNotification(notification, to);
    }
    
    sendDoneTaskSponsor(notification: Notification, to:string):void{
      notification.typeNotification = "doneTaskSponsor";
      notification.type = "task";
      this._sendNotification(notification, to);
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
    
    private _sendNotification(notification: Notification, to:string):void{
      
      notification.date = new Date().getTime();
      notification.to = to;
      notification.fromApp = 'mobileApp';
      notification.toApp = 'mobileApp';
      notification.read = false;
      
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