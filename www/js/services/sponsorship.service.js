/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="event.service.ts" />
/**
* @Servicio de Sponzorships (Beneficios)
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
var sponsorshipModule;
(function (sponsorshipModule) {
    var sponsorshipService = (function () {
        function sponsorshipService($http, $localStorage, $q, eventService, BackendVariables) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.$q = $q;
            this.eventService = eventService;
            this.BackendVariables = BackendVariables;
            this.$inject = [
                '$http',
                '$localStorage',
                '$q',
                'eventService',
                'BackendVariables'
            ];
            this.path = this.BackendVariables.url;
        }
        sponsorshipService.prototype.allSponsorships = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "sponzorships"
            })
                .then(function (response) { return _this.$q.when(_this._preparateSponsorships(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        sponsorshipService.prototype.getSponzorship = function (sponsorshipId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "sponzorships/" + sponsorshipId
            })
                .then(function (response) { return _this.$q.when(_this._preparateSponsorship(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        sponsorshipService.prototype.createSponzorship = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "sponzorships",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateSponsorship(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        sponsorshipService.prototype.deleteSponzorship = function (sponsorshipId) {
            var _this = this;
            return this.$http({
                method: 'DELETE',
                url: this.path + "sponzorships/" + sponsorshipId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        sponsorshipService.prototype.editSponzorshipPatch = function (sponsorshipId, data) {
            var _this = this;
            return this.$http({
                method: 'PATCH',
                url: this.path + "sponzorships/" + sponsorshipId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateSponsorship(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        sponsorshipService.prototype.editSponzorshipPut = function (sponsorshipId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + "sponzorships/" + sponsorshipId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateSponsorship(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        sponsorshipService.prototype.buildSponsorship = function (data) {
            var sponzorship = data;
            sponzorship.sponzor = data.Sponzor || {};
            sponzorship.perk = data.Perk || {};
            sponzorship.organizer = data.Organizer || {};
            sponzorship.event = sponzorship.event ? sponzorship.event : data.Event || {};
            sponzorship.tasks = data.Tasks || [];
            if (sponzorship.sponzor.image) {
                sponzorship.sponzor.image = (sponzorship.sponzor.image == "") ? 'img/photo.png' : sponzorship.sponzor.image;
            }
            sponzorship.event = this.eventService.buildEvent(sponzorship.event);
            return sponzorship;
        };
        sponsorshipService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        sponsorshipService.prototype._preparateSponsorships = function (data) {
            return data.SponzorsEvents;
        };
        sponsorshipService.prototype._preparateSponsorship = function (data) {
            return this.buildSponsorship(data.Sponzorship);
        };
        return sponsorshipService;
    })();
    sponsorshipModule.sponsorshipService = sponsorshipService;
    angular
        .module('app')
        .service('sponsorshipService', sponsorshipService);
})(sponsorshipModule || (sponsorshipModule = {}));
