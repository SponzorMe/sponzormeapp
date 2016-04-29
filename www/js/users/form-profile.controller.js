/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Personal information of user
*
* @author Nicolas Molina
* @version 0.1
*/
var FormProfileCtrl = (function () {
    function FormProfileCtrl($state, $translate, userService, utilsService, userAuthService) {
        this.$state = $state;
        this.$translate = $translate;
        this.userService = userService;
        this.utilsService = utilsService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$state',
            '$translate',
            'userService',
            'utilsService',
            'userAuthService'
        ];
        this.userAuth = this.userAuthService.getUserAuth();
        this.userAuth.lang = 'en';
        this.userAuth.sex = 1;
    }
    FormProfileCtrl.prototype.changeLang = function () {
        this.$translate.use(this.userAuth.lang);
    };
    FormProfileCtrl.prototype.updateProfile = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.userService.editUserPatch(this.userAuth.id, this._preparateData())
            .then(function (user) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.$state.go("interests");
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    FormProfileCtrl.prototype._preparateData = function () {
        return {
            name: this.userAuth.name,
            age: this.userAuth.age,
            location: this.userAuth.location.formatted_address,
            location_reference: this.userAuth.location.place_id,
            lang: this.userAuth.lang,
            sex: this.userAuth.sex
        };
    };
    return FormProfileCtrl;
}());
angular
    .module('app.users')
    .controller('FormProfileCtrl', FormProfileCtrl);
