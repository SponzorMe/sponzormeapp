/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var EventDetailSponsorCtrl = (function () {
    function EventDetailSponsorCtrl($scope, $stateParams, $rootScope, $translate, $ionicModal, $ionicHistory, $cordovaToast, eventService, utilsService, sponsorshipService, notificationService, userAuthService) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$rootScope = $rootScope;
        this.$translate = $translate;
        this.$ionicModal = $ionicModal;
        this.$ionicHistory = $ionicHistory;
        this.$cordovaToast = $cordovaToast;
        this.eventService = eventService;
        this.utilsService = utilsService;
        this.sponsorshipService = sponsorshipService;
        this.notificationService = notificationService;
        this.userAuthService = userAuthService;
        this.$inject = [
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
        this.modalSponsorIt = null;
        this.newSponsorIt = {};
        this.userAuth = this.userAuthService.getUserAuth();
        this.event = _.findWhere(this.userAuth.events, { id: $stateParams.id });
        this.event.perks.forEach(this._preparatePerks, this);
        this._loadModalSponsorIt();
    }
    EventDetailSponsorCtrl.prototype._preparatePerks = function (perk) {
        perk.sponzorship = _.where(this.userAuth.sponzorship, { perk_id: perk.id });
        perk.already = _.findWhere(perk.sponzorship, { sponzor_id: this.userAuth.id });
        perk.tasks = _.where(perk.tasks, { type: "0" });
    };
    EventDetailSponsorCtrl.prototype._loadModalSponsorIt = function () {
        var _this = this;
        this.$ionicModal.fromTemplateUrl('templates/events-sponsor/sponsor-it-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            _this.modalSponsorIt = modal;
        });
    };
    EventDetailSponsorCtrl.prototype.openModalSponsorIt = function () {
        this.modalSponsorIt.show();
    };
    EventDetailSponsorCtrl.prototype.closeModalSponsorIt = function () {
        this.modalSponsorIt.hide();
        this.newSponsorIt = {};
    };
    EventDetailSponsorCtrl.prototype.createSponsorIt = function (perk) {
        this.newSponsorIt.perk = perk;
        this.openModalSponsorIt();
    };
    EventDetailSponsorCtrl.prototype.submitSponsorIt = function () {
        var _this = this;
        this.sponsorshipService.createSponzorship(this._preparateDataSponzorship())
            .then(function (newSponsorship) {
            _this.closeModalSponsorIt();
            _this.userAuth.sponzorship.push(newSponsorship);
            _this.event.perks.forEach(_this._preparatePerks, _this);
            _this.userAuthService.updateUserAuth(_this.userAuth);
            _this.$rootScope.$broadcast('MenuSponsorCtrl:counts');
            _this.$rootScope.$broadcast('FollowEventsCtrl:getSponzorships');
            var notification = {
                text: _this.event.title,
                link: '#/organizers/sponzors',
                modelId: newSponsorship.id
            };
            _this.notificationService.sendNewSponsorship(notification, _this.event.user_organizer.id);
            _this.$cordovaToast.showShortBottom(_this.$translate.instant("MESSAGES.succ_sponsor_it"));
        })
            .catch(function (error) {
            _this.closeModalSponsorIt();
        });
    };
    EventDetailSponsorCtrl.prototype._preparateDataSponzorship = function () {
        return {
            sponzor_id: this.userAuth.id,
            perk_id: this.newSponsorIt.perk.id,
            event_id: this.event.id,
            organizer_id: this.event.user_organizer.id,
            status: 0,
            cause: this.newSponsorIt.cause
        };
    };
    return EventDetailSponsorCtrl;
})();
angular
    .module('app.events-sponzor')
    .controller('EventDetailSponsorCtrl', EventDetailSponsorCtrl);
