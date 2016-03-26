/// <reference path="../../typings/main.d.ts" />
/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
var perkModule;
(function (perkModule) {
    var PerkService = (function () {
        function PerkService($http, $localStorage, BackendVariables, $q) {
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
        PerkService.prototype.allPerks = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + 'perks'
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerk(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        PerkService.prototype.getPerk = function (perkId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + 'perks/' + perkId
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerk(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        PerkService.prototype.createPerk = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + 'perks',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerk(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        PerkService.prototype.deletePerk = function (perkId) {
            var _this = this;
            return this.$http({
                method: 'DELETE',
                url: this.path + 'perks/' + perkId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        PerkService.prototype.editPerkPatch = function (perkId, data) {
            var _this = this;
            return this.$http({
                method: 'PATCH',
                url: this.path + 'perks/' + perkId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerk(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        PerkService.prototype.editPerkPut = function (perkId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + 'perks/' + perkId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerk(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        PerkService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        PerkService.prototype._preparatePerk = function (data) {
            return data.Perk;
        };
        PerkService.prototype.buildPerk = function (data) {
            var perk = data;
            perk.event = data.Event || {};
            perk.sponzor_tasks = data.SponzorTasks || [];
            perk.tasks = data.Tasks || [];
            return perk;
        };
        return PerkService;
    }());
    perkModule.PerkService = PerkService;
})(perkModule || (perkModule = {}));
