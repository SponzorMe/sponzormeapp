/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class ProfileCtrl{
  
  $inject = [
    '$cordovaToast',
    '$cordovaCamera',
    'userService', 
    'utilsService',
    'imgurService',
    'userAuthService',
    'ionicMaterialInk'
  ];
  userAuth:userModule.User;
  imageURI:any = null;
  
  constructor(
    private $cordovaToast,
    private $cordovaCamera,
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService,
    private imgurService: imgurModule.IImgurService,
    private userAuthService: userAuthModule.IUserAuthService,
    private ionicMaterialInk
  ){
    this.ionicMaterialInk.displayEffect();
    
    this.userAuth = this.userAuthService.getUserAuth();
  }
  
  getPhoto(){
    let options = {
      quality: 100,
      destinationType:  Camera.DestinationType.DATA_URL,
      sourceType:  Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      //popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
    };
    this.$cordovaCamera.getPicture( options )
    .then( imageURI => {
      this.imageURI = imageURI;
      this.userAuth.image = "data:image/jpeg;base64," + imageURI;
    });
    //.catch( failed );
  }
  
  submitProfile( form ){
    this.utilsService.showLoad();

    if(this.imageURI){
      this._uploadProfileWithImage( form );
    }else{
      this._uploadProfile( form );
    }
  }
  
  private _uploadProfileWithImage( form ){
    this.imgurService.uploadImage( this.imageURI )
    .then( image => {
      this.userAuth.image = image;
      return this.userService.editUserPatch( this.userAuth.id, this.userAuth );
    })
    .then( user => {
      this.utilsService.hideLoad();
      this.utilsService.resetForm( form );
      this.userAuth = this.userAuthService.updateUserAuth( user );
      this.$cordovaToast.showShortBottom("Su perfil se ha actulizado");
    })
    .catch( error => {
      this.utilsService.hideLoad();
    });
  }
  
  private _uploadProfile( form ){
     this.userService.editUserPatch( this.userAuth.id, this.userAuth )
    .then( user => {
      this.utilsService.hideLoad();
      this.utilsService.resetForm( form );
      this.userAuth = this.userAuthService.updateUserAuth( user );
      this.$cordovaToast.showShortBottom("Su perfil se ha actulizado");
    })
    .catch( error => {
      this.utilsService.hideLoad();
    });
  }
  
}
angular
  .module('app.users')
  .controller('ProfileCtrl', ProfileCtrl);