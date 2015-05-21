angular.module('App').controller('userController', function ($scope, $state) {
  $scope.signIn = function () {
    console.log("Usuario " + $scope.user.email);

    if($scope.user.email === "admin"){
      $state.go('menusponzors.homesponzors');
    }
    else {
      $state.go('menuorganizers.organizershome');
    }

    /*
    $scope.getInfo = function () {
      $user.getInfo($user.info.key).then(function(response){
        debugger;
      }, function (error) {
        debugger;
      });
    };
    */

    /*
    $user.signIn($scope.user).then(function (response) {


      $scope.user.key = $user.info.key;
      $scope.getInfo();
      $scope.user.userId = $user.info.userId;
      if($scope.user.userId > 0){
        $state.go('eventmenu.home');
      }

    }, function (error){
      debugger;
      });*/
  };

});
