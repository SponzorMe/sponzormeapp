/// <reference path="../../typings/tsd.d.ts" />

module pushModule{
 
 export interface IPushService{
    sendPushNotification(user_ids:string[], notification:any):angular.IPromise<any>;
  } 
  
  export class pushService implements IPushService{
    
    $inject = [
      '$http',
      '$q',
      'IONIC'
    ];
    token:string;
    profile:string;
    path:string;
    
    constructor(
      private $http: angular.IHttpService,
      private $q: angular.IQService,
      private IONIC
    ){
      this.path = IONIC.URL;
      this.profile = IONIC.PROFILE;
      this.token = IONIC.TOKEN;
    }
    
    
    sendPushNotification(user_ids:string[], notification:any):angular.IPromise<any>{
      return this.$http({
        method: 'POST',
        url: this.path,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        data: {
          "user_ids": user_ids,
          "profile": this.profile,
          "notification": {
            "title": notification.title,
            "message": notification.message,
             "ios": {
                "title": notification.title,
                "message": notification.message,
                "payload": notification,
                "content-available": 1
              },
              "android": {
                "title": notification.title,
                "message": notification.message,
                "payload": notification,
                "content-available": 1
              }
          }
        }
      })
      .then( response => { return this.$q.when( response.data ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
  }
  
  angular
    .module('app')
    .service('pushService', pushService);
  
}