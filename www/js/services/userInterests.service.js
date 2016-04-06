/// <reference path="../../typings/tsd.d.ts" />
/**
* @Servicio de Interes del usuario
*
* @author Nicolas Molina
* @version 0.1
*/
var userInterestModule;
(function (userInterestModule) {
    var userInterestService = (function () {
        function userInterestService($http, $localStorage, BackendVariables, $q) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.BackendVariables = BackendVariables;
            this.$q = $q;
            this.$inject = [
                '$http',
                '$localStorage',
                'BackendVariables',
                '$q',
            ];
            this.path = BackendVariables.url;
        }
        userInterestService.prototype.createUserInterest = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "user_interests",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateUserInterest(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userInterestService.prototype.bulkUserInterest = function (userId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + "user_interests/" + userId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userInterestService.prototype._preparateUserInterest = function (data) {
            return data.UserInterest;
        };
        userInterestService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        return userInterestService;
    })();
    userInterestModule.userInterestService = userInterestService;
    angular
        .module('app')
        .service('userInterestService', userInterestService);
})(userInterestModule || (userInterestModule = {}));
