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
    'sponsorshipService'
  ];
  sponsorships:any[] = [];
  userAuth:userModule.User;
  showEmptyState: boolean = false
  
  constructor(
    private $scope: angular.IScope,
    private $rootScope: angular.IRootScopeService,
    private $ionicScrollDelegate: ionic.navigation.IonicHistoryService,
    private userAuthService: userAuthModule.IUserAuthService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
    this.sponsorships = this.userAuth.sponzorships_like_organizer.filter( this._filterByDateIsBefore );
    this.showEmptyState = this.sponsorships.length == 0 ? true : false;
    
    this._registerListenerSponzorships();
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