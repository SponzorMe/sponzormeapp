/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="user.service.ts" />
/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
var userAuthModule;
(function (userAuthModule) {
    var userAuthService = (function () {
        function userAuthService($http, $q, $localStorage, userService, $rootScope, $ionicHistory) {
            this.$http = $http;
            this.$q = $q;
            this.$localStorage = $localStorage;
            this.userService = userService;
            this.$rootScope = $rootScope;
            this.$ionicHistory = $ionicHistory;
            this.$inject = [
                '$http',
                '$q',
                '$localStorage',
                'userService',
                '$rootScope',
                '$ionicHistory'
            ];
        }
        userAuthService.prototype.getUserAuth = function () {
            return this.$localStorage.userAuth;
        };
        userAuthService.prototype.updateUserAuth = function (data) {
            this.$localStorage.userAuth = angular.extend(this.$localStorage.userAuth || {}, data);
            this.$localStorage.lastUpdate = new Date().getTime();
            return this.$localStorage.userAuth;
        };
        userAuthService.prototype.checkSession = function () {
            if (angular.isDefined(this.$localStorage.token) && angular.isDefined(this.$localStorage.userAuth)) {
                return true;
            }
            return false;
        };
        userAuthService.prototype.refresh = function () {
            var _this = this;
            this.userService.home(this.getUserAuth().id)
                .then(function (user) {
                var userAuth = _this.updateUserAuth(user);
                if (userAuth.type == "0") {
                    _this.$ionicHistory.clearCache()
                        .then(function () {
                        console.log('clearCache');
                        _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_events');
                        _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_sponsors');
                        _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
                        _this.$rootScope.$broadcast('HomeOrganizerCtrl:count_sponsors');
                        _this.$rootScope.$broadcast('HomeOrganizerCtrl:count_events');
                        _this.$rootScope.$broadcast('EventsTabsCtrl:count_events');
                        _this.$rootScope.$broadcast('EventListOrganizerCtrl:getEvents');
                        _this.$rootScope.$broadcast('PastEventsOrganizerCtrl:getEvents');
                        _this.$rootScope.$broadcast('TaskListCtrl:getTasks');
                        _this.$rootScope.$broadcast('PastTasksCtrl:getTasks');
                        _this.$rootScope.$broadcast('TaskTabsCtrl:count_tasks');
                        _this.$rootScope.$broadcast('SponsorshipsListCtrl:getSponzorships');
                        _this.$rootScope.$broadcast('SponsorshipsPastEventsCtrl:getSponzorships');
                        _this.$rootScope.$broadcast('SponsorshipsTabsCtrl:count_sponsors');
                    });
                }
                else {
                    _this.$ionicHistory.clearCache()
                        .then(function () {
                        console.log('clearCache');
                        _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_events');
                        _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_sponsors');
                        _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
                        _this.$rootScope.$broadcast('HomeOrganizerCtrl:count_sponsors');
                        _this.$rootScope.$broadcast('HomeOrganizerCtrl:count_events');
                        _this.$rootScope.$broadcast('EventsTabsCtrl:count_events');
                        _this.$rootScope.$broadcast('EventListOrganizerCtrl:getEvents');
                        _this.$rootScope.$broadcast('PastEventsOrganizerCtrl:getEvents');
                        _this.$rootScope.$broadcast('TaskListCtrl:getTasks');
                        _this.$rootScope.$broadcast('PastTasksCtrl:getTasks');
                        _this.$rootScope.$broadcast('TaskTabsCtrl:count_tasks');
                        _this.$rootScope.$broadcast('SponsorshipsListCtrl:getSponzorships');
                        _this.$rootScope.$broadcast('SponsorshipsPastEventsCtrl:getSponzorships');
                        _this.$rootScope.$broadcast('SponsorshipsTabsCtrl:count_sponsors');
                    });
                }
            });
        };
        return userAuthService;
    }());
    userAuthModule.userAuthService = userAuthService;
    angular
        .module('app')
        .service('userAuthService', userAuthService);
})(userAuthModule || (userAuthModule = {}));
