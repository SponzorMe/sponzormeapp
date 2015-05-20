// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('App', ['ionic','pascalprecht.translate'])
.config(function($stateProvider, $urlRouterProvider, $translateProvider) {

$stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'views/users/sign-in.html',
    })
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "views/events/event-menu.html"
    })
    .state('forgotpassword', {
      url: "/forgot-password",
      templateUrl: "views/users/forgot-password.html"
    })
    .state('joinnow', {
      url: "/joinnow",
      templateUrl: "views/users/joinnow.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "views/events/home.html"
        }
      }
    })


$urlRouterProvider.otherwise("/sign-in");
$translateProvider.useSanitizeValueStrategy('escaped');
$translateProvider.translations('en', {
            signin_message: "Sign in",
            goodbye_message: "Goodbye"
        });

$translateProvider.translations('es', {
            signin_message: "Ingresar",
            goodbye_message: "Adios"
        });

$translateProvider.translations('pt', {
            signin_message: "Hola",
            goodbye_message: "Adios"
        });

        $translateProvider.preferredLanguage("en");

        $translateProvider.fallbackLanguage("en");
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
