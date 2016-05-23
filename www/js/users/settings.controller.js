/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SettingsCtrl = (function () {
    function SettingsCtrl($translate, $cordovaToast, $ionicDeploy, utilsService, BackendVariables, ionicMaterialInk) {
        this.$translate = $translate;
        this.$cordovaToast = $cordovaToast;
        this.$ionicDeploy = $ionicDeploy;
        this.utilsService = utilsService;
        this.BackendVariables = BackendVariables;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$inject = [
            '$translate',
            '$cordovaToast',
            '$ionicDeploy',
            'utilsService',
            'BackendVariables',
            'ionicMaterialInk'
        ];
        if (ionic.Platform.isAndroid()) {
            this.ionicMaterialInk.displayEffect();
        }
        this.lang = this.$translate.use();
        this.$ionicDeploy.setChannel(BackendVariables.channel);
    }
    SettingsCtrl.prototype.save = function () {
        this.$translate.use(this.lang);
    };
    SettingsCtrl.prototype.checkForUpdates = function () {
        var _this = this;
        this.utilsService.showLoad();
        this.$ionicDeploy.check()
            .then(function (hasUpdate) {
            _this.utilsService.hideLoad();
            if (hasUpdate) {
                _this.utilsService.confirm({
                    title: _this.$translate.instant("MESSAGES.update_title"),
                    template: '<p class="text-center">' + _this.$translate.instant("MESSAGES.update_text") + '</p>'
                })
                    .then(function (rta) {
                    if (rta)
                        _this._doUpdate();
                });
            }
            else {
                _this.utilsService.alert({
                    title: _this.$translate.instant("MESSAGES.update_title"),
                    template: '<p class="text-center">' + _this.$translate.instant("MESSAGES.update_text_nothing") + '</p>'
                });
            }
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    SettingsCtrl.prototype._doUpdate = function () {
        var _this = this;
        this.utilsService.showLoad();
        this.$ionicDeploy.update()
            .then(function () {
            _this.utilsService.hideLoad();
            _this.$cordovaToast.showShortBottom(_this.$translate.instant("MESSAGES.update_success"));
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
            _this.utilsService.alert();
        });
    };
    return SettingsCtrl;
}());
angular
    .module('app.users')
    .controller('SettingsCtrl', SettingsCtrl);
