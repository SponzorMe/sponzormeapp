/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Personal information of user
*
* @author Nicolas Molina
* @version 0.1
*/
class FormProfileCtrl{
  
  $inject = [
    '$state',
    '$translate',
    'userService',
    'utilsService',
    'userAuthService'
  ];
  userAuth:userModule.User;
  
  constructor(
    private $state: angular.ui.IStateService,
    private $translate,
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService,
    private userAuthService: userAuthModule.IUserAuthService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
    
    this.userAuth.lang = 'en';
    this.userAuth.sex = 1;
  }
  
  changeLang(){
    this.$translate.use(this.userAuth.lang);
  }
  
  updateProfile( form ){
    this.utilsService.showLoad();
    this.userService.editUserPatch( this.userAuth.id, this._preparateData() )
    .then( user => {
      this.utilsService.hideLoad();
      this.utilsService.resetForm( form );
      this.userAuth = this.userAuthService.updateUserAuth( user );
      this.$state.go("interests");
    })
    .catch( error => {
      this.utilsService.hideLoad();
    });
  }
  
  private _preparateData(){
    return {
      name: this.userAuth.name,
      age: this.userAuth.age,
      location: this.userAuth.location.formatted_address,
      location_reference: this.userAuth.location.place_id,
      lang: this.userAuth.lang,
      sex: this.userAuth.sex
    }
  }
  
}
angular
  .module('app.users')
  .controller('FormProfileCtrl', FormProfileCtrl);