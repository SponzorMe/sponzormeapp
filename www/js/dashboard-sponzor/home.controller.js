/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services/user.service.ts" />
/// <reference path="../services/userAuth.service.ts" />
/// <reference path="../services/event.service.ts" />
/// <reference path="../services/utils.service.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var HomeSponzorCtrl = (function () {
    function HomeSponzorCtrl($localStorage, userService, utilsService, $scope, $rootScope, userAuthService) {
        this.$localStorage = $localStorage;
        this.userService = userService;
        this.utilsService = utilsService;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$localStorage',
            'userService',
            'utilsService',
            '$scope',
            '$rootScope',
            'userAuthService'
        ];
        this.events = [];
        this.userAuth = this.userAuthService.getUserAuth();
        this.events = this.userAuth.events.filter(this.filterDate);
        this.registerListenerEvents();
    }
    HomeSponzorCtrl.prototype.registerListenerEvents = function () {
        var _this = this;
        this.$rootScope.$on('HomeSponzorController:getEvents', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.events = _this.userAuth.events.filter(_this.filterDate);
        });
    };
    HomeSponzorCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.events = _this.userAuth.events.filter(_this.filterDate);
            _this.$scope.$broadcast('scroll.refreshComplete');
        })
            .catch(function () { return _this.$scope.$broadcast('scroll.refreshComplete'); });
    };
    HomeSponzorCtrl.prototype.filterDate = function (item) {
        return moment(item.starts).isAfter(new Date());
    };
    return HomeSponzorCtrl;
}());
angular
    .module('app.dashboard-sponzor')
    .controller('HomeSponzorCtrl', HomeSponzorCtrl);
