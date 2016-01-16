/**
* @Servicio de PerkTask
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('perkTaskService', perkTaskService);

  perkTaskService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$httpParamSerializerJQLike',
    '$q'
  ];

  function perkTaskService( $http, $localStorage, BackendVariables, $httpParamSerializerJQLike, $q) {

    var path = BackendVariables.url;

    var service = {
      allPerkTasks: allPerkTasks,
      getPerkTask: getPerkTask,
      createPerkTask: createPerkTask,
      deletePerkTask: deletePerkTask,
      editPerkTaskPatch: editPerkTaskPatch,
      editPerkTaskPut: editPerkTaskPut,
      getPerkTaskByOrganizer: getPerkTaskByOrganizer
    };

    return service;

    ////////////

    function allPerkTasks(){
      return $http.get(path + 'perk_tasks')
        .then( complete )
        .catch( failed );

      function complete( response ) {
        return $q.when( response.data.PerkTasks );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getPerkTask( perkTaskId ){

      //Validate
      var typePerkTaskId = typeof perkTaskId;
      if(typePerkTaskId !== 'string' && typePerkTaskId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'perk_tasks/' + perkTaskId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( preparateData( response.data.data ) );
      }

      function preparateData( data ){
        var task = data.PerkTask;
        task.event = data.Event || {};
        task.perk = data.Perk || {};
        task.user = data.User || {};
        return task;
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getPerkTaskByOrganizer( userId ){

      //Validate
      var typeUserId = typeof userId;
      if(typeUserId !== 'string' && typeUserId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'perk_tasks_organizer/' + userId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.PerkTasks );
      }

      function failed( response ){
        return $q.reject( response.data );
      }

      /*function groupByEvent( data ){
        //http://underscorejs.org/#groupBy
        var groups = _.groupBy( data, 'eventTitle' );
        
        function parseEvent( value, key ){
          return {
            title: key,
            tasks: value
          }
        }
        //http://underscorejs.org/#map
        return _.map( groups , parseEvent);
      }*/
    }

    function createPerkTask( data ){

      //Validate
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'POST',
        url: path + 'perk_tasks',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.PerkTask );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function deletePerkTask( perkTaskId ){

      //Validate
      var typePerkTaskId = typeof perkTaskId;
      if(typePerkTaskId !== 'string' && typePerkTaskId !== 'number') throw new Error();

      return $http({
        method: 'DELETE',
        url: path + 'perk_tasks/' + perkTaskId,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': 'Basic '+ getToken()
        }
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

    function editPerkTaskPatch( perkTaskId, data ){

      //Validate
      var typePerkTaskId = typeof perkTaskId;
      if(typePerkTaskId !== 'string' && typePerkTaskId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PATCH',
        url: path + 'perk_tasks/' + perkTaskId,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike( data )
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.PerkTask );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editPerkTaskPut( perkTaskId, data ){

      //Validate
      var typePerkTaskId = typeof perkTaskId;
      if(typePerkTaskId !== 'string' && typePerkTaskId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PUT',
        url: path + 'perk_tasks/' + perkTaskId,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.PerkTask );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getToken(){
      return $localStorage.token;
    }

  }
})();