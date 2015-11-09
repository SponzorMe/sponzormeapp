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

  RegisterController.$inject = ['$translate', '$state', 'userService', 'utilsService'];

  function RegisterController( $translate, $state, userService, utilsService ) {

    var vm = this;
    vm.newUser = {};
    vm.registerNewUser = registerNewUser;

    activate();

    ////////////

    function activate(){
      initUser();
    }

    function registerNewUser(){
      utilsService.showLoad();
      userService.createUser( preparateData() )
      .then( registerNewUserComplete )
      .catch( showError );

      function registerNewUserComplete(){
        $state.go("signin");
        utilsService.hideLoad();
        initUser();
        utilsService.alert({
          title: $translate.instant("MESSAGES.succ_user_tit"),
          template: $translate.instant("MESSAGES.succ_user_mess")
        });
      }

      function showError( data ){
        utilsService.hideLoad();
        if(utilsService.trim(data.message) === "Invalid credentials"){
          utilsService.alert({
            title: $translate.instant("ERRORS.signin_title_credentials"),
            template: $translate.instant("ERRORS.signin_incorrect_credentials")
          });
        }
        else if (utilsService.trim(data.error.email) === "The email has already been taken.") {
          utilsService.alert({
            title: $translate.instant("ERRORS.signin_taken_credentials_title"),
            template: $translate.instant("ERRORS.signin_taken_credentials_message")
          });
        }
        else if (utilsService.trim(data.message) === "Not inserted") {
          utilsService.alert({
            title: $translate.instant("ERRORS.signin_notinserted_credentials_title"),
            template: $translate.instant("ERRORS.signin_notinserted_credentials_message")
          });
        }
      }
    };

    function preparateData(){
      return {
        email: vm.newUser.email,
        password: vm.newUser.password,
        password_confirmation: vm.newUser.password,
        lang: "en", 
        type: vm.newUser.type,
        name: "First Name" + " " + "Last Name",
      }
    }

    function initUser(){
      vm.newUser = {
        type: 0
      };
    }
    

  }
})();
