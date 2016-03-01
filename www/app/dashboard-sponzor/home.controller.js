/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.dashboard-sponzor')
    .controller('HomeSponzorController', HomeSponzorController);

  HomeSponzorController.$inject = [
    '$localStorage',
    'userService',
    'utilsService',
    '$scope',
    '$rootScope',
    'userAuthService'
  ];

  function HomeSponzorController(  $localStorage, userService, utilsService, $scope, $rootScope, userAuthService) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    vm.events = [];
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();
    ////////////

    function activate(){
      vm.events = vm.userAuth.events.filter( filterDate );
      $rootScope.$on('HomeSponzorController:getEvents', getEvents);
    }
    
    function getEvents(event) {
      vm.userAuth = userAuthService.getUserAuth();
      vm.events = vm.userAuth.events.filter( filterDate );
    }

    function doRefresh(){
      userService.home( vm.userAuth.id  )
        .then( complete );
        //.catch(failed );

        function complete( user ){
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.events = vm.userAuth.events.filter( filterDate );
          $scope.$broadcast('scroll.refreshComplete');
        }

        /*
        function failed( error ){
          console.log( error );
        }*/
    }

    function filterDate( item ){
      return moment(item.ends).isAfter( new Date() );
    }
    
    

  }
})();