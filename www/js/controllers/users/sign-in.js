angular.module('App').controller('userController', function ($scope, $state, $base64,$localStorage, $cookies, $location, $translate, loginRequest, userRequest, Utils) {

  $scope.signIn = function (user) {
    Utils.show();
    //console.log("Usuario " + user.email);
    //console.log("Pass " + user.password);
    if($localStorage) {

          var cookie = $localStorage.cookiesponzorme;

          if(cookie == undefined){
                $scope.vieuser = 1;
          }else{
                $scope.vieuser = 0;
          }

          var typeini = $localStorage.typesponzorme;
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
          console.log("adata=" + JSON.stringify(adata));
          var expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);
          $localStorage.cookiesponzorme = $base64.encode($scope.objuser.email + ':' + $scope.objuser.password);
          $localStorage.typesponzorme = adata.user.type;
          $localStorage.token = $base64.encode($scope.objuser.email +':'+ $scope.objuser.password);
          $localStorage.id = adata.user.id;
          $localStorage.email = adata.user.email;
          $cookies.put('token',$base64.encode($scope.objuser.email +':'+ $scope.objuser.password));
          $cookies.putObject('userAuth', adata.user);

          console.log("demo data " + adata.user.demo);

          if(adata.user.type == 0){
              if(adata.user.demo == 0)
              {
                var user = {};
                console.log("id de usuario:" + $localStorage.id);
                user.demo = 1;
                userRequest.editUserPatch($localStorage.id, user)
              .success(function(response){
                console.log("response" +  JSON.stringify(response));
                $state.go("introorganizers");
              })
              .error(function(data, status) {
                console.error('editUserPatch error', status, data);
                })
              .finally(function() {
                  console.log("finally finished editUserPatch");
                });

              }
              else{
                $state.go("menuorganizers.organizershome");
              }
          }else{
              if(adata.user.demo == 0)
              {
                    var user = {};
                    console.log("id de usuario:" + $localStorage.id);
                    user.demo = 1;
                    userRequest.editUserPatch($localStorage.id, user)
                    .success(function(response){
                    console.log("response" +  JSON.stringify(response));
                    $state.go("introsponzors");
                    })
                    .error(function(data, status) {
                      console.error('editUserPatch error', status, data);
                      })
                    .finally(function() {
                        console.log("finally finished editUserPatch");
                      });
             }
             else{
               $state.go("menusponzors.homesponzors");
             }

          }
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
    //loginRequest.login(user);
  };

});
