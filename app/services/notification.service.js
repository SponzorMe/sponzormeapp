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