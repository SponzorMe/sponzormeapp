// Description:
// Network message online / offline
// Usage:
// <spm-network-message></spm-network-message>
(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('spmNotification', spmNotification);

  spmNotification.$inject = [
    '$state'
  ];

  function spmNotification( $state ) {

    var directive = {
      restrict: 'E',
      replace: true,
      scope:{
        type: '@',
        model: '=',
      },
      link: link,
      templateUrl: 'app/widgets/spm-notification.html'
    };
    return directive;

    function link( $scope ) {
      
      $scope.read = read;
      
      function read(){
        $scope.model.read = false;
      }
      

    }
  }
})();