/// <reference path="../../typings/main.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2

(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('ForgotController', ForgotController);

  ForgotController.$inject = [
    '$translate',
    'userService',
    '$state',
    'utilsService',
    '$ionicHistory'
  ];

  function ForgotController( $translate, userService, $state , utilsService, $ionicHistory) {

    var vm = this;
    vm.user = {};
    vm.resetPassword = resetPassword;

    ////////////

    function resetPassword(){
      utilsService.showLoad();
      userService.forgotPassword( vm.user.email )
        .then( complete )
        .catch( failed );

        function complete(){
          utilsService.hideLoad();
          $ionicHistory.clearCache();
          $state.go("signin");
          vm.user = {};
        }

        function failed( data ){
          utilsService.hideLoad();
        }
    };

  }
})();
*/ 
