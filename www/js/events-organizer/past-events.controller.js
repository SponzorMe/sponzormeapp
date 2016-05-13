/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var PastEventsOrganizerCtrl = (function () {
    function PastEventsOrganizerCtrl($scope, $rootScope, userService, utilsService, userAuthService, ionicMaterialInk) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.userService = userService;
        this.utilsService = utilsService;
        this.userAuthService = userAuthService;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$inject = [
            '$scope',
            '$rootScope',
            'userService',
            'utilsService',
            'userAuthService',
            'ionicMaterialInk'
        ];
        this.events = [];
        this.showEmptyState = true;
        this.ionicMaterialInk.displayEffect();
        this.userAuth = this.userAuthService.getUserAuth();
        this.events = this.userAuth.events.filter(this._filterDate);
        this.showEmptyState = this.events.length == 0 ? true : false;
        this._registerListenerEvents();
    }
    PastEventsOrganizerCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.$scope.$broadcast('scroll.refreshComplete');
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.events = _this.userAuth.events.filter(_this._filterDate);
            _this.showEmptyState = _this.events.length == 0 ? true : false;
        })
            .catch(function (error) {
            _this.$scope.$broadcast('scroll.refreshComplete');
        });
    };
    PastEventsOrganizerCtrl.prototype._filterDate = function (item) {
        var today = moment(new Date()).subtract(1, 'days');
        return moment(item.ends).isBefore(today);
    };
    PastEventsOrganizerCtrl.prototype._registerListenerEvents = function () {
        var _this = this;
        this.$rootScope.$on('PastEventsOrganizerCtrl:getEvents', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.events = _this.userAuth.events.filter(_this._filterDate);
            _this.showEmptyState = _this.events.length == 0 ? true : false;
        });
    };
    return PastEventsOrganizerCtrl;
}());
angular
    .module('app.events-organizer')
    .controller('PastEventsOrganizerCtrl', PastEventsOrganizerCtrl);
