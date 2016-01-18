/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.dashboard-organizer')
    .controller('MenuOrganizerCtrl', MenuOrganizerCtrl);

  MenuOrganizerCtrl.$inject = [
    '$state',
    '$localStorage',
    '$rootScope',
    'userService',
    'sponsorshipService',
    'perkTaskService'
  ];

  function MenuOrganizerCtrl( $state, $localStorage, $rootScope, userService, sponsorshipService, perkTaskService ) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.count_events = 0;
    vm.count_sponsors = 0;
    vm.count_tasks = 0;
    //Funcions
    vm.logout = logout;

    activate();
    ////////////

    function logout(){
      $localStorage.$reset();
      $state.go('signin');
    }

    function activate(){
      $rootScope.$on('Menu:count_events', renderCountEvents);
      $rootScope.$on('Menu:count_sponsors', renderCountSponsors);
      $rootScope.$on('Menu:count_tasks', renderCountTasks);
      getEvents();
      getSponsors();
      getTasks();
    }

    function renderCountEvents( event, total ){
      vm.count_events = total;
    }

    function renderCountSponsors( event, total ){
      vm.count_sponsors = total;
    }

    function renderCountTasks(event, total ){
      vm.count_tasks = total;
    }

    function getEvents(){
      userService.getUser( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          vm.count_events = user.events.filter( filterDate ).length;
        }

        function failed( error ){
          console.log( error );
        }
    }

    function filterDate( item ){
      return moment(item.ends).isAfter(new Date());
    }

    function getSponsors(){
      /*sponsorshipService.sponzorshipByOrganizer( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( sponsors ){
          vm.count_sponsors = sponsors.length;
        }

        function failed( error ){
          console.log( error );
        }*/
    }

    function getTasks(){
      perkTaskService.getPerkTaskByOrganizer( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( tasks ){
          vm.count_tasks = tasks.filter( filterByDone ).length;
        }

        function failed( error ){
          console.log( error );
        }
    }

    function filterByDone( item ){
      return item.status != '1';
    }

  }
})();