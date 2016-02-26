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
    .controller('NotificationController', NotificationController);

  NotificationController.$inject = [
    'BackendVariables',
    'userService',
    '$localStorage',
    '$firebaseArray'
  ];

  function NotificationController( BackendVariables, userService, $localStorage , $firebaseArray) {

    var vm = this;
    vm.reference = null;
    vm.notifications = null;

    activate();
    ////////////
    function activate() {
      if($localStorage.userAuth.id){
        vm.reference = new Firebase(BackendVariables.f_url + 'notifications/'+ $localStorage.userAuth.id);
        vm.notifications = $firebaseArray( vm.reference );
        listener();
      }
    }
    
    function listener() {
      vm.reference.on('child_added', function(snapshot ) {
        var current = snapshot.val();
        if($localStorage.lastUpdate < current.date){
          userService.home( $localStorage.userAuth.id ).then(function successCallback(user) {
            $localStorage.userAuth.lastUpdate = new Date().getTime();
            $localStorage.userAuth = user;
          });
        }
      });
    }

  }
})();