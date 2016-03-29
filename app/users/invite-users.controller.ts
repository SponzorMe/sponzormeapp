/// <reference path="../../typings/main.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
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