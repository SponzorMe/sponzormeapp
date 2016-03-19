/// <reference path="../../typings/main.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2

(function() {
  'use strict';

  angular
    .module('app.dashboard-sponzor')
    .controller('MenuSponzorCtrl', MenuSponzorCtrl);

  MenuSponzorCtrl.$inject = [
    '$state',
    '$localStorage',
    '$rootScope',
    '$ionicHistory',
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
*/ 
