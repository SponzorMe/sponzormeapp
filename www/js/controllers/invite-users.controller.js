'use strict';
(function () {
angular.module("App")
.controller("InviteUsersController", function($scope,$state,$location,$log, $localStorage, userRequest, Utils){
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
           $scope.objuserinv.message = "Esto es un mensaje";
           $log.log("Scope objuserinv ",angular.toJson($scope.objuserinv));
           userRequest.invitedUser($scope.objuserinv).success(function(adata){


                 /*if (adata.code == 200){
                       ngDialog.open({ template: 'emailsend.html', scope: $scope });
                 }else{
                       ngDialog.open({ template: 'errorsend.html' });
                 }*/

                 $log.log("Enviado", angular.toJson(adata));
                 Utils.hide();
           })
           .error(function(data, status) {
             $log.error('Invite User error', status, data);
             Utils.hide();
             })
           ;

     }

});
})();
