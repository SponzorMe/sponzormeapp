/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2

*/
var PastTasksCtrl = (function () {
    function PastTasksCtrl($scope, $rootScope, $ionicModal, perkTaskService, userService, utilsService, userAuthService, notificationService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$ionicModal = $ionicModal;
        this.perkTaskService = perkTaskService;
        this.userService = userService;
        this.utilsService = utilsService;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.$inject = [
            '$scope',
            '$rootScope',
            '$ionicModal',
            'perkTaskService',
            'userService',
            'utilsService',
            'userAuthService',
            'notificationService'
        ];
        this.events = [];
        this.showEmptyState = false;
        this.indexEvent = -1;
        this.indexPerk = -1;
        this.indexTask = -1;
        this.modalTask = null;
        this.isNewTask = true;
        this.task = {};
        this.userAuth = this.userAuthService.getUserAuth();
        this.events = this.userAuth.events.filter(this._filterEvents);
        this.events.forEach(this._preparateEvents, this);
        this.showEmptyState = this.events.length == 0 ? true : false;
        this._loadTaskModal();
    }
    PastTasksCtrl.prototype._filterEvents = function (event) {
        var count = event.perks.reduce(function (a, b) { return a.concat(b.tasks); }, []);
        return moment(event.ends).isBefore(new Date()) && count.length > 0;
    };
    PastTasksCtrl.prototype._preparateEvents = function (event) {
        var _this = this;
        event.perks = event.perks.map(function (perk) {
            perk.sponzorship = _.where(_this.userAuth.sponzorships_like_organizer, { perk_id: perk.id });
        });
        return event;
    };
    PastTasksCtrl.prototype._loadTaskModal = function () {
        var _this = this;
        this.$ionicModal.fromTemplateUrl('templates/tasks-organizer/task-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            _this.modalTask = modal;
        });
    };
    PastTasksCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.$scope.$broadcast('scroll.refreshComplete');
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.events = _this.userAuth.events.filter(_this._filterEvents);
            _this.events.forEach(_this._preparateEvents, _this);
            _this.showEmptyState = _this.events.length == 0 ? true : false;
            _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
            _this.$rootScope.$broadcast('TaskTabsCtrl:count_tasks');
        })
            .catch(function (error) {
            _this.$scope.$broadcast('scroll.refreshComplete');
        });
    };
    PastTasksCtrl.prototype.sendNewTaskNotification = function (text) {
        for (var index = 0; index < this.events[this.indexEvent].perks[this.indexPerk].sponzorship.length; index++) {
            var sponzorship = this.events[this.indexEvent].perks[this.indexPerk].sponzorship[index];
            this.notificationService.sendNewTaskOrganizer({
                text: text,
                modelId: sponzorship.id
            }, sponzorship.sponzor_id);
        }
    };
    PastTasksCtrl.prototype.sendUpdateTaskNotification = function (text, done) {
        for (var index = 0; index < this.events[this.indexEvent].perks[this.indexPerk].sponzorship.length; index++) {
            var sponzorship = this.events[this.indexEvent].perks[this.indexPerk].sponzorship[index];
            if (done) {
                this.notificationService.sendDoneTaskOrganizer({
                    text: text,
                    modelId: sponzorship.id
                }, sponzorship.sponzor_id);
            }
            else {
                this.notificationService.sendUpdateTaskOrganizer({
                    text: text,
                    modelId: sponzorship.id
                }, sponzorship.sponzor_id);
            }
        }
    };
    PastTasksCtrl.prototype.showModalTask = function () {
        this.modalTask.show();
    };
    PastTasksCtrl.prototype.newTask = function (perk, indexEvent, indexPerk) {
        this.isNewTask = true;
        this.indexEvent = indexEvent;
        this.indexPerk = indexPerk;
        this.task.perk_id = perk.id;
        this.task.event_id = perk.id_event;
        this.showModalTask();
    };
    PastTasksCtrl.prototype.hideModalTask = function (form) {
        this.modalTask.hide();
        if (form)
            this.utilsService.resetForm(form);
        this.task = {};
    };
    PastTasksCtrl.prototype.editTask = function (task, indexEvent, indexPerk, indexTask) {
        this.isNewTask = false;
        this.indexEvent = indexEvent;
        this.indexPerk = indexPerk;
        this.indexTask = indexTask;
        this.task = angular.copy(task);
        this.task.status = this.task.status == 1 ? true : false;
        this.showModalTask();
    };
    PastTasksCtrl.prototype.createTask = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.perkTaskService.createPerkTask(this.preparateTask())
            .then(function (data) {
            _this.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
            _this.userAuth = _this.userAuthService.updateUserAuth(_this.userAuth);
            _this.events[_this.indexEvent].perks[_this.indexPerk].tasks.push(data.PerkTask);
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
            _this.sendNewTaskNotification(data.PerkTask.title);
            _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
        })
            .catch(function (error) {
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
        });
    };
    PastTasksCtrl.prototype.preparateTask = function () {
        return {
            user_id: this.userAuth.id,
            event_id: this.task.event_id,
            perk_id: this.task.perk_id,
            title: this.task.title,
            description: this.task.description,
            type: 0,
            status: this.task.status ? 1 : 0
        };
    };
    PastTasksCtrl.prototype.deleteTask = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.perkTaskService.deletePerkTask(this.task.id)
            .then(function (data) {
            _this.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
            _this.userAuth = _this.userAuthService.updateUserAuth(_this.userAuth);
            _this.events[_this.indexEvent].perks[_this.indexPerk].tasks.splice(_this.indexTask, 1);
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
            _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
            _this.$rootScope.$broadcast('TaskTabsController:count_tasks');
        })
            .catch(function (error) {
            _this.hideModalTask(form);
            _this.utilsService.alert({
                template: error.message
            });
            _this.utilsService.hideLoad();
        });
    };
    PastTasksCtrl.prototype.updateTask = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.task.status = this.task.status ? 1 : 0;
        this.perkTaskService.editPerkTaskPatch(this.task.id, this.task)
            .then(function (task) {
            _this.utilsService.resetForm(form);
            _this.sendUpdateTaskNotification(task.title, _this.events[_this.indexEvent].perks[_this.indexPerk].tasks[_this.indexTask].status == 0 && task.status == 1);
            _this.events[_this.indexEvent].perks[_this.indexPerk].tasks[_this.indexTask] = task;
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
            _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
            _this.$rootScope.$broadcast('TaskTabsController:count_tasks');
        })
            .catch(function (error) {
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
        });
    };
    PastTasksCtrl.prototype.submitTask = function (form) {
        if (this.isNewTask) {
            this.createTask(form);
        }
        else {
            this.updateTask(form);
        }
    };
    return PastTasksCtrl;
}());
angular
    .module('app.tasks-organizer')
    .controller('PastTasksCtrl', PastTasksCtrl);
