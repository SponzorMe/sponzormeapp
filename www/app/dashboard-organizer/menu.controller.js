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
    'perkTaskService',
    '$ionicHistory'
  ];

  function MenuOrganizerCtrl( $state, $localStorage, $rootScope, userService, sponsorshipService, perkTaskService, $ionicHistory ) {

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
      $ionicHistory.clearCache().then(function() {
        $state.go('signin');
      });
    }

    function activate(){
      
      $rootScope.$on('Menu:count_events', renderCountEvents);
      $rootScope.$on('Menu:count_sponsors', renderCountSponsors);
      $rootScope.$on('Menu:count_tasks', renderCountTasks);
      
      vm.count_events = vm.userAuth.events.filter( filterDate ).length;
      vm.count_sponsors = vm.userAuth.sponzorships_like_organizer.length;
      vm.count_tasks = countTasks().length;
      
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

    function filterDate( item ){
      return moment(item.ends).isAfter(new Date());
    }
    
    function countTasks() {
      return vm.userAuth.events
        .reduce( mergePerks, [] )
        .reduce( mergeTasks, [] )
        .filter( filterByUserAndNotDone );
      
      function mergePerks(a,b){
        return a.concat(b.perks);
      }
      
      function mergeTasks(a,b){
        return a.concat(b.tasks);
      }
      
      function filterByUserAndNotDone( item ) {
        return item.user_id == vm.userAuth.id && item.status != '1';
      }
    }
    

  }
})();