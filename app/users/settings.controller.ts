/// <reference path="../../typings/main.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2

(function() {

  angular
    .module('app.users')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = [
    '$translate',
    'utilsService',
    '$cordovaToast',
    '$ionicDeploy'
  ];

  function SettingsController( $translate, utilsService, $cordovaToast, $ionicDeploy ) {

    var vm = this;
    vm.lang = $translate.use();
    vm.save = save;
    vm.checkForUpdates = checkForUpdates;
    vm.doUpdate = doUpdate;

    activate();
    ////////////

    function activate(){
      $ionicDeploy.setChannel("production");
    }

    function save(){
      $translate.use(vm.lang);
    }

    function checkForUpdates(){
      utilsService.showLoad();
      $ionicDeploy.check()
      .then( complete )
      .catch( failed );

      function complete( hasUpdate ){
        utilsService.hideLoad();
        if (hasUpdate){

          utilsService.confirm({
            title: $translate.instant("MESSAGES.update_title"),
            template: '<p class="text-center">'+ $translate.instant("MESSAGES.update_text") +'</p>'
          })
          .then( complete );

          function complete( rta ){
            if(rta) vm.doUpdate();
          }
        }else{
          utilsService.alert({
            title: $translate.instant("MESSAGES.update_title"),
            template: '<p class="text-center">'+ $translate.instant("MESSAGES.update_text_nothing") +'</p>'
          });
        }
      }

      function failed(){
        utilsService.hideLoad();
      }
    }

    function doUpdate(){
      utilsService.showLoad();
      $ionicDeploy.update()
      .then( complete )
      .catch( failed );

      function complete(){
        utilsService.hideLoad();
        $cordovaToast.showShortBottom($translate.instant("MESSAGES.update_success"));
      }

      function failed(){
        utilsService.hideLoad();
        utilsService.alert();
      }
    }

  }
})();
*/