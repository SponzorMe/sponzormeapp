angular.module('App').controller('forgotController', function ($scope, $state, userRequest, $cookies, Utils) {
  $scope.resetPass = function (user) {
    Utils.show();
    console.log("Usuario " + user.email);

    $scope.objuser = {}
    $scope.objuser.email = user.email;

    userRequest.forgotPassword($scope.objuser).success(function(adata){
          console.log("adata=" +JSON.stringify(adata));
          user.email ="";
          Utils.hide();
    }).
    error(function (data, status, headers, config) {
            // data is always undefined here when there is an error
            console.error('Error fetching feed:', JSON.stringify(data));
            if(data.message === "Invalid credentials"){
            Utils.alertshow($translate.instant("ERRORS.signin_title_credentials"),$translate.instant("ERRORS.signin_incorrect_credentials"));
            }
            user.email ="";
            Utils.hide();
        });
  };

});
