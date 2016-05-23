/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class EventsTabsOrganizerCtrl{

  $inject = [
    '$rootScope',
    'userAuthService',
    'ionicMaterialInk'
  ];
  userAuth:userModule.User; 
  count_events:number = 0;
  count_past_events:number = 0;
  
  constructor(
    private userAuthService: userAuthModule.IUserAuthService,
    private $rootScope,
    private ionicMaterialInk
  ){
    
    if(ionic.Platform.isAndroid()){
      this.ionicMaterialInk.displayEffect();
    }
    
    this.userAuth = this.userAuthService.getUserAuth();
      
    this.count_events = this.userAuth.events.filter( this._filterByDateIsAfter ).length;
    this.count_past_events = this.userAuth.events.length - this.count_events;
    
    this._registerListenerCounts();
  }
  
  private _registerListenerCounts(){
    this.$rootScope.$on('EventsTabsCtrl:count_events', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.count_events = this.userAuth.events.filter( this._filterByDateIsAfter ).length;
      this.count_past_events = this.userAuth.events.length - this.count_events;
    });
  }
  
  private _filterByDateIsAfter( item ){
    let today = moment( new Date() ).subtract(1, 'days');
    return moment(item.ends).isAfter( today );
  }
}
angular
  .module('app.events-organizer')
  .controller('EventsTabsOrganizerCtrl', EventsTabsOrganizerCtrl);