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
    'sponzorshipService',
    'utilsService',
    '$ionicPopover',
    '$scope'
  ];

  function SponzorListController( $localStorage, sponzorshipService , utilsService, $ionicPopover, $scope) {

    var vm = this;
    var eventsPopover = null;
    //Atributes
    vm.userAuth = $localStorage.userAuth;
    vm.sponsors = [];
    vm.events = [];
    vm.showEmptyState = false;
    vm.search = {};
    vm.results = [];
    //Accions
    vm.filterByEvent = filterByEvent;
    vm.showFilter = showFilter;


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
      sponzorshipService.sponzorshipByOrganizer( vm.userAuth.id )
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
          console.log( error );
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
      if(idEvent){
        vm.search.event_id = idEvent;
      }else{
        vm.search = {};
      }
      
      closePopover();
    }
    

  }
})();