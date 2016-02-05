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
    //Feature areas
    'app.users',
    'app.dashboard-organizer',
    'app.dashboard-sponzor',
    'app.events-organizer',
    'app.events-sponzor',
    'app.sponsors-organizer',
    'app.tasks-organizer',
    'app.tasks-sponsor',
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
        templateUrl: 'app/users/tests.html',
        controller: 'TestsController as test',
      })*/

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
        url: "/addTask/:idEvent/:idPerk/:idOrganizer/:idSponsorship",
        views: {
          'menuContent' :{
            templateUrl: "app/tasks-sponsor/add-task.html",
            controller: "AddTaskSponsorController as addTask"
          }
        }
      })

      .state('sponzor.editTask', {
        url: "/editTask/:id",
        views: {
          'menuContent' :{
            templateUrl: "app/tasks-sponsor/edit-task.html",
            controller: "EditTaskSponsorController as editTask"
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
    .run(run);

  function run($ionicPlatform, $translate, $cordovaGlobalization, $ionicPopup, $ionicDeploy, utilsService, $cordovaToast, $ionicAnalytics, $localStorage ) {
    

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

      checkForUpdates();
      //chooseLanguage();
      ionicAnalytics();
    });

    function ionicAnalytics(){
      $ionicAnalytics.register();
      $ionicAnalytics.setGlobalProperties({
        app_version_number: '1.0.6',
        type: 'develop',
        day_of_week: (new Date()).getDay()
      });
    }

    function chooseLanguage(){

      if(!checkChooseLang()){
        $cordovaGlobalization.getPreferredLanguage()
        .then( complete )
        .catch( failed );
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
        });
        
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
      $ionicDeploy.setChannel("production");
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
      url_web: "https://sponzor.me/",
    })
    .value('AMAZON',{
      'AMAZONSECRET': 'RlzqEBFUlJW/8YGkeasfmTZRLTlWMWwaBpJNBxu6',
      'AMAZONKEY': 'AKIAJDGUKWK3H7SJZKSQ',
      'AMAZONBUCKET': 'sponzormewebappimages',
      'AMAZONBUCKETREGION': 'us-west-2',
      'AMAZONBUCKETURL': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/',
    });
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
        var events = preparateData( response.data.events );
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
        return $q.when( preparateData(response.data.data) );

        function preparateData( data ){
          var event = data.event;
          event.image = (event.image == "event_dummy.png") ? 'img/banner.jpg' : event.image;
          event.category = data.category.length === 0 ? event.category : data.category[0];
          event.type = data.type.length === 0 ? event.type : data.type[0];
          event.organizer = data.organizer.length === 0 ? event.organizer : data.organizer[0];
          event.organizer.image = (event.organizer.image == "organizer_sponzorme.png") ? 'img/photo.png' : event.organizer.image;
          event.sponzorships = data.sponzorships;
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
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
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
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
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
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
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

      /*function groupByEvent( data ){
        //http://underscorejs.org/#groupBy
        var groups = _.groupBy( data, 'eventTitle' );
        
        function parseEvent( value, key ){
          return {
            title: key,
            tasks: value
          }
        }
        //http://underscorejs.org/#map
        return _.map( groups , parseEvent);
      }*/
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
        return $q.when( response.data.PerkTask );
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
        return $q.when( response.data.user );
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
      createUserInterest: createUserInterest
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
  angular.module('app.events-organizer', []);
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
  angular.module('app.tasks-sponsor', []);
})();
(function() {
  'use strict';
  angular.module('app.widgets', []);
})();
(function() {
  'use strict';
  angular.module('app.events-sponzor', []);
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
    'userService',
    'utilsService',
    'sponsorshipService',
    '$q'
  ];

  function HomeOrganizerController( $localStorage, userService , utilsService, sponsorshipService, $q) {

    var vm = this;
    //Atributes
    vm.count_events = 0;
    vm.count_sponsors = 0;
    vm.count_comunity = 0;
    vm.userAuth = $localStorage.userAuth;

    activate();

    ////////////

    function activate(){
      getData();
    }

    function getData(){
      utilsService.showLoad();

      var promises = [
        userService.getUser( vm.userAuth.id ),
        sponsorshipService.sponzorshipByOrganizer( vm.userAuth.id )
      ];

      $q.all( promises )
        .then( complete )
        .catch( failed );

        function complete( data ){
          utilsService.hideLoad();
          getEvents( data[0]  );
          getSponzorships( data[1] );
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

    function getEvents( user ){
      vm.count_events = user.events.filter( filterDate ).length;
      vm.count_comunity = user.comunity_size || 0;

      function filterDate( item ){
        return moment(item.ends).isAfter(new Date());
      }
    }

    function getSponzorships( sponsors ){
      vm.count_sponsors = sponsors.length;
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
    'userService',
    'sponsorshipService',
    'perkTaskService',
    '$ionicHistory'
  ];

  function MenuOrganizerCtrl( $state, $localStorage, $rootScope, userService, sponsorshipService, perkTaskService, $ionicHistory ) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.count_events = 0;
    vm.count_sponsors = 0;
    vm.count_tasks = 0;
    //Funcions
    vm.logout = logout;

    activate();
    ////////////

    function logout(){
      $localStorage.$reset();
      $state.go('signin');
      $ionicHistory.clearCache();
    }

    function activate(){
      $rootScope.$on('Menu:count_events', renderCountEvents);
      $rootScope.$on('Menu:count_sponsors', renderCountSponsors);
      $rootScope.$on('Menu:count_tasks', renderCountTasks);
      getEvents();
      getSponsors();
      getTasks();
    }

    function renderCountEvents( event, total ){
      vm.count_events = total;
    }

    function renderCountSponsors( event, total ){
      vm.count_sponsors = total;
    }

    function renderCountTasks(event, total ){
      vm.count_tasks = total;
    }

    function getEvents(){
      userService.getUser( vm.userAuth.id )
        .then( complete );
        //.catch( failed );

        function complete( user ){
          vm.count_events = user.events.filter( filterDate ).length;
        }
        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function filterDate( item ){
      return moment(item.ends).isAfter(new Date());
    }

    function getSponsors(){
      sponsorshipService.sponzorshipByOrganizer( vm.userAuth.id )
        .then( complete );
        //.catch( failed );

        function complete( sponsors ){
          vm.count_sponsors = sponsors.length;
        }

        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function getTasks(){
      perkTaskService.getPerkTaskByOrganizer( vm.userAuth.id )
        .then( complete );
        //.catch( failed );

        function complete( tasks ){
          vm.count_tasks = tasks.filter( filterByDone ).length;
        }

        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function filterByDone( item ){
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
    .module('app.dashboard-sponzor')
    .controller('HomeSponzorController', HomeSponzorController);

  HomeSponzorController.$inject = [
    '$localStorage',
    'eventService',
    'utilsService',
    '$scope'
  ];

  function HomeSponzorController(  $localStorage, eventService, utilsService, $scope) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();

    ////////////

    function activate(){
      getEvents();
    }

    function getEvents(){
      utilsService.showLoad();
      eventService.allEvents( )
        .then( complete )
        .catch(failed );

        function complete( events ){
          utilsService.hideLoad();
          vm.events = events.filter( filterDate );
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

    function doRefresh(){
      eventService.allEvents( )
        .then( complete );
        //.catch(failed );

        function complete( events ){
          vm.events = events.filter( filterDate );
          $scope.$broadcast('scroll.refreshComplete');
        }

        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function filterDate( item ){
      //return true
      return moment(item.ends).isAfter(new Date());
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
    'sponsorshipService',
    '$rootScope',
    '$ionicHistory'
  ];

  function MenuSponzorCtrl( $state, $localStorage, sponsorshipService, $rootScope, $ionicHistory ) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.count_following = 0;
    vm.count_sponsoring = 0;
    //Funcions
    vm.logout = logout;
    
    activate();
    ////////////

    function activate(){
      $rootScope.$on('Menu:count_following', renderCountFollowing);
      $rootScope.$on('Menu:count_sponsoring', renderCountSponsoring);
      getCounts();
    }

    function renderCountFollowing(event, total ){
      vm.count_following = total;
    }

    function renderCountSponsoring(event, total ){
      vm.count_sponsoring = total;
    }

    function logout(){
      $localStorage.$reset();
      $state.go('signin');
      $ionicHistory.clearCache();
    }

    function getCounts(){
      sponsorshipService.sponzorshipBySponzor( vm.userAuth.id )
        .then( complete );
        //.catch( failed );

        function complete( events ){
          vm.count_following = events.filter( filterByPending ).length;
          vm.count_sponsoring = events.filter( filterByAccepted ).length;
        }

        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function filterByPending( item ){
      return item.status != '1';
    }

    function filterByAccepted( item ){
      return item.status == '1';
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
    'userService',
    'utilsService',
    '$cordovaDatePicker',
    '$cordovaCamera',
    'eventTypeService',
    'eventService',
    'perkService',
    '$ionicModal',
    '$cordovaToast',
    '$ionicHistory',
    'imgurService',
    '$q',
    '$state'
  ];

  function AddEventController( $scope, $translate, $localStorage, userService , utilsService, $cordovaDatePicker, $cordovaCamera, eventTypeService, eventService, perkService, $ionicModal, $cordovaToast, $ionicHistory, imgurService, $q, $state) {

    var vm = this;
    vm.newEvent = {};
    vm.newSponsor = {};
    vm.isNewSponsor = true;
    vm.eventTypes = [];
    vm.sponsors = [];
    vm.userAuth = $localStorage.userAuth;
    vm.modalSponsor = null;
    vm.imageURI = null;

    vm.clickedStartDate = clickedStartDate;
    vm.clickedEndDate = clickedEndDate;
    vm.clickedStartTime = clickedStartTime;
    vm.clickedEndTime = clickedEndTime;
    vm.getPhoto = getPhoto;
    vm.createEvent = createEvent;
    vm.openModalSponsor = openModalSponsor;
    vm.closeModalSponsor = closeModalSponsor;
    vm.createSponsor = createSponsor;
    vm.editSponsor = editSponsor;
    vm.deleteSponsor = deleteSponsor;
    vm.submitSponsor = submitSponsor;

    activate();

    ////////////

    function activate(){

      vm.sponsors = [];
      vm.newEvent.access = true;
      /*vm.newEvent.starttime = "13:00:00";
      vm.newEvent.start = "2016-01-09";
      vm.newEvent.endtime = "15:00:00";
      vm.newEvent.end = "2016-01-09";*/

      $ionicModal.fromTemplateUrl('app/events-organizer/sponsor-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalSponsor = modal;
      });
      
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
      var Camera = Camera || null;
      var CameraPopoverOptions = CameraPopoverOptions || null;

      var options = {
        quality: 100,
        destinationType: Camera ? Camera.DestinationType.DATA_URL : null,
        sourceType: Camera ? Camera.PictureSourceType.PHOTOLIBRARY : null,
        allowEdit: false,
        encodingType: Camera ? Camera.EncodingType.JPEG : null,
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
          createPerks( event.id );
          vm.newEvent = {};
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $ionicHistory.clearCache();
          $state.go("organizer.events.list");
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
        type: vm.newEvent.type.id
      }
    }

    /*-------------- Perks --------------*/

    function createPerks( idEvent ){
      var size = vm.sponsors.length;
      for (var i = 0; i < size; i++) {
        var data = vm.sponsors[i];
        data.id_event = idEvent;
        data.reserved_quantity = 0;
        createPerk( data );
      };
    }

    function createPerk( data ){
      return perkService.createPerk( data )
        .then( complete );
        //.catch( failed );

        function complete( response ){
          console.log( response );
        }

        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function openModalSponsor(){
      vm.modalSponsor.show();
    }

    function closeModalSponsor( form ){
      vm.modalSponsor.hide();
      if (form) utilsService.resetForm( form );
      vm.newSponsor = {};
    } 

    function createSponsor(){
      vm.isNewSponsor = true;
      vm.openModalSponsor();
    }

    function editSponsor( data ){
      vm.isNewSponsor = false;
      vm.newSponsor = data;
      vm.openModalSponsor();
    }

    function addSponsor(){
      vm.sponsors.push( vm.newSponsor );
      vm.closeModalSponsor();
    }

    function deleteSponsor(){
      var index = vm.sponsors.indexOf( vm.newSponsor );
      vm.sponsors.splice(index, 1);
      vm.closeModalSponsor();
    }

    function updateSponsor(){
      vm.closeModalSponsor();
    }

    function submitSponsor( form ){
      if(vm.isNewSponsor){
        addSponsor();
        utilsService.resetForm( form );
      }else{
        updateSponsor();
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
    'perkService',
    '$ionicModal',
    '$cordovaToast',
    '$ionicHistory',
    'imgurService',
    '$q',
    '$stateParams'
  ];

  function EditEventController( $scope, $translate, $localStorage, userService , utilsService, $cordovaDatePicker, $cordovaCamera, eventTypeService, eventService, perkService, $ionicModal, $cordovaToast, $ionicHistory, imgurService, $q, $stateParams) {

    var vm = this;
    vm.newEvent = {};
    vm.newSponsor = {};
    vm.isNewSponsor = true;
    vm.eventTypes = [];
    vm.sponsors = [];
    vm.userAuth = $localStorage.userAuth;
    vm.modalSponsor = null;
    vm.imageURI = null;

    vm.clickedStartDate = clickedStartDate;
    vm.clickedEndDate = clickedEndDate;
    vm.clickedStartTime = clickedStartTime;
    vm.clickedEndTime = clickedEndTime;
    vm.getPhoto = getPhoto;
    vm.updateEvent = updateEvent;
    vm.openModalSponsor = openModalSponsor;
    vm.closeModalSponsor = closeModalSponsor;
    vm.createSponsor = createSponsor;
    vm.editSponsor = editSponsor;
    vm.deleteSponsor = deleteSponsor;
    vm.submitSponsor = submitSponsor;

    activate();

    ////////////

    function activate(){

      vm.sponsors = [];
      /*vm.newEvent.starttime = "00:00:00";
      vm.newEvent.start = "2015-12-15";
      vm.newEvent.endtime = "00:00:00";
      vm.newEvent.end = "2015-12-24";*/

      $ionicModal.fromTemplateUrl('app/events-organizer/sponsor-edit-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalSponsor = modal;
      });
      getEvent();
    }

    function getEvent(){
      utilsService.showLoad();
      eventService.getEvent( $stateParams.id )
        .then( complete )
        .catch( failed );

        function complete( event ){
          utilsService.hideLoad();
          vm.newEvent = event;
          vm.newEvent.start = moment(event.starts).format('YYYY-MM-DD');
          vm.newEvent.starttime = moment(event.starts).format('HH:mm:ss');
          vm.newEvent.end = moment(event.ends).format('YYYY-MM-DD');
          vm.newEvent.endtime = moment(event.ends).format('HH:mm:ss');
          vm.newEvent.access = vm.newEvent.privacy == '1' ? true : false;
          vm.sponsors = vm.newEvent.perks;
          getEventsTypes();
        }

        function failed( error ){
          utilsService.hideLoad();
        }
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

      var Camera = Camera || null;
      var CameraPopoverOptions = CameraPopoverOptions || null;

      var options = {
        quality: 100,
        destinationType: Camera ? Camera.DestinationType.DATA_URL : null,
        sourceType: Camera ? Camera.PictureSourceType.PHOTOLIBRARY : null,
        allowEdit: false,
        encodingType: Camera ? Camera.EncodingType.JPEG : null,
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
          .then( createPerks )
          .then( complete )
          .catch( failed );
      }else{
        eventService.editEventPatch( vm.newEvent.id, preparateData() )
          .then( createPerks )
          .then( complete )
          .catch( failed );
      }

        function updateImage( image ){
          return eventService.editEventPatch( vm.newEvent.id, preparateData() );
        }

        function complete( event ) {
          utilsService.hideLoad();
          utilsService.resetForm( form );
          vm.newEvent = {};
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $ionicHistory.clearCache();
          $ionicHistory.goBack();
          $cordovaToast.showShortBottom($translate.instant("MESSAGES.succ_event_mess"));
        }

        function createPerks( event ){
          return getPerksPromises( event.id );
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
          for (var i = 0; i < vm.eventTypes.length; i++) {
            if(vm.eventTypes[i].id == vm.newEvent.type.id){
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
        type: vm.newEvent.type.id
      }
    }

    /*-------------- Perks --------------*/

    function getPerksPromises( idEvent ){
      var promises = [];
      var size = vm.sponsors.length;
      for (var i = 0; i < size; i++) {
        var data = vm.sponsors[i];
        if(data.id){
          promises.push( perkService.editPerkPatch( data.id, data ) );
        }else{
          data.id_event = idEvent;
          data.reserved_quantity = 0;
          promises.push( perkService.createPerk( data ) );
        }
      };
      return $q.all( promises );
    }

    function openModalSponsor(){
      vm.modalSponsor.show();
    }

    function closeModalSponsor( form ){
      vm.modalSponsor.hide();
      if (form) utilsService.resetForm( form );
      vm.newSponsor = {};
    } 

    function createSponsor(){
      vm.isNewSponsor = true;
      vm.openModalSponsor();
    }

    function editSponsor( data ){
      vm.isNewSponsor = false;
      vm.newSponsor = data;
      vm.newSponsor.total_quantity = parseInt( vm.newSponsor.total_quantity );
      vm.newSponsor.usd = parseInt( vm.newSponsor.usd );
      vm.openModalSponsor();
    }

    function addSponsor(){
      vm.sponsors.push( vm.newSponsor );
      vm.closeModalSponsor();
    }

    function deleteSponsor(){
      utilsService.confirm({
        template: 'Esta seguro de eliminar este tipo de patronicio.'
      })
      .then( complete );

      function complete( rta ){
        if(rta){
          var index = vm.sponsors.indexOf( vm.newSponsor );
          if(vm.newSponsor.id){
            deletePerk( index, vm.newSponsor.id );
          }else{
            vm.sponsors.splice(index, 1);
            vm.closeModalSponsor();
          }
        }else{
          vm.closeModalSponsor();
        }
      }
    }

    function deletePerk(index, id){
      perkService.deletePerk( id )
        .then( complete )
        .catch( failed );

        function complete( response ){
          vm.sponsors.splice(index, 1);
          vm.closeModalSponsor();
        }

        function failed( error ){
          vm.closeModalSponsor();
        }
    }

    function updateSponsor(){
      vm.closeModalSponsor();
    }

    function submitSponsor( form ){
      if(vm.isNewSponsor){
        addSponsor();
        utilsService.resetForm( form );
      }else{
        updateSponsor();
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
    '$localStorage'
  ];

  function EventDetailOrganizerController( $scope, eventService , utilsService, $stateParams, $state, sponsorshipService, $ionicPopup, $ionicModal, $ionicActionSheet, $cordovaSocialSharing, $cordovaCalendar, $ionicSideMenuDelegate, $ionicHistory, $cordovaToast, $translate, BackendVariables, perkTaskService, $localStorage) {

    var vm = this;
    var popupOptionsSponsorship = null;
    var hideSheet = null;
    vm.optionsActionSheet = [];
    var url = BackendVariables.url_web;
    //Attributes
    vm.event = {};
    vm.deleteEvent = deleteEvent;
    vm.perks = [];
    vm.userAuth = $localStorage.userAuth;

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
      getEvent();
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

    function getEvent(){
      utilsService.showLoad();
      eventService.getEvent( $stateParams.idEvent )
        .then( complete )
        .catch( failed );

        function complete( event ){
          utilsService.hideLoad();
          vm.event = event;
          vm.perks = preparatePerks( vm.event );
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

    function preparatePerks( event ){
      var perks = event.perks;
      for (var i = 0; i < perks.length; i++) {
        perks[i].sponsorships = _.where(event.sponzorships, {perk_id: perks[i].id});
        perks[i].tasks = _.where(event.perk_tasks.filter( filterByTypePerk )  , {perk_id: perks[i].id});
      }
      return perks;
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
        title: "Options",
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

        function complete( sponsorshipRta ){
          utilsService.hideLoad();
          closeOptionsSponsorship();
          vm.sponsorshipSelected.status = sponsorshipRta.status;  
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
          { text: '<i class="icon ion-edit"></i> Edit event' },
          { text: '<i class="icon ion-share"></i> <b>Share</b> This' },
          { text: '<i class="icon ion-calendar"></i> Add to calendar' }
        ],
        destructiveText: '<i class="icon ion-trash-a"></i> Delete event',
        titleText: 'Options',
        cancelText: '<i class="icon ion-close"></i> Cancel',
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

    function newTask( perk ){
      vm.isNewTask = true;
      vm.task.perk_id = perk.id;
      vm.task.event_id = vm.event.id;
      vm.showModalTask();
    }

    function hideModalTask( form ){
      vm.modalTask.hide();
      if (form) utilsService.resetForm( form );
      vm.task = {};
    }

    function editTask( task ){
      vm.isNewTask = false;
      vm.task = task;
      vm.showModalTask();
    }

    function createTask( form ){
      perkTaskService.createPerkTask( preparateTask() )
        .then( complete )
        .catch( failed );

        function complete( data ){
          getEvent();
          utilsService.resetForm( form );
          vm.hideModalTask();
        }

        function failed( error ){
          utilsService.resetForm( form );
          vm.hideModalTask();
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
      perkTaskService.deletePerkTask( vm.task.id )
      .then( complete )
      .catch( failed );

      function complete( data ){
        getEvent();
        if( form ) utilsService.resetForm( form );
        vm.hideModalTask();
      }

      function failed( error ){
        vm.hideModalTask();
        if( form ) utilsService.resetForm( form );
        utilsService.alert({
          template: error.message
        });
      }
    }

    function updateTask( form ){
      perkTaskService.editPerkTaskPatch( vm.task.id, vm.task )
      .then( complete )
      .catch( failed );

      function complete( data ){
        getEvent();
        utilsService.resetForm( form );
        vm.hideModalTask();
      }

      function failed( error ){
        utilsService.resetForm( form );
        vm.hideModalTask();
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
    .module('app.events-organizer')
    .controller('EventListController', EventListController);

  EventListController.$inject = [
    '$localStorage',
    'userService',
    'utilsService',
    '$scope',
    '$rootScope'
  ];

  function EventListController( $localStorage, userService , utilsService, $scope, $rootScope) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;

    activate();

    ////////////

    function activate(){
      getEvents();
    }

    function getEvents(){
      utilsService.showLoad();
      userService.getUser( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          utilsService.hideLoad();
          vm.showEmptyState = false;
          vm.events = user.events.filter( filterDate );
          vm.showEmptyState = vm.events.length == 0 ? true : false;
          $rootScope.$broadcast('Menu:count_events', vm.events.length);
        }

        function failed( error ){
          utilsService.hideLoad();
          vm.showEmptyState = true;;
        }
    }

    function doRefresh(){
      userService.getUser( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.events = user.events.filter( filterDate );
          vm.showEmptyState = vm.events.length == 0 ? true : false;
          $rootScope.$broadcast('Menu:count_events', vm.events.length);
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
    '$rootScope'
  ];

  function PastEventsController( $localStorage, userService , utilsService, $scope, $rootScope) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;

    activate();

    ////////////

    function activate(){
      getEvents();
    }

    function getEvents(){
      utilsService.showLoad();
      userService.getUser( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          utilsService.hideLoad();
          vm.events = user.events.filter( filterDate );
          vm.showEmptyState = vm.events.length == 0 ? true : false;
          $rootScope.$broadcast('Menu:count_events', user.events.length - vm.events.length);
        }

        function failed( error ){
          utilsService.hideLoad();
          vm.showEmptyState = true;
        }
    }

    function doRefresh(){
      userService.getUser( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.events = user.events.filter( filterDate );
          $rootScope.$broadcast('Menu:count_events', user.events.length - vm.events.length);
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
    .controller('SponsorshipDetailController', SponsorshipDetailController);

  SponsorshipDetailController.$inject = [
    '$localStorage',
    'sponsorshipService',
    'utilsService',
    '$ionicPopup',
    '$stateParams',
    '$ionicHistory'
  ];

  function SponsorshipDetailController( $localStorage, sponsorshipService , utilsService, $ionicPopup, $stateParams, $ionicHistory) {

    var vm = this;
    //Atributes
    vm.sponsorship = {};
    vm.userAuth = $localStorage.userAuth;
    vm.showEmptyState = false;
    //Accions
    vm.sponsorAccept = sponsorAccept;
    vm.sponsorReject = sponsorReject;

    activate();

    ////////////

    function activate(){
      getSponsorship();
    }

    function getSponsorship(){
      utilsService.showLoad();
      sponsorshipService.getSponzorship( $stateParams.id )
        .then( complete )
        .catch( failed );

        function complete( sponsorship ){
          utilsService.hideLoad();
          vm.sponsorship = sponsorship;
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }


    function sponsorAccept(){
      confirmPopup('Are you sure?', 'In accept the sponsor')
        .then( complete );

        function complete( rta ){
          if( rta ) updateSponsorship( 1 ); //Accepted 
        }
    }

    function sponsorReject(){
      confirmPopup('Are you sure?', 'In reject the sponsor')
        .then( complete );

        function complete( rta ){
          if( rta ) updateSponsorship( 2 ); //Deny
        }
    }

    function confirmPopup(title, template){
      return $ionicPopup.confirm({
        title: title,
        template: template
      });
    }

    function updateSponsorship( status ){
      utilsService.showLoad();
      var sponsorship = angular.copy( vm.sponsorship );
      sponsorship.status = status;
      sponsorshipService.editSponzorshipPut( sponsorship.id, sponsorship )
        .then( complete )
        .catch( failed );

        function complete( sponsorship ){
          utilsService.hideLoad();
          vm.sponsorship.status = sponsorship.status;
          $ionicHistory.clearCache();
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
    .controller('SponzorListController', SponzorListController);

  SponzorListController.$inject = [
    '$localStorage',
    'sponsorshipService',
    'utilsService',
    '$ionicPopover',
    '$ionicPopup',
    '$ionicScrollDelegate',
    '$scope',
    '$rootScope',
    '$ionicHistory'
  ];

  function SponzorListController( $localStorage, sponsorshipService , utilsService, $ionicPopover, $ionicPopup, $ionicScrollDelegate, $scope, $rootScope, $ionicHistory) {

    var vm = this;
    var eventsPopover = null;
    //Atributes
    vm.search = {};
    vm.sponsors = [];
    vm.events = [];
    vm.results = [];
    vm.userAuth = $localStorage.userAuth;
    vm.showEmptyState = false;
    //Accions
    vm.filterByEvent = filterByEvent;
    vm.showFilter = showFilter;
    vm.sponsorAccept = sponsorAccept;
    vm.sponsorReject = sponsorReject;
    vm.doRefresh = doRefresh;

    activate();

    ////////////

    function activate(){
      $ionicPopover.fromTemplateUrl('app/sponsors-organizer/events-popover.html', {
        scope: $scope
      }).then(function(popover) {
        eventsPopover = popover;
      });
      getSponsors();
    }

    function getSponsors(){
      utilsService.showLoad();
      sponsorshipService.sponzorshipByOrganizer( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( sponsors ){
          utilsService.hideLoad();
          vm.showEmptyState = true;
          vm.sponsors = sponsors;
          vm.events = getEvents( vm.sponsors );
        }

        function failed( error ){
          utilsService.hideLoad();
          vm.showEmptyState = true;
        }
    }

    function getEvents( sponsors ){
      return sponsors
        .filter( filterByEvent )
        .map( mapEvent );

      function filterByEvent( item, pos, array ){
        var position;
        for (var i = 0; i < array.length; i++) {
          if(array[i].event_id == item.event_id){
            position = i;
            break;
          }
        }
        return position == pos;
      }

      function mapEvent( item ){
        return {
          title: item.title,
          id: item.event_id
        }
      }
    }

    function showFilter($event) {
      eventsPopover.show($event);
    };

    function closePopover() {
      eventsPopover.hide();
    };

    function filterByEvent( idEvent ){
      vm.search = {};
      if(idEvent) vm.search.event_id = idEvent;
      $ionicScrollDelegate.scrollTop();
      closePopover();
    }

    function sponsorAccept( sponzor ){
      confirmPopup('Are you sure?', 'In the accept the sponsor')
        .then( complete );

        function complete( rta ){
          if( rta ) updateSponsorship( sponzor, 1 ); //Accepted 
        }
    }

    function sponsorReject( sponzor ){
      confirmPopup('Are you sure?', 'In the reject the sponsor')
        .then( complete );

        function complete( rta ){
          if( rta ) updateSponsorship( sponzor, 2 ); //Deny
        }
    }

    function confirmPopup(title, template){
      return $ionicPopup.confirm({
        title: title,
        template: template
      });
    }

    function updateSponsorship( sponzor, status ){
      utilsService.showLoad();
      var sponzorCopy = angular.copy( sponzor );
      sponzorCopy.status = status;
      sponsorshipService.editSponzorshipPut( sponzorCopy.id, sponzorCopy )
        .then( complete )
        .catch( failed );

        function complete( sponzorRta ){
          utilsService.hideLoad();
          sponzor.status = sponzorRta.status;
          $ionicHistory.clearCache();
        }

        function failed( error ){
          utilsService.hideLoad();
        }

    }

    function doRefresh(){
      sponsorshipService.sponzorshipByOrganizer( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( sponsors ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.search = {};
          vm.sponsors = sponsors;
          vm.events = getEvents( vm.sponsors );
          $rootScope.$broadcast('Menu:count_sponsors', vm.sponsors.length);
        }

        function failed( error ){
          vm.showEmptyState = true;
        }
    }
    

  }
})();
/**
* @Controller for Add Task
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.tasks-organizer')
    .controller('AddTaskController', AddTaskController);

  AddTaskController.$inject = [
    '$localStorage',
    'perkTaskService',
    'perkService',
    'userService',
    'utilsService',
    '$ionicHistory'
  ];

  function AddTaskController( $localStorage, perkTaskService, perkService, userService, utilsService, $ionicHistory) {

    var vm = this;
    vm.newTask = {};
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    vm.perks = [];
    vm.createTask = createTask;

    activate();

    ////////////

    function activate(){
      getEvents();
      getPerks();
    }

    function createTask( form ){
      utilsService.showLoad();
      perkTaskService.createPerkTask( preparateData() )
        .then( complete )
        .catch( failed );

        function complete( data ){
          utilsService.hideLoad();
          utilsService.resetForm( form );
          vm.newTask = {};
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $ionicHistory.clearCache();
          $ionicHistory.goBack();
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

    function preparateData(){
      return {
        user_id: vm.userAuth.id,
        event_id: vm.newTask.event.id,
        perk_id: vm.newTask.perk.id,
        title: vm.newTask.title,
        description: vm.newTask.description,
        type: 0,
        status: 0
      }
    }

    function getEvents(){
      utilsService.showLoad();
      userService.getUser( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          utilsService.hideLoad();
          vm.events = user.events;
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

    function getPerks(){
      utilsService.showLoad();
      perkService.allPerks()
        .then( complete )
        .catch( failed );

        function complete( perks ){
          utilsService.hideLoad();
          vm.perks = perks;
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }
    

  }
})();
/**
* @Controller for Add Task
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.tasks-organizer')
    .controller('EditTaskController', EditTaskController);

  EditTaskController.$inject = [
    '$localStorage',
    'perkTaskService',
    'utilsService',
    '$stateParams',
    '$ionicHistory'
  ];

  function EditTaskController( $localStorage, perkTaskService, utilsService, $stateParams, $ionicHistory) {

    var vm = this;
    vm.newTask = {};
    vm.userAuth = $localStorage.userAuth;
    vm.editTask = editTask;
    vm.deleteTask = deleteTask;

    activate();

    ////////////

    function activate(){
      getTask( $stateParams.id );
    }

    function getTask( idTask ){
      utilsService.showLoad();

      perkTaskService.getPerkTask( idTask )
        .then( complete )
        .catch( failed );

        function complete( task ){

          utilsService.hideLoad();
          vm.newTask = task;
          vm.newTask.status = task.status == '1' ? true : false ;
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

    

    function editTask( form ){
      utilsService.showLoad();
      perkTaskService.editPerkTaskPatch( $stateParams.id, preparateData() )
        .then( complete )
        .catch( failed );

        function complete( data ){
          utilsService.hideLoad();
          utilsService.resetForm( form );
          vm.newTask = {};
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $ionicHistory.clearCache();
          $ionicHistory.goBack();
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

     function deleteTask(){
      utilsService.showLoad();
      perkTaskService.deletePerkTask( $stateParams.id )
        .then( complete )
        .catch( failed );

        function complete( data ){
          vm.newTask = {};
          utilsService.hideLoad();
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $ionicHistory.clearCache();
          $ionicHistory.goBack();
        }

        function failed( error ){
          utilsService.hideLoad();
          utilsService.alert({
            template: error.message
          });
        }
    }

    function preparateData(){
      return {
        user_id: vm.userAuth.id,
        event_id: vm.newTask.event.id,
        perk_id: vm.newTask.perk.id,
        title: vm.newTask.title,
        description: vm.newTask.description,
        type: 0,
        status: vm.newTask.status ? "1" : "0"
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
    'utilsService',
    '$scope',
    '$rootScope'
  ];

  function TaskListController( $localStorage, perkTaskService , utilsService, $scope, $rootScope) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.tasks = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();

    ////////////

    function activate(){
      getTasks();
    }

    function getTasks(){
      utilsService.showLoad();
      perkTaskService.getPerkTaskByOrganizer( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( tasks ){
          utilsService.hideLoad();
          vm.tasks = groupByEvent( tasks );
          var total = tasks.filter( filterByDone ).length;
          vm.showEmptyState = vm.tasks.length == 0 ? true : false;
          $rootScope.$broadcast('Menu:count_tasks', total);
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

    function doRefresh(){
      perkTaskService.getPerkTaskByOrganizer( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( tasks ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.tasks = groupByEvent( tasks );
          var total = tasks.filter( filterByDone ).length;
          $rootScope.$broadcast('Menu:count_tasks', total);
        }

        function failed( error ){
          console.log( error );
        }
    }

    function groupByEvent( data ){
      //http://underscorejs.org/#groupBy
      var groups = _.groupBy( data, 'eventTitle' );
      
      function parseEvent( value, key ){
        return {
          title: key,
          tasks: value
        }
      }
      //http://underscorejs.org/#map
      return _.map( groups , parseEvent);
    }

    function filterByDone( item ){
      return item.status != '1';
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
    '$q'
  ];

  function FormInterestsController( userService, $state , utilsService, $localStorage, categoryService, userInterestService, $q) {

    var vm = this;
    var memorize = [];
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.categories = [];
    vm.categorySelected = null;
    //Funcions
    vm.updateInterests = updateInterests;
    vm.getCategory = getCategory;
    vm.isCategorySelected = isCategorySelected;
    
    activate();

    ////////////
    
    function activate(){
      getCategories();
    }

    function updateInterests(){
      utilsService.showLoad();
      var interests = getInterestCheck();
      var promises = [];
      for (var i = 0; i < interests.length; i++) {
        promises.push( createUserInterest( interests[i] ) );
      };

      $q.all( promises )
        .then( complete )
        .catch( failed );

      function complete( results ){
        utilsService.hideLoad();
        redirectTutorial();
      }

      function failed( error ){
        utilsService.hideLoad();
        console.log( error );
      }

    }

    function createUserInterest( interest ){
      return userInterestService.createUserInterest({
        interest_id: interest.id_interest,
        user_id: vm.userAuth.id
      })
    }

    function getInterestCheck( data ){
      return vm.categories
        .filter( ByInterest )
        .map( mapInterest )
        .reduce( mergeArrays, [] )
        .filter( interestCheck );

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
          console.log( error );
        }
    }

    function getCategory( category ){
      
      toggleCategory( category );
      if(memorize.indexOf( category.id ) == -1){
        utilsService.showLoad();
        categoryService.getCategory( category.id )
          .then( complete )
          .catch( failed );

          function complete( categoryRta ){
            utilsService.hideLoad();
            category.interests = categoryRta.interests;
            memorize.push( category.id );
          }

          function failed( error ){
            utilsService.hideLoad();
            console.log( error );
          }
      }
    }

    function toggleCategory( category ){
      if(isCategorySelected(category)){
        vm.categorySelected = null;
      }else{
        vm.categorySelected = category;
      }
    }

    function isCategorySelected(category){
      return vm.categorySelected == category;
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
    '$localStorage'
  ];

  function FormProfileController( $translate, userService, $state , utilsService, $localStorage) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth || {};
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
          $localStorage.userAuth = utilsService.updateUserAuth( user );
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
        location: vm.userAuth.location, 
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
    '$localStorage'
  ];

  function InviteUsersController( userService, utilsService, $localStorage) {

    var vm = this;
    vm.friend = {};
    vm.userAuth = $localStorage.userAuth;
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
    '$ionicAnalytics'
  ];

  function LoginController( $translate, userService, $localStorage, $state , utilsService, $base64, $ionicUser, $ionicAnalytics) {

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
        saveUser();
        validateTutorial();
        
        var user = Ionic.User.current();
        if (!user.id) {
          user.id = vm.userResponse.id;
          user.set('email', vm.user.email);
          user.set('type', vm.user.type);
        }
        user.save();
        vm.user = {};
        $ionicAnalytics.register(); 
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
      $localStorage.userAuth = utilsService.updateUserAuth(vm.userResponse);
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
    '$cordovaToast'
  ];

  function ProfileController( userService, utilsService, $cordovaCamera, $localStorage, $q, imgurService, $cordovaToast) {

    var vm = this;
    vm.userAuth = $localStorage.userAuth;
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
          vm.userAuth = user;
          vm.userAuth.age = parseInt( vm.userAuth.age );
          $localStorage.userAuth = utilsService.updateUserAuth( vm.userAuth );
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
    '$base64'
  ];

  function RegisterController( $translate, $state, userService, utilsService, $localStorage, $base64 ) {

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
        $localStorage.userAuth = user;
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
* @Controller for Add Task
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.tasks-sponsor')
    .controller('AddTaskSponsorController', AddTaskSponsorController);

  AddTaskSponsorController.$inject = [
    '$localStorage',
    'perkTaskService',
    'perkService',
    'userService',
    'utilsService',
    '$state',
    '$stateParams',
    '$ionicHistory',
    'tasksSponsorService'
  ];

  function AddTaskSponsorController( $localStorage, perkTaskService, perkService, userService, utilsService, $state, $stateParams, $ionicHistory, tasksSponsorService) {

    var vm = this;
    vm.newTask = {};
    vm.userAuth = $localStorage.userAuth;
    vm.createTask = createTask;
    vm.idEvent = null;
    vm.idPerk = null;
    vm.idOrganizer = null;
    vm.idSponsorship = null;

    activate();

    ////////////

    function activate(){
      vm.idEvent = $stateParams.idEvent;
      vm.idPerk = $stateParams.idPerk;
      vm.idOrganizer = $stateParams.idOrganizer;
      vm.idSponsorship = $stateParams.idSponsorship;
    }

    function createTask( form ){
      utilsService.showLoad();
      perkTaskService.createPerkTask( preparateTask() )
        .then( createTaskSponsor )
        .then( complete )
        .catch( failed );

        function createTaskSponsor( task ){
          return tasksSponsorService.createTask( preparateTaskSponsor( task ) )
        }


        function complete( data ){
          utilsService.hideLoad();
          utilsService.resetForm( form );
          vm.newTask = {};
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $ionicHistory.clearCache().then(function(){
            $ionicHistory.goBack();
          });
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
        
    }

    function preparateTask(){
      return {
        user_id: vm.userAuth.id,
        event_id: vm.idEvent,
        perk_id: vm.idPerk,
        title: vm.newTask.title,
        description: vm.newTask.description,
        type: 1, // Is a sponsor
        status: 0
      }
    }

    function preparateTaskSponsor( task ){
      return {
        task_id: task.id,
        perk_id: vm.idPerk,
        sponzor_id: vm.userAuth.id,
        organizer_id: vm.idOrganizer, 
        event_id: vm.idEvent,
        sponzorship_id: vm.idSponsorship
      }
    }
    

  }
})();
/**
* @Controller for Add Task
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.tasks-sponsor')
    .controller('EditTaskSponsorController', EditTaskSponsorController);

  EditTaskSponsorController.$inject = [
    '$localStorage',
    'perkTaskService',
    'perkService',
    'userService',
    'utilsService',
    '$state',
    '$stateParams',
    '$ionicHistory',
    '$q',
    'tasksSponsorService'
  ];

  function EditTaskSponsorController( $localStorage, perkTaskService, perkService, userService, utilsService, $state, $stateParams, $ionicHistory, $q, tasksSponsorService) {

    var vm = this;
    vm.newTask = {};
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    vm.perks = [];
    vm.editTask = editTask;
    vm.deleteTask = deleteTask;

    activate();

    ////////////

    function activate(){
      getData();
    }

    function getData(){
      utilsService.showLoad();

      var promises = [
        userService.getUser( vm.userAuth.id ),
        perkService.allPerks(),
        perkTaskService.getPerkTask( $stateParams.id ),
      ];

      $q.all(promises)
        .then( complete )
        .catch( failed );

        function complete( data ){
          utilsService.hideLoad();
          getEvents( data[0] );
          getPerks( data[1] );
          getTask( data[2] );
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

    function editTask( form ){
      utilsService.showLoad();
      perkTaskService.editPerkTaskPatch( $stateParams.id, preparateData() )
        .then( complete )
        .catch( failed );

        function complete( data ){
          utilsService.hideLoad();
          utilsService.resetForm( form );
          vm.newTask = {};
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $ionicHistory.clearCache().then(function(){
            $ionicHistory.goBack();
          });
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

     function deleteTask(){
      utilsService.showLoad();
      perkTaskService.deletePerkTask( $stateParams.id )
        .then( complete )
        .catch( failed );

        function complete( data ){
          vm.newTask = {};
          $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
          });
          $state.go("organizer.tasks");
        }

        function failed( error ){
          utilsService.hideLoad();
          utilsService.alert({
            template: error.data.message
          });
        }
    }

    function preparateData(){
      return {
        user_id: vm.userAuth.id,
        event_id: vm.newTask.event.id,
        perk_id: vm.newTask.perk.id,
        title: vm.newTask.title,
        description: vm.newTask.description,
        type: 0,
        status: vm.newTask.status ? "1" : "0"
      }
    }

    function getEvents( user ){
      vm.events = user.events;
    }

    function getPerks( perks ){
      vm.perks = perks;
    }

    function getTask( task ){
      vm.newTask = task;
      vm.newTask.status = task.status == '1' ? true : false ;
      for (var i = 0; i < vm.events.length; i++) {
        if(vm.events[i].id == vm.newTask.event_id){
          vm.newTask.event = vm.events[i];
          break;
        }
      }
      for (var i = 0; i < vm.perks.length; i++) {
        if(vm.perks[i].id == vm.newTask.perk.id){
          vm.newTask.perk = vm.perks[i];
          break;
        }
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
    .module('app.events-sponzor')
    .controller('EventDetailTasksSponzorController', EventDetailTasksSponzorController);

  EventDetailTasksSponzorController.$inject = [
    '$scope',
    'eventService',
    'utilsService',
    '$stateParams',
    'sponsorshipService',
    '$localStorage',
    '$ionicModal',
    '$ionicHistory',
    '$cordovaToast',
    '$translate'
  ];

  function EventDetailTasksSponzorController( $scope, eventService, utilsService, $stateParams, sponsorshipService, $localStorage, $ionicModal, $ionicHistory, $cordovaToast, $translate) {

    var vm = this;
    vm.event = {};
    vm.userAuth = $localStorage.userAuth;
    vm.tasks_organizer = [];
    vm.tasks_sponsor = [];
    vm.perks_sponsorships = [];
    vm.idSponsorShip = null;

    activate();

    ////////////

    function activate(){
      getEvent();

      $ionicModal.fromTemplateUrl('app/events-sponsor/sponsor-it-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalSponsorIt = modal;
      });
    }

    function getEvent(){
      utilsService.showLoad();
      eventService.getEvent( $stateParams.idEvent )
        .then( complete )
        .catch( failed );

        function complete( event ){
          utilsService.hideLoad();
          vm.event = event;
          vm.idSponsorShip = getIdSponsorship( vm.event.sponzorships ).id;
          vm.perks_sponsorships = preparatePerksSponsorships( angular.copy(vm.event) );
          vm.tasks_organizer = preparatePerksTasksOrganizer( angular.copy(vm.event) );
          vm.tasks_sponsor = preparatePerksTasks( angular.copy(vm.event) );
          
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

    function getIdSponsorship( sponzorships ){
      sponzorships = sponzorships.filter(function( sponsorship ){
        return sponsorship.sponzor_id == vm.userAuth.id;
      });
      if(sponzorships.length > 0) return sponzorships[0];
      return null;
    }

    function preparatePerksTasks( event ){
      var perks = filterBySponsorship( event );
      for (var i = 0; i < perks.length; i++) {
        perks[i].tasks = _.where( event.perk_tasks.filter( filterByUser ), {perk_id: perks[i].id});
      }
      return perks;
    }

    function preparatePerksTasksOrganizer( event ){
      var perks = event.perks;
      for (var i = 0; i < perks.length; i++) {
        perks[i].tasks = _.where( event.perk_tasks.filter( filterByOrganizer ), {perk_id: perks[i].id});
      }
      return perks;
    }

    function preparatePerksSponsorships( event ){
      var perks = event.perks;
      for (var i = 0; i < perks.length; i++) {
        perks[i].sponsorships = _.where(event.sponzorships, {perk_id: perks[i].id});
      }
      return perks;
    }

    function filterBySponsorship( event ){
      var perks = [];
      for (var i = 0; i < event.sponzorships.length; i++) {
        if (event.sponzorships[i].sponzor_id == vm.userAuth.id) perks.push(event.sponzorships[i].perk_id);
      };
      return event.perks.filter(function( perk ){
        return perks.indexOf( perk.id ) !== -1;
      });
    }

    function filterByUser( task ){
      return task.type == '1' && vm.userAuth.id == task.user_id; //Is a sponsor
    }

    function filterByOrganizer( task ){
      return task.type == '0'; //Is a sponsor
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
    '$translate'
  ];

  function EventDetailSponzorController( $scope, eventService, utilsService, $stateParams, sponsorshipService, $localStorage, $ionicModal, $ionicHistory, $cordovaToast, $translate) {

    var vm = this;
    vm.event = {};
    vm.userAuth = $localStorage.userAuth;
    vm.perks = [];

    vm.modalSponsorIt = null;
    vm.newSponsorIt = {};
    vm.openModalSponsorIt = openModalSponsorIt;
    vm.closeModalSponsorIt = closeModalSponsorIt;
    vm.createSponsorIt = createSponsorIt;
    vm.submitSponsorIt = submitSponsorIt;

    activate();

    ////////////

    function activate(){
      getEvent();

      $ionicModal.fromTemplateUrl('app/events-sponsor/sponsor-it-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modalSponsorIt = modal;
      });
    }

    function getEvent(){
      utilsService.showLoad();
      eventService.getEvent( $stateParams.idEvent )
        .then( complete )
        .catch( failed );

        function complete( event ){
          utilsService.hideLoad();
          vm.event = event;
          vm.perks = preparatePerks( vm.event );
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

    function preparatePerks( event ){
      var perks = event.perks;
      for (var i = 0; i < perks.length; i++) {
        perks[i].sponsorships = _.where(event.sponzorships, {perk_id: perks[i].id});
        perks[i].tasks = _.where( event.perk_tasks.filter( filterByTypePerk ), {perk_id: perks[i].id});
      }
      return perks;
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

        function complete( event ){
          vm.closeModalSponsorIt();
          $ionicHistory.clearCache();
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
        organizer_id: vm.event.organizer.id,
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
    'sponsorshipService',
    '$scope',
    '$rootScope'
  ];

  function FollowEventsController( $localStorage, utilsService, sponsorshipService, $scope, $rootScope) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();

    ////////////

    function activate(){
      getEvents();
    }

    function getEvents(){
      utilsService.showLoad();
      sponsorshipService.sponzorshipBySponzor( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( events ){
          utilsService.hideLoad();
          vm.events = events.filter( filterByPending );
          vm.showEmptyState = vm.events.length == 0 ? true : false;
        }

        function failed( error ){
          utilsService.hideLoad();
          vm.showEmptyState = true;
        }
    }

    function doRefresh(){
      sponsorshipService.sponzorshipBySponzor( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( events ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.events = events.filter( filterByPending );
          $rootScope.$broadcast('Menu:count_following', vm.events.length);
        }

        function failed( error ){
          $scope.$broadcast('scroll.refreshComplete');
        }
    }

    function filterByPending( item ){
      return item.status != '1';
    }
    
    /*function filterDate( item ){
      return moment(item.ends).isAfter(new Date());
    }*/

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
    'utilsService',
    'sponsorshipService',
    '$scope',
    '$rootScope'
  ];

  function SponzoringEventsController( $localStorage, utilsService, sponsorshipService, $scope, $rootScope) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();

    ////////////

    function activate(){
      getEvents();
    }

    function getEvents(){
      utilsService.showLoad();
      sponsorshipService.sponzorshipBySponzor( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( events ){
          utilsService.hideLoad();
          vm.events = events.filter( filterByAccepted );
          vm.showEmptyState = vm.events.length == 0 ? true : false;
        }

        function failed( error ){
          utilsService.hideLoad();
          vm.showEmptyState = true;
        }
    }

    function doRefresh(){
      sponsorshipService.sponzorshipBySponzor( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( events ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.events = events.filter( filterByAccepted );
          $rootScope.$broadcast('Menu:count_sponsoring', vm.events.length);
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