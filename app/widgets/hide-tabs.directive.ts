/// <reference path="../../typings/main.d.ts" />
// Description:
// Hide tabs
// Usage:
// <ion-tabs class="tabs-icon-top tabs-positive {{$root.hideTabs}}"></ion-tabs>
// <ion-view spm-hide-tabs></ion-view>
/*
(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('spmHideTabs', spmHideTabs);

  spmHideTabs.$inject = [
    '$rootScope'
  ];

  function spmHideTabs( $rootScope ) {
    var directive = {
      restrict: 'A',
      link: link
    };
    return directive;

    function link($scope, $el) {
      $rootScope.hideTabs = 'tabs-item-hide';
      $scope.$on('$destroy', function() {
        $rootScope.hideTabs = '';
      });
    }
  }
})();
*/