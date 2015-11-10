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

  userService.$inject = ['$http', '$localStorage', 'BackendVariables', '$q'];

  function userService( $http, $localStorage, BackendVariables, $q ) {

    var path = BackendVariables.url;
    var token = $localStorage.token;

    var service = {
      login: login,
      allUsers: allUsers,
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

    function login( user ){
      return $http({
        method: 'POST',
        url: path + 'auth',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
        data: $.param({
          email: user.email,
          password: user.password
        })
      })
      .then( loginComplete )
      .catch( loginFailed );

      function loginComplete( response ) {
        return $q.when( response.data );
      } 

      function loginFailed( response ) {
        return $q.reject( response.data );
      }
    }

    function allUsers(){
      return $http.get(path + 'users');
    }

    function getUser( userId ){
      $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
      return $http.get(path + 'users/' + userId)
        .then( getUserComplete )
        .catch( getUserFailed );

      function getUserComplete( response ) {
        var data = response.data.data.user;
        data.events = preparateEvents( data.events );
        return $q.when( data );
      } 

      function preparateEvents( events ){
        return events.map(function( item ){
          item.starts = moment(item.starts).format('MMMM Do YYYY');
          return item;
        });
      }

      function getUserFailed( response ) {
        return $q.reject( response.data );
      }
    }

    function createUser( data ){
      return $http({
        method: 'POST',
        url: path + 'users',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      })
      .then( createUserComplete )
      .catch( createUserFailed );

      function createUserComplete( response ) {
        return $q.when( response );
      } 

      function createUserFailed( response ) {
        return $q.reject( response.data );
      }
    }

    function deleteUser( userId ){
      return $http({
        method: 'DELETE',
        url: path + 'users/' + userId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
      });
    }

    function editUserPatch( userId ){
      return $http({
        method: 'PATCH',
        url: path + 'users/' + userId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

    function editUserPut( userId ){
      return $http({
        method: 'PUT',
        url: path + 'users/' + userId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

    function forgotPassword( data ){
      return $http({
        method: 'POST',
        url: path + 'send_reset_password/',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      })
      .then( forgotPasswordComplete )
      .catch( forgotPasswordFailed );

      function forgotPasswordComplete( response ) {
        return $q.when( response );
      } 

      function forgotPasswordFailed( response ) {
        return $q.reject( response.data );
      }
    }

    function invitedUser( data ){
      return $http({
        method: 'POST',
        url: path + 'invite_friend/',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      });
    }

    function checkSession(localToken, localUser){
      if(angular.isDefined(localToken) && angular.isDefined(localUser)){
        return true;
      }
      return false;
    }

  }
})();
