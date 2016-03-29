/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Detail Sponsorship
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function () {
    'use strict';
    angular
        .module('app.sponsors-organizer')
        .controller('SponsorshipOrganizerDetailController', SponsorshipOrganizerDetailController);
    SponsorshipOrganizerDetailController.$inject = [
        '$localStorage',
        'sponsorshipService',
        'utilsService',
        '$stateParams',
        '$ionicHistory',
        'userAuthService',
        'notificationService'
    ];
    function SponsorshipOrganizerDetailController($localStorage, sponsorshipService, utilsService, $stateParams, $ionicHistory, userAuthService, notificationService) {
        var vm = this;
        //Atributes
        vm.sponzorship = {};
        vm.userAuth = userAuthService.getUserAuth();
        vm.showEmptyState = false;
        //Accions
        vm.sponsorAccept = sponsorAccept;
        vm.sponsorReject = sponsorReject;
        activate();
        ////////////
        function activate() {
            vm.sponzorship = _.findWhere(vm.userAuth.sponzorships_like_organizer, { id: $stateParams.id });
            vm.sponzorship.task_sponzor = vm.sponzorship.task_sponzor.filter(filterTaskSponsor);
        }
        function filterTaskSponsor(item) {
            return item.task.user_id != vm.userAuth.id;
        }
        function sponsorAccept() {
            utilsService.confirm({
                title: 'Are you sure?',
                template: '<p class="text-center">In accept the sponsor</p>'
            })
                .then(complete);
            function complete(rta) {
                if (rta)
                    updateSponsorship(1); //Accepted 
            }
        }
        function sponsorReject() {
            utilsService.confirm({
                title: 'Are you sure?',
                template: '<p class="text-center">In reject the sponsor</p>'
            })
                .then(complete);
            function complete(rta) {
                if (rta)
                    updateSponsorship(2); //Deny
            }
        }
        function updateSponsorship(status) {
            utilsService.showLoad();
            var sponzorship = angular.copy(vm.sponzorship);
            sponzorship.status = status;
            sponsorshipService.editSponzorshipPut(sponzorship.id, sponzorship)
                .then(complete)
                .catch(failed);
            function complete(sponzorship) {
                utilsService.hideLoad();
                var notification = {
                    text: vm.sponzorship.event.title,
                    link: '#/sponzors/sponzoring',
                    modelId: vm.sponzorship.id
                };
                vm.sponzorship.status = sponzorship.status;
                if (vm.sponzorship.status == 1) {
                    notificationService.sendAcceptSponsorship(notification, vm.sponzorship.sponzor_id);
                }
                else if (vm.sponzorship.status == 2) {
                    notificationService.sendRejectSponsorship(notification, vm.sponzorship.sponzor_id);
                }
            }
            function failed(error) {
                utilsService.hideLoad();
            }
        }
    }
})();
