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
    '$localStorage',
    'userService',
    'utilsService',
    '$scope',
    '$rootScope'
  ];

  function PastEventsController( $localStorage, userService , utilsService, $scope, $rootScope) {

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
      vm.events = vm.userAuth.events.filter( filterDate );
      vm.showEmptyState = vm.events.length == 0 ? true : false;
    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth.events = $localStorage.userAuth.events = user.events;
          vm.events = vm.userAuth.events.filter( filterDate );
          $rootScope.$broadcast('Menu:count_events', user.events.length - vm.events.length);
        }

        function failed( error ){
          $scope.$broadcast('scroll.refreshComplete');
        }
    }

    function filterDate( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.ends).isBefore( today );
    }
    

  }
})();