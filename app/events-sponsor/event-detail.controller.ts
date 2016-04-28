/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class EventDetailSponsorCtrl{
 
  $inject = [
    '$scope',
    '$stateParams',
    '$rootScope',
    '$translate',
    '$ionicModal',
    '$ionicHistory',
    '$cordovaToast',
    'eventService',
    'utilsService',
    'sponsorshipService',
    'notificationService',
    'userAuthService'
  ];
  event:eventModule.Event;
  userAuth:userModule.User;
  modalSponsorIt:ionic.modal.IonicModalController = null;
  newSponsorIt:any = {};
  
  constructor(
    private $scope: angular.IScope,
    private $stateParams,
    private $rootScope: angular.IRootScopeService,
    private $translate,
    private $ionicModal: ionic.modal.IonicModalService,
    private $ionicHistory: ionic.navigation.IonicHistoryService,
    private $cordovaToast,
    private eventService: eventModule.IEventService,
    private utilsService: utilsServiceModule.IUtilsService,
    private sponsorshipService: sponsorshipModule.ISponsorshipService,
    private notificationService: notificationModule.INotificationService,
    private userAuthService: userAuthModule.IUserAuthService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
    
    this.event = _.findWhere(this.userAuth.events, {id: $stateParams.id});
    this.event.perks.forEach( this._preparatePerks, this );

    this._loadModalSponsorIt();
  }
  
  private _preparatePerks( perk ){
    perk.sponzorship = _.where(this.userAuth.sponzorships, {perk_id: perk.id});
    perk.already = _.findWhere(perk.sponzorship , {sponzor_id: this.userAuth.id});
    perk.tasks = _.where(perk.tasks, {type: "0"});
  }
  
  private _loadModalSponsorIt(){
    this.$ionicModal.fromTemplateUrl('templates/events-sponsor/sponsor-it-modal.html', {
      scope: this.$scope,
      animation: 'slide-in-up'
    }).then(modal => {
      this.modalSponsorIt = modal;
    });
  }
  
  openModalSponsorIt(){
    this.modalSponsorIt.show();
  }

  closeModalSponsorIt(){
    this.modalSponsorIt.hide();
    this.newSponsorIt = {};
  } 

  createSponsorIt( perk ){
    this.newSponsorIt.perk = perk;
    this.openModalSponsorIt();
  } 

  submitSponsorIt(){
    this.sponsorshipService.createSponzorship( this._preparateDataSponzorship() )
    .then( newSponsorship => {
      this.closeModalSponsorIt();
      
      this.userAuth.sponzorships.push( newSponsorship );
      this.event.perks.forEach( this._preparatePerks, this );
      this.userAuthService.updateUserAuth( this.userAuth );
      
      this.$rootScope.$broadcast('MenuSponsorCtrl:counts');
      this.$rootScope.$broadcast('FollowEventsCtrl:getSponzorships');
      
      var notification = {
        text: this.event.title,
        link: '#/organizers/sponzors',
        modelId: newSponsorship.id,
      };
      this.notificationService.sendNewSponsorship(notification, this.event.user_organizer.id, this.event.user_organizer.ionic_id);
      
      this.$cordovaToast.showShortBottom(this.$translate.instant("MESSAGES.succ_sponsor_it"));
    })
    .catch( error => {
      this.closeModalSponsorIt();
    });
  }
  
  private _preparateDataSponzorship(){
    return {
      sponzor_id: this.userAuth.id,
      perk_id: this.newSponsorIt.perk.id,
      event_id: this.event.id,
      organizer_id: this.event.user_organizer.id,
      status: 0,
      cause: this.newSponsorIt.cause
    }
  }
  
}
angular
  .module('app.events-sponzor')
  .controller('EventDetailSponsorCtrl', EventDetailSponsorCtrl);