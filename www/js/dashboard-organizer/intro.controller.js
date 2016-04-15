/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var IntroOrganizerCtrl = (function () {
    function IntroOrganizerCtrl($state, $ionicSlideBoxDelegate, $ionicHistory, $ionicSideMenuDelegate) {
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
    IntroOrganizerCtrl.prototype.startApp = function () {
        this.$ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        this.$state.go("organizer.home");
    };
    IntroOrganizerCtrl.prototype.nextSlide = function () {
        this.$ionicSlideBoxDelegate.next();
    };
    IntroOrganizerCtrl.prototype.previousSlide = function () {
        this.$ionicSlideBoxDelegate.previous();
    };
    IntroOrganizerCtrl.prototype.slideChanged = function (index) {
        this.slideIndex = index;
    };
    ;
    return IntroOrganizerCtrl;
}());
angular
    .module('app.dashboard-organizer')
    .controller('IntroOrganizerCtrl', IntroOrganizerCtrl);
