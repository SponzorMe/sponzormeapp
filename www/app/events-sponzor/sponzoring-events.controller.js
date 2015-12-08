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
    .controller('SponzoringEventsController', SponzoringEventsController);

  SponzoringEventsController.$inject = [
    '$translate',
    '$localStorage',
    'utilsService',
    'sponzorshipService',
    '$scope'
  ];

  function SponzoringEventsController( $translate, $localStorage, utilsService, sponzorshipService, $scope) {

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
      sponzorshipService.sponzorshipBySponzor( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( events ){
          utilsService.hideLoad();
          vm.events = events.filter( filterByPending );
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

    function doRefresh(){
      sponzorshipService.sponzorshipBySponzor( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( events ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.events = events.filter( filterByPending );
        }

        function failed( error ){
          console.log( error );
        }
    }

    function filterByPending( item ){
      return item.status == '1';
    }
    

  }
})();