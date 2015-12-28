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
      getPerkTaskByOrganizer: getPerkTaskByOrganizer,
      getPerkTaskByOrganizerGroup: getPerkTaskByOrganizerGroup
    };

    return service;

    ////////////

    function allPerkTasks(){
      return $http.get(path + 'perk_tasks')
        .then( complete )
        .catch( failed );

      function complete( response ) {
        return $q.when( groupByEvent( response.data.PerkTasks ) );
      }

      function groupByEvent( data ){
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
      }

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function getPerkTask( perkTaskId ){
      return $http.get(path + 'perk_tasks/' + perkTaskId)
        .then( complete )
        .catch( failed );

      function complete( response ) {
        return $q.when( preparateData( response.data.data ) );
      }

      function preparateData( data ){
        var task = data.PerkTask;
        task.event = data.Event;
        task.perk = data.Perk;
        return task;
      }

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function getPerkTaskByOrganizerGroup( userId ){
      return $http.get(path + 'perk_tasks_organizer/' + userId)
        .then( complete )
        .catch( failed );

      function complete( response ){
        return $q.when( groupByEvent( response.data.PerkTasks ) );
      }

      function groupByEvent( data ){
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
      }

      function failed(){
        return $q.reject( error );
      }
    }

    function getPerkTaskByOrganizer( userId ){
      return $http.get(path + 'perk_tasks_organizer/' + userId)
        .then( complete )
        .catch( failed );

      function complete( response ){
        return $q.when( response.data.PerkTasks );
      }

      function failed( error ){
        return $q.reject( error );
      }
    }

    function createPerkTask( data ){
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
        return $q.when( response.data );
      }

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function deletePerkTask( perkTaskId ){
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

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function editPerkTaskPatch( perkTaskId, data ){
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
        return $q.when( response.data );
      }

      function failed( error ) {
        return $q.reject( error );
      }
    }

    function editPerkTaskPut( perkTaskId, data ){
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
        return $q.when( response.data );
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