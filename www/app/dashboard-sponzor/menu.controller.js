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
    'sponsorshipService',
    '$rootScope',
    '$ionicHistory'
  ];

  function MenuSponzorCtrl( $state, $localStorage, sponsorshipService, $rootScope, $ionicHistory ) {

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
      getCounts();
    }

    function renderCountFollowing(event, total ){
      vm.count_following = total;
    }

    function renderCountSponsoring(event, total ){
      vm.count_sponsoring = total;
    }

    function logout(){
      $localStorage.$reset();
      $ionicHistory.clearCache().then(function(){
        $state.go('signin');
      });
    }

    function getCounts(){
      sponsorshipService.sponzorshipBySponzor( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( events ){
          vm.count_following = events.filter( filterByPending ).length;
          vm.count_sponsoring = events.filter( filterByAccepted ).length;
          console.log(vm.count_following);
          console.log(vm.count_sponsoring);
        }

        function failed( error ){
          console.log( error );
        }
    }

    function filterByPending( item ){
      return item.status != '1';
    }

    function filterByAccepted( item ){
      return item.status == '1';
    }


  }
})();