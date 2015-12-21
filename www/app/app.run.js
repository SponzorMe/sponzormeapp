/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .run(run);

  function run($ionicPlatform, $translate, $cordovaGlobalization) {
    $ionicPlatform.ready(function() {

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
            template: messages[lang]
          })
          .then(function( rta ){
            if(rta){
              $translate.use( lang );
            }else{
              $translate.use("en");
            }
          });
          
        }

        function failed(){
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
    });
  }

})();
