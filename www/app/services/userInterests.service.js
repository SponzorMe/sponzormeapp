/**
* @Servicio de Interes del usuario
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('userInterestService', userInterestService);

  userInterestService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function userInterestService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      createUserInterest: createUserInterest
    };

    return service;

    ////////////

    function getToken(){
      return $localStorage.token;
    }

    function createUserInterest( data ){
      return $http({
        method: 'POST',
        url: path + 'user_interests',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.UserInterest );
      } 

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

  }
})();
