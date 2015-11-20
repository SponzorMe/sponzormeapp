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

  eventService.$inject = ['$http', '$localStorage', 'BackendVariables', '$q'];

  function eventService( $http, $localStorage, BackendVariables, $q ) {

    var path = BackendVariables.url;
    var token = $localStorage.token;

    var service = {
      allEvents: allEvents,
      getEvent: getEvent,
      createEvent: createEvent,
      deleteEvent: deleteEvent,
      editEventPatch: editEventPatch,
      editEventPut: editEventPut
    };

    return service;

    ////////////

    function allEvents(){
      return $http.get(path + 'events')
        .then( complete )
        .catch( failed );

      function complete( response ) {
        var events = preparateEvents( response.data.events );
        return $q.when( events );
      }

      function preparateEvents( events ){
        return events.map(function( item ){
          item.image = (item.image == "event_dummy.png") ? 'img/banner.jpg' : item.image;
          item.starts = moment(item.starts).format('MMMM Do YYYY');
          return item;
        });
      }

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function getEvent( eventId ){
      return $http.get(path + 'events/' + eventId )
        .then( complete )
        .catch( failed );

      function complete( response ) {
        return $q.when( preparateData(response.data.data) );

        function preparateData( data ){
          var event = data.event;
          event.image = (event.image == "event_dummy.png") ? 'img/banner.jpg' : event.image;
          event.category = data.category.length === 0 ? event.category : data.category[0];
          event.type = data.type.length === 0 ? event.type : data.type[0];
          event.organizer = data.organizer.length === 0 ? event.organizer : data.organizer[0];
          event.organizer.image = (event.organizer.image == "organizer_sponzorme.png") ? 'img/photo.png' : event.organizer.image;
          return event;
        }
      }

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function createEvent( data ){
      return $http({
        method: 'POST',
        url: path + 'events',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.event );
      }

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function deleteEvent( eventId ){
      return $http({
        method: 'DELETE',
        url: path + 'events/' + eventId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
      });
    }

    function editEventPatch( eventId, data ){
      return $http({
        method: 'PATCH',
        url: path + 'events/' + eventId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

    function editEventPut( eventId, data ){
      return $http({
        method: 'PUT',
        url: path + 'events/' + eventId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

  }
})();
