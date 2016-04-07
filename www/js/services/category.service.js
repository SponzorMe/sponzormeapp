/// <reference path="../../typings/tsd.d.ts" />
/**
* categoryService
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
var categoryModule;
(function (categoryModule) {
    var categoryService = (function () {
        function categoryService($http, $localStorage, $q, BackendVariables) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.$q = $q;
            this.BackendVariables = BackendVariables;
            this.$inject = [
                '$http',
                '$localStorage',
                'BackendVariables',
                '$q',
            ];
            this.path = this.BackendVariables.url;
        }
        categoryService.prototype.allCategories = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "categories"
            })
                .then(function (response) { return _this.$q.when(_this._preparateCategories(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        categoryService.prototype.getCategory = function (categoryId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "categories/" + categoryId
            })
                .then(function (response) { return _this.$q.when(_this._preparateCategory(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        categoryService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        categoryService.prototype._preparateCategories = function (data) {
            return data.categories;
        };
        categoryService.prototype._preparateCategory = function (data) {
            return data.data.category;
        };
        return categoryService;
    }());
    categoryModule.categoryService = categoryService;
    angular
        .module('app')
        .service('categoryService', categoryService);
})(categoryModule || (categoryModule = {}));
