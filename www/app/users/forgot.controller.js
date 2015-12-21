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
    .controller('ForgotController', ForgotController);

  ForgotController.$inject = [
    '$translate',
    'userService', 
    '$state',
    'utilsService'
  ];

  function ForgotController( $translate, userService, $state , utilsService) {

    var vm = this;
    vm.user = {};
    vm.resetPassword = resetPassword;

    ////////////

    function resetPassword(){
      utilsService.showLoad();
      userService.forgotPassword( preparateData() )
        .then( resetPasswordComplete )
        .catch( resetPasswordFailed );

        function resetPasswordComplete(){
          utilsService.hideLoad();
          $state.go("signin");
          vm.user = {};
        }

        function resetPasswordFailed( data ){
          utilsService.hideLoad();
          if(data.message === "Invalid credentials"){
            Utils.alertshow({
              title: $translate.instant("ERRORS.signin_title_credentials"),
              template: $translate.instant("ERRORS.signin_incorrect_credentials")
            });
          }
        }
    };

    function preparateData(){
      return {
        email: vm.user.email
      }
    }

  }
})();