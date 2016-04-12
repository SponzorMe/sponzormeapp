/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class SponsorshipsTabsCtrl{
  
  $inject = [
    '$rootScope',
    'userAuthService',
  ];
  userAuth:userModule.User;
  count_events:number = 0;
  count_past_events:number = 0;
  
  constructor(
    private $rootScope: angular.IRootScopeService,
    private userAuthService: userAuthModule.IUserAuthService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
      
    this.count_events = this.userAuth.sponzorships_like_organizer.filter( this._filterByDateIsAfter ).length;
    this.count_past_events = this.userAuth.sponzorships_like_organizer.length - this.count_events;
    this._registerListenerCounts();
  }
  
  private _registerListenerCounts(){
    this.$rootScope.$on('SponsorshipsTabsController:count_sponsors', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.count_events = this.userAuth.sponzorships_like_organizer.length;
      this.count_past_events = this.userAuth.sponzorships_like_organizer.length - this.count_events;
    }); 
  }
  
  private _filterByDateIsAfter( item ){
    var today = moment( new Date() ).subtract(1, 'days');
    return moment(item.event.ends).isAfter( today );
  }
}
angular
  .module('app.sponsors-organizer')
  .controller('SponsorshipsTabsCtrl', SponsorshipsTabsCtrl);