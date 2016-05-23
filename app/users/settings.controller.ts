/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class SettingsCtrl{
  
  $inject = [
    '$translate',
    '$cordovaToast',
    '$ionicDeploy',
    'utilsService',
    'BackendVariables',
    'ionicMaterialInk'
  ];
  lang:string;
  
  constructor(
    private $translate,
    private $cordovaToast,
    private $ionicDeploy,
    private utilsService,
    private BackendVariables,
    private ionicMaterialInk
  ){
    if(ionic.Platform.isAndroid()){
      this.ionicMaterialInk.displayEffect();
    }
    
    this.lang = this.$translate.use();
    this.$ionicDeploy.setChannel(BackendVariables.channel);
  }
  
  save(){
    this.$translate.use(this.lang);
  }
  
  checkForUpdates(){
    this.utilsService.showLoad();
    this.$ionicDeploy.check()
    .then( hasUpdate => {
      this.utilsService.hideLoad();
      if (hasUpdate){
        this.utilsService.confirm({
          title: this.$translate.instant("MESSAGES.update_title"),
          template: '<p class="text-center">'+ this.$translate.instant("MESSAGES.update_text") +'</p>'
        })
        .then( rta => {
          if(rta) this._doUpdate();
        });
      }else{
        this.utilsService.alert({
          title: this.$translate.instant("MESSAGES.update_title"),
          template: '<p class="text-center">'+ this.$translate.instant("MESSAGES.update_text_nothing") +'</p>'
        });
      }
    })
    .catch( error => {
      this.utilsService.hideLoad();
    });
  }
  
  private _doUpdate(){
    this.utilsService.showLoad();
    this.$ionicDeploy.update()
    .then( () => {
      this.utilsService.hideLoad();
      this.$cordovaToast.showShortBottom(this.$translate.instant("MESSAGES.update_success"));
    })
    .catch( error => {
      this.utilsService.hideLoad();
      this.utilsService.alert();
    });
  }
}
angular
  .module('app.users')
  .controller('SettingsCtrl', SettingsCtrl);