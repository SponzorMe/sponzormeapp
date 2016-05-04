/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SponsoringEventsCtrl = (function () {
    function SponsoringEventsCtrl($scope, $rootScope, userService, utilsService, userAuthService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.userService = userService;
        this.utilsService = utilsService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$scope',
            '$rootScope',
            'userService',
            'utilsService',
            'userAuthService'
        ];
        this.sponzorships = [];
        this.showEmptyState = false;
        this.userAuth = this.userAuthService.getUserAuth();
        this.sponzorships = this.userAuth.sponzorships.filter(this._filterByAccepted);
        this.showEmptyState = this.sponzorships.length == 0 ? true : false;
        this._registerListenerSponzorships();
    }
    SponsoringEventsCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.$scope.$broadcast('scroll.refreshComplete');
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.sponzorships = _this.userAuth.sponzorships.filter(_this._filterByAccepted);
            _this.showEmptyState = _this.sponzorships.length == 0 ? true : false;
        })
            .catch(function (error) {
            _this.$scope.$broadcast('scroll.refreshComplete');
        });
    };
    SponsoringEventsCtrl.prototype._registerListenerSponzorships = function () {
        var _this = this;
        this.$rootScope.$on('SponsoringEventsCtrl:getSponzorships', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.sponzorships = _this.userAuth.sponzorships.filter(_this._filterByAccepted);
            _this.showEmptyState = _this.sponzorships.length == 0 ? true : false;
        });
    };
    SponsoringEventsCtrl.prototype._filterByAccepted = function (item) {
        return item.status == '1';
    };
    return SponsoringEventsCtrl;
}());
angular
    .module('app.events-sponzor')
    .controller('SponsoringEventsCtrl', SponsoringEventsCtrl);
