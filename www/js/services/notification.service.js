/// <reference path="../../typings/main.d.ts" />
/// <reference path="user.service.ts" />
/// <reference path="userAuth.service.ts" />
var notificationModule;
(function (notificationModule) {
    var notificationService = (function () {
        function notificationService($http, $q, $firebaseArray, BackendVariables, userService, $rootScope, $ionicHistory, userAuthService, $localStorage) {
            this.$http = $http;
            this.$q = $q;
            this.$firebaseArray = $firebaseArray;
            this.BackendVariables = BackendVariables;
            this.userService = userService;
            this.$rootScope = $rootScope;
            this.$ionicHistory = $ionicHistory;
            this.userAuthService = userAuthService;
            this.$localStorage = $localStorage;
            this.$inject = [
                '$http',
                '$q',
                '$firebaseArray',
                'BackendVariables',
                'userService',
                '$rootScope',
                '$ionicHistory',
                'userAuthService',
                '$localStorage'
            ];
            this.path = this.BackendVariables.f_url;
            this.userAuth = this.userAuthService.getUserAuth();
        }
        notificationService.prototype.activate = function () {
            this._notificationForMe();
            if (this.userAuth.type == '1')
                this._updateEvents();
        };
        notificationService.prototype.getNotifications = function (userId) {
            var url = this.path + 'notifications/' + userId;
            return this.$firebaseArray(new Firebase(url));
        };
        notificationService.prototype.sendNewSponsorship = function (notification, to) {
            notification.typeNotification = "newSponsorship";
            notification.type = "sponsorship";
            this._sendNotification(notification, to);
        };
        notificationService.prototype.sendAcceptSponsorship = function (notification, to) {
            notification.typeNotification = "acceptSponsorship";
            notification.type = "sponsorship";
            this._sendNotification(notification, to);
        };
        notificationService.prototype.sendRejectSponsorship = function (notification, to) {
            notification.typeNotification = "rejectSponsorship";
            notification.type = "sponsorship";
            this._sendNotification(notification, to);
        };
        notificationService.prototype.sendNewTaskOrganizer = function (notification, to) {
            notification.typeNotification = "newTaskOrganizer";
            notification.type = "task";
            this._sendNotification(notification, to);
        };
        notificationService.prototype.sendUpdateTaskOrganizer = function (notification, to) {
            notification.typeNotification = "doneTaskOrganizer";
            notification.type = "task";
            this._sendNotification(notification, to);
        };
        notificationService.prototype.sendDoneTaskOrganizer = function (notification, to) {
            notification.typeNotification = "updateTaskOrganizer";
            notification.type = "task";
            this._sendNotification(notification, to);
        };
        notificationService.prototype.sendNewTaskSponsor = function (notification, to) {
            notification.typeNotification = "newTaskSponsor";
            notification.type = "task";
            this._sendNotification(notification, to);
        };
        notificationService.prototype.sendUpdateTaskSponsor = function (notification, to) {
            notification.typeNotification = "updateTaskSponsor";
            notification.type = "task";
            this._sendNotification(notification, to);
        };
        notificationService.prototype.sendDoneTaskSponsor = function (notification, to) {
            notification.typeNotification = "doneTaskSponsor";
            notification.type = "task";
            this._sendNotification(notification, to);
        };
        notificationService.prototype.sendNewEvent = function () {
            var notification;
            notification.date = new Date().getTime();
            notification.fromApp = 'mobileApp';
            notification.toApp = 'mobileApp';
            var url = this.path + 'notifications/events';
            var notificationsRef = this.$firebaseArray(new Firebase(url));
            notificationsRef.$add(notification);
        };
        notificationService.prototype.sendUpdateEvent = function () {
            var notification;
            notification.date = new Date().getTime();
            notification.fromApp = 'mobileApp';
            notification.toApp = 'mobileApp';
            var url = this.path + 'notifications/events';
            var notificationsRef = this.$firebaseArray(new Firebase(url));
            notificationsRef.$add(notification);
        };
        notificationService.prototype._sendNotification = function (notification, to) {
            notification.date = new Date().getTime();
            notification.to = to;
            notification.fromApp = 'mobileApp';
            notification.toApp = 'mobileApp';
            notification.read = false;
            var url = this.path + 'notifications/' + to;
            var notificationsRef = this.$firebaseArray(new Firebase(url));
            notificationsRef.$add(notification);
        };
        notificationService.prototype._notificationForMe = function () {
            var _this = this;
            var url = this.path + 'notifications/' + this.userAuth.id;
            var reference = new Firebase(url);
            reference.on('child_added', function (snapshot) {
                var current = snapshot.val();
                if (_this.$localStorage.lastUpdate < current.date) {
                    _this.userAuthService.refresh();
                }
            });
        };
        notificationService.prototype._updateEvents = function () {
            var _this = this;
            var url = this.path + 'notifications/events';
            var reference = new Firebase(url);
            reference.on('child_added', function (snapshot) {
                var current = snapshot.val();
                if (_this.$localStorage.lastUpdate < current.date) {
                    _this.userService
                        .home(_this.userAuth.id)
                        .then(function (user) {
                        _this.userAuth = _this.userAuthService.updateUserAuth(user);
                        _this.$rootScope.$broadcast('HomeSponzorController:getEvents');
                        _this.$rootScope.$broadcast('MenuSponzor:counts');
                    });
                }
            });
        };
        return notificationService;
    }());
    notificationModule.notificationService = notificationService;
    angular
        .module('app')
        .service('notificationService', notificationService);
})(notificationModule || (notificationModule = {}));
