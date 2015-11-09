/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('utilsService', utilsService);

  utilsService.$inject = [ '$ionicLoading', '$ionicPopup', '$translate'];

  function utilsService( $ionicLoading, $ionicPopup, $translate) {

    var service = {
      showLoad: showLoad,
      hideLoad: hideLoad,
      alert: alert,
      trim: trim
    };

    return service;

    ////////////

    function showLoad(){
      $ionicLoading.show({
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200,
        showDelay: 500,
        //template: '<p class="item-icon-left">'+ $translate.instant('MESSAGES.loading')+'<ion-spinner icon="bubbles"/></p>'
      });
    }

    function hideLoad(){
      $ionicLoading.hide();
    }

    function alert( msg ){
      msg.title = msg.title || 'Ocurrió un error.';
      msg.template  = msg.template || 'Intento de nuevo.';
      var alertPopup = $ionicPopup.alert( msg );
      return alert;
    }

    function trim( str ){
      str = str.toString();
      return str.replace(/^\s+|\s+$/g,"");
    };

  }
})();
