/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class IntroSponzorCtrl{
  
  $inject = [
    '$state',
    '$ionicSlideBoxDelegate',
    '$ionicHistory',
    '$ionicSideMenuDelegate'
  ];
  slideIndex:number = 0;
  
  constructor(
    private $state: angular.ui.IStateService,
    private $ionicSlideBoxDelegate: ionic.slideBox.IonicSlideBoxDelegate,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private $ionicSideMenuDelegate: ionic.sideMenu.IonicSideMenuDelegate
  ){
    this.$ionicSideMenuDelegate.canDragContent(false);
  }
  
  startApp(){
    this.$ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    this.$state.go("sponzor.home");
  }

  nextSlide() {
    this.$ionicSlideBoxDelegate.next();
  }

  previousSlide() {
    this.$ionicSlideBoxDelegate.previous();
  }

  slideChanged( index ) {
    this.slideIndex = index;
  };
  
}
angular
  .module('app.dashboard-sponzor')
  .controller('IntroSponzorCtrl', IntroSponzorCtrl);