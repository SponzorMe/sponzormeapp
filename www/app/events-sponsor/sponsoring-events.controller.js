/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-sponzor')
    .controller('SponzoringEventsController', SponzoringEventsController);

  SponzoringEventsController.$inject = [
    '$localStorage',
    'userService',
    'utilsService',
    '$scope',
    '$rootScope'
  ];

  function SponzoringEventsController( $localStorage, userService, utilsService, $scope, $rootScope) {

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
      vm.sponzorships = vm.userAuth.sponzorships.filter( filterByAccepted );
      vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth = $localStorage.userAuth = user;
          vm.sponzorships = vm.userAuth.sponzorships.filter( filterByAccepted );
          vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
          $rootScope.$broadcast('Menu:count_sponsoring', vm.sponzorships.length);
        }

        function failed( error ){
          $scope.$broadcast('scroll.refreshComplete');
        }
    }

    function filterByAccepted( item ){
      return item.status == '1';
    }
    

  }
})();