angular.module('App').controller('userController', function ($scope, $state, loginRequest, $base64, $sessionStorage, $location,Utils) {

  $scope.signIn = function (user) {
    Utils.show();
    //console.log("Usuario " + user.email);
    //console.log("Pass " + user.password);
    if($sessionStorage) {

          var cookie = $sessionStorage.cookiesponzorme;

          if(cookie == undefined){
                $scope.vieuser = 1;
          }else{
                $scope.vieuser = 0;
          }

          var typeini = $sessionStorage.typesponzorme;
          if (typeini != undefined){
             if(typeini == '1'){
               $scope.typeuser = 0;
            }else{
               $scope.typeuser = 1;
            }
          }

          $scope.userfroups = 0;
    }
    else{
         $location.path("/sign-in");
    }
    //console.log(user.email);
    //console.log(user.password);
    $scope.objuser = {}
    $scope.objuser.email = user.email;
    $scope.objuser.password = user.password;

    loginRequest.login($scope.objuser).success(function(adata){
          console.log("adata=" +JSON.stringify(adata));
          var expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);
          $sessionStorage.cookiesponzorme = btoa($scope.email+':'+$scope.password);
          $sessionStorage.typesponzorme = adata.user.type;
          $sessionStorage.token = btoa($scope.email+':'+$scope.password);
          $sessionStorage.id = adata.user.id;
          $sessionStorage.email = adata.user.email;

          /*
          var url = $location.host();

          if(url == 'localhost'){
                $sessionStorage.developer = 1;
          }
          */

          if(adata.user.type === 1){
                $state.go("menuorganizers.organizershome");
          }else{
                  $state.go("menusponzors.homesponzors");
          }
          Utils.hide();
    }).
    error(function (data, status, headers, config) {
            // data is always undefined here when there is an error
            //console.error('Error fetching feed:', JSON.stringify(data));
            Utils.alertshow("Error",data.message);
            Utils.hide();
        });
    ;
    //loginRequest.login(user);
  };

});
