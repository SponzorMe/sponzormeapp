angular.module('App').controller('registerController', function ($scope, $state, userRequest, $cookies, $translate, $log, Utils) {
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
    $log.log("Usuario " + user.email);
    $log.log("Pass " + user.password);
    $log.log("Type " + user.type);


    $scope.objuser = {}
    $scope.objuser.email = user.email;
    $scope.objuser.password = user.password;
    $scope.objuser.password_confirmation = user.password;
    $scope.objuser.lang = "en";
    $scope.objuser.type = user.type;
    $scope.objuser.name = "First Name" + " " + "Last Name";


    userRequest.createUser($scope.objuser).success(function(adata){
          $log.log("adata=" + angular.toJson(adata));
          user.email = "";
          user.password = "";
          $state.go("signin");
          Utils.alertshow($translate.instant("MESSAGES.succ_user_tit"),$translate.instant("MESSAGES.succ_user_mess"));
          Utils.hide();
    }).
    error(function (data, status, headers, config) {
            // data is always undefined here when there is an error
            $log.error('Error fetching feed:', angular.toJson(data));
            $log.error("data.error.email: ",Utils.trim(data.error.email));
            if(Utils.trim(data.message) === "Invalid credentials"){
              Utils.alertshow($translate.instant("ERRORS.signin_title_credentials"),$translate.instant("ERRORS.signin_incorrect_credentials"));
            }
            else if (Utils.trim(data.error.email) === "The email has already been taken.") {
              Utils.alertshow($translate.instant("ERRORS.signin_taken_credentials_title"),$translate.instant("ERRORS.signin_taken_credentials_message"));
            }
            else if (Utils.trim(data.message) === "Not inserted") {
              Utils.alertshow($translate.instant("ERRORS.signin_notinserted_credentials_title"),$translate.instant("ERRORS.signin_notinserted_credentials_message"));
            }

            Utils.hide();
        });
    ;
  };

});
