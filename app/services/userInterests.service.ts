/// <reference path="../../typings/main.d.ts" />
/**
* @Servicio de Interes del usuario
*
* @author Nicolas Molina
* @version 0.1
*/
module userInterestModule{
  
   export interface IUserAuthService{
    createUserInterest(data:any):angular.IPromise<any>;
    bulkUserInterest(userId:string, data:any):angular.IPromise<any>;
  }
  
  export class userInterestService implements IUserAuthService{
    
    $inject = [
      '$http',
      '$localStorage',
      'BackendVariables',
      '$q',
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
    
    createUserInterest( data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'POST',
        url: `${this.path}user_interests`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparateUserInterest(response.data) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    bulkUserInterest( userId:string, data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'PUT',
        url: `${this.path}user_interests/${userId}`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( response.data ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    private _preparateUserInterest(data:any){
      return data.UserInterest;
    }
  
    private _getToken(){
      return this.$localStorage.token;
    }
  }
  
  angular
    .module('app')
    .service('userInterestService', userInterestService);
    
}