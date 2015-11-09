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

  LoginController.$inject = ['$translate', 'userService', '$localStorage', '$state'];

  function LoginController( $translate, userService, $localStorage, $state ) {

    var vm = this;
    vm.user = {};
    vm.userResponse = {};
    vm.signIn = signIn;

    ////////////

    function signIn(){
      console.log( vm.user );
      userService.login( vm.user )
        .then( signInComplete )
        .catch( showError );

      function signInComplete( user ){
        vm.userResponse = user;
        validateTutorial();
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
        $state.go("menuorganizers.organizershome");
      }else{ // is an Sponzor
        $state.go("menusponzors.homesponzors");
      }
    }

    function showError( error ){
      console.log( error );
    }

    

  }
})();
