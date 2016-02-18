/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.dashboard-sponzor')
    .controller('MenuSponzorCtrl', MenuSponzorCtrl);

  MenuSponzorCtrl.$inject = [
    '$state',
    '$localStorage',
    '$rootScope',
    '$ionicHistory'
  ];

  function MenuSponzorCtrl( $state, $localStorage, $rootScope, $ionicHistory ) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.count_following = 0;
    vm.count_sponsoring = 0;
    //Funcions
    vm.logout = logout;
    
    activate();
    ////////////

    function activate(){
      $rootScope.$on('Menu:count_following', renderCountFollowing);
      $rootScope.$on('Menu:count_sponsoring', renderCountSponsoring);
      
      vm.count_following = vm.userAuth.sponzorships.filter( filterByPending ).length;
      vm.count_sponsoring = vm.userAuth.sponzorships.filter( filterByAccepted ).length;
      
    }

    function renderCountFollowing(event, total ){
      vm.count_following = total;
    }

    function renderCountSponsoring(event, total ){
      vm.count_sponsoring = total;
    }

    function logout(){
      $localStorage.$reset();
      $state.go('signin');
      $ionicHistory.clearCache();
    }

    function filterByPending( item ){
      return item.status != '1';
    }

    function filterByAccepted( item ){
      return item.status == '1';
    }


  }
})();