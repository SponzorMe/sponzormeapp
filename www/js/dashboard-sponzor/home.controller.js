/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var HomeSponsorCtrl = (function () {
    function HomeSponsorCtrl($localStorage, userService, utilsService, $scope, $rootScope, userAuthService, ionicMaterialInk) {
        this.$localStorage = $localStorage;
        this.userService = userService;
        this.utilsService = utilsService;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.userAuthService = userAuthService;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$inject = [
            '$localStorage',
            'userService',
            'utilsService',
            '$scope',
            '$rootScope',
            'userAuthService',
            'ionicMaterialInk'
        ];
        this.events = [];
        this.ionicMaterialInk.displayEffect();
        this.userAuth = this.userAuthService.getUserAuth();
        this.events = this.userAuth.events.filter(this.filterDate);
        this.registerListenerEvents();
    }
    HomeSponsorCtrl.prototype.registerListenerEvents = function () {
        var _this = this;
        this.$rootScope.$on('HomeSponsorCtrl:getEvents', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.events = _this.userAuth.events.filter(_this.filterDate);
        });
    };
    HomeSponsorCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.events = _this.userAuth.events.filter(_this.filterDate);
            _this.$scope.$broadcast('scroll.refreshComplete');
        })
            .catch(function () { return _this.$scope.$broadcast('scroll.refreshComplete'); });
    };
    HomeSponsorCtrl.prototype.filterDate = function (item) {
        return moment(item.starts).isAfter(new Date());
    };
    return HomeSponsorCtrl;
}());
angular
    .module('app.dashboard-sponzor')
    .controller('HomeSponsorCtrl', HomeSponsorCtrl);
