/// <reference path="../../typings/main.d.ts" />
/**
* @Servive for tasks of sponsor
*
* @author Nicolas Molina
* @version 0.1
*/
var tasksSponsorModule;
(function (tasksSponsorModule) {
    var taskSponsorService = (function () {
        function taskSponsorService($http, $localStorage, BackendVariables, $q) {
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
            this.path = this.BackendVariables.url;
        }
        taskSponsorService.prototype.getAllTasks = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "task_sponzor",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) { return _this.$q.when(_this._preparateTaskSponsor(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        taskSponsorService.prototype.getTask = function (taskId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "task_sponzor/taskId",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(_this._preparateTaskSponsor(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        taskSponsorService.prototype.createTask = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "task_sponzor",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateTaskSponsor(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        taskSponsorService.prototype.editPutTask = function (taskId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + "task_sponzor/" + taskId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateTaskSponsor(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        taskSponsorService.prototype.editPatchTask = function (taskId, data) {
            var _this = this;
            return this.$http({
                method: 'PATCH',
                url: this.path + "task_sponzor/" + taskId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateTaskSponsor(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        taskSponsorService.prototype.deleteTask = function (taskId) {
            var _this = this;
            return this.$http({
                method: 'DELETE',
                url: this.path + "task_sponzor/" + taskId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        taskSponsorService.prototype._preparateTaskSponsor = function (data) {
            var taskSponsor = data.TaskSponzor;
            taskSponsor.task = data.PerkTask;
            return taskSponsor;
        };
        taskSponsorService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        return taskSponsorService;
    }());
    tasksSponsorModule.taskSponsorService = taskSponsorService;
    angular
        .module('app')
        .factory('taskSponsorService', taskSponsorService);
})(tasksSponsorModule || (tasksSponsorModule = {}));
