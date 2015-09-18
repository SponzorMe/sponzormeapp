'use strict':
(function(){
angular.module("App")
.controller("InviteUsersController", function($scope,$state,$location,$log){
  $scope.init = function(){
    //check the session
    if(!userRequest.checkSession($localStorage.token,$localStorage.userAuth)){
      $state.go("signin");
    }
  };

  $scope.invitefriend = function(){

           $scope.objuserinv = {};
           $scope.objuserinv.user_id = $localStorage.userAuth.id;
           $scope.objuserinv.email = $scope.friend.email;
           $scope.objuserinv.message = "";
           userRequest.invitedUser($scope.objuserinv).success(function(adata){
                 /*if (adata.code == 200){
                       ngDialog.open({ template: 'emailsend.html', scope: $scope });
                 }else{
                       ngDialog.open({ template: 'errorsend.html' });
                 }*/

                 $log.log("Enviado", angular.toJson(adata));
           })
           .error(function(data, status) {
             $log.error('Invite User error', status, data);
             })
           ;

     }

});
})();
