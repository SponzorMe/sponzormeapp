/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class MenuOrganizerCtrl{
  
  $inject = [
    '$state',
    '$q',
    '$rootScope',
    '$ionicAuth',
    '$ionicHistory',
    'userAuthService',
    'notificationService',
    '$localStorage',
    'ionicMaterialInk'
  ];
  userAuth: userModule.User;
  count_events:number = 0;
  count_sponsors:number = 0;
  count_tasks:number = 0;
  notifications:any[] = []; 
  
  constructor(
    private $state: angular.ui.IStateService,
    private $q,
    private $rootScope: angular.IRootScopeService,
    private $ionicAuth,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private userAuthService: userAuthModule.IUserAuthService,
    private notificationService: notificationModule.INotificationService,
    private $localStorage,
    private ionicMaterialInk
  ){
    this.ionicMaterialInk.displayEffect();
    
    this.userAuth = this.userAuthService.getUserAuth();
    this.count_events = this.userAuth.events.filter( this.filterDate ).length;
    this.count_sponsors = this.userAuth.sponzorships_like_organizer.length;
    this.count_tasks = this.countTasks().length;
    
    this.notifications = notificationService.getNotifications( this.userAuth.id );
    
    this.registerListenerCountEvents();
    this.registerListenerCountSponsors();
    this.registerListenerCountTasks();
  }
  
  registerListenerCountEvents(){
    this.$rootScope.$on('MenuOrganizerCtrl:count_events', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.count_events = this.userAuth.events.filter( this.filterDate ).length;
    });
  }
  
  registerListenerCountSponsors(){
    this.$rootScope.$on('MenuOrganizerCtrl:count_sponsors', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.count_sponsors = this.userAuth.sponzorships_like_organizer.length;
    });
  }
  
  registerListenerCountTasks(){
    this.$rootScope.$on('MenuOrganizerCtrl:count_tasks', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.count_tasks = this.countTasks().length;
    });
  }
  
  logout(){
    this.$ionicAuth.logout();
    this.$localStorage.$reset();
    this.$ionicHistory.clearCache();
    this.$state.go('signin');
  }
  
  filterDate( item ){
    let today = moment( new Date().getTime() ).subtract(1, 'days');
    return moment(item.ends).isAfter(today);
  }
  
  countTasks() {
    return this.userAuth.events
      .reduce( (a,b) => a.concat(b.perks || []), [] )
      .reduce( (a,b) => a.concat(b.tasks || []), [] )
      .filter( item => item.user_id == this.userAuth.id && item.status != '1');
   }
}
angular
  .module('app.dashboard-organizer')
  .controller('MenuOrganizerCtrl', MenuOrganizerCtrl);