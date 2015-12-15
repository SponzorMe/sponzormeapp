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
    'sponzorshipService',
    '$rootScope'
  ];

  function MenuSponzorCtrl( $state, $localStorage, sponzorshipService, $rootScope ) {

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
      $state.go('signin');
    }

    function getCounts(){
      sponzorshipService.sponzorshipBySponzor( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( events ){
          vm.count_following = events.filter( filterByPending ).length;
          vm.count_sponsoring = events.filter( filterByAccepted ).length;
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