/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Login user
*
* @author Nicolas Molina
* @version 0.1
*/
var LoginCtrl = (function () {
    function LoginCtrl($state, $q, $translate, $base64, $localStorage, $ionicUser, $ionicPush, $ionicAuth, userService, utilsService, notificationService, userAuthService, ionicMaterialInk) {
        this.$state = $state;
        this.$q = $q;
        this.$translate = $translate;
        this.$base64 = $base64;
        this.$localStorage = $localStorage;
        this.$ionicUser = $ionicUser;
        this.$ionicPush = $ionicPush;
        this.$ionicAuth = $ionicAuth;
        this.userService = userService;
        this.utilsService = utilsService;
        this.notificationService = notificationService;
        this.userAuthService = userAuthService;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$inject = [
            '$state',
            '$q',
            '$translate',
            '$base64',
            '$localStorage',
            '$ionicUser',
            '$ionicPush',
            '$ionicAuth',
            'userService',
            'utilsService',
            'notificationService',
            'userAuthService',
            'ionicMaterialInk'
        ];
        this.user = {};
        if (ionic.Platform.isAndroid()) {
            this.ionicMaterialInk.displayEffect();
        }
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
            _this.utilsService.resetForm(form);
            _this.$localStorage.token = _this.$base64.encode(_this.user.email + ':' + _this.user.password);
            _this.userAuthService.updateUserAuth(user);
            _this.notificationService.activate();
            _this._validateIonicId(user)
                .then(function (data) {
                _this.user = _this.userAuthService.getUserAuth();
                _this.$ionicPush.register();
                if (_this.user.type == 0) {
                    _this.$state.go("organizer.home");
                }
                else {
                    _this.$state.go("sponzor.home");
                }
                _this.user = {};
                _this.utilsService.hideLoad();
            })
                .catch(function (error) {
                console.log(error);
                _this.utilsService.hideLoad();
            });
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
            if (_this.utilsService.trim(error.message) === "Invalid credentials") {
                _this.utilsService.alert({
                    title: _this.$translate.instant("ERRORS.signin_title_credentials"),
                    template: "<p class=\"text-center\">" + _this.$translate.instant("ERRORS.signin_incorrect_credentials") + "</p>"
                });
            }
            _this.user.password = '';
        });
    };
    ;
    LoginCtrl.prototype._loginInIonicIO = function (email, password) {
        return this.$ionicAuth
            .login(
        //authProvider
        'basic', 
        //authSettings
        { 'remember': true }, 
        //data
        {
            'email': email,
            'password': password
        });
    };
    LoginCtrl.prototype._registerInIonicIO = function (email, password) {
        var _this = this;
        return this.$ionicAuth
            .signup({
            'email': email,
            'password': password
        })
            .then(function (data) {
            _this.user.ionic_id = _this.$ionicUser.current()._id;
            return _this._uploadProfile();
        })
            .catch(function (error) {
            return _this.$q.reject(error);
        });
    };
    LoginCtrl.prototype._uploadProfile = function () {
        return this.userService.editUserPatch(this.user.id, this.user);
    };
    LoginCtrl.prototype._validateIonicId = function (user) {
        if (!user.ionic_id || user.ionic_id == "") {
            return this._registerInIonicIO(this.user.email, this.user.password);
        }
        return this._loginInIonicIO(this.user.email, this.user.password);
    };
    return LoginCtrl;
}());
angular
    .module('app.users')
    .controller('LoginCtrl', LoginCtrl);
