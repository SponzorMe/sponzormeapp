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
        'BackendVariables',
        'userAuthService',
    ];
    function spmNotification($state, BackendVariables, userAuthService) {
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
                'doneTaskOrganizer': goDetailSponsorshipSponsor
            };
            function read() {
                var url = path + 'notifications/' + userAuth.id + '/' + $scope.model.$id;
                var reference = new Firebase(url);
                if ($scope.model.typeNotification && $scope.model.modelId) {
                    events[$scope.model.typeNotification]($scope.model.modelId)
                        .then(function () {
                        reference.update({ read: true })
                            .then(function () {
                            console.log('update notification');
                        });
                    });
                }
            }
            function goDetailOrganizerSponsorhip(id) {
                return $state.go('organizer.sponsorship', {
                    id: id
                });
            }
            function goDetailSponsorSponsorhip(id) {
                return $state.go('sponzor.sponsorship', {
                    id: id
                });
            }
            function goFollowing() {
                return $state.go('sponzor.following');
            }
            function goDetailSponsorshipSponsor(id) {
                return $state.go('sponzor.sponsorship', {
                    id: id
                });
            }
            /*
            function goSponzoring() {
              $state.go('sponzor.sponzoring');
            }
            */
            /*
            function goDetailSponsorshipOrganizer( id ){
               $state.go('organizer.sponsorship',{
                 id: id
               });
            }
            */
            /*
            function goDetailEvent( id ) {
              $state.go('sponzor.event',{
                 idEvent: id
               });
            }
            */
        }
    }
})();
