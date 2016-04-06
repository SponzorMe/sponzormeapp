/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services/userAuth.service.ts" />
/// <reference path="../services/user.service.ts" />
/// <reference path="../services/utils.service.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class EventListCtrl{
  
   $inject = [
    '$scope',
    '$rootScope',
    'userService',
    'utilsService',
    'userAuthService'
  ];
  userAuth:userModule.User;
  events:any[] = []; 
  showEmptyState:boolean = true;
  
  constructor(
    private $scope: angular.IScope,
    private $rootScope,
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService,
    private userAuthService: userAuthModule.IUserAuthService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
   
    this.events = this.userAuth.events.filter( this._filterDate );
    this.showEmptyState = this.events.length == 0 ? true : false;
    
    this._registerListenerEvents();
  }
  
  doRefresh(){
    this.userService.home( this.userAuth.id )
      .then( user => {
        this.$scope.$broadcast('scroll.refreshComplete');
        this.userAuth = this.userAuthService.updateUserAuth( this.userService.buildUser(user) );
        this.events = this.userAuth.events.filter( this._filterDate );
        this.showEmptyState = this.events.length == 0 ? true : false;
        this.$rootScope.$broadcast('MenuOrganizer:count_events');
        this.$rootScope.$broadcast('EventsTabsCtrl:count_events');
        this.$rootScope.$broadcast('HomeOrganizerController:count_events');
      })
      .catch( error => {
        this.$scope.$broadcast('scroll.refreshComplete');
      });
  }
  
  private _filterDate( item ){
    let today = moment( new Date() ).subtract(1, 'days');
    return moment(item.ends).isAfter( today );
  }
  
  private _registerListenerEvents(){
    this.$rootScope.$on('EventListCtrl:getEvents', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.events = this.userAuth.events.filter( this._filterDate );
      this.showEmptyState = this.events.length == 0 ? true : false;
    });
  }
  
}
angular
  .module('app.events-organizer')
  .controller('EventListCtrl', EventListCtrl);