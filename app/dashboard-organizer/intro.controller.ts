/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.dashboard-organizer')
    .controller('IntroOrganizerCtrl', IntroOrganizerCtrl);

  IntroOrganizerCtrl.$inject = [
    '$state',
    '$ionicSlideBoxDelegate',
    '$ionicHistory',
    '$ionicSideMenuDelegate'
  ];

  function IntroOrganizerCtrl( $state, $ionicSlideBoxDelegate, $ionicHistory, $ionicSideMenuDelegate) {

    var vm = this;
    vm.slideIndex = 0;
    vm.startApp = startApp;
    vm.nextSlide = nextSlide;
    vm.previousSlide = previousSlide;
    vm.slideChanged = slideChanged;

    activate();

    ////////////
    function activate(){
      $ionicSideMenuDelegate.canDragContent(false);
    }

    function startApp(){
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go("organizer.home");
    }

    function nextSlide() {
      $ionicSlideBoxDelegate.next();
    }

    function previousSlide() {
      $ionicSlideBoxDelegate.previous();
    }

    function slideChanged( index ) {
      vm.slideIndex = index;
    };

  }
})();