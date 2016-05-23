/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class IntroOrganizerCtrl{
  
   $inject = [
    '$state',
    '$scope',
    '$ionicHistory',
    '$ionicSideMenuDelegate',
    'ionicMaterialInk'
  ];
  slideIndex:number = 0;
  slider:any = null;
  data:any = {};
  
  constructor(
    private $state: angular.ui.IStateService,
    private $scope,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private $ionicSideMenuDelegate: ionic.sideMenu.IonicSideMenuDelegate,
    private ionicMaterialInk
  ){
    if(ionic.Platform.isAndroid()){
      this.ionicMaterialInk.displayEffect();
    }
    
    this.$ionicSideMenuDelegate.canDragContent(false);
    
    this.$scope.$watch(() => this.data, (oldValue: string, newValue: string) => {
      if( Object.keys(this.data).length > 0 ){
        this.slider = this.data;
        this.slider.on('slideChangeEnd', () => {
          this.slideIndex = this.slider.activeIndex;
          this.$scope.$apply();
        });
      }
    });
  }
  
  startApp(){
    this.$ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    this.$state.go("organizer.home");
  }
  
  nextSlide() {
    this.slider.slideNext();
  }
  
  previousSlide() {
    this.slider.slidePrev();
  }
  
}
angular
  .module('app.dashboard-organizer')
  .controller('IntroOrganizerCtrl', IntroOrganizerCtrl);