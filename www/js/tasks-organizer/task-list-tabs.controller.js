/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var TaskTabsCtrl = (function () {
    function TaskTabsCtrl($rootScope, userAuthService, ionicMaterialInk) {
        this.$rootScope = $rootScope;
        this.userAuthService = userAuthService;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$inject = [
            '$rootScope',
            'userAuthService',
            'ionicMaterialInk'
        ];
        this.count_tasks = 0;
        this.count_past_tasks = 0;
        if (ionic.Platform.isAndroid()) {
            this.ionicMaterialInk.displayEffect();
        }
        this.userAuth = this.userAuthService.getUserAuth();
        this.count_tasks = this._countTasks(this.userAuth.events.filter(this._filterEventsIsAfter)).length;
        this.count_past_tasks = this._countTasks(this.userAuth.events.filter(this._filterEventsisBefore)).length;
        this._registerListenerCounts();
    }
    TaskTabsCtrl.prototype._registerListenerCounts = function () {
        var _this = this;
        this.$rootScope.$on('TaskTabsCtrl:count_tasks', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_tasks = _this._countTasks(_this.userAuth.events.filter(_this._filterEventsIsAfter)).length;
            _this.count_past_tasks = _this._countTasks(_this.userAuth.events.filter(_this._filterEventsisBefore)).length;
        });
    };
    TaskTabsCtrl.prototype._filterEventsIsAfter = function (event) {
        var count = event.perks.reduce(function (a, b) { return a.concat(b.tasks); }, []);
        var today = moment(new Date()).subtract(1, 'days');
        return moment(event.ends).isAfter(today) && count.length > 0;
    };
    TaskTabsCtrl.prototype._filterEventsisBefore = function (event) {
        var count = event.perks.reduce(function (a, b) { return a.concat(b.tasks); }, []);
        var today = moment(new Date()).subtract(1, 'days');
        return moment(event.ends).isBefore(today) && count.length > 0;
    };
    TaskTabsCtrl.prototype._countTasks = function (events) {
        var _this = this;
        return events
            .reduce(function (a, b) { return a.concat(b.perks); }, [])
            .reduce(function (a, b) { return a.concat(b.tasks); }, [])
            .filter(function (item) { return item.user_id == _this.userAuth.id && item.status != '1'; });
    };
    return TaskTabsCtrl;
}());
angular
    .module('app.tasks-organizer')
    .controller('TaskTabsCtrl', TaskTabsCtrl);
