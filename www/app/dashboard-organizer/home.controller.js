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
    .controller('HomeOrganizerController', HomeOrganizerController);

  HomeOrganizerController.$inject = [
    '$localStorage'
  ];

  function HomeOrganizerController( $localStorage ) {

    var vm = this;
    //Atributes
    vm.count_events = 0;
    vm.count_sponsors = 0;
    vm.count_comunity = 0;
    vm.userAuth = $localStorage.userAuth;

    activate();
    ////////////

    function activate(){
      vm.count_events = vm.userAuth.events.filter( filterDate ).length;
      vm.count_comunity = parseInt( vm.userAuth.comunity_size ) || 0;
      vm.count_sponsors = vm.userAuth.sponzorships_like_organizer.length;
    };
    
    function filterDate( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.ends).isAfter( today );
    }

  }
})();