/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var FollowEventsCtrl = (function () {
    function FollowEventsCtrl($scope, $rootScope, utilsService, userService, userAuthService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.utilsService = utilsService;
        this.userService = userService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$scope',
            '$rootScope',
            'utilsService',
            'userService',
            'userAuthService'
        ];
        this.sponzorships = [];
        this.showEmptyState = false;
        this.userAuth = this.userAuthService.getUserAuth();
        this.sponzorships = this.userAuth.sponzorships.filter(this._filterByDateAndByPending);
        this.showEmptyState = this.sponzorships.length == 0 ? true : false;
        this._registerListenerSponzorships();
    }
    FollowEventsCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.$scope.$broadcast('scroll.refreshComplete');
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.sponzorships = _this.userAuth.sponzorships.filter(_this._filterByDateAndByPending);
            _this.showEmptyState = _this.sponzorships.length == 0 ? true : false;
        })
            .catch(function (error) {
            _this.$scope.$broadcast('scroll.refreshComplete');
        });
    };
    FollowEventsCtrl.prototype._registerListenerSponzorships = function () {
        var _this = this;
        this.$rootScope.$on('FollowEventsController:getSponzorships', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.sponzorships = _this.userAuth.sponzorships.filter(_this._filterByDateAndByPending);
            _this.showEmptyState = _this.sponzorships.length == 0 ? true : false;
        });
    };
    FollowEventsCtrl.prototype._filterByDateAndByPending = function (item) {
        return item.status != '1' && moment(item.event.starts).isAfter(new Date());
    };
    return FollowEventsCtrl;
}());
angular
    .module('app.events-sponzor')
    .controller('FollowEventsCtrl', FollowEventsCtrl);
