/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class SponsorshipsListCtrl{
  
  $inject = [
    '$scope',
    '$rootScope',
    '$ionicScrollDelegate',
    'sponsorshipService',
    'userService',
    'utilsService',
    'notificationService',
    'userAuthService',
    'ionicMaterialInk'
  ];
  sponsorships:any[] = [];
  userAuth:userModule.User;
  showEmptyState: boolean = false
  
  constructor(
    private $scope: angular.IScope,
    private $rootScope,
    private $ionicScrollDelegate: ionic.scroll.IonicScrollDelegate,
    private sponsorshipService: sponsorshipModule.ISponsorshipService,
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService,
    private notificationService: notificationModule.INotificationService,
    private userAuthService: userAuthModule.IUserAuthService,
    private ionicMaterialInk
  ){
    if(ionic.Platform.isAndroid()){
      this.ionicMaterialInk.displayEffect();
    }
    
    this.userAuth = this.userAuthService.getUserAuth();
    this.sponsorships = this.userAuth.sponzorships_like_organizer.filter( this._filterByDateIsAfter );
    this.showEmptyState = this.sponsorships.length == 0 ? true : false;
    
    this._registerListenerSponzorships();
  }
  
  sponsorAccept( sponzor ){
    this.utilsService.confirm({
      title: 'Are you sure?', 
      template: '<p class="text-center">In the accept the sponsor</p>'
    })
    .then( rta => {
      if( rta ) this._updateSponsorship( sponzor, 1 ); //Accepted 
    });
  }

  sponsorReject( sponzor ){
    this.utilsService.confirm({
      title: 'Are you sure?', 
      template: '<p class="text-center">In the reject the sponsor</p>'
    })
    .then( rta => {
      if( rta ) this._updateSponsorship( sponzor, 2 ); //Deny
    });
  }
  
  doRefresh(){
    this.userService.home( this.userAuth.id )
    .then( user => {
      this.$scope.$broadcast('scroll.refreshComplete');
      this.userAuth = this.userAuthService.updateUserAuth( user );
      this.sponsorships = this.userAuth.sponzorships_like_organizer.filter( this._filterByDateIsAfter );
      this.showEmptyState = this.sponsorships.length == 0 ? true : false;
    })
    .catch( error => {
      this.showEmptyState = true;
    });
  }

  private _updateSponsorship( sponzor, status ){
    this.utilsService.showLoad();
    let sponzorCopy = angular.copy( sponzor );
    sponzorCopy.status = status;
    this.sponsorshipService.editSponzorshipPut( sponzorCopy.id, sponzorCopy )
    .then( sponsorship => {
      this.utilsService.hideLoad();
      sponzor.status = sponsorship.status;
      
      let notification = {
        text: sponzor.event.title,
        link: '#/sponzors/sponzoring',
        modelId: sponsorship.id
      };
      
      this.$rootScope.$broadcast('SponsorshipsListCtrl:getSponzorships');
      this.$rootScope.$broadcast('SponsorshipsPastEventsCtrl:getSponzorships');
      this.$rootScope.$broadcast('SponsorshipsTabsCtrl:count_sponsors');
      
      if(sponzor.status == 1){ //Accepted 
        this.notificationService.sendAcceptSponsorship(notification, sponsorship.sponzor_id, sponsorship.sponzor_ionic_id);
      }else if(sponzor.status == 2){//Deny
        this.notificationService.sendRejectSponsorship(notification, sponsorship.sponzor_id, sponsorship.sponzor_ionic_id);
      }
    })
    .catch( error => {
      this.utilsService.hideLoad();
    });
  }
  
  private _registerListenerSponzorships(){
    this.$rootScope.$on('SponsorshipsListCtrl:getSponzorships', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.sponsorships = this.userAuth.sponzorships_like_organizer.filter( this._filterByDateIsAfter );;
      this.showEmptyState = this.sponsorships.length == 0 ? true : false;
    });
  }
  
  private _filterByDateIsAfter( item ){
    let today = moment( new Date() ).subtract(1, 'days');
    return moment(item.event.ends).isAfter( today );
  }
  
}
angular
  .module('app.sponsors-organizer')
  .controller('SponsorshipsListCtrl', SponsorshipsListCtrl)