angular.module('App', ['ionic', 'ngCookies', 'pascalprecht.translate','ngMessages','ngStorage','base64', 'loginService','userService'])
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
          templateUrl: "views/users/settings-users.html"
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
      forgot_message: "Forgot Password?",
      join_message: "Join Now"
    },

    "JOINNOW":{
      login_title: "Join Now",
      email_field: "Email",
      pass_field: "Password",
      button_message: "Join Now"
    },

    "FORGOTFORM":{
      email_field: "Email",
      button_message: "Send Me Instructions"
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
        dash_menu1:"Dashboard",
        dash_menu2:"Events",
        dash_menu3:"Sponzors",
        dash_menu4:"Task List",
        dash_menu5:"Invite your friend",
        dash_menu6:"Settings",
        dash_menu7:"Logout"
      },
      "SEARCH":{
        search_title: "Find Events",
        text_field: "Search for an event",
        search_button: "Search"
      },

      "INVITEUSERS":{
        search_title: "Find Events",
        text_field: "Search for an event",
        search_button: "Search"
      },

      "INTROORG":{
        skip_nav_btn: "Skip Intro",
        prev_nav_btn: "Previous Slide",
        next_nav_btn: "Next",
        start_nav_btn: "Start using MyApp",
        head_page1: "Welcome to SponzorMe. Organizer",
        content_page1: "We hope you enjoy using this platform as much as we did when putting it together. Any questions as meaningless as they can seem, please send them to carlos@sponzor.me",
        head_page2: "Let’s start by exploring your dashboard.",
        content_page2:"The first thing you will see in this area is a summary of everything that is happening. You will be able to see a global summary, an event summary, a sponsor summary and a few suggestions that our team of experts has prepared for you.",
        head_page3: "Let’s look at our menu.",
        content_page3: "You will be able to find the following:<br><br/><ul><li><b>Dashboard:</b> Shows a summary of all your activities.</li>" +
        "<li><b>Events:</b> Allows you to create, edit, and manage your events.</li>" +
        "<li><b>Sponzors:</b> Allows you to create, edit, and manage your sponsors.</li>" +
        "<li><b>Task List:</b> You can manage your agreements with your sponsors and allows you to keep a good relationship with them.</li>" +
        "<li><b>Invite your friends:</b> Spread the love. Send it to someone that might need something like this and that will enjoy it.</li>" +
        "<li><b>Settings:</b>  You will be able to update your information and connect your external accounts.</li>" +
        "<li><b>Disconnect:</b>  You can log out of our platform in a safe way. We know this will be temporal because we love you.</li>" +
        "</ul>",
      },

      "INTROSPO":{
        skip_nav_btn: "Skip Intro",
        prev_nav_btn: "Previous Slide",
        next_nav_btn: "Next",
        start_nav_btn: "Start using MyApp",
        head_page1: "Welcome to SponzorMe. Sponzor",
        content_page1: "We hope you enjoy using this platform as much as we did when putting it together. Any questions as meaningless as they can seem, please send them to carlos@sponzor.me",
        head_page2: "Let’s start by exploring your dashboard.",
        content_page2:"The first thing you will see in this area is a search box. Simply type the magic words that describe the event that you are looking for and let us find the events that might interest you.",
        head_page3: "Let’s look at our menu.",
        content_page3: "You will be able to find the following:<br><br/><ul><li><b>Dashboard:</b> To come back to the search box.</li>" +
        "<li><b>Following:</b> The events you want to sponsor which hasn’t been accepted by the organizer yet.</li>" +
        "<li><b>Sponsored:</b> The events you are currently sponsoring, the agreements you have with the organizers, and activities that you might forget in the last minute such as sending those T-shirts.</li>" +
        "<li><b>Invite your friends :</b> Spread the love. Send it to someone that might need something like this and that will enjoy it.</li>" +
        "<li><b>Settings:</b>  You will be able to update your information and connect your external accounts.</li>" +
        "<li><b>Disconnect:</b>  You can log out of our platform in a safe way. We know this will be temporal because we love you.</li>" +
        "</ul>",
      },

      "ERRORS":{
        signin_ema_required: "This field is required.",
        signin_ema_email: "This field is must be an email.",
        signin_ema_maxlength:"This field is must be at least 5 characters.",
        signin_ema_minlength: "This field is must be less than 30 characters.",
        signin_pass_required: "This field is required.",
        signin_pass_maxlength:"This field is must be at least 5 characters.",
        signin_pass_minlength: "This field is must be less than 30 characters.",
        signin_title_credentials: "Error.",
        signin_incorrect_credentials: "Invalid credentials.",
        joinnow_ema_required: "This field is required.",
        joinnow_ema_email: "This field is must be an email.",
        joinnow_ema_maxlength:"This field is must be at least 5 characters.",
        joinnow_ema_minlength: "This field is must be less than 30 characters.",
        joinnow_pass_required: "This field is required.",
        joinnow_pass_maxlength:"This field is must be at least 5 characters.",
        joinnow_pass_minlength: "This field is must be less than 30 characters.",
        forgotform_ema_required: "This field is required.",
        forgotform_ema_email: "This field is must be an email.",
        forgotform_ema_maxlength:"This field is must be at least 5 characters.",
        forgotform_ema_minlength: "This field is must be less than 30 characters."
      },
      "MESSAGES":{
        loading: "Loading...",
      },

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
          $translate.use("en");
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
