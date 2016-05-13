/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class PastEventsOrganizerCtrl{
  
   $inject = [
    '$scope',
    '$rootScope',
    'userService',
    'utilsService',
    'userAuthService',
    'ionicMaterialInk'
  ];
  userAuth:userModule.User;
  events:eventModule.Event[] = []; 
  showEmptyState:boolean = true;
  
  constructor(
    private $scope: angular.IScope,
    private $rootScope,
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService,
    private userAuthService: userAuthModule.IUserAuthService,
    private ionicMaterialInk
  ){
    this.ionicMaterialInk.displayEffect();
    
    this.userAuth = this.userAuthService.getUserAuth();
   
    this.events = this.userAuth.events.filter( this._filterDate );
    this.showEmptyState = this.events.length == 0 ? true : false;
    
    this._registerListenerEvents();
  }
  
  doRefresh(){
    this.userService.home( this.userAuth.id )
      .then( user => {
        this.$scope.$broadcast('scroll.refreshComplete');
        this.userAuth = this.userAuthService.updateUserAuth( user );
        this.events = this.userAuth.events.filter( this._filterDate );
        this.showEmptyState = this.events.length == 0 ? true : false;
      })
      .catch( error => {
        this.$scope.$broadcast('scroll.refreshComplete');
      });
  }
  
  private _filterDate( item ){
    let today = moment( new Date() ).subtract(1, 'days');
     return moment(item.ends).isBefore( today );
  }
  
  private _registerListenerEvents(){
    this.$rootScope.$on('PastEventsOrganizerCtrl:getEvents', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.events = this.userAuth.events.filter( this._filterDate );
      this.showEmptyState = this.events.length == 0 ? true : false;
    });
  }
  
}
angular
  .module('app.events-organizer')
  .controller('PastEventsOrganizerCtrl', PastEventsOrganizerCtrl);