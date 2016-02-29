/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.dashboard-sponzor')
    .controller('HomeSponzorController', HomeSponzorController);

  HomeSponzorController.$inject = [
    '$localStorage',
    'eventService',
    'utilsService',
    '$scope',
    '$rootScope'
  ];

  function HomeSponzorController(  $localStorage, eventService, utilsService, $scope, $rootScope) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();
    ////////////

    function activate(){
      vm.events = vm.userAuth.events.filter( filterDate );
      $rootScope.$on('HomeSponzorController:getEvents', getEvents);
    }
    
    function getEvents() {
      vm.userAuth = $localStorage.userAuth;
       vm.events = vm.userAuth.events.filter( filterDate );
    }

    function doRefresh(){
      eventService.allEvents()
        .then( complete );
        //.catch(failed );

        function complete( events ){
          vm.userAuth.events = $localStorage.userAuth.events = events;
          vm.events = vm.userAuth.events.filter( filterDate );
          $scope.$broadcast('scroll.refreshComplete');
        }

        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function filterDate( item ){
      return moment(item.ends).isAfter( new Date() );
    }
    
    

  }
})();