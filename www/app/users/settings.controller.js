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
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = [
    'userService', 
    'utilsService',
    '$localStorage'
  ];

  function SettingsController( userService, utilsService, $localStorage) {

    var vm = this;
    vm.lang;

    ////////////

    

  }
})();