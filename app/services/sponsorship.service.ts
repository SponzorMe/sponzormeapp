/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="event.service.ts" />
/**
* @Servicio de Sponzorships (Beneficios)
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
module sponsorshipModule{
  
  export interface ISponsorshipService{
    allSponsorships():angular.IPromise<any>;
    getSponzorship(sponsorshipId:string):angular.IPromise<any>;
    createSponzorship(data:any):angular.IPromise<any>;
    deleteSponzorship(sponsorshipId:string):angular.IPromise<any>;
    editSponzorshipPatch(sponsorshipId:string, data:any):angular.IPromise<any>;
    editSponzorshipPut(sponsorshipId:string, data:any):angular.IPromise<any>;
    buildSponsorship(data:any):Sponsorship;
  }
  
  export interface Sponsor{
    id:string;
    image:string;
  }
  
  export interface Sponsorship{
    id:string;
    sponzor:Sponsor;
    perk:any;
    organizer:any;
    event:eventModule.Event;
    tasks:any[];
  }
  
  export class sponsorshipService implements ISponsorshipService{

    $inject = [
      '$http',
      '$localStorage',
      '$q',
      'eventService',
      'BackendVariables'
    ];
    path:string;
    
    constructor(
      private $http:angular.IHttpService,
      private $localStorage,
      private $q:angular.IQService,
      private eventService: eventModule.IEventService,
      private BackendVariables
    ){
      this.path = this.BackendVariables.url;
    }
    
    allSponsorships():angular.IPromise<any>{
      return this.$http({
        method: 'GET',
        url: `${this.path}sponzorships`
      })
      .then( response => { return this.$q.when( this._preparateSponsorships( response.data) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    getSponzorship( sponsorshipId:string ):angular.IPromise<any>{
      return this.$http({
        method: 'GET',
        url: `${this.path}sponzorships/${sponsorshipId}`
      })
      .then( response => { return this.$q.when( this._preparateSponsorship( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    createSponzorship( data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'POST',
        url: `${this.path}sponzorships`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparateSponsorship( response.data) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    deleteSponzorship( sponsorshipId:string ):angular.IPromise<any>{
      return this.$http({
        method: 'DELETE',
        url: `${this.path}sponzorships/${sponsorshipId}`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
      })
      .then( response => { return this.$q.when( response.data ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    editSponzorshipPatch( sponsorshipId:string, data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'PATCH',
        url: `${this.path}sponzorships/${sponsorshipId}`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparateSponsorship( response.data) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    editSponzorshipPut( sponsorshipId:string, data:any ):angular.IPromise<any>{
      return this.$http({
        method: 'PUT',
        url: `${this.path}sponzorships/${sponsorshipId}`,
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Basic ${this._getToken()}`
        },
        data: data
      })
      .then( response => { return this.$q.when( this._preparateSponsorship( response.data) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    buildSponsorship(data:any):Sponsorship{
      let sponzorship:Sponsorship = data;
      sponzorship.sponzor = data.Sponzor || {};
      sponzorship.perk = data.Perk || {};
      sponzorship.organizer = data.Organizer || {};
      sponzorship.event = sponzorship.event ? sponzorship.event : data.Event || {};
      sponzorship.tasks = data.Tasks || [];
      if(sponzorship.sponzor.image){
        sponzorship.sponzor.image = (sponzorship.sponzor.image == "") ? 'img/photo.png' : sponzorship.sponzor.image;
      }
      sponzorship.event = this.eventService.buildEvent( sponzorship.event );
      return sponzorship;
    }
    
    private _getToken(){
      return this.$localStorage.token;
    }
    
    private _preparateSponsorships( data ):Sponsorship[]{
      return data.SponzorsEvents;
    }
    
    private _preparateSponsorship( data ):Sponsorship{
      return this.buildSponsorship(data.Sponzorship);
    }
  }
  
  angular
    .module('app')
    .service('sponsorshipService', sponsorshipService);
  
}