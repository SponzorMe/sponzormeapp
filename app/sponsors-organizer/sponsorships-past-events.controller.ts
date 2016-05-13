/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class SponsorshipsPastEventsCtrl{
  
  $inject = [
    '$scope',
    '$rootScope',
    '$ionicScrollDelegate',
    'userService',
    'userAuthService',
    'ionicMaterialInk'
  ];
  sponsorships:any[] = [];
  userAuth:userModule.User;
  showEmptyState: boolean = false;
  
  constructor(
    private $scope: angular.IScope,
    private $rootScope: angular.IRootScopeService,
    private $ionicScrollDelegate: ionic.navigation.IonicHistoryService,
    private userService: userModule.IUserService,
    private userAuthService: userAuthModule.IUserAuthService,
    private ionicMaterialInk
  ){
    this.ionicMaterialInk.displayEffect();
    
    this.userAuth = this.userAuthService.getUserAuth();
    this.sponsorships = this.userAuth.sponzorships_like_organizer.filter( this._filterByDateIsBefore );
    this.showEmptyState = this.sponsorships.length == 0 ? true : false;
    
    this._registerListenerSponzorships();
  }
  
  doRefresh(){
    this.userService.home( this.userAuth.id )
    .then( user => {
      this.$scope.$broadcast('scroll.refreshComplete');
      this.userAuth = this.userAuthService.updateUserAuth( user );
      this.sponsorships = this.userAuth.sponzorships_like_organizer.filter( this._filterByDateIsBefore );
      this.showEmptyState = this.sponsorships.length == 0 ? true : false;
    })
    .catch( error => {
      this.showEmptyState = true;
    });
  }
  
  private _registerListenerSponzorships(){
    this.$rootScope.$on('SponsorshipsPastEventsCtrl:getSponzorships', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.sponsorships = this.userAuth.sponzorships_like_organizer.filter( this._filterByDateIsBefore );
      this.showEmptyState = this.sponsorships.length == 0 ? true : false;
    });
  }
  
  private _filterByDateIsBefore( item ){
    let today = moment( new Date() ).subtract(1, 'days');
    return moment(item.event.ends).isBefore( today );
  }
  
}
angular
  .module('app.sponsors-organizer')
  .controller('SponsorshipsPastEventsCtrl', SponsorshipsPastEventsCtrl);