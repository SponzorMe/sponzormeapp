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
        .module('app.tasks-organizer')
        .controller('TaskTabsController', TaskTabsController);
    TaskTabsController.$inject = [
        '$rootScope',
        'userAuthService'
    ];
    function TaskTabsController($rootScope, userAuthService) {
        var vm = this;
        //Attributes
        vm.userAuth = userAuthService.getUserAuth();
        vm.count_tasks = 0;
        vm.count_past_tasks = 0;
        activate();
        ////////////
        function activate() {
            $rootScope.$on('TaskTabsController:count_tasks', rendercountTasks);
            vm.count_tasks = countTasks(vm.userAuth.events.filter(filterEventsIsAfter)).length;
            vm.count_past_tasks = countTasks(vm.userAuth.events.filter(filterEventsisBefore)).length;
        }
        function filterEventsIsAfter(event) {
            var count = event.perks.reduce(function (a, b) { return a.concat(b.tasks); }, []);
            var today = moment(new Date()).subtract(1, 'days');
            return moment(event.ends).isAfter(today) && count.length > 0;
        }
        function filterEventsisBefore(event) {
            var count = event.perks.reduce(function (a, b) { return a.concat(b.tasks); }, []);
            var today = moment(new Date()).subtract(1, 'days');
            return moment(event.ends).isBefore(today) && count.length > 0;
        }
        function rendercountTasks() {
            vm.userAuth = userAuthService.getUserAuth();
            vm.count_tasks = countTasks(vm.userAuth.events.filter(filterEventsIsAfter)).length;
            vm.count_past_tasks = countTasks(vm.userAuth.events.filter(filterEventsisBefore)).length;
        }
        function countTasks(events) {
            return events
                .reduce(function (a, b) { return a.concat(b.perks); }, [])
                .reduce(function (a, b) { return a.concat(b.tasks); }, [])
                .filter(filterByUserAndNotDone);
            function filterByUserAndNotDone(item) {
                return item.user_id == vm.userAuth.id && item.status != '1';
            }
        }
    }
})();
