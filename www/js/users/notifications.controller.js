/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var NotificationsCtrl = (function () {
    function NotificationsCtrl(userAuthService, notificationService) {
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.$inject = [
            'userAuthService',
            'notificationService'
        ];
        this.notifications = [];
        this.userAuth = this.userAuthService.getUserAuth();
        this.notifications = this.notificationService.getNotifications(this.userAuth.id);
        /*this.notifications = [
            {
              title: 'nuevo',
              text: 'Angular 2',
              typeNotification: 'newSponsorship',
              type: 'sponsorship',
              date: new Date(),
              modelId: 1,
              read: false,
              toApp: 'mobileApp'
            },
            {
              title: 'nuevo',
              text: 'Angular 2',
              typeNotification: 'acceptSponsorship',
              type: 'sponsorship',
              date: new Date(),
              modelId: 1,
              read: false,
              toApp: 'mobileApp'
            },
            {
              title: 'nuevo',
              text: 'Angular 2',
              typeNotification: 'rejectSponsorship',
              type: 'sponsorship',
              date: new Date(),
              modelId: 1,
              read: false,
              toApp: 'mobileApp'
            },
            {
              title: 'nuevo',
              text: 'Angular 2',
              typeNotification: 'newTaskOrganizer',
              type: 'task',
              date: new Date(),
              modelId: 1,
              read: false,
              toApp: 'mobileApp'
            },
            {
              title: 'nuevo',
              text: 'Angular 2',
              typeNotification: 'updateTaskOrganizer',
              type: 'task',
              date: new Date(),
              modelId: 1,
              read: false,
              toApp: 'mobileApp'
            },
            {
              title: 'nuevo',
              text: 'Angular 2',
              typeNotification: 'doneTaskOrganizer',
              type: 'task',
              date: new Date(),
              modelId: 1,
              read: false,
              toApp: 'mobileApp'
            },
          ];*/
    }
    return NotificationsCtrl;
}());
angular
    .module('app.users')
    .controller('NotificationsCtrl', NotificationsCtrl);
