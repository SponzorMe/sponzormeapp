/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .run(run);

  function run($ionicPlatform, $translate) {
    $ionicPlatform.ready(function() {
      // TODO - if lang in profile is different to device language ask the user if want switch else use the profile language
      if(typeof navigator.globalization !== "undefined") {
                navigator.globalization.getPreferredLanguage(function(language) {
                    $translate.use((language.value).split("-")[0]).then(function(data) {
                        //console.log("SUCCESS -> " + data);
                    }, function(error) {
                        //console.log("ERROR -> " + error);
                    });
                }, null);
      }
      else{
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
