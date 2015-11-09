/**
* @File the start the app
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';
  angular.module('app', [
    // Core 
    'ionic',
    'ionic.service.core',
    'ngCordova',
    'ngMessages',
    'ngStorage',
    'ngIOS9UIWebViewPatch',
    'pascalprecht.translate',
    //'app.widgets',
    //Feature areas
    'app.users',
    //'app.dashboard',
    //'app.layout'
  ])
})();
/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider, $translateProvider) {

    $urlRouterProvider.otherwise("/sign-in");

    $stateProvider
      .state('signin', {
        url: '/sign-in',
        templateUrl: 'app/users/login.html',
        controller: 'LoginController as login',
      })

      .state('joinnow', {
        url: "/joinnow",
        templateUrl: "app/users/register.html",
        controller: "RegisterController as register"
      })

    // Languages
    $translateProvider.useStaticFilesLoader({
      prefix: 'langs/lang-',
      suffix: '.json'
    });

    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.preferredLanguage("en");
    $translateProvider.fallbackLanguage("en");
  }

})();
/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .run(run);

  function run($ionicPlatform, $translate) {
    $ionicPlatform.ready(function() {
      $translate.use("en");
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }

})();
/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .value('BackendVariables',{
      url: "http://api.sponzor.me/", // i'm using the Ionic Proxy
      ready: "false"
    });
})();

/**
* @Servicio de Usuarios
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('userService', userService);

  userService.$inject = ['$http', '$localStorage', 'BackendVariables', '$q'];

  function userService( $http, $localStorage, BackendVariables, $q ) {

    var path = BackendVariables.url;
    var token = $localStorage.token;

    var service = {
      login: login,
      allUsers: allUsers,
      getUser: getUser,
      createUser: createUser,
      deleteUser: deleteUser,
      editUserPatch: editUserPatch,
      editUserPut: editUserPut,
      forgotPassword: forgotPassword,
      invitedUser: invitedUser,
      checkSession: checkSession
    };

    return service;

    ////////////

    function login( user ){
      return $http({
        method: 'POST',
        url: path + 'auth',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
        data: $.param({
          email: user.email,
          password: user.password
        })
      })
      .then( loginComplete )
      .catch( loginFailed );

      function loginComplete( response ) {
        return $q.when( response.user );
      } 

      function loginFailed( response ) {
        return $q.reject( response.data );
      }
    }

    function allUsers(){
      return $http.get(path + 'users');
    }

    function getUser( userId ){
      $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
      return $http.get(path + 'users/' + userId);
    }

    function createUser( data ){
      return $http({
        method: 'POST',
        url: path + 'users',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      })
      .then( createUserComplete )
      .catch( createUserFailed );

      function createUserComplete( response ) {
        return $q.when( response );
      } 

      function createUserFailed( response ) {
        return $q.reject( response.data );
      }
    }

    function deleteUser( userId ){
      return $http({
        method: 'DELETE',
        url: path + 'users/' + userId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
      });
    }

    function editUserPatch( userId ){
      return $http({
        method: 'PATCH',
        url: path + 'users/' + userId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

    function editUserPut( userId ){
      return $http({
        method: 'PUT',
        url: path + 'users/' + userId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

    function forgotPassword( data ){
      return $http({
        method: 'POST',
        url: path + 'send_reset_password/',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

    function invitedUser( data ){
      return $http({
        method: 'POST',
        url: path + 'invite_friend/',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

    function checkSession(localToken, localUser){
      if(angular.isDefined(localToken) && angular.isDefined(localUser)){
        return true;
      }
      return false;
    }

  }
})();

/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('utilsService', utilsService);

  utilsService.$inject = [ '$ionicLoading', '$ionicPopup', '$translate'];

  function utilsService( $ionicLoading, $ionicPopup, $translate) {

    var service = {
      showLoad: showLoad,
      hideLoad: hideLoad,
      alert: alert,
      trim: trim
    };

    return service;

    ////////////

    function showLoad(){
      $ionicLoading.show({
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200,
        showDelay: 500,
        //template: '<p class="item-icon-left">'+ $translate.instant('MESSAGES.loading')+'<ion-spinner icon="bubbles"/></p>'
      });
    }

    function hideLoad(){
      $ionicLoading.hide();
    }

    function alert( msg ){
      msg.title = msg.title || 'Ocurrió un error.';
      msg.template  = msg.template || 'Intento de nuevo.';
      var alertPopup = $ionicPopup.alert( msg );
      return alert;
    }

    function trim( str ){
      str = str.toString();
      return str.replace(/^\s+|\s+$/g,"");
    };

  }
})();

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
        $state.go("menuorganizers.organizershome");
      }else{ // is an Sponzor
        $state.go("menusponzors.homesponzors");
      }
    }

    

  }
})();

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

(function() {
  'use strict';
  angular.module('app.users', []);
})();