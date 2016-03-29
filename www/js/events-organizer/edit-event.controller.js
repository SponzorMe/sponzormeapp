/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Add Events
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function () {
    'use strict';
    angular
        .module('app.events-organizer')
        .controller('EditEventController', EditEventController);
    EditEventController.$inject = [
        '$scope',
        '$translate',
        '$localStorage',
        'userService',
        'utilsService',
        '$cordovaDatePicker',
        '$cordovaCamera',
        'eventTypeService',
        'eventService',
        '$ionicModal',
        '$cordovaToast',
        '$ionicHistory',
        'imgurService',
        '$q',
        '$stateParams',
        'userAuthService',
        'notificationService',
        '$rootScope'
    ];
    function EditEventController($scope, $translate, $localStorage, userService, utilsService, $cordovaDatePicker, $cordovaCamera, eventTypeService, eventService, $ionicModal, $cordovaToast, $ionicHistory, imgurService, $q, $stateParams, userAuthService, notificationService, $rootScope) {
        var vm = this;
        vm.indexEvent = -1;
        vm.newEvent = {};
        vm.newPerk = {};
        vm.isNewPerk = true;
        vm.eventTypes = [];
        vm.userAuth = userAuthService.getUserAuth();
        vm.modalPerk = null;
        vm.imageURI = null;
        vm.clickedStartDate = clickedStartDate;
        vm.clickedEndDate = clickedEndDate;
        vm.clickedStartTime = clickedStartTime;
        vm.clickedEndTime = clickedEndTime;
        vm.getPhoto = getPhoto;
        vm.updateEvent = updateEvent;
        vm.openModalPerk = openModalPerk;
        vm.closeModalPerk = closeModalPerk;
        vm.createPerk = createPerk;
        vm.editPerk = editPerk;
        vm.submitPerk = submitPerk;
        activate();
        ////////////
        function activate() {
            /*vm.newEvent.starttime = "00:00:00";
            vm.newEvent.start = "2015-12-15";
            vm.newEvent.endtime = "00:00:00";
            vm.newEvent.end = "2015-12-24";
            */
            $ionicModal.fromTemplateUrl('app/events-organizer/perk-edit-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                vm.modalPerk = modal;
            });
            vm.newEvent = _.findWhere(vm.userAuth.events, { id: $stateParams.id });
            vm.indexEvent = _.indexOf(vm.userAuth.events, vm.newEvent);
            vm.newEvent.start = moment(vm.newEvent.starts).format('YYYY-MM-DD');
            vm.newEvent.starttime = moment(vm.newEvent.starts).format('HH:mm:ss');
            vm.newEvent.end = moment(vm.newEvent.ends).format('YYYY-MM-DD');
            vm.newEvent.endtime = moment(vm.newEvent.ends).format('HH:mm:ss');
            vm.newEvent.access = vm.newEvent.privacy == '1' ? true : false;
            $rootScope.hideTabs = '';
            getEventsTypes();
        }
        /*-------------- DatePickers   --------------*/
        function showDatePicker(options) {
            return $cordovaDatePicker.show(options);
        }
        function clickedStartDate() {
            var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
            showDatePicker({
                date: new Date(),
                mode: 'date',
                minDate: minDate,
                allowOldDates: true,
                allowFutureDates: true,
                doneButtonLabel: 'DONE',
                doneButtonColor: '#F2F3F4',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
            })
                .then(complete);
            function complete(date) {
                vm.newEvent.start = moment(date).format('YYYY-MM-DD');
            }
        }
        function clickedEndDate() {
            var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
            showDatePicker({
                date: new Date(),
                mode: 'date',
                minDate: minDate,
                allowOldDates: true,
                allowFutureDates: true,
                doneButtonLabel: 'DONE',
                doneButtonColor: '#F2F3F4',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
            })
                .then(complete);
            function complete(date) {
                vm.newEvent.end = moment(date).format('YYYY-MM-DD');
            }
        }
        ;
        function clickedStartTime() {
            var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
            showDatePicker({
                date: new Date(),
                mode: 'time',
                minDate: minDate,
                allowOldDates: true,
                allowFutureDates: true,
                doneButtonLabel: 'DONE',
                doneButtonColor: '#F2F3F4',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
            })
                .then(complete);
            function complete(date) {
                vm.newEvent.starttime = moment(date).format('HH:mm:ss');
            }
        }
        function clickedEndTime() {
            var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
            showDatePicker({
                date: new Date(),
                mode: 'time',
                minDate: minDate,
                allowOldDates: true,
                allowFutureDates: true,
                doneButtonLabel: 'DONE',
                doneButtonColor: '#F2F3F4',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
            })
                .then(complete);
            function complete(date) {
                vm.newEvent.endtime = moment(date).format('HH:mm:ss');
            }
        }
        /*-------------- Image --------------*/
        function getPhoto() {
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 500,
                targetHeight: 500,
                //popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options)
                .then(complete);
            //.catch( failed );
            function complete(imageURI) {
                vm.imageURI = imageURI;
                vm.newEvent.image = "data:image/jpeg;base64," + imageURI;
            }
            /*
            function failed( error ){
              console.log( error );
            }*/
        }
        /*-------------- Create Event --------------*/
        function updateEvent(form) {
            utilsService.showLoad();
            if (vm.imageURI) {
                imgurService.uploadImage(vm.imageURI)
                    .then(updateImage)
                    .then(complete)
                    .catch(failed);
            }
            else {
                eventService.editEventPut(vm.newEvent.id, preparateData())
                    .then(complete)
                    .catch(failed);
            }
            function updateImage(image) {
                vm.newEvent.image = image;
                return eventService.editEventPut(vm.newEvent.id, preparateData());
            }
            function complete(event) {
                utilsService.hideLoad();
                utilsService.resetForm(form);
                event = preparateEvent(event);
                function preparateEvent(item) {
                    item.image = (item.image == "event_dummy.png") ? 'img/banner.jpg' : item.image;
                    item.starts = moment(item.starts).toDate();
                    item.ends = moment(item.ends).toDate();
                    return item;
                }
                vm.userAuth.events[vm.indexEvent] = event;
                userAuthService.updateUserAuth(vm.userAuth);
                vm.newEvent = {};
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $ionicHistory.clearCache().then(function () {
                    notificationService.sendNewEvent();
                    $rootScope.$broadcast('MenuOrganizer:count_events');
                    $rootScope.$broadcast('EventsTabsController:count_events');
                    $rootScope.$broadcast('HomeOrganizerController:count_events');
                    $ionicHistory.goBack();
                });
                $cordovaToast.showShortBottom($translate.instant("MESSAGES.succ_event_mess"));
            }
            function failed(error) {
                utilsService.hideLoad();
                utilsService.alert({
                    title: $translate.instant("ERRORS.addeventsform_error_tit"),
                    template: $translate.instant("ERRORS.addeventsform_error_mess")
                });
            }
        }
        function getEventsTypes() {
            eventTypeService.allEventTypes()
                .then(complete);
            //.catch( failed );
            function complete(eventTypes) {
                vm.eventTypes = eventTypes;
                var idType = vm.newEvent.type.id ? vm.newEvent.type.id : vm.newEvent.type;
                for (var i = 0; i < vm.eventTypes.length; i++) {
                    if (vm.eventTypes[i].id == idType) {
                        vm.newEvent.type = vm.eventTypes[i];
                        break;
                    }
                }
                ;
            }
            /*
            function failed( error ){
              console.log( error );
            }
            */
        }
        function preparateData() {
            function joinDate(date, time) {
                date = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
                time = moment(date + " " + time).format("HH:mm:ss");
                return date + " " + time;
            }
            return {
                title: vm.newEvent.title,
                location: vm.newEvent.location,
                location_reference: "referencia",
                description: vm.newEvent.description,
                starts: joinDate(vm.newEvent.start, vm.newEvent.starttime),
                ends: joinDate(vm.newEvent.end, vm.newEvent.endtime),
                image: vm.newEvent.image ? vm.newEvent.image : "http://i.imgur.com/t8YehGM.jpg",
                privacy: vm.newEvent.access ? 0 : 1,
                lang: $translate.use(),
                organizer: vm.userAuth.id,
                category: 1,
                type: vm.newEvent.type.id,
                perks: vm.newEvent.perks
            };
        }
        /*-------------- Perks --------------*/
        function openModalPerk() {
            vm.modalPerk.show();
        }
        function closeModalPerk(form) {
            vm.modalPerk.hide();
            if (form)
                utilsService.resetForm(form);
            vm.newPerk = {};
        }
        function createPerk() {
            vm.isNewPerk = true;
            vm.openModalPerk();
        }
        function editPerk(data) {
            vm.isNewPerk = false;
            vm.newPerk = data;
            vm.newPerk.total_quantity = parseInt(vm.newPerk.total_quantity);
            vm.newPerk.usd = parseInt(vm.newPerk.usd);
            vm.openModalPerk();
        }
        function addPerk() {
            vm.newEvent.perks.push({
                id: vm.newPerk.id ? vm.newPerk.id : -1,
                kind: vm.newPerk.kind,
                usd: vm.newPerk.usd,
                total_quantity: vm.newPerk.total_quantity,
                reserved_quantity: 0
            });
            vm.closeModalPerk();
        }
        function updatePerk() {
            vm.closeModalPerk();
        }
        function submitPerk(form) {
            if (vm.isNewPerk) {
                addPerk();
                utilsService.resetForm(form);
            }
            else {
                updatePerk();
                utilsService.resetForm(form);
            }
        }
    }
})();
