'use strict';
(function () {
angular.module("App")
.controller("InviteUsersController", InviteUsersController);
function InviteUsersController($scope,$state,$location,$log, $localStorage, userRequest, Utils){
  $scope.init = function(){
    //check the session
    if(!userRequest.checkSession($localStorage.token,$localStorage.userAuth)){
      $state.go("signin");
    }
  };

  $scope.invitefriend = function(user){
          Utils.show();
           $scope.objuserinv = {};
           $scope.objuserinv.user_id = $localStorage.userAuth.id;
           $scope.objuserinv.email = user.email;
           $scope.objuserinv.message = "Try this ;)";
           $log.log("Scope objuserinv ",angular.toJson($scope.objuserinv));
           userRequest.invitedUser($scope.objuserinv).success(function(adata){
                 $log.log("Enviado", angular.toJson(adata));
                 Utils.hide();
                 Utils.alertshow("Nice!", "Your Invitation was Sent.");
           })
           .error(function(data, status) {
             $log.error('Invite User error', status, data);
             Utils.hide();
             })
           ;

     }

};
})();
