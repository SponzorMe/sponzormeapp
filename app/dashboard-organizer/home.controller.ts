/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller HomeOrganizerCtrl
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.3
*/
class HomeOrganizerCtrl{
  
  $inject = [
    '$rootScope',
    'userAuthService',
    'notificationService',
    'ionicMaterialInk'
  ];
  count_events:number = 0;
  count_sponsors:number = 0;
  count_comunity:number = 0;
  userAuth: userModule.User;
  notifications: any[];
  
  constructor(
    private $rootScope: angular.IRootScopeService,
    private userAuthService: userAuthModule.IUserAuthService,
    private notificationService: notificationModule.INotificationService,
    private ionicMaterialInk
  ){
    if(ionic.Platform.isAndroid()){
      this.ionicMaterialInk.displayEffect();
    }
    
    this.userAuth = userAuthService.getUserAuth();
    this.count_events = this.userAuth.events.filter( this.filterDate ).length;
    this.count_comunity = this.userAuth.comunity_size;
    this.count_sponsors = this.userAuth.sponzorships_like_organizer.filter( this._filterDateEvent ).length;
    this.notifications = notificationService.getNotifications( this.userAuth.id );
    
    this.registerListenerCountEvents();
    this.registerListenerCountSponsors();
  }
  
  registerListenerCountSponsors(){
    this.$rootScope.$on('HomeOrganizerCtrl:count_sponsors', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.count_sponsors = this.userAuth.sponzorships_like_organizer.filter( this._filterDateEvent ).length;
    });
  }
  
  registerListenerCountEvents(){
    this.$rootScope.$on('HomeOrganizerCtrl:count_events', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.count_events = this.userAuth.events.filter( this.filterDate ).length;
    });
  }
  
  filterDate( item ){
    let today = moment( new Date().getTime() ).subtract(1, 'days');
    return moment(item.ends).isAfter( today );
  }
  
  private _filterDateEvent( item ){
    var today = moment( new Date() ).subtract(1, 'days');
    return moment(item.event.ends).isAfter( today );
  }
  
}
angular
  .module('app.dashboard-organizer')
  .controller('HomeOrganizerCtrl', HomeOrganizerCtrl);