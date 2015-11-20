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

  LoginController.$inject = ['$translate', 'userService', '$localStorage', '$state', 'utilsService', '$base64'];

  function LoginController( $translate, userService, $localStorage, $state , utilsService, $base64) {

    var vm = this;
    vm.user = {};
    vm.userResponse = {};
    vm.signIn = signIn;

    activate();

    ////////////
    
    function activate() {
      if(userService.checkSession()){
        vm.userResponse = $localStorage.userAuth;
        validateTutorial();
      }
    }

    function signIn(){
      utilsService.showLoad();
      userService.login( vm.user )
        .then( complete )
        .catch( failed );

      function complete( user ){
        utilsService.hideLoad();
        vm.userResponse = user;
        saveUser();
        $localStorage.token = $base64.encode(vm.user.email +':'+ vm.user.password);
        validateTutorial();
      }

      function failed( data ){
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
      saveUser();
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
        $state.go("organizer.intro");
      }else{ // is an Sponzor
        $state.go("sponzor.intro");
      }
    }

    function redirectHome(){
      if( vm.userResponse.type == 0 ){ // is an Organizer.
        $state.go("organizer.home");
      }else{ // is an Sponzor
        $state.go("sponzor.home");
      }
    }

    function saveUser(){
      $localStorage.userAuth = vm.userResponse;
    }

  }
})();
