/**
* @Servicio de Usuarios
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('userService', userService);

  userService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function userService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      login: login,
      getUser: getUser,
      createUser: createUser,
      deleteUser: deleteUser,
      editUserPatch: editUserPatch,
      editUserPut: editUserPut,
      forgotPassword: forgotPassword,
      invitedUser: invitedUser,
      checkSession: checkSession
    };

    return service;

    ////////////

    function login( email, password ){

      //Validate
      var typeEmail = typeof email;
      if(typeEmail !== 'string') throw new Error();
      var typePassword = typeof password;
      if(typePassword !== 'string' && typePassword !== 'number') throw new Error();


      return $http({
        method: 'POST',
        url: path + 'auth',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
        data: $httpParamSerializerJQLike({
          email: email,
          password: password
        })
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.user );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getUser( userId ){

      //Validate
      var typeUserId = typeof userId;
      if(typeUserId !== 'string' && typeUserId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'users/' + userId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ getToken() },
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        var data = response.data.data.user;
        data.events = preparateEvents( data.events );
        return $q.when( data );
      }

      function preparateEvents( events ){
        return events
          .map( preparateEvent );

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

    function createUser( data ){

      //Validate
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'POST',
        url: path + 'users',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.User );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function deleteUser( userId ){

      //Validate
      var typeUserId = typeof userId;
      if(typeUserId !== 'number' && typeUserId !== 'string') throw new Error();

      return $http({
        method: 'DELETE',
        url: path + 'users/' + userId,
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

    function editUserPatch( userId, data ){

      //Validate
      var typeUserId = typeof userId;
      if(typeUserId !== 'number' && typeUserId !== 'string') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PATCH',
        url: path + 'users/' + userId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.User );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function editUserPut( userId, data ){

      //Validate
      var typeUserId = typeof userId;
      if(typeUserId !== 'number' && typeUserId !== 'string') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PUT',
        url: path + 'users/' + userId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.User );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function forgotPassword( email ){

      //Validate
      var typeEmail = typeof email;
      if(typeEmail !== 'string') throw new Error();

      return $http({
        method: 'POST',
        url: path + 'send_reset_password',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike({
          email: email
        })
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

    function invitedUser( data ){

      //Validate
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'POST',
        url: path + 'invite_friend',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
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

    function checkSession(){
      if(angular.isDefined($localStorage.token) && angular.isDefined($localStorage.userAuth)){
        return true;
      }
      return false;
    }

    function getToken(){
      return $localStorage.token;
    }

  }
})();
