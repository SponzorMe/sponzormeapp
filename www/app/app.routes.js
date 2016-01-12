/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider) {

    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.views.maxCache(10);

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

      /* Organizers */

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
            templateUrl: "app/events-organizer/event-list-tabs.html"
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
        }
      })

      .state('organizer.editevent', {
        url: "/editevent/:id",
        views: {
          'menuContent' :{
            templateUrl: "app/events-organizer/edit-event.html",
            controller: "EditEventController as editEvent"
          }
        }
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

      .state('organizer.sponsors', {
        url: "/sponsors",
        views: {
          'menuContent' :{
            templateUrl: "app/sponsors-organizer/sponzor-list.html",
            controller: "SponzorListController as sponzorList"
          }
        }
      })

      .state('organizer.sponzor', {
        url: "/sponzor/:id",
        views: {
          'menuContent' :{
            templateUrl: "app/sponsors-organizer/sponzor-detail.html",
            controller: "SponsorshipDetailController as sponzorDetail"
          }
        }
      })

      .state('organizer.tasks', {
        url: "/tasks",
        views: {
          'menuContent' :{
            templateUrl: "app/tasks-organizer/task-list.html",
            controller: "TaskListController as taskList"
          }
        }
      })

      .state('organizer.addTask', {
        url: "/addTask",
        views: {
          'menuContent' :{
            templateUrl: "app/tasks-organizer/add-task.html",
            controller: "AddTaskController as addTask"
          }
        }
      })

      .state('organizer.editTask', {
        url: "/editTask/:id",
        views: {
          'menuContent' :{
            templateUrl: "app/tasks-organizer/edit-task.html",
            controller: "EditTaskController as editTask"
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
            controller: "FollowEventsController as follow"
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

      .state('sponzor.addTask', {
        url: "/addTask/:idEvent/:idPerk",
        views: {
          'menuContent' :{
            templateUrl: "app/tasks-sponsor/add-task.html",
            controller: "AddTaskSponsorController as addTask"
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

      .state('sponzor.event-tasks', {
        url: "/event-tasks/:idEvent",
        views: {
          'menuContent' :{
            templateUrl: "app/events-sponsor/event-detail-tasks.html",
            controller: "EventDetailTasksSponzorController as eventDetail"
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