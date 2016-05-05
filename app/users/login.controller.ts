/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Login user
*
* @author Nicolas Molina
* @version 0.1
*/
class LoginCtrl{
  
  $inject = [
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
  ];
  user:any = {};
  
  constructor(
    private $state: angular.ui.IStateService,
    private $q: angular.IQService,
    private $translate,
    private $base64,
    private $localStorage,
    private $ionicUser,
    private $ionicPush,
    private $ionicAuth,
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService,
    private notificationService: notificationModule.INotificationService,
    private userAuthService: userAuthModule.IUserAuthService
  ){
    if(userAuthService.checkSession()){
      this.user = this.userAuthService.getUserAuth();
      if( this.user.type == 0 ){ // is an Organizer.
        this.$state.go("organizer.home");
      }else{ // is an Sponzor
        this.$state.go("sponzor.home");
      }
    }
  }
  
  signIn( form ){
    this.utilsService.showLoad();
    this.userService.login( this.user.email, this.user.password )
    .then( user => {
      this.utilsService.hideLoad();
      this.utilsService.resetForm( form );
      
      this.$localStorage.token = this.$base64.encode(this.user.email +':'+ this.user.password);
      
      this.notificationService.activate();
      
      this._validateIonicId( user )
      .then( data => {
        this.user = this.userAuthService.updateUserAuth( user );
        this.$ionicPush.register();
        
        if( this.user.type == 0 ){ // is an Organizer.
          this.$state.go("organizer.home");
        }else{ // is an Sponsor
          this.$state.go("sponzor.home");
        }
        this.user = {};
        
      })
      .catch ( error => {
        console.log( error );
      });
      
    })
    .catch( error => {
      this.utilsService.hideLoad();
      if(this.utilsService.trim(error.message) === "Invalid credentials"){
        this.utilsService.alert({
          title: this.$translate.instant("ERRORS.signin_title_credentials"),
          template: `<p class="text-center">${this.$translate.instant("ERRORS.signin_incorrect_credentials")}</p>`,
        });
      }
      this.user.password = '';
    });
  };
  
  
  
  private _loginInIonicIO(email:string, password:string){
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
      }
    )
  }
  
  private _registerInIonicIO( email:string, password:string ){
    return this.$ionicAuth
    .signup({
      'email': email,
      'password': password
    })
    .then(data => {
      this.user.ionic_id = this.$ionicUser.current()._id;
      return this._uploadProfile();
    })
    .catch( error => {
      return this.$q.reject( error );
    })
  }
  
  private _uploadProfile( ){
     return this.userService.editUserPatch( this.user.id, this.user );
  }
  
  private _validateIonicId( user ){
    if(user.ionic_id == ""){
      return this._registerInIonicIO(this.user.email, this.user.password);
    }
    return this._loginInIonicIO(this.user.email, this.user.password);
  }
  
}
angular
  .module('app.users')
  .controller('LoginCtrl', LoginCtrl);