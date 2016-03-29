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
        .module('app.events-organizer')
        .controller('PastEventsController', PastEventsController);
    PastEventsController.$inject = [
        '$localStorage',
        'userService',
        'utilsService',
        '$scope',
        '$rootScope',
        'userAuthService'
    ];
    function PastEventsController($localStorage, userService, utilsService, $scope, $rootScope, userAuthService) {
        var vm = this;
        //Attributes
        vm.userAuth = userAuthService.getUserAuth();
        vm.events = [];
        vm.showEmptyState = false;
        //Funcions
        vm.doRefresh = doRefresh;
        activate();
        ////////////
        function activate() {
            $rootScope.$on('PastEventsController:getEvents', getEvents);
            vm.events = vm.userAuth.events.filter(filterDate);
            vm.showEmptyState = vm.events.length == 0 ? true : false;
        }
        function getEvents() {
            vm.userAuth = userAuthService.getUserAuth();
            vm.events = vm.userAuth.events.filter(filterDate);
            vm.showEmptyState = vm.events.length == 0 ? true : false;
        }
        function doRefresh() {
            userService.home(vm.userAuth.id)
                .then(complete)
                .catch(failed);
            function complete(user) {
                $scope.$broadcast('scroll.refreshComplete');
                vm.userAuth = userAuthService.updateUserAuth(user);
                vm.events = vm.userAuth.events.filter(filterDate);
                $rootScope.$broadcast('MenuOrganizer:count_events');
                $rootScope.$broadcast('EventsTabsController:count_events');
                $rootScope.$broadcast('HomeOrganizerController:count_events');
            }
            function failed(error) {
                $scope.$broadcast('scroll.refreshComplete');
            }
        }
        function filterDate(item) {
            var today = moment(new Date()).subtract(1, 'days');
            return moment(item.ends).isBefore(today);
        }
    }
})();
