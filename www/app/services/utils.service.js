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

  utilsService.$inject = [
    '$ionicLoading',
    '$ionicPopup',
    '$translate',
    '$localStorage',
    '$ionicHistory'
  ];

  function utilsService( $ionicLoading, $ionicPopup, $translate, $localStorage) {

    var service = {
      showLoad: showLoad,
      hideLoad: hideLoad,
      alert: alert,
      confirm: confirm,
      trim: trim,
      resetForm: resetForm,
      updateUserAuth: updateUserAuth
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
      return $ionicPopup.alert( msg );
    }

    function confirm( msg ){
      msg.title = msg.title || '¿ Estas seguro ?';
      msg.template  = msg.template || 'Estas seguro de eliminar.';
      return $ionicPopup.confirm( msg );
    }

    function trim( str ){
      str = str.toString();
      return str.replace(/^\s+|\s+$/g,"");
    };

    function resetForm( form ){
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
    }

    function updateUserAuth( data ){
      return angular.extend($localStorage.userAuth || {}, data);
    }

    

  }
})();
