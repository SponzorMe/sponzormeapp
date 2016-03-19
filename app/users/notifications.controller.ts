/// <reference path="../../typings/main.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2

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
      ];
    }

  }
})();
*/