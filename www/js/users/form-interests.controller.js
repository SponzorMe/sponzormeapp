/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Interests of user
*
* @author Nicolas Molina
* @version 0.1
*/
var FormInterestsCtrl = (function () {
    function FormInterestsCtrl($state, utilsService, categoryService, userInterestService, userService, userAuthService) {
        this.$state = $state;
        this.utilsService = utilsService;
        this.categoryService = categoryService;
        this.userInterestService = userInterestService;
        this.userService = userService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$state',
            'utilsService',
            'categoryService',
            'userInterestService',
            'userService',
            'userAuthService'
        ];
        this.categories = [];
        this.userAuth = this.userAuthService.getUserAuth();
    }
    FormInterestsCtrl.prototype.updateInterests = function () {
        var _this = this;
        this.utilsService.showLoad();
        this.userInterestService.bulkUserInterest(this.userAuth.id, {
            interests: this._getInterestCheck()
        })
            .then(function () {
            _this.utilsService.hideLoad();
            if (_this.userAuth.type == "0") {
                _this.$state.go("organizer.intro");
            }
            else {
                _this.$state.go("sponzor.intro");
            }
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    FormInterestsCtrl.prototype._getCategories = function () {
        var _this = this;
        this.utilsService.showLoad();
        this.categoryService.allCategories()
            .then(function (categories) {
            _this.utilsService.hideLoad();
            _this.categories = categories;
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    FormInterestsCtrl.prototype._getInterestCheck = function () {
        var _this = this;
        return this.categories
            .filter(function (item) { return item.interests; })
            .map(function (item) { return item.interests; })
            .reduce(function (a, b) { return a.concat(b); }, [])
            .filter(function (item) { return item.check; })
            .map(function (item) {
            return {
                'user_id': _this.userAuth.id,
                'interest_id': item.id_interest
            };
        });
    };
    return FormInterestsCtrl;
}());
angular
    .module('app.users')
    .controller('FormInterestsCtrl', FormInterestsCtrl);
