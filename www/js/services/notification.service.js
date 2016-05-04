/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="user.service.ts" />
/// <reference path="userAuth.service.ts" />
/// <reference path="push.service.ts" />
var notificationModule;
(function (notificationModule) {
    var notificationService = (function () {
        function notificationService($http, $q, $localStorage, $rootScope, $translate, $firebaseArray, $ionicHistory, BackendVariables, userService, userAuthService, pushService) {
            this.$http = $http;
            this.$q = $q;
            this.$localStorage = $localStorage;
            this.$rootScope = $rootScope;
            this.$translate = $translate;
            this.$firebaseArray = $firebaseArray;
            this.$ionicHistory = $ionicHistory;
            this.BackendVariables = BackendVariables;
            this.userService = userService;
            this.userAuthService = userAuthService;
            this.pushService = pushService;
            this.$inject = [
                '$http',
                '$q',
                '$localStorage',
                '$rootScope',
                '$translate',
                '$firebaseArray',
                '$ionicHistory',
                'BackendVariables',
                'userService',
                'userAuthService',
                'pushService'
            ];
            this.path = this.BackendVariables.f_url;
        }
        notificationService.prototype.activate = function () {
            this.userAuth = this.userAuthService.getUserAuth();
            this._notificationForMe();
            if (this.userAuth.type == '1')
                this._updateEvents();
        };
        notificationService.prototype.getNotifications = function (userId) {
            var url = this.path + "notifications/" + userId;
            return this.$firebaseArray(new Firebase(url));
        };
        notificationService.prototype.sendNewSponsorship = function (notification, to, ionicId) {
            notification.typeNotification = "newSponsorship";
            notification.type = "sponsorship";
            notification.pushNotification = true;
            notification.hide = false;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendAcceptSponsorship = function (notification, to, ionicId) {
            notification.typeNotification = "acceptSponsorship";
            notification.type = "sponsorship";
            notification.pushNotification = true;
            notification.hide = false;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendRejectSponsorship = function (notification, to, ionicId) {
            notification.typeNotification = "rejectSponsorship";
            notification.type = "sponsorship";
            notification.pushNotification = true;
            notification.hide = false;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendNewTaskOrganizer = function (notification, to, ionicId) {
            notification.typeNotification = "newTaskOrganizer";
            notification.type = "task";
            notification.pushNotification = true;
            notification.hide = false;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendUpdateTaskOrganizer = function (notification, to, ionicId) {
            notification.typeNotification = "doneTaskOrganizer";
            notification.type = "task";
            notification.pushNotification = true;
            notification.hide = false;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendDoneTaskOrganizer = function (notification, to, ionicId) {
            notification.typeNotification = "updateTaskOrganizer";
            notification.type = "task";
            notification.pushNotification = true;
            notification.hide = false;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendDeleteTaskOrganizer = function (notification, to, ionicId) {
            notification.typeNotification = "deleteTaskSponsor";
            notification.type = "task";
            notification.pushNotification = false;
            notification.hide = true;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendNewTaskSponsor = function (notification, to, ionicId) {
            notification.typeNotification = "newTaskSponsor";
            notification.type = "task";
            notification.pushNotification = false;
            notification.hide = true;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendUpdateTaskSponsor = function (notification, to, ionicId) {
            notification.typeNotification = "updateTaskSponsor";
            notification.type = "task";
            notification.pushNotification = false;
            notification.hide = true;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendDoneTaskSponsor = function (notification, to, ionicId) {
            notification.typeNotification = "doneTaskSponsor";
            notification.type = "task";
            notification.pushNotification = false;
            notification.hide = true;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendDeleteTaskSponsor = function (notification, to, ionicId) {
            notification.typeNotification = "deleteTaskSponsor";
            notification.type = "task";
            notification.pushNotification = false;
            notification.hide = true;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendNewEvent = function () {
            var notification = {};
            notification.date = new Date().getTime();
            notification.fromApp = 'mobileApp';
            notification.toApp = 'mobileApp';
            notification.pushNotification = false;
            notification.hide = true;
            var url = this.path + 'notifications/events';
            var notificationsRef = this.$firebaseArray(new Firebase(url));
            notificationsRef.$add(notification);
        };
        notificationService.prototype.sendUpdateEvent = function () {
            var notification = {};
            notification.date = new Date().getTime();
            notification.fromApp = 'mobileApp';
            notification.toApp = 'mobileApp';
            notification.pushNotification = false;
            notification.hide = true;
            var url = this.path + 'notifications/events';
            var notificationsRef = this.$firebaseArray(new Firebase(url));
            notificationsRef.$add(notification);
        };
        notificationService.prototype._sendNotification = function (notification, to, ionicId) {
            var _this = this;
            notification.date = new Date().getTime();
            notification.to = to;
            notification.fromApp = 'mobileApp';
            notification.toApp = 'mobileApp';
            notification.read = false;
            notification.ionicId = ionicId || "";
            var promises = [
                this._getTitle(notification.typeNotification),
                this._getText(notification.typeNotification, notification.text)
            ];
            this.$q.all(promises)
                .then(function (response) {
                notification.title = String(response[0]);
                notification.message = String(response[1]);
                if (notification.pushNotification) {
                    _this.pushService.sendPushNotification([notification.ionicId], notification)
                        .then(function (data) {
                        console.log(data);
                    })
                        .catch(function (error) {
                        console.log(error);
                    });
                }
                var url = _this.path + 'notifications/' + to;
                var notificationsRef = _this.$firebaseArray(new Firebase(url));
                notificationsRef.$add(notification);
            })
                .catch(function (error) {
                console.log(error);
            });
        };
        notificationService.prototype._notificationForMe = function () {
            var _this = this;
            var url = this.path + "notifications/" + this.userAuth.id;
            var reference = new Firebase(url);
            reference.on('child_added', function (snapshot) {
                var current = snapshot.val();
                if (_this.$localStorage.lastUpdate < current.date) {
                    _this.userAuthService.refresh();
                }
            });
        };
        notificationService.prototype._getTitle = function (typeNotification) {
            var _this = this;
            return this.$translate("NOTIFICATIONS." + typeNotification + "_title")
                .then(function (message) { return _this.$q.when(message); })
                .catch(function (data) { return _this.$q.reject(null); });
        };
        notificationService.prototype._getText = function (typeNotification, text) {
            var _this = this;
            return this.$translate("NOTIFICATIONS." + typeNotification + "_text")
                .then(function (message) { return _this.$q.when(message.replace('TEXT', text || '')); })
                .catch(function (error) { return _this.$q.reject(null); });
        };
        notificationService.prototype._updateEvents = function () {
            var _this = this;
            var url = this.path + "notifications/events";
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
