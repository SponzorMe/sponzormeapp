(function() {
  'use strict';

  angular
    .module('app')
    .factory('NotificationService', NotificationService);

  NotificationService.$inject = [
    '$http',
    '$firebaseArray',
    '$q',
    'BackendVariables',
    '$localStorage',
    'userService'
  ];

  function NotificationService( $http, $q, $firebaseArray, BackendVariables, $localStorage, userService ) {

    var path = BackendVariables.f_url;

    var service = {
      activate: activate,
      sendNotification: sendNotification,
    };

    return service;

    ////////////

    function sendNotification(notification, to){
      var url = path + 'notifications/' + to;
      notification.date = new Date().getTime();
      var notificationsRef =  $firebaseArray( new Firebase( url ));
      notificationsRef.$add(notification);
    }
    
    function activate() {
      var url =  new Firebase(path + 'notifications/'+ $localStorage.userAuth.id;
      var reference = $firebaseArray( new Firebase( url ));
      reference.on('child_added', listener);
      
      function listener( snapshot ){
        var current = snapshot.val();
        console.log(current);
        userService.home( $localStorage.userAuth.id )
        .then(complete);
        
        function complete( user ){
          $localStorage.userAuth = user;
        }
      }
    }

  }
})();