/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SponsorshipsPastEventsCtrl = (function () {
    function SponsorshipsPastEventsCtrl($scope, $rootScope, $ionicScrollDelegate, userService, userAuthService, ionicMaterialInk) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$ionicScrollDelegate = $ionicScrollDelegate;
        this.userService = userService;
        this.userAuthService = userAuthService;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$inject = [
            '$scope',
            '$rootScope',
            '$ionicScrollDelegate',
            'userService',
            'userAuthService',
            'ionicMaterialInk'
        ];
        this.sponsorships = [];
        this.showEmptyState = false;
        if (ionic.Platform.isAndroid()) {
            this.ionicMaterialInk.displayEffect();
        }
        this.userAuth = this.userAuthService.getUserAuth();
        this.sponsorships = this.userAuth.sponzorships_like_organizer.filter(this._filterByDateIsBefore);
        this.showEmptyState = this.sponsorships.length == 0 ? true : false;
        this._registerListenerSponzorships();
    }
    SponsorshipsPastEventsCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.$scope.$broadcast('scroll.refreshComplete');
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.sponsorships = _this.userAuth.sponzorships_like_organizer.filter(_this._filterByDateIsBefore);
            _this.showEmptyState = _this.sponsorships.length == 0 ? true : false;
        })
            .catch(function (error) {
            _this.showEmptyState = true;
        });
    };
    SponsorshipsPastEventsCtrl.prototype._registerListenerSponzorships = function () {
        var _this = this;
        this.$rootScope.$on('SponsorshipsPastEventsCtrl:getSponzorships', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.sponsorships = _this.userAuth.sponzorships_like_organizer.filter(_this._filterByDateIsBefore);
            _this.showEmptyState = _this.sponsorships.length == 0 ? true : false;
        });
    };
    SponsorshipsPastEventsCtrl.prototype._filterByDateIsBefore = function (item) {
        var today = moment(new Date()).subtract(1, 'days');
        return moment(item.event.ends).isBefore(today);
    };
    return SponsorshipsPastEventsCtrl;
}());
angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipsPastEventsCtrl', SponsorshipsPastEventsCtrl);
