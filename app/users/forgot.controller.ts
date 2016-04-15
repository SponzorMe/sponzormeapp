/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class ForgotCtrl{
  
  $inject = [
    '$state',
    '$translate',
    '$ionicHistory',
    'userService', 
    'utilsService',
  ];
  user:any = {};
  
  constructor(
    private $state: angular.ui.IStateService,
    private $translate,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService
  ){}
  
  resetPassword(){
    this.utilsService.showLoad();
    this.userService.forgotPassword( this.user.email )
    .then( () => {
      this.utilsService.hideLoad();
      this.$ionicHistory.clearCache();
      this.$state.go("signin");
      this.user = {};
    })
    .catch( error => {
      this.utilsService.hideLoad();
    });
  };
  
}
angular
  .module('app.users')
  .controller('ForgotCtrl', ForgotCtrl);