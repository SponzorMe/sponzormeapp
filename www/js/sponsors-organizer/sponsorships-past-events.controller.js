/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SponsorshipsPastEventsCtrl = (function () {
    function SponsorshipsPastEventsCtrl($scope, $rootScope, $ionicScrollDelegate, userAuthService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$ionicScrollDelegate = $ionicScrollDelegate;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$scope',
            '$rootScope',
            '$ionicScrollDelegate',
            'sponsorshipService'
        ];
        this.sponsorships = [];
        this.showEmptyState = false;
        this.userAuth = this.userAuthService.getUserAuth();
        this.sponsorships = this.userAuth.sponzorships_like_organizer.filter(this._filterByDateIsBefore);
        this.showEmptyState = this.sponsorships.length == 0 ? true : false;
        this._registerListenerSponzorships();
    }
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
