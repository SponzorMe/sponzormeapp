/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services/userAuth.service.ts" />
/// <reference path="../services/user.service.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var EventsTabsCtrl = (function () {
    function EventsTabsCtrl(userAuthService, $rootScope) {
        this.userAuthService = userAuthService;
        this.$rootScope = $rootScope;
        this.$inject = [
            '$rootScope',
            'userAuthService'
        ];
        this.count_events = 0;
        this.count_past_events = 0;
        this.userAuth = this.userAuthService.getUserAuth();
        this.count_events = this.userAuth.events.filter(this._filterByDateIsAfter).length;
        this.count_past_events = this.userAuth.events.length - this.count_events;
        this._registerListenerCounts();
    }
    EventsTabsCtrl.prototype._registerListenerCounts = function () {
        var _this = this;
        this.$rootScope.$on('EventsTabsCtrl:count_events', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_events = _this.userAuth.events.filter(_this._filterByDateIsAfter).length;
            _this.count_past_events = _this.userAuth.events.length - _this.count_events;
        });
    };
    EventsTabsCtrl.prototype._filterByDateIsAfter = function (item) {
        var today = moment(new Date()).subtract(1, 'days');
        return moment(item.ends).isAfter(today);
    };
    return EventsTabsCtrl;
})();
angular
    .module('app.events-organizer')
    .controller('EventsTabsCtrl', EventsTabsCtrl);
