/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class MenuSponsorCtrl{
  
  $inject = [
    '$state',
    '$q',
    '$localStorage',
    '$rootScope',
    '$ionicAuth',
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
    private $q,
    private $localStorage,
    private $rootScope: angular.IRootScopeService,
    private $ionicAuth,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private userAuthService: userAuthModule.IUserAuthService,
    private notificationService: notificationModule.INotificationService
  ){
    this.userAuth = userAuthService.getUserAuth();
    this.count_sponsoring = this.userAuth.sponzorships.filter( this.filterByAccepted ).length;
    this.count_following = this.userAuth.sponzorships.filter( this._filterByDateAndByPending ).length; 
    this.notifications = notificationService.getNotifications( this.userAuth.id );
    
    this.registerListenerCounts();
  }
  
  registerListenerCounts(){
    this.$rootScope.$on('MenuSponsorCtrl:counts', () => {
      this.userAuth =  this.userAuthService.getUserAuth();
      this.count_sponsoring = this.userAuth.sponzorships.filter( this.filterByAccepted ).length;
      this.count_following = this.userAuth.sponzorships.filter( this._filterByDateAndByPending ).length;
    });
  }
  
  filterByAccepted( item ){
    return item.status == '1';
  }
  
  private _filterByDateAndByPending( item ){
    return item.status != '1' && moment(item.event.starts).isAfter( new Date() );
  }
  
  logout(){
    this.$ionicAuth.logout();
    this.$localStorage.$reset();
    this.$ionicHistory.clearCache();
    this.$state.go('signin');
  }
  
}
angular
  .module('app.dashboard-sponzor')
  .controller('MenuSponsorCtrl', MenuSponsorCtrl);