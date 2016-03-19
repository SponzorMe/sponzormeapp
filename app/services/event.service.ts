/// <reference path="../../typings/main.d.ts" />
/**
* @Servicio de Eventos
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
module eventService{
  
  export interface IEventService{
    allEvents():angular.IPromise<any>;
    getEvent(id:string):angular.IPromise<any>;
    createEvent(event: Event):angular.IPromise<any>;
    deleteEvent(id:string):angular.IPromise<any>;
    editEventPatch(id:string, event: Event):angular.IPromise<any>;
    editEventPut(id:string, event: Event):angular.IPromise<any>;
  }
  
  export interface Event{
    id: string;
    title: string;
    location: string;
    ends: any;
    starts: any;
    image: string,
    user_organizer: any,
    category: any,
    type: any,
    perks: any[]
    sponzor_tasks: any[],
    sponzorship:any []
  }
  
  export class eventService implements IEventService{
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
    
    allEvents(){
      return this.$http({
        method: 'GET',
        url: this.path + 'events'
      })
      .then( response => { return this.$q.when( this._preparateEvents( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    getEvent( eventId ){
      return this.$http({
        method: 'GET',
        url: this.path + 'events/' + eventId
      })
      .then( response => { return this.$q.when( this._preparateEvent( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    createEvent( data ){
      return this.$http({
        method: 'POST',
        url: this.path + 'events',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ this._getToken()
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparateEvent( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    deleteEvent( eventId ){
      return this.$http({
        method: 'DELETE',
        url: this.path + 'events/' + eventId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ this._getToken()
        },
      })
      .then( response => { return this.$q.when( response.data ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    editEventPatch( eventId, data ){
      return this.$http({
        method: 'PATCH',
        url: this.path + 'events/' + eventId,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ this._getToken()
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparateEvent( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    editEventPut( eventId, data ){
      return this.$http({
        method: 'PUT',
        url: this.path + 'events/' + eventId,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ this._getToken()
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparateEvent( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    private _getToken(){
      return this.$localStorage.token;
    }
    
    private _preparateEvents( data ):Event[]{
      return data.data.events.map( this._buildEvent );
    }
    
    private _preparateEvent( data ):Event{
      return this._buildEvent( data.event );
    }
    
    private _buildEvent(event):Event{
      event.image = (event.image == "event_dummy.png") ? 'img/banner.jpg' : event.image;
      event.user_organizer.image = (event.user_organizer.image == "organizer_sponzorme.png"  || event.user_organizer.image == "" ) ? 'img/photo.png' : event.user_organizer.image;
      event.starts = moment(event.starts).toDate();
      event.ends = moment(event.ends).toDate();
      return event;
    }
  }
  
  angular
    .module('app')
    .service('eventService', eventService);
  
}