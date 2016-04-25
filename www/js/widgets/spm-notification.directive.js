/// <reference path="../../typings/tsd.d.ts" />
// Description:
// Network message online / offline
// Usage:
// <spm-network-message></spm-network-message>
(function () {
    'use strict';
    angular
        .module('app.widgets')
        .directive('spmNotification', spmNotification);
    spmNotification.$inject = [
        '$state',
        '$firebaseArray',
        'BackendVariables',
        'userAuthService',
        '$translate'
    ];
    function spmNotification($state, $firebaseArray, BackendVariables, userAuthService, $translate) {
        var path = BackendVariables.f_url;
        var userAuth = userAuthService.getUserAuth();
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '='
            },
            link: link,
            templateUrl: 'templates/widgets/spm-notification.html'
        };
        return directive;
        function link($scope) {
            $scope.read = read;
            var events = {
                'newSponsorship': goDetailOrganizerSponsorhip,
                'acceptSponsorship': goDetailSponsorSponsorhip,
                'rejectSponsorship': goFollowing,
                'newTaskOrganizer': goDetailSponsorshipSponsor,
                'updateTaskOrganizer': goDetailSponsorshipSponsor,
                'doneTaskOrganizer': goDetailSponsorshipSponsor,
                'newTaskSponsor': goDetailSponsorshipOrganizer,
                'updateTaskSponsor': goDetailSponsorshipOrganizer,
                'doneTaskSponsor': goDetailSponsorshipOrganizer,
                'newEvent': goDetailEvent,
                'updateEvent': goDetailEvent
            };
            function read() {
                var url = path + 'notifications/' + userAuth.id + '/' + $scope.model.$id;
                var reference = new Firebase(url);
                reference.update({
                    read: true
                }).then(function () {
                    if ($scope.model.typeNotification) {
                        events[$scope.model.typeNotification]($scope.model.modelId || null);
                    }
                });
            }
            function goDetailOrganizerSponsorhip(id) {
                $state.go('organizer.sponsorship', {
                    id: id
                });
            }
            function goDetailSponsorSponsorhip(id) {
                $state.go('sponzor.sponsorship', {
                    id: id
                });
            }
            function goSponzoring() {
                $state.go('sponzor.sponzoring');
            }
            function goFollowing() {
                $state.go('sponzor.following');
            }
            function goDetailSponsorshipSponsor(id) {
                $state.go('sponzor.sponsorship', {
                    id: id
                });
            }
            function goDetailSponsorshipOrganizer(id) {
                $state.go('organizer.sponsorship', {
                    id: id
                });
            }
            function goDetailEvent(id) {
                $state.go('sponzor.event', {
                    idEvent: id
                });
            }
        }
    }
})();
