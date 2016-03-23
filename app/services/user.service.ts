/// <reference path="../../typings/main.d.ts" />
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
    comunity_size: number;
    events:eventModule.Event[];
    sponzorships?:sponsorshipModule.Sponsorship[];
    sponzorships_like_organizer?:sponsorshipModule.Sponsorship[];
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
    
    
    login( email:string, password:string):angular.IPromise<any>{
      return this.$http({
        method: 'POST',
        url: this.path + 'auth',
        headers: { 
          'Content-Type' : 'application/json'
        },
        data: {
          email: email,
          password: password
        }
      })
      .then( response => { return this.$q.when( this._buildUser( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    home( userId:string ):angular.IPromise<any>{
      return this.$http({
        method: 'GET',
        url: this.path + 'home/' + userId,
        headers: { 
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ this._getToken()
        },
      })
      .then( response => { return this.$q.when( this._preparateUser( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    createUser( data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'POST',
        url: this.path + 'users',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ this._getToken()
        },
        data: data
      })
      .then( response => { return this.$q.when( this._getUser(response.data) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    deleteUser( userId:string ):angular.IPromise<any>{
      return this.$http({
        method: 'DELETE',
        url: this.path + 'users/' + userId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ this._getToken()
        },
      })
      .then( response => { return this.$q.when( response.data ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    editUserPatch( userId:string, data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'PATCH',
        url: this.path + 'users/' + userId,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ this._getToken()
        },
        data: data
      })
      .then( response => { return this.$q.when( this._getUser(response.data) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
     
    editUserPut( userId:string, data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'PUT',
        url: this.path + 'users/' + userId,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ this._getToken()
        },
        data: data
      })
      .then( response => { return this.$q.when( this._getUser(response.data) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    forgotPassword( email:string ):angular.IPromise<any>{
      return this.$http({
        method: 'POST',
        url: this.path + 'send_reset_password',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ this._getToken()
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
        url: this.path + 'invite_friend',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Basic '+ this._getToken()
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
      return this._buildUser( data.data.user );
    }
    
    private _getToken():string{
      return this.$localStorage.token;
    }
    
    private _buildUser( data:any ):User{
      let user:User = data.user;
      if(user.type == "1"){ // Is a Sponzor
        user.sponzorships.forEach(this.sponsorshipService.buildSponsorship, this.sponsorshipService);
        user.events = data.events.forEach( this.eventService.buildEvent, this.eventService);
      }else{ // Is an Organizer
        user.sponzorships_like_organizer = user.sponzorships_like_organizer.map( this.sponsorshipService.buildSponsorship );
        user.events.forEach( this.eventService.buildEvent, this.eventService);
      }
      return user;
    }
    
    private _preparateEvents(){
      return true;
    }
  }
  
  
  angular
    .module('app')
    .service('userService', userService);
  
}