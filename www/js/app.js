'use strict';
(function () {

  angular.module('App', [
    'ionic',
    'ionic.service.core',
    'ngCordova', 
    'pascalprecht.translate',
    'ngMessages',
    'ngStorage',
    'base64',
    'loginService',
    'userService',
    'eventService',
    'sponzorshipService',
    'eventService',
    'perkService',
    'perkTaskService',
    'sponzorshipService',
    'imgurUploader',
    'google.places',
    'ngIOS9UIWebViewPatch'
  ])
  .config(function($stateProvider, $urlRouterProvider, $translateProvider) {
    $stateProvider
      .state('signin', {
        url: '/sign-in',
        controller: 'userController',
        templateUrl: 'views/users/sign-in.html'
      })
      .state('joinnow', {
        url: "/joinnow",
        controller: "registerController",
        templateUrl: "views/users/joinnow.html"
      })
      .state('introorganizers', {
        url: "/introorganizers",
        controller: "IntroOrgCtrl",
        templateUrl: "views/intro/introorganizers.html"
      })
      .state('introsponzors', {
        url: "/introsponzors",
        controller: "IntroSpoCtrl",
        templateUrl: "views/intro/introsponzors.html"
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
        templateUrl: "views/users/forgot-password.html",
        controller:"forgotController"
      })
      .state('menuorganizers.addevent', {
        url: "/addevent",
        views: {
          'menuContent' :{
            templateUrl: "views/events/add-events.html",
            controller: "AddEventsController"
          }
        }
      })
      .state('menuorganizers.organizershome', {
        url: "/organizershome",
        views: {
          'menuContent' :{
            templateUrl: "views/dashboard/home-organizers.html",
            controller: "HomeOrganizersController"
          }
        }
      })
      .state('menuorganizers.organizersevents', {
        url: "/organizersevents",
        views: {
          'menuContent' :{
            templateUrl: "views/events/dash-events.html",
            controller: "DashEventsController"
          }
        }
      })
      .state('menuorganizers.organizerssponzors', {
        url: "/organizerssponzors",
        views: {
          'menuContent' :{
            templateUrl: "views/sponzors/dash-sponzors.html",
            controller: "DashSponzorsController"
          }
        }
      })
      .state('menuorganizers.organizerstask', {
        url: "/organizerstask",
        views: {
          'menuContent' :{
            templateUrl: "views/tasks/task-organizers.html",
            controller:"taskOrganizerController"
          }
        }
      })
      .state('menuorganizers.addTask', {
        url: "/addTask",
        views: {
          'menuContent' :{
            templateUrl: "views/tasks/add-tasks.html",
            controller: "AddTasksController"
          }
        }
      })
      .state('menuorganizers.organizersinvite', {
        url: "/organizersinvite",
        views: {
          'menuContent' :{
            templateUrl: "views/users/invite-users.html",
            controller: "InviteUsersController"
          }
        }
      })
      .state('menuorganizers.organizerssettings', {
        url: "/organizerssettings",
        views: {
          'menuContent' :{
            templateUrl: "views/users/settings-users.html",
            controller: 'settingUserController'
          }
        }
      })
      .state('menusponzors.homesponzors', {
        url: "/homesponzors",
        views: {
          'menuContent' :{
            templateUrl: "views/sponzors/search.html",
            controller: "SearchController"
          }
        }
      })
      .state('menusponzors.following', {
        url: "/following",
        views: {
          'menuContent' :{
            templateUrl: "views/events/follow-events.html",
            controller: "followEventsController"
          }
        }
      })
      .state('menusponzors.sponzoring', {
        url: "/sponzoring",
        views: {
          'menuContent' :{
            templateUrl: "views/sponzors/dash-sponzoring.html",
            controller: 'sponzoringEventsController'
          }
        }
      })
      .state('menusponzors.sponzorsettings', {
        url: "/sponzorsettings",
        views: {
          'menuContent' :{
            templateUrl: "views/users/settings-users.html",
            controller: 'settingUserController'
          }
        }
      })
      .state('menusponzors.sponzorsinvite', {
        url: "/sponzorsinvite",
        views: {
          'menuContent' :{
            templateUrl: "views/users/invite-users.html",
            controller: "InviteUsersController"
          }
        }
      });


$urlRouterProvider.otherwise("/sign-in");

// Languages
$translateProvider.useStaticFilesLoader({
      prefix: 'langs/lang-',
      suffix: '.json'
    });

$translateProvider.useSanitizeValueStrategy('escaped');
$translateProvider.preferredLanguage("en");
$translateProvider.fallbackLanguage("en");

// End Languages
})

.constant('imgurConfig',{
            client_id: "bdff09d775f47b9",
            client_secret: "c74df575cc74efa5c14c57c4620238e400a4ef32"
})

.value('BackendVariables', {
            url: "http://api.sponzor.me/", // i'm using the Ionic Proxy
            ready: "false"
        })

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
})

.config(['$logProvider', function($logProvider){ // dev: true,  staging: false, prod:false
    $logProvider.debugEnabled(true);
}])

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(5); // improving performance
})



.run(function($ionicPlatform, $translate) {
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
})

})();
