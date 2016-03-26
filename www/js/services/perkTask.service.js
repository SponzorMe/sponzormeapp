/// <reference path="../../typings/main.d.ts" />
/**
* @Servicio de PerkTask
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
var perkTaskModule;
(function (perkTaskModule) {
    var perkTaskService = (function () {
        function perkTaskService($http, $localStorage, BackendVariables, $q) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.BackendVariables = BackendVariables;
            this.$q = $q;
            this.$inject = [
                '$http',
                '$localStorage',
                'BackendVariables',
                '$q'
            ];
            this.path = BackendVariables.url;
        }
        perkTaskService.prototype.allPerkTasks = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "perk_tasks"
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerkTasks(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.getPerkTask = function (perkTaskId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "perk_tasks/" + perkTaskId,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerkTask(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.getPerkTaskByOrganizer = function (userId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "perk_tasks_organizer/" + userId,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerkTasks(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.createPerkTask = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "perk_tasks",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerkTaskUpdate(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.deletePerkTask = function (perkTaskId) {
            var _this = this;
            return this.$http({
                method: 'DELETE',
                url: this.path + "perk_tasks/" + perkTaskId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.editPerkTaskPatch = function (perkTaskId, data) {
            var _this = this;
            return this.$http({
                method: 'PATCH',
                url: this.path + "perk_tasks/" + perkTaskId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerkTaskUpdate(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.editPerkTaskPut = function (perkTaskId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + "perk_tasks/" + perkTaskId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerkTaskUpdate(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.buildPerkTask = function (data) {
            var task = data.PerkTask;
            task.event = data.Event || {};
            task.perk = data.Perk || {};
            task.user = data.User || {};
            task.status = task.status == 1 ? true : false;
            return task;
        };
        perkTaskService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        perkTaskService.prototype._preparatePerkTasks = function (data) {
            return data.PerkTasks;
        };
        perkTaskService.prototype._preparatePerkTask = function (data) {
            return this.buildPerkTask(data.data);
        };
        perkTaskService.prototype._preparatePerkTaskUpdate = function (data) {
            return this.buildPerkTask(data.PerkTask);
        };
        return perkTaskService;
    }());
    perkTaskModule.perkTaskService = perkTaskService;
    angular
        .module('app')
        .service('perkTaskService', perkTaskService);
})(perkTaskModule || (perkTaskModule = {}));
