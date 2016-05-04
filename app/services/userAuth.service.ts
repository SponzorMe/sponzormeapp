/// <reference path="../../typings/tsd.d.ts" />

/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
module userAuthModule{
  
  export interface IUserAuthService{
    getUserAuth():userModule.User;
    updateUserAuth(data:any):userModule.User;
    checkSession():boolean;
    refresh():void;
  }
  
  export class userAuthService implements IUserAuthService{
    
    $inject = [
      '$http',
      '$q',
      '$localStorage',
      'userService',
      '$rootScope'
    ];
    
    constructor(
      private $http: angular.IHttpService,
      private $q: angular.IQService,
      private $localStorage,
      private userService: userModule.IUserService,
      private $rootScope: angular.IRootScopeService
    ){}
    
    getUserAuth():userModule.User{
      return this.$localStorage.userAuth;
    }
    
    updateUserAuth( data:any ):userModule.User{
      this.$localStorage.userAuth = angular.extend(this.$localStorage.userAuth || {}, data);
      this.$localStorage.lastUpdate = new Date().getTime();
      return this.$localStorage.userAuth;
    }
    
    checkSession():boolean{
      if(angular.isDefined(this.$localStorage.token) && angular.isDefined(this.$localStorage.userAuth)){
        return true;
      }
      return false;
    }
    
    refresh():void{
      this.userService.home( this.getUserAuth().id )
      .then( user => {
        let userAuth = this.updateUserAuth( user );
        if(userAuth.type == "0"){ //Is an organizer
          
          this.$rootScope.$broadcast('MenuOrganizerCtrl:count_events');
          this.$rootScope.$broadcast('MenuOrganizerCtrl:count_sponsors');
          this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
          
          this.$rootScope.$broadcast('HomeOrganizerCtrl:count_sponsors');
          this.$rootScope.$broadcast('HomeOrganizerCtrl:count_events');
          
          this.$rootScope.$broadcast('EventsTabsCtrl:count_events');
          this.$rootScope.$broadcast('EventListOrganizerCtrl:getEvents');
          this.$rootScope.$broadcast('PastEventsOrganizerCtrl:getEvents');
          
          this.$rootScope.$broadcast('TaskListCtrl:getTasks');
          this.$rootScope.$broadcast('PastTasksCtrl:getTasks');
          this.$rootScope.$broadcast('TaskTabsCtrl:count_tasks');
          
          this.$rootScope.$broadcast('SponsorshipsListCtrl:getSponzorships');
          this.$rootScope.$broadcast('SponsorshipsPastEventsCtrl:getSponzorships');
          this.$rootScope.$broadcast('SponsorshipsTabsCtrl:count_sponsors');
          
        }else{
          
          this.$rootScope.$broadcast('HomeSponsorCtrl:getEvents');
          this.$rootScope.$broadcast('MenuSponsorCtrl:count');
          
          this.$rootScope.$broadcast('FollowEventsController:getSponzorships');
          this.$rootScope.$broadcast('SponsoringEventsCtrl:getSponzorships');
          this.$rootScope.$broadcast('SponsorshipSponsorDetailCtrl:update');
          
        }
      });
    }
  }
  
  angular
    .module('app')
    .service('userAuthService', userAuthService);
}