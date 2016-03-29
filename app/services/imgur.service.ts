/// <reference path="../../typings/tsd.d.ts" />
/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
module imgurModule{
  
  export interface IImgurService{
    uploadImage(image:string):angular.IPromise<any>;
  }
  
  export class imgurService implements IImgurService{
    $inject = [
      '$http',
      '$q'
    ];
    private path:string;
    private clientId:string;
    
    constructor(
      private $http: angular.IHttpService,
      private $q: angular.IQService
    ){
      this.path = 'https://api.imgur.com/3/';
      this.clientId = "bdff09d775f47b9";
    }
    
    uploadImage( image:string ):angular.IPromise<any> {
      return this.$http({
        method: 'POST',
        url: `${this.path}image`,
        headers: {
          'Authorization' : `Client-ID ${this.clientId}`
        },
        data: {
          image: image,
          type: 'base64'
        },
      })
      .then( response => { return this.$q.when( this._preparateImage( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    private _preparateImage( data ):string{
      return data.data.link;
    }
  }
  
  angular
    .module('app')
    .service('imgurService', imgurService);
}