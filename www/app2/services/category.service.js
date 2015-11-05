/**
* @Service of Categories
*
* @author Nicolas Molina
* @version 0.2

(function() {
  'use strict';

  angular
    .module('App')
    .factory('categoryService', categoryService);

  categoryService.$inject = ['$http', '$localStorage', 'BackendVariables'];

  function categoryService( $http, $localStorage, BackendVariables ) {

    var path = BackendVariables.url;
    var token = $localStorage.token;

    var service = {
      allCategories: allCategories,
      createCategory: createCategory,
      deleteCategory: deleteCategory,
      editCategoryPatch: editCategoryPatch,
      editCategoryPut: editCategoryPut
    };

    return service;

    ////////////

    function allCategories() {
      return $http.get(path + 'categories');
    }

    function createCategory( data ) {
      return $http({
        method: 'POST',
        url: path + '/categories',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

    function deleteCategory( categoryId ) {
      return $http({
        method: 'DELETE',
        url: path + 'categories/' + categoryId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
      });
    }

    function editCategoryPatch( categoryId, data ) {
      return $http({
        method: 'PATCH',
        url: path + 'categories/' + categoryId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

    function editCategoryPut( categoryId, data ) {
      return $http({
        method: 'PUT',
        url: path + 'categories/' + categoryId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

  }
})();
*/