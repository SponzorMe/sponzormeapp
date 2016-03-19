/// <reference path="../../typings/main.d.ts" />
/**
* @author Nicolas Molina
* @version 0.1

(function() {
  'use strict';

  angular
    .module('app')
    .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider, $ionicAutoTrackProvider) {

    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.views.maxCache(10);
    $ionicConfigProvider.backButton.text('');
    $ionicAutoTrackProvider.disableTracking('Tap');
    $ionicAutoTrackProvider.disableTracking('Load');

    function getDefaultRoute(){

      function userType(){
        var userAuth = JSON.parse(localStorage.getItem('ngStorage-userAuth'));
        if( userAuth.type == 0 ) return "/organizer/home";
        return "/sponzor/home";
      }
      
      if(localStorage.getItem('ngStorage-token') && localStorage.getItem('ngStorage-userAuth')){
        return userType();
      }
      return "/sign-in"
    }

    $urlRouterProvider.otherwise( getDefaultRoute() );    

    $stateProvider

      .state('tests', {
        url: '/tests',
        templateUrl: 'app/users/tests.html',
        controller: 'TestsController as test',
      })

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

      .state('profile', {
        url: "/profile",
        templateUrl: "app/users/form-profile.html",
        controller: "FormProfileController as profile",
      })

      .state('interests', {
        url: "/interests",
        templateUrl: "app/users/form-interests.html",
        controller: "FormInterestsController as interests",
      })

      .state('forgot-password', {
        url: "/forgot-password",
        templateUrl: "app/users/forgot-password.html",
        controller:"ForgotController as forgot"
      })

      /* Organizers 

      .state('organizer', {
        url: "/organizer",
        abstract: true,
        templateUrl: "app/dashboard-organizer/menu.html",
        controller: "MenuOrganizerCtrl as menu"
      })

      .state('organizer.intro', {
        url: "/intro",
        views: {
          'menuContent' :{
            templateUrl: "app/dashboard-organizer/intro.html",
            controller: "IntroOrganizerCtrl as intro",
          }
        }
      })

      .state('organizer.home', {
        url: "/home",
        views: {
          'menuContent' :{
            templateUrl: "app/dashboard-organizer/home.html",
            controller: "HomeOrganizerController as home"
          }
        }
      })

      .state('organizer.profile', {
        url: "/profile",
        views: {
          'menuContent' :{
            templateUrl: "app/users/profile.html",
            controller: "ProfileController as profile"
          }
        },
      })

      .state('organizer.events', {
        url: "/events",
        abstract: true,
        views: {
          'menuContent' :{
            templateUrl: "app/events-organizer/event-list-tabs.html",
            controller: "EventsTabsController as tabs"
          }
        },
      })

      .state('organizer.events.list', {
        url: "/list",
        views: {
          'tabEventList' :{
            templateUrl: "app/events-organizer/event-list.html",
            controller: "EventListController as eventList"
          }
        }
      })

      .state('organizer.events.detail-list', {
        url: "/event/:idEvent",
        views: {
          'tabEventList' :{
            templateUrl: "app/events-organizer/event-detail.html",
            controller: "EventDetailOrganizerController as eventDetail"
          }
        },
      })


      .state('organizer.events.past', {
        url: "/past",
        views: {
          'tabPastEvents' :{
            templateUrl: "app/events-organizer/past-events.html",
            controller: "PastEventsController as eventList"
          }
        }
      })

      .state('organizer.events.detail-past', {
        url: "/past-event/:idEvent",
        views: {
          'tabPastEvents' :{
            templateUrl: "app/events-organizer/event-detail.html",
            controller: "EventDetailOrganizerController as eventDetail"
          }
        }
      })

      .state('organizer.addevent', {
        url: "/addevent",
        views: {
          'menuContent' :{
            templateUrl: "app/events-organizer/add-event.html",
            controller: "AddEventController as addEvent"
          }
        },
        cache: false,
      })

      .state('organizer.editevent', {
        url: "/editevent/:id",
        views: {
          'menuContent' :{
            templateUrl: "app/events-organizer/edit-event.html",
            controller: "EditEventController as editEvent"
          }
        },
        cache: false,
      })

      .state('organizer.event', {
        url: "/event/:idEvent",
        views: {
          'menuContent' :{
            templateUrl: "app/events-organizer/event-detail.html",
            controller: "EventDetailOrganizerController as eventDetail"
          }
        }
      })

      .state('organizer.sponsorships', {
        url: "/sponsorships",
        views: {
          'menuContent' :{
            templateUrl: "app/sponsors-organizer/sponsorships-tabs.html",
            controller: "SponsorshipsTabsController as tabs"
          }
        }
      })
      
      .state('organizer.sponsorships.list', {
        url: "/list",
        views: {
          'tabEventList' :{
            templateUrl: "app/sponsors-organizer/sponsorships-list.html",
            controller: "SponsorshipsListController as list"
          }
        },
      })
      
      .state('organizer.sponsorships.past', {
        url: "/past",
        views: {
          'tabPastEvents' :{
            templateUrl: "app/sponsors-organizer/sponsorships-past-events.html",
            controller: "SponsorshipsPastEventsController as list"
          }
        },
      })

      .state('organizer.sponsorship', {
        url: "/sponsorship/:id",
        views: {
          'menuContent' :{
            templateUrl: "app/sponsors-organizer/sponsorship-detail.html",
            controller: "SponsorshipOrganizerDetailController as detail"
          }
        }
      })

      .state('organizer.tasks', {
        url: "/tasks",
        abstract: true,
        views: {
          'menuContent' :{
            templateUrl: "app/tasks-organizer/task-list-tabs.html",
            controller: "TaskTabsController as tabs"
          }
        },
      })

      .state('organizer.tasks.list', {
        url: "/list",
        views: {
          'tabTasksList' :{
            templateUrl: "app/tasks-organizer/task-list.html",
            controller: "TaskListController as taskList"
          }
        }
      })

      .state('organizer.tasks.list-past', {
        url: "/past",
        views: {
          'tabPastTasks' :{
            templateUrl: "app/tasks-organizer/past-tasks.html",
            controller: "PastTaskController as taskList"
          }
        }
      })

      .state('organizer.invite', {
        url: "/invite",
        views: {
          'menuContent' :{
            templateUrl: "app/users/invite-users.html",
            controller: "InviteUsersController as invite"
          }
        }
      })

      .state('organizer.settings', {
        url: "/settings",
        views: {
          'menuContent' :{
            templateUrl: "app/users/settings.html",
            controller: "SettingsController as settings"
          }
        }
      })
      
      .state('organizer.notifications', {
        url: "/notifications",
        views: {
          'menuContent' :{
            templateUrl: "app/users/notifications.html",
            controller: "NotificationsController as list"
          }
        }
      })
      

      /* Sponzors */

      .state('sponzor', {
        url: "/sponzor",
        abstract: true,
        templateUrl: "app/dashboard-sponzor/menu.html",
        controller: "MenuSponzorCtrl as menu"

      })

      .state('sponzor.intro', {
        url: "/intro",
        views: {
          'menuContent' :{
            templateUrl: "app/dashboard-sponzor/intro.html",
            controller: "IntroSponzorCtrl as intro",
          }
        }
      })

      .state('sponzor.home', {
        url: "/home",
        views: {
          'menuContent' :{
            templateUrl: "app/dashboard-sponzor/home.html",
            controller: "HomeSponzorController as home"
          }
        }
      })

      .state('sponzor.following', {
        url: "/following",
        views: {
          'menuContent' :{
            templateUrl: "app/events-sponsor/follow-events.html",
            controller: "FollowEventsController as list"
          }
        }
      })

      .state('sponzor.sponzoring', {
        url: "/sponzoring",
        views: {
          'menuContent' :{
            templateUrl: "app/events-sponsor/sponsoring-events.html",
            controller: "SponzoringEventsController as sponzoring"
          }
        }
      })

      .state('sponzor.profile', {
        url: "/profile",
        views: {
          'menuContent' :{
            templateUrl: "app/users/profile.html",
            controller: "ProfileController as profile"
          }
        }
      })

      .state('sponzor.event', {
        url: "/event/:idEvent",
        views: {
          'menuContent' :{
            templateUrl: "app/events-sponsor/event-detail.html",
            controller: "EventDetailSponzorController as eventDetail"
          }
        }
      })

      .state('sponzor.sponsorship', {
        url: "/sponsorship/:id",
        views: {
          'menuContent' :{
            templateUrl: "app/events-sponsor/sponsorship-detail.html",
            controller: "SponsorshipSponsorDetailController as detail"
          }
        }
      })

      .state('sponzor.invite', {
        url: "/invite",
        views: {
          'menuContent' :{
            templateUrl: "app/users/invite-users.html",
            controller: "InviteUsersController as invite"
          }
        }
      })

      .state('sponzor.settings', {
        url: "/settings",
        views: {
          'menuContent' :{
            templateUrl: "app/users/settings.html",
            controller: "SettingsController as settings"
          }
        }
      })
      
      .state('sponzor.notifications', {
        url: "/notifications",
        views: {
          'menuContent' :{
            templateUrl: "app/users/notifications.html",
            controller: "NotificationsController as list"
          }
        }
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
*/