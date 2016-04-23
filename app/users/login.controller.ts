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
    '$translate',
    '$base64',
    '$localStorage',
    '$ionicAuth',
    '$ionicAnalytics',
    'userService',
    'utilsService',
    'notificationService',
    'userAuthService',
  ];
  user:any = {};
  
  constructor(
    private $state: angular.ui.IStateService,
    private $translate,
    private $base64,
    private $localStorage,
    private $ionicAuth,
    private $ionicAnalytics,
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
      this.user = this.userAuthService.updateUserAuth( user );
      
      this.$ionicAnalytics.register();
      this.notificationService.activate();
      if( this.user.type == 0 ){ // is an Organizer.
        this.$state.go("organizer.home");
      }else{ // is an Sponsor
        this.$state.go("sponzor.home");
      }
      this.user = {};
    })
    .catch( error => {
      this.utilsService.hideLoad();
      if(this.utilsService.trim(error.message) === "Invalid credentials"){
        this.utilsService.alert({
          title: this.$translate.instant("ERRORS.signin_title_credentials"),
          template: this.$translate.instant("ERRORS.signin_incorrect_credentials"),
        });
      }
      this.user.password = '';
    });
  };
  
  private _loginInIonicIO(email:string, password:string){
    this.$ionicAuth
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
    .then( data => {
      console.log(data);
    })
    .catch( error => {
      console.log( error );
    })
  }
  
}
angular
  .module('app.users')
  .controller('LoginCtrl', LoginCtrl);