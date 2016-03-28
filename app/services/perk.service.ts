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
    //getPerk(perkId:string):angular.IPromise<any>;
    createPerk(data:any):angular.IPromise<any>;
    deletePerk(perkId:string):angular.IPromise<any>;
    editPerkPatch(perkId:string, data:any):angular.IPromise<any>;
    editPerkPut(perkId:string, data:any):angular.IPromise<any>;
  }
  
  export interface Perk{
    id:string;
    event:any;
    sponzor_tasks:any;
    tasks:any;
  }
  
  export class perkService implements IPerkService{
    
    $inject = [
      '$http',
      '$localStorage',
      'BackendVariables',
      '$q'
    ];
    path:string;
    
    constructor(
      private $http: angular.IHttpService,
      private $localStorage,
      private BackendVariables,
      private $q: angular.IQService
    ){
      this.path = BackendVariables.url;
    }
    
    allPerks():angular.IPromise<any>{
      return this.$http({
        method: 'GET',
        url: `${this.path}perks`,
      })
      .then( response => { return this.$q.when( this._preparatePerks( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    createPerk( data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'POST',
        url: `${this.path}perks`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparatePerk( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    deletePerk( perkId:string ):angular.IPromise<any>{
      return this.$http({
        method: 'DELETE',
        url: `${this.path}perks/${perkId}`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
      })
      .then( response => { return this.$q.when( response.data ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    editPerkPatch( perkId:string, data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'PATCH',
        url: `${this.path}perks/${perkId}`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparatePerk( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    editPerkPut( perkId:string, data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'PUT',
        url: `${this.path}perks/${perkId}`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparatePerk( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    buildPerk(data:any):Perk{
      let perk = data;
      perk.event = data.Event || {};
      perk.sponzor_tasks = data.SponzorTasks || [];
      perk.tasks = data.Tasks || [];
      return perk;
    }
    
    private _getToken(){
      return this.$localStorage.token;
    }
    
    private _preparatePerks(data:any):Perk{
      return data.Perk;
    }
    
    private _preparatePerk(data:any):Perk{
      return this.buildPerk(data.Perk);
    }
    
    
  }
  
  angular
    .module('app')
    .service('perkService', perkService);
  
}