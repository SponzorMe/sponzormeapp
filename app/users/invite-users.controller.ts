/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class InviteUsersCtrl{
  
  $inject = [
    'userService', 
    'utilsService',
    'userAuthService'
  ];
  friend:any = {};
  userAuth:userModule.User;
  
  constructor(
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService,
    private userAuthService: userAuthModule.IUserAuthService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
  }
  
  inviteFriend( form ){
    this.utilsService.showLoad();
    this.userService.invitedUser( this._preparateData() )
    .then( () => {
      this.utilsService.hideLoad();
      this.utilsService.resetForm( form );
      this.friend = {};
      this.utilsService.alert({
        title: "Nice!",
        template: "Your Invitation was Sent."
      });
    })
    .catch( error => {
      this.utilsService.hideLoad();
    });
  }
  
  private _preparateData(){
    return {
      user_id: this.userAuth.id,
      email: this.friend.email,
      message: "Try this ;)"
    }
  }

  
}
/*
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('InviteUsersController', InviteUsersController);

  InviteUsersController.$inject = [
    'userService', 
    'utilsService',
    '$localStorage',
    'userAuthService'
  ];

  function InviteUsersController( userService, utilsService, $localStorage, userAuthService) {

    var vm = this;
    vm.friend = {};
    vm.userAuth = userAuthService.getUserAuth();
    vm.inviteFriend = inviteFriend;

    ////////////

    function inviteFriend( form ){
      utilsService.showLoad();
      userService.invitedUser( preparateData() )
        .then( complete )
        .catch( failed );

        function complete(){
          utilsService.hideLoad();
          utilsService.resetForm( form );
          vm.friend = {};
          utilsService.alert({
            title: "Nice!",
            template: "Your Invitation was Sent."
          });
        }

        function failed(){
          utilsService.hideLoad();
        }
    }


    function preparateData(){
      return {
        user_id: vm.userAuth.id,
        email: vm.friend.email,
        message: "Try this ;)"
      }
    }

  }
})();
*/