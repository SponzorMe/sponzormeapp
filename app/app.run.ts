/// <reference path="../typings/tsd.d.ts" />
/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .run(run);

  function run($ionicPlatform, $translate, $cordovaGlobalization, $ionicPopup, $ionicDeploy, $ionicUser, utilsService, $cordovaToast, $ionicAnalytics, $ionicPush,  $localStorage, userAuthService, notificationService, BackendVariables ) {
    //function run($ionicPlatform ) {


    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
      //registerToken();
      activateNotifications();
      //chooseLanguage();
      //ionicAnalytics();
    });
    
    
    function activateNotifications() {
      if(userAuthService.checkSession()){
         notificationService.activate();
         userAuthService.refresh();
      }
    }

    function ionicAnalytics(){
      $ionicAnalytics.register();
      $ionicAnalytics.setGlobalProperties({
        app_version_number: BackendVariables.version,
        channel: BackendVariables.channel,
        day_of_week: (new Date()).getDay()
      });
    }
    
    function registerToken(){
      $ionicPush.init({
        "debug": true,
        "onNotification": function( notification ){
          var payload = notification.payload;
          console.log(notification, payload);
        },
        "onRegister": function (data) {
          console.log('token', data);
          $ionicPush.saveToken(data.token);
        }
      });
      
      var ionicUser = $ionicUser.current();
      
      if(ionicUser.isAuthenticated()){
        console.log("Is Authenticated");
        $ionicPush.register();
      }else{
        console.log("Is not Authenticated");
      }
      
    }
   


    function chooseLanguage(){

      if(!checkChooseLang()){
        $cordovaGlobalization.getPreferredLanguage()
        .then( complete )
        .catch( failed );
      }else{
        checkForUpdates();
      }

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
          $localStorage.chooseLang = true;
        })
        .then( checkForUpdates );
        
      }

      function failed( error ){
        $translate.use("en");
      }
    }

    function checkChooseLang(){
      if(angular.isDefined($localStorage.chooseLang)){
        return true;
      }
      return false;
    }

    function checkForUpdates(){
      $ionicDeploy.setChannel(BackendVariables.channel);
      $ionicDeploy.check()
      .then( complete );

      function complete( hasUpdate ){
        if (hasUpdate){

          utilsService.confirm({
            title: $translate.instant("MESSAGES.update_title"),
            template: '<p class="text-center">'+ $translate.instant("MESSAGES.update_text") +'</p>'
          })
          .then(function(rta){
            if(rta) doUpdate();
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
  }

})();
