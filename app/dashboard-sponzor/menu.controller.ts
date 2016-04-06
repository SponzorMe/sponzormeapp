/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class MenuSponzorCtrl{
  
  $inject = [
    '$state',
    '$localStorage',
    '$rootScope',
    '$ionicHistory',
    'userAuthService',
    'notificationService'
  ];
  userAuth: userModule.User;
  count_following:number = 0;
  count_sponsoring:number = 0;
  notifications:any[] = [];
  
  constructor(
    private $state: angular.ui.IStateService,
    private $localStorage,
    private $rootScope: angular.IRootScopeService,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private userAuthService: userAuthModule.IUserAuthService,
    private notificationService: notificationModule.INotificationService
  ){
    this.userAuth = userAuthService.getUserAuth();
    this.count_sponsoring = this.userAuth.sponzorship.filter( this.filterByAccepted ).length;
    this.count_following = this.userAuth.sponzorship.length - this.count_sponsoring; 
    this.notifications = notificationService.getNotifications( this.userAuth.id );
    
    this.registerListenerCounts();
  }
  
  registerListenerCounts(){
    this.$rootScope.$on('MenuSponzor:counts', () => {
      this.userAuth =  this.userAuthService.getUserAuth();
      this.count_sponsoring = this.userAuth.sponzorship.filter( this.filterByAccepted ).length;
      this.count_following = this.userAuth.sponzorship.length - this.count_sponsoring;
    });
  }
  
  filterByAccepted( item ){
    return item.status == '1';
  }
  
  logout(){
    this.$localStorage.$reset();
    this.$ionicHistory.clearCache()
    .then( () => this.$state.go('signin') );
  }
  
}
angular
  .module('app.dashboard-sponzor')
  .controller('MenuSponzorCtrl', MenuSponzorCtrl);