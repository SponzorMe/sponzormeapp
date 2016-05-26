/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var MenuOrganizerCtrl = (function () {
    function MenuOrganizerCtrl($state, $q, $rootScope, $ionicAuth, $ionicHistory, userAuthService, notificationService, $localStorage, ionicMaterialInk) {
        this.$state = $state;
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.$ionicAuth = $ionicAuth;
        this.$ionicHistory = $ionicHistory;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.$localStorage = $localStorage;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$inject = [
            '$state',
            '$q',
            '$rootScope',
            '$ionicAuth',
            '$ionicHistory',
            'userAuthService',
            'notificationService',
            '$localStorage',
            'ionicMaterialInk'
        ];
        this.count_events = 0;
        this.count_sponsors = 0;
        this.count_tasks = 0;
        this.notifications = [];
        if (ionic.Platform.isAndroid()) {
            this.ionicMaterialInk.displayEffect();
        }
        this.userAuth = this.userAuthService.getUserAuth();
        this.count_events = this.userAuth.events.filter(this.filterDate).length;
        this.count_sponsors = this.userAuth.sponzorships_like_organizer.filter(this._filterDateEvent).length;
        this.count_tasks = this.countTasks().length;
        this.notifications = notificationService.getNotifications(this.userAuth.id);
        this.registerListenerCountEvents();
        this.registerListenerCountSponsors();
        this.registerListenerCountTasks();
    }
    MenuOrganizerCtrl.prototype.registerListenerCountEvents = function () {
        var _this = this;
        this.$rootScope.$on('MenuOrganizerCtrl:count_events', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_events = _this.userAuth.events.filter(_this.filterDate).length;
        });
    };
    MenuOrganizerCtrl.prototype.registerListenerCountSponsors = function () {
        var _this = this;
        this.$rootScope.$on('MenuOrganizerCtrl:count_sponsors', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_sponsors = _this.userAuth.sponzorships_like_organizer.filter(_this._filterDateEvent).length;
        });
    };
    MenuOrganizerCtrl.prototype.registerListenerCountTasks = function () {
        var _this = this;
        this.$rootScope.$on('MenuOrganizerCtrl:count_tasks', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_tasks = _this.countTasks().length;
        });
    };
    MenuOrganizerCtrl.prototype.logout = function () {
        this.$ionicAuth.logout();
        this.$localStorage.$reset();
        this.$ionicHistory.clearCache();
        this.$state.go('signin');
    };
    MenuOrganizerCtrl.prototype.filterDate = function (item) {
        var today = moment(new Date().getTime()).subtract(1, 'days');
        return moment(item.ends).isAfter(today);
    };
    MenuOrganizerCtrl.prototype.countTasks = function () {
        var _this = this;
        return this.userAuth.events
            .reduce(function (a, b) { return a.concat(b.perks || []); }, [])
            .reduce(function (a, b) { return a.concat(b.tasks || []); }, [])
            .filter(function (item) { return item.user_id == _this.userAuth.id && item.status != '1'; });
    };
    MenuOrganizerCtrl.prototype._filterDateEvent = function (item) {
        var today = moment(new Date()).subtract(1, 'days');
        return moment(item.event.ends).isAfter(today);
    };
    return MenuOrganizerCtrl;
}());
angular
    .module('app.dashboard-organizer')
    .controller('MenuOrganizerCtrl', MenuOrganizerCtrl);
