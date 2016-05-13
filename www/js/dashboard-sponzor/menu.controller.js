/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var MenuSponsorCtrl = (function () {
    function MenuSponsorCtrl($state, $q, $localStorage, $rootScope, $ionicAuth, $ionicHistory, userAuthService, notificationService, ionicMaterialInk) {
        this.$state = $state;
        this.$q = $q;
        this.$localStorage = $localStorage;
        this.$rootScope = $rootScope;
        this.$ionicAuth = $ionicAuth;
        this.$ionicHistory = $ionicHistory;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$inject = [
            '$state',
            '$q',
            '$localStorage',
            '$rootScope',
            '$ionicAuth',
            '$ionicHistory',
            'userAuthService',
            'notificationService',
            'ionicMaterialInk'
        ];
        this.count_following = 0;
        this.count_sponsoring = 0;
        this.notifications = [];
        this.ionicMaterialInk.displayEffect();
        this.userAuth = userAuthService.getUserAuth();
        this.count_sponsoring = this.userAuth.sponzorships.filter(this.filterByAccepted).length;
        this.count_following = this.userAuth.sponzorships.filter(this._filterByDateAndByPending).length;
        this.notifications = notificationService.getNotifications(this.userAuth.id);
        this.registerListenerCounts();
    }
    MenuSponsorCtrl.prototype.registerListenerCounts = function () {
        var _this = this;
        this.$rootScope.$on('MenuSponsorCtrl:counts', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_sponsoring = _this.userAuth.sponzorships.filter(_this.filterByAccepted).length;
            _this.count_following = _this.userAuth.sponzorships.filter(_this._filterByDateAndByPending).length;
        });
    };
    MenuSponsorCtrl.prototype.filterByAccepted = function (item) {
        return item.status == '1';
    };
    MenuSponsorCtrl.prototype._filterByDateAndByPending = function (item) {
        return item.status != '1' && moment(item.event.starts).isAfter(new Date());
    };
    MenuSponsorCtrl.prototype.logout = function () {
        this.$ionicAuth.logout();
        this.$localStorage.$reset();
        this.$ionicHistory.clearCache();
        this.$state.go('signin');
    };
    return MenuSponsorCtrl;
}());
angular
    .module('app.dashboard-sponzor')
    .controller('MenuSponsorCtrl', MenuSponsorCtrl);
