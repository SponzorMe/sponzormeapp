/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Login user
*
* @author Nicolas Molina
* @version 0.1
*/
var RegisterCtrl = (function () {
    function RegisterCtrl($state, $translate, $base64, $localStorage, $ionicUser, $ionicAuth, userService, utilsService, notificationService, userAuthService) {
        this.$state = $state;
        this.$translate = $translate;
        this.$base64 = $base64;
        this.$localStorage = $localStorage;
        this.$ionicUser = $ionicUser;
        this.$ionicAuth = $ionicAuth;
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
            '$ionicAuth',
            'userService',
            'utilsService',
            'notificationService',
            'userAuthService'
        ];
        this.newUser = {};
        this.newUser.type = 0;
    }
    RegisterCtrl.prototype.registerNewUser = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this._registerInIonicIO(this.newUser.email, this.newUser.password)
            .then(function (data) {
            _this.newUser.ionic_id = _this.$ionicUser.current()._id;
            return _this.userService.createUser(_this._preparateData());
        })
            .then(function (user) {
            return _this.userService.login(_this.newUser.email, _this.newUser.password);
        })
            .then(function (user) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.utilsService.alert({
                title: _this.$translate.instant("MESSAGES.succ_user_tit"),
                template: _this.$translate.instant("MESSAGES.succ_user_mess")
            });
            _this.$localStorage.token = _this.$base64.encode(_this.newUser.email + ':' + _this.newUser.password);
            _this.newUser = {};
            _this.newUser.type = 0;
            _this.userAuthService.updateUserAuth(user);
            _this.notificationService.activate();
            _this.$state.go("profile");
        })
            .catch(function (data) {
            _this.utilsService.hideLoad();
            if (_this.utilsService.trim(data.message) === "Invalid credentials") {
                _this.utilsService.alert({
                    title: _this.$translate.instant("ERRORS.signin_title_credentials"),
                    template: _this.$translate.instant("ERRORS.signin_incorrect_credentials")
                });
            }
            else if (_this.utilsService.trim(data.message) === "Not inserted") {
                _this.utilsService.alert({
                    title: _this.$translate.instant("ERRORS.signin_notinserted_credentials_title"),
                    template: _this.$translate.instant("ERRORS.signin_notinserted_credentials_message")
                });
            }
            else if (data.error && _this.utilsService.trim(data.error.email) === "The email has already been taken.") {
                _this.utilsService.alert({
                    title: _this.$translate.instant("ERRORS.signin_taken_credentials_title"),
                    template: _this.$translate.instant("ERRORS.signin_taken_credentials_message")
                });
            }
        });
    };
    RegisterCtrl.prototype._registerInIonicIO = function (email, password) {
        return this.$ionicAuth.signup({
            'email': email,
            'password': password
        });
    };
    RegisterCtrl.prototype._preparateData = function () {
        return {
            email: this.newUser.email,
            password: this.newUser.password,
            password_confirmation: this.newUser.password,
            name: this.newUser.name,
            lang: 'en',
            type: this.newUser.type,
            ionic_id: this.newUser.ionic_id
        };
    };
    return RegisterCtrl;
}());
angular
    .module('app.users')
    .controller('RegisterCtrl', RegisterCtrl);
