/// <reference path="../../typings/main.d.ts" />
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

  RegisterController.$inject = [
    '$translate',
    '$state',
    'userService',
    'utilsService',
    '$localStorage',
    '$base64',
    'notificationService',
    'userAuthService'
  ];

  function RegisterController( $translate, $state, userService, utilsService, $localStorage, $base64, notificationService, userAuthService) {

    var vm = this;
    vm.newUser = {};
    vm.registerNewUser = registerNewUser;

    activate();
    ////////////

    function activate(){
      vm.newUser.type = 0;
    }

    function registerNewUser( form ){
      utilsService.showLoad();
      userService.createUser( preparateData() )
      .then( signIn )
      .then( complete )
      .catch( failed );

      function complete( user ){
        utilsService.hideLoad();
        utilsService.resetForm( form );
        utilsService.alert({
          title: $translate.instant("MESSAGES.succ_user_tit"),
          template: $translate.instant("MESSAGES.succ_user_mess")
        });
        $localStorage.token = $base64.encode(vm.newUser.email +':'+ vm.newUser.password);
        vm.newUser = {}
        vm.newUser.type = 0;
        userAuthService.getUserAuth( user );
        notificationService.activate();
        $state.go("profile");
      }

      function failed( data ){
        utilsService.hideLoad();
        if(utilsService.trim(data.message) === "Invalid credentials"){
          utilsService.alert({
            title: $translate.instant("ERRORS.signin_title_credentials"),
            template: $translate.instant("ERRORS.signin_incorrect_credentials")
          });
        }
        else if (utilsService.trim(data.message) === "Not inserted") {
          utilsService.alert({
            title: $translate.instant("ERRORS.signin_notinserted_credentials_title"),
            template: $translate.instant("ERRORS.signin_notinserted_credentials_message")
          });
        }
        else if (data.error && utilsService.trim(data.error.email) === "The email has already been taken.") {
          utilsService.alert({
            title: $translate.instant("ERRORS.signin_taken_credentials_title"),
            template: $translate.instant("ERRORS.signin_taken_credentials_message")
          });
        }
        
      }
    };

    function preparateData(){
      return {
        email: vm.newUser.email,
        password: vm.newUser.password,
        password_confirmation: vm.newUser.password,
        name: vm.newUser.name,
        lang: 'en',
        type: vm.newUser.type,
      }
    }

    function signIn(){
      return userService.login( vm.newUser.email, vm.newUser.password );
    };
    

  }
})();
