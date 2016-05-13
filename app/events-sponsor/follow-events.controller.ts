/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class FollowEventsCtrl{
  
  $inject = [
    '$scope',
    '$rootScope',
    'utilsService',
    'userService',
    'userAuthService',
    'ionicMaterialInk'
  ];
  userAuth:userModule.User;
  sponzorships:any[] = [];
  showEmptyState:boolean = false;
  
  constructor(
    private $scope: angular.IScope,
    private $rootScope: angular.IRootScopeService,
    private utilsService: utilsServiceModule.IUtilsService,
    private userService: userModule.IUserService,
    private userAuthService: userAuthModule.IUserAuthService,
    private ionicMaterialInk
  ){
    
    this.ionicMaterialInk.displayEffect();
    
    this.userAuth = this.userAuthService.getUserAuth();
    this.sponzorships = this.userAuth.sponzorships.filter( this._filterByDateAndByPending );
    this.showEmptyState = this.sponzorships.length == 0 ? true : false;
    
    this._registerListenerSponzorships();
  }
  
  doRefresh(){
    this.userService.home( this.userAuth.id )
    .then( user => {
      this.$scope.$broadcast('scroll.refreshComplete');
      this.userAuth = this.userAuthService.updateUserAuth( user );
      this.sponzorships = this.userAuth.sponzorships.filter( this._filterByDateAndByPending );
      this.showEmptyState = this.sponzorships.length == 0 ? true : false;
    })
    .catch( error => {
      this.$scope.$broadcast('scroll.refreshComplete');
    });
  }
  
  private _registerListenerSponzorships(){
    this.$rootScope.$on('FollowEventsController:getSponzorships', ()=>{
      this.userAuth = this.userAuthService.getUserAuth();
      this.sponzorships = this.userAuth.sponzorships.filter( this._filterByDateAndByPending );
      this.showEmptyState = this.sponzorships.length == 0 ? true : false;
    });
  }
  
  private _filterByDateAndByPending( item ){
    return item.status != '1' && moment(item.event.starts).isAfter( new Date() );
  }
  
}
angular
  .module('app.events-sponzor')
  .controller('FollowEventsCtrl', FollowEventsCtrl);