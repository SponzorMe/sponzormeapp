/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="eventType.service.ts" />
/**
* @Servicio de Eventos
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
var eventModule;
(function (eventModule) {
    var eventService = (function () {
        function eventService($http, $localStorage, $q, BackendVariables) {
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
        eventService.prototype.allEvents = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "events"
            })
                .then(function (response) { return _this.$q.when(_this._preparateEvents(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventService.prototype.getEvent = function (eventId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "events/" + eventId
            })
                .then(function (response) { return _this.$q.when(_this._preparateEvent(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventService.prototype.createEvent = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "events",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateEvent(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventService.prototype.deleteEvent = function (eventId) {
            var _this = this;
            return this.$http({
                method: 'DELETE',
                url: this.path + "events/" + eventId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventService.prototype.editEventPatch = function (eventId, data) {
            var _this = this;
            return this.$http({
                method: 'PATCH',
                url: this.path + "events/" + eventId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateEvent(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventService.prototype.editEventPut = function (eventId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + "events/" + eventId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateEvent(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventService.prototype.buildEvent = function (event) {
            event.image = (event.image == undefined || event.image == "event_dummy.png" || event.image == "") ? 'img/banner.jpg' : event.image;
            if (event.user_organizer) {
                event.user_organizer.image = (event.user_organizer.image == "organizer_sponzorme.png" || event.user_organizer.image == "") ? 'img/photo.png' : event.user_organizer.image;
            }
            event.starts = moment(event.starts).toDate();
            event.ends = moment(event.ends).toDate();
            event.privacy = event.privacy || "0" == "1" ? true : false;
            return event;
        };
        eventService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        eventService.prototype._preparateEvents = function (data) {
            return data.data.events.map(this.buildEvent);
        };
        eventService.prototype._preparateEvent = function (data) {
            return this.buildEvent(data.event);
        };
        return eventService;
    }());
    eventModule.eventService = eventService;
    angular
        .module('app')
        .service('eventService', eventService);
})(eventModule || (eventModule = {}));
