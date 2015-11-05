'use strict';
(function () {
function menuOrganizersController($scope, $state, $localStorage, $location, $translate, $log, Utils) {

      $scope.logout = function(){
        $localStorage.$reset();
        $state.go('signin');
      };

    };
angular.module('App').controller('menuOrganizersController', menuOrganizersController);
})();
