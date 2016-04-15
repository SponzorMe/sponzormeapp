/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Detail Sponsorship
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class SponsorshipOrganizerDetailCtrl{
  
  $inject = [
    '$stateParams',
    'sponsorshipService',
    'utilsService',
    'userAuthService',
    'notificationService'
  ];
  
  sponsorship:any = {};
  userAuth: userModule.User;
  showEmptyState: boolean = false;
  
  constructor(
    private $stateParams,
    private sponsorshipService: sponsorshipModule.ISponsorshipService,
    private utilsService: utilsServiceModule.IUtilsService,
    private userAuthService: userAuthModule.IUserAuthService,
    private notificationService: notificationModule.INotificationService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
    
    this.sponsorship = _.findWhere(this.userAuth.sponzorships_like_organizer, {id: this.$stateParams.id});
    this.sponsorship.task_sponzor = this.sponsorship.task_sponzor.filter( item => item.task.user_id != this.userAuth.id );
  }
  
  sponsorAccept(){
    this.utilsService.confirm({
      title: 'Are you sure?', 
      template: '<p class="text-center">In accept the sponsor</p>'
    })
    .then( rta => {
      if( rta ) this._updateSponsorship( 1 ); //Accepted 
    });
  }

  sponsorReject(){
    this.utilsService.confirm({
      title: 'Are you sure?', 
      template: '<p class="text-center">In reject the sponsor</p>'
    })
    .then( rta => {
      if( rta ) this._updateSponsorship( 2 ); //Deny
    });
  }

  private _updateSponsorship( status ){
    this.utilsService.showLoad();
    let sponsorship = angular.copy( this.sponsorship );
    sponsorship.status = status;
    this.sponsorshipService.editSponzorshipPut( sponsorship.id, sponsorship )
    .then( sponsorship => {
      this.utilsService.hideLoad();
      let notification = {
        text: this.sponsorship.event.title,
        link: '#/sponzors/sponzoring',
        modelId: this.sponsorship.id
      };
      this.sponsorship.status = sponsorship.status;
      
      if( this.sponsorship.status == 1){ //Accepted 
        this.notificationService.sendAcceptSponsorship(notification, this.sponsorship.sponzor_id);
      }else if( this.sponsorship.status == 2){//Deny
        this.notificationService.sendRejectSponsorship(notification, this.sponsorship.sponzor_id);
      }
    })
    .catch( error => {
      this.utilsService.hideLoad();
    });
  }
  
}
angular
  .module('app.sponsors-organizer')
  .controller('SponsorshipOrganizerDetailCtrl', SponsorshipOrganizerDetailCtrl);