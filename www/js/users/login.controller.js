/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Login user
*
* @author Nicolas Molina
* @version 0.1
*/
var LoginCtrl = (function () {
    function LoginCtrl($state, $translate, $base64, $localStorage, $ionicUser, $ionicAnalytics, userService, utilsService, notificationService, userAuthService) {
        this.$state = $state;
        this.$translate = $translate;
        this.$base64 = $base64;
        this.$localStorage = $localStorage;
        this.$ionicUser = $ionicUser;
        this.$ionicAnalytics = $ionicAnalytics;
        this.userService = userService;
        this.utilsService = utilsService;
        this.notificationService = notificationService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$state',
            '$translate',
            '$base64',
            '$localStorage',
            '$ionicUser',
            '$ionicAnalytics',
            'userService',
            'utilsService',
            'notificationService',
            'userAuthService',
        ];
        this.user = {};
        if (userAuthService.checkSession()) {
            this.user = this.userAuthService.getUserAuth();
            if (this.user.type == 0) {
                this.$state.go("organizer.home");
            }
            else {
                this.$state.go("sponzor.home");
            }
        }
    }
    LoginCtrl.prototype.signIn = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.userService.login(this.user.email, this.user.password)
            .then(function (user) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.$localStorage.token = _this.$base64.encode(_this.user.email + ':' + _this.user.password);
            _this.user = _this.userAuthService.updateUserAuth(user);
            var userIonic = _this.$ionicUser.current();
            console.log(userIonic);
            if (!userIonic.id) {
                userIonic.id = _this.user.id;
                userIonic.set('email', _this.user.email);
                userIonic.set('type', _this.user.type);
            }
            userIonic.migrate();
            userIonic.save();
            _this.$ionicAnalytics.register();
            _this.notificationService.activate();
            if (_this.user.type == 0) {
                _this.$state.go("organizer.home");
            }
            else {
                _this.$state.go("sponzor.home");
            }
            _this.user = {};
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
            if (_this.utilsService.trim(error.message) === "Invalid credentials") {
                _this.utilsService.alert({
                    title: _this.$translate.instant("ERRORS.signin_title_credentials"),
                    template: _this.$translate.instant("ERRORS.signin_incorrect_credentials")
                });
            }
            _this.user.password = '';
        });
    };
    ;
    return LoginCtrl;
}());
angular
    .module('app.users')
    .controller('LoginCtrl', LoginCtrl);
