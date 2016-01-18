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
    '$translate'
  ];

  function SettingsController( $translate ) {

    var vm = this;
    vm.lang = $translate.use();
    vm.save = save;

    ////////////

    function save(){
      $translate.use(vm.lang);
    }

  }
})();