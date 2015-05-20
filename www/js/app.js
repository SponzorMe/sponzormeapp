angular.module('App', ['ionic','pascalprecht.translate'])
.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
$stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'views/users/sign-in.html',
    })
    .state('menuorganizers', {
      url: "/menuorganizers",
      abstract: true,
      templateUrl: "views/dashboard/dash-menu-organizers.html"
    })
    .state('menusponzors', {
      url: "/menusponzors",
      abstract: true,
      templateUrl: "views/dashboard/dash-menu-sponzors.html"
    })
    .state('forgotpassword', {
      url: "/forgot-password",
      templateUrl: "views/users/forgot-password.html"
    })
    .state('joinnow', {
      url: "/joinnow",
      templateUrl: "views/users/joinnow.html"
    })
    .state('menuorganizers.home', {
      url: "/homeorganizers",
      views: {
        'menuContent' :{
          templateUrl: "views/dashboard/home.html"
        }
      }
    })
    .state('menusponzors.home', {
      url: "/menusponzors",
      views: {
        'menuContent' :{
          templateUrl: "views/dashboard/home.html"
        }
      }
    })

    ;


$urlRouterProvider.otherwise("/sign-in");

// Languages
$translateProvider.useSanitizeValueStrategy('escaped');
$translateProvider.preferredLanguage("en");
$translateProvider.fallbackLanguage("en");
// English
$translateProvider.translations('en', {
    "LOGIN":{
      login_title: "Sign in",
      email_field: "Email",
      pass_field: "Password",
      signin_message: "Login",
      forgot_message: "Forgot password",
      join_message: "Join now"
     }
          });

// Spanish

  $translateProvider.translations('es', {
    "LOGIN":{
      login_title: "Ingresar",
      email_field: "Email",
      pass_field: "Password",
      forgot_message: "Olvido su Password",
      join_message: "Unete"
     }
          });

// Portuguese

  $translateProvider.translations('pt', {
    "LOGIN":{
      login_title: "Sign in",
      email_field: "Email",
      pass_field: "Password",
      forgot_message: "Sign in",
      join_message: "Join now"
     }
          });


// End Languages
})
.run(function($ionicPlatform, $translate) {
        $ionicPlatform.ready(function() {
          $translate.use("es");
          });
})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
});
