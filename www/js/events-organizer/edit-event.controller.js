/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Add Events
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var EditEventCtrl = (function () {
    function EditEventCtrl($scope, $translate, utilsService, $cordovaDatePicker, $cordovaCamera, eventTypeService, eventService, $ionicModal, $cordovaToast, $ionicHistory, imgurService, $stateParams, userAuthService, notificationService, $rootScope) {
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
        this.$stateParams = $stateParams;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
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
            '$stateParams',
            'userAuthService',
            'notificationService',
            '$rootScope'
        ];
        this.indexEvent = -1;
        this.newEvent = {};
        this.newPerk = {};
        this.isNewPerk = true;
        this.eventTypes = [];
        this.modalPerk = null;
        this.imageURI = null;
        this.userAuth = userAuthService.getUserAuth();
        this.newEvent = _.findWhere(this.userAuth.events, { id: this.$stateParams.id });
        this.indexEvent = _.indexOf(this.userAuth.events, this.newEvent);
        this.newEvent.start = moment(this.newEvent.starts).format('YYYY-MM-DD');
        this.newEvent.starttime = moment(this.newEvent.starts).format('HH:mm:ss');
        this.newEvent.end = moment(this.newEvent.ends).format('YYYY-MM-DD');
        this.newEvent.endtime = moment(this.newEvent.ends).format('HH:mm:ss');
        this.$rootScope.hideTabs = '';
        this.loadModal();
        this.getEventsTypes();
    }
    EditEventCtrl.prototype.loadModal = function () {
        var _this = this;
        this.$ionicModal.fromTemplateUrl('templates/events-organizer/perk-edit-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then(function (modal) { return _this.modalPerk = modal; });
    };
    EditEventCtrl.prototype.getEventsTypes = function () {
        var _this = this;
        this.eventTypeService.allEventTypes()
            .then(function (eventTypes) {
            _this.eventTypes = eventTypes;
        });
    };
    EditEventCtrl.prototype.clickedStartDate = function () {
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
    EditEventCtrl.prototype.clickedEndDate = function () {
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
    EditEventCtrl.prototype.clickedStartTime = function () {
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
    EditEventCtrl.prototype.clickedEndTime = function () {
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
    EditEventCtrl.prototype.getPhoto = function () {
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
    EditEventCtrl.prototype.submitEvent = function (form) {
        this.utilsService.showLoad();
        if (this.imageURI) {
            this._updateEventWithImage(form);
        }
        else {
            this._updateEvent(form);
        }
    };
    EditEventCtrl.prototype.openModalPerk = function () {
        this.modalPerk.show();
    };
    EditEventCtrl.prototype.closeModalPerk = function (form) {
        this.modalPerk.hide();
        if (form)
            this.utilsService.resetForm(form);
        this.newPerk = {};
    };
    EditEventCtrl.prototype.createPerk = function () {
        this.isNewPerk = true;
        this.openModalPerk();
    };
    EditEventCtrl.prototype.editPerk = function (data) {
        this.isNewPerk = false;
        data.total_quantity = parseInt(data.total_quantity);
        data.usd = parseInt(data.usd);
        this.newPerk = data;
        this.openModalPerk();
    };
    EditEventCtrl.prototype.addPerk = function () {
        this.newEvent.perks.push({
            kind: this.newPerk.kind,
            usd: this.newPerk.usd,
            total_quantity: this.newPerk.total_quantity,
            reserved_quantity: 0
        });
        this.closeModalPerk();
    };
    EditEventCtrl.prototype.deletePerk = function () {
        var index = this.newEvent.perks.indexOf(this.newPerk);
        this.newEvent.perks.splice(index, 1);
        this.closeModalPerk();
    };
    EditEventCtrl.prototype.updatePerk = function () {
        this.closeModalPerk();
    };
    EditEventCtrl.prototype.submitPerk = function (form) {
        if (this.isNewPerk) {
            this.addPerk();
            this.utilsService.resetForm(form);
        }
        else {
            this.updatePerk();
            this.utilsService.resetForm(form);
        }
    };
    EditEventCtrl.prototype._updateEventWithImage = function (form) {
        var _this = this;
        this.imgurService.uploadImage(this.imageURI)
            .then(function (image) {
            _this.newEvent.image = image;
            return _this.eventService.editEventPut(_this.newEvent.id, _this._preparateData());
        })
            .then(function (event) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.userAuth.events[_this.indexEvent] = event;
            _this.userAuthService.updateUserAuth(_this.userAuth);
            _this.newEvent = {};
            _this.$ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
            _this.$ionicHistory.clearCache().then(function () {
                _this.notificationService.sendNewEvent();
                _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_events');
                _this.$rootScope.$broadcast('EventsTabsCtrl:count_events');
                _this.$rootScope.$broadcast('EventListOrganizerCtrl:getEvents');
                _this.$rootScope.$broadcast('PastEventsOrganizerCtrl:getEvents');
                _this.$ionicHistory.goBack();
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
    EditEventCtrl.prototype._updateEvent = function (form) {
        var _this = this;
        this.eventService.editEventPut(this.newEvent.id, this._preparateData())
            .then(function (event) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.userAuth.events[_this.indexEvent] = event;
            _this.userAuthService.updateUserAuth(_this.userAuth);
            _this.newEvent = {};
            _this.$ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
            _this.$ionicHistory.clearCache().then(function () {
                _this.notificationService.sendNewEvent();
                _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_events');
                _this.$rootScope.$broadcast('EventsTabsCtrl:count_events');
                _this.$rootScope.$broadcast('EventListOrganizerCtrl:getEvents');
                _this.$rootScope.$broadcast('PastEventsOrganizerCtrl:getEvents');
                _this.$ionicHistory.goBack();
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
    EditEventCtrl.prototype._preparateData = function () {
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
            perks: this.newEvent.perks
        };
    };
    EditEventCtrl.prototype._showDatePicker = function (options) {
        return this.$cordovaDatePicker.show(options);
    };
    return EditEventCtrl;
}());
angular
    .module('app.events-organizer')
    .controller('EditEventCtrl', EditEventCtrl);
