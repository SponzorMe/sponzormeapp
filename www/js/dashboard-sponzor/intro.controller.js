/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var IntroSponzorCtrl = (function () {
    function IntroSponzorCtrl($state, $ionicSlideBoxDelegate, $ionicHistory, $ionicSideMenuDelegate) {
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
    IntroSponzorCtrl.prototype.startApp = function () {
        this.$ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        this.$state.go("sponzor.home");
    };
    IntroSponzorCtrl.prototype.nextSlide = function () {
        this.$ionicSlideBoxDelegate.next();
    };
    IntroSponzorCtrl.prototype.previousSlide = function () {
        this.$ionicSlideBoxDelegate.previous();
    };
    IntroSponzorCtrl.prototype.slideChanged = function (index) {
        this.slideIndex = index;
    };
    ;
    return IntroSponzorCtrl;
})();
angular
    .module('app.dashboard-sponzor')
    .controller('IntroSponzorCtrl', IntroSponzorCtrl);
