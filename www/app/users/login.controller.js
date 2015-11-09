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
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$translate', 'userService', '$localStorage', '$state', 'utilsService'];

  function LoginController( $translate, userService, $localStorage, $state , utilsService) {

    var vm = this;
    vm.user = {};
    vm.userResponse = {};
    vm.signIn = signIn;

    ////////////

    function signIn(){
      utilsService.showLoad();
      userService.login( vm.user )
        .then( signInComplete )
        .catch( showError );

      function signInComplete( user ){
        utilsService.hideLoad();
        vm.userResponse = user;
        validateTutorial();
      }

      function showError( data ){
        utilsService.hideLoad();
        if(utilsService.trim(data.message) === "Invalid credentials"){
          utilsService.alert({
            title: $translate.instant("ERRORS.signin_title_credentials"),
            template: $translate.instant("ERRORS.signin_incorrect_credentials"),
          });
        }
      }
    };

    function updateUser(){
      vm.userResponse.demo = 1;
      userService.editUserPatch( vm.userResponse.id, vm.userResponse )
        .then( redirectTutorial )
        .catch( showError );
    };

    function validateTutorial(){
      if( vm.userResponse.demo == 0){
        updateUser();
      }else{
        redirectHome();
      }
    }

    function redirectTutorial(){
      if( vm.userResponse.type == 0 ){ // is an Organizer.
        $state.go("introorganizers");
      }else{ // is an Sponzor
        $state.go("introsponzors");
      }
    }

    function redirectHome(){
      if( vm.userResponse.type == 0 ){ // is an Organizer.
        $state.go("organizer.home");
      }else{ // is an Sponzor
        $state.go("sponzor.home");
      }
    }

  }
})();
