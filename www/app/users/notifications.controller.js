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
    }

  }
})();