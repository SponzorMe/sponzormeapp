/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var EventDetailOrganizerCtrl = (function () {
    function EventDetailOrganizerCtrl($scope, $stateParams, $state, $translate, $rootScope, $ionicPopup, $ionicActionSheet, $ionicSideMenuDelegate, $ionicHistory, $ionicModal, $cordovaSocialSharing, $cordovaCalendar, $cordovaToast, BackendVariables, eventService, utilsService, sponsorshipService, notificationService, userAuthService, perkTaskService, ionicMaterialInk) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$state = $state;
        this.$translate = $translate;
        this.$rootScope = $rootScope;
        this.$ionicPopup = $ionicPopup;
        this.$ionicActionSheet = $ionicActionSheet;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$ionicHistory = $ionicHistory;
        this.$ionicModal = $ionicModal;
        this.$cordovaSocialSharing = $cordovaSocialSharing;
        this.$cordovaCalendar = $cordovaCalendar;
        this.$cordovaToast = $cordovaToast;
        this.BackendVariables = BackendVariables;
        this.eventService = eventService;
        this.utilsService = utilsService;
        this.sponsorshipService = sponsorshipService;
        this.notificationService = notificationService;
        this.userAuthService = userAuthService;
        this.perkTaskService = perkTaskService;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$inject = [
            '$scope',
            '$stateParams',
            '$state',
            '$translate',
            '$rootScope',
            '$ionicPopup',
            '$ionicActionSheet',
            '$ionicSideMenuDelegate',
            '$ionicHistory',
            '$ionicModal',
            '$cordovaSocialSharing',
            '$cordovaCalendar',
            '$cordovaToast',
            'BackendVariables',
            'eventService',
            'utilsService',
            'sponsorshipService',
            'notificationService',
            'userAuthService',
            'perkTaskService',
            'ionicMaterialInk'
        ];
        this.popupOptionsSponsorship = null;
        this.hideSheet = null;
        this.url_image = '';
        this.indexPerk = -1;
        this.indexTask = -1;
        this.modalTask = null;
        this.isNewTask = true;
        this.task = {};
        this.sponsorshipSelected = {};
        this.ionicMaterialInk.displayEffect();
        this.userAuth = this.userAuthService.getUserAuth();
        this.event = _.findWhere(this.userAuth.events, { id: $stateParams.id });
        this.event.perks.forEach(this._preparatePerks, this);
        this.url_image = this.BackendVariables.url_web;
        this.$ionicSideMenuDelegate.canDragContent(false);
        this._loadTaskModal();
    }
    EventDetailOrganizerCtrl.prototype._preparatePerks = function (perk) {
        perk.sponzorship = _.where(this.userAuth.sponzorships_like_organizer, { perk_id: perk.id });
        perk.tasks = _.where(perk.tasks, { user_id: this.userAuth.id });
    };
    EventDetailOrganizerCtrl.prototype._loadTaskModal = function () {
        var _this = this;
        this.$ionicModal.fromTemplateUrl('templates/events-organizer/task-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            _this.modalTask = modal;
        });
    };
    //Options for sponsorship modal
    EventDetailOrganizerCtrl.prototype._editEvent = function () {
        this.$state.go('organizer.editevent', { id: this.event.id });
    };
    EventDetailOrganizerCtrl.prototype._shareEvent = function () {
        var _this = this;
        var message = this.event.title;
        var subject = this.event.description;
        var image = this.event.image;
        var link = this.url_image + '#/event/' + this.event.id;
        this.$cordovaSocialSharing
            .share(message, subject, image, link) // Share via native share sheet
            .then(function () {
            _this.$cordovaToast.showShortBottom(_this.$translate.instant("MESSAGES.succ_add_to_calendar"));
        });
    };
    EventDetailOrganizerCtrl.prototype._addToCalendar = function () {
        var _this = this;
        this.$cordovaCalendar
            .createEvent({
            title: this.event.title,
            location: this.event.location,
            notes: this.event.description,
            startDate: this.event.starts,
            endDate: this.event.ends
        })
            .then(function () {
            _this.$cordovaToast.showShortBottom(_this.$translate.instant("MESSAGES.succ_add_to_calendar"));
        });
    };
    //Send Notifications
    EventDetailOrganizerCtrl.prototype._sendNewTaskNotification = function (text) {
        for (var index = 0; index < this.event.perks[this.indexPerk].sponzorship.length; index++) {
            var sponsorship = this.event.perks[this.indexPerk].sponzorship[index];
            this.notificationService.sendNewTaskOrganizer({
                text: text,
                modelId: sponsorship.id
            }, sponsorship.sponzor.id, sponsorship.sponzor.ionic_id || "");
        }
    };
    EventDetailOrganizerCtrl.prototype._sendDeleteTaskNotification = function (text) {
        for (var index = 0; index < this.event.perks[this.indexPerk].sponzorship.length; index++) {
            var sponsorship = this.event.perks[this.indexPerk].sponzorship[index];
            this.notificationService.sendDeleteTaskOrganizer({
                text: text,
                modelId: sponsorship.id
            }, sponsorship.sponzor.id, sponsorship.sponzor.ionic_id || "");
        }
    };
    EventDetailOrganizerCtrl.prototype._sendUpdateTaskNotification = function (text, done) {
        for (var index = 0; index < this.event.perks[this.indexPerk].sponzorship.length; index++) {
            var sponsorship = this.event.perks[this.indexPerk].sponzorship[index];
            if (done) {
                this.notificationService.sendDoneTaskOrganizer({
                    text: text,
                    modelId: sponsorship.id
                }, sponsorship.sponzor.id, sponsorship.sponzor.ionic_id || "");
            }
            else {
                this.notificationService.sendUpdateTaskOrganizer({
                    text: text,
                    modelId: sponsorship.id
                }, sponsorship.sponzor.id, sponsorship.sponzor.ionic_id || "");
            }
        }
    };
    //Popup Sponsorship
    EventDetailOrganizerCtrl.prototype.openOptionsSponsorship = function (sponsorship) {
        this.sponsorshipSelected = sponsorship;
        this.popupOptionsSponsorship = this.$ionicPopup.show({
            title: this.$translate.instant("EVENTDETAIL.options_title"),
            templateUrl: "templates/events-organizer/options-sponsorship.html",
            scope: this.$scope
        });
    };
    EventDetailOrganizerCtrl.prototype.closeOptionsSponsorship = function () {
        this.popupOptionsSponsorship.close();
    };
    //deleteEvent
    EventDetailOrganizerCtrl.prototype.deleteEvent = function () {
        var _this = this;
        this.utilsService.showLoad();
        this.eventService.deleteEvent(this.$stateParams.id)
            .then(function (event) {
            _this.utilsService.hideLoad();
            _this.hideActionSheet();
            _this.$ionicHistory.clearCache();
            _this.$ionicHistory.goBack();
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
            _this.hideActionSheet();
            _this.utilsService.alert({
                title: 'Error',
                template: error.message
            });
        });
    };
    EventDetailOrganizerCtrl.prototype.updateSponsorship = function (status) {
        var _this = this;
        this.utilsService.showLoad();
        var sponsorship = angular.copy(this.sponsorshipSelected);
        sponsorship.status = status;
        this.sponsorshipService.editSponzorshipPut(sponsorship.id, sponsorship)
            .then(function (sponsorship) {
            _this.utilsService.hideLoad();
            _this.sponsorshipSelected.status = sponsorship.status;
            var notification = {
                text: _this.event.title,
                link: '#/sponzors/sponzoring',
                modelId: sponsorship.id
            };
            if (sponsorship.status == 1) {
                _this.notificationService.sendAcceptSponsorship(notification, sponsorship.sponzor_id, sponsorship.ionic_id);
            }
            else if (sponsorship.status == 2) {
                _this.notificationService.sendRejectSponsorship(notification, sponsorship.sponzor_id, sponsorship.ionic_id);
            }
            _this.closeOptionsSponsorship();
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
            _this.closeOptionsSponsorship();
        });
    };
    EventDetailOrganizerCtrl.prototype.showActionSheet = function () {
        var _this = this;
        this.hideSheet = this.$ionicActionSheet.show({
            buttons: [
                { text: '<i class="icon ion-edit"></i> ' + this.$translate.instant("EVENTDETAIL.edit_event") },
                { text: '<i class="icon ion-share"></i> <b> ' + this.$translate.instant("EVENTDETAIL.share") + ' </br>' },
                { text: '<i class="icon ion-calendar"></i> ' + this.$translate.instant("EVENTDETAIL.add_calendar") }
            ],
            destructiveText: '<i class="icon ion-trash-a"></i> ' + this.$translate.instant("EVENTDETAIL.delete_event"),
            titleText: this.$translate.instant("EVENTDETAIL.options"),
            cancelText: '<i class="icon ion-close"></i> ' + this.$translate.instant("EVENTDETAIL.cancel"),
            buttonClicked: function (index) {
                if (index == 0) {
                    _this._editEvent();
                }
                else if (index == 1) {
                    _this._shareEvent();
                }
                else if (index == 2) {
                    _this._addToCalendar();
                }
                return true;
            },
            destructiveButtonClicked: function () {
                _this.deleteEvent();
                return true;
            }
        });
    };
    EventDetailOrganizerCtrl.prototype.hideActionSheet = function () {
        this.hideSheet();
    };
    EventDetailOrganizerCtrl.prototype.showModalTask = function () {
        this.modalTask.show();
    };
    EventDetailOrganizerCtrl.prototype.newTask = function (perk, indexPerk) {
        this.isNewTask = true;
        this.indexPerk = indexPerk;
        this.task.perk_id = perk.id;
        this.task.event_id = this.event.id;
        this.showModalTask();
    };
    EventDetailOrganizerCtrl.prototype.editTask = function (task, indexPerk, indexTask) {
        this.isNewTask = false;
        this.indexPerk = indexPerk;
        this.indexTask = indexTask;
        this.task = angular.copy(task);
        this.task.status = this.task.status == 1 ? true : false;
        this.showModalTask();
    };
    EventDetailOrganizerCtrl.prototype.createTask = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.perkTaskService.createPerkTask(this.preparateTask())
            .then(function (data) {
            _this.event.perks[_this.indexPerk].tasks.push(data.PerkTask);
            _this.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
            _this.userAuthService.updateUserAuth(_this.userAuth);
            _this._sendNewTaskNotification(data.PerkTask.title);
            _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
            _this.$rootScope.$broadcast('TaskTabsCtrl:count_tasks');
            _this.utilsService.resetForm(form);
            _this._hideModalTask(form);
            _this.utilsService.hideLoad();
        })
            .catch(function (error) {
            _this.utilsService.resetForm(form);
            _this._hideModalTask(form);
            _this.utilsService.hideLoad();
        });
    };
    EventDetailOrganizerCtrl.prototype.preparateTask = function () {
        return {
            user_id: this.userAuth.id,
            event_id: this.task.event_id,
            perk_id: this.task.perk_id,
            title: this.task.title,
            description: this.task.description,
            type: 0,
            status: 0
        };
    };
    EventDetailOrganizerCtrl.prototype.deleteTask = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.perkTaskService.deletePerkTask(this.task.id)
            .then(function (data) {
            _this.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
            _this._sendDeleteTaskNotification(_this.event.perks[_this.indexPerk].tasks[_this.indexTask].title);
            _this.event.perks[_this.indexPerk].tasks.splice(_this.indexTask, 1);
            _this.userAuthService.updateUserAuth(_this.userAuth);
            if (form)
                _this.utilsService.resetForm(form);
            _this._hideModalTask(form);
            _this.utilsService.hideLoad();
            _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
            _this.$rootScope.$broadcast('TaskTabsCtrl:count_tasks');
        })
            .catch(function (error) {
            _this._hideModalTask(form);
            if (form)
                _this.utilsService.resetForm(form);
            _this.utilsService.alert({
                template: error.message
            });
            _this.utilsService.hideLoad();
        });
    };
    EventDetailOrganizerCtrl.prototype.updateTask = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.task.status = this.task.status ? 1 : 0;
        this.perkTaskService.editPerkTaskPatch(this.task.id, this.task)
            .then(function (task) {
            _this._sendUpdateTaskNotification(task.title, _this.event.perks[_this.indexPerk].tasks[_this.indexTask].status == 0 && task.status == 1);
            _this.event.perks[_this.indexPerk].tasks[_this.indexTask] = task;
            _this.utilsService.resetForm(form);
            _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
            _this.$rootScope.$broadcast('TaskTabsCtrl:count_tasks');
            _this._hideModalTask(form);
            _this.utilsService.hideLoad();
        })
            .catch(function (error) {
            _this.utilsService.resetForm(form);
            _this._hideModalTask(form);
            _this.utilsService.hideLoad();
        });
    };
    EventDetailOrganizerCtrl.prototype.submitTask = function (form) {
        if (this.isNewTask) {
            this.createTask(form);
        }
        else {
            this.updateTask(form);
        }
    };
    EventDetailOrganizerCtrl.prototype._hideModalTask = function (form) {
        this.modalTask.hide();
        if (form)
            this.utilsService.resetForm(form);
        this.task = {};
        this.indexPerk = -1;
        this.indexTask = -1;
    };
    EventDetailOrganizerCtrl.prototype._filterByTypePerk = function (task) {
        return task.type == '0'; //Organizer
    };
    return EventDetailOrganizerCtrl;
}());
angular
    .module('app.events-organizer')
    .controller('EventDetailOrganizerCtrl', EventDetailOrganizerCtrl);
