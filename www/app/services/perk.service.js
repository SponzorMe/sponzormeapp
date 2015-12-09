/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('perkService', perkService);

  perkService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function perkService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;
    var token = $localStorage.token;

    var service = {
      allPerks: allPerks,
      getPerk: getPerk,
      createPerk: createPerk,
      deletePerk: deletePerk,
      editPerkPatch: editPerkPatch,
      editPerkPut: editPerkPut
    };

    return service;

    ////////////

    function allPerks(){
      return $http.get(path + 'perks')
        .then( complete )
        .catch( failed );

      function complete( response ) {
        return $q.when( response.data.Perk );
      }

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function getPerk( perkId ){
      return $http.get(path + 'perks/' + perkId)
        .then( complete )
        .catch( failed );

      function complete( response ) {
        return $q.when( response );
      }

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function createPerk( data ){
      return $http({
        method: 'POST',
        url: path + 'perks',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.PerkTask );
      }

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function deletePerk( perkId ){
      return $http({
        method: 'DELETE',
        url: path + 'perks/' + perkId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response );
      }

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function editPerkPatch( perkId, data ){
      return $http({
        method: 'PATCH',
        url: path + 'perks/' + perkId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response );
      }

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function editPerkPut( perkId, data ){
      return $http({
        method: 'PUT',
        url: path + 'perks/' + perkId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response );
      }

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function getToken(){
      return $localStorage.token;
    }

  }
})();
