/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('MenuSponzorCtrl', MenuSponzorCtrl);

  MenuSponzorCtrl.$inject = ['$state', '$localStorage'];

  function MenuSponzorCtrl( $state, $localStorage ) {

    var vm = this;
    vm.logout = logout;
    
    ////////////

    function logout(){
      $localStorage.$reset();
      $state.go('signin');
    }

  }
})();