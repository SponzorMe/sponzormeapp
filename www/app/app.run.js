/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .run(run);

  function run($ionicPlatform, $translate, $cordovaGlobalization, $ionicPopup, $ionicDeploy, utilsService, $cordovaToast ) {
    $ionicPlatform.ready(function() {

      $ionicDeploy.setChannel("production");

      $cordovaGlobalization.getPreferredLanguage()
        .then( complete )
        .catch( failed );

        function complete( language ){
          var lang = (language.value).split("-")[0];
          var messages = {
            'es': '¿Quieres cambiar el lenguaje a Español?',
            'en': ' Do you want changue the language to English?',
            'pt': '¿Você quer mudar a língua para Português?'
          };
          $ionicPopup.confirm({
            title: 'Language',
            template: '<p class="text-center">' + messages[lang] + '</p>'
          })
          .then(function( rta ){
            if(rta){
              $translate.use( lang );
            }else{
              $translate.use("en");
            }
          });
          
        }

        function failed( error ){
          $translate.use("en");
        }

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

      checkForUpdates();

      function checkForUpdates(){
        $ionicDeploy.check()
        .then( complete );

        function complete( hasUpdate ){
          if (hasUpdate){

            utilsService.confirm({
              title: $translate.instant("MESSAGES.update_title"),
              template: '<p class="text-center">'+ $translate.instant("MESSAGES.update_text") +'</p>'
            })
            .then( complete );

            function complete( rta ){
              if(rta) doUpdate();
            }
          }else{
            utilsService.alert({
              title: $translate.instant("MESSAGES.update_title"),
              template: '<p class="text-center">'+ $translate.instant("MESSAGES.update_text_nothing") +'</p>'
            });
          }
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
    });
  }

})();
