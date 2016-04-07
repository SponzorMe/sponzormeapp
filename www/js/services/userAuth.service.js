/// <reference path="../../typings/tsd.d.ts" />
/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
var userAuthModule;
(function (userAuthModule) {
    var userAuthService = (function () {
        function userAuthService($http, $q, $localStorage, userService, $rootScope) {
            this.$http = $http;
            this.$q = $q;
            this.$localStorage = $localStorage;
            this.userService = userService;
            this.$rootScope = $rootScope;
            this.$inject = [
                '$http',
                '$q',
                '$localStorage',
                'userService',
                '$rootScope'
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
                    _this.$rootScope.$broadcast('MenuOrganizer:count_events');
                    _this.$rootScope.$broadcast('EventsTabsCtrl:count_events');
                    _this.$rootScope.$broadcast('HomeOrganizerController:count_events');
                    _this.$rootScope.$broadcast('MenuOrganizer:count_tasks');
                    _this.$rootScope.$broadcast('TaskTabsController:count_tasks');
                    _this.$rootScope.$broadcast('MenuOrganizer:count_sponsors');
                    _this.$rootScope.$broadcast('SponsorshipsTabsController:count_sponsors');
                    _this.$rootScope.$broadcast('HomeOrganizerController:count_sponsors');
                    _this.$rootScope.$broadcast('SponsorshipsListController:getSponzorships');
                    _this.$rootScope.$broadcast('SponsorshipsPastEventsController:getSponzorships');
                    _this.$rootScope.$broadcast('EventListController:getEvents');
                    _this.$rootScope.$broadcast('PastEventsController:getEvents');
                }
                else {
                    _this.$rootScope.$broadcast('MenuSponzor:counts');
                    _this.$rootScope.$broadcast('FollowEventsController:getSponzorships');
                    _this.$rootScope.$broadcast('SponzoringEventsController:getSponzorships');
                    _this.$rootScope.$broadcast('HomeSponzorController:getEvents');
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
