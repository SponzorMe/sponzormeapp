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
      allEvents: allEvents,
      getEvent: getEvent,
      createEvent: createEvent,
      deleteEvent: deleteEvent,
      editEventPatch: editEventPatch,
      editEventPut: editEventPut
    };

    return service;

    ////////////
    function getToken(){
      return $localStorage.token;
    }

    function allEvents(){
      
      return $http({
        method: 'GET',
        url: path + 'events'
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        var events = preparateData( response.data.data.events );
        return $q.when( events );
      }

      function preparateData( events ){
        return events.map( preparateEvent );

        function preparateEvent( item ){
          item.image = (item.image == "event_dummy.png") ? 'img/banner.jpg' : item.image;
          item.starts = moment(item.starts)._d;
          item.ends = moment(item.ends)._d;
          return item;
        }
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getEvent( eventId ){

      //Validate
      var typeEventId = typeof eventId;
      if(typeEventId !== 'string' && typeEventId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'events/' + eventId
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( preparateData(response.data.event) );

        function preparateData( event ){
          event.image = (event.image == "event_dummy.png") ? 'img/banner.jpg' : event.image;
          event.user_organizer.image = (event.user_organizer.image == "organizer_sponzorme.png") ? 'img/photo.png' : event.user_organizer.image;
          event.starts = moment(event.starts)._d;
          event.ends = moment(event.ends)._d;
          return event;
        }
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function createEvent( data ){

      //Validate
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'POST',
        url: path + 'events',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ getToken()
        },
        data: data
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.event );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function deleteEvent( eventId ){

      //Validate
      var typeEventId = typeof eventId;
      if(typeEventId !== 'string' && typeEventId !== 'number') throw new Error();

      return $http({
        method: 'DELETE',
        url: path + 'events/' + eventId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editEventPatch( eventId, data ){

      //Validate
      var typeEventId = typeof eventId;
      if(typeEventId !== 'string' && typeEventId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PATCH',
        url: path + 'events/' + eventId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.event );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editEventPut( eventId, data ){

      //Validate
      var typeEventId = typeof eventId;
      if(typeEventId !== 'string' && typeEventId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PUT',
        url: path + 'events/' + eventId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.event );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    

  }
})();
