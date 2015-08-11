angular.module('App').controller('registerController', function ($scope, $state, userRequest, $cookies, Utils) {
  // we will store all of our form data in this object
  $scope.user = {};

  if(!angular.isDefined($scope.step)){
    $scope.step = 1;
  }


  $scope.step2 = function(){
    $scope.step++;
    //$state.go('joinnow.step2');
  }
  $scope.step3 = function(){
    $scope.step++;
    //$state.go('joinnow.step2');
  }

  $scope.register = function (user) {
    Utils.show();
    console.log("Usuario " + user.email);
    console.log("Pass " + user.password);


    $scope.objuser = {}
    $scope.objuser.email = user.email;
    $scope.objuser.password = user.password;
    $scope.objuser.password_confirmation = user.password;
    $scope.objuser.lang = "en";
    $scope.objuser.type = 0;
    $scope.objuser.name = "First Name" + " " + "Last Name";

    userRequest.createUser($scope.objuser).success(function(adata){
          console.log("adata=" +JSON.stringify(adata));
          Utils.hide();
    }).
    error(function (data, status, headers, config) {
            // data is always undefined here when there is an error
            console.error('Error fetching feed:', JSON.stringify(data));
            if(data.message === "Invalid credentials"){
            Utils.alertshow($translate.instant("ERRORS.signin_title_credentials"),$translate.instant("ERRORS.signin_incorrect_credentials"));
            }
            Utils.hide();
        });
    ;
  };

});
