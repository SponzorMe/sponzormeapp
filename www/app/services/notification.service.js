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
    
    function sendNewEvent(notification, to) {
      notification.typeNotification = "newEvent";
      notification.type = "event";
      sendNotification(notification, to);
    }
    
    function sendUpdateEvent(notification, to) {
      notification.typeNotification = "updateEvent";
      notification.type = "event";
      sendNotification(notification, to);
    }
    
    
    function activate() {
      notificationForMe();
    }
    
    function notificationForMe(params) {
      var url =  path + 'notifications/'+ $localStorage.userAuth.id;
      var reference =  new Firebase( url );
      reference.on('child_added', listener);
      
      function listener( snapshot ){
        var current = snapshot.val();
        if($localStorage.lastUpdate < current.date){
          userService.home( $localStorage.userAuth.id )
          .then(complete);
          
          function complete( user ){
            var userAuth = userAuthService.updateUserAuth( user );
            if(userAuth.type == 0){ //Is an organizer
              $rootScope.$broadcast('SponsorshipsListController:getSponzorships');
              $rootScope.$broadcast('Menu:count_sponsors');
              $rootScope.$broadcast('HomeOrganizerController:count_sponsors');
            }else{
              $rootScope.$broadcast('FollowEventsController:getSponzorships');
              $rootScope.$broadcast('Menu:count_following');
              $rootScope.$broadcast('SponzoringEventsController:getSponzorships');
              $rootScope.$broadcast('Menu:count_sponsoring');
              $rootScope.$broadcast('HomeSponzorController:getEvents');
            }
            
          }
        }
        
      }
    }

  }
})();