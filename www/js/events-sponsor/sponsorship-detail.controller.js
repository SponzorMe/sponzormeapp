/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SponsorshipSponsorDetailCtrl = (function () {
    function SponsorshipSponsorDetailCtrl($scope, $stateParams, $translate, $ionicModal, $ionicHistory, $cordovaToast, utilsService, tasksSponsorService, userAuthService, notificationService) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$translate = $translate;
        this.$ionicModal = $ionicModal;
        this.$ionicHistory = $ionicHistory;
        this.$cordovaToast = $cordovaToast;
        this.utilsService = utilsService;
        this.tasksSponsorService = tasksSponsorService;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.$inject = [
            '$scope',
            '$stateParams',
            '$translate',
            '$ionicModal',
            '$ionicHistory',
            '$cordovaToast',
            'utilsService',
            'tasksSponsorService',
            'userAuthService',
            'notificationService'
        ];
        this.sponsorship = {};
        this.modalTask = null;
        this.isNewTask = true;
        this.sponsorTask = { task: {} };
        this.indexSlide = 0;
        this.userAuth = this.userAuthService.getUserAuth();
        this.sponsorship = _.findWhere(this.userAuth.sponzorship, { id: $stateParams.id });
        this.sponsorship.task_sponzor = this.sponsorship.task_sponzor.filter(this._filterTaskSponsor);
        this._loadModalTask();
    }
    SponsorshipSponsorDetailCtrl.prototype.slideChange = function (index) {
        this.indexSlide = index;
    };
    SponsorshipSponsorDetailCtrl.prototype.showModalTask = function () {
        this.modalTask.show();
    };
    SponsorshipSponsorDetailCtrl.prototype.newTask = function () {
        this.isNewTask = true;
        this.showModalTask();
    };
    SponsorshipSponsorDetailCtrl.prototype.hideModalTask = function (form) {
        this.modalTask.hide();
        if (form)
            this.utilsService.resetForm(form);
        this.sponsorTask = { task: {} };
    };
    SponsorshipSponsorDetailCtrl.prototype.editTask = function (task) {
        this.isNewTask = false;
        this.sponsorTask = angular.copy(task);
        this.sponsorTask.status = this.sponsorTask.status == 1 ? true : false;
        this.showModalTask();
    };
    SponsorshipSponsorDetailCtrl.prototype.createTask = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.tasksSponsorService.createTask(this._preparateTask())
            .then(function (TaskSponzor) {
            _this.sponsorship.perk.tasks.push(TaskSponzor.task);
            _this.sponsorship.task_sponzor.push(TaskSponzor);
            _this.hideModalTask(form);
            _this.notificationService.sendNewTaskSponsor({
                text: TaskSponzor.task.title,
                modelId: _this.sponsorship.id
            }, TaskSponzor.organizer_id);
            _this.utilsService.hideLoad();
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    SponsorshipSponsorDetailCtrl.prototype.deleteTask = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.tasksSponsorService.deleteTask(this.sponsorTask.id)
            .then(function (data) {
            var perkTask = _.findWhere(_this.sponsorship.perk.tasks, { id: _this.sponsorTask.task.id });
            var taskSponzor = _.findWhere(_this.sponsorship.task_sponzor, { id: _this.sponsorTask.id });
            var indexPerkTask = _.indexOf(_this.sponsorship.perk.tasks, perkTask);
            var indexSponzorTask = _.indexOf(_this.sponsorship.task_sponzor, taskSponzor);
            _this.sponsorship.perk.tasks.splice(indexPerkTask, 1);
            _this.sponsorship.task_sponzor.splice(indexSponzorTask, 1);
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
        })
            .catch(function (error) {
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
        });
    };
    SponsorshipSponsorDetailCtrl.prototype.updateTask = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        var task = this._preparateTask();
        task.id = this.sponsorTask.id;
        this.tasksSponsorService.editPutTask(String(task.id), task)
            .then(function (TaskSponsor) {
            var perkTask = _.findWhere(_this.sponsorship.perk.tasks, { id: _this.sponsorTask.task.id });
            var taskSponzor = _.findWhere(_this.sponsorship.task_sponzor, { id: _this.sponsorTask.id });
            var indexPerkTask = _.indexOf(_this.sponsorship.perk.tasks, perkTask);
            var indexSponzorTask = _.indexOf(_this.sponsorship.task_sponzor, taskSponzor);
            if (_this.sponsorTask.status == 1 && TaskSponsor.status == "1") {
                _this.notificationService.sendDoneTaskSponsor({
                    text: _this.sponsorTask.task.title,
                    modelId: _this.sponsorship.id
                }, TaskSponsor.organizer_id);
            }
            else {
                _this.notificationService.sendUpdateTaskSponsor({
                    text: _this.sponsorTask.task.title,
                    modelId: _this.sponsorship.id
                }, TaskSponsor.organizer_id);
            }
            _this.sponsorship.perk.tasks[indexPerkTask] = _this.sponsorTask.task;
            _this.sponsorship.task_sponzor[indexSponzorTask] = _this.sponsorTask;
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
        })
            .catch(function (error) {
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
        });
    };
    SponsorshipSponsorDetailCtrl.prototype.submitTask = function (form) {
        if (this.isNewTask) {
            this.createTask(form);
        }
        else {
            this.updateTask(form);
        }
    };
    SponsorshipSponsorDetailCtrl.prototype._preparateTask = function () {
        return {
            id: -1,
            type: 1,
            status: this.sponsorTask.status ? 1 : 0,
            perk_id: this.sponsorship.perk.id,
            event_id: this.sponsorship.event.id,
            sponzorship_id: this.sponsorship.id,
            user_id: this.userAuth.id,
            organizer_id: this.sponsorship.organizer.id,
            sponzor_id: this.userAuth.id,
            title: this.sponsorTask.task.title,
            description: this.sponsorTask.task.description,
            task_id: this.sponsorTask.task.id
        };
    };
    SponsorshipSponsorDetailCtrl.prototype._loadModalTask = function () {
        var _this = this;
        this.$ionicModal.fromTemplateUrl('templates/events-sponsor/task-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            _this.modalTask = modal;
        });
    };
    SponsorshipSponsorDetailCtrl.prototype._filterTaskSponsor = function (item) {
        return item.task.user_id == this.userAuth.id;
    };
    return SponsorshipSponsorDetailCtrl;
}());
angular
    .module('app.events-sponzor')
    .controller('SponsorshipSponsorDetailCtrl', SponsorshipSponsorDetailCtrl);
