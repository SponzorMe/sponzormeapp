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
    .controller('MenuOrganizerCtrl', MenuOrganizerCtrl);

  MenuOrganizerCtrl.$inject = ['$state', '$localStorage'];

  function MenuOrganizerCtrl( $state, $localStorage ) {

    var vm = this;
    vm.logout = logout;


    ////////////

    function logout(){
      $localStorage.$reset();
      $state.go('signin');
    }

  }
})();