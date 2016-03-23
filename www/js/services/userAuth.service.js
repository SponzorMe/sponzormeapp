/// <reference path="../../typings/main.d.ts" />
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
            this.userService.home(this.getUserAuth().id)
                .then(complete);
            function complete(user) {
                var userAuth = this.updateUserAuth(user);
                if (userAuth.type == 0) {
                    this.$rootScope.$broadcast('MenuOrganizer:count_events');
                    this.$rootScope.$broadcast('EventsTabsController:count_events');
                    this.$rootScope.$broadcast('HomeOrganizerController:count_events');
                    this.$rootScope.$broadcast('MenuOrganizer:count_tasks');
                    this.$rootScope.$broadcast('TaskTabsController:count_tasks');
                    this.$rootScope.$broadcast('MenuOrganizer:count_sponsors');
                    this.$rootScope.$broadcast('SponsorshipsTabsController:count_sponsors');
                    this.$rootScope.$broadcast('HomeOrganizerController:count_sponsors');
                    this.$rootScope.$broadcast('SponsorshipsListController:getSponzorships');
                    this.$rootScope.$broadcast('SponsorshipsPastEventsController:getSponzorships');
                    this.$rootScope.$broadcast('EventListController:getEvents');
                    this.$rootScope.$broadcast('PastEventsController:getEvents');
                }
                else {
                    this.$rootScope.$broadcast('MenuSponzor:counts');
                    this.$rootScope.$broadcast('FollowEventsController:getSponzorships');
                    this.$rootScope.$broadcast('SponzoringEventsController:getSponzorships');
                    this.$rootScope.$broadcast('HomeSponzorController:getEvents');
                }
            }
        };
        return userAuthService;
    }());
    userAuthModule.userAuthService = userAuthService;
    angular
        .module('app')
        .service('userAuthService', userAuthService);
})(userAuthModule || (userAuthModule = {}));
