/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var IntroSponsorCtrl = (function () {
    function IntroSponsorCtrl($state, $ionicSlideBoxDelegate, $ionicHistory, $ionicSideMenuDelegate) {
        this.$state = $state;
        this.$ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
        this.$ionicHistory = $ionicHistory;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$inject = [
            '$state',
            '$ionicSlideBoxDelegate',
            '$ionicHistory',
            '$ionicSideMenuDelegate'
        ];
        this.slideIndex = 0;
        this.$ionicSideMenuDelegate.canDragContent(false);
    }
    IntroSponsorCtrl.prototype.startApp = function () {
        this.$ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        this.$state.go("sponzor.home");
    };
    IntroSponsorCtrl.prototype.nextSlide = function () {
        this.$ionicSlideBoxDelegate.next();
    };
    IntroSponsorCtrl.prototype.previousSlide = function () {
        this.$ionicSlideBoxDelegate.previous();
    };
    IntroSponsorCtrl.prototype.slideChanged = function (index) {
        this.slideIndex = index;
    };
    ;
    return IntroSponsorCtrl;
})();
angular
    .module('app.dashboard-sponzor')
    .controller('IntroSponsorCtrl', IntroSponsorCtrl);
