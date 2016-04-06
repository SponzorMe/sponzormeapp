/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="user.service.ts" />
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
          this.$rootScope.$broadcast('MenuOrganizer:count_events');
          this.$rootScope.$broadcast('EventsTabsCtrl:count_events');
          this.$rootScope.$broadcast('HomeOrganizerController:count_events');
          
          this.$rootScope.$broadcast('MenuOrganizer:count_tasks');
          this.$rootScope.$broadcast('TaskTabsController:count_tasks');
          
          this.$rootScope.$broadcast('MenuOrganizer:count_sponsors');
          this.$rootScope.$broadcast('SponsorshipsTabsController:count_sponsors');
          this.$rootScope.$broadcast('HomeOrganizerController:count_sponsors');
          
          this.$rootScope.$broadcast('SponsorshipsListController:getSponzorships');
          this.$rootScope.$broadcast('SponsorshipsPastEventsController:getSponzorships');
          
          this.$rootScope.$broadcast('EventListController:getEvents');
          this.$rootScope.$broadcast('PastEventsController:getEvents');
          
        }else{
          this.$rootScope.$broadcast('MenuSponzor:counts');
          
          this.$rootScope.$broadcast('FollowEventsController:getSponzorships');
          this.$rootScope.$broadcast('SponzoringEventsController:getSponzorships');
          
          this.$rootScope.$broadcast('HomeSponzorController:getEvents');
        }
      });
    }
  }
  
  angular
    .module('app')
    .service('userAuthService', userAuthService);
}