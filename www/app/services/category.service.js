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
    .factory('eventService', eventService);

  eventService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function eventService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      allCategories : allCategories,
      getCategory: getCategory
    };

    return service;

    ////////////

    function getToken(){
      return $localStorage.token;
    }

    function allCategories(){
      return $http.get(path + 'categories')
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function getCategory( categoryId ){
      return $http.get(path + 'categories/' + categoryId )
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
