/**
* @Servicio de Eventos
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('categoryService', categoryService);

  categoryService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function categoryService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      allCategories : allCategories,
      getCategory: getCategory
    };

    return service;

    ////////////

    /*
    function getToken(){
      return $localStorage.token;
    }*/

    function allCategories(){
      return $http({
        method: 'GET',
        url: path + 'categories'
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.categories );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function getCategory( categoryId ){

      //Validate
      var typeCategoryId = typeof categoryId;
      if(typeCategoryId !== 'string' && typeCategoryId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'categories/' + categoryId
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.data.category );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

  }
})();
