/**
* @Service de eventType
*
* @author Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('App')
    .factory('eventTypeService', eventTypeService);

  //eventTypeService.$inject = ['$http', '$localStorage', 'BackendVariables'];

  function eventTypeService(  ) {

    var path = BackendVariables.url;
    var token = $localStorage.token;

    var service = {
      allEventTypes: allEventTypes,
      getEventTypes: getEventTypes,
      createEventType: createEventType,
      deleteEventType: deleteEventType,
      editEventTypePatch: editEventTypePatch,
      editEventTypePut: editEventTypePut
    };

    return service;

    ////////////

    function allEventTypes() {
      return $http.get(path + 'event_types')
        .then(allEventTypesComplete)
        .catch(allEventTypesFailed);

      function allEventTypesComplete( response ) {
        return response.data.eventTypes;
      }

      function allEventTypesFailed( error ) {
        return error;
      }
    }

    function getEventTypes( eventTypeId ){
      return $http.get(path + 'event_types/' + eventTypeId);
    }

    function createEventType( data ){
      return $http({
        method: 'POST',
        url: path + 'event_types',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

    function deleteEventType( eventTypeId ){
      return $http({
        method: 'DELETE',
        url: path + 'event_types/' + eventTypeId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
      });
    }

    function editEventTypePatch( eventTypeId, data ){
      return $http({
        method: 'PATCH',
        url: path + 'event_types/' + eventTypeId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

    function editEventTypePut( eventTypeId, data ){
      return $http({
        method: 'PUT',
        url: path + 'event_types/' + eventTypeId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

  }
})();