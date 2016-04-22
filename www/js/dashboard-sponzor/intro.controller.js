/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var IntroSponsorCtrl = (function () {
    function IntroSponsorCtrl($state, $scope, $ionicHistory, $ionicSideMenuDelegate) {
        var _this = this;
        this.$state = $state;
        this.$scope = $scope;
        this.$ionicHistory = $ionicHistory;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$inject = [
            '$state',
            '$scope',
            '$ionicHistory',
            '$ionicSideMenuDelegate'
        ];
        this.slideIndex = 0;
        this.slider = null;
        this.data = {};
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
    IntroSponsorCtrl.prototype.startApp = function () {
        this.$ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        this.$state.go("sponzor.home");
    };
    IntroSponsorCtrl.prototype.nextSlide = function () {
        this.slider.slideNext();
    };
    IntroSponsorCtrl.prototype.previousSlide = function () {
        this.slider.slidePrev();
    };
    return IntroSponsorCtrl;
}());
angular
    .module('app.dashboard-sponzor')
    .controller('IntroSponsorCtrl', IntroSponsorCtrl);
