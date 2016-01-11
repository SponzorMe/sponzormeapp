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
    'sponzorshipService',
    '$scope',
    '$rootScope'
  ];

  function FollowEventsController( $translate, $localStorage, utilsService, sponzorshipService, $scope, $rootScope) {

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
          vm.showEmptyState = vm.events.length == 0 ? true : false;
        }

        function failed( error ){
          utilsService.hideLoad();
          vm.showEmptyState = true;
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
          $rootScope.$broadcast('Menu:count_following', vm.events.length);
        }

        function failed( error ){
          console.log( error );
        }
    }

    function filterByPending( item ){
      return item.status != '1';
    }
    
    function filterDate( item ){
      return moment(item.ends).isAfter(new Date());
    }

  }
})();