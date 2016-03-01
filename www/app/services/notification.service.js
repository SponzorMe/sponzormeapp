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
      sendNotification: sendNotification,
      sendEventsChanged: sendEventsChanged
    };

    return service;

    ////////////

    function sendNotification(notification, to){
      var url = path + 'notifications/' + to;
      notification.date = new Date().getTime();
      notification.to = to;
      var notificationsRef =  $firebaseArray( new Firebase( url ));
      notificationsRef.$add(notification);
    }
    
    function sendEventsChanged() {
      var url = path + 'eventsChanged';
      var notificationsRef =  $firebaseArray( new Firebase( url ));
      notificationsRef.$add({
        date: new Date().getTime()
      });
    }
    
    function activate() {
      notificationForMe();
      if($localStorage.userAuth.type == 1) notificationsEventsChanged();
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
            }
            
          }
        }
        
      }
    }
    
    function notificationsEventsChanged() {
      var url =  path + 'eventsChanged';
      var reference =  new Firebase( url );
      reference.on('child_added', listener);
      
      function listener( snapshot ){
        var current = snapshot.val();
        if($localStorage.lastUpdate < current.date){
          userService.home( $localStorage.userAuth.id )
          .then(complete);
          
          function complete( user ){
            userAuthService.updateUserAuth( user );
            $rootScope.$broadcast('HomeSponzorController:getEvents');
            $ionicHistory.clearCache();
          }
        }
        
      }
    }

  }
})();