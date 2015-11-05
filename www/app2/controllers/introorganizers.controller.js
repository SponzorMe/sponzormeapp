'use strict';
(function(){
  function IntroOrgCtrl($scope, $state, $ionicSlideBoxDelegate) {

    // Called to navigate to the main app
    $scope.startApp = function() {
      $state.go("menuorganizers.organizershome");
    };
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
  };
angular.module('App').controller('IntroOrgCtrl', IntroOrgCtrl);
})();
