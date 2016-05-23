/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var IntroOrganizerCtrl = (function () {
    function IntroOrganizerCtrl($state, $scope, $ionicHistory, $ionicSideMenuDelegate, ionicMaterialInk) {
        var _this = this;
        this.$state = $state;
        this.$scope = $scope;
        this.$ionicHistory = $ionicHistory;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$inject = [
            '$state',
            '$scope',
            '$ionicHistory',
            '$ionicSideMenuDelegate',
            'ionicMaterialInk'
        ];
        this.slideIndex = 0;
        this.slider = null;
        this.data = {};
        if (ionic.Platform.isAndroid()) {
            this.ionicMaterialInk.displayEffect();
        }
        this.$ionicSideMenuDelegate.canDragContent(false);
        this.$scope.$watch(function () { return _this.data; }, function (oldValue, newValue) {
            if (Object.keys(_this.data).length > 0) {
                _this.slider = _this.data;
                _this.slider.on('slideChangeEnd', function () {
                    _this.slideIndex = _this.slider.activeIndex;
                    _this.$scope.$apply();
                });
            }
        });
    }
    IntroOrganizerCtrl.prototype.startApp = function () {
        this.$ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        this.$state.go("organizer.home");
    };
    IntroOrganizerCtrl.prototype.nextSlide = function () {
        this.slider.slideNext();
    };
    IntroOrganizerCtrl.prototype.previousSlide = function () {
        this.slider.slidePrev();
    };
    return IntroOrganizerCtrl;
}());
angular
    .module('app.dashboard-organizer')
    .controller('IntroOrganizerCtrl', IntroOrganizerCtrl);
