/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Detail Sponsorship
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SponsorshipOrganizerDetailCtrl = (function () {
    function SponsorshipOrganizerDetailCtrl($stateParams, $rootScope, sponsorshipService, utilsService, userAuthService, notificationService, ionicMaterialInk, $ionicAnalytics) {
        var _this = this;
        this.$stateParams = $stateParams;
        this.$rootScope = $rootScope;
        this.sponsorshipService = sponsorshipService;
        this.utilsService = utilsService;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$ionicAnalytics = $ionicAnalytics;
        this.$inject = [
            '$stateParams',
            '$rootScope',
            'sponsorshipService',
            'utilsService',
            'userAuthService',
            'notificationService',
            'ionicMaterialInk',
            '$ionicAnalytics'
        ];
        this.sponsorship = {};
        this.showEmptyState = false;
        if (ionic.Platform.isAndroid()) {
            this.ionicMaterialInk.displayEffect();
        }
        this.userAuth = this.userAuthService.getUserAuth();
        this.sponsorship = _.findWhere(this.userAuth.sponzorships_like_organizer, { id: this.$stateParams.id });
        this.sponsorship.task_sponzor = this.sponsorship.task_sponzor.filter(function (item) { return item.task.user_id != _this.userAuth.id; });
    }
    SponsorshipOrganizerDetailCtrl.prototype.sponsorAccept = function () {
        var _this = this;
        this.utilsService.confirm({
            title: 'Are you sure?',
            template: '<p class="text-center">In accept the sponsor</p>'
        })
            .then(function (rta) {
            _this.$ionicAnalytics.track('Sponsor Accept', _this.sponsorship);
            if (rta)
                _this._updateSponsorship(1); //Accepted 
        });
    };
    SponsorshipOrganizerDetailCtrl.prototype.sponsorReject = function () {
        var _this = this;
        this.utilsService.confirm({
            title: 'Are you sure?',
            template: '<p class="text-center">In reject the sponsor</p>'
        })
            .then(function (rta) {
            _this.$ionicAnalytics.track('Sponsor Reject', _this.sponsorship);
            if (rta)
                _this._updateSponsorship(2); //Deny
        });
    };
    SponsorshipOrganizerDetailCtrl.prototype._updateSponsorship = function (status) {
        var _this = this;
        this.utilsService.showLoad();
        var sponsorship = angular.copy(this.sponsorship);
        sponsorship.status = status;
        this.sponsorshipService.editSponzorshipPut(sponsorship.id, sponsorship)
            .then(function (sponsorship) {
            _this.utilsService.hideLoad();
            var notification = {
                text: _this.sponsorship.event.title,
                link: '#/sponzors/sponzoring',
                modelId: _this.sponsorship.id
            };
            _this.sponsorship.status = sponsorship.status;
            _this.$rootScope.$broadcast('SponsorshipsListCtrl:getSponzorships');
            _this.$rootScope.$broadcast('SponsorshipsPastEventsCtrl:getSponzorships');
            _this.$rootScope.$broadcast('SponsorshipsTabsCtrl:count_sponsors');
            if (_this.sponsorship.status == 1) {
                _this.notificationService.sendAcceptSponsorship(notification, _this.sponsorship.sponzor_id, _this.sponsorship.sponzor_ionic_id);
            }
            else if (_this.sponsorship.status == 2) {
                _this.notificationService.sendRejectSponsorship(notification, _this.sponsorship.sponzor_id, _this.sponsorship.sponzor_ionic_id);
            }
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    return SponsorshipOrganizerDetailCtrl;
}());
angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipOrganizerDetailCtrl', SponsorshipOrganizerDetailCtrl);
