/// <reference path="../../typings/main.d.ts" />
/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
var utilsServiceModule;
(function (utilsServiceModule) {
    var utilsService = (function () {
        function utilsService($ionicLoading, $ionicPopup, $translate, $ionicHistory) {
            this.$ionicLoading = $ionicLoading;
            this.$ionicPopup = $ionicPopup;
            this.$translate = $translate;
            this.$ionicHistory = $ionicHistory;
            this.$inject = [
                '$ionicLoading',
                '$ionicPopup',
                '$translate',
                '$ionicHistory'
            ];
        }
        utilsService.prototype.showLoad = function () {
            return this.$ionicLoading.show();
        };
        utilsService.prototype.hideLoad = function () {
            return this.$ionicLoading.hide();
        };
        utilsService.prototype.alert = function (msg) {
            var options = msg || {};
            options.title = options.title || '<p>Ocurrió un error.</p>';
            options.template = options.template || '<p class="text-center">Intento de nuevo.</p>';
            return this.$ionicPopup.alert(options);
        };
        utilsService.prototype.confirm = function (msg) {
            var options = msg || {};
            options.title = options.title || '¿ Estas seguro ?';
            options.template = options.template || 'Estas seguro de eliminar.';
            return this.$ionicPopup.confirm(options);
        };
        utilsService.prototype.trim = function (str) {
            if (typeof (str) == "string" || typeof (str) == "number" || typeof (str) == "boolean") {
                return str.toString().replace(/^\s+|\s+$/g, "");
            }
            return "";
        };
        ;
        utilsService.prototype.resetForm = function (form) {
            form.$setPristine();
            form.$setUntouched();
        };
        return utilsService;
    }());
    utilsServiceModule.utilsService = utilsService;
    angular
        .module('app')
        .service('utilsService', utilsService);
})(utilsServiceModule || (utilsServiceModule = {}));
/*
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

    

    function hideLoad(){
      $ionicLoading.hide();
    }

    function alert( msg ){
      var options = msg || {};
      options.title = options.title || '<p>Ocurrió un error.</p>';
      options.template  = options.template || '<p class="text-center">Intento de nuevo.</p>';
      return $ionicPopup.alert( options );
    }

    function confirm( msg ){
      var options = msg || {};
      options.title = options.title || '¿ Estas seguro ?';
      options.template  = options.template || 'Estas seguro de eliminar.';
      return $ionicPopup.confirm( options );
    }

    function trim( str ){
      if(typeof(str) == "string" || typeof(str) == "number" || typeof(str) == "boolean"){
        return str.toString().replace(/^\s+|\s+$/g,"");
      }
      return "";
    };

    function resetForm( form ){
      //Validate
      var typeForm = typeof form;
      if(typeForm !== 'object' || Array.isArray(form)) throw new Error();
      
      form.$setPristine();
      form.$setUntouched();
    }

    function updateUserAuth( data ){
      return angular.extend($localStorage.userAuth || {}, data);
    }

    

  }
})();
*/
