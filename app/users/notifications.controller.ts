/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class NotificationsCtrl{
  
  $inject = [
    '$state',
    '$translate',
    'userAuthService', 
    'notificationService'
  ];
  userAuth:userModule.User;
  notifications:any[] = [];
  
  constructor(
    private $state: angular.ui.IStateService,
    private $translate,
    private userAuthService: userAuthModule.IUserAuthService,
    private notificationService: notificationModule.INotificationService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
    this.notifications = notificationService.getNotifications( this.userAuth.id );
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
angular
  .module('app.users')
  .controller('NotificationsCtrl', NotificationsCtrl);