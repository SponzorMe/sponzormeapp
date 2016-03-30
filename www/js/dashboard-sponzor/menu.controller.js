/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services/user.service.ts" />
/// <reference path="../services/userAuth.service.ts" />
/// <reference path="../services/notification.service.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var MenuSponzorCtrl = (function () {
    function MenuSponzorCtrl($state, $localStorage, $rootScope, $ionicHistory, userAuthService, notificationService) {
        this.$state = $state;
        this.$localStorage = $localStorage;
        this.$rootScope = $rootScope;
        this.$ionicHistory = $ionicHistory;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.$inject = [
            '$state',
            '$localStorage',
            '$rootScope',
            '$ionicHistory',
            'userAuthService',
            'notificationService'
        ];
        this.count_following = 0;
        this.count_sponsoring = 0;
        this.notifications = [];
        this.userAuth = userAuthService.getUserAuth();
        this.count_sponsoring = this.userAuth.sponzorship.filter(this.filterByAccepted).length;
        this.count_following = this.userAuth.sponzorship.length - this.count_sponsoring;
        this.notifications = notificationService.getNotifications(this.userAuth.id);
        this.registerListenerCounts();
    }
    MenuSponzorCtrl.prototype.registerListenerCounts = function () {
        var _this = this;
        this.$rootScope.$on('MenuSponzor:counts', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_sponsoring = _this.userAuth.sponzorship.filter(_this.filterByAccepted).length;
            _this.count_following = _this.userAuth.sponzorship.length - _this.count_sponsoring;
        });
    };
    MenuSponzorCtrl.prototype.filterByAccepted = function (item) {
        return item.status == '1';
    };
    return MenuSponzorCtrl;
}());
angular
    .module('app.dashboard-sponzor')
    .controller('MenuSponzorCtrl', MenuSponzorCtrl);
