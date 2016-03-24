/// <reference path="../../typings/main.d.ts" />
/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
module perkModule{
  
  export interface IPerkService{
    allPerks():angular.IPromise<any>;
    getPerk(perkId:string):angular.IPromise<any>;
    createPerk(data:any):angular.IPromise<any>;
    deletePerk(perkId:string):angular.IPromise<any>;
    editPerkPatch(perkId:string, data:any):angular.IPromise<any>;
    editPerkPut(perkId:string, data:any):angular.IPromise<any>;
  }
  
  export interface Perk{
    id:string;
  }
  
  export class PerkService implements IPerkService{
    
    $inject = [
      '$http',
      '$localStorage',
      'BackendVariables',
      '$q'
    ];
    
    constructor(
      private $http: angular.IHttpService,
      private $localStorage,
      private BackendVariables,
      private $q: angular.IQService
    ){}
  }
  
}
/*
(function() {
  'use strict';

  angular
    .module('app')
    .factory('perkService', perkService);

  perkService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function perkService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      allPerks: allPerks,
      getPerk: getPerk,
      createPerk: createPerk,
      deletePerk: deletePerk,
      editPerkPatch: editPerkPatch,
      editPerkPut: editPerkPut
    };

    return service;

    ////////////

    function allPerks(){
      return $http({
        method: 'GET',
        url: path + 'perks'
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.Perk );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getPerk( perkId ){

      //Validate
      var typePerkId = typeof perkId;
      if(typePerkId !== 'string' && typePerkId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'perks/' + perkId
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( preparateData(response.data.data) );
      }

      function preparateData( data ){
        var perk = data.Perk;
        perk.event = data.Event || {};
        perk.sponzorTasks = data.SponzorTasks || [];
        perk.tasks = data.Tasks || [];
        return perk;
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function createPerk( data ){

      //Validate
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'POST',
        url: path + 'perks',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.Perk );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function deletePerk( perkId ){

      //Validate
      var typePerkId = typeof perkId;
      if(typePerkId !== 'string' && typePerkId !== 'number') throw new Error();

      return $http({
        method: 'DELETE',
        url: path + 'perks/' + perkId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editPerkPatch( perkId, data ){

      //Validate
      var typePerkId = typeof perkId;
      if(typePerkId !== 'string' && typePerkId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PATCH',
        url: path + 'perks/' + perkId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.Perk );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function editPerkPut( perkId, data ){

      //Validate
      var typePerkId = typeof perkId;
      if(typePerkId !== 'string' && typePerkId !== 'number') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

      return $http({
        method: 'PUT',
        url: path + 'perks/' + perkId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.Perk );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

    function getToken(){
      return $localStorage.token;
    }

  }
})();
*/
