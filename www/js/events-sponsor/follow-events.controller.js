/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function () {
    'use strict';
    angular
        .module('app.events-sponzor')
        .controller('FollowEventsController', FollowEventsController);
    FollowEventsController.$inject = [
        '$localStorage',
        'utilsService',
        'userService',
        '$scope',
        '$rootScope',
        'userAuthService'
    ];
    function FollowEventsController($localStorage, utilsService, userService, $scope, $rootScope, userAuthService) {
        var vm = this;
        //Attributes
        vm.userAuth = userAuthService.getUserAuth();
        vm.sponzorships = [];
        vm.showEmptyState = false;
        //Funcions
        vm.doRefresh = doRefresh;
        activate();
        ////////////
        function activate() {
            vm.sponzorships = vm.userAuth.sponzorships.filter(filterByDateAndByPending);
            vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
            $rootScope.$on('FollowEventsController:getSponzorships', getSponzorships);
        }
        function getSponzorships() {
            vm.userAuth = $localStorage.userAuth;
            vm.sponzorships = vm.userAuth.sponzorships.filter(filterByDateAndByPending);
            vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
        }
        function doRefresh() {
            userService.home(vm.userAuth.id)
                .then(complete)
                .catch(failed);
            function complete(user) {
                $scope.$broadcast('scroll.refreshComplete');
                vm.userAuth = userAuthService.updateUserAuth(user);
                vm.sponzorships = vm.userAuth.sponzorships.filter(filterByDateAndByPending);
                vm.showEmptyState = vm.sponzorships.length == 0 ? true : false;
                $rootScope.$broadcast('MenuSponzor:counts');
                $rootScope.$broadcast('SponzoringEventsController:getSponzorships');
            }
            function failed(error) {
                $scope.$broadcast('scroll.refreshComplete');
            }
        }
        /*function filterByDateAndByPending( item ){
          var today = moment( new Date() ).subtract(1, 'days');
          return moment(item.ends).isAfter( today ) && item.status != '1';
        }*/
        function filterByDateAndByPending(item) {
            return item.status != '1';
        }
    }
})();
