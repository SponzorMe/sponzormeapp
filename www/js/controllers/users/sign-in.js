'use strict';
(function () {
angular.module('App').controller('userController', function ($scope, $state, $base64,$localStorage, $log, $location, $translate, loginRequest, userRequest, Utils) {

  $scope.init = function(){
    //check the session
    if(angular.isDefined($localStorage.token) && angular.isDefined($localStorage.userAuth)){

      if($localStorage.userAuth.type == 0){ // is an Organizer
          if($localStorage.userAuth.demo == 0)
          {
            $state.go("introorganizers");
          }
          else{
            $state.go("menuorganizers.organizershome");
          }
      }
      else{ // is a Sponzor
        if($localStorage.userAuth.demo == 0)
        {
           $state.go("introsponzors");
        }
        else{
           $state.go("menusponzors.homesponzors");
        }
      }

    }

  };

  $scope.signIn = function (user) {
    Utils.show();

    $scope.objuser = {}
    $scope.objuser.email = user.email;
    $scope.objuser.password = user.password;

    loginRequest.login($scope.objuser).success(function(adata){
          $log.log("adata=" + angular.toJson(adata));
          $localStorage.token = $base64.encode($scope.objuser.email +':'+ $scope.objuser.password)
          // we need parse variable types in order to use in the app.
          adata.user.age = parseInt(adata.user.age);
          $localStorage.userAuth = adata.user;

          if(adata.user.type == 0){ // is an Organizer.
              if(adata.user.demo == 0)
              {
                var user = {};
                $log.log("id de usuario:" + $localStorage.id);
                user.demo = 1;
                userRequest.editUserPatch($localStorage.id, user)
              .success(function(response){
                $log.log("response" +  angular.toJson(response));
                $state.go("introorganizers");
              })
              .error(function(data, status) {
                console.error('editUserPatch error', status, data);
                })
              .finally(function() {
                  $log.log("finally finished editUserPatch");
                });

              }
              else{
                $state.go("menuorganizers.organizershome");
              }
          }else{ // is an Sponzor
              if(adata.user.demo == 0)
              {
                    var user = {};
                    $log.log("id de usuario:" + $localStorage.id);
                    user.demo = 1;
                    userRequest.editUserPatch($localStorage.id, user)
                    .success(function(response){
                    $log.log("response" +  angular.toJson(response));
                    $state.go("introsponzors");
                    })
                    .error(function(data, status) {
                      console.error('editUserPatch error', status, data);
                      })
                    .finally(function() {
                        $log.log("finally finished editUserPatch");
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
            console.error('Error fetching feed:', angular.toJson(data));
            if(data.message === "Invalid credentials"){
            Utils.alertshow($translate.instant("ERRORS.signin_title_credentials"),$translate.instant("ERRORS.signin_incorrect_credentials"));
            }
            Utils.hide();
        });
    ;
  };

});

})();
