/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-organizer')
    .controller('PastEventsController', PastEventsController);

  PastEventsController.$inject = [
    '$translate',
    '$localStorage',
    'userService',
    'utilsService',
    '$scope',
    '$rootScope'
  ];

  function PastEventsController( $translate, $localStorage, userService , utilsService, $scope, $rootScope) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;

    activate();

    ////////////

    function activate(){
      getEvents();
    }

    function getEvents(){
      utilsService.showLoad();
      userService.getUser( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          utilsService.hideLoad();
          vm.showEmptyState = false;
          console.log( user.events.length );
          vm.events = user.events.filter( filterDate );
          vm.showEmptyState = vm.events.length == 0 ? true : false;
          $rootScope.$broadcast('Menu:count_events', vm.events.length);
        }

        function failed( error ){
          utilsService.hideLoad();
          vm.showEmptyState = true;
          console.log( error );
        }
    }

    function doRefresh(){
      userService.getUser( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          console.log( user.events.length );
          vm.events = user.events.filter( filterDate );
          $rootScope.$broadcast('Menu:count_events', vm.events.length);
        }

        function failed( error ){
          console.log( error );
        }
    }

    function filterDate( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.ends).isBefore( today );
    }
    

  }
})();