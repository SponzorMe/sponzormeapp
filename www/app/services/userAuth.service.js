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
    '$localStorage',
    'userService',
    '$rootScope'
  ];

  function userAuthService( $http, $q, $localStorage, userService, $rootScope ) {

    this.getUserAuth = getUserAuth;
    this.updateUserAuth = updateUserAuth;
    this.checkSession = checkSession;
    this.refresh = refresh;
    
    function getUserAuth() {
      return $localStorage.userAuth;
    }
    
    function updateUserAuth( data ){
      $localStorage.userAuth = angular.extend($localStorage.userAuth || {}, data);
      $localStorage.lastUpdate = new Date().getTime();
      return $localStorage.userAuth;
    }
    
    function checkSession(){
      if(angular.isDefined($localStorage.token) && angular.isDefined($localStorage.userAuth)){
        return true;
      }
      return false;
    }
    
    function refresh() {
      userService.home( getUserAuth().id )
      .then(complete);
      
      function complete( user ){
        var userAuth = updateUserAuth( user );
        if(userAuth.type == 0){ //Is an organizer
          
          $rootScope.$broadcast('MenuOrganizer:count_events');
          $rootScope.$broadcast('EventsTabsController:count_events');
          $rootScope.$broadcast('HomeOrganizerController:count_events');
          
          $rootScope.$broadcast('MenuOrganizer:count_tasks');
          $rootScope.$broadcast('TaskTabsController:count_tasks');
          
          $rootScope.$broadcast('MenuOrganizer:count_sponsors');
          $rootScope.$broadcast('SponsorshipsTabsController:count_sponsors');
          $rootScope.$broadcast('HomeOrganizerController:count_sponsors');
          
          $rootScope.$broadcast('SponsorshipsListController:getSponzorships');
          $rootScope.$broadcast('SponsorshipsPastEventsController:getSponzorships');
          
          $rootScope.$broadcast('EventListController:getEvents');
          $rootScope.$broadcast('PastEventsController:getEvents');
          
        }else{
          $rootScope.$broadcast('MenuSponzor:counts');
          
          $rootScope.$broadcast('FollowEventsController:getSponzorships');
          $rootScope.$broadcast('SponzoringEventsController:getSponzorships');
          
          $rootScope.$broadcast('HomeSponzorController:getEvents');
        }
        
      }
    }
    
  }
})();