/**
* @File the start the app
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';
  angular.module('app', [
    // Core 
    'ionic',
    'ionic.service.core',
    'ionic.service.deploy',
    'ionic.service.analytics',
    'ngCordova',
    'google.places',
    'firebase',
    'angularMoment',
    //'ngCordovaMocks',
    'ngMessages',
    'ngStorage',
    'ngSanitize',
    'ngIOS9UIWebViewPatch',
    'pascalprecht.translate',
    'base64',
    'tabSlideBox',
    //Widgets
    'app.widgets',
    'app.filters',
    //Feature areas
    'app.users',
    'app.dashboard-organizer',
    'app.dashboard-sponzor',
    'app.events-organizer',
    'app.events-sponzor',
    'app.sponsors-organizer',
    'app.tasks-organizer'
  ])
})();
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
(function() {
  'use strict';
  angular
    .module('app')
    .constant('moment', moment);
})();
/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .value('BackendVariables',{
      url: "https://api.sponzor.me/", // i'm using the Ionic Proxy
      f_url: "https://sponzorme.firebaseio.com/staging/",
      url_web: "https://sponzor.me/",
      version: "v1.1.1",
      channel: "dev"
    })
    .value('AMAZON',{
      'AMAZONSECRET': 'RlzqEBFUlJW/8YGkeasfmTZRLTlWMWwaBpJNBxu6',
      'AMAZONKEY': 'AKIAJDGUKWK3H7SJZKSQ',
      'AMAZONBUCKET': 'sponzormewebappimages',
      'AMAZONBUCKETREGION': 'us-west-2',
      'AMAZONBUCKETURL': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/',
    });
})();

(function() {
  'use strict';
  angular.module('app.dashboard-organizer', []);
})();
(function() {
  'use strict';
  angular.module('app.dashboard-sponzor', []);
})();
(function() {
  'use strict';
  angular.module('app.events-sponzor', []);
})();
(function() {
  'use strict';
  angular.module('app.events-organizer', []);
})();
(function() {
  'use strict';
  angular.module('app.filters', []);
})();
(function() {
  'use strict';
  angular.module('app.sponsors-organizer', []);
})();
(function() {
  'use strict';
  angular.module('app.tasks-organizer', []);
})();
(function() {
  'use strict';
  angular.module('app.users', []);
})();
(function() {
  'use strict';
  angular.module('app.widgets', []);
})();
/**
* @Servicio de Eventos
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('categoryService', categoryService);

  categoryService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function categoryService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      allCategories : allCategories,
      getCategory: getCategory
    };

    return service;

    ////////////

    /*
    function getToken(){
      return $localStorage.token;
    }*/

    function allCategories(){
      return $http({
        method: 'GET',
        url: path + 'categories'
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.categories );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function getCategory( categoryId ){

      //Validate
      var typeCategoryId = typeof categoryId;
      if(typeCategoryId !== 'string' && typeCategoryId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'categories/' + categoryId
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.data.category );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

  }
})();

/**
* @Servicio de Eventos
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('eventService', eventService);

  eventService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function eventService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      allEvents: allEvents,
      getEvent: getEvent,
      createEvent: createEvent,
      deleteEvent: deleteEvent,
      editEventPatch: editEventPatch,
      editEventPut: editEventPut
    };

    return service;

    ////////////
    function getToken(){
      return $localStorage.token;
    }

    function allEvents(){
      
      return $http({
        method: 'GET',
        url: path + 'events'
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        var events = preparateData( response.data.data.events );
        return $q.when( events );
      }

      function preparateData( events ){
        return events.map( preparateEvent );

        function preparateEvent( item ){
          item.image = (item.image == "event_dummy.png") ? 'img/banner.jpg' : item.image;
          item.starts = moment(item.starts)._d;
          item.ends = moment(item.ends)._d;
          return item;
        }
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getEvent( eventId ){

      //Validate
      var typeEventId = typeof eventId;
      if(typeEventId !== 'string' && typeEventId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'events/' + eventId
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( preparateData(response.data.event) );

        function preparateData( event ){
          event.image = (event.image == "event_dummy.png") ? 'img/banner.jpg' : event.image;
          event.user_organizer.image = (event.user_organizer.image == "organizer_sponzorme.png"  || event.user_organizer.image == "" ) ? 'img/photo.png' : event.user_organizer.image;
          event.starts = moment(event.starts)._d;
          event.ends = moment(event.ends)._d;
          return event;
        }
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function createEvent( data ){

      //Validate
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'POST',
        url: path + 'events',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ getToken()
        },
        data: data
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.event );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function deleteEvent( eventId ){

      //Validate
      var typeEventId = typeof eventId;
      if(typeEventId !== 'string' && typeEventId !== 'number') throw new Error();

      return $http({
        method: 'DELETE',
        url: path + 'events/' + eventId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editEventPatch( eventId, data ){

      //Validate
      var typeEventId = typeof eventId;
      if(typeEventId !== 'string' && typeEventId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PATCH',
        url: path + 'events/' + eventId,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ getToken()
        },
        data: data
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.event );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editEventPut( eventId, data ){

      //Validate
      var typeEventId = typeof eventId;
      if(typeEventId !== 'string' && typeEventId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PUT',
        url: path + 'events/' + eventId,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ getToken()
        },
        data: data
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.event );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    

  }
})();

/**
* @Service de eventType
*
* @author Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('eventTypeService', eventTypeService);

  eventTypeService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function eventTypeService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      allEventTypes: allEventTypes,
      getEventType: getEventType
    };

    return service;

    ////////////

    function allEventTypes() {
      return $http({
        method: 'GET',
        url: path + 'event_types'
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.eventTypes );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getEventType( eventTypeId ){

      //Validate
      var typeEventTypeId = typeof eventTypeId;
      if(typeEventTypeId !== 'string' && typeEventTypeId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'event_types/' + eventTypeId
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.data.eventTypes );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

  }
})();
/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('imgurService', imgurService);

  imgurService.$inject = [
    '$http',
    '$q'
  ];

  function imgurService( $http, $q ) {

    var path = 'https://api.imgur.com/3/';
    var clientId = "bdff09d775f47b9";

    var service = {
      uploadImage: uploadImage,
    };

    return service;

    ////////////

    function uploadImage( image ){

      var typeImage = typeof image;
      if(typeImage !== 'string') throw new Error();

      return $http({
        method: 'POST',
        url: path + 'image',
        headers: {
          'Authorization' : 'Client-ID '+ clientId
        },
        data: {
          image: image,
          type: 'base64'
        },
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.data.link );
      } 

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

  }
})();
(function() {
  'use strict';

  angular
    .module('app')
    .factory('notificationService', notificationService);

  notificationService.$inject = [
    '$http',
    '$q',
    '$firebaseArray',
    'BackendVariables',
    '$localStorage',
    'userService',
    '$rootScope',
    '$ionicHistory',
    'userAuthService'
  ];

  function notificationService( $http, $q, $firebaseArray, BackendVariables, $localStorage, userService, $rootScope, $ionicHistory, userAuthService ) {

    var path = BackendVariables.f_url;

    var service = {
      activate: activate,
      sendNewSponsorship: sendNewSponsorship,
      sendAcceptSponsorship: sendAcceptSponsorship,
      sendRejectSponsorship: sendRejectSponsorship,
      sendNewTaskOrganizer: sendNewTaskOrganizer,
      sendUpdateTaskOrganizer: sendUpdateTaskOrganizer,
      sendDoneTaskOrganizer: sendDoneTaskOrganizer,
      sendNewTaskSponsor: sendNewTaskSponsor,
      sendUpdateTaskSponsor: sendUpdateTaskSponsor,
      sendDoneTaskSponsor: sendDoneTaskSponsor,
      sendNewEvent: sendNewEvent,
      sendUpdateEvent: sendUpdateEvent,
      getNotifications: getNotifications
    };

    return service;

    ////////////
    
    function getNotifications( userId ) {
      var url = path + 'notifications/' + userId;
      return $firebaseArray( new Firebase( url ));
    }

    function sendNotification(notification, to){
      
      notification.date = new Date().getTime();
      notification.to = to;
      notification.fromApp = 'mobileApp';
      notification.toApp = 'mobileApp';
      notification.read = false;
      
      var url = path + 'notifications/' + to;
      var notificationsRef =  $firebaseArray( new Firebase( url ));
      
      notificationsRef.$add(notification);
    }
    
    function sendNewSponsorship(notification, to) {
      notification.typeNotification = "newSponsorship";
      notification.type = "sponsorship";
      sendNotification(notification, to);
    }
    
    function sendAcceptSponsorship(notification, to) {
      notification.typeNotification = "acceptSponsorship";
      notification.type = "sponsorship";
      sendNotification(notification, to);
    }
    
    function sendRejectSponsorship(notification, to) {
      notification.typeNotification = "rejectSponsorship";
      notification.type = "sponsorship";
      sendNotification(notification, to);
    }
    
    function sendNewTaskOrganizer(notification, to) {
      notification.typeNotification = "newTaskOrganizer";
      notification.type = "task";
      sendNotification(notification, to);
    }
    
    function sendUpdateTaskOrganizer(notification, to) {
      notification.typeNotification = "updateTaskOrganizer";
      notification.type = "task";
      sendNotification(notification, to);
    }
    
    function sendDoneTaskOrganizer(notification, to) {
      notification.typeNotification = "doneTaskOrganizer";
      notification.type = "task";
      sendNotification(notification, to);
    }
    
    function sendNewTaskSponsor(notification, to) {
      notification.typeNotification = "newTaskSponsor";
      notification.type = "task";
      sendNotification(notification, to);
    }
    
    function sendUpdateTaskSponsor(notification, to) {
      notification.typeNotification = "updateTaskSponsor";
      notification.type = "task";
      sendNotification(notification, to);
    }
    
    function sendDoneTaskSponsor(notification, to) {
      notification.typeNotification = "doneTaskSponsor";
      notification.type = "task";
      sendNotification(notification, to);
    }
    
    function sendNewEvent() {
      var notification = {};
      notification.date = new Date().getTime();
      notification.fromApp = 'mobileApp';
      notification.toApp = 'mobileApp';
      
      var url = path + 'notifications/events';
      var notificationsRef =  $firebaseArray( new Firebase( url ));
      
      notificationsRef.$add(notification);
    }
    
    function sendUpdateEvent() {
      var notification = {};
      notification.date = new Date().getTime();
      notification.fromApp = 'mobileApp';
      notification.toApp = 'mobileApp';
      
      var url = path + 'notifications/events';
      var notificationsRef =  $firebaseArray( new Firebase( url ));
      
      notificationsRef.$add(notification);
    }
    
    
    function activate() {
      notificationForMe();
      var userAuth = userAuthService.getUserAuth();
      if(userAuth.type == '1') updateEvents();
    }
    
    function notificationForMe() {
      var userAuth = userAuthService.getUserAuth();
      var url =  path + 'notifications/'+ userAuth.id;
      var reference =  new Firebase( url );
      reference.on('child_added', listener);
      
      function listener( snapshot ){
        var current = snapshot.val();
        if(userAuth.lastUpdate < current.date){
          userAuthService.refresh();
        }
      }
    }
    
    function updateEvents() {
      var url =  path + 'notifications/events'
      var reference =  new Firebase( url );
      reference.on('child_added', listener);
      
      function listener( snapshot ){
        var current = snapshot.val();
        if($localStorage.lastUpdate < current.date){
          userService.home( $localStorage.userAuth.id )
          .then(complete);
          
          function complete( user ){
            var userAuth = userAuthService.updateUserAuth( user );
            $rootScope.$broadcast('HomeSponzorController:getEvents');
            $rootScope.$broadcast('MenuSponzor:counts');
          }
        }
        
      }
    }

  }
})();
/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('perkService', perkService);

  perkService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function perkService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      allPerks: allPerks,
      getPerk: getPerk,
      createPerk: createPerk,
      deletePerk: deletePerk,
      editPerkPatch: editPerkPatch,
      editPerkPut: editPerkPut
    };

    return service;

    ////////////

    function allPerks(){
      return $http({
        method: 'GET',
        url: path + 'perks'
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.Perk );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getPerk( perkId ){

      //Validate
      var typePerkId = typeof perkId;
      if(typePerkId !== 'string' && typePerkId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'perks/' + perkId
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( preparateData(response.data.data) );
      }

      function preparateData( data ){
        var perk = data.Perk;
        perk.event = data.Event || {};
        perk.sponzorTasks = data.SponzorTasks || [];
        perk.tasks = data.Tasks || [];
        return perk;
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function createPerk( data ){

      //Validate
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'POST',
        url: path + 'perks',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.Perk );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function deletePerk( perkId ){

      //Validate
      var typePerkId = typeof perkId;
      if(typePerkId !== 'string' && typePerkId !== 'number') throw new Error();

      return $http({
        method: 'DELETE',
        url: path + 'perks/' + perkId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editPerkPatch( perkId, data ){

      //Validate
      var typePerkId = typeof perkId;
      if(typePerkId !== 'string' && typePerkId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PATCH',
        url: path + 'perks/' + perkId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.Perk );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editPerkPut( perkId, data ){

      //Validate
      var typePerkId = typeof perkId;
      if(typePerkId !== 'string' && typePerkId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PUT',
        url: path + 'perks/' + perkId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.Perk );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getToken(){
      return $localStorage.token;
    }

  }
})();

/**
* @Servicio de PerkTask
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('perkTaskService', perkTaskService);

  perkTaskService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$httpParamSerializerJQLike',
    '$q'
  ];

  function perkTaskService( $http, $localStorage, BackendVariables, $httpParamSerializerJQLike, $q) {

    var path = BackendVariables.url;

    var service = {
      allPerkTasks: allPerkTasks,
      getPerkTask: getPerkTask,
      createPerkTask: createPerkTask,
      deletePerkTask: deletePerkTask,
      editPerkTaskPatch: editPerkTaskPatch,
      editPerkTaskPut: editPerkTaskPut,
      getPerkTaskByOrganizer: getPerkTaskByOrganizer
    };

    return service;

    ////////////

    function allPerkTasks(){
      return $http.get(path + 'perk_tasks')
        .then( complete )
        .catch( failed );

      function complete( response ) {
        return $q.when( response.data.PerkTasks );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getPerkTask( perkTaskId ){

      //Validate
      var typePerkTaskId = typeof perkTaskId;
      if(typePerkTaskId !== 'string' && typePerkTaskId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'perk_tasks/' + perkTaskId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( preparateData( response.data.data ) );
      }

      function preparateData( data ){
        var task = data.PerkTask;
        task.event = data.Event || {};
        task.perk = data.Perk || {};
        task.user = data.User || {};
        return task;
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getPerkTaskByOrganizer( userId ){

      //Validate
      var typeUserId = typeof userId;
      if(typeUserId !== 'string' && typeUserId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'perk_tasks_organizer/' + userId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.PerkTasks );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function createPerkTask( data ){
      
      //Validate
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();
      
      return $http({
        method: 'POST',
        url: path + 'perk_tasks',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function deletePerkTask( perkTaskId ){

      //Validate
      var typePerkTaskId = typeof perkTaskId;
      if(typePerkTaskId !== 'string' && typePerkTaskId !== 'number') throw new Error();

      return $http({
        method: 'DELETE',
        url: path + 'perk_tasks/' + perkTaskId,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': 'Basic '+ getToken()
        }
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editPerkTaskPatch( perkTaskId, data ){

      //Validate
      var typePerkTaskId = typeof perkTaskId;
      if(typePerkTaskId !== 'string' && typePerkTaskId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PATCH',
        url: path + 'perk_tasks/' + perkTaskId,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike( data )
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.PerkTask );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editPerkTaskPut( perkTaskId, data ){

      //Validate
      var typePerkTaskId = typeof perkTaskId;
      if(typePerkTaskId !== 'string' && typePerkTaskId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PUT',
        url: path + 'perk_tasks/' + perkTaskId,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.PerkTask );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getToken(){
      return $localStorage.token;
    }

  }
})();
/**
* @Servicio de Sponzorships (Beneficios)
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('sponsorshipService', sponsorshipService);

  sponsorshipService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function sponsorshipService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      allSponsorships: allSponsorships,
      getSponzorship: getSponzorship,
      sponzorshipByOrganizer: sponzorshipByOrganizer,
      sponzorshipBySponzor: sponzorshipBySponzor,
      createSponzorship: createSponzorship,
      deleteSponzorship: deleteSponzorship,
      editSponzorshipPatch: editSponzorshipPatch,
      editSponzorshipPut: editSponzorshipPut
    };

    return service;

    ////////////

    function allSponsorships(){
      return $http.get(path + 'sponzorships')
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.SponzorsEvents );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function getSponzorship( sponzorshipId ){

      //Validate
      var typeSponzorshipId = typeof sponzorshipId;
      if(typeSponzorshipId !== 'string' && typeSponzorshipId !== 'number') throw new Error();

      return $http.get(path + 'sponzorships/' + sponzorshipId)
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( preparateData( response.data.data ) );
      }

      function preparateData( data ){
        var sponzorship = data.SponzorEvent;
        sponzorship.sponzor = data.Sponzor || {};
        sponzorship.perk = data.Perk || {};
        sponzorship.organizer = data.Organizer || {};
        sponzorship.event = data.Event || {};
        sponzorship.tasks = data.Tasks || [];
        return sponzorship;
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function sponzorshipByOrganizer( organizerId ){

      //Validate
      var typeOrganizerId = typeof organizerId;
      if(typeOrganizerId !== 'string' && typeOrganizerId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'sponzorships_organizer/' + organizerId,
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( preparateData( response.data.SponzorsEvents ) );
      }

      function preparateData( data ){
        return data.map( preparateItem );

        function preparateItem( item ){
          item.starts = moment(item.starts)._d;
          item.ends = moment(item.ends)._d;
          return item;
        }
        
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function sponzorshipBySponzor( sponzorId ){

      //Validate
      var typeSponzorId = typeof sponzorId;
      if( typeSponzorId !== 'string' && typeSponzorId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'sponzorships_sponzor/' + sponzorId,
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( preparateData( response.data.SponzorsEvents ) );
      }

      function preparateData( data ){
        return data.map( preparateItem );

        function preparateItem( item ){
          item.starts = moment(item.starts)._d;
          item.ends = moment(item.ends)._d;
          return item;
        }
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function createSponzorship( data ){

      //Validate
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'POST',
        url: path + 'sponzorships',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.Sponzorship );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function deleteSponzorship( sponzorshipId ){

      //Validate
      var typeSponzorshipId = typeof sponzorshipId;
      if( typeSponzorshipId !== 'string' && typeSponzorshipId !== 'number') throw new Error();

      return $http({
        method: 'DELETE',
        url: path + 'sponzorships/' + sponzorshipId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function editSponzorshipPatch( sponzorshipId, data ){

      //Validate
      var typeSponzorshipId = typeof sponzorshipId;
      if(typeSponzorshipId !== 'number' && typeSponzorshipId !== 'string') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PATCH',
        url: path + 'sponzorships/' + sponzorshipId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.Sponzorship );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function editSponzorshipPut( sponzorshipId, data ){

      //Validate
      var typeSponzorshipId = typeof sponzorshipId;
      if(typeSponzorshipId !== 'number' && typeSponzorshipId !== 'string') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PUT',
        url: path + 'sponzorships/' + sponzorshipId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.Sponzorship );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function getToken(){
      return $localStorage.token;
    }

  }
})();
/**
* @Servive for tasks of sponsor
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('tasksSponsorService', tasksSponsorService);

  tasksSponsorService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function tasksSponsorService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;
    var token = $localStorage.token;

    var service = {
      getAllTasks: getAllTasks,
      getTask: getTask,
      createTask: createTask,
      editPutTask: editPutTask,
      editPatchTask: editPatchTask,
      deleteTask: deleteTask
    };

    return service;

    ////////////

    function getToken(){
      return $localStorage.token;
    }

    function getAllTasks(){
      return $http({
        method: 'GET',
        url: path + 'task_sponzor',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.TasksSponzor );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getTask( taskId ){

      //Validate
      var typeTaskId = typeof taskId;
      if(typeTaskId !== 'string' && typeTaskId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'task_sponzor/' +  taskId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        }
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( preparateTask( response.data.data ) );
      }

      function preparateTask( data ){
        var task = data.Task;
        task.organizer = data.Organizer || null;
        task.event = data.Event || null;
        task.sponzor = data.Sponzor || null;
        return task;
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function createTask( data ){

      //Validate
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'POST',
        url: path + 'task_sponzor',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ getToken()
        },
        data: data
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( preparateData(response.data) );
      }
      
      function preparateData( data ) {
        data.TaskSponzor.task = data.PerkTask;
         return data.TaskSponzor;
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editPutTask( taskId, data ){


      //Validate
      var typeTaskId = typeof taskId;
      if(typeTaskId !== 'string' && typeTaskId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PUT',
        url: path + 'task_sponzor/' +  taskId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.TaskSponzor );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editPatchTask( taskId, data ){

      //Validate
      var typeTaskId = typeof taskId;
      if(typeTaskId !== 'string' && typeTaskId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PATCH',
        url: path + 'task_sponzor/' +  taskId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.TaskSponzor );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function deleteTask( taskId ){

      //Validate
      var typeTaskId = typeof taskId;
      if(typeTaskId !== 'string' && typeTaskId !== 'number') throw new Error();

      return $http({
        method: 'DELETE',
        url: path + 'task_sponzor/' +  taskId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        }
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    

  }
})();
/**
* @Servicio de Usuarios
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('userService', userService);

  userService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function userService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      login: login,
      home: home,
      getUser: getUser,
      createUser: createUser,
      deleteUser: deleteUser,
      editUserPatch: editUserPatch,
      editUserPut: editUserPut,
      forgotPassword: forgotPassword,
      invitedUser: invitedUser,
      checkSession: checkSession
    };

    return service;

    ////////////

    function login( email, password ){

      //Validate
      var typeEmail = typeof email;
      if(typeEmail !== 'string') throw new Error();
      var typePassword = typeof password;
      if(typePassword !== 'string' && typePassword !== 'number') throw new Error();


      return $http({
        method: 'POST',
        url: path + 'auth',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
        data: $httpParamSerializerJQLike({
          email: email,
          password: password
        })
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( preparateData(response.data) );
      }
      
      function preparateData( data ) {
        var user = data.user;
        if(user.type == 1){// Is a Sponzor
          user.events = data.events.map( preparateEvent );
          user.sponzorships = user.sponzorships.map( preparateSponzorships );
        }else{
          user.events = user.events.map( preparateEvent );
          user.sponzorships_like_organizer = user.sponzorships_like_organizer.map( preparateSponzorships );
        }
        return user;
      }
      
      function preparateEvent( item ){
        item.image = (item.image == "event_dummy.png") ? 'img/banner.jpg' : item.image;
        item.starts = moment(item.starts)._d;
        item.ends = moment(item.ends)._d;
        return item;  
      }
      
      function preparateSponzorships( item ){
        if(item.sponzor){
          item.sponzor.image = (item.sponzor.image == "") ? 'img/photo.png' : item.sponzor.image;
        }
        item.event.starts = moment(item.event.starts)._d;
        item.event.ends = moment(item.event.ends)._d;
        return item;  
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getUser( userId ){

      //Validate
      var typeUserId = typeof userId;
      if(typeUserId !== 'string' && typeUserId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'users/' + userId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ getToken() },
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        var data = response.data.data.user;
        data.events = preparateEvents( data.events );
        return $q.when( data );
      }

      function preparateEvents( events ){
        return events
          .map( preparateEvent );

        function preparateEvent( item ){
          item.image = (item.image == "event_dummy.png") ? 'img/banner.jpg' : item.image;
          item.starts = moment(item.starts)._d;
          item.ends = moment(item.ends)._d;
          return item;
        }
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }
    
    function home( userId ){

      //Validate
      var typeUserId = typeof userId;
      if(typeUserId !== 'string' && typeUserId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'home/' + userId,
        headers: { 
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ getToken()
        },
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( preparateData(response.data.data) );
      }
      
      function preparateData( data ) {
        var user = data.user;
        if(user.type == 1){
          user.events = data.events.map( preparateEvent );
          user.sponzorships = user.sponzorships.map( preparateSponzorships );
        }else{
          user.events = user.events.map( preparateEvent );
          user.sponzorships_like_organizer = user.sponzorships_like_organizer.map( preparateSponzorships );
        }
        return user;
      }
      
      function preparateEvent( item ){
        item.image = (item.image == "event_dummy.png") ? 'img/banner.jpg' : item.image;
        item.starts = moment(item.starts)._d;
        item.ends = moment(item.ends)._d;
        return item;  
      }
      
      function preparateSponzorships( item ){
        if(item.sponzor){
          item.sponzor.image = (item.sponzor.image == "") ? 'img/photo.png' : item.sponzor.image;
        }
        item.event.starts = moment(item.event.starts)._d;
        item.event.ends = moment(item.event.ends)._d;
        return item;  
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function createUser( data ){

      //Validate
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'POST',
        url: path + 'users',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.User );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function deleteUser( userId ){

      //Validate
      var typeUserId = typeof userId;
      if(typeUserId !== 'number' && typeUserId !== 'string') throw new Error();

      return $http({
        method: 'DELETE',
        url: path + 'users/' + userId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editUserPatch( userId, data ){

      //Validate
      var typeUserId = typeof userId;
      if(typeUserId !== 'number' && typeUserId !== 'string') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PATCH',
        url: path + 'users/' + userId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.User );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function editUserPut( userId, data ){

      //Validate
      var typeUserId = typeof userId;
      if(typeUserId !== 'number' && typeUserId !== 'string') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PUT',
        url: path + 'users/' + userId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.User );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function forgotPassword( email ){

      //Validate
      var typeEmail = typeof email;
      if(typeEmail !== 'string') throw new Error();

      return $http({
        method: 'POST',
        url: path + 'send_reset_password',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike({
          email: email
        })
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function invitedUser( data ){

      //Validate
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'POST',
        url: path + 'invite_friend',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function checkSession(){
      if(angular.isDefined($localStorage.token) && angular.isDefined($localStorage.userAuth)){
        return true;
      }
      return false;
    }

    function getToken(){
      return $localStorage.token;
    }

  }
})();

/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .service('userAuthService', userAuthService);

  userAuthService.$inject = [
    '$http',
    '$q',
    '$localStorage',
    'userService',
    '$rootScope'
  ];

  function userAuthService( $http, $q, $localStorage, userService, $rootScope ) {

    this.getUserAuth = getUserAuth;
    this.updateUserAuth = updateUserAuth;
    this.checkSession = checkSession;
    this.refresh = refresh;
    
    function getUserAuth() {
      return $localStorage.userAuth;
    }
    
    function updateUserAuth( data ){
      $localStorage.userAuth = angular.extend($localStorage.userAuth || {}, data);
      $localStorage.lastUpdate = new Date().getTime();
      return $localStorage.userAuth;
    }
    
    function checkSession(){
      if(angular.isDefined($localStorage.token) && angular.isDefined($localStorage.userAuth)){
        return true;
      }
      return false;
    }
    
    function refresh() {
      userService.home( getUserAuth().id )
      .then(complete);
      
      function complete( user ){
        var userAuth = updateUserAuth( user );
        if(userAuth.type == 0){ //Is an organizer
          
          $rootScope.$broadcast('MenuOrganizer:count_events');
          $rootScope.$broadcast('EventsTabsController:count_events');
          $rootScope.$broadcast('HomeOrganizerController:count_events');
          
          $rootScope.$broadcast('MenuOrganizer:count_tasks');
          $rootScope.$broadcast('TaskTabsController:count_tasks');
          
          $rootScope.$broadcast('MenuOrganizer:count_sponsors');
          $rootScope.$broadcast('SponsorshipsTabsController:count_sponsors');
          $rootScope.$broadcast('HomeOrganizerController:count_sponsors');
          
          $rootScope.$broadcast('SponsorshipsListController:getSponzorships');
          $rootScope.$broadcast('SponsorshipsPastEventsController:getSponzorships');
          
          $rootScope.$broadcast('EventListController:getEvents');
          $rootScope.$broadcast('PastEventsController:getEvents');
          
        }else{
          $rootScope.$broadcast('MenuSponzor:counts');
          
          $rootScope.$broadcast('FollowEventsController:getSponzorships');
          $rootScope.$broadcast('SponzoringEventsController:getSponzorships');
          
          $rootScope.$broadcast('HomeSponzorController:getEvents');
        }
        
      }
    }
    
  }
})();
/**
* @Servicio de Interes del usuario
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('userInterestService', userInterestService);

  userInterestService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function userInterestService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      createUserInterest: createUserInterest,
      bulkUserInterest: bulkUserInterest
    };

    return service;

    ////////////

    function getToken(){
      return $localStorage.token;
    }

    function createUserInterest( data ){
      return $http({
        method: 'POST',
        url: path + 'user_interests',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.UserInterest );
      } 

      function failed( response ) {
        return $q.reject( response.data );
      }
    }
    
    function bulkUserInterest( userId, data ) {
      
      //Validate
      var typeUserId = typeof userId;
      if(typeUserId !== 'number' && typeUserId !== 'string') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();
      
      return $http({
        method: 'PUT',
        url: path + 'user_interests/' + userId,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ getToken()
        },
        data: data
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data );
      }

      function failed( response ) {
        return $q.reject( response.data );
      } 
    }

  }
})();

/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('utilsService', utilsService);

  utilsService.$inject = [
    '$ionicLoading',
    '$ionicPopup',
    '$translate',
    '$localStorage',
    '$ionicHistory'
  ];

  function utilsService( $ionicLoading, $ionicPopup, $translate, $localStorage) {

    var service = {
      showLoad: showLoad,
      hideLoad: hideLoad,
      alert: alert,
      confirm: confirm,
      trim: trim,
      resetForm: resetForm,
      updateUserAuth: updateUserAuth
    };

    return service;

    ////////////

    function showLoad(){
      return $ionicLoading.show({
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200,
        showDelay: 500,
        //template: '<p class="item-icon-left">'+ $translate.instant('MESSAGES.loading')+'<ion-spinner icon="bubbles"/></p>'
      });
    }

    function hideLoad(){
      $ionicLoading.hide();
    }

    function alert( msg ){
      var options = msg || {};
      options.title = options.title || '<p>Ocurrió un error.</p>';
      options.template  = options.template || '<p class="text-center">Intento de nuevo.</p>';
      return $ionicPopup.alert( options );
    }

    function confirm( msg ){
      var options = msg || {};
      options.title = options.title || '¿ Estas seguro ?';
      options.template  = options.template || 'Estas seguro de eliminar.';
      return $ionicPopup.confirm( options );
    }

    function trim( str ){
      if(typeof(str) == "string" || typeof(str) == "number" || typeof(str) == "boolean"){
        return str.toString().replace(/^\s+|\s+$/g,"");
      }
      return "";
    };

    function resetForm( form ){
      //Validate
      var typeForm = typeof form;
      if(typeForm !== 'object' || Array.isArray(form)) throw new Error();
      
      form.$setPristine();
      form.$setUntouched();
    }

    function updateUserAuth( data ){
      return angular.extend($localStorage.userAuth || {}, data);
    }

    

  }
})();

// Description:
//  Creates a new Spinner and sets its options
// Usage:
//  <div data-cc-spinner="vm.spinnerOptions"></div>
(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('spmCropImage', spmCropImage);

  spmCropImage.$inject = [];

  function spmCropImage() {
    var directive = {
      restrict: 'E',
      transclude: true,
      scope: {
        edit: '=edit',
      },
      template: '<div class="spm-crop">' +
                  '<i ng-show="edit" class="icon ion-edit edit"></i>' +
                  '<ng-transclude></ng-transclude>' +
                '</div>'
    };
    return directive;
  }
})();
// Description:
// Hide tabs
// Usage:
// <ion-tabs class="tabs-icon-top tabs-positive {{$root.hideTabs}}"></ion-tabs>
// <ion-view spm-hide-tabs></ion-view>
(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('spmHideTabs', spmHideTabs);

  spmHideTabs.$inject = [
    '$rootScope'
  ];

  function spmHideTabs( $rootScope ) {
    var directive = {
      restrict: 'A',
      link: link
    };
    return directive;

    function link($scope, $el) {
      $rootScope.hideTabs = 'tabs-item-hide';
      $scope.$on('$destroy', function() {
        $rootScope.hideTabs = '';
      });
    }
  }
})();
// Description:
// Network message online / offline
// Usage:
// <spm-network-message></spm-network-message>
(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('spmNetworkMessage', spmNetworkMessage);

  spmNetworkMessage.$inject = [
    '$cordovaNetwork',
    '$rootScope'
  ];

  function spmNetworkMessage( $cordovaNetwork, $rootScope ) {

    var directive = {
      restrict: 'E',
      controller: controller,
      controllerAs: 'vm',
      templateUrl: 'app/widgets/network-message.html'
    };
    return directive;

    function controller( $scope ) {

      var vm = this;
      //Attributes
      vm.message = false;
      
      //activate();
      //////////////

      function activate(){
        vm.message = $cordovaNetwork.isOffline();
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', updateNetworkState);
        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', updateNetworkState);
      }

      function updateNetworkState(event, networkState){
        vm.message = $cordovaNetwork.isOffline();
      }

    }
  }
})();
// Description:
//  Creates a new Spinner and sets its options
// Usage:
//  <div data-cc-spinner="vm.spinnerOptions"></div>
(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('spmAccordionItem', spmAccordionItem);

  spmAccordionItem.$inject = [];

  function spmAccordionItem() {
    var directive = {
      restrict: 'E',
      replace: true,
      transclude: true,
      require: '^spmAccordion',
      scope: {
        title: '@title',
        model: '@model',
      },
      controller: function() {},
      templateUrl: 'app/widgets/spm-accordion-item.html',
      link: function(scope, element, attrs, controller, transclude){
        scope.active = false;
        controller.addSection(scope);
        scope.activate = function() {
          controller.select(scope);
        };
      }
    };
    return directive;
  }
})();
// Description:
//  Creates a new Spinner and sets its options
// Usage:
//  <div data-cc-spinner="vm.spinnerOptions"></div>
(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('spmAccordion', spmAccordion);

  spmAccordion.$inject = [];

  function spmAccordion() {
    var directive = {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        autoOpen: '@autoOpen',
        type: '@type'
      },
      templateUrl: 'app/widgets/spm-accordion.html',
      controller: function($scope){
        var controller = this;
        var sections = controller.sections = $scope.sections = [];
        var autoOpen = controller.autoOpen = $scope.autoOpen = $scope.autoOpen || true; //auto open opens first tab on render

        controller.select = function(selectSection) {
          sections.forEach(function(section) {
            section.scope.active = section.scope === selectSection ? !section.scope.active : false;
          });
        };

        controller.addSection = function(sectionScope){
          sections.push({ scope: sectionScope });
          if(sections.length === 1 && autoOpen === true) {
            sections[0].active = true;
            sections[0].scope.active = true;
          }
        }
      },
      link: function(scope, element, attrs, controller){
        scope.autoOpen = controller.autoOpen = scope.autoOpen === "true" ? true : false;
      }
    };
    return directive;
  }
})();
// Description:
// Network message online / offline
// Usage:
// <spm-network-message></spm-network-message>
(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('spmNotification', spmNotification);

  spmNotification.$inject = [
    '$state',
    '$firebaseArray',
    'BackendVariables',
    'userAuthService',
    '$translate'
  ];

  function spmNotification( $state, $firebaseArray, BackendVariables, userAuthService, $translate ) {
    
    var path = BackendVariables.f_url;
    var userAuth = userAuthService.getUserAuth();

    var directive = {
      restrict: 'E',
      replace: true,
      scope:{
        model: '=',
      },
      controller: controller,
      link: link,
      templateUrl: 'app/widgets/spm-notification.html'
    };
    return directive;
    
    function controller($scope) {
      
      activate();
      
      function activate() {
        if($scope.model.typeNotification){
          $scope.title =  $translate.instant("NOTIFICATIONS." + $scope.model.typeNotification + "_title");
          $scope.text =  $translate.instant("NOTIFICATIONS." + $scope.model.typeNotification + "_text").replace('TEXT', $scope.model.text || '');
        }
      }
    }

    function link( $scope ) {
      
      $scope.read = read;
      
      var events = {
        'newSponsorship': goDetailOrganizerSponsorhip,
        'acceptSponsorship': goDetailSponsorSponsorhip,
        'rejectSponsorship': goFollowing,
        'newTaskOrganizer': goDetailSponsorshipSponsor,
        'updateTaskOrganizer': goDetailSponsorshipSponsor,
        'doneTaskOrganizer': goDetailSponsorshipSponsor,
        'newTaskSponsor': goDetailSponsorshipOrganizer,
        'updateTaskSponsor': goDetailSponsorshipOrganizer,
        'doneTaskSponsor': goDetailSponsorshipOrganizer,
        'newEvent': goDetailEvent,
        'updateEvent': goDetailEvent
      }
      
      function read(){
        var url = path + 'notifications/' + userAuth.id + '/' + $scope.model.$id;
        var reference = new Firebase(url);
        reference.update({
          read: true
        }).then(function(){
          if($scope.model.typeNotification){
            events[$scope.model.typeNotification]($scope.model.modelId || null);
          }
        });
      }
      
      function goDetailOrganizerSponsorhip( id ) {
        $state.go('organizer.sponsorship', {
          id: id
        });
      }
      
      function goDetailSponsorSponsorhip( id ) {
        $state.go('sponzor.sponsorship', {
          id: id
        });
      }
      
      function goSponzoring() {
        $state.go('sponzor.sponzoring');
      }
      
      function goFollowing() {
        $state.go('sponzor.following');
      }
      
      function goDetailSponsorshipSponsor( id ){
         $state.go('sponzor.sponsorship',{
           id: id
         });
      }
      
      function goDetailSponsorshipOrganizer( id ){
         $state.go('organizer.sponsorship',{
           id: id
         });
      }
      
      function goDetailEvent( id ) {
        $state.go('sponzor.event',{
           idEvent: id
         });
      }
      

    }
  }
})();
(function() {
  'use strict';

  angular
    .module('app.filters')
    .filter('humanize', humanizeFilter);

  humanizeFilter.$inject = [];
  
  function humanizeFilter() {
    return function( time ){
      console.log(time);
      console.log(new Date(time));
     return moment.duration(new Date(time),'years').humanize(true); 
    }
  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.dashboard-organizer')
    .controller('HomeOrganizerController', HomeOrganizerController);

  HomeOrganizerController.$inject = [
    '$localStorage',
    '$rootScope',
    'userAuthService',
    'notificationService'
  ];

  function HomeOrganizerController( $localStorage, $rootScope, userAuthService, notificationService ) {

    var vm = this;
    //Atributes
    vm.count_events = 0;
    vm.count_sponsors = 0;
    vm.count_comunity = 0;
    vm.userAuth = userAuthService.getUserAuth();
    vm.notifications = [];

    activate();
    ////////////

    function activate(){
      $rootScope.$on('HomeOrganizerController:count_sponsors', renderCountSponsors);
      $rootScope.$on('HomeOrganizerController:count_events', renderCountEvents);
      
      vm.count_events = vm.userAuth.events.filter( filterDate ).length;
      vm.count_comunity = parseInt( vm.userAuth.comunity_size ) || 0;
      vm.count_sponsors = vm.userAuth.sponzorships_like_organizer.length;
      vm.notifications = notificationService.getNotifications( vm.userAuth.id );
      
    };
    
    function renderCountSponsors() {
      vm.userAuth = userAuthService.getUserAuth();
      vm.count_sponsors = vm.userAuth.sponzorships_like_organizer.length;
    }
    
    function renderCountEvents(){
      vm.userAuth = userAuthService.getUserAuth();
      vm.count_events = vm.userAuth.events.filter( filterDate ).length;
    }
    
    function filterDate( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.ends).isAfter( today );
    }

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.dashboard-organizer')
    .controller('IntroOrganizerCtrl', IntroOrganizerCtrl);

  IntroOrganizerCtrl.$inject = [
    '$state',
    '$ionicSlideBoxDelegate',
    '$ionicHistory',
    '$ionicSideMenuDelegate'
  ];

  function IntroOrganizerCtrl( $state, $ionicSlideBoxDelegate, $ionicHistory, $ionicSideMenuDelegate) {

    var vm = this;
    vm.slideIndex = 0;
    vm.startApp = startApp;
    vm.nextSlide = nextSlide;
    vm.previousSlide = previousSlide;
    vm.slideChanged = slideChanged;

    activate();

    ////////////
    function activate(){
      $ionicSideMenuDelegate.canDragContent(false);
    }

    function startApp(){
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go("organizer.home");
    }

    function nextSlide() {
      $ionicSlideBoxDelegate.next();
    }

    function previousSlide() {
      $ionicSlideBoxDelegate.previous();
    }

    function slideChanged( index ) {
      vm.slideIndex = index;
    };

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.dashboard-organizer')
    .controller('MenuOrganizerCtrl', MenuOrganizerCtrl);

  MenuOrganizerCtrl.$inject = [
    '$state',
    '$localStorage',
    '$rootScope',
    '$ionicHistory',
    'userAuthService',
    'notificationService'
  ];

  function MenuOrganizerCtrl( $state, $localStorage, $rootScope, $ionicHistory, userAuthService, notificationService ) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.count_events = 0;
    vm.count_sponsors = 0;
    vm.count_tasks = 0;
    vm.notifications = []; 
    //Funcions
    vm.logout = logout;

    activate();
    ////////////

    function logout(){
      $localStorage.$reset();
      $ionicHistory.clearCache().then(function() {
        $state.go('signin');
      });
    }

    function activate(){
      
      $rootScope.$on('MenuOrganizer:count_events', renderCountEvents);
      $rootScope.$on('MenuOrganizer:count_sponsors', renderCountSponsors);
      $rootScope.$on('MenuOrganizer:count_tasks', renderCountTasks);
      
      vm.count_events = vm.userAuth.events.filter( filterDate ).length;
      vm.count_sponsors = vm.userAuth.sponzorships_like_organizer.length;
      vm.count_tasks = countTasks().length;
      
      vm.notifications = notificationService.getNotifications( vm.userAuth.id );
      
    }

    function renderCountEvents( event ){
      vm.userAuth = userAuthService.getUserAuth();
      vm.count_events = vm.userAuth.events.filter( filterDate ).length;
    }

    function renderCountSponsors(){
      vm.userAuth = userAuthService.getUserAuth();
      vm.count_sponsors = vm.userAuth.sponzorships_like_organizer.length;
    }

    function renderCountTasks(event ){
      vm.userAuth = userAuthService.getUserAuth();
      vm.count_tasks = countTasks().length;
    }

    function filterDate( item ){
      return moment(item.ends).isAfter(new Date());
    }
    
    function countTasks() {
      return vm.userAuth.events
        .reduce( mergePerks, [] )
        .reduce( mergeTasks, [] )
        .filter( filterByUserAndNotDone );
      
      function mergePerks(a,b){
        return a.concat(b.perks || []);
      }
      
      function mergeTasks(a,b){
        return a.concat(b.tasks || []);
      }
      
      function filterByUserAndNotDone( item ) {
        return item.user_id == vm.userAuth.id && item.status != '1';
      }
    }
    

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.dashboard-sponzor')
    .controller('HomeSponzorController', HomeSponzorController);

  HomeSponzorController.$inject = [
    '$localStorage',
    'userService',
    'utilsService',
    '$scope',
    '$rootScope',
    'userAuthService'
  ];

  function HomeSponzorController(  $localStorage, userService, utilsService, $scope, $rootScope, userAuthService) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.events = [];
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();
    ////////////

    function activate(){
      vm.events = vm.userAuth.events.filter( filterDate );
      $rootScope.$on('HomeSponzorController:getEvents', getEvents);
    }
    
    function getEvents(event) {
      vm.userAuth = userAuthService.getUserAuth();
      vm.events = vm.userAuth.events.filter( filterDate );
    }

    function doRefresh(){
      userService.home( vm.userAuth.id  )
        .then( complete );
        //.catch(failed );

        function complete( user ){
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.events = vm.userAuth.events.filter( filterDate );
          $scope.$broadcast('scroll.refreshComplete');
        }

        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function filterDate( item ){
      return moment(item.starts).isAfter( new Date() );
    }
    
    

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.dashboard-sponzor')
    .controller('IntroSponzorCtrl', IntroSponzorCtrl);

  IntroSponzorCtrl.$inject = [
    '$state',
    '$ionicSlideBoxDelegate',
    '$ionicHistory',
    '$ionicSideMenuDelegate'
  ];

  function IntroSponzorCtrl( $state, $ionicSlideBoxDelegate, $ionicHistory, $ionicSideMenuDelegate) {

    var vm = this;
    vm.slideIndex = 0;
    vm.startApp = startApp;
    vm.nextSlide = nextSlide;
    vm.previousSlide = previousSlide;
    vm.slideChanged = slideChanged;

    activate();

    ////////////
    function activate(){
      $ionicSideMenuDelegate.canDragContent(false);
    }

    function startApp(){
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go("sponzor.home");
    }

    function nextSlide() {
      $ionicSlideBoxDelegate.next();
    }

    function previousSlide() {
      $ionicSlideBoxDelegate.previous();
    }

    function slideChanged( index ) {
      vm.slideIndex = index;
    };

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.dashboard-sponzor')
    .controller('MenuSponzorCtrl', MenuSponzorCtrl);

  MenuSponzorCtrl.$inject = [
    '$state',
    '$localStorage',
    '$rootScope',
    '$ionicHistory',
    'userAuthService',
    'notificationService'
  ];

  function MenuSponzorCtrl( $state, $localStorage, $rootScope, $ionicHistory, userAuthService, notificationService ) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.count_following = 0;
    vm.count_sponsoring = 0;
    //Funcions
    vm.logout = logout;
    
    activate();
    ////////////

    function activate(){
      $rootScope.$on('MenuSponzor:counts', renderCounts);
      
      vm.count_sponsoring = vm.userAuth.sponzorships.filter( filterByAccepted ).length;
      vm.count_following = vm.userAuth.sponzorships.length - vm.count_sponsoring;
      
      vm.notifications = notificationService.getNotifications( vm.userAuth.id );
    }

    function renderCounts(){
      vm.userAuth =  userAuthService.getUserAuth();
      vm.count_sponsoring = vm.userAuth.sponzorships.filter( filterByAccepted ).length;
      vm.count_following = vm.userAuth.sponzorships.length - vm.count_sponsoring;
    }

    function logout(){
      $localStorage.$reset();
      $state.go('signin');
      $ionicHistory.clearCache();
    }

    function filterByAccepted( item ){
      return item.status == '1';
    }


  }
})();
/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-sponzor')
    .controller('EventDetailSponzorController', EventDetailSponzorController);

  EventDetailSponzorController.$inject = [
    '$scope',
    'eventService',
    'utilsService',
    '$stateParams',
    'sponsorshipService',
    '$localStorage',
    '$ionicModal',
    '$ionicHistory',
    '$cordovaToast',
    '$translate',
    'notificationService',
    '$rootScope',
    'userAuthService'
  ];

  function EventDetailSponzorController( $scope, eventService, utilsService, $stateParams, sponsorshipService, $localStorage, $ionicModal, $ionicHistory, $cordovaToast, $translate, notificationService, $rootScope, userAuthService) {

    var vm = this;
    vm.event = {};
    vm.userAuth = userAuthService.getUserAuth();

    vm.modalSponsorIt = null;
    vm.newSponsorIt = {};
    vm.openModalSponsorIt = openModalSponsorIt;
    vm.closeModalSponsorIt = closeModalSponsorIt;
    vm.createSponsorIt = createSponsorIt;
    vm.submitSponsorIt = submitSponsorIt;

    activate();

    ////////////

    function activate(){
      vm.event = _.findWhere(vm.userAuth.events, {id: $stateParams.idEvent});
      vm.event.perks =  vm.event.perks.map( preparatePerks );

      $ionicModal.fromTemplateUrl('app/events-sponsor/sponsor-it-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalSponsorIt = modal;
      });
    }
    
    function preparatePerks( perk ){
      perk.sponzorship = _.where(vm.userAuth.sponzorships, {perk_id: perk.id});
      perk.already = _.findWhere(perk.sponzorship , {sponzor_id: vm.userAuth.id});
      perk.tasks = _.where(perk.tasks, {type: "0"});
      return perk;
    }

    function filterByTypePerk( task ){
      return task.type == '0'; //Organizer
    }
    
    function openModalSponsorIt(){
      vm.modalSponsorIt.show();
    }

    function closeModalSponsorIt(){
      vm.modalSponsorIt.hide();
      vm.newSponsorIt = {};
    } 

    function createSponsorIt( perk ){
      vm.newSponsorIt.perk = perk;
      vm.openModalSponsorIt();
    } 

    function submitSponsorIt(){
      sponsorshipService.createSponzorship( preparateDataSponzorship() )
        .then( complete )
        .catch( failed );

        function complete( newSponsorship ){
          vm.closeModalSponsorIt();
          
          vm.userAuth.sponzorships.push( newSponsorship );
          vm.event.perks = vm.event.perks.map( preparatePerks );
          userAuthService.updateUserAuth( vm.userAuth );
          
          $rootScope.$broadcast('MenuSponzor:counts');
          $rootScope.$broadcast('FollowEventsController:getSponzorships');
          
          var notification = {
            text: vm.event.title,
            link: '#/organizers/sponzors',
            modelId: newSponsorship.id,
          };
          notificationService.sendNewSponsorship(notification, vm.event.user_organizer.id);
          
          $cordovaToast.showShortBottom($translate.instant("MESSAGES.succ_sponsor_it"));
        }

        function failed( error ){
          vm.closeModalSponsorIt();
        }
    }

    function preparateDataSponzorship(){
      return {
        sponzor_id: vm.userAuth.id,
        perk_id: vm.newSponsorIt.perk.id,
        event_id: vm.event.id,
        organizer_id: vm.event.user_organizer.id,
        status: 0,
        cause: vm.newSponsorIt.cause
      }
    }
    

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-sponzor')
    .controller('FollowEventsController', FollowEventsController);

  FollowEventsController.$inject = [
    '$localStorage',
    'utilsService',
    'userService',
    '$scope',
    '$rootScope',
    'userAuthService'
  ];

  function FollowEventsController( $localStorage, utilsService, userService, $scope, $rootScope, userAuthService) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.sponzorships = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();
    ////////////

    function activate(){
      vm.sponzorships = vm.userAuth.sponzorships.filter( filterByDateAndByPending );
      vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
      $rootScope.$on('FollowEventsController:getSponzorships', getSponzorships);
    }
    
    function getSponzorships() {
      vm.userAuth = $localStorage.userAuth;
      vm.sponzorships = vm.userAuth.sponzorships.filter( filterByDateAndByPending );
      vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.sponzorships = vm.userAuth.sponzorships.filter( filterByDateAndByPending );
          vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
          $rootScope.$broadcast('MenuSponzor:counts');
          $rootScope.$broadcast('SponzoringEventsController:getSponzorships');
        }

        function failed( error ){
          $scope.$broadcast('scroll.refreshComplete');
        }
    }
    
    /*function filterByDateAndByPending( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.ends).isAfter( today ) && item.status != '1';
    }*/
    
    function filterByDateAndByPending( item ){
      return item.status != '1';
    }

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-sponzor')
    .controller('SponzoringEventsController', SponzoringEventsController);

  SponzoringEventsController.$inject = [
    '$localStorage',
    'userService',
    'utilsService',
    '$scope',
    '$rootScope',
    'userAuthService'
  ];

  function SponzoringEventsController( $localStorage, userService, utilsService, $scope, $rootScope, userAuthService) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.events = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();
    ////////////

    function activate(){
      vm.sponzorships = vm.userAuth.sponzorships.filter( filterByAccepted );
      vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
      $rootScope.$on('SponzoringEventsController:getSponzorships', getSponzorships);
    }
    
    function getSponzorships() {
      vm.userAuth = $localStorage.userAuth;
      vm.sponzorships = vm.userAuth.sponzorships.filter( filterByAccepted );
      vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.sponzorships = vm.userAuth.sponzorships.filter( filterByAccepted );
          vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
          $rootScope.$broadcast('MenuSponzor:counts');
          $rootScope.$broadcast('FollowEventsController:getSponzorships');
        }

        function failed( error ){
          $scope.$broadcast('scroll.refreshComplete');
        }
    }

    function filterByAccepted( item ){
      return item.status == '1';
    }
    

  }
})();
/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-sponzor')
    .controller('SponsorshipSponsorDetailController', SponsorshipSponsorDetailController);

  SponsorshipSponsorDetailController.$inject = [
    '$scope',
    'utilsService',
    '$stateParams',
    '$localStorage',
    '$ionicModal',
    '$ionicHistory',
    '$cordovaToast',
    '$translate',
    'tasksSponsorService',
    'userAuthService',
    'notificationService'
  ];

  function SponsorshipSponsorDetailController( $scope, utilsService, $stateParams, $localStorage, $ionicModal, $ionicHistory, $cordovaToast, $translate, tasksSponsorService, userAuthService, notificationService) {

    var vm = this;
    vm.sponzorship = {};
    vm.userAuth = userAuthService.getUserAuth();
    
    vm.modalTask = null;
    vm.isNewTask = true;
    vm.showModalTask = showModalTask;
    vm.sponsorTask = {};
    vm.hideModalTask = hideModalTask;
    vm.newTask = newTask;
    vm.editTask = editTask;
    vm.submitTask = submitTask;
    vm.deleteTask = deleteTask;
    
    vm.indexSlide = 0;
    vm.slideChange = slideChange;

    activate();
    ////////////

    function activate(){
      vm.sponsorTask = { task: {} }
      vm.sponzorship = _.findWhere(vm.userAuth.sponzorships, {id: $stateParams.id});
      vm.sponzorship.task_sponzor = vm.sponzorship.task_sponzor.filter( filterTaskSponsor );

      $ionicModal.fromTemplateUrl('app/events-sponsor/task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalTask = modal;
      });
    }
    
    function filterTaskSponsor( item ) {
      return item.task.user_id == vm.userAuth.id;
    }
    
    function slideChange( index ) {
      vm.indexSlide = index;
    }
    
    function showModalTask(){
      vm.modalTask.show();
    }

    function newTask(){
      vm.isNewTask = true;
      vm.showModalTask();
    }

    function hideModalTask( form ){
      vm.modalTask.hide();
      if (form) utilsService.resetForm( form );
      vm.sponsorTask = { task: {} }
    }

    function editTask( task ){
      vm.isNewTask = false;
      vm.sponsorTask = angular.copy(task);
      vm.sponsorTask.status = vm.sponsorTask.status == 1 ? true:false;
      vm.showModalTask();
    }

    function createTask( form ){
      utilsService.showLoad();
      tasksSponsorService.createTask( preparateTask() )
      .then( complete )
      .catch( failed );
      
      function complete( TaskSponzor ) {
        vm.sponzorship.perk.tasks.push( TaskSponzor.task );
        vm.sponzorship.task_sponzor.push( TaskSponzor );
        vm.hideModalTask( form );
        
        notificationService.sendNewTaskSponsor({
          text: TaskSponzor.task.title,
          modelId: vm.sponzorship.id
        }, TaskSponzor.organizer_id);
        
        utilsService.hideLoad();
      }
      
      function failed() {
        utilsService.hideLoad();
      }
    }
    
    function preparateTask( task ){
      return {
        type: 1, //Because is created by the Sponzor
        status: vm.sponsorTask.status ? 1 : 0,
        perk_id: vm.sponzorship.perk.id,
        event_id: vm.sponzorship.event.id,
        sponzorship_id: vm.sponzorship.id,
        user_id: vm.userAuth.id,
        organizer_id: vm.sponzorship.organizer.id,
        sponzor_id: vm.userAuth.id,
        title: vm.sponsorTask.task.title,
        description: vm.sponsorTask.task.description,
        task_id: vm.sponsorTask.task.id
      }
    }

    function deleteTask( form ){
      utilsService.showLoad();
      tasksSponsorService.deleteTask( vm.sponsorTask.id )
      .then( complete )
      .catch( failed );
      
      function complete( data ) {
        var perkTask = _.findWhere( vm.sponzorship.perk.tasks, {id: vm.sponsorTask.task.id} );
        var taskSponzor = _.findWhere( vm.sponzorship.task_sponzor, {id: vm.sponsorTask.id} );
        var indexPerkTask = _.indexOf(vm.sponzorship.perk.tasks, perkTask);
        var indexSponzorTask = _.indexOf(vm.sponzorship.task_sponzor, taskSponzor);
        vm.sponzorship.perk.tasks.splice(indexPerkTask, 1);
        vm.sponzorship.task_sponzor.splice(indexSponzorTask, 1);
        vm.hideModalTask( form );
        utilsService.hideLoad();
      }
      
      function failed() {
        vm.hideModalTask( form );
        utilsService.hideLoad();
      }
    }

    function updateTask( form ){
      utilsService.showLoad();
      var task = preparateTask();
      task.id = vm.sponsorTask.id;
      tasksSponsorService.editPutTask( task.id, task )
      .then( complete )
      .catch( failed );
      
      function complete( TaskSponsor ) {
        var perkTask = _.findWhere( vm.sponzorship.perk.tasks, {id: vm.sponsorTask.task.id} );
        var taskSponzor = _.findWhere( vm.sponzorship.task_sponzor, {id: vm.sponsorTask.id} );
        var indexPerkTask = _.indexOf(vm.sponzorship.perk.tasks, perkTask);
        var indexSponzorTask = _.indexOf(vm.sponzorship.task_sponzor, taskSponzor);
       
       
        if(vm.sponsorTask.status == 1 && TaskSponsor.status == "1"){
          notificationService.sendDoneTaskSponsor({
            text: vm.sponsorTask.task.title,
            modelId: vm.sponzorship.id
          }, TaskSponsor.organizer_id);
        }else{
          notificationService.sendUpdateTaskSponsor({
            text: vm.sponsorTask.task.title,
            modelId: vm.sponzorship.id
          }, TaskSponsor.organizer_id);
        }
        vm.sponzorship.perk.tasks[indexPerkTask] = vm.sponsorTask.task;
        vm.sponzorship.task_sponzor[indexSponzorTask] = vm.sponsorTask;
        vm.hideModalTask( form );
        utilsService.hideLoad();
      }
      
      function failed() {
        vm.hideModalTask( form );
        utilsService.hideLoad();
      }
    }

    function submitTask( form ){
      if(vm.isNewTask){
        createTask( form );
      }else{
        updateTask( form );
      }
    }
    

  }
})();
/**
* @Controller for Add Events
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-organizer')
    .controller('AddEventController', AddEventController);

  AddEventController.$inject = [
    '$scope',
    '$translate',
    '$localStorage',
    'utilsService',
    '$cordovaDatePicker',
    '$cordovaCamera',
    'eventTypeService',
    'eventService',
    '$ionicModal',
    '$cordovaToast',
    '$ionicHistory',
    'imgurService',
    '$q',
    '$state',
    'notificationService',
    'userAuthService',
    'userService',
    '$rootScope',
  ];

  function AddEventController( $scope, $translate, $localStorage, utilsService, $cordovaDatePicker, $cordovaCamera, eventTypeService, eventService, $ionicModal, $cordovaToast, $ionicHistory, imgurService, $q, $state, notificationService, userAuthService, userService, $rootScope) {

    var vm = this;
    vm.newEvent = {};
    vm.newPerk = {};
    vm.isNewPerk = true;
    vm.eventTypes = [];
    vm.userAuth = userAuthService.getUserAuth();
    vm.modalPerk = null;
    vm.imageURI = null;

    vm.clickedStartDate = clickedStartDate;
    vm.clickedEndDate = clickedEndDate;
    vm.clickedStartTime = clickedStartTime;
    vm.clickedEndTime = clickedEndTime;
    vm.getPhoto = getPhoto;
    vm.createEvent = createEvent;
    vm.openModalPerk = openModalPerk;
    vm.closeModalPerk = closeModalPerk;
    vm.createPerk = createPerk;
    vm.editPerk = editPerk;
    vm.deletePerk = deletePerk;
    vm.submitPerk = submitPerk;

    activate();

    ////////////

    function activate(){
      vm.newEvent.access = true;
      vm.newEvent.perks = [];
      vm.newEvent.starttime = "13:00:00";
      vm.newEvent.start = moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD');
      vm.newEvent.endtime = "15:00:00";
      vm.newEvent.end = moment(new Date().getTime()).add(4, 'days').format('YYYY-MM-DD');

      $ionicModal.fromTemplateUrl('app/events-organizer/perk-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalPerk = modal;
      });
      
      $rootScope.hideTabs = '';
      
      getEventsTypes();
    }

    /*-------------- DatePickers   --------------*/

    function showDatePicker( options ) {
      return $cordovaDatePicker.show( options );
    }

    function clickedStartDate(){
      var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
      showDatePicker({
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: minDate,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );

      function complete( date ){
        vm.newEvent.start = moment(date).format('YYYY-MM-DD');
      }
    }

    function clickedEndDate(){
      var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
      showDatePicker({
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: minDate,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );
      
      function complete( date ){
        vm.newEvent.end = moment(date).format('YYYY-MM-DD');
      }
    };

    function clickedStartTime(){
      var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
      showDatePicker({
        date: new Date(),
        mode: 'time', // or 'time'
        minDate: minDate,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );
      
      function complete( date ){
        vm.newEvent.starttime = moment(date).format('HH:mm:ss');
      }
    }

    function clickedEndTime(){
      var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
      showDatePicker({
        date: new Date(),
        mode: 'time', // or 'time'
        minDate: minDate,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );
      
      function complete( date ){
        vm.newEvent.endtime = moment(date).format('HH:mm:ss');
      }
    }

    /*-------------- Image --------------*/

    function getPhoto(){

      var options = {
        quality: 100,
        destinationType:  Camera.DestinationType.DATA_URL,
        sourceType:  Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
      };

      $cordovaCamera.getPicture( options )
        .then( complete );
        //.catch( failed );

      function complete( imageURI ){
        vm.imageURI = imageURI;
        vm.newEvent.image = "data:image/jpeg;base64," + imageURI;
      }

      /*
      function failed( error ){
        console.log( error );
      }*/
    }

    /*-------------- Create Event --------------*/

    function createEvent( form ){
      utilsService.showLoad();
      
      if(vm.imageURI){
        imgurService.uploadImage( vm.imageURI )
          .then( updateImage )
          .then( complete )
          .catch( failed );
      }else{
        eventService.createEvent( preparateData() )
          .then( complete )
          .catch( failed );
      }

        function updateImage( image ){
          vm.newEvent.image = image;
          return eventService.createEvent( preparateData() );
        }

        function complete( event ) {
          utilsService.hideLoad();
          utilsService.resetForm( form );
          vm.newEvent = {};
          event.image = (event.image == "event_dummy.png") ? 'img/banner.jpg' : event.image;
          event.starts = moment(event.starts)._d;
          event.ends = moment(event.ends)._d;
          vm.userAuth.events.push( event );
          userAuthService.updateUserAuth( vm.userAuth );
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $ionicHistory.clearCache().then(function() {
            notificationService.sendNewEvent();
            $rootScope.$broadcast('MenuOrganizer:count_events');
            $rootScope.$broadcast('EventsTabsController:count_events');
            $rootScope.$broadcast('HomeOrganizerController:count_events');
            $state.go("organizer.events.list");
          });
          $cordovaToast.showShortBottom($translate.instant("MESSAGES.succ_event_mess"));
        }

        function failed( error ) {
          utilsService.hideLoad();
          utilsService.alert({
            title: $translate.instant("ERRORS.addeventsform_error_tit"),
            template: $translate.instant("ERRORS.addeventsform_error_mess"),
          });
        }

    }

    function getEventsTypes(){
      eventTypeService.allEventTypes()
        .then( complete );
        //.catch( failed );

        function complete( eventTypes ){
          vm.eventTypes = eventTypes;
          if(vm.eventTypes.length > 0) vm.newEvent.type = vm.eventTypes[0];
        }

        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function preparateData() {

      function joinDate(date, time) {
        date = moment(date,"YYYY-MM-DD").format("YYYY-MM-DD");
        time = moment(date + " " + time).format("HH:mm:ss");
        return date + " " + time;
      }

      return {
        title: vm.newEvent.title,
        location: vm.newEvent.location.formatted_address,
        location_reference: vm.newEvent.location.place_id,
        description: vm.newEvent.description,
        starts: joinDate(vm.newEvent.start, vm.newEvent.starttime),
        ends: joinDate(vm.newEvent.end, vm.newEvent.endtime),
        image: vm.newEvent.image ? vm.newEvent.image : "http://i.imgur.com/t8YehGM.jpg",
        privacy: vm.newEvent.access ? 0 : 1,
        lang: $translate.use(),
        organizer: vm.userAuth.id,
        category: 1,
        type: vm.newEvent.type.id,
        perks: vm.newEvent.perks
      }
    }

    /*-------------- Perks --------------*/

    

    function openModalPerk(){
      vm.modalPerk.show();
    }

    function closeModalPerk( form ){
      vm.modalPerk.hide();
      if (form) utilsService.resetForm( form );
      vm.newPerk = {};
    } 

    function createPerk(){
      vm.isNewPerk = true;
      vm.openModalPerk();
    }

    function editPerk( data ){
      vm.isNewPerk = false;
      vm.newPerk = data;
      vm.openModalPerk();
    }

    function addPerk(){
      vm.newEvent.perks.push({
        kind: vm.newPerk.kind,
        usd: vm.newPerk.usd,
        total_quantity: vm.newPerk.total_quantity,
        reserved_quantity: 0
      });
      vm.closeModalPerk();
    }

    function deletePerk(){
      var index = vm.newEvent.perks.indexOf( vm.newPerk );
      vm.newEvent.perks.splice(index, 1);
      vm.closeModalPerk();
    }

    function updatePerk(){
      vm.closeModalPerk();
    }

    function submitPerk( form ){
      if(vm.isNewPerk){
        addPerk();
        utilsService.resetForm( form );
      }else{
        updatePerk();
        utilsService.resetForm( form );
      }
    }

    

  }
})();
/**
* @Controller for Add Events
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-organizer')
    .controller('EditEventController', EditEventController);

  EditEventController.$inject = [
    '$scope',
    '$translate',
    '$localStorage',
    'userService',
    'utilsService',
    '$cordovaDatePicker',
    '$cordovaCamera',
    'eventTypeService',
    'eventService',
    '$ionicModal',
    '$cordovaToast',
    '$ionicHistory',
    'imgurService',
    '$q',
    '$stateParams',
    'userAuthService',
    'notificationService',
    '$rootScope'
  ];

  function EditEventController( $scope, $translate, $localStorage, userService , utilsService, $cordovaDatePicker, $cordovaCamera, eventTypeService, eventService, $ionicModal, $cordovaToast, $ionicHistory, imgurService, $q, $stateParams, userAuthService, notificationService, $rootScope) {

    var vm = this;
    vm.indexEvent = -1;
    vm.newEvent = {};
    vm.newPerk = {};
    vm.isNewPerk = true;
    vm.eventTypes = [];
    vm.userAuth = userAuthService.getUserAuth();
    vm.modalPerk = null;
    vm.imageURI = null;

    vm.clickedStartDate = clickedStartDate;
    vm.clickedEndDate = clickedEndDate;
    vm.clickedStartTime = clickedStartTime;
    vm.clickedEndTime = clickedEndTime;
    vm.getPhoto = getPhoto;
    vm.updateEvent = updateEvent;
    vm.openModalPerk = openModalPerk;
    vm.closeModalPerk = closeModalPerk;
    vm.createPerk = createPerk;
    vm.editPerk = editPerk;
    vm.submitPerk = submitPerk;

    activate();

    ////////////

    function activate(){

      /*vm.newEvent.starttime = "00:00:00";
      vm.newEvent.start = "2015-12-15";
      vm.newEvent.endtime = "00:00:00";
      vm.newEvent.end = "2015-12-24";*/

      $ionicModal.fromTemplateUrl('app/events-organizer/perk-edit-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalPerk = modal;
      });
      vm.newEvent = _.findWhere(vm.userAuth.events, {id: $stateParams.id});
      vm.indexEvent = _.indexOf(vm.userAuth.events, vm.newEvent);
      vm.newEvent.start = moment(vm.newEvent.starts).format('YYYY-MM-DD');
      vm.newEvent.starttime = moment(vm.newEvent.starts).format('HH:mm:ss');
      vm.newEvent.end = moment(vm.newEvent.ends).format('YYYY-MM-DD');
      vm.newEvent.endtime = moment(vm.newEvent.ends).format('HH:mm:ss');
      vm.newEvent.access = vm.newEvent.privacy == '1' ? true : false;
      
      $rootScope.hideTabs = '';
      getEventsTypes();
    }
    
    /*-------------- DatePickers   --------------*/

    function showDatePicker( options ) {
      return $cordovaDatePicker.show( options );
    }

    function clickedStartDate(){
      var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
      
      showDatePicker({
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: minDate,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );

      function complete( date ){
        vm.newEvent.start = moment(date).format('YYYY-MM-DD');
      }
    }

    function clickedEndDate(){
      var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();

      showDatePicker({
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: minDate,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );
      
      function complete( date ){
        vm.newEvent.end = moment(date).format('YYYY-MM-DD');
      }
    };

    function clickedStartTime(){
      var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();

      showDatePicker({
        date: new Date(),
        mode: 'time', // or 'time'
        minDate: minDate,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );
      
      function complete( date ){
        vm.newEvent.starttime = moment(date).format('HH:mm:ss');
      }
    }

    function clickedEndTime(){
      var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();

      showDatePicker({
        date: new Date(),
        mode: 'time', // or 'time'
        minDate: minDate,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      })
      .then( complete );
      
      function complete( date ){
        vm.newEvent.endtime = moment(date).format('HH:mm:ss');
      }
    }

    /*-------------- Image --------------*/

    function getPhoto(){

      var options = {
        quality: 100,
        destinationType:  Camera.DestinationType.DATA_URL,
        sourceType:  Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
      };

      $cordovaCamera.getPicture( options )
        .then( complete )
        //.catch( failed );

      function complete( imageURI ){
        vm.imageURI = imageURI;
        vm.newEvent.image = "data:image/jpeg;base64," + imageURI;
      }

      /*
      function failed( error ){
        console.log( error );
      }*/
    }

    /*-------------- Create Event --------------*/

    function updateEvent( form ){
      utilsService.showLoad();
      
      if(vm.imageURI){
        imgurService.uploadImage( vm.imageURI )
          .then( updateImage )
          .then( complete )
          .catch( failed );
      }else{
        eventService.editEventPut( vm.newEvent.id, preparateData() )
          .then( complete )
          .catch( failed );
      }

        function updateImage( image ){
          vm.newEvent.image = image;
          return eventService.editEventPut( vm.newEvent.id, preparateData() );
        }

        function complete( event ) {
          utilsService.hideLoad();
          utilsService.resetForm( form );
          event = preparateEvent( event );
          function preparateEvent( item ){
            item.image = (item.image == "event_dummy.png") ? 'img/banner.jpg' : item.image;
            item.starts = moment(item.starts)._d;
            item.ends = moment(item.ends)._d;
            return item;
          }
          vm.userAuth.events[vm.indexEvent] = event;
          userAuthService.updateUserAuth( vm.userAuth );
          vm.newEvent = {};
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $ionicHistory.clearCache().then(function(){
            notificationService.sendNewEvent();
            $rootScope.$broadcast('MenuOrganizer:count_events');
            $rootScope.$broadcast('EventsTabsController:count_events');
            $rootScope.$broadcast('HomeOrganizerController:count_events');
            $ionicHistory.goBack();
          });
          
          $cordovaToast.showShortBottom($translate.instant("MESSAGES.succ_event_mess"));
        }

        function failed( error ) {
          utilsService.hideLoad();
          utilsService.alert({
            title: $translate.instant("ERRORS.addeventsform_error_tit"),
            template: $translate.instant("ERRORS.addeventsform_error_mess"),
          });
        }

    }

    function getEventsTypes(){
      eventTypeService.allEventTypes()
        .then( complete );
        //.catch( failed );

        function complete( eventTypes ){
          vm.eventTypes = eventTypes;
          var idType = vm.newEvent.type.id ?  vm.newEvent.type.id : vm.newEvent.type;
          for (var i = 0; i < vm.eventTypes.length; i++) {
            if(vm.eventTypes[i].id == idType){
              vm.newEvent.type = vm.eventTypes[i];
              break;
            }
          };
        }

        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function preparateData() {

      function joinDate(date, time) {
        date = moment(date,"YYYY-MM-DD").format("YYYY-MM-DD");
        time = moment(date + " " + time).format("HH:mm:ss");
        return date + " " + time;
      }

      return {
        title: vm.newEvent.title,
        location: vm.newEvent.location,
        location_reference: "referencia",
        description: vm.newEvent.description,
        starts: joinDate(vm.newEvent.start, vm.newEvent.starttime),
        ends: joinDate(vm.newEvent.end, vm.newEvent.endtime),
        image: vm.newEvent.image ? vm.newEvent.image : "http://i.imgur.com/t8YehGM.jpg",
        privacy: vm.newEvent.access ? 0 : 1,
        lang: $translate.use(),
        organizer: vm.userAuth.id,
        category: 1,
        type: vm.newEvent.type.id,
        perks: vm.newEvent.perks
      }
    }

    /*-------------- Perks --------------*/

    

    function openModalPerk(){
      vm.modalPerk.show();
    }

    function closeModalPerk( form ){
      vm.modalPerk.hide();
      if (form) utilsService.resetForm( form );
      vm.newPerk = {};
    } 

    function createPerk(){
      vm.isNewPerk = true;
      vm.openModalPerk();
    }

    function editPerk( data ){
      vm.isNewPerk = false;
      vm.newPerk = data;
      vm.newPerk.total_quantity = parseInt( vm.newPerk.total_quantity );
      vm.newPerk.usd = parseInt( vm.newPerk.usd );
      vm.openModalPerk();
    }

    function addPerk(){
      vm.newEvent.perks.push({
        id: vm.newPerk.id ? vm.newPerk.id : -1,
        kind: vm.newPerk.kind,
        usd: vm.newPerk.usd,
        total_quantity: vm.newPerk.total_quantity,
        reserved_quantity: 0
      });
      vm.closeModalPerk();
    }

    function updatePerk(){
      vm.closeModalPerk();
    }

    function submitPerk( form ){
      if(vm.isNewPerk){
        addPerk();
        utilsService.resetForm( form );
      }else{
        updatePerk();
        utilsService.resetForm( form );
      }
    }

    

  }
})();
/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-organizer')
    .controller('EventDetailOrganizerController', EventDetailOrganizerController);

  EventDetailOrganizerController.$inject = [
    '$scope',
    'eventService',
    'utilsService',
    '$stateParams',
    '$state',
    'sponsorshipService',
    '$ionicPopup',
    '$ionicModal',
    '$ionicActionSheet',
    '$cordovaSocialSharing',
    '$cordovaCalendar',
    '$ionicSideMenuDelegate',
    '$ionicHistory',
    '$cordovaToast',
    '$translate',
    'BackendVariables',
    'perkTaskService',
    '$localStorage',
    'userAuthService',
    'notificationService',
    '$rootScope'
  ];

  function EventDetailOrganizerController( $scope, eventService , utilsService, $stateParams, $state, sponsorshipService, $ionicPopup, $ionicModal, $ionicActionSheet, $cordovaSocialSharing, $cordovaCalendar, $ionicSideMenuDelegate, $ionicHistory, $cordovaToast, $translate, BackendVariables, perkTaskService, $localStorage, userAuthService, notificationService, $rootScope) {

    var vm = this;
    var popupOptionsSponsorship = null;
    var hideSheet = null;
    vm.optionsActionSheet = [];
    var url = BackendVariables.url_web;
    //Attributes
    vm.event = {};
    vm.deleteEvent = deleteEvent;
    vm.userAuth = userAuthService.getUserAuth();

    vm.indexPerk = -1;
    vm.indexTask = -1;
    vm.modalTask = null;
    vm.isNewTask = true;
    vm.task = {};
    vm.showModalTask = showModalTask;
    vm.newTask = newTask;
    vm.hideModalTask = hideModalTask;
    vm.editTask = editTask;
    vm.submitTask = submitTask;
    vm.deleteTask = deleteTask;
    
    
    /*----- Options sponsorship  -----*/
    vm.sponsorshipSelected = {};
    vm.openOptionsSponsorship = openOptionsSponsorship;
    vm.closeOptionsSponsorship = closeOptionsSponsorship;
    vm.updateSponsorship = updateSponsorship;
    /*----- Options ActionSheet  -----*/
    vm.showActionSheet = showActionSheet;
    vm.hideActionSheet = hideActionSheet;

    activate();
    ////////////

    function activate(){
      
      vm.event = _.findWhere(vm.userAuth.events, {id: $stateParams.idEvent});
      vm.event.perks = vm.event.perks.map( preparatePerks );
      
      $ionicSideMenuDelegate.canDragContent(false);
      
      vm.optionsActionSheet = [
        editEvent,
        shareEvent,
        addToCalendar
      ];

      $ionicModal.fromTemplateUrl('app/events-organizer/task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalTask = modal;
      });
    }

    function preparatePerks( perk ){
      perk.sponzorship = _.where(vm.userAuth.sponzorships_like_organizer, {perk_id: perk.id});
      perk.tasks = _.where(perk.tasks, {user_id: vm.userAuth.id});
      return perk;
    }

    function filterByTypePerk( task ){
      return task.type == '0'; //Organizer
    }

    function deleteEvent(){
      utilsService.showLoad();
      eventService.deleteEvent( $stateParams.idEvent )
        .then( complete )
        .catch( failed );

        function complete( event ){
          utilsService.hideLoad();
          hideActionSheet();
          $ionicHistory.clearCache();
          $ionicHistory.goBack();
        }

        function failed( error ){
          utilsService.hideLoad();
          hideActionSheet();
          utilsService.alert({
            title: 'Error',
            template: error.message
          });
        }
    }

    /*---------*/

    function openOptionsSponsorship( sponsorship ){
      vm.sponsorshipSelected = sponsorship;
      popupOptionsSponsorship = $ionicPopup.show({
        title: $translate.instant("EVENTDETAIL.options_title"),
        templateUrl: "app/events-organizer/options-sponsorship.html",
        scope: $scope,
      });
    }

    function closeOptionsSponsorship(){
      popupOptionsSponsorship.close();
    }

    function updateSponsorship( status ){
      utilsService.showLoad();
      var sponsorship = angular.copy( vm.sponsorshipSelected );
      sponsorship.status = status;
      sponsorshipService.editSponzorshipPut( sponsorship.id, sponsorship )
        .then( complete )
        .catch( failed );

        function complete( sponsorship ){
          utilsService.hideLoad();
          vm.sponsorshipSelected.status = sponsorship.status; 
          
          var notification = {
            text: vm.event.title,
            link: '#/sponzors/sponzoring',
            modelId: sponsorship.id
          };
          
          if(sponsorship.status == 1){ //Accepted 
            notificationService.sendAcceptSponsorship(notification, sponsorship.sponzor_id);
          }else if(sponsorship.status == 2){//Deny
            notificationService.sendRejectSponsorship(notification, sponsorship.sponzor_id);
          }
          closeOptionsSponsorship();
           
        }

        function failed( error ){
          utilsService.hideLoad();
          closeOptionsSponsorship();
        }

    }

    /**/
    function showActionSheet(){
      hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '<i class="icon ion-edit"></i> ' + $translate.instant("EVENTDETAIL.edit_event") },
          { text: '<i class="icon ion-share"></i> <b> ' + $translate.instant("EVENTDETAIL.share") + ' </br>' },
          { text: '<i class="icon ion-calendar"></i> ' + $translate.instant("EVENTDETAIL.add_calendar") }
        ],
        destructiveText: '<i class="icon ion-trash-a"></i> ' + $translate.instant("EVENTDETAIL.delete_event"),
        titleText: $translate.instant("EVENTDETAIL.options"),
        cancelText: '<i class="icon ion-close"></i> ' + $translate.instant("EVENTDETAIL.cancel"),
        buttonClicked: function(index) {
          vm.optionsActionSheet[index]();
          return true;
        },
        destructiveButtonClicked: deleteEvent
     });
    }

    function hideActionSheet(){
      hideSheet();
    }

    function shareEvent(){
      var message = vm.event.title;
      var subject = vm.event.description;
      var image = vm.event.image;
      var link =  url + '#/event/' + vm.event.id;
      $cordovaSocialSharing
        .share( message, subject, image, link) // Share via native share sheet
        .then( complete );
        //.catch( failed );

        function complete(){
          $cordovaToast.showShortBottom($translate.instant("MESSAGES.succ_add_to_calendar"));
        }
        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function editEvent(){
      $state.go('organizer.editevent', { id: vm.event.id });
    }

    function addToCalendar(){
      $cordovaCalendar
        .createEvent({
          title: vm.event.title,
          location: vm.event.location,
          notes: vm.event.description,
          startDate: vm.event.starts,
          endDate: vm.event.ends
        })
        .then( complete );
        //.catch( failed );

        function complete(){
          $cordovaToast.showShortBottom($translate.instant("MESSAGES.succ_add_to_calendar"));
        }

        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function showModalTask(){
      vm.modalTask.show();
    }

    function newTask( perk, indexPerk ){
      vm.isNewTask = true;
      vm.indexPerk = indexPerk; 
      vm.task.perk_id = perk.id;
      vm.task.event_id = vm.event.id;
      vm.showModalTask();
    }

    function hideModalTask( form ){
      vm.modalTask.hide();
      if (form) utilsService.resetForm( form );
      vm.task = {};
      vm.indexPerk = -1; 
      vm.indexTask = -1;
    }

    function editTask( task, indexPerk, indexTask ){
      vm.isNewTask = false;
      vm.indexPerk = indexPerk; 
      vm.indexTask = indexTask;
      vm.task = angular.copy( task );
      vm.task.status = vm.task.status == 1 ? true : false;
      vm.showModalTask();
    }

    function createTask( form ){
      utilsService.showLoad();
      perkTaskService.createPerkTask( preparateTask() )
        .then( complete )
        .catch( failed );

        function complete( data ){
          vm.event.perks[vm.indexPerk].tasks.push( data.PerkTask );
          vm.userAuth.sponzorships_like_organizer = $localStorage.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
          userAuthService.updateUserAuth( vm.userAuth );
          sendNewTaskNotification( data.PerkTask.title );
          
          $rootScope.$broadcast('MenuOrganizer:count_tasks');
          
          utilsService.resetForm( form );
          vm.hideModalTask();
          utilsService.hideLoad();
        }

        function failed( error ){
          utilsService.resetForm( form );
          vm.hideModalTask();
          utilsService.hideLoad();
        }
    }
    
    function sendNewTaskNotification( text ) {
      for (var index = 0; index < vm.event.perks[vm.indexPerk].sponzorship.length; index++) {
        var sponzorship = vm.event.perks[vm.indexPerk].sponzorship[index];
        notificationService.sendNewTaskOrganizer({
          text: text,
          modelId: sponzorship.id
        }, sponzorship.sponzor_id);
      }
    }
    
    function sendUpdateTaskNotification( text, done ) {
      for (var index = 0; index < vm.event.perks[vm.indexPerk].sponzorship.length; index++) {
        var sponzorship = vm.event.perks[vm.indexPerk].sponzorship[index];
        if(done){
          notificationService.sendDoneTaskOrganizer({
            text: text,
            modelId: sponzorship.id
          }, sponzorship.sponzor_id);
        }else{
          notificationService.sendUpdateTaskOrganizer({
            text: text,
            modelId: sponzorship.id
          }, sponzorship.sponzor_id);
        }
      }
    }

    function preparateTask(){
      return {
        user_id: vm.userAuth.id,
        event_id: vm.task.event_id,
        perk_id: vm.task.perk_id,
        title: vm.task.title,
        description: vm.task.description,
        type: 0,
        status: 0
      }
    }

    function deleteTask( form ){
      utilsService.showLoad();
      perkTaskService.deletePerkTask( vm.task.id )
      .then( complete )
      .catch( failed );

      function complete( data ){
        vm.userAuth.sponzorships_like_organizer = $localStorage.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
        vm.event.perks[vm.indexPerk].tasks.splice(vm.indexTask, 1);
        userAuthService.updateUserAuth( vm.userAuth );
        if( form ) utilsService.resetForm( form );
        vm.hideModalTask();
        utilsService.hideLoad();
        $rootScope.$broadcast('MenuOrganizer:count_tasks');
        $rootScope.$broadcast('TaskTabsController:count_tasks');
      }

      function failed( error ){
        vm.hideModalTask();
        if( form ) utilsService.resetForm( form );
        utilsService.alert({
          template: error.message
        });
        utilsService.hideLoad();
      }
    }

    function updateTask( form ){
      utilsService.showLoad();
      vm.task.status = vm.task.status ? 1 : 0;
      perkTaskService.editPerkTaskPatch( vm.task.id, vm.task )
      .then( complete )
      .catch( failed );

      function complete( task ){
        sendUpdateTaskNotification( task.title, vm.event.perks[vm.indexPerk].tasks[vm.indexTask].status == 0 && task.status == 1);
        vm.event.perks[vm.indexPerk].tasks[vm.indexTask] = task;
        utilsService.resetForm( form );
        
        $rootScope.$broadcast('MenuOrganizer:count_tasks');
        $rootScope.$broadcast('TaskTabsController:count_tasks');
        
        vm.hideModalTask();
        utilsService.hideLoad();
      }

      function failed( error ){
        utilsService.resetForm( form );
        vm.hideModalTask();
        utilsService.hideLoad();
      }
    }

    function submitTask( form ){
      if(vm.isNewTask){
        createTask( form );
      }else{
        updateTask( form );
      }
    }

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.sponsors-organizer')
    .controller('EventsTabsController', EventsTabsController);

  EventsTabsController.$inject = [
    'userAuthService',
    '$rootScope'
  ];

  function EventsTabsController( userAuthService, $rootScope ) {

    var vm = this;
    vm.userAuth = userAuthService.getUserAuth();
    vm.count_events = 0;
    vm.count_past_events = 0;

    activate();
    ////////////

    function activate(){
      
      $rootScope.$on('EventsTabsController:count_events', renderCounts);
      
      vm.count_events = vm.userAuth.events.filter( filterByDateIsAfter ).length;
      vm.count_past_events = vm.userAuth.events.length - vm.count_events;
    }
    
    function filterByDateIsAfter( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.ends).isAfter( today );
    }
    
    function renderCounts() {
      vm.userAuth = userAuthService.getUserAuth();
      vm.count_events = vm.userAuth.events.filter( filterByDateIsAfter ).length;
      vm.count_past_events = vm.userAuth.events.length - vm.count_events;
    }

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-organizer')
    .controller('EventListController', EventListController);

  EventListController.$inject = [
    '$localStorage',
    'userService',
    'utilsService',
    '$scope',
    '$rootScope',
    'userAuthService'
  ];

  function EventListController( $localStorage, userService , utilsService, $scope, $rootScope, userAuthService) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.events = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;

    activate();
    ////////////

    function activate(){
      $rootScope.$on('EventListController:getEvents', getEvents);
      vm.events = vm.userAuth.events.filter( filterDate );
      vm.showEmptyState = vm.events.length == 0 ? true : false;
    }
    
    function getEvents(){
      vm.userAuth = userAuthService.getUserAuth();
      vm.events = vm.userAuth.events.filter( filterDate );
      vm.showEmptyState = vm.events.length == 0 ? true : false;
    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.events = vm.userAuth.events.filter( filterDate );
          vm.showEmptyState = vm.events.length == 0 ? true : false;
          $rootScope.$broadcast('MenuOrganizer:count_events');
          $rootScope.$broadcast('EventsTabsController:count_events');
          $rootScope.$broadcast('HomeOrganizerController:count_events');
        }

        function failed( error ){
          $scope.$broadcast('scroll.refreshComplete');
        }
    }

    function filterDate( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.ends).isAfter( today );
    }
    

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-organizer')
    .controller('PastEventsController', PastEventsController);

  PastEventsController.$inject = [
    '$localStorage',
    'userService',
    'utilsService',
    '$scope',
    '$rootScope',
    'userAuthService'
  ];

  function PastEventsController( $localStorage, userService , utilsService, $scope, $rootScope, userAuthService) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.events = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;

    activate();
    ////////////

    function activate(){
      $rootScope.$on('PastEventsController:getEvents', getEvents);
      vm.events = vm.userAuth.events.filter( filterDate );
      vm.showEmptyState = vm.events.length == 0 ? true : false;
    }
    
    function getEvents(){
      vm.userAuth = userAuthService.getUserAuth();
      vm.events = vm.userAuth.events.filter( filterDate );
      vm.showEmptyState = vm.events.length == 0 ? true : false;
    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.events = vm.userAuth.events.filter( filterDate );
          $rootScope.$broadcast('MenuOrganizer:count_events');
          $rootScope.$broadcast('EventsTabsController:count_events');
          $rootScope.$broadcast('HomeOrganizerController:count_events');
        }

        function failed( error ){
          $scope.$broadcast('scroll.refreshComplete');
        }
    }

    function filterDate( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.ends).isBefore( today );
    }
    

  }
})();
/**
* @Controller for Detail Sponsorship
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipOrganizerDetailController', SponsorshipOrganizerDetailController);

  SponsorshipOrganizerDetailController.$inject = [
    '$localStorage',
    'sponsorshipService',
    'utilsService',
    '$stateParams',
    '$ionicHistory',
    'userAuthService',
    'notificationService'
  ];

  function SponsorshipOrganizerDetailController( $localStorage, sponsorshipService , utilsService, $stateParams, $ionicHistory, userAuthService, notificationService) {

    var vm = this;
    //Atributes
    vm.sponzorship = {};
    vm.userAuth = userAuthService.getUserAuth();
    vm.showEmptyState = false;
    //Accions
    vm.sponsorAccept = sponsorAccept;
    vm.sponsorReject = sponsorReject;

    activate();

    ////////////

    function activate(){
      vm.sponzorship = _.findWhere(vm.userAuth.sponzorships_like_organizer, {id: $stateParams.id});
      vm.sponzorship.task_sponzor = vm.sponzorship.task_sponzor.filter( filterTaskSponsor );
    }
    
    function filterTaskSponsor( item ) {
      return item.task.user_id != vm.userAuth.id;
    }

    function sponsorAccept(){
       utilsService.confirm({
         title: 'Are you sure?', 
         template: '<p class="text-center">In accept the sponsor</p>'
       })
      .then( complete );

      function complete( rta ){
        if( rta ) updateSponsorship( 1 ); //Accepted 
      }
    }

    function sponsorReject(){
      utilsService.confirm({
         title: 'Are you sure?', 
         template: '<p class="text-center">In reject the sponsor</p>'
       })
      .then( complete );

      function complete( rta ){
        if( rta ) updateSponsorship( 2 ); //Deny
      }
    }

    function updateSponsorship( status ){
      utilsService.showLoad();
      var sponzorship = angular.copy( vm.sponzorship );
      sponzorship.status = status;
      sponsorshipService.editSponzorshipPut( sponzorship.id, sponzorship )
        .then( complete )
        .catch( failed );

        function complete( sponzorship ){
          utilsService.hideLoad();
          var notification = {
            text: vm.sponzorship.event.title,
            link: '#/sponzors/sponzoring',
            modelId: vm.sponzorship.id
          };
          vm.sponzorship.status = sponzorship.status;
          
          if( vm.sponzorship.status == 1){ //Accepted 
            notificationService.sendAcceptSponsorship(notification, vm.sponzorship.sponzor_id);
          }else if( vm.sponzorship.status == 2){//Deny
            notificationService.sendRejectSponsorship(notification, vm.sponzorship.sponzor_id);
          }
         
        }

        function failed( error ){
          utilsService.hideLoad();
        }

    }
    

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipsListController', SponsorshipsListController);

  SponsorshipsListController.$inject = [
    '$localStorage',
    'sponsorshipService',
    'userService',
    'utilsService',
    '$ionicScrollDelegate',
    '$scope',
    '$rootScope',
    'notificationService',
    'userAuthService'
  ];

  function SponsorshipsListController( $localStorage, sponsorshipService, userService, utilsService, $ionicScrollDelegate, $scope, $rootScope, notificationService, userAuthService) {

    var vm = this;
    //Atributes
    vm.sponsorships = [];
    vm.userAuth = userAuthService.getUserAuth();
    vm.showEmptyState = false;
    //Accions
    vm.sponsorAccept = sponsorAccept;
    vm.sponsorReject = sponsorReject;
    vm.doRefresh = doRefresh;

    activate();
    ////////////

    function activate(){
      vm.sponsorships = vm.userAuth.sponzorships_like_organizer.filter( filterByDateIsAfter );
      vm.showEmptyState = vm.sponsorships.length == 0 ? true : false;
      $rootScope.$on('SponsorshipsListController:getSponzorships', getSponzorships);
    }
    
    function filterByDateIsAfter( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.event.ends).isAfter( today );
    }
    
    function getSponzorships() {
      vm.userAuth = userAuthService.getUserAuth();
      vm.sponsorships = vm.userAuth.sponzorships_like_organizer.filter( filterByDateIsAfter );;
      vm.showEmptyState = vm.sponsorships.length == 0 ? true : false;
    }

    function sponsorAccept( sponzor ){
      utilsService.confirm({
        title: 'Are you sure?', 
        template: '<p class="text-center">In the accept the sponsor</p>'
      })
      .then( complete );

      function complete( rta ){
        if( rta ) updateSponsorship( sponzor, 1 ); //Accepted 
      }
    }

    function sponsorReject( sponzor ){
      utilsService.confirm({
        title: 'Are you sure?', 
        template: '<p class="text-center">In the reject the sponsor</p>'
      })
      .then( complete );

      function complete( rta ){
        if( rta ) updateSponsorship( sponzor, 2 ); //Deny
      }
    }

    function updateSponsorship( sponzor, status ){
      utilsService.showLoad();
      var sponzorCopy = angular.copy( sponzor );
      sponzorCopy.status = status;
      sponsorshipService.editSponzorshipPut( sponzorCopy.id, sponzorCopy )
        .then( complete )
        .catch( failed );

        function complete( sponsorship ){
          utilsService.hideLoad();
          sponzor.status = sponsorship.status;
          
          var notification = {
            text: sponzor.event.title,
            link: '#/sponzors/sponzoring',
            modelId: sponsorship.id
          };
          
          if(sponzor.status == 1){ //Accepted 
            notificationService.sendAcceptSponsorship(notification, sponsorship.sponzor_id);
          }else if(sponzor.status == 2){//Deny
            notificationService.sendRejectSponsorship(notification, sponsorship.sponzor_id);
          }
         
          
        }

        function failed( error ){
          utilsService.hideLoad();
        }

    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.sponsorships = vm.userAuth.sponzorships_like_organizer.filter( filterByDateIsAfter );
          vm.showEmptyState = vm.sponsorships.length == 0 ? true : false;
          $rootScope.$broadcast('MenuOrganizer:count_sponsors');
          $rootScope.$broadcast('SponsorshipsTabsController:count_sponsors');
          $rootScope.$broadcast('HomeOrganizerController:count_sponsors');
        }

        function failed( error ){
          vm.showEmptyState = true;
        }
    }
    

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipsPastEventsController', SponsorshipsPastEventsController);

  SponsorshipsPastEventsController.$inject = [
    '$localStorage',
    'sponsorshipService',
    'userService',
    'utilsService',
    '$ionicScrollDelegate',
    '$scope',
    '$rootScope',
    'notificationService',
    'userAuthService'
  ];

  function SponsorshipsPastEventsController( $localStorage, sponsorshipService, userService, utilsService, $ionicScrollDelegate, $scope, $rootScope, notificationService, userAuthService) {

    var vm = this;
    //Atributes
    vm.sponsorships = [];
    vm.userAuth = userAuthService.getUserAuth();
    vm.showEmptyState = false;
    //Accions
    vm.sponsorAccept = sponsorAccept;
    vm.sponsorReject = sponsorReject;
    vm.doRefresh = doRefresh;

    activate();
    ////////////

    function activate(){
      vm.sponsorships = vm.userAuth.sponzorships_like_organizer.filter( filterByDateIsBefore );
      vm.showEmptyState = vm.sponsorships.length == 0 ? true : false;
      $rootScope.$on('SponsorshipsPastEventsController:getSponzorships', getSponzorships);
    }
    
    function filterByDateIsBefore( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.event.ends).isBefore( today );
    }
    
    function getSponzorships() {
      vm.userAuth = userAuthService.getUserAuth();
      vm.sponsorships = vm.userAuth.sponzorships_like_organizer.filter( filterByDateIsBefore );;
      vm.showEmptyState = vm.sponsorships.length == 0 ? true : false;
    }

    function sponsorAccept( sponzor ){
      utilsService.confirm({
        title: 'Are you sure?', 
        template: '<p class="text-center">In the accept the sponsor</p>'
      })
      .then( complete );

      function complete( rta ){
        if( rta ) updateSponsorship( sponzor, 1 ); //Accepted 
      }
    }

    function sponsorReject( sponzor ){
      utilsService.confirm({
        title: 'Are you sure?', 
        template: '<p class="text-center">In the reject the sponsor</p>'
      })
      .then( complete );

      function complete( rta ){
        if( rta ) updateSponsorship( sponzor, 2 ); //Deny
      }
    }

    function updateSponsorship( sponzor, status ){
      utilsService.showLoad();
      var sponzorCopy = angular.copy( sponzor );
      sponzorCopy.status = status;
      sponsorshipService.editSponzorshipPut( sponzorCopy.id, sponzorCopy )
        .then( complete )
        .catch( failed );

        function complete( sponsorship ){
          utilsService.hideLoad();
          sponzor.status = sponsorship.status;
          
          var notification = {
            text: sponzor.event.title,
            link: '#/sponzors/sponzoring',
            modelId: sponsorship.id
          };
          
          if(sponzor.status == 1){ //Accepted 
            notificationService.sendAcceptSponsorship(notification, sponsorship.sponzor_id);
          }else if(sponzor.status == 2){//Deny
            notificationService.sendRejectSponsorship(notification, sponsorship.sponzor_id);
          }
         
          
        }

        function failed( error ){
          utilsService.hideLoad();
        }

    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.sponsorships = vm.userAuth.sponzorships_like_organizer;
          vm.showEmptyState = vm.sponsorships.length == 0 ? true : false;
          $rootScope.$broadcast('MenuOrganizer:count_sponsors');
          $rootScope.$broadcast('SponsorshipsTabsController:count_sponsors');
          $rootScope.$broadcast('HomeOrganizerController:count_sponsors');
        }

        function failed( error ){
          vm.showEmptyState = true;
        }
    }
    

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipsTabsController', SponsorshipsTabsController);

  SponsorshipsTabsController.$inject = [
    'userAuthService',
    '$rootScope'
  ];

  function SponsorshipsTabsController( userAuthService, $rootScope ) {

    var vm = this;
    vm.userAuth = userAuthService.getUserAuth();
    vm.count_events = 0;
    vm.count_past_events = 0;

    activate();
    ////////////

    function activate(){
      
      $rootScope.$on('SponsorshipsTabsController:count_sponsors', renderCounts);
      
      vm.count_events = vm.userAuth.sponzorships_like_organizer.filter( filterByDateIsAfter ).length;
      vm.count_past_events = vm.userAuth.sponzorships_like_organizer.length - vm.count_events;
    }
    
    function filterByDateIsAfter( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.event.ends).isAfter( today );
    }
    
    function renderCounts() {
      vm.userAuth = userAuthService.getUserAuth();
      vm.count_sponsors = vm.userAuth.sponzorships_like_organizer.length;
      vm.count_past_events = vm.userAuth.sponzorships_like_organizer.length - vm.count_events;
    }
    
    

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2

*/
(function() {
  'use strict';

  angular
    .module('app.tasks-organizer')
    .controller('PastTaskController', PastTaskController);

  PastTaskController.$inject = [
    '$localStorage',
    'perkTaskService',
    'userService',
    'utilsService',
    '$scope',
    '$rootScope',
    '$ionicModal',
    'userAuthService',
    'notificationService'
  ];

  function PastTaskController( $localStorage, perkTaskService , userService, utilsService, $scope, $rootScope, $ionicModal, userAuthService, notificationService) {

   var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.events = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;

    vm.indexEvent = -1;
    vm.indexPerk = -1;
    vm.indexTask = -1;
    vm.modalTask = null;
    vm.isNewTask = true;
    vm.task = {};
    vm.showModalTask = showModalTask;
    vm.newTask = newTask;
    vm.hideModalTask = hideModalTask;
    vm.editTask = editTask;
    vm.submitTask = submitTask;
    vm.deleteTask = deleteTask;
    
    activate();
    ////////////

    function activate(){
      vm.events = vm.userAuth.events
      .filter( filterEvents )
      .map( preparateEvents )
      .sort( orderByDateEnd );
      
      vm.showEmptyState = vm.events.length == 0 ? true : false;
      
      $ionicModal.fromTemplateUrl('app/tasks-organizer/task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalTask = modal;
      });
    }
    
    function orderByDateEnd( a,b ){
      return b.ends > a.ends;
    }
    
    function preparateEvents( event ){
      event.perks = event.perks.map( preparatePerks );
      return event;
    }
    
    function preparatePerks( perk ){
      perk.sponzorship = _.where(vm.userAuth.sponzorships_like_organizer, {perk_id: perk.id});
      return perk;
    }
    
    function countTasks( events ) {
      return events
        .reduce(function(a,b){ return a.concat(b.perks)}, [])
        .reduce(function(a,b){ return a.concat(b.tasks)}, []);
    }
    
    function countTasksDone( events ) {
      return countTasks(events)
        .filter( filterByDone )
    }
    
    function filterByDone( task ){
      return task.status == "1";
    }
    
    function filterEvents( event ){
      var count = event.perks.reduce(function(a,b){ return a.concat(b.tasks)}, []);
      var today = moment( new Date() ).subtract(1, 'days');
      return moment( event.ends ).isBefore( today ) && count.length > 0;
    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.events = vm.userAuth.events
          .filter( filterEvents )
          .map( preparateEvents )
          .sort( orderByDateEnd );
          vm.showEmptyState = vm.events.length == 0 ? true : false;
          $rootScope.$broadcast('MenuOrganizer:count_tasks');
          $rootScope.$broadcast('TaskTabsController:count_tasks');
        }

        function failed( error ){
          console.log( error);
        }
    }
    
    function sendNewTaskNotification( text ) {
      for (var index = 0; index < vm.events[vm.indexEvent].perks[vm.indexPerk].sponzorship.length; index++) {
        var sponzorship = vm.events[vm.indexEvent].perks[vm.indexPerk].sponzorship[index];
        notificationService.sendNewTaskOrganizer({
          text: text,
          modelId: sponzorship.id
        }, sponzorship.sponzor_id);
      }
    }
    
    function sendUpdateTaskNotification( text, done ) {
      for (var index = 0; index < vm.events[vm.indexEvent].perks[vm.indexPerk].sponzorship.length; index++) {
        var sponzorship = vm.events[vm.indexEvent].perks[vm.indexPerk].sponzorship[index];
        if(done){
          notificationService.sendDoneTaskOrganizer({
            text: text,
            modelId: sponzorship.id
          }, sponzorship.sponzor_id);
        }else{
          notificationService.sendUpdateTaskOrganizer({
            text: text,
            modelId: sponzorship.id
          }, sponzorship.sponzor_id);
        }
      }
    }
    
    function showModalTask(){
      vm.modalTask.show();
    }

    function newTask( perk, indexEvent, indexPerk ){
      vm.isNewTask = true;
      vm.indexEvent = indexEvent;
      vm.indexPerk = indexPerk;
      vm.task.perk_id = perk.id;
      vm.task.event_id = perk.id_event;
      vm.showModalTask();
    }

    function hideModalTask( form ){
      vm.modalTask.hide();
      if (form) utilsService.resetForm( form );
      vm.task = {};
    }

    function editTask( task, indexEvent, indexPerk, indexTask ){
      vm.isNewTask = false;
      vm.indexEvent = indexEvent;
      vm.indexPerk = indexPerk;
      vm.indexTask = indexTask;
      vm.task = angular.copy(task);
      vm.task.status = vm.task.status == 1 ? true : false;
      vm.showModalTask();
    }

    function createTask( form ){
      utilsService.showLoad();
      perkTaskService.createPerkTask( preparateTask() )
        .then( complete )
        .catch( failed );

        function complete( data ){
          vm.userAuth.sponzorships_like_organizer = $localStorage.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
          vm.events[vm.indexEvent].perks[vm.indexPerk].tasks.push( data.PerkTask );
          utilsService.resetForm( form );
          vm.hideModalTask();
          utilsService.hideLoad();
          sendNewTaskNotification( data.PerkTask.title );
          $rootScope.$broadcast('MenuOrganizer:count_tasks');
        }

        function failed( error ){
          utilsService.resetForm( form );
          vm.hideModalTask();
          utilsService.hideLoad();
        }
    }

    function preparateTask(){
      return {
        user_id: vm.userAuth.id,
        event_id: vm.task.event_id,
        perk_id: vm.task.perk_id,
        title: vm.task.title,
        description: vm.task.description,
        type: 0,
        status: vm.task.status ? 1 : 0
      }
    }

    function deleteTask( form ){
      utilsService.showLoad();
      perkTaskService.deletePerkTask( vm.task.id )
      .then( complete )
      .catch( failed );

      function complete( data ){
        vm.userAuth.sponzorships_like_organizer = $localStorage.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
        if( form ) utilsService.resetForm( form );
        vm.events[vm.indexEvent].perks[vm.indexPerk].tasks.splice(vm.indexTask, 1);
        vm.hideModalTask();
        utilsService.hideLoad();
        $rootScope.$broadcast('MenuOrganizer:count_tasks');
        $rootScope.$broadcast('TaskTabsController:count_tasks');
      }

      function failed( error ){
        vm.hideModalTask();
        if( form ) utilsService.resetForm( form );
        utilsService.alert({
          template: error.message
        });
        utilsService.hideLoad();
      }
    }

    function updateTask( form ){
      
      utilsService.showLoad();
      vm.task.status = vm.task.status ? 1 : 0;
      perkTaskService.editPerkTaskPatch( vm.task.id, vm.task )
      .then( complete )
      .catch( failed );

      function complete( task ){
        utilsService.resetForm( form );
        sendUpdateTaskNotification( task.title, vm.events[vm.indexEvent].perks[vm.indexPerk].tasks[vm.indexTask].status == 0 && task.status == 1);
        vm.events[vm.indexEvent].perks[vm.indexPerk].tasks[vm.indexTask] = task;
        vm.hideModalTask();
        utilsService.hideLoad();
        $rootScope.$broadcast('MenuOrganizer:count_tasks');
        $rootScope.$broadcast('TaskTabsController:count_tasks');
      }

      function failed( error ){
        utilsService.resetForm( form );
        vm.hideModalTask();
        utilsService.hideLoad();
      }
    }

    function submitTask( form ){
      if(vm.isNewTask){
        createTask( form );
      }else{
        updateTask( form );
      }
    }

    

  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.tasks-organizer')
    .controller('TaskTabsController', TaskTabsController);

  TaskTabsController.$inject = [
    '$rootScope',
    'userAuthService'
  ];

  function TaskTabsController( $rootScope, userAuthService ) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.count_tasks = 0;
    vm.count_past_tasks = 0;
    
    activate();
    ////////////

    function activate(){
      $rootScope.$on('TaskTabsController:count_tasks', rendercountTasks);
      
      vm.count_tasks = countTasks(vm.userAuth.events.filter( filterEventsIsAfter )).length;
      vm.count_past_tasks = countTasks(vm.userAuth.events.filter( filterEventsisBefore )).length;
     
    }
    
    function filterEventsIsAfter( event ){
      var count = event.perks.reduce(function(a,b){ return a.concat(b.tasks)}, []);
      var today = moment( new Date() ).subtract(1, 'days');
      return moment( event.ends ).isAfter( today ) && count.length > 0;
    }
    
    function filterEventsisBefore( event ){
      var count = event.perks.reduce(function(a,b){ return a.concat(b.tasks)}, []);
      var today = moment( new Date() ).subtract(1, 'days');
      return moment( event.ends ).isBefore( today ) && count.length > 0;
    }
    
    function rendercountTasks(){
      vm.userAuth = userAuthService.getUserAuth();
      vm.count_tasks = countTasks(vm.userAuth.events.filter( filterEventsIsAfter )).length;
      vm.count_past_tasks = countTasks(vm.userAuth.events.filter( filterEventsisBefore )).length;
    }
    
    function countTasks( events ) {
      return events
        .reduce(function(a,b){ return a.concat(b.perks)}, [])
        .reduce(function(a,b){ return a.concat(b.tasks)}, [])
        .filter( filterByUserAndNotDone  );
        
        function filterByUserAndNotDone( item ) {
          return item.user_id == vm.userAuth.id && item.status != '1';
        }
    }
    
  }
})();
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.tasks-organizer')
    .controller('TaskListController', TaskListController);

  TaskListController.$inject = [
    '$localStorage',
    'perkTaskService',
    'userService',
    'utilsService',
    '$scope',
    '$rootScope',
    '$ionicModal',
    'userAuthService',
    'notificationService'
  ];

  function TaskListController( $localStorage, perkTaskService , userService, utilsService, $scope, $rootScope, $ionicModal, userAuthService, notificationService) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.events = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;

    vm.indexEvent = -1;
    vm.indexPerk = -1;
    vm.indexTask = -1;
    vm.modalTask = null;
    vm.isNewTask = true;
    vm.task = {};
    vm.showModalTask = showModalTask;
    vm.newTask = newTask;
    vm.hideModalTask = hideModalTask;
    vm.editTask = editTask;
    vm.submitTask = submitTask;
    vm.deleteTask = deleteTask;
    
    activate();
    ////////////

    function activate(){
       vm.events = vm.userAuth.events
      .filter( filterEvents )
      .map( preparateEvents );
      vm.showEmptyState = vm.events.length == 0 ? true : false;
      
      $ionicModal.fromTemplateUrl('app/tasks-organizer/task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalTask = modal;
      });
    }
    
    function orderByDateEnd( a,b ){
      return b.starts > a.starts;
    }
    
    function preparateEvents( event ){
      event.perks = event.perks.map( preparatePerks );
      return event;
    }
    
    function preparatePerks( perk ){
      perk.sponzorship = _.where(vm.userAuth.sponzorships_like_organizer, {perk_id: perk.id});
      return perk;
    }
    
    function countTasks( events ) {
      return events
        .reduce(function(a,b){ return a.concat(b.perks)}, [])
        .reduce(function(a,b){ return a.concat(b.tasks)}, []);
    }
    
    function countTasksDone( events ) {
      return countTasks(events)
        .filter( filterByDone )
    }
    
    function filterByDone( task ){
      return task.status == "1";
    }
    
    function filterEvents( event ){
      var count = event.perks.reduce(function(a,b){ return a.concat(b.tasks)}, []);
      var today = moment( new Date() ).subtract(1, 'days');
      return moment( event.ends ).isAfter( today ) && count.length > 0;
    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.events = vm.userAuth.events
          .filter( filterEvents )
          .map( preparateEvents )
          .sort( orderByDateEnd );
          vm.showEmptyState = vm.events.length == 0 ? true : false;
          $rootScope.$broadcast('MenuOrganizer:count_tasks');
          $rootScope.$broadcast('TaskTabsController:count_tasks');
        }

        function failed( error ){
          console.log( error);
        }
    }
    
    function sendNewTaskNotification( text ) {
      for (var index = 0; index < vm.events[vm.indexEvent].perks[vm.indexPerk].sponzorship.length; index++) {
        var sponzorship = vm.events[vm.indexEvent].perks[vm.indexPerk].sponzorship[index];
        notificationService.sendNewTaskOrganizer({
          text: text,
          modelId: sponzorship.id
        }, sponzorship.sponzor_id);
      }
    }
    
    function sendUpdateTaskNotification( text, done ) {
      for (var index = 0; index < vm.events[vm.indexEvent].perks[vm.indexPerk].sponzorship.length; index++) {
        var sponzorship = vm.events[vm.indexEvent].perks[vm.indexPerk].sponzorship[index];
        if(done){
          notificationService.sendDoneTaskOrganizer({
            text: text,
            modelId: sponzorship.id
          }, sponzorship.sponzor_id);
        }else{
          notificationService.sendUpdateTaskOrganizer({
            text: text,
            modelId: sponzorship.id
          }, sponzorship.sponzor_id);
        }
      }
    }
    
    function showModalTask(){
      vm.modalTask.show();
    }

    function newTask( perk, indexEvent, indexPerk ){
      vm.isNewTask = true;
      vm.indexEvent = indexEvent;
      vm.indexPerk = indexPerk;
      vm.task.perk_id = perk.id;
      vm.task.event_id = perk.id_event;
      vm.showModalTask();
    }

    function hideModalTask( form ){
      vm.modalTask.hide();
      if (form) utilsService.resetForm( form );
      vm.task = {};
    }

    function editTask( task, indexEvent, indexPerk, indexTask ){
      vm.isNewTask = false;
      vm.indexEvent = indexEvent;
      vm.indexPerk = indexPerk;
      vm.indexTask = indexTask;
      vm.task = angular.copy(task);
      vm.task.status = vm.task.status == 1 ? true : false;
      vm.showModalTask();
    }

    function createTask( form ){
      utilsService.showLoad();
      perkTaskService.createPerkTask( preparateTask() )
        .then( complete )
        .catch( failed );

        function complete( data ){
          vm.userAuth.sponzorships_like_organizer = $localStorage.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
          vm.events[vm.indexEvent].perks[vm.indexPerk].tasks.push( data.PerkTask );
          utilsService.resetForm( form );
          vm.hideModalTask();
          utilsService.hideLoad();
          sendNewTaskNotification( data.PerkTask.title );
          $rootScope.$broadcast('MenuOrganizer:count_tasks');
          $rootScope.$broadcast('TaskTabsController:count_tasks');
        }

        function failed( error ){
          utilsService.resetForm( form );
          vm.hideModalTask();
          utilsService.hideLoad();
        }
    }

    function preparateTask(){
      return {
        user_id: vm.userAuth.id,
        event_id: vm.task.event_id,
        perk_id: vm.task.perk_id,
        title: vm.task.title,
        description: vm.task.description,
        type: 0,
        status: vm.task.status ? 1 : 0
      }
    }

    function deleteTask( form ){
      utilsService.showLoad();
      perkTaskService.deletePerkTask( vm.task.id )
      .then( complete )
      .catch( failed );

      function complete( data ){
        vm.userAuth.sponzorships_like_organizer = $localStorage.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
        if( form ) utilsService.resetForm( form );
        vm.events[vm.indexEvent].perks[vm.indexPerk].tasks.splice(vm.indexTask, 1);
        vm.hideModalTask();
        utilsService.hideLoad();
        $rootScope.$broadcast('MenuOrganizer:count_tasks');
        $rootScope.$broadcast('TaskTabsController:count_tasks');
      }

      function failed( error ){
        vm.hideModalTask();
        if( form ) utilsService.resetForm( form );
        utilsService.alert({
          template: error.message
        });
        utilsService.hideLoad();
      }
    }

    function updateTask( form ){
      utilsService.showLoad();
      vm.task.status = vm.task.status ? 1 : 0;
      perkTaskService.editPerkTaskPatch( vm.task.id, vm.task )
      .then( complete )
      .catch( failed );

      function complete( task ){
        utilsService.resetForm( form );
        sendUpdateTaskNotification( task.title, vm.events[vm.indexEvent].perks[vm.indexPerk].tasks[vm.indexTask].status == 0 && task.status == 1);
        vm.events[vm.indexEvent].perks[vm.indexPerk].tasks[vm.indexTask] = task;
        vm.hideModalTask();
        utilsService.hideLoad();
        $rootScope.$broadcast('MenuOrganizer:count_tasks');
      }

      function failed( error ){
        utilsService.resetForm( form );
        vm.hideModalTask();
        utilsService.hideLoad();
      }
    }

    function submitTask( form ){
      if(vm.isNewTask){
        createTask( form );
      }else{
        updateTask( form );
      }
    }

    

  }
})();
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('ForgotController', ForgotController);

  ForgotController.$inject = [
    '$translate',
    'userService', 
    '$state',
    'utilsService',
    '$ionicHistory'
  ];

  function ForgotController( $translate, userService, $state , utilsService, $ionicHistory) {

    var vm = this;
    vm.user = {};
    vm.resetPassword = resetPassword;

    ////////////

    function resetPassword(){
      utilsService.showLoad();
      userService.forgotPassword( vm.user.email )
        .then( complete )
        .catch( failed );

        function complete(){
          utilsService.hideLoad();
          $ionicHistory.clearCache();
          $state.go("signin");
          vm.user = {};
        }

        function failed( data ){
          utilsService.hideLoad();
        }
    };

  }
})();
/**
* @Controller for Interests of user
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  //'use strict';

  angular
    .module('app.users')
    .controller('FormInterestsController', FormInterestsController);

  FormInterestsController.$inject = [
    'userService',
    '$state',
    'utilsService',
    '$localStorage',
    'categoryService',
    'userInterestService',
    '$q',
    'userAuthService'
  ];

  function FormInterestsController( userService, $state , utilsService, $localStorage, categoryService, userInterestService, $q, userAuthService) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.categories = [];
    //Funcions
    vm.updateInterests = updateInterests;
    
    activate();
    ////////////
    
    function activate(){
      getCategories();
    }

    function updateInterests(){
      utilsService.showLoad();
      userInterestService.bulkUserInterest( vm.userAuth.id, {
        interests: getInterestCheck()
      })
      .then( complete )
      .catch( failed );

      function complete( results ){
        utilsService.hideLoad();
        redirectTutorial();
      }

      function failed( error ){
        utilsService.hideLoad();
      }

    }

    function getInterestCheck(){
      return vm.categories
        .filter( ByInterest )
        .map( mapInterest )
        .reduce( mergeArrays, [] )
        .filter( interestCheck )
        .map( preparateData );

        function ByInterest( item ){
          return item.interests;
        }

        function mapInterest( item ){
          return item.interests;
        }

        function mergeArrays(a,b){
          return a.concat(b);
        }

        function interestCheck( item ){
          return item.check;
        }
        
        function preparateData( item ) {
           return {
             'user_id': vm.userAuth.id,
             'interest_id': item.id_interest
           }
        }
    }

    function getCategories(){
      utilsService.showLoad();
      categoryService.allCategories()
        .then( complete )
        .catch( failed );

        function complete( categories ){
          utilsService.hideLoad();
          vm.categories = categories;
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

    function redirectTutorial(){
      if( vm.userAuth.type == 0 ){ // is an Organizer.
        $state.go("organizer.intro");
      }else{ // is an Sponzor
        $state.go("sponzor.intro");
      }
    }

    
  }
})();
/**
* @Controller for Personal information of user
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('FormProfileController', FormProfileController);

  FormProfileController.$inject = [
    '$translate',
    'userService',
    '$state',
    'utilsService',
    '$localStorage',
    'userAuthService'
  ];

  function FormProfileController( $translate, userService, $state , utilsService, $localStorage, userAuthService) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    //Funcions
    vm.updateProfile = updateProfile;
    vm.changeLang = changeLang;
    
    activate();

    ////////////
    
    function activate(){
      vm.userAuth.lang = 'en';
      vm.userAuth.gender = 1;
      vm.userAuth.age = vm.userAuth.age == '0' ? null : parseInt( vm.userAuth.age );
    }

    function updateProfile( form ){
      utilsService.showLoad();
      userService.editUserPatch( vm.userAuth.id, preparateData() )
        .then( updateUser )
        .catch( failed );

      function updateUser( user ){
          utilsService.hideLoad();
          utilsService.resetForm( form );
          user.age = parseInt( user.age );
          user.comunity_size = parseInt( user.comunity_size );
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.userAuth = {};
          $state.go("interests");
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

    function preparateData(){
      return {
        name: vm.userAuth.name,
        age: parseInt(vm.userAuth.age),
        location: vm.userAuth.location.formatted_address,
        location_reference: vm.userAuth.location.place_id,
        lang: vm.userAuth.lang,
        sex: parseInt(vm.userAuth.sex)
      }
    }

    function changeLang(){
      $translate.use(vm.userAuth.lang);
    }

  }
})();
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('InviteUsersController', InviteUsersController);

  InviteUsersController.$inject = [
    'userService', 
    'utilsService',
    '$localStorage',
    'userAuthService'
  ];

  function InviteUsersController( userService, utilsService, $localStorage, userAuthService) {

    var vm = this;
    vm.friend = {};
    vm.userAuth = userAuthService.getUserAuth();
    vm.inviteFriend = inviteFriend;

    ////////////

    function inviteFriend( form ){
      utilsService.showLoad();
      userService.invitedUser( preparateData() )
        .then( complete )
        .catch( failed );

        function complete(){
          utilsService.hideLoad();
          utilsService.resetForm( form );
          vm.friend = {};
          utilsService.alert({
            title: "Nice!",
            template: "Your Invitation was Sent."
          });
        }

        function failed(){
          utilsService.hideLoad();
        }
    }


    function preparateData(){
      return {
        user_id: vm.userAuth.id,
        email: vm.friend.email,
        message: "Try this ;)"
      }
    }

  }
})();
/**
* @Controller for Login user
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('LoginController', LoginController);

  LoginController.$inject = [
    '$translate',
    'userService',
    '$localStorage',
    '$state',
    'utilsService',
    '$base64',
    '$ionicUser', 
    '$ionicAnalytics',
    'notificationService',
    'userAuthService'
  ];

  function LoginController( $translate, userService, $localStorage, $state , utilsService, $base64, $ionicUser, $ionicAnalytics, notificationService, userAuthService) {

    var vm = this;
    vm.user = {};
    vm.userResponse = {};
    vm.signIn = signIn;

    activate();

    ////////////
    
    function activate() {
      if(userService.checkSession()){
        vm.userResponse = $localStorage.userAuth;
        validateTutorial();
      }
    }

    function signIn( form ){
      utilsService.showLoad();
      userService.login( vm.user.email, vm.user.password )
        .then( complete )
        .catch( failed );

      function complete( user ){
        utilsService.hideLoad();
        utilsService.resetForm( form );
        vm.userResponse = user;
        $localStorage.token = $base64.encode(vm.user.email +':'+ vm.user.password);
        
        
        var user = Ionic.User.current();
        if (!user.id) {
          user.id = vm.userResponse.id;
          user.set('email', vm.user.email);
          user.set('type', vm.user.type);
        }
        user.save();
        vm.user = {};
        $ionicAnalytics.register();
        
        saveUser();
        notificationService.activate();
        validateTutorial();
      }

      function failed( data ){
        utilsService.hideLoad();
        if(utilsService.trim(data.message) === "Invalid credentials"){
          utilsService.alert({
            title: $translate.instant("ERRORS.signin_title_credentials"),
            template: $translate.instant("ERRORS.signin_incorrect_credentials"),
          });
        }
        vm.user.password = '';
      }
    };

    function updateUser(){
      vm.userResponse.demo = 1;
      saveUser();
      userService.editUserPatch( vm.userResponse.id, vm.userResponse )
        .then( redirectTutorial )
        .catch( failed );

        function failed( error ){
          console.log( error );
        }
    };

    function validateTutorial(){
      if( vm.userResponse.demo == 0){
        updateUser();
      }else{
        redirectHome();
      }
    }

    function redirectTutorial(){
      if( vm.userResponse.type == 0 ){ // is an Organizer.
        $state.go("organizer.intro");
      }else{ // is an Sponzor
        $state.go("sponzor.intro");
      }
    }

    function redirectHome(){
      if( vm.userResponse.type == 0 ){ // is an Organizer.
        $state.go("organizer.home");
      }else{ // is an Sponzor
        $state.go("sponzor.home");
      }
    }

    function saveUser(){
       userAuthService.updateUserAuth(vm.userResponse);
    }

  }
})();

/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('NotificationsController', NotificationsController);

  NotificationsController.$inject = [
    '$translate',
    'userAuthService', 
    '$state',
    'notificationService'
  ];

  function NotificationsController( $translate, userAuthService, $state, notificationService) {

    var vm = this;
    vm.userAuth = userAuthService.getUserAuth();
    vm.notifications = []
    vm.time = 24;

    activate();
    ////////////
    function activate() {
      vm.notifications = notificationService.getNotifications( vm.userAuth.id );
      /*vm.notifications = [
        {
          typeNotification: 'newEvent',
          type: 'event',
          date: new Date(),
          text: 'Ionic 2',
          modelId: 1,
          read: false,
          toApp: 'mobileApp'
        },
        {
          typeNotification: 'newSponsorship',
          type: 'sponsorship',
          date: new Date(),
          text: 'Angular 2',
          modelId: 1,
          read: false,
          toApp: 'mobileApp'
        },
        {
          typeNotification: 'acceptSponsorship',
          type: 'sponsorship',
          date: new Date(),
          text: 'Angular 2',
          modelId: 1,
          read: false,
          toApp: 'mobileApp'
        },
        {
          typeNotification: 'rejectSponsorship',
          type: 'sponsorship',
          date: new Date(),
          text: 'Angular 2',
          modelId: 1,
          read: false,
          toApp: 'mobileApp'
        },
        {
          typeNotification: 'newTaskOrganizer',
          type: 'task',
          date: new Date(),
          text: 'Mostrar en redes sociales',
          modelId: 1,
          read: false,
          toApp: 'mobileApp'
        },
        {
          typeNotification: 'updateTaskOrganizer',
          type: 'task',
          date: new Date(),
          text: 'Mostrar en redes sociales',
          modelId: 1,
          read: false,
          toApp: 'mobileApp'
        },
        {
          typeNotification: 'doneTaskOrganizer',
          type: 'task',
          date: new Date(),
          text: 'Mostrar en redes sociales',
          modelId: 1,
          read: false,
          toApp: 'mobileApp'
        },
      ];*/
    }

  }
})();
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = [
    'userService', 
    'utilsService',
    '$cordovaCamera',
    '$localStorage',
    '$q',
    'imgurService',
    '$cordovaToast',
    'userAuthService'
  ];

  function ProfileController( userService, utilsService, $cordovaCamera, $localStorage, $q, imgurService, $cordovaToast, userAuthService) {

    var vm = this;
    vm.userAuth = userAuthService.getUserAuth();
    vm.imageURI = null;
    vm.getPhoto = getPhoto;
    vm.updateProfile = updateProfile;
    
    activate();

    ////////////
    
    function activate(){
      vm.userAuth.age = parseInt( vm.userAuth.age );
      vm.userAuth.comunity_size = vm.userAuth.comunity_size || 0;
      vm.userAuth.comunity_size = parseInt( vm.userAuth.comunity_size );
    }

    function getPhoto(){

      var Camera = Camera || null;
      var CameraPopoverOptions = CameraPopoverOptions || null;

      var options = {
        quality: 100,
        destinationType: Camera ? Camera.DestinationType.DATA_URL : null,
        sourceType: Camera ? Camera.PictureSourceType.PHOTOLIBRARY : null,
        allowEdit: true,
        encodingType: Camera ? Camera.EncodingType.JPEG : null,
        targetWidth: 500,
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
      };
      $cordovaCamera.getPicture( options )
        .then( complete )
        .catch( failed );

      function complete( imageURI ){
        vm.imageURI = imageURI;
        vm.userAuth.image = "data:image/jpeg;base64," + imageURI;
      }

      function failed( error ){
        //console.log( error );
      }
    }

    function updateProfile( form ){
      utilsService.showLoad();

      if(vm.imageURI){
        imgurService.uploadImage( vm.imageURI )
          .then( updateImage )
          .then( updateUser )
          .catch( failed );
      }else{
        userService.editUserPatch( vm.userAuth.id, vm.userAuth )
          .then( updateUser )
          .catch( failed );
      }

        function updateImage( image ){
          vm.userAuth.image = image;
          return userService.editUserPatch( vm.userAuth.id, vm.userAuth );
        }

        function updateUser( user ){
          utilsService.hideLoad();
          utilsService.resetForm( form );
          user.age = parseInt( user.age );
          user.comunity_size = parseInt( user.comunity_size );
          vm.userAuth = userAuthService.updateUserAuth( user );
          $cordovaToast.showShortBottom("Su perfil se ha actulizado");
        }

        function failed( error ){
          utilsService.hideLoad();
          //console.log( error );
        }
    }

  }
})();
/**
* @Controller for Login user
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = [
    '$translate',
    '$state',
    'userService',
    'utilsService',
    '$localStorage',
    '$base64',
    'notificationService',
    'userAuthService'
  ];

  function RegisterController( $translate, $state, userService, utilsService, $localStorage, $base64, notificationService, userAuthService) {

    var vm = this;
    vm.newUser = {};
    vm.registerNewUser = registerNewUser;

    activate();
    ////////////

    function activate(){
      vm.newUser.type = 0;
    }

    function registerNewUser( form ){
      utilsService.showLoad();
      userService.createUser( preparateData() )
      .then( signIn )
      .then( complete )
      .catch( failed );

      function complete( user ){
        utilsService.hideLoad();
        utilsService.resetForm( form );
        utilsService.alert({
          title: $translate.instant("MESSAGES.succ_user_tit"),
          template: $translate.instant("MESSAGES.succ_user_mess")
        });
        $localStorage.token = $base64.encode(vm.newUser.email +':'+ vm.newUser.password);
        vm.newUser = {}
        vm.newUser.type = 0;
        userAuthService.getUserAuth( user );
        notificationService.activate();
        $state.go("profile");
      }

      function failed( data ){
        utilsService.hideLoad();
        if(utilsService.trim(data.message) === "Invalid credentials"){
          utilsService.alert({
            title: $translate.instant("ERRORS.signin_title_credentials"),
            template: $translate.instant("ERRORS.signin_incorrect_credentials")
          });
        }
        else if (utilsService.trim(data.message) === "Not inserted") {
          utilsService.alert({
            title: $translate.instant("ERRORS.signin_notinserted_credentials_title"),
            template: $translate.instant("ERRORS.signin_notinserted_credentials_message")
          });
        }
        else if (data.error && utilsService.trim(data.error.email) === "The email has already been taken.") {
          utilsService.alert({
            title: $translate.instant("ERRORS.signin_taken_credentials_title"),
            template: $translate.instant("ERRORS.signin_taken_credentials_message")
          });
        }
        
      }
    };

    function preparateData(){
      return {
        email: vm.newUser.email,
        password: vm.newUser.password,
        password_confirmation: vm.newUser.password,
        name: vm.newUser.name,
        lang: 'en',
        type: vm.newUser.type,
      }
    }

    function signIn(){
      return userService.login( vm.newUser.email, vm.newUser.password );
    };
    

  }
})();

/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {

  angular
    .module('app.users')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = [
    '$translate',
    'utilsService',
    '$cordovaToast',
    '$ionicDeploy'
  ];

  function SettingsController( $translate, utilsService, $cordovaToast, $ionicDeploy ) {

    var vm = this;
    vm.lang = $translate.use();
    vm.save = save;
    vm.checkForUpdates = checkForUpdates;
    vm.doUpdate = doUpdate;

    activate();
    ////////////

    function activate(){
      $ionicDeploy.setChannel("production");
    }

    function save(){
      $translate.use(vm.lang);
    }

    function checkForUpdates(){
      utilsService.showLoad();
      $ionicDeploy.check()
      .then( complete )
      .catch( failed );

      function complete( hasUpdate ){
        utilsService.hideLoad();
        if (hasUpdate){

          utilsService.confirm({
            title: $translate.instant("MESSAGES.update_title"),
            template: '<p class="text-center">'+ $translate.instant("MESSAGES.update_text") +'</p>'
          })
          .then( complete );

          function complete( rta ){
            if(rta) vm.doUpdate();
          }
        }else{
          utilsService.alert({
            title: $translate.instant("MESSAGES.update_title"),
            template: '<p class="text-center">'+ $translate.instant("MESSAGES.update_text_nothing") +'</p>'
          });
        }
      }

      function failed(){
        utilsService.hideLoad();
      }
    }

    function doUpdate(){
      utilsService.showLoad();
      $ionicDeploy.update()
      .then( complete )
      .catch( failed );

      function complete(){
        utilsService.hideLoad();
        $cordovaToast.showShortBottom($translate.instant("MESSAGES.update_success"));
      }

      function failed(){
        utilsService.hideLoad();
        utilsService.alert();
      }
    }

  }
})();
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('TestsController', TestsController);

  TestsController.$inject = [
    '$localStorage',
    'userInterestService',
    'userService',
    'sponsorshipService',
    'perkTaskService',
    'perkService',
    'eventTypeService',
    'categoryService',
    'eventService'
  ];

  function TestsController( $localStorage, userInterestService, userService, sponsorshipService, perkTaskService, perkService, eventTypeService, categoryService, eventService) {

    var vm = this;
    vm.userAuth = $localStorage.userAuth || {};
    
    login();
    //////////////////////////////////////

    function rta( response ){
      console.log( response );
    }

    function createUserInterest(){
      userInterestService.createUserInterest({
        interest_id: 1,
        user_id: vm.userAuth.id
      })
      .then( rta )
      .catch( rta );
    }
    
    function bulkUserInterest() {
      userInterestService.bulkUserInterest(1003, {interests:[
        {
          interest_id: 1,
          user_id: 1003
        }
      ]} )
      .then( rta )
      .catch( rta );
    }

    function login(){
      userService.login( 'organizer@sponzor.me', 'sponzorme' )
      .then( rta )
      .catch( rta );
    }

    function getUser(){
      userService.getUser( 1007 )
      .then( rta )
      .catch( rta );
    }

    function createUser(){
      userService.createUser({
        email: "nico@as.co",
        password: "123456",
        password_confirmation: "123456",
        name: "Nicolas",
        lang: 'en',
        type: 1,
      })
      .then( rta )
      .catch( rta );
    }

    function editUserPatch(){
      userService.editUserPatch( 1007, {
        email: "nicolas.molina.monroy@hotmail.com",
      })
      .then( rta )
      .catch( rta );
    }

    function forgotPassword(){
      userService.forgotPassword("nicolas.molina.monroy@hotmail.com")
      .then( rta )
      .catch( rta );
    }

    function deleteUser(){
      userService.deleteUser( 1008 )
      .then( rta )
      .catch( rta );
    }

    function invitedUser(){
      userService.invitedUser({
        user_id: 1007,
        email: "nicolas.molina.monroy@gmail.com",
        message: "Try this ;)"
      })
      .then( rta )
      .catch( rta );
    }

    function allSponsorships(){
      sponsorshipService.allSponsorships()
      .then( rta )
      .catch( rta );
    }

    function getSponzorship(){
      sponsorshipService.getSponzorship( 12 )
      .then( rta )
      .catch( rta );
    }

    function sponzorshipByOrganizer(){
      sponsorshipService.sponzorshipByOrganizer( 1002 )
      .then( rta )
      .catch( rta );
    }

    function sponzorshipBySponzor(){
      sponsorshipService.sponzorshipBySponzor( 1002 )
      .then( rta )
      .catch( rta );
    }

    function createSponzorship(){
      sponsorshipService.createSponzorship({
        sponzor_id: 1002,
        perk_id: 18,
        event_id: 1018,
        organizer_id: 1003,
        status: 0,
        cause: 'YOLO'
      })
      .then( rta )
      .catch( rta );
    }

    function deleteSponzorship(){
      sponsorshipService.deleteSponzorship( 31 )
      .then( rta )
      .catch( rta );
    }

    function editSponzorshipPatch(){
      sponsorshipService.editSponzorshipPatch( 32, {
        cause: 'as'
      })
      .then( rta )
      .catch( rta );
    }

    function editSponzorshipPut(){
      sponsorshipService.editSponzorshipPut( 32, {
        cause: 'as'
      })
      .then( rta )
      .catch( rta );
    }

    function allPerkTasks(){
      perkTaskService.allPerkTasks()
      .then( rta )
      .catch( rta );
    }

    function getPerkTask(){
      perkTaskService.getPerkTask(11)
      .then( rta )
      .catch( rta );
    }

    function createPerkTask(){
      perkTaskService.createPerkTask({
        user_id: 1007,
        event_id: 1018,
        perk_id: 18,
        title: "Tarea",
        description: "Bla bla",
        type: 0,
        status: 0
      })
      .then( rta )
      .catch( rta );
    }

    function deletePerkTask(){
      perkTaskService.deletePerkTask(35)
      .then( rta )
      .catch( rta );
    }

    function editPerkTaskPatch(){
      perkTaskService.editPerkTaskPatch(36, {
        title: 'asas'
      })
      .then( rta )
      .catch( rta );
    }

    function editPerkTaskPut(){
      perkTaskService.editPerkTaskPut(36, {
        title: 'asas'
      })
      .then( rta )
      .catch( rta );
    }

    function getPerkTaskByOrganizer(){
      perkTaskService.getPerkTaskByOrganizer(1007)
      .then( rta )
      .catch( rta );
    }

    function allPerks(){
      perkService.allPerks()
      .then( rta )
      .catch( rta );
    }

    function getPerk(){
      perkService.getPerk(3)
      .then( rta )
      .catch( rta );
    }

    function createPerk(){
      perkService.createPerk({
        id_event: 1018,
        reserved_quantity: 0,
        kind: 'Food',
        total_quantity: 1,
        usd: 1
      })
      .then( rta )
      .catch( rta );
    }

    function deletePerk(){
      perkService.deletePerk( 55 )
      .then( rta )
      .catch( rta );
    }

    function editPerkPatch(){
      perkService.editPerkPatch( 56, {
        kind: 'sd',
      })
      .then( rta )
      .catch( rta );
    }

    function allEventTypes(){
      eventTypeService.allEventTypes()
      .then( rta )
      .catch( rta );
    }

    function getEventType(){
      eventTypeService.getEventType(1)
      .then( rta )
      .catch( rta );
    }

    function allCategories() {
      categoryService.allCategories()
      .then( rta )
      .catch( rta );
    }

    function getCategory(){
      categoryService.getCategory(2)
      .then( rta )
      .catch( rta );
    }

    function allEvents(){
      eventService.allEvents()
      .then( rta )
      .catch( rta );
    }

    function getEvent(){
      eventService.getEvent(1002)
      .then( rta )
      .catch( rta );
    }

    function createEvent(){
      eventService.createEvent({
        title: "Test Event",
        location: "event",
        location_reference: "referencia",
        description: "Una prueba",
        starts: "2010-01-01 00:00:00",
        ends: "2010-01-01 00:00:00",
        image: "http://i.imgur.com/t8YehGM.jpg",
        privacy: 1,
        lang: "es",
        organizer: 1007,
        category: 1,
        type: 1
      })
      .then( rta )
      .catch( rta );
    }

    function deleteEvent(){
      eventService.deleteEvent(1044)
      .then( rta )
      .catch( rta );
    }

    function editEventPatch(){
      eventService.editEventPatch(1045, {
        title: "Test Event 2",
      })
      .then( rta )
      .catch( rta );
    }

    function editEventPut(){
      eventService.editEventPut(1045, {
        title: "Test Event 2",
      })
      .then( rta )
      .catch( rta );
    }
  }
})();
/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .run(run);

  function run($ionicPlatform, $translate, $cordovaGlobalization, $ionicPopup, $ionicDeploy, utilsService, $cordovaToast, $ionicAnalytics, $localStorage, userAuthService, notificationService, BackendVariables ) {
    

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
      
      activateNotifications();
      checkForUpdates();
      chooseLanguage();
      ionicAnalytics();
    });
    
    function activateNotifications() {
      if(userAuthService.checkSession()){
         notificationService.activate();
         userAuthService.refresh();
      }
    }

    function ionicAnalytics(){
      $ionicAnalytics.register();
      $ionicAnalytics.setGlobalProperties({
        app_version_number: BackendVariables.version,
        channel: BackendVariables.channel,
        day_of_week: (new Date()).getDay()
      });
    }


    function chooseLanguage(){

      if(!checkChooseLang()){
        $cordovaGlobalization.getPreferredLanguage()
        .then( complete )
        .catch( failed );
      }else{
        checkForUpdates();
      }

      function complete( language ){
        var lang = (language.value).split("-")[0];
        var messages = {
          'es': '¿Quieres cambiar el lenguaje a Español?',
          'en': ' Do you want changue the language to English?',
          'pt': '¿Você quer mudar a língua para Português?'
        };
        $ionicPopup.confirm({
          title: 'Language',
          template: '<p class="text-center">' + messages[lang] + '</p>'
        })
        .then(function( rta ){
          if(rta){
            $translate.use( lang );
          }else{
            $translate.use("en");
          }
          $localStorage.chooseLang = true;
        })
        .then( checkForUpdates );
        
      }

      function failed( error ){
        $translate.use("en");
      }
    }

    function checkChooseLang(){
      if(angular.isDefined($localStorage.chooseLang)){
        return true;
      }
      return false;
    }

    function checkForUpdates(){
      $ionicDeploy.setChannel(BackendVariables.channel);
      $ionicDeploy.check()
      .then( complete );

      function complete( hasUpdate ){
        if (hasUpdate){

          utilsService.confirm({
            title: $translate.instant("MESSAGES.update_title"),
            template: '<p class="text-center">'+ $translate.instant("MESSAGES.update_text") +'</p>'
          })
          .then(function(rta){
            if(rta) doUpdate();
          });
        }
      }
    }

    function doUpdate(){
      utilsService.showLoad();
      $ionicDeploy.update()
      .then( complete )
      .catch( failed );

      function complete(){
        utilsService.hideLoad();
        $cordovaToast.showShortBottom($translate.instant("MESSAGES.update_success"));
      }

      function failed(){
        utilsService.hideLoad();
        utilsService.alert();
      }
    }
  }

})();
