/// <reference path="../../typings/main.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipsTabsController', SponsorshipsTabsController);

  SponsorshipsTabsController.$inject = [
    'userAuthService',
    '$rootScope'
  ];

  function SponsorshipsTabsController( userAuthService, $rootScope ) {

    var vm = this;
    vm.userAuth = userAuthService.getUserAuth();
    vm.count_events = 0;
    vm.count_past_events = 0;

    activate();
    ////////////

    function activate(){
      
      $rootScope.$on('SponsorshipsTabsController:count_sponsors', renderCounts);
      
      vm.count_events = vm.userAuth.sponzorships_like_organizer.filter( filterByDateIsAfter ).length;
      vm.count_past_events = vm.userAuth.sponzorships_like_organizer.length - vm.count_events;
    }
    
    function filterByDateIsAfter( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.event.ends).isAfter( today );
    }
    
    function renderCounts() {
      vm.userAuth = userAuthService.getUserAuth();
      vm.count_sponsors = vm.userAuth.sponzorships_like_organizer.length;
      vm.count_past_events = vm.userAuth.sponzorships_like_organizer.length - vm.count_events;
    }
    
    

  }
})();