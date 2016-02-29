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
    .controller('FollowEventsController', FollowEventsController);

  FollowEventsController.$inject = [
    '$localStorage',
    'utilsService',
    'userService',
    '$scope',
    '$rootScope'
  ];

  function FollowEventsController( $localStorage, utilsService, userService, $scope, $rootScope) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.sponzorships = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();
    ////////////

    function activate(){
      vm.sponzorships = vm.userAuth.sponzorships.filter( filterByPending );
      vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
      $rootScope.$on('FollowEventsController:getSponzorships', getSponzorships);
    }
    
    function getSponzorships() {
      vm.userAuth = $localStorage.userAuth;
      vm.sponzorships = vm.userAuth.sponzorships.filter( filterByPending );
      vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth = $localStorage.userAuth = user;
          vm.sponzorships = vm.userAuth.sponzorships.filter( filterByPending );
          vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
          $rootScope.$broadcast('Menu:count_following');
        }

        function failed( error ){
          $scope.$broadcast('scroll.refreshComplete');
        }
    }

    function filterByPending( item ){
      return item.status != '1';
    }

  }
})();