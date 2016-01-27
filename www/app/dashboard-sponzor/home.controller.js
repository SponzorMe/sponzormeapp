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
    '$scope'
  ];

  function HomeSponzorController(  $localStorage, eventService, utilsService, $scope) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();

    ////////////

    function activate(){
      getEvents();
    }

    function getEvents(){
      utilsService.showLoad();
      eventService.allEvents( )
        .then( complete )
        .catch(failed );

        function complete( events ){
          utilsService.hideLoad();
          vm.events = events.filter( filterDate );
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }

    function doRefresh(){
      eventService.allEvents( )
        .then( complete );
        //.catch(failed );

        function complete( events ){
          vm.events = events.filter( filterDate );
          $scope.$broadcast('scroll.refreshComplete');
        }

        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function filterDate( item ){
      return moment(item.ends).isAfter(new Date());
    }
    

  }
})();