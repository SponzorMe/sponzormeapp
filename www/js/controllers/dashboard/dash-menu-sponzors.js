'use strict';
(function () {
  angular.module('App').controller('menuSponzorsController', function ($scope, $state, $localStorage, $location, $translate, $log, Utils) {

    $scope.logout = function(){
      $localStorage.$reset();
      $state.go('signin');
    };

  });
})();
