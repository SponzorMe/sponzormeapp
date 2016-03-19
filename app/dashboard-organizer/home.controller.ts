/// <reference path="../../typings/main.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2

(function() {
  'use strict';

  angular
    .module('app.dashboard-organizer')
    .controller('HomeOrganizerController', HomeOrganizerController);

  HomeOrganizerController.$inject = [
    '$localStorage',
    '$rootScope',
    'userAuthService',
    'notificationService'
  ];

  function HomeOrganizerController( $localStorage, $rootScope, userAuthService, notificationService ) {

    var vm = this;
    //Atributes
    vm.count_events = 0;
    vm.count_sponsors = 0;
    vm.count_comunity = 0;
    vm.userAuth = userAuthService.getUserAuth();
    vm.notifications = [];

    activate();
    ////////////

    function activate(){
      $rootScope.$on('HomeOrganizerController:count_sponsors', renderCountSponsors);
      $rootScope.$on('HomeOrganizerController:count_events', renderCountEvents);
      
      vm.count_events = vm.userAuth.events.filter( filterDate ).length;
      vm.count_comunity = parseInt( vm.userAuth.comunity_size ) || 0;
      vm.count_sponsors = vm.userAuth.sponzorships_like_organizer.length;
      vm.notifications = notificationService.getNotifications( vm.userAuth.id );
      
    };
    
    function renderCountSponsors() {
      vm.userAuth = userAuthService.getUserAuth();
      vm.count_sponsors = vm.userAuth.sponzorships_like_organizer.length;
    }
    
    function renderCountEvents(){
      vm.userAuth = userAuthService.getUserAuth();
      vm.count_events = vm.userAuth.events.filter( filterDate ).length;
    }
    
    function filterDate( item ){
      var today = moment( new Date() ).subtract(1, 'days');
      return moment(item.ends).isAfter( today );
    }

  }
})();
*/