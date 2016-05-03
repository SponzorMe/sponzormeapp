/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Add Events
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var AddEventCtrl = (function () {
    function AddEventCtrl($scope, $translate, utilsService, $cordovaDatePicker, $cordovaCamera, eventTypeService, eventService, $ionicModal, $cordovaToast, $ionicHistory, imgurService, $state, notificationService, userAuthService, $rootScope) {
        this.$scope = $scope;
        this.$translate = $translate;
        this.utilsService = utilsService;
        this.$cordovaDatePicker = $cordovaDatePicker;
        this.$cordovaCamera = $cordovaCamera;
        this.eventTypeService = eventTypeService;
        this.eventService = eventService;
        this.$ionicModal = $ionicModal;
        this.$cordovaToast = $cordovaToast;
        this.$ionicHistory = $ionicHistory;
        this.imgurService = imgurService;
        this.$state = $state;
        this.notificationService = notificationService;
        this.userAuthService = userAuthService;
        this.$rootScope = $rootScope;
        this.$inject = [
            '$scope',
            '$translate',
            'utilsService',
            '$cordovaDatePicker',
            '$cordovaCamera',
            'eventTypeService',
            'eventService',
            '$ionicModal',
            '$cordovaToast',
            '$ionicHistory',
            'imgurService',
            '$state',
            'notificationService',
            'userAuthService',
            '$rootScope',
        ];
        this.newEvent = {};
        this.newPerk = {};
        this.isNewPerk = true;
        this.eventTypes = [];
        this.modalPerk = null;
        this.imageURI = null;
        this.userAuth = userAuthService.getUserAuth();
        this.newEvent.access = true;
        this.newEvent.perks = [];
        this.newEvent.starttime = "13:00:00";
        this.newEvent.start = moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD');
        this.newEvent.endtime = "15:00:00";
        this.newEvent.end = moment(new Date().getTime()).add(4, 'days').format('YYYY-MM-DD');
        this.$rootScope.hideTabs = '';
        this.loadModal();
        this.getEventsTypes();
    }
    AddEventCtrl.prototype.loadModal = function () {
        var _this = this;
        this.$ionicModal.fromTemplateUrl('templates/events-organizer/perk-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then(function (modal) { return _this.modalPerk = modal; });
    };
    AddEventCtrl.prototype.getEventsTypes = function () {
        var _this = this;
        this.eventTypeService.allEventTypes()
            .then(function (eventTypes) {
            _this.eventTypes = eventTypes;
            if (_this.eventTypes.length > 0)
                _this.newEvent.type = _this.eventTypes[0];
        });
    };
    AddEventCtrl.prototype.clickedStartDate = function () {
        var _this = this;
        var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
        this._showDatePicker({
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
            .then(function (date) { _this.newEvent.start = moment(date).format('YYYY-MM-DD'); });
    };
    AddEventCtrl.prototype.clickedEndDate = function () {
        var _this = this;
        var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
        this._showDatePicker({
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
            .then(function (date) { _this.newEvent.end = moment(date).format('YYYY-MM-DD'); });
    };
    ;
    AddEventCtrl.prototype.clickedStartTime = function () {
        var _this = this;
        var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
        this._showDatePicker({
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
            .then(function (date) { _this.newEvent.starttime = moment(date).format('HH:mm:ss'); });
    };
    AddEventCtrl.prototype.clickedEndTime = function () {
        var _this = this;
        var minDate = ionic.Platform.isIOS() ? new Date() : new Date().getTime();
        this._showDatePicker({
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
            .then(function (date) { _this.newEvent.endtime = moment(date).format('HH:mm:ss'); });
    };
    AddEventCtrl.prototype.getPhoto = function () {
        var _this = this;
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
        this.$cordovaCamera.getPicture(options)
            .then(function (imageURI) {
            _this.imageURI = imageURI;
            _this.newEvent.image = "data:image/jpeg;base64," + imageURI;
        });
    };
    AddEventCtrl.prototype.submitEvent = function (form) {
        this.utilsService.showLoad();
        if (this.imageURI) {
            this._createEventWithImage(form);
        }
        else {
            this._createEvent(form);
        }
    };
    AddEventCtrl.prototype._createEventWithImage = function (form) {
        var _this = this;
        this.imgurService.uploadImage(this.imageURI)
            .then(function (image) {
            _this.newEvent.image = image;
            return _this.eventService.createEvent(_this._preparateData());
        })
            .then(function (event) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.newEvent = {};
            _this.userAuth.events.push(event);
            _this.userAuthService.updateUserAuth(_this.userAuth);
            _this.$ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
            _this.$ionicHistory.clearCache().then(function () {
                _this.notificationService.sendNewEvent();
                _this.$rootScope.$broadcast('MenuOrganizer:count_events');
                _this.$rootScope.$broadcast('EventsTabsController:count_events');
                _this.$rootScope.$broadcast('HomeOrganizerController:count_events');
                _this.$state.go("organizer.events.list");
            });
            _this.$cordovaToast.showShortBottom(_this.$translate.instant("MESSAGES.succ_event_mess"));
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
            _this.utilsService.alert({
                title: _this.$translate.instant("ERRORS.addeventsform_error_tit"),
                template: _this.$translate.instant("ERRORS.addeventsform_error_mess")
            });
        });
    };
    AddEventCtrl.prototype._createEvent = function (form) {
        var _this = this;
        this.eventService.createEvent(this._preparateData())
            .then(function (event) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.newEvent = {};
            _this.userAuth.events.push(event);
            _this.userAuthService.updateUserAuth(_this.userAuth);
            _this.$ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
            _this.$ionicHistory.clearCache().then(function () {
                _this.notificationService.sendNewEvent();
                _this.$rootScope.$broadcast('MenuOrganizer:count_events');
                _this.$rootScope.$broadcast('EventsTabsController:count_events');
                _this.$rootScope.$broadcast('HomeOrganizerController:count_events');
                _this.$state.go("organizer.events.list");
            });
            _this.$cordovaToast.showShortBottom(_this.$translate.instant("MESSAGES.succ_event_mess"));
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
            _this.utilsService.alert({
                title: _this.$translate.instant("ERRORS.addeventsform_error_tit"),
                template: _this.$translate.instant("ERRORS.addeventsform_error_mess")
            });
        });
    };
    AddEventCtrl.prototype.openModalPerk = function () {
        this.modalPerk.show();
    };
    AddEventCtrl.prototype.closeModalPerk = function (form) {
        this.modalPerk.hide();
        if (form)
            this.utilsService.resetForm(form);
        this.newPerk = {};
    };
    AddEventCtrl.prototype.createPerk = function () {
        this.isNewPerk = true;
        this.openModalPerk();
    };
    AddEventCtrl.prototype.editPerk = function (data) {
        this.isNewPerk = false;
        this.newPerk = data;
        this.openModalPerk();
    };
    AddEventCtrl.prototype.addPerk = function () {
        this.newEvent.perks.push({
            kind: this.newPerk.kind,
            usd: this.newPerk.usd,
            total_quantity: this.newPerk.total_quantity,
            reserved_quantity: 0
        });
        this.closeModalPerk();
    };
    AddEventCtrl.prototype.deletePerk = function () {
        var index = this.newEvent.perks.indexOf(this.newPerk);
        this.newEvent.perks.splice(index, 1);
        this.closeModalPerk();
    };
    AddEventCtrl.prototype.updatePerk = function () {
        this.closeModalPerk();
    };
    AddEventCtrl.prototype.submitPerk = function (form) {
        if (this.isNewPerk) {
            this.addPerk();
            this.utilsService.resetForm(form);
        }
        else {
            this.updatePerk();
            this.utilsService.resetForm(form);
        }
    };
    AddEventCtrl.prototype._showDatePicker = function (options) {
        return this.$cordovaDatePicker.show(options);
    };
    AddEventCtrl.prototype._preparateData = function () {
        function joinDate(date, time) {
            date = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
            time = moment(date + " " + time).format("HH:mm:ss");
            return date + " " + time;
        }
        return {
            title: this.newEvent.title,
            location: this.newEvent.location.formatted_address,
            location_reference: this.newEvent.location.place_id,
            description: this.newEvent.description,
            starts: joinDate(this.newEvent.start, this.newEvent.starttime),
            ends: joinDate(this.newEvent.end, this.newEvent.endtime),
            image: this.newEvent.image ? this.newEvent.image : "http://i.imgur.com/t8YehGM.jpg",
            privacy: this.newEvent.privacy ? 0 : 1,
            lang: this.$translate.use(),
            organizer: this.userAuth.id,
            category: 1,
            type: this.newEvent.type.id,
            perks: this.newEvent.perks,
            sumary: this.newEvent.description.substr(0, 159)
        };
    };
    return AddEventCtrl;
}());
angular
    .module('app.dashboard-sponzor')
    .controller('AddEventCtrl', AddEventCtrl);
