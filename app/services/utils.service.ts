/// <reference path="../../typings/main.d.ts" />
/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
module utilsServiceModule{
  
  export interface IUtilsService{
    showLoad():void,
    hideLoad():void,
    alert(msg:any):ionic.popup.IonicPopupPromise,
    confirm(msg:any):ionic.popup.IonicPopupPromise,
    trim(str:string):string,
    resetForm(form:any):void
  }
  
  export class utilsService implements IUtilsService{
    
    $inject = [
      '$ionicLoading',
      '$ionicPopup',
      '$translate',
      '$ionicHistory'
    ];
    
    constructor(
      private $ionicLoading: ionic.loading.IonicLoadingService,
      private $ionicPopup: ionic.popup.IonicPopupService,
      private $translate,
      private $ionicHistory: ionic.navigation.IonicHistoryService
    ){}
    
    showLoad():void{
      return this.$ionicLoading.show();
    }
    
    hideLoad():void{
      return this.$ionicLoading.hide();
    }
    
    alert( msg:any ):ionic.popup.IonicPopupPromise{
      var options = msg || {};
      options.title = options.title || '<p>Ocurrió un error.</p>';
      options.template  = options.template || '<p class="text-center">Intento de nuevo.</p>';
      return this.$ionicPopup.alert( options );
    }
    
    confirm( msg:any ):ionic.popup.IonicPopupPromise{
      var options = msg || {};
      options.title = options.title || '¿ Estas seguro ?';
      options.template  = options.template || 'Estas seguro de eliminar.';
      return this.$ionicPopup.confirm( options );
    }
    
    trim( str:string ):string{
      if(typeof(str) == "string" || typeof(str) == "number" || typeof(str) == "boolean"){
        return str.toString().replace(/^\s+|\s+$/g,"");
      }
      return "";
    };
    
    resetForm( form:any):void{
      form.$setPristine();
      form.$setUntouched();
    }
    
  }
  
  angular
    .module('app')
    .service('utilsService', utilsService);
  
}
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
