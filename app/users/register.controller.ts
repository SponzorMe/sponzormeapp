/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Login user
*
* @author Nicolas Molina
* @version 0.1
*/
class RegisterCtrl{
  
  $inject = [
    '$state',
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
  newUser:any = {};
  
  constructor(
    private $state: angular.ui.IStateService,
    private $translate,
    private $base64,
    private $localStorage,
    private $ionicUser,
    private $ionicPush,
    private $ionicAuth,
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService,
    private notificationService: notificationModule.INotificationService,
    private userAuthService: userAuthModule.IUserAuthService,
    private ionicMaterialInk
  ){
    this.ionicMaterialInk.displayEffect();
    
    this.newUser.type = 0;
  }
  
  registerNewUser( form ){
    this.utilsService.showLoad();
    this._registerInIonicIO(this.newUser.email, this.newUser.password)
    .then( data => {
      this.newUser.ionic_id = this.$ionicUser.current()._id;
      return this.userService.createUser( this._preparateData() );
    })
    .then( user => {
      return this.userService.login( this.newUser.email, this.newUser.password );
    })
    .then( user => {
      this.utilsService.hideLoad();
      this.utilsService.resetForm( form );
      
      this.utilsService.alert({
        title: this.$translate.instant("MESSAGES.succ_user_tit"),
        template: this.$translate.instant("MESSAGES.succ_user_mess")
      });
      this.$localStorage.token = this.$base64.encode(this.newUser.email +':'+ this.newUser.password);
      
      this.$ionicPush.register();
      
      this.newUser = {}
      this.newUser.type = 0;
      this.userAuthService.updateUserAuth( user );
      this.notificationService.activate();
      this.$state.go("profile");
      
    })
    .catch( data => {
      this.utilsService.hideLoad();
      if(this.utilsService.trim(data.message) === "Invalid credentials"){
        this.utilsService.alert({
          title: this.$translate.instant("ERRORS.signin_title_credentials"),
          template: this.$translate.instant("ERRORS.signin_incorrect_credentials")
        });
      }
      else if (this.utilsService.trim(data.message) === "Not inserted") {
        this.utilsService.alert({
          title: this.$translate.instant("ERRORS.signin_notinserted_credentials_title"),
          template: this.$translate.instant("ERRORS.signin_notinserted_credentials_message")
        });
      }
      else if (data.error && this.utilsService.trim(data.error.email) === "The email has already been taken.") {
        this.utilsService.alert({
          title: this.$translate.instant("ERRORS.signin_taken_credentials_title"),
          template: this.$translate.instant("ERRORS.signin_taken_credentials_message")
        });
      }
    });
  }
  
  private _registerInIonicIO( email:string, password:string ){
    return this.$ionicAuth.signup({
      'email': email,
      'password': password
    });
  }
  
  private  _preparateData(){
    return {
      email: this.newUser.email,
      password: this.newUser.password,
      password_confirmation: this.newUser.password,
      name: this.newUser.name,
      lang: 'en',
      type: this.newUser.type,
      ionic_id: this.newUser.ionic_id
    }
  }
  
}
angular
  .module('app.users')
  .controller('RegisterCtrl', RegisterCtrl);