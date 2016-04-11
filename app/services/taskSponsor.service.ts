/// <reference path="../../typings/tsd.d.ts" />
/**
* @Servive for tasks of sponsor
*
* @author Nicolas Molina
* @version 0.1
*/
module taskSponsorModule{
  
  export interface ITasksSponsor{
    getAllTasks():angular.IPromise<any>;
    getTask(taskId:string):angular.IPromise<any>;
    createTask(data:any):angular.IPromise<any>;
    editPutTask(taskId:string, data:any):angular.IPromise<any>;
    editPatchTask(taskId:string, data:any):angular.IPromise<any>;
    deleteTask(taskId:string):angular.IPromise<any>;
    //buildTaskSponsor(data:any):TaskSponsor;
  }
  
  export interface TaskSponsor{
    id:string;
  }
  
  export class taskSponsorService implements ITasksSponsor{
    
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
      this.path = this.BackendVariables.url;
    }
    
    getAllTasks():angular.IPromise<any>{
      return this.$http({
        method: 'GET',
        url: `${this.path}task_sponzor`,
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then( response => { return this.$q.when( this._preparateTasksSponsor( response.data) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    getTask( taskId:string ):angular.IPromise<any>{
      return this.$http({
        method: 'GET',
        url: `${this.path}task_sponzor/${taskId}`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        }
      })
      .then( response => { return this.$q.when( this._preparateTaskSponsor( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    createTask( data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'POST',
        url: `${this.path}task_sponzor`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( response.data ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    editPutTask( taskId:string, data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'PUT',
        url: `${this.path}task_sponzor/${taskId}`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparateTaskSponsor( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    editPatchTask( taskId:string, data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'PATCH',
        url: `${this.path}task_sponzor/${taskId}`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparateTaskSponsor( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    deleteTask( taskId:string ):angular.IPromise<any>{
      return this.$http({
        method: 'DELETE',
        url: `${this.path}task_sponzor/${taskId}`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        }
      })
      .then( response => { return this.$q.when( response.data ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    private _preparateTasksSponsor(data:any):TaskSponsor[]{
      return data.TasksSponzor;
    }
    
    private _preparateTaskSponsor(data:any):TaskSponsor{
      let taskSponsor = data.TaskSponzor ? data.TaskSponzor: data.data;
      taskSponsor.task = data.PerkTask;
      return taskSponsor;
    }
    
    private _getToken(){
      return this.$localStorage.token;
    }
    
  }
  
  angular
    .module('app')
    .service('taskSponsorService', taskSponsorService);
  
}