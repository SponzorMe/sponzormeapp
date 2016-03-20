/// <reference path="../../typings/main.d.ts" />
/**
* @Service de eventType
*
* @author Nicolas Molina
* @version 0.2
*/
module eventTypeService{
  
  export interface IEventTypeService{
    allEventTypes():angular.IPromise<any>;
    getEventType(id:string):angular.IPromise<any>;
  }
  
  export interface EventType{
    id: string;
    description: string;
    lang: string;
    name: string;
  }
  
  export class eventTypeService implements IEventTypeService{
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
      private $q: angular.IQService,
      private BackendVariables
    ){
      this.path = this.BackendVariables.url;
    }
    
    allEventTypes():angular.IPromise<any> {
      return this.$http({
        method: 'GET',
        url: this.path + 'event_types'
      })
      .then( response => { return this.$q.when( this._preparateEventsTypes( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    getEventType( eventTypeId:string ):angular.IPromise<any>{
      return this.$http({
        method: 'GET',
        url: this.path + 'event_types/' + eventTypeId
      })
      .then( response => { return this.$q.when( this._preparateEventType( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    private _getToken(){
      return this.$localStorage.token;
    }
    
    private _preparateEventsTypes( data ):EventType[]{
      return data.eventTypes;
    }
    
    private _preparateEventType( data ):EventType{
      return data.data.eventTypes;
    }
  }
  
  angular
    .module('app')
    .service('eventTypeService', eventTypeService);
}