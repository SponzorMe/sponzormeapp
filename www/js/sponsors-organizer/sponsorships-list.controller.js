/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SponsorshipsListCtrl = (function () {
    function SponsorshipsListCtrl($scope, $rootScope, $ionicScrollDelegate, sponsorshipService, userService, utilsService, notificationService, userAuthService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$ionicScrollDelegate = $ionicScrollDelegate;
        this.sponsorshipService = sponsorshipService;
        this.userService = userService;
        this.utilsService = utilsService;
        this.notificationService = notificationService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$scope',
            '$rootScope',
            '$ionicScrollDelegate',
            'sponsorshipService',
            'userService',
            'utilsService',
            'notificationService',
            'userAuthService'
        ];
        this.sponsorships = [];
        this.showEmptyState = false;
        this.userAuth = this.userAuthService.getUserAuth();
        this.sponsorships = this.userAuth.sponzorships_like_organizer.filter(this._filterByDateIsAfter);
        this.showEmptyState = this.sponsorships.length == 0 ? true : false;
        this._registerListenerSponzorships();
    }
    SponsorshipsListCtrl.prototype.sponsorAccept = function (sponzor) {
        var _this = this;
        this.utilsService.confirm({
            title: 'Are you sure?',
            template: '<p class="text-center">In the accept the sponsor</p>'
        })
            .then(function (rta) {
            if (rta)
                _this._updateSponsorship(sponzor, 1); //Accepted 
        });
    };
    SponsorshipsListCtrl.prototype.sponsorReject = function (sponzor) {
        var _this = this;
        this.utilsService.confirm({
            title: 'Are you sure?',
            template: '<p class="text-center">In the reject the sponsor</p>'
        })
            .then(function (rta) {
            if (rta)
                _this._updateSponsorship(sponzor, 2); //Deny
        });
    };
    SponsorshipsListCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.$scope.$broadcast('scroll.refreshComplete');
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.sponsorships = _this.userAuth.sponzorships_like_organizer.filter(_this._filterByDateIsAfter);
            _this.showEmptyState = _this.sponsorships.length == 0 ? true : false;
            _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_sponsors');
            _this.$rootScope.$broadcast('SponsorshipsTabsCtrl:count_sponsors');
            _this.$rootScope.$broadcast('HomeOrganizerCtrl:count_sponsors');
        })
            .catch(function (error) {
            _this.showEmptyState = true;
        });
    };
    SponsorshipsListCtrl.prototype._updateSponsorship = function (sponzor, status) {
        var _this = this;
        this.utilsService.showLoad();
        var sponzorCopy = angular.copy(sponzor);
        sponzorCopy.status = status;
        this.sponsorshipService.editSponzorshipPut(sponzorCopy.id, sponzorCopy)
            .then(function (sponsorship) {
            _this.utilsService.hideLoad();
            sponzor.status = sponsorship.status;
            var notification = {
                text: sponzor.event.title,
                link: '#/sponzors/sponzoring',
                modelId: sponsorship.id
            };
            if (sponzor.status == 1) {
                _this.notificationService.sendAcceptSponsorship(notification, sponsorship.sponzor_id, sponsorship.sponzor_ionic_id);
            }
            else if (sponzor.status == 2) {
                _this.notificationService.sendRejectSponsorship(notification, sponsorship.sponzor_id, sponsorship.sponzor_ionic_id);
            }
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    SponsorshipsListCtrl.prototype._registerListenerSponzorships = function () {
        var _this = this;
        this.$rootScope.$on('SponsorshipsListCtrl:getSponzorships', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.sponsorships = _this.userAuth.sponzorships_like_organizer.filter(_this._filterByDateIsAfter);
            ;
            _this.showEmptyState = _this.sponsorships.length == 0 ? true : false;
        });
    };
    SponsorshipsListCtrl.prototype._filterByDateIsAfter = function (item) {
        var today = moment(new Date()).subtract(1, 'days');
        return moment(item.event.ends).isAfter(today);
    };
    return SponsorshipsListCtrl;
}());
angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipsListCtrl', SponsorshipsListCtrl);
