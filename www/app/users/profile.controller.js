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
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = [
    'userService', 
    'utilsService',
    '$localStorage'
  ];

  function ProfileController( userService, utilsService, $localStorage) {

    var vm = this;
    vm.user = $localStorage.userAuth;

    activate();

    ////////////
    
    function activate(){
      vm.user.age = parseInt( vm.user.age );
    }

    

  }
})();