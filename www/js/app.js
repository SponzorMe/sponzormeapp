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
          templateUrl: "views/users/settings-users.html"
        }
      }
    })
    .state('menusponzors.sponzorsinvite', {
      url: "/sponzorsinvite",
      views: {
        'menuContent' :{
          templateUrl: "views/users/settings-users.html"
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
    },

      "DASHSPONZORS":{
        dash_title:  "Dashboard",
        menu_title:  "Navigation",
        dash_menu1:"Dashboard",
        dash_menu2:"Following",
        dash_menu3:"Sponzoring",
        dash_menu4:"Settings",
        dash_menu5:"Invite your friend",
        dash_menu6:"Logout"
      },
      "DASHORGANIZERS":{
        dash_title:  "Dashboard",
        menu_title:  "Navigation",
        dash_menu1:"Events",
        dash_menu2:"Sponzors",
        dash_menu3:"Task List",
        dash_menu4:"Invite your friend",
        dash_menu5:"Settings",
        dash_menu6:"Logout"
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
