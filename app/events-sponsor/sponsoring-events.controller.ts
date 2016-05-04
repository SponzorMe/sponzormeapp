/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class SponsoringEventsCtrl{
  
  $inject = [
    '$scope',
    '$rootScope',
    'userService',
    'utilsService',
    'userAuthService'
  ];
  userAuth:userModule.User;
  sponzorships:any[] = [];
  showEmptyState:boolean = false;
  
  constructor(
    private $scope: angular.IScope,
    private $rootScope: angular.IRootScopeService,
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService,
    private userAuthService: userAuthModule.IUserAuthService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
    this.sponzorships = this.userAuth.sponzorships.filter( this._filterByAccepted );
    this.showEmptyState = this.sponzorships.length == 0 ? true : false;
    
    this._registerListenerSponzorships();
  }
  
  doRefresh(){
    this.userService.home( this.userAuth.id )
    .then( user => {
      this.$scope.$broadcast('scroll.refreshComplete');
      this.userAuth = this.userAuthService.updateUserAuth( user );
      this.sponzorships = this.userAuth.sponzorships.filter( this._filterByAccepted );
      this.showEmptyState = this.sponzorships.length == 0 ? true : false;
    })
    .catch( error => {
      this.$scope.$broadcast('scroll.refreshComplete');
    });
  }
  
  private _registerListenerSponzorships(){
    this.$rootScope.$on('SponsoringEventsCtrl:getSponzorships', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.sponzorships = this.userAuth.sponzorships.filter( this._filterByAccepted );
      this.showEmptyState = this.sponzorships.length == 0 ? true : false;
    });
  }
  
  private _filterByAccepted( item ){
    return item.status == '1';
  }
  
}
angular
  .module('app.events-sponzor')
  .controller('SponsoringEventsCtrl', SponsoringEventsCtrl);