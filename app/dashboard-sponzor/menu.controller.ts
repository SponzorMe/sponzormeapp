/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services/user.service.ts" />
/// <reference path="../services/userAuth.service.ts" />
/// <reference path="../services/notification.service.ts" />
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
  
}
/*
(function() {
  'use strict';

  angular
    .module('app.dashboard-sponzor')
    .controller('MenuSponzorCtrl', MenuSponzorCtrl);

  MenuSponzorCtrl.$inject = [
    '$state',
    '$localStorage',
    '$rootScope',
    
    vm.userAuth = userAuthService.getUserAuth();'$ionicHistory',
    'userAuthService',
    'notificationService'
  ];

  function MenuSponzorCtrl( $state, $localStorage, $rootScope, $ionicHistory, userAuthService, notificationService ) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.count_following = 0;
    vm.count_sponsoring = 0;
    //Funcions
    vm.logout = logout;
    
    activate();
    ////////////

    function activate(){
      $rootScope.$on('MenuSponzor:counts', renderCounts);
      
      vm.count_sponsoring = vm.userAuth.sponzorships.filter( filterByAccepted ).length;
      vm.count_following = vm.userAuth.sponzorships.length - vm.count_sponsoring;
      
      vm.notifications = notificationService.getNotifications( vm.userAuth.id );
    }

    function renderCounts(){
      vm.userAuth =  userAuthService.getUserAuth();
      vm.count_sponsoring = vm.userAuth.sponzorships.filter( filterByAccepted ).length;
      vm.count_following = vm.userAuth.sponzorships.length - vm.count_sponsoring;
    }

    function logout(){
      $localStorage.$reset();
      $state.go('signin');
      $ionicHistory.clearCache();
    }

    function filterByAccepted( item ){
      return item.status == '1';
    }


  }
})();
