/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('TestsController', TestsController);

  TestsController.$inject = [
    '$localStorage',
    'userInterestService'
  ];

  function TestsController( $localStorage, userInterestService ) {

    var vm = this;
    vm.userAuth = $localStorage.userAuth || {};

    function rta( response ){
      console.log( response );
    }

    userInterestService.createUserInterest({
      interest_id: 1,
      user_id: vm.userAuth.id
    })
    .then( rta )
    .catch( rta );
  }
})();