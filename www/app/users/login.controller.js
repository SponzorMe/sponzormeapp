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

  LoginController.$inject = [
    '$translate',
    'userService',
    '$localStorage',
    '$state',
    'utilsService',
    '$base64',
    '$ionicUser', 
    '$ionicAnalytics',
    'notificationService'
  ];

  function LoginController( $translate, userService, $localStorage, $state , utilsService, $base64, $ionicUser, $ionicAnalytics, notificationService) {

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

    function signIn( form ){
      utilsService.showLoad();
      userService.login( vm.user.email, vm.user.password )
        .then( complete )
        .catch( failed );

      function complete( user ){
        utilsService.hideLoad();
        utilsService.resetForm( form );
        vm.userResponse = user;
        $localStorage.token = $base64.encode(vm.user.email +':'+ vm.user.password);
        
        
        var user = Ionic.User.current();
        if (!user.id) {
          user.id = vm.userResponse.id;
          user.set('email', vm.user.email);
          user.set('type', vm.user.type);
        }
        user.save();
        vm.user = {};
        $ionicAnalytics.register(); 
        
        notificationService.activate();
        saveUser();
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
        vm.user.password = '';
      }
    };

    function updateUser(){
      vm.userResponse.demo = 1;
      saveUser();
      userService.editUserPatch( vm.userResponse.id, vm.userResponse )
        .then( redirectTutorial )
        .catch( failed );

        function failed( error ){
          console.log( error );
        }
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
      $localStorage.userAuth = utilsService.updateUserAuth(vm.userResponse);
    }

  }
})();
