/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SponsorshipsTabsCtrl = (function () {
    function SponsorshipsTabsCtrl($rootScope, userAuthService, ionicMaterialInk) {
        this.$rootScope = $rootScope;
        this.userAuthService = userAuthService;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$inject = [
            '$rootScope',
            'userAuthService',
            'ionicMaterialInk'
        ];
        this.count_events = 0;
        this.count_past_events = 0;
        this.ionicMaterialInk.displayEffect();
        this.userAuth = this.userAuthService.getUserAuth();
        this.count_events = this.userAuth.sponzorships_like_organizer.filter(this._filterByDateIsAfter).length;
        this.count_past_events = this.userAuth.sponzorships_like_organizer.length - this.count_events;
        this._registerListenerCounts();
    }
    SponsorshipsTabsCtrl.prototype._registerListenerCounts = function () {
        var _this = this;
        this.$rootScope.$on('SponsorshipsTabsCtrl:count_sponsors', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_events = _this.userAuth.sponzorships_like_organizer.length;
            _this.count_past_events = _this.userAuth.sponzorships_like_organizer.length - _this.count_events;
        });
    };
    SponsorshipsTabsCtrl.prototype._filterByDateIsAfter = function (item) {
        var today = moment(new Date()).subtract(1, 'days');
        return moment(item.event.ends).isAfter(today);
    };
    return SponsorshipsTabsCtrl;
}());
angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipsTabsCtrl', SponsorshipsTabsCtrl);
