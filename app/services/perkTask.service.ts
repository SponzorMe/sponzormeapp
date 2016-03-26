/// <reference path="../../typings/main.d.ts" />
/**
* @Servicio de PerkTask
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
module perkTaskModule{
  
  export interface IPerkTaskService{
    allPerkTasks():angular.IPromise<any>;
    getPerkTask(perkTaskId:string):angular.IPromise<any>;
    createPerkTask(data:any):angular.IPromise<any>;
    deletePerkTask(perkTaskId:string):angular.IPromise<any>;
    editPerkTaskPatch(perkTaskId:string, data:any):angular.IPromise<any>;
    editPerkTaskPut(perkTaskId:string, data:any):angular.IPromise<any>;
    getPerkTaskByOrganizer(userId:string):angular.IPromise<any>;
  }
  
  export interface PerkTask{
    id: string;
    perk_id: string;
    status: string;
    title: string;
    type: string;
    user_id: string,
    description: string;
    event: any;
    perk: any;
    user: any;
  }
  
  export class perkTaskService implements IPerkTaskService{
    
    $inject = [
      '$http',
      '$localStorage',
      'BackendVariables',
      '$q'
    ];
    path: string;
    
    constructor(
      private $http: angular.IHttpService,
      private $localStorage,
      private BackendVariables,
      private $q: angular.IQService
    ){
      this.path = BackendVariables.url;
    }
    
    allPerkTasks():angular.IPromise<any>{
      return this.$http({
        method: 'GET',
        url: `${this.path}perk_tasks`,
      })
      .then( response => { return this.$q.when( this._preparatePerkTasks( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    getPerkTask( perkTaskId:string ):angular.IPromise<any>{
      return this.$http({
        method: 'GET',
        url: `${this.path}perk_tasks/${perkTaskId}`,
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then( response => { return this.$q.when( this._preparatePerkTask( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );      
    }
    
    getPerkTaskByOrganizer( userId:string ):angular.IPromise<any>{
      return this.$http({
        method: 'GET',
        url: `${this.path}perk_tasks_organizer/${userId}`,
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then( response => { return this.$q.when( this._preparatePerkTasks( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    createPerkTask( data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'POST',
        url: `${this.path}perk_tasks`,
        headers: {
          'Content-Type':'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparatePerkTaskUpdate(response.data) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    deletePerkTask( perkTaskId:string ):angular.IPromise<any>{
      return this.$http({
        method: 'DELETE',
        url: `${this.path}perk_tasks/${perkTaskId}`,
        headers: {
          'Content-Type':'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        }
      })
      .then( response => { return this.$q.when( response.data ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    editPerkTaskPatch( perkTaskId:string, data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'PATCH',
        url: `${this.path}perk_tasks/${perkTaskId}`,
        headers: {
          'Content-Type':'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data 
      })
      .then( response => { return this.$q.when( this._preparatePerkTaskUpdate( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
   editPerkTaskPut( perkTaskId:string, data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'PUT',
        url: `${this.path}perk_tasks/${perkTaskId}`,
        headers: {
          'Content-Type':'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparatePerkTaskUpdate( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    buildPerkTask(data:any):PerkTask{
      var task = data.PerkTask;
      task.event = data.Event || {};
      task.perk = data.Perk || {};
      task.user = data.User || {};
      task.status = task.status == 1 ? true : false;
      return task;
    }
    
    private _getToken(){
      return this.$localStorage.token;
    }
    
    private _preparatePerkTasks( data:any ):PerkTask[]{
      return data.PerkTasks; 
    }
    
    private _preparatePerkTask( data:any ):PerkTask{
      return this.buildPerkTask(data.data); 
    }
    
    private _preparatePerkTaskUpdate( data:any):PerkTask{
      return this.buildPerkTask(data.PerkTask); 
    }
      
  }
  
  angular
    .module('app')
    .service('perkTaskService', perkTaskService);
}