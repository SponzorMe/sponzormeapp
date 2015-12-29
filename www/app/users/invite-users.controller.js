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
    '$localStorage'
  ];

  function InviteUsersController( userService, utilsService, $localStorage) {

    var vm = this;
    vm.friend = {};
    vm.userAuth = $localStorage.userAuth;
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