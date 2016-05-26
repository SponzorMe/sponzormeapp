/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var TaskListCtrl = (function () {
    function TaskListCtrl($scope, $rootScope, $ionicModal, perkTaskService, userService, utilsService, userAuthService, notificationService, ionicMaterialInk) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$ionicModal = $ionicModal;
        this.perkTaskService = perkTaskService;
        this.userService = userService;
        this.utilsService = utilsService;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.ionicMaterialInk = ionicMaterialInk;
        this.$inject = [
            '$scope',
            '$rootScope',
            '$ionicModal',
            'perkTaskService',
            'userService',
            'utilsService',
            'userAuthService',
            'notificationService',
            'ionicMaterialInk'
        ];
        this.events = [];
        this.showEmptyState = false;
        this.indexEvent = -1;
        this.indexPerk = -1;
        this.indexTask = -1;
        this.modalTask = null;
        this.modalSponsorship = null;
        this.isNewTask = true;
        this.task = {};
        this.perk = {};
        if (ionic.Platform.isAndroid()) {
            this.ionicMaterialInk.displayEffect();
        }
        this.userAuth = this.userAuthService.getUserAuth();
        console.log(this.userAuth.events);
        this.events = this.userAuth.events.filter(this._filterEvents);
        this.events.forEach(this._preparateEvents, this);
        this.showEmptyState = this.events.length == 0 ? true : false;
        this._loadTaskModal();
        this._loadSponsorshipModal();
    }
    TaskListCtrl.prototype._filterEvents = function (event) {
        var count = event.perks.reduce(function (a, b) { return a.concat(b.tasks); }, []);
        var today = moment(new Date()).subtract(1, 'days');
        return moment(event.ends).isAfter(today) && count.length > 0;
    };
    TaskListCtrl.prototype._preparateEvents = function (event) {
        var _this = this;
        event.perks.forEach(function (perk) {
            perk.sponzorship = _.where(_this.userAuth.sponzorships_like_organizer, { perk_id: perk.id });
            perk.tasks = perk.tasks.filter(function (item) { return item.user_id == _this.userAuth.id; });
        });
    };
    TaskListCtrl.prototype._loadTaskModal = function () {
        var _this = this;
        this.$ionicModal.fromTemplateUrl('templates/tasks-organizer/task-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            _this.modalTask = modal;
        });
    };
    TaskListCtrl.prototype._loadSponsorshipModal = function () {
        var _this = this;
        this.$ionicModal.fromTemplateUrl('templates/tasks-organizer/sponsorship-detail-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            _this.modalSponsorship = modal;
        });
    };
    TaskListCtrl.prototype.doRefresh = function () {
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
    TaskListCtrl.prototype.sendNewTaskNotification = function (text) {
        for (var index = 0; index < this.events[this.indexEvent].perks[this.indexPerk].sponzorship.length; index++) {
            var sponsorship = this.events[this.indexEvent].perks[this.indexPerk].sponzorship[index];
            this.notificationService.sendNewTaskOrganizer({
                text: text,
                modelId: sponsorship.id
            }, sponsorship.sponzor_id, sponsorship.sponzor_ionic_id);
        }
    };
    TaskListCtrl.prototype.sendDeleteTaskNotification = function (text) {
        for (var index = 0; index < this.events[this.indexEvent].perks[this.indexPerk].sponzorship.length; index++) {
            var sponzorship = this.events[this.indexEvent].perks[this.indexPerk].sponzorship[index];
            this.notificationService.sendDeleteTaskOrganizer({
                text: text,
                modelId: sponzorship.id
            }, sponzorship.sponzor_id, sponzorship.sponzor_ionic_id);
        }
    };
    TaskListCtrl.prototype.sendUpdateTaskNotification = function (text, done) {
        for (var index = 0; index < this.events[this.indexEvent].perks[this.indexPerk].sponzorship.length; index++) {
            var sponsorship = this.events[this.indexEvent].perks[this.indexPerk].sponzorship[index];
            if (done) {
                this.notificationService.sendUpdateTaskOrganizer({
                    text: text,
                    modelId: sponsorship.id
                }, sponsorship.sponzor_id, sponsorship.sponzor_ionic_id);
            }
            else {
                this.notificationService.sendDoneTaskOrganizer({
                    text: text,
                    modelId: sponsorship.id
                }, sponsorship.sponzor_id, sponsorship.sponzor_ionic_id);
            }
        }
    };
    TaskListCtrl.prototype.openSponsorship = function (perk) {
        this.perk = perk;
        this.modalSponsorship.show();
    };
    TaskListCtrl.prototype.hideModalSponsorship = function () {
        this.modalSponsorship.hide();
        this.perk = {};
    };
    TaskListCtrl.prototype.showModalTask = function () {
        this.modalTask.show();
    };
    TaskListCtrl.prototype.newTask = function (perk, indexEvent, indexPerk) {
        this.isNewTask = true;
        this.indexEvent = indexEvent;
        this.indexPerk = indexPerk;
        this.task.perk_id = perk.id;
        this.task.event_id = perk.id_event;
        this.showModalTask();
    };
    TaskListCtrl.prototype.hideModalTask = function (form) {
        this.modalTask.hide();
        if (form)
            this.utilsService.resetForm(form);
        this.task = {};
    };
    TaskListCtrl.prototype.editTask = function (task, indexEvent, indexPerk, indexTask) {
        this.isNewTask = false;
        this.indexEvent = indexEvent;
        this.indexPerk = indexPerk;
        this.indexTask = indexTask;
        this.task = angular.copy(task);
        this.task.status = this.task.status == 1 ? true : false;
        this.showModalTask();
    };
    TaskListCtrl.prototype.createTask = function (form) {
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
            _this.$rootScope.$broadcast('TaskListCtrl:getTasks');
            _this.$rootScope.$broadcast('TaskTabsCtrl:count_tasks');
        })
            .catch(function (error) {
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
        });
    };
    TaskListCtrl.prototype.preparateTask = function () {
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
    TaskListCtrl.prototype.deleteTask = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.perkTaskService.deletePerkTask(this.task.id)
            .then(function (data) {
            _this.userAuth.sponzorships_like_organizer = data.sponzorships_like_organizer;
            _this.userAuth = _this.userAuthService.updateUserAuth(_this.userAuth);
            _this.sendDeleteTaskNotification(_this.events[_this.indexEvent].perks[_this.indexPerk].tasks[_this.indexTask].title);
            _this.events[_this.indexEvent].perks[_this.indexPerk].tasks.splice(_this.indexTask, 1);
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
            _this.$rootScope.$broadcast('TaskListCtrl:getTasks');
            _this.$rootScope.$broadcast('TaskTabsCtrl:count_tasks');
            _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
        })
            .catch(function (error) {
            _this.hideModalTask(form);
            _this.utilsService.alert({
                template: error.message
            });
            _this.utilsService.hideLoad();
        });
    };
    TaskListCtrl.prototype.updateTask = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.task.status = this.task.status ? 1 : 0;
        this.perkTaskService.editPerkTaskPatch(this.task.id, this.task)
            .then(function (task) {
            _this.utilsService.resetForm(form);
            _this.sendUpdateTaskNotification(task.title, _this.events[_this.indexEvent].perks[_this.indexPerk].tasks[_this.indexTask].status == false && task.status);
            _this.events[_this.indexEvent].perks[_this.indexPerk].tasks[_this.indexTask] = task;
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
            _this.$rootScope.$broadcast('TaskListCtrl:getTasks');
            _this.$rootScope.$broadcast('TaskTabsCtrl:count_tasks');
            _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
        })
            .catch(function (error) {
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
        });
    };
    TaskListCtrl.prototype.submitTask = function (form) {
        if (this.isNewTask) {
            this.createTask(form);
        }
        else {
            this.updateTask(form);
        }
    };
    TaskListCtrl.prototype._registerListenerTaskListCtrl = function () {
        var _this = this;
        this.$rootScope.$on('TaskListCtrl:getTasks', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.events = _this.userAuth.events.filter(_this._filterEvents);
            _this.events.forEach(_this._preparateEvents, _this);
            _this.showEmptyState = _this.events.length == 0 ? true : false;
        });
    };
    return TaskListCtrl;
}());
angular
    .module('app.tasks-organizer')
    .controller('TaskListCtrl', TaskListCtrl);
