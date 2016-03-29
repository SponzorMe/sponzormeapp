/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services/user.service.ts" />
/// <reference path="../services/userAuth.service.ts" />
/// <reference path="../services/notification.service.ts" />
/**
* @Controller HomeOrganizerCtrl
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.3
*/
var HomeOrganizerCtrl = (function () {
    function HomeOrganizerCtrl($rootScope, userAuthService, notificationService) {
        this.$rootScope = $rootScope;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.$inject = [
            '$rootScope',
            'userAuthService',
            'notificationService'
        ];
        this.count_events = 0;
        this.count_sponsors = 0;
        this.count_comunity = 0;
        this.userAuth = userAuthService.getUserAuth();
        this.count_events = this.userAuth.events.filter(this.filterDate).length;
        this.count_comunity = this.userAuth.comunity_size;
        this.count_sponsors = this.userAuth.sponzorships_like_organizer.length;
        this.notifications = notificationService.getNotifications(this.userAuth.id);
        this.registerListenerCountEvents();
        this.registerListenerCountSponsors();
    }
    HomeOrganizerCtrl.prototype.registerListenerCountSponsors = function () {
        var _this = this;
        this.$rootScope.$on('HomeOrganizerController:count_sponsors', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_sponsors = _this.userAuth.sponzorships_like_organizer.length;
        });
    };
    HomeOrganizerCtrl.prototype.registerListenerCountEvents = function () {
        var _this = this;
        this.$rootScope.$on('HomeOrganizerController:count_events', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_sponsors = _this.userAuth.sponzorships_like_organizer.length;
        });
    };
    HomeOrganizerCtrl.prototype.filterDate = function (item) {
        var today = moment(new Date()).subtract(1, 'days');
        return moment(item.ends).isAfter(today);
    };
    return HomeOrganizerCtrl;
}());
angular
    .module('app.dashboard-organizer')
    .controller('HomeOrganizerCtrl', HomeOrganizerCtrl);
