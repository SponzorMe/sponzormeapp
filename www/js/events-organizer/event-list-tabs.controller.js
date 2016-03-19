/// <reference path="../../typings/main.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2

(function() {
  'use strict';

  angular
    .module('app.sponsors-organizer')
    .controller('EventsTabsController', EventsTabsController);

  EventsTabsController.$inject = [
    'userAuthService',
    '$rootScope'
  ];

  function EventsTabsController( userAuthService, $rootScope ) {

    var vm = this;
    vm.userAuth = userAuthService.getUserAuth();
    vm.count_events = 0;
    vm.count_past_events = 0;

    activate();
    ////////////

    function activate(){
      
      $rootScope.$on('EventsTabsController:count_events', renderCounts);
      
      vm.count_events = vm.userAuth.events.filter( filterByDateIsAfter ).length;
      vm.count_past_events = vm.userAuth.events.length - vm.count_events;
    }
    
    function filterByDateIsAfter( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.ends).isAfter( today );
    }
    
    function renderCounts() {
      vm.userAuth = userAuthService.getUserAuth();
      vm.count_events = vm.userAuth.events.filter( filterByDateIsAfter ).length;
      vm.count_past_events = vm.userAuth.events.length - vm.count_events;
    }

  }
})();
*/ 
