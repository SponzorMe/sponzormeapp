/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var ForgotCtrl = (function () {
    function ForgotCtrl($state, $ionicHistory, userService, utilsService) {
        this.$state = $state;
        this.$ionicHistory = $ionicHistory;
        this.userService = userService;
        this.utilsService = utilsService;
        this.$inject = [
            '$state',
            '$ionicHistory',
            'userService',
            'utilsService',
        ];
        this.user = {};
    }
    ForgotCtrl.prototype.resetPassword = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.userService.forgotPassword(this.user.email)
            .then(function () {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.utilsService.alert({
                title: 'Reset password',
                template: '<p class="text-center">Reset password Link sent, review your email.</p>'
            })
                .then(function () {
                _this.$ionicHistory.clearCache();
                _this.$state.go("signin");
                _this.user = {};
            });
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
        });
    };
    ;
    return ForgotCtrl;
}());
angular
    .module('app.users')
    .controller('ForgotCtrl', ForgotCtrl);
