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
        templateUrl: 'app/users/sign-in.html',
        controller: 'LoginController as login',
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

(function() {
  'use strict';
  angular.module('app.users', []);
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

  userService.$inject = ['$http', '$localStorage', 'BackendVariables'];

  function userService( $http, $localStorage, BackendVariables ) {

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
        return response.user;
      }

      function loginFailed( error ) {
        return error;
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
      });
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
