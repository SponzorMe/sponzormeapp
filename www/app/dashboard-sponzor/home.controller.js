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
    '$scope'
  ];

  function HomeSponzorController( $localStorage, $scope) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();
    ////////////

    function activate(){
      vm.events = vm.userAuth.events.filter( filterDate );
    }

    function doRefresh(){
      vm.events = vm.userAuth.events.filter( filterDate );
      $scope.$broadcast('scroll.refreshComplete');
    }

    function filterDate( item ){
      return moment(item.ends).isAfter(new Date());
    }
    

  }
})();