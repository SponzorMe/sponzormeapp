'use strict';
(function () {
angular.module('App', ['ionic', 'ngCordova' , 'pascalprecht.translate','ngMessages','ngStorage', 'base64', 'loginService','userService','eventService','imgurUploader', 'google.places'])
.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
$stateProvider
    .state('signin', {
      url: '/sign-in',
      controller: 'userController',
      templateUrl: 'views/users/sign-in.html',
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
      url: "/menuorganizers/addevent",
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
          templateUrl: "views/dashboard/home-organizers.html"
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
      url: "/sponzorsorganizers",
      views: {
        'menuContent' :{
          templateUrl: "views/sponzors/dash-sponzors.html"
        }
      }
    })
    .state('menuorganizers.organizerstask', {
      url: "/organizerstask",
      views: {
        'menuContent' :{
          templateUrl: "views/tasks/task-organizers.html"
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
    .state('menuorganizers.organizerlogout', {
      url: "/organizerlogout",
      views: {
        'menuContent' :{
          templateUrl: "views/users/sign-in.html"
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
          templateUrl: "views/events/follow-events.html"
        }
      }
    })
    .state('menusponzors.sponzoring', {
      url: "/sponzoring",
      views: {
        'menuContent' :{
          templateUrl: "views/sponzors/dash-sponzoring.html"
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
    })
    .state('menuorganizers.sponzorslogout', {
      url: "/sponzorslogout",
      views: {
        'menuContent' :{
          templateUrl: "views/users/sign-in.html"
        }
      }
    })
    ;


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

.run(function($ionicPlatform, $translate, $cordovaFile, $log) {
        $ionicPlatform.ready(function() {
          $translate.use("en");
          });
});

})();
