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
    .controller('SponzorListController', SponzorListController);

  SponzorListController.$inject = [
    '$localStorage',
    'sponsorshipService',
    'utilsService',
    '$ionicPopover',
    '$ionicPopup',
    '$ionicScrollDelegate',
    '$scope',
    '$rootScope',
    '$ionicHistory'
  ];

  function SponzorListController( $localStorage, sponsorshipService , utilsService, $ionicPopover, $ionicPopup, $ionicScrollDelegate, $scope, $rootScope, $ionicHistory) {

    var vm = this;
    var eventsPopover = null;
    //Atributes
    vm.search = {};
    vm.sponsors = [];
    vm.events = [];
    vm.results = [];
    vm.userAuth = $localStorage.userAuth;
    vm.showEmptyState = false;
    //Accions
    vm.filterByEvent = filterByEvent;
    vm.showFilter = showFilter;
    vm.sponsorAccept = sponsorAccept;
    vm.sponsorReject = sponsorReject;
    vm.doRefresh = doRefresh;

    activate();

    ////////////

    function activate(){
      $ionicPopover.fromTemplateUrl('app/sponsors-organizer/events-popover.html', {
        scope: $scope
      }).then(function(popover) {
        eventsPopover = popover;
      });
      getSponsors();
    }

    function getSponsors(){
      utilsService.showLoad();
      sponsorshipService.sponzorshipByOrganizer( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( sponsors ){
          utilsService.hideLoad();
          vm.showEmptyState = true;
          vm.sponsors = sponsors;
          vm.events = getEvents( vm.sponsors );
        }

        function failed( error ){
          utilsService.hideLoad();
          vm.showEmptyState = true;
        }
    }

    function getEvents( sponsors ){
      return sponsors
        .filter( filterByEvent )
        .map( mapEvent );

      function filterByEvent( item, pos, array ){
        var position;
        for (var i = 0; i < array.length; i++) {
          if(array[i].event_id == item.event_id){
            position = i;
            break;
          }
        }
        return position == pos;
      }

      function mapEvent( item ){
        return {
          title: item.title,
          id: item.event_id
        }
      }
    }

    function showFilter($event) {
      eventsPopover.show($event);
    };

    function closePopover() {
      eventsPopover.hide();
    };

    function filterByEvent( idEvent ){
      vm.search = {};
      if(idEvent) vm.search.event_id = idEvent;
      $ionicScrollDelegate.scrollTop();
      closePopover();
    }

    function sponsorAccept( sponzor ){
      confirmPopup('Are you sure?', 'In the accept the sponsor')
        .then( complete );

        function complete( rta ){
          if( rta ) updateSponsorship( sponzor, 1 ); //Accepted 
        }
    }

    function sponsorReject( sponzor ){
      confirmPopup('Are you sure?', 'In the reject the sponsor')
        .then( complete );

        function complete( rta ){
          if( rta ) updateSponsorship( sponzor, 2 ); //Deny
        }
    }

    function confirmPopup(title, template){
      return $ionicPopup.confirm({
        title: title,
        template: template
      });
    }

    function updateSponsorship( sponzor, status ){
      utilsService.showLoad();
      var sponzorCopy = angular.copy( sponzor );
      sponzorCopy.status = status;
      sponsorshipService.editSponzorshipPut( sponzorCopy.id, sponzorCopy )
        .then( complete )
        .catch( failed );

        function complete( sponzorRta ){
          utilsService.hideLoad();
          sponzor.status = sponzorRta.status;
          $ionicHistory.clearCache();
        }

        function failed( error ){
          utilsService.hideLoad();
        }

    }

    function doRefresh(){
      sponsorshipService.sponzorshipByOrganizer( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( sponsors ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.search = {};
          vm.sponsors = sponsors;
          vm.events = getEvents( vm.sponsors );
          $rootScope.$broadcast('Menu:count_sponsors', vm.sponsors.length);
        }

        function failed( error ){
          vm.showEmptyState = true;
        }
    }
    

  }
})();