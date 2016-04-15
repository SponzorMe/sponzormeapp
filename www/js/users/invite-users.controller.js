/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var InviteUsersCtrl = (function () {
    function InviteUsersCtrl(userService, utilsService, userAuthService) {
        this.userService = userService;
        this.utilsService = utilsService;
        this.userAuthService = userAuthService;
        this.$inject = [
            'userService',
            'utilsService',
            'userAuthService'
        ];
        this.friend = {};
        this.userAuth = this.userAuthService.getUserAuth();
    }
    InviteUsersCtrl.prototype.inviteFriend = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.userService.invitedUser(this._preparateData())
            .then(function () {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.friend = {};
            _this.utilsService.alert({
                title: "Nice!",
                template: "Your Invitation was Sent."
            });
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    InviteUsersCtrl.prototype._preparateData = function () {
        return {
            user_id: this.userAuth.id,
            email: this.friend.email,
            message: "Try this ;)"
        };
    };
    return InviteUsersCtrl;
}());
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
