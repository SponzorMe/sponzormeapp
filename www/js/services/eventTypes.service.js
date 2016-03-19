/// <reference path="../../typings/main.d.ts" />
/**
* @Service de eventType
*
* @author Nicolas Molina
* @version 0.2

(function() {
  'use strict';

  angular
    .module('app')
    .factory('eventTypeService', eventTypeService);

  eventTypeService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function eventTypeService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      allEventTypes: allEventTypes,
      getEventType: getEventType
    };

    return service;

    ////////////

    function allEventTypes() {
      return $http({
        method: 'GET',
        url: path + 'event_types'
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.eventTypes );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getEventType( eventTypeId ){

      //Validate
      var typeEventTypeId = typeof eventTypeId;
      if(typeEventTypeId !== 'string' && typeEventTypeId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'event_types/' + eventTypeId
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.data.eventTypes );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

  }
})();
*/ 
