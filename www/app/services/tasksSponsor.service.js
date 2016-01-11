/**
* @Servive for tasks of sponsor
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('tasksSponsorService', tasksSponsorService);

  tasksSponsorService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function tasksSponsorService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;
    var token = $localStorage.token;

    var service = {
      getAllTasks: getAllTasks,
      getTask: getTask,
      createTask: createTask,
      editPutTask: editPutTask,
      editPatchTask: editPatchTask,
      deleteTask: deleteTask
    };

    return service;

    ////////////

    function getToken(){
      return $localStorage.token;
    }

    function getAllTasks(){
      return $http({
        method: 'GET',
        url: path + 'task_sponzor',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.TasksSponzor );
      }

      function failed( response ) {
        return $q.reject( response );
      }
    }

    function getTask( id ){
      return $http({
        method: 'GET',
        url: path + 'task_sponzor/' +  id,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        }
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( preparateTask( response.data ) );
      }

      function preparateTask( data ){
        var task = data.Task;
        task.organizer = data.Organizer || null;
        task.event = data.Event || null;
        task.sponzor = data.Sponzor || null;
        return task;
      }

      function failed( response ) {
        return $q.reject( response );
      }
    }

    function createTask( data ){
      return $http({
        method: 'POST',
        url: path + 'task_sponzor',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.TaskSponzor );
      }

      function failed( response ) {
        return $q.reject( response );
      }
    }

    function editPutTask( id, data ){
      return $http({
        method: 'PUT',
        url: path + 'task_sponzor/' +  id,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.TaskSponzor );
      }

      function failed( response ) {
        return $q.reject( response );
      }
    }

    function editPatchTask( id, data ){
      return $http({
        method: 'PATCH',
        url: path + 'task_sponzor/' +  id,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.TaskSponzor );
      }

      function failed( response ) {
        return $q.reject( response );
      }
    }

    function deleteTask( id ){
      return $http({
        method: 'DELETE',
        url: path + 'task_sponzor/' +  id,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        }
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data );
      }

      function failed( response ) {
        return $q.reject( response );
      }
    }

    

  }
})();