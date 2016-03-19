/// <reference path="../../typings/main.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2

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
    '$rootScope',
    'userAuthService'
  ];

  function SponzoringEventsController( $localStorage, userService, utilsService, $scope, $rootScope, userAuthService) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.events = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();
    ////////////

    function activate(){
      vm.sponzorships = vm.userAuth.sponzorships.filter( filterByAccepted );
      vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
      $rootScope.$on('SponzoringEventsController:getSponzorships', getSponzorships);
    }
    
    function getSponzorships() {
      vm.userAuth = $localStorage.userAuth;
      vm.sponzorships = vm.userAuth.sponzorships.filter( filterByAccepted );
      vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.sponzorships = vm.userAuth.sponzorships.filter( filterByAccepted );
          vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
          $rootScope.$broadcast('MenuSponzor:counts');
          $rootScope.$broadcast('FollowEventsController:getSponzorships');
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
*/