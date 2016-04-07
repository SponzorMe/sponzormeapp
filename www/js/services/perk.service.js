/// <reference path="../../typings/tsd.d.ts" />
/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
var perkModule;
(function (perkModule) {
    var perkService = (function () {
        function perkService($http, $localStorage, BackendVariables, $q) {
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
        perkService.prototype.allPerks = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "perks"
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerks(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkService.prototype.createPerk = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "perks",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerk(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkService.prototype.deletePerk = function (perkId) {
            var _this = this;
            return this.$http({
                method: 'DELETE',
                url: this.path + "perks/" + perkId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkService.prototype.editPerkPatch = function (perkId, data) {
            var _this = this;
            return this.$http({
                method: 'PATCH',
                url: this.path + "perks/" + perkId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerk(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkService.prototype.editPerkPut = function (perkId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + "perks/" + perkId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerk(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkService.prototype.buildPerk = function (data) {
            var perk = data;
            perk.event = data.Event || {};
            perk.sponzor_tasks = data.SponzorTasks || [];
            perk.tasks = data.Tasks || [];
            return perk;
        };
        perkService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        perkService.prototype._preparatePerks = function (data) {
            return data.Perk;
        };
        perkService.prototype._preparatePerk = function (data) {
            return this.buildPerk(data.Perk);
        };
        return perkService;
    }());
    perkModule.perkService = perkService;
    angular
        .module('app')
        .service('perkService', perkService);
})(perkModule || (perkModule = {}));
