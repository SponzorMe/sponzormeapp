/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function () {
    'use strict';
    angular
        .module('app.users')
        .controller('TestsController', TestsController);
    TestsController.$inject = [
        '$localStorage',
        'userInterestService',
        'userService',
        'sponsorshipService',
        'perkTaskService',
        'perkService',
        'eventTypeService',
        'categoryService',
        'eventService'
    ];
    function TestsController($localStorage, userInterestService, userService, sponsorshipService, perkTaskService, perkService, eventTypeService, categoryService, eventService) {
        var vm = this;
        vm.userAuth = $localStorage.userAuth || {};
        getEvent();
        //////////////////////////////////////
        function rta(response) {
            console.log(response);
        }
        function createUserInterest() {
            userInterestService.createUserInterest({
                interest_id: 1,
                user_id: vm.userAuth.id
            })
                .then(rta)
                .catch(rta);
        }
        function bulkUserInterest() {
            userInterestService.bulkUserInterest(1003, { interests: [
                    {
                        interest_id: 1,
                        user_id: 1003
                    }
                ] })
                .then(rta)
                .catch(rta);
        }
        function login() {
            userService.login('organizer@sponzor.me', 'sponzorme')
                .then(rta)
                .catch(rta);
        }
        function getUser() {
            userService.getUser(1007)
                .then(rta)
                .catch(rta);
        }
        function createUser() {
            userService.createUser({
                email: "nico@as.co",
                password: "123456",
                password_confirmation: "123456",
                name: "Nicolas",
                lang: 'en',
                type: 1
            })
                .then(rta)
                .catch(rta);
        }
        function editUserPatch() {
            userService.editUserPatch(1007, {
                email: "nicolas.molina.monroy@hotmail.com"
            })
                .then(rta)
                .catch(rta);
        }
        function forgotPassword() {
            userService.forgotPassword("nicolas.molina.monroy@hotmail.com")
                .then(rta)
                .catch(rta);
        }
        function deleteUser() {
            userService.deleteUser(1008)
                .then(rta)
                .catch(rta);
        }
        function invitedUser() {
            userService.invitedUser({
                user_id: 1007,
                email: "nicolas.molina.monroy@gmail.com",
                message: "Try this ;)"
            })
                .then(rta)
                .catch(rta);
        }
        function allSponsorships() {
            sponsorshipService.allSponsorships()
                .then(rta)
                .catch(rta);
        }
        function getSponzorship() {
            sponsorshipService.getSponzorship(12)
                .then(rta)
                .catch(rta);
        }
        function sponzorshipByOrganizer() {
            sponsorshipService.sponzorshipByOrganizer(1002)
                .then(rta)
                .catch(rta);
        }
        function sponzorshipBySponzor() {
            sponsorshipService.sponzorshipBySponzor(1002)
                .then(rta)
                .catch(rta);
        }
        function createSponzorship() {
            sponsorshipService.createSponzorship({
                sponzor_id: 1002,
                perk_id: 18,
                event_id: 1018,
                organizer_id: 1003,
                status: 0,
                cause: 'YOLO'
            })
                .then(rta)
                .catch(rta);
        }
        function deleteSponzorship() {
            sponsorshipService.deleteSponzorship(31)
                .then(rta)
                .catch(rta);
        }
        function editSponzorshipPatch() {
            sponsorshipService.editSponzorshipPatch(32, {
                cause: 'as'
            })
                .then(rta)
                .catch(rta);
        }
        function editSponzorshipPut() {
            sponsorshipService.editSponzorshipPut(32, {
                cause: 'as'
            })
                .then(rta)
                .catch(rta);
        }
        function allPerkTasks() {
            perkTaskService.allPerkTasks()
                .then(rta)
                .catch(rta);
        }
        function getPerkTask() {
            perkTaskService.getPerkTask(11)
                .then(rta)
                .catch(rta);
        }
        function createPerkTask() {
            perkTaskService.createPerkTask({
                user_id: 1007,
                event_id: 1018,
                perk_id: 18,
                title: "Tarea",
                description: "Bla bla",
                type: 0,
                status: 0
            })
                .then(rta)
                .catch(rta);
        }
        function deletePerkTask() {
            perkTaskService.deletePerkTask(35)
                .then(rta)
                .catch(rta);
        }
        function editPerkTaskPatch() {
            perkTaskService.editPerkTaskPatch(36, {
                title: 'asas'
            })
                .then(rta)
                .catch(rta);
        }
        function editPerkTaskPut() {
            perkTaskService.editPerkTaskPut(36, {
                title: 'asas'
            })
                .then(rta)
                .catch(rta);
        }
        function getPerkTaskByOrganizer() {
            perkTaskService.getPerkTaskByOrganizer(1007)
                .then(rta)
                .catch(rta);
        }
        function allPerks() {
            perkService.allPerks()
                .then(rta)
                .catch(rta);
        }
        function getPerk() {
            perkService.getPerk(3)
                .then(rta)
                .catch(rta);
        }
        function createPerk() {
            perkService.createPerk({
                id_event: 1018,
                reserved_quantity: 0,
                kind: 'Food',
                total_quantity: 1,
                usd: 1
            })
                .then(rta)
                .catch(rta);
        }
        function deletePerk() {
            perkService.deletePerk(55)
                .then(rta)
                .catch(rta);
        }
        function editPerkPatch() {
            perkService.editPerkPatch(56, {
                kind: 'sd'
            })
                .then(rta)
                .catch(rta);
        }
        function allEventTypes() {
            eventTypeService.allEventTypes()
                .then(rta)
                .catch(rta);
        }
        function getEventType() {
            eventTypeService.getEventType(1)
                .then(rta)
                .catch(rta);
        }
        function allCategories() {
            categoryService.allCategories()
                .then(rta)
                .catch(rta);
        }
        function getCategory() {
            categoryService.getCategory(2)
                .then(rta)
                .catch(rta);
        }
        function allEvents() {
            eventService.allEvents()
                .then(rta)
                .catch(rta);
        }
        function getEvent() {
            eventService.getEvent(1002)
                .then(rta)
                .catch(rta);
        }
        function createEvent() {
            eventService.createEvent({
                title: "Test Event",
                location: "event",
                location_reference: "referencia",
                description: "Una prueba",
                starts: "2010-01-01 00:00:00",
                ends: "2010-01-01 00:00:00",
                image: "http://i.imgur.com/t8YehGM.jpg",
                privacy: 1,
                lang: "es",
                organizer: 1007,
                category: 1,
                type: 1
            })
                .then(rta)
                .catch(rta);
        }
        function deleteEvent() {
            eventService.deleteEvent(1044)
                .then(rta)
                .catch(rta);
        }
        function editEventPatch() {
            eventService.editEventPatch(1045, {
                title: "Test Event 2"
            })
                .then(rta)
                .catch(rta);
        }
        function editEventPut() {
            eventService.editEventPut(1045, {
                title: "Test Event 2"
            })
                .then(rta)
                .catch(rta);
        }
    }
})();
