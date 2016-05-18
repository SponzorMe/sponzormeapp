/// <reference path="../typings/tsd.d.ts" />
/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider, $ionicAutoTrackProvider) {

    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.scrolling.jsScrolling(false);
    
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

      /*.state('tests', {
        url: '/tests',
        templateUrl: 'templates/users/tests.html',
        controller: 'TestsController as test',
      })*/

      .state('signin', {
        url: '/sign-in',
        templateUrl: () => {
          if (ionic.Platform.isAndroid()) return "templates/users/android/login.html";
          return "templates/users/ios/login.html";
        },
        controller: 'LoginCtrl as login',
      })

      .state('joinnow', {
        url: "/joinnow",
        templateUrl: "templates/users/register.html",
        controller: "RegisterCtrl as register"
      })

      .state('profile', {
        url: "/profile",
        templateUrl: "templates/users/form-profile.html",
        controller: "FormProfileCtrl as profile",
      })

      .state('interests', {
        url: "/interests",
        templateUrl: "templates/users/form-interests.html",
        controller: "FormInterestsCtrl as interests",
      })

      .state('forgot-password', {
        url: "/forgot-password",
        templateUrl: "templates/users/forgot-password.html",
        controller:"ForgotCtrl as forgot"
      })

      /* Organizers */

      .state('organizer', {
        url: "/organizer",
        abstract: true,
        templateUrl: "templates/dashboard-organizer/menu.html",
        controller: "MenuOrganizerCtrl as menu"
      })

      .state('organizer.intro', {
        url: "/intro",
        views: {
          'menuContent' :{
            templateUrl: "templates/dashboard-organizer/intro.html",
            controller: "IntroOrganizerCtrl as intro",
          }
        }
      })

      .state('organizer.home', {
        url: "/home",
        views: {
          'menuContent' :{
            templateUrl: "templates/dashboard-organizer/home.html",
            controller: "HomeOrganizerCtrl as home"
          }
        }
      })

      .state('organizer.profile', {
        url: "/profile",
        views: {
          'menuContent' :{
            templateUrl: "templates/users/profile.html",
            controller: "ProfileCtrl as profile"
          }
        },
      })

      .state('organizer.events', {
        url: "/events",
        abstract: true,
        views: {
          'menuContent' :{
            templateUrl: "templates/events-organizer/event-list-tabs.html",
            controller: "EventsTabsOrganizerCtrl as tabs"
          }
        },
      })

      .state('organizer.events.list', {
        url: "/list",
        views: {
          'tabEventList' :{
            templateUrl: "templates/events-organizer/event-list.html",
            controller: "EventListOrganizerCtrl as eventList"
          }
        }
      })

      .state('organizer.events.detail-list', {
        url: "/event/:id",
        views: {
          'tabEventList' :{
            templateUrl: "templates/events-organizer/event-detail.html",
            controller: "EventDetailOrganizerCtrl as eventDetail"
          }
        },
      })


      .state('organizer.events.past', {
        url: "/past",
        views: {
          'tabPastEvents' :{
            templateUrl: "templates/events-organizer/past-events.html",
            controller: "PastEventsOrganizerCtrl as eventList"
          }
        }
      })

      .state('organizer.events.detail-past', {
        url: "/past-event/:id",
        views: {
          'tabPastEvents' :{
            templateUrl: "templates/events-organizer/event-detail.html",
            controller: "EventDetailOrganizerCtrl as eventDetail"
          }
        }
      })

      .state('organizer.addevent', {
        url: "/addevent",
        views: {
          'menuContent' :{
            templateUrl: "templates/events-organizer/add-event.html",
            controller: "AddEventCtrl as addEvent"
          }
        },
        cache: false,
      })

      .state('organizer.editevent', {
        url: "/editevent/:id",
        views: {
          'menuContent' :{
            templateUrl: "templates/events-organizer/edit-event.html",
            controller: "EditEventCtrl as editEvent"
          }
        },
        cache: false,
      })

      .state('organizer.event', {
        url: "/event/:id",
        views: {
          'menuContent' :{
            templateUrl: "templates/events-organizer/event-detail.html",
            controller: "EventDetailOrganizerCtrl as eventDetail"
          }
        }
      })

      .state('organizer.sponsorships', {
        url: "/sponsorships",
        views: {
          'menuContent' :{
            templateUrl: "templates/sponsors-organizer/sponsorships-tabs.html",
            controller: "SponsorshipsTabsCtrl as tabs"
          }
        }
      })
      
      .state('organizer.sponsorships.list', {
        url: "/list",
        views: {
          'tabEventList' :{
            templateUrl: "templates/sponsors-organizer/sponsorships-list.html",
            controller: "SponsorshipsListCtrl as list"
          }
        },
      })
      
      .state('organizer.sponsorships.past', {
        url: "/past",
        views: {
          'tabPastEvents' :{
            templateUrl: "templates/sponsors-organizer/sponsorships-past-events.html",
            controller: "SponsorshipsPastEventsCtrl as list"
          }
        },
      })

      .state('organizer.sponsorship', {
        url: "/sponsorship/:id",
        views: {
          'menuContent' :{
            templateUrl: "templates/sponsors-organizer/sponsorship-detail.html",
            controller: "SponsorshipOrganizerDetailCtrl as detail"
          }
        }
      })

      .state('organizer.tasks', {
        url: "/tasks",
        abstract: true,
        views: {
          'menuContent' :{
            templateUrl: "templates/tasks-organizer/task-list-tabs.html",
            controller: "TaskTabsCtrl as tabs"
          }
        },
      })

      .state('organizer.tasks.list', {
        url: "/list",
        views: {
          'tabTasksList' :{
            templateUrl: "templates/tasks-organizer/task-list.html",
            controller: "TaskListCtrl as taskList"
          }
        }
      })

      .state('organizer.tasks.list-past', {
        url: "/past",
        views: {
          'tabPastTasks' :{
            templateUrl: "templates/tasks-organizer/past-tasks.html",
            controller: "PastTasksCtrl as taskList"
          }
        }
      })

      .state('organizer.invite', {
        url: "/invite",
        views: {
          'menuContent' :{
            templateUrl: "templates/users/invite-users.html",
            controller: "InviteUsersCtrl as invite"
          }
        }
      })

      .state('organizer.settings', {
        url: "/settings",
        views: {
          'menuContent' :{
            templateUrl: "templates/users/settings.html",
            controller: "SettingsCtrl as settings"
          }
        }
      })
      
      .state('organizer.notifications', {
        url: "/notifications",
        views: {
          'menuContent' :{
            templateUrl: "templates/users/notifications.html",
            controller: "NotificationsCtrl as list"
          }
        }
      })
      

      /* Sponzors */

      .state('sponzor', {
        url: "/sponzor",
        abstract: true,
        templateUrl: "templates/dashboard-sponzor/menu.html",
        controller: "MenuSponsorCtrl as menu"

      })

      .state('sponzor.intro', {
        url: "/intro",
        views: {
          'menuContent' :{
            templateUrl: "templates/dashboard-sponzor/intro.html",
            controller: "IntroSponsorCtrl as intro",
          }
        }
      })

      .state('sponzor.home', {
        url: "/home",
        views: {
          'menuContent' :{
            templateUrl: "templates/dashboard-sponzor/home.html",
            controller: "HomeSponsorCtrl as home"
          }
        }
      })

      .state('sponzor.following', {
        url: "/following",
        views: {
          'menuContent' :{
            templateUrl: "templates/events-sponsor/follow-events.html",
            controller: "FollowEventsCtrl as list"
          }
        }
      })

      .state('sponzor.sponzoring', {
        url: "/sponzoring",
        views: {
          'menuContent' :{
            templateUrl: "templates/events-sponsor/sponsoring-events.html",
            controller: "SponsoringEventsCtrl as sponzoring"
          }
        }
      })

      .state('sponzor.profile', {
        url: "/profile",
        views: {
          'menuContent' :{
            templateUrl: "templates/users/profile.html",
            controller: "ProfileCtrl as profile"
          }
        }
      })

      .state('sponzor.event', {
        url: "/event/:id",
        views: {
          'menuContent' :{
            templateUrl: "templates/events-sponsor/event-detail.html",
            controller: "EventDetailSponsorCtrl as eventDetail"
          }
        }
      })

      .state('sponzor.sponsorship', {
        url: "/sponsorship/:id",
        views: {
          'menuContent' :{
            templateUrl: "templates/events-sponsor/sponsorship-detail.html",
            controller: "SponsorshipSponsorDetailCtrl as detail"
          }
        }
      })

      .state('sponzor.invite', {
        url: "/invite",
        views: {
          'menuContent' :{
            templateUrl: "templates/users/invite-users.html",
            controller: "InviteUsersCtrl as invite"
          }
        }
      })

      .state('sponzor.settings', {
        url: "/settings",
        views: {
          'menuContent' :{
            templateUrl: "templates/users/settings.html",
            controller: "SettingsCtrl as settings"
          }
        }
      })
      
      .state('sponzor.notifications', {
        url: "/notifications",
        views: {
          'menuContent' :{
            templateUrl: "templates/users/notifications.html",
            controller: "NotificationsCtrl as list"
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
