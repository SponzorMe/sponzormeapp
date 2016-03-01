/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .service('userAuthService', userAuthService);

  userAuthService.$inject = [
    '$http',
    '$q',
    '$localStorage'
  ];

  function userAuthService( $http, $q, $localStorage ) {

    this.getUserAuth = getUserAuth;
    this.updateUserAuth = updateUserAuth;
    
    function getUserAuth() {
      return $localStorage.userAuth;
    }
    
    function updateUserAuth( data ){
      $localStorage.userAuth = angular.extend($localStorage.userAuth || {}, data);
      $localStorage.lastUpdate = new Date().getTime();
      return $localStorage.userAuth;
    }
    
  }
})();