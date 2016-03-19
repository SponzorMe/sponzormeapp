/// <reference path="../../typings/main.d.ts" />
/**
* @Service de eventType
*
* @author Nicolas Molina
* @version 0.2
*/
var eventTypeService;
(function (eventTypeService_1) {
    var eventTypeService = (function () {
        function eventTypeService($http, $localStorage, $q, BackendVariables) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.$q = $q;
            this.BackendVariables = BackendVariables;
            this.$inject = [
                '$http',
                '$localStorage',
                'BackendVariables',
                '$q'
            ];
            this.path = this.BackendVariables.url;
        }
        eventTypeService.prototype.allEventTypes = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + 'event_types'
            })
                .then(function (response) { return _this.$q.when(_this._preparateEventsTypes(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventTypeService.prototype.getEventType = function (eventTypeId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + 'event_types/' + eventTypeId
            })
                .then(function (response) { return _this.$q.when(_this._preparateEventType(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventTypeService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        eventTypeService.prototype._preparateEventsTypes = function (data) {
            return data.eventTypes;
        };
        eventTypeService.prototype._preparateEventType = function (data) {
            return data.data.eventTypes;
        };
        return eventTypeService;
    }());
    eventTypeService_1.eventTypeService = eventTypeService;
    angular
        .module('app')
        .service('eventTypeService', eventTypeService);
})(eventTypeService || (eventTypeService = {}));
