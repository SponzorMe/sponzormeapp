/**
* @Controller for Login user
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('RegisterController', RegisterController);

  //RegisterController.$inject = ['$translate', 'userService', '$localStorage', '$state'];

  function RegisterController( $translate ) {

    var vm = this;
    vm.newUser = {};
    vm.register = register;

    ////////////

    function register(){
      console.log( vm.newUser );
      
    };

    

  }
})();
