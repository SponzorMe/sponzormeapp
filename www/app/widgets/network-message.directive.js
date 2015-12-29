// Description:
// Network message online / offline
// Usage:
// <spm-network-message></spm-network-message>
(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('spmNetworkMessage', spmNetworkMessage);

  spmNetworkMessage.$inject = [
    '$cordovaNetwork',
    '$rootScope'
  ];

  function spmNetworkMessage( $cordovaNetwork, $rootScope ) {

    var directive = {
      restrict: 'E',
      controller: controller,
      templateUrl: 'app/widgets/network-message.html'
    };
    return directive;

    function controller( $scope ) {

      $scope.message = $cordovaNetwork.isOffline();

      // listen for Online event
      $rootScope.$on('$cordovaNetwork:online', updateNetworkState);
      // listen for Offline event
      $rootScope.$on('$cordovaNetwork:offline', updateNetworkState);

      function updateNetworkState(event, networkState){
        $scope.message = $cordovaNetwork.isOffline();
      }

    }
  }
})();