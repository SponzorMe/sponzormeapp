/// <reference path="../../typings/tsd.d.ts" />
/**
* categoryService
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
module categoryModule{
  
  export interface ICategoryService{
    allCategories():angular.IPromise<any>;
    getCategory(id:string):angular.IPromise<any>;
  }
  
  export interface Category{
    id:string;
    title:string;
    body:string;
    lang:string;
    interests: Interests[];
  }
  
  export interface Interests{
    id:string;
    category_id:string;
    description:string;
    id_interest:string;
    lang:string;
    name:string;
  }
  
  export class categoryService implements ICategoryService{
    
    $inject = [
      '$http',
      '$localStorage',
      'BackendVariables',
      '$q',
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
   
    allCategories():angular.IPromise<any>{
      return this.$http({
        method: 'GET',
        url: `${this.path}categories`
      })
      .then( response => { return this.$q.when( this._preparateCategories( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    getCategory( categoryId:string ):angular.IPromise<any>{

      return this.$http({
        method: 'GET',
        url: `${this.path}categories/${categoryId}`
      })
      .then( response => { return this.$q.when( this._preparateCategory( response.data ) ); } )
      .catch( response => { return this.$q.reject( response.data ); } );
    }
    
    private _getToken(){
      return this.$localStorage.token;
    }
    
    private _preparateCategories( data ):Category[]{
      return data.categories;
    }
    
    private _preparateCategory( data ):Category{
      return data.data.category;
    }
    
  }
  
  angular
    .module('app')
    .service('categoryService', categoryService);
  
}