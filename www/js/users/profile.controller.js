/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var ProfileCtrl = (function () {
    function ProfileCtrl($cordovaToast, $cordovaCamera, userService, utilsService, imgurService, userAuthService) {
        this.$cordovaToast = $cordovaToast;
        this.$cordovaCamera = $cordovaCamera;
        this.userService = userService;
        this.utilsService = utilsService;
        this.imgurService = imgurService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$cordovaToast',
            '$cordovaCamera',
            'userService',
            'utilsService',
            'imgurService',
            'userAuthService'
        ];
        this.imageURI = null;
        this.userAuth = this.userAuthService.getUserAuth();
    }
    ProfileCtrl.prototype.getPhoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 500,
            targetHeight: 500,
            //popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        this.$cordovaCamera.getPicture(options)
            .then(function (imageURI) {
            _this.imageURI = imageURI;
            _this.userAuth.image = "data:image/jpeg;base64," + imageURI;
        });
        //.catch( failed );
    };
    ProfileCtrl.prototype.submitProfile = function (form) {
        this.utilsService.showLoad();
        if (this.imageURI) {
            this._uploadProfileWithImage(form);
        }
        else {
            this._uploadProfile(form);
        }
    };
    ProfileCtrl.prototype._uploadProfileWithImage = function (form) {
        var _this = this;
        this.imgurService.uploadImage(this.imageURI)
            .then(function (image) {
            _this.userAuth.image = image;
            return _this.userService.editUserPatch(_this.userAuth.id, _this.userAuth);
        })
            .then(function (user) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.$cordovaToast.showShortBottom("Su perfil se ha actulizado");
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    ProfileCtrl.prototype._uploadProfile = function (form) {
        var _this = this;
        this.userService.editUserPatch(this.userAuth.id, this.userAuth)
            .then(function (user) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.$cordovaToast.showShortBottom("Su perfil se ha actulizado");
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    return ProfileCtrl;
}());
angular
    .module('app.users')
    .controller('ProfileCtrl', ProfileCtrl);
