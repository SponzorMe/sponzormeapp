'use strict';
(function () {
angular.module('App', ['ionic', 'ngCookies', 'ngCordova' , 'pascalprecht.translate','ngMessages','ngStorage', 'base64', 'loginService','userService', 'imgurUpload'])
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
      url: "/addevent",
      views: {
        'menuContent' :{
          templateUrl: "views/events/add-events.html",
          controller: "EventsController"
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
          templateUrl: "views/events/dash-events.html"
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
          templateUrl: "views/users/invite-users.html"
        }
      }
    })
    .state('menuorganizers.organizerssettings', {
      url: "/organizerssettings",
      views: {
        'menuContent' :{
          templateUrl: "views/users/settings-users.html"
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
          templateUrl: "views/users/invite-users.html"
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
/*
.constant('googleConfiguration', {
        project: "bionic-genre-87620",
        apiKey: "AIzaSyCIrnZfLSFxHNd-YjBfHvfKeECHT7xjTxk",
        teamId: "00b4903a9790f7fd4149123f8650227f1959451f5f6dd59b8d3e4d15e88c2855",
        api_version: "v1",
        scopes: "https://www.googleapis.com/auth/devstorage.full_control",
        bucket: "sponzorme",
        group: "group-00b4903a9790f7fd4149123f8650227f1959451f5f6dd59b8d3e4d15e88c2855",
        entity: "allUsers",
        role: "READER",
        role_object: "READER",
        private_key_id: "8e40a84b68b8a7ea6dda1444dc3a3ca5bfb16d87",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCgYsa8b3M795g4\nNplTl48wSil/55rvJQVipHbM8kK2q2LTn+mXaBxeVfVZGdBTUzmTRRi6W1QZuVPJ\nEJeIRSouWoVirTprgAG51R/BsUAJbRlSIHXi3mBukFoQY5ot7/o2nF2TpOO/4bfa\ncGq6GljF8Kz4s+Lup8rTnJKYjs0PIQ2T8Ncmd0qlI3cq7HawCWMwPVpjwEg5zASf\n92VG/VBq9SjaJ9BWqv0Yx2BqSETZ57RyIdkdoc3U8qhhH7J+5l8LSUOeTr+QbqaK\nZOdRvnpRd8mtiG7MibarYO/mw8pe00VEusOX1/Ev2feR7o2dwzvfUISKUJ4gD7qx\n7PX/LLdNAgMBAAECggEANS0q2VVWbp6D8LdhlM6eYhNkuQywWPP8Wh1Palo0dl5S\nsPnHODUDmt+DLlyZrtbcMxDoxvj65GCHABYpN7w+5QmMShBHW1cgu12HXvAG3Fk4\n2Pr8OxEiBeaEhgSQHQUA/9ROTmKQRJFxJNK7ACM2JcLLhtYVuq0VWZ4DGOPX51i2\npuhEJ/4jmmXjY/s7OSD83+8sZnevuKO0Hz479GYqZP93jSyjYRjV6qThayidiLWo\n8aesdNnT2Yxde/k8tlH2FMXMMU8rt+hzFeYuUdvUpCN2JZGGhBHQ/QFbw11/6pKO\nX/2HkXBtAp2kWX94tQpqzGO2A/+38W3a0NdkSGMBAQKBgQDUGYb5uKoIGcisivKO\nKr7K1gVV/Lj3ygsqVl+pCiYdqxvzUaqU4iobiwng8mx2favfpwWnfE/kr5sGOQwJ\nAiGyI/rXQ4le1uhp5/2A0yQ/wnsRGD0p+YwtAR6IoipUI+Uw/cjgN/Ag1J7qkYDu\nsrSIMVMM9nq/trpFXZGfvjtKwQKBgQDBlRl9qnkWAQW7THk0crilXzOqd3+BufjC\nN/CZyvueBJhYdS1V30/Yqi7h2t6vNMl47e3PD14Vo998Q2a/s2Ea9SOlI91vcFj4\n8hQ4cLLSllZvB+6JJlovzEe+Pf+suwNGVIq2CjH8H8YJlVktbs7xPX6TX5l0OSBY\nL4mE1x5LjQKBgCfM6oEt3+pJPFj0cfOvncHeS34JQIRvC41US/sihmiG1WXha0so\n7ZHhk2b81tGdX4VGiE8Xir51HXgbeGCwX7ZX/hgq+jorxc0p1W45MNIuIn3guImJ\n5H4Feb9V/u9vFPEOjoVUueDPRUrrJvCj5DCyYM1L61jSZz3hAxSg0+uBAoGARKwx\nA8yC8hRgxSYG5V1BNaFFQdbsi8e+gJ+5ocVJZ7A3n0HKWGlE+Ra+VO8BCmSOiHDX\naRoJhWHB+WIrxBvNefO2tnG3rz3Kwl2WYMNSHLSqau8EZvENE2HDnbB+z/bz3XJG\nVvfc7ZUT+vhZT228ygXHrl4+oOVXHRGYFmD95U0CgYBiqoxwdImnlF2oUmdFJmAF\nkLpZ2OL8JRFyIhGNN7UBHG1/GD441X5a0rZ2MmFrYPirW48fG67TyVrNIou6+z42\nKpXu0FnhwtA1lbiZfYlKoFotTmNw0msnoUmOJSvsZKPO0KZ8zIh8i1LZNvUsVl/e\n6PoHLVjeS1IUo8Xy03tJAg\u003d\u003d\n-----END PRIVATE KEY-----\n",
        client_email: "471996657056-pm4dm8gcrvskclm6slecm7m8a2b2c100@developer.gserviceaccount.com",
        client_id: "471996657056-pm4dm8gcrvskclm6slecm7m8a2b2c100.apps.googleusercontent.com",
        type: "service_account"
    })
*/
.constant('imgurConfig',{
            client_id: "bdff09d775f47b9",
            client_secret: "c74df575cc74efa5c14c57c4620238e400a4ef32"
})
.value('BackendVariables', {
            url: "http://api.sponzor.me/",
            ready: "false",
            token: ""
        })
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
})
.config(['$logProvider', function($logProvider){ // dev: true,  staging: false, prod:false
    $logProvider.debugEnabled(true);
}])
.run(function($ionicPlatform, $translate, $cordovaFile, $log) {
        $ionicPlatform.ready(function() {
          $translate.use("en");
          });
});

})();
