/// <reference path="../../typings/main.d.ts" />
/// <reference path="event.service.ts" />
/// <reference path="sponsorship.service.ts" />
/**
* @Servicio de Usuarios
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
var userModule;
(function (userModule) {
    var userService = (function () {
        function userService($http, $localStorage, BackendVariables, $q, eventService, sponsorshipService) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.BackendVariables = BackendVariables;
            this.$q = $q;
            this.eventService = eventService;
            this.sponsorshipService = sponsorshipService;
            this.$inject = [
                '$http',
                '$localStorage',
                'BackendVariables',
                '$q',
                'eventService',
                'sponsorshipService'
            ];
            this.path = BackendVariables.url;
        }
        userService.prototype.login = function (email, password) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + 'auth',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email: email,
                    password: password
                }
            })
                .then(function (response) { return _this.$q.when(_this._buildUser(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.home = function (userId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + 'home/' + userId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(_this._preparateUser(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.createUser = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + 'users',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._getUser(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.deleteUser = function (userId) {
            var _this = this;
            return this.$http({
                method: 'DELETE',
                url: this.path + 'users/' + userId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.editUserPatch = function (userId, data) {
            var _this = this;
            return this.$http({
                method: 'PATCH',
                url: this.path + 'users/' + userId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._getUser(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.editUserPut = function (userId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + 'users/' + userId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._getUser(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.forgotPassword = function (email) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + 'send_reset_password',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + this._getToken()
                },
                data: {
                    email: email
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.invitedUser = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + 'invite_friend',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype._getUser = function (data) {
            return data.User;
        };
        userService.prototype._preparateUser = function (data) {
            return this._buildUser(data.data.user);
        };
        userService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        userService.prototype._buildUser = function (data) {
            var user = data.user;
            if (user.type == "1") {
                user.sponzorships.forEach(this.sponsorshipService.buildSponsorship, this.sponsorshipService);
                user.events = data.events.forEach(this.eventService.buildEvent, this.eventService);
            }
            else {
                user.sponzorships_like_organizer = user.sponzorships_like_organizer.map(this.sponsorshipService.buildSponsorship);
                user.events.forEach(this.eventService.buildEvent, this.eventService);
            }
            return user;
        };
        userService.prototype._preparateEvents = function () {
            return true;
        };
        return userService;
    }());
    userModule.userService = userService;
    angular
        .module('app')
        .service('userService', userService);
})(userModule || (userModule = {}));
