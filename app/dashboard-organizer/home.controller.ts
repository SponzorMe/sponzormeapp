/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services/user.service.ts" />
/// <reference path="../services/userAuth.service.ts" />
/// <reference path="../services/notification.service.ts" />
/**
* @Controller HomeOrganizerCtrl
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.3
*/
class HomeOrganizerCtrl{
  
  $inject = [
    '$localStorage',
    '$rootScope',
    'userAuthService',
    'notificationService'
  ];
  count_events:number = 0;
  count_sponsors:number = 0;
  count_comunity:number = 0;
  userAuth: userModule.User;
  notifications: any[];
  
  constructor(
    private $$localStorage,
    private $rootScope: angular.IRootScopeService,
    private userAuthService: userAuthModule.IUserAuthService,
    private notificationService: notificationModule.INotificationService
  ){
    this.userAuth = userAuthService.getUserAuth();
    this.count_events = this.userAuth.events.filter( this.filterDate ).length;
    this.count_comunity = this.userAuth.comunity_size || 0;
    this.count_sponsors = this.userAuth.sponzorships_like_organizer.length;
    this.notifications = notificationService.getNotifications( this.userAuth.id );
    
    this.registerListenerCountEvents();
    this.registerListenerCountSponsors();
  }
  
  registerListenerCountSponsors(){
    this.$rootScope.$on('HomeOrganizerController:count_sponsors', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.count_sponsors = this.userAuth.sponzorships_like_organizer.length;
    });
  }
  
  registerListenerCountEvents(){
    this.$rootScope.$on('HomeOrganizerController:count_events', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.count_sponsors = this.userAuth.sponzorships_like_organizer.length;
    });
  }
  
  filterDate( item ){
    var today = moment( new Date() ).subtract(1, 'days');
    return moment(item.ends).isAfter( today );
  }
  
}
angular
  .module('app.dashboard-organizer')
  .controller('HomeOrganizerCtrl', HomeOrganizerCtrl);