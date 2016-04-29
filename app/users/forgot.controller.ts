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
    '$ionicHistory',
    'userService', 
    'utilsService',
  ];
  user:any = {};
  
  constructor(
    private $state: angular.ui.IStateService,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService
  ){}
  
  resetPassword( form ){
    this.utilsService.showLoad();
    this.userService.forgotPassword( this.user.email )
    .then( () => {
      this.utilsService.hideLoad();
      this.utilsService.resetForm( form );
      
      this.utilsService.alert({
        title: 'Reset password',
        template: '<p class="text-center">Reset password Link sent, review your email.</p>',
      })
      .then(() => {
        this.$ionicHistory.clearCache();
        this.$state.go("signin");
        this.user = {};
      });
      
    })
    .catch( error => {
      this.utilsService.hideLoad();
      this.utilsService.resetForm( form );
    });
  };
  
}
angular
  .module('app.users')
  .controller('ForgotCtrl', ForgotCtrl);