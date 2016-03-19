/// <reference path="../../typings/main.d.ts" />
/**
* categoryService
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
var categoryService;
(function (categoryService_1) {
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
                url: this.path + 'categories'
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        categoryService.prototype.getCategory = function (categoryId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + 'categories/' + categoryId
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        categoryService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        return categoryService;
    }());
    categoryService_1.categoryService = categoryService;
    angular
        .module('app')
        .service('categoryService', categoryService);
})(categoryService || (categoryService = {}));
