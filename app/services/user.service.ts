/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="event.service.ts" />
/// <reference path="sponsorship.service.ts" />
/**
* @Servicio de Usuarios
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
module userModule{
  
  export interface IUserService{
    buildUser(data:any):User;
    login(email:string, password:string):angular.IPromise<any>;
    home(userId:string):angular.IPromise<any>;
    createUser(user:any):angular.IPromise<any>;
    deleteUser(userId:string):angular.IPromise<any>;
    editUserPatch(userId:string, user:any):angular.IPromise<any>;
    editUserPut(userId:string, user:any):angular.IPromise<any>;
    forgotPassword(email:string):angular.IPromise<any>;
    invitedUser(data:any):angular.IPromise<any>;
  }
  
  export interface User{
    id:string;
    type:string;
    email:string;
    age: number;
    name: string;
    comunity_size: number;
    events:eventModule.Event[];
    sponzorships?:sponsorshipModule.Sponsorship[];
    sponzorships_like_organizer?:sponsorshipModule.Sponsorship[];
    location:any;
    lang: string;
    sex: number;
    image?: string;
  }
  
  export class userService implements IUserService{
    
    $inject = [
      '$http',
      '$localStorage',
      'BackendVariables',
      '$q',
      'eventService',
      'sponsorshipService'
    ];
    path:string;
    
    constructor(
      private $http: angular.IHttpService,
      private $localStorage,
      private BackendVariables,
      private $q: angular.IQService,
      private eventService: eventModule.IEventService,
      private sponsorshipService: sponsorshipModule.ISponsorshipService
    ){
      this.path = BackendVariables.url;
    }
    
    buildUser( data:any ):User{
      let user:User = data.user;
      user.age = parseInt(data.user.age || 0);
      user.comunity_size = parseInt(data.user.comunity_size || 0);
      if(user.type == "0"){ // Is an Organizer
        user.events.forEach( this.eventService.buildEvent, this.eventService);
        user.sponzorships_like_organizer.forEach( this.sponsorshipService.buildSponsorship, this.sponsorshipService);
      }else{ 
        user.sponzorships.forEach(this.sponsorshipService.buildSponsorship, this.sponsorshipService);
        data.events.forEach( this.eventService.buildEvent, this.eventService );
        user.events = data.events;
      }
      return user;
    }
    
    
    login( email:string, password:string):angular.IPromise<any>{
      return this.$http({
        method: 'POST',
        url: `${this.path}auth`,
        headers: { 
          'Content-Type' : 'application/json'
        },
        data: {
          email: email,
          password: password
        }
      })
      .then( response => { return this.$q.when( this.buildUser( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    home( userId:string ):angular.IPromise<any>{
      return this.$http({
        method: 'GET',
        url: `${this.path}home/${userId}`,
        headers: { 
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
      })
      .then( response => { return this.$q.when( this._preparateUser( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    createUser( data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'POST',
        url: `${this.path}users`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._getUser(response.data) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    deleteUser( userId:string ):angular.IPromise<any>{
      return this.$http({
        method: 'DELETE',
        url: `${this.path}users/${userId}`,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : `Basic ${this._getToken()}`
        },
      })
      .then( response => { return this.$q.when( response.data ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    editUserPatch( userId:string, data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'PATCH',
        url: `${this.path}users/${userId}`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._getUser(response.data) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
     
    editUserPut( userId:string, data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'PUT',
        url: `${this.path}users/${userId}`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._getUser(response.data) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    forgotPassword( email:string ):angular.IPromise<any>{
      return this.$http({
        method: 'POST',
        url: `${this.path}send_reset_password`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: {
          email: email
        }
      })
      .then( response => { return this.$q.when( response.data ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    invitedUser( data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'POST',
        url: `${this.path}invite_friend`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( response.data ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    private _getUser(data:any){
      return data.User;
    }
    
    private _preparateUser(data:any):User{
      return this.buildUser( data.data );
    }
    
    private _getToken():string{
      return this.$localStorage.token;
    }
    
    
    
  }
  
  
  angular
    .module('app')
    .service('userService', userService);
  
}