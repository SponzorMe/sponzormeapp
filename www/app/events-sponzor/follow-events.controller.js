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
    .controller('FollowEventsController', FollowEventsController);

  FollowEventsController.$inject = [
    '$translate',
    '$localStorage',
    'utilsService',
    'sponzorshipService'
  ];

  function FollowEventsController( $translate, $localStorage, utilsService, sponzorshipService) {

    var vm = this;
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    vm.showEmptyState = false;

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

          function filterByPending( item ){
            return item.status != '1';
          }
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }
    

  }
})();