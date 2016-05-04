/// <reference path="../typings/tsd.d.ts" />
/**
* @File the start the app
*
* @author Nicolas Molina
* @version 0.1
*/
(function () {
    'use strict';
    angular.module('app', [
        // Core 
        'ionic',
        'ionic.service.core',
        'ionic.service.auth',
        'ionic.service.push',
        'ionic.service.deploy',
        'ionic.service.analytics',
        'ngCordova',
        'google.places',
        'firebase',
        'angularMoment',
        //'ngCordovaMocks',
        'ngMessages',
        'ngStorage',
        'ngSanitize',
        'ngAnimate',
        'ngIOS9UIWebViewPatch',
        'pascalprecht.translate',
        'base64',
        'tabSlideBox',
        //Widgets
        'app.widgets',
        'app.filters',
        //Feature areas
        'app.users',
        'app.dashboard-organizer',
        'app.dashboard-sponzor',
        'app.events-organizer',
        'app.events-sponzor',
        'app.sponsors-organizer',
        'app.tasks-organizer'
    ]);
})();

/// <reference path="../typings/tsd.d.ts" />
/**
* @author Nicolas Molina
* @version 0.1
*/
(function () {
    'use strict';
    angular
        .module('app')
        .config(routeConfig);
    function routeConfig($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider, $ionicAutoTrackProvider) {
        $ionicConfigProvider.views.swipeBackEnabled(false);
        $ionicConfigProvider.scrolling.jsScrolling(false);
        $ionicConfigProvider.views.maxCache(10);
        $ionicConfigProvider.backButton.text('');
        $ionicAutoTrackProvider.disableTracking('Tap');
        $ionicAutoTrackProvider.disableTracking('Load');
        function getDefaultRoute() {
            function userType() {
                var userAuth = JSON.parse(localStorage.getItem('ngStorage-userAuth'));
                if (userAuth.type == 0)
                    return "/organizer/home";
                return "/sponzor/home";
            }
            if (localStorage.getItem('ngStorage-token') && localStorage.getItem('ngStorage-userAuth')) {
                return userType();
            }
            return "/sign-in";
        }
        $urlRouterProvider.otherwise(getDefaultRoute());
        $stateProvider
            .state('signin', {
            url: '/sign-in',
            templateUrl: 'templates/users/login.html',
            controller: 'LoginCtrl as login'
        })
            .state('joinnow', {
            url: "/joinnow",
            templateUrl: "templates/users/register.html",
            controller: "RegisterCtrl as register"
        })
            .state('profile', {
            url: "/profile",
            templateUrl: "templates/users/form-profile.html",
            controller: "FormProfileCtrl as profile"
        })
            .state('interests', {
            url: "/interests",
            templateUrl: "templates/users/form-interests.html",
            controller: "FormInterestsCtrl as interests"
        })
            .state('forgot-password', {
            url: "/forgot-password",
            templateUrl: "templates/users/forgot-password.html",
            controller: "ForgotCtrl as forgot"
        })
            .state('organizer', {
            url: "/organizer",
            abstract: true,
            templateUrl: "templates/dashboard-organizer/menu.html",
            controller: "MenuOrganizerCtrl as menu"
        })
            .state('organizer.intro', {
            url: "/intro",
            views: {
                'menuContent': {
                    templateUrl: "templates/dashboard-organizer/intro.html",
                    controller: "IntroOrganizerCtrl as intro"
                }
            }
        })
            .state('organizer.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/dashboard-organizer/home.html",
                    controller: "HomeOrganizerCtrl as home"
                }
            }
        })
            .state('organizer.profile', {
            url: "/profile",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/profile.html",
                    controller: "ProfileCtrl as profile"
                }
            }
        })
            .state('organizer.events', {
            url: "/events",
            abstract: true,
            views: {
                'menuContent': {
                    templateUrl: "templates/events-organizer/event-list-tabs.html",
                    controller: "EventsTabsOrganizerCtrl as tabs"
                }
            }
        })
            .state('organizer.events.list', {
            url: "/list",
            views: {
                'tabEventList': {
                    templateUrl: "templates/events-organizer/event-list.html",
                    controller: "EventListOrganizerCtrl as eventList"
                }
            }
        })
            .state('organizer.events.detail-list', {
            url: "/event/:id",
            views: {
                'tabEventList': {
                    templateUrl: "templates/events-organizer/event-detail.html",
                    controller: "EventDetailOrganizerCtrl as eventDetail"
                }
            }
        })
            .state('organizer.events.past', {
            url: "/past",
            views: {
                'tabPastEvents': {
                    templateUrl: "templates/events-organizer/past-events.html",
                    controller: "PastEventsOrganizerCtrl as eventList"
                }
            }
        })
            .state('organizer.events.detail-past', {
            url: "/past-event/:id",
            views: {
                'tabPastEvents': {
                    templateUrl: "templates/events-organizer/event-detail.html",
                    controller: "EventDetailOrganizerCtrl as eventDetail"
                }
            }
        })
            .state('organizer.addevent', {
            url: "/addevent",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-organizer/add-event.html",
                    controller: "AddEventCtrl as addEvent"
                }
            },
            cache: false
        })
            .state('organizer.editevent', {
            url: "/editevent/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-organizer/edit-event.html",
                    controller: "EditEventCtrl as editEvent"
                }
            },
            cache: false
        })
            .state('organizer.event', {
            url: "/event/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-organizer/event-detail.html",
                    controller: "EventDetailOrganizerCtrl as eventDetail"
                }
            }
        })
            .state('organizer.sponsorships', {
            url: "/sponsorships",
            views: {
                'menuContent': {
                    templateUrl: "templates/sponsors-organizer/sponsorships-tabs.html",
                    controller: "SponsorshipsTabsCtrl as tabs"
                }
            }
        })
            .state('organizer.sponsorships.list', {
            url: "/list",
            views: {
                'tabEventList': {
                    templateUrl: "templates/sponsors-organizer/sponsorships-list.html",
                    controller: "SponsorshipsListCtrl as list"
                }
            }
        })
            .state('organizer.sponsorships.past', {
            url: "/past",
            views: {
                'tabPastEvents': {
                    templateUrl: "templates/sponsors-organizer/sponsorships-past-events.html",
                    controller: "SponsorshipsPastEventsCtrl as list"
                }
            }
        })
            .state('organizer.sponsorship', {
            url: "/sponsorship/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/sponsors-organizer/sponsorship-detail.html",
                    controller: "SponsorshipOrganizerDetailCtrl as detail"
                }
            }
        })
            .state('organizer.tasks', {
            url: "/tasks",
            abstract: true,
            views: {
                'menuContent': {
                    templateUrl: "templates/tasks-organizer/task-list-tabs.html",
                    controller: "TaskTabsCtrl as tabs"
                }
            }
        })
            .state('organizer.tasks.list', {
            url: "/list",
            views: {
                'tabTasksList': {
                    templateUrl: "templates/tasks-organizer/task-list.html",
                    controller: "TaskListCtrl as taskList"
                }
            }
        })
            .state('organizer.tasks.list-past', {
            url: "/past",
            views: {
                'tabPastTasks': {
                    templateUrl: "templates/tasks-organizer/past-tasks.html",
                    controller: "PastTasksCtrl as taskList"
                }
            }
        })
            .state('organizer.invite', {
            url: "/invite",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/invite-users.html",
                    controller: "InviteUsersCtrl as invite"
                }
            }
        })
            .state('organizer.settings', {
            url: "/settings",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/settings.html",
                    controller: "SettingsCtrl as settings"
                }
            }
        })
            .state('organizer.notifications', {
            url: "/notifications",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/notifications.html",
                    controller: "NotificationsCtrl as list"
                }
            }
        })
            .state('sponzor', {
            url: "/sponzor",
            abstract: true,
            templateUrl: "templates/dashboard-sponzor/menu.html",
            controller: "MenuSponsorCtrl as menu"
        })
            .state('sponzor.intro', {
            url: "/intro",
            views: {
                'menuContent': {
                    templateUrl: "templates/dashboard-sponzor/intro.html",
                    controller: "IntroSponsorCtrl as intro"
                }
            }
        })
            .state('sponzor.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/dashboard-sponzor/home.html",
                    controller: "HomeSponsorCtrl as home"
                }
            }
        })
            .state('sponzor.following', {
            url: "/following",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-sponsor/follow-events.html",
                    controller: "FollowEventsCtrl as list"
                }
            }
        })
            .state('sponzor.sponzoring', {
            url: "/sponzoring",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-sponsor/sponsoring-events.html",
                    controller: "SponsoringEventsCtrl as sponzoring"
                }
            }
        })
            .state('sponzor.profile', {
            url: "/profile",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/profile.html",
                    controller: "ProfileCtrl as profile"
                }
            }
        })
            .state('sponzor.event', {
            url: "/event/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-sponsor/event-detail.html",
                    controller: "EventDetailSponsorCtrl as eventDetail"
                }
            }
        })
            .state('sponzor.sponsorship', {
            url: "/sponsorship/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-sponsor/sponsorship-detail.html",
                    controller: "SponsorshipSponsorDetailCtrl as detail"
                }
            }
        })
            .state('sponzor.invite', {
            url: "/invite",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/invite-users.html",
                    controller: "InviteUsersCtrl as invite"
                }
            }
        })
            .state('sponzor.settings', {
            url: "/settings",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/settings.html",
                    controller: "SettingsCtrl as settings"
                }
            }
        })
            .state('sponzor.notifications', {
            url: "/notifications",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/notifications.html",
                    controller: "NotificationsCtrl as list"
                }
            }
        });
        // Languages
        $translateProvider.useStaticFilesLoader({
            prefix: 'langs/lang-',
            suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.preferredLanguage("en");
        $translateProvider.fallbackLanguage("en");
    }
})();

/// <reference path="../typings/tsd.d.ts" />
(function () {
    'use strict';
    angular
        .module('app')
        .constant('moment', moment);
})();

/// <reference path="../typings/tsd.d.ts" />
/**
* @author Nicolas Molina
* @version 0.1
*/
(function () {
    'use strict';
    angular
        .module('app')
        .value('BackendVariables', {
        url: "https://apistaging.sponzor.me/",
        f_url: "https://sponzorme.firebaseio.com/staging/",
        url_web: "https://sponzor.me/",
        version: "v1.1.1",
        channel: "dev"
    })
        .value('AMAZON', {
        'AMAZONSECRET': 'RlzqEBFUlJW/8YGkeasfmTZRLTlWMWwaBpJNBxu6',
        'AMAZONKEY': 'AKIAJDGUKWK3H7SJZKSQ',
        'AMAZONBUCKET': 'sponzormewebappimages',
        'AMAZONBUCKETREGION': 'us-west-2',
        'AMAZONBUCKETURL': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/'
    })
        .value('IONIC', {
        'TOKEN': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0MDU3MDJkMi1lZDdkLTRiNGEtYTMzNC1jNDZjMWVlZDJmM2YifQ.atiOm4djFPeewnRRNIzc5Wba3m0rkozNRBouEI1DcaE',
        'PROFILE': 'production',
        'URL': 'https://api.ionic.io/push/notifications'
    });
})();

/// <reference path="../../typings/tsd.d.ts" />
(function () {
    'use strict';
    angular.module('app.dashboard-organizer', []);
})();

/// <reference path="../../typings/tsd.d.ts" />
(function () {
    'use strict';
    angular.module('app.dashboard-sponzor', []);
})();

/// <reference path="../../typings/tsd.d.ts" />
(function () {
    'use strict';
    angular.module('app.events-organizer', []);
})();

/// <reference path="../../typings/tsd.d.ts" />
(function () {
    'use strict';
    angular.module('app.events-sponzor', []);
})();

/// <reference path="../../typings/tsd.d.ts" />
(function () {
    'use strict';
    angular.module('app.filters', []);
})();

/// <reference path="../../typings/tsd.d.ts" />
(function () {
    'use strict';
    angular.module('app.sponsors-organizer', []);
})();

/// <reference path="../../typings/tsd.d.ts" />
(function () {
    'use strict';
    angular.module('app.tasks-organizer', []);
})();

/// <reference path="../../typings/tsd.d.ts" />
(function () {
    'use strict';
    angular.module('app.users', []);
})();

/// <reference path="../../typings/tsd.d.ts" />
(function () {
    'use strict';
    angular.module('app.widgets', []);
})();

/// <reference path="../../typings/tsd.d.ts" />
/**
* categoryService
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
var categoryModule;
(function (categoryModule) {
    var categoryService = (function () {
        function categoryService($http, $localStorage, $q, BackendVariables) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.$q = $q;
            this.BackendVariables = BackendVariables;
            this.$inject = [
                '$http',
                '$localStorage',
                'BackendVariables',
                '$q',
            ];
            this.path = this.BackendVariables.url;
        }
        categoryService.prototype.allCategories = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "categories"
            })
                .then(function (response) { return _this.$q.when(_this._preparateCategories(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        categoryService.prototype.getCategory = function (categoryId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "categories/" + categoryId
            })
                .then(function (response) { return _this.$q.when(_this._preparateCategory(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        categoryService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        categoryService.prototype._preparateCategories = function (data) {
            return data.categories;
        };
        categoryService.prototype._preparateCategory = function (data) {
            return data.data.category;
        };
        return categoryService;
    }());
    categoryModule.categoryService = categoryService;
    angular
        .module('app')
        .service('categoryService', categoryService);
})(categoryModule || (categoryModule = {}));

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="eventType.service.ts" />
/**
* @Servicio de Eventos
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
var eventModule;
(function (eventModule) {
    var eventService = (function () {
        function eventService($http, $localStorage, $q, BackendVariables) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.$q = $q;
            this.BackendVariables = BackendVariables;
            this.$inject = [
                '$http',
                '$localStorage',
                'BackendVariables',
                '$q'
            ];
            this.path = this.BackendVariables.url;
        }
        eventService.prototype.allEvents = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "events"
            })
                .then(function (response) { return _this.$q.when(_this._preparateEvents(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventService.prototype.getEvent = function (eventId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "events/" + eventId
            })
                .then(function (response) { return _this.$q.when(_this._preparateEvent(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventService.prototype.createEvent = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "events",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateEvent(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventService.prototype.deleteEvent = function (eventId) {
            var _this = this;
            return this.$http({
                method: 'DELETE',
                url: this.path + "events/" + eventId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventService.prototype.editEventPut = function (eventId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + "events/" + eventId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateEvent(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventService.prototype.buildEvent = function (event) {
            event.image = (event.image == undefined || event.image == "event_dummy.png" || event.image == "") ? 'img/banner.jpg' : event.image;
            if (event.user_organizer) {
                event.user_organizer.image = (event.user_organizer.image == "organizer_sponzorme.png" || event.user_organizer.image == "") ? 'img/photo.png' : event.user_organizer.image;
            }
            event.starts = moment(event.starts).toDate();
            event.ends = moment(event.ends).toDate();
            event.privacy = event.privacy || "0" == "1" ? true : false;
            return event;
        };
        eventService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        eventService.prototype._preparateEvents = function (data) {
            return data.data.events.map(this.buildEvent);
        };
        eventService.prototype._preparateEvent = function (data) {
            return this.buildEvent(data.event);
        };
        return eventService;
    }());
    eventModule.eventService = eventService;
    angular
        .module('app')
        .service('eventService', eventService);
})(eventModule || (eventModule = {}));

/// <reference path="../../typings/tsd.d.ts" />
/**
* @Service de eventType
*
* @author Nicolas Molina
* @version 0.2
*/
var eventTypeModule;
(function (eventTypeModule) {
    var eventTypeService = (function () {
        function eventTypeService($http, $localStorage, $q, BackendVariables) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.$q = $q;
            this.BackendVariables = BackendVariables;
            this.$inject = [
                '$http',
                '$localStorage',
                'BackendVariables',
                '$q'
            ];
            this.path = this.BackendVariables.url;
        }
        eventTypeService.prototype.allEventTypes = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "event_types"
            })
                .then(function (response) { return _this.$q.when(_this._preparateEventsTypes(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventTypeService.prototype.getEventType = function (eventTypeId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "event_types/" + eventTypeId
            })
                .then(function (response) { return _this.$q.when(_this._preparateEventType(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        eventTypeService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        eventTypeService.prototype._preparateEventsTypes = function (data) {
            return data.eventTypes;
        };
        eventTypeService.prototype._preparateEventType = function (data) {
            return data.data.eventTypes;
        };
        return eventTypeService;
    }());
    eventTypeModule.eventTypeService = eventTypeService;
    angular
        .module('app')
        .service('eventTypeService', eventTypeService);
})(eventTypeModule || (eventTypeModule = {}));

/// <reference path="../../typings/tsd.d.ts" />
/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
var imgurModule;
(function (imgurModule) {
    var imgurService = (function () {
        function imgurService($http, $q) {
            this.$http = $http;
            this.$q = $q;
            this.$inject = [
                '$http',
                '$q'
            ];
            this.path = 'https://api.imgur.com/3/';
            this.clientId = "bdff09d775f47b9";
        }
        imgurService.prototype.uploadImage = function (image) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "image",
                headers: {
                    'Authorization': "Client-ID " + this.clientId
                },
                data: {
                    image: image,
                    type: 'base64'
                }
            })
                .then(function (response) { return _this.$q.when(_this._preparateImage(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        imgurService.prototype._preparateImage = function (data) {
            return data.data.link;
        };
        return imgurService;
    }());
    imgurModule.imgurService = imgurService;
    angular
        .module('app')
        .service('imgurService', imgurService);
})(imgurModule || (imgurModule = {}));

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="user.service.ts" />
/// <reference path="userAuth.service.ts" />
/// <reference path="push.service.ts" />
var notificationModule;
(function (notificationModule) {
    var notificationService = (function () {
        function notificationService($http, $q, $localStorage, $rootScope, $translate, $firebaseArray, $ionicHistory, BackendVariables, userService, userAuthService, pushService) {
            this.$http = $http;
            this.$q = $q;
            this.$localStorage = $localStorage;
            this.$rootScope = $rootScope;
            this.$translate = $translate;
            this.$firebaseArray = $firebaseArray;
            this.$ionicHistory = $ionicHistory;
            this.BackendVariables = BackendVariables;
            this.userService = userService;
            this.userAuthService = userAuthService;
            this.pushService = pushService;
            this.$inject = [
                '$http',
                '$q',
                '$localStorage',
                '$rootScope',
                '$translate',
                '$firebaseArray',
                '$ionicHistory',
                'BackendVariables',
                'userService',
                'userAuthService',
                'pushService'
            ];
            this.path = this.BackendVariables.f_url;
        }
        notificationService.prototype.activate = function () {
            this.userAuth = this.userAuthService.getUserAuth();
            this._notificationForMe();
            if (this.userAuth.type == '1')
                this._updateEvents();
        };
        notificationService.prototype.getNotifications = function (userId) {
            var url = this.path + "notifications/" + userId;
            return this.$firebaseArray(new Firebase(url));
        };
        notificationService.prototype.sendNewSponsorship = function (notification, to, ionicId) {
            notification.typeNotification = "newSponsorship";
            notification.type = "sponsorship";
            notification.pushNotification = true;
            notification.hide = false;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendAcceptSponsorship = function (notification, to, ionicId) {
            notification.typeNotification = "acceptSponsorship";
            notification.type = "sponsorship";
            notification.pushNotification = true;
            notification.hide = false;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendRejectSponsorship = function (notification, to, ionicId) {
            notification.typeNotification = "rejectSponsorship";
            notification.type = "sponsorship";
            notification.pushNotification = true;
            notification.hide = false;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendNewTaskOrganizer = function (notification, to, ionicId) {
            notification.typeNotification = "newTaskOrganizer";
            notification.type = "task";
            notification.pushNotification = true;
            notification.hide = false;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendUpdateTaskOrganizer = function (notification, to, ionicId) {
            notification.typeNotification = "doneTaskOrganizer";
            notification.type = "task";
            notification.pushNotification = true;
            notification.hide = false;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendDoneTaskOrganizer = function (notification, to, ionicId) {
            notification.typeNotification = "updateTaskOrganizer";
            notification.type = "task";
            notification.pushNotification = true;
            notification.hide = false;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendDeleteTaskOrganizer = function (notification, to, ionicId) {
            notification.typeNotification = "deleteTaskSponsor";
            notification.type = "task";
            notification.pushNotification = false;
            notification.hide = true;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendNewTaskSponsor = function (notification, to, ionicId) {
            notification.typeNotification = "newTaskSponsor";
            notification.type = "task";
            notification.pushNotification = false;
            notification.hide = true;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendUpdateTaskSponsor = function (notification, to, ionicId) {
            notification.typeNotification = "updateTaskSponsor";
            notification.type = "task";
            notification.pushNotification = false;
            notification.hide = true;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendDoneTaskSponsor = function (notification, to, ionicId) {
            notification.typeNotification = "doneTaskSponsor";
            notification.type = "task";
            notification.pushNotification = false;
            notification.hide = true;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendDeleteTaskSponsor = function (notification, to, ionicId) {
            notification.typeNotification = "deleteTaskSponsor";
            notification.type = "task";
            notification.pushNotification = false;
            notification.hide = true;
            this._sendNotification(notification, to, ionicId);
        };
        notificationService.prototype.sendNewEvent = function () {
            var notification = {};
            notification.date = new Date().getTime();
            notification.fromApp = 'mobileApp';
            notification.toApp = 'mobileApp';
            notification.pushNotification = false;
            notification.hide = true;
            var url = this.path + 'notifications/events';
            var notificationsRef = this.$firebaseArray(new Firebase(url));
            notificationsRef.$add(notification);
        };
        notificationService.prototype.sendUpdateEvent = function () {
            var notification = {};
            notification.date = new Date().getTime();
            notification.fromApp = 'mobileApp';
            notification.toApp = 'mobileApp';
            notification.pushNotification = false;
            notification.hide = true;
            var url = this.path + 'notifications/events';
            var notificationsRef = this.$firebaseArray(new Firebase(url));
            notificationsRef.$add(notification);
        };
        notificationService.prototype._sendNotification = function (notification, to, ionicId) {
            var _this = this;
            notification.date = new Date().getTime();
            notification.to = to;
            notification.fromApp = 'mobileApp';
            notification.toApp = 'mobileApp';
            notification.read = false;
            notification.ionicId = ionicId || "";
            var promises = [
                this._getTitle(notification.typeNotification),
                this._getText(notification.typeNotification, notification.text)
            ];
            this.$q.all(promises)
                .then(function (response) {
                notification.title = String(response[0]);
                notification.message = String(response[1]);
                if (notification.pushNotification) {
                    _this.pushService.sendPushNotification([notification.ionicId], notification)
                        .then(function (data) {
                        console.log(data);
                    })
                        .catch(function (error) {
                        console.log(error);
                    });
                }
                var url = _this.path + 'notifications/' + to;
                var notificationsRef = _this.$firebaseArray(new Firebase(url));
                notificationsRef.$add(notification);
            })
                .catch(function (error) {
                console.log(error);
            });
        };
        notificationService.prototype._notificationForMe = function () {
            var _this = this;
            var url = this.path + "notifications/" + this.userAuth.id;
            var reference = new Firebase(url);
            reference.on('child_added', function (snapshot) {
                var current = snapshot.val();
                if (_this.$localStorage.lastUpdate < current.date) {
                    _this.userAuthService.refresh();
                }
            });
        };
        notificationService.prototype._getTitle = function (typeNotification) {
            var _this = this;
            return this.$translate("NOTIFICATIONS." + typeNotification + "_title")
                .then(function (message) { return _this.$q.when(message); })
                .catch(function (data) { return _this.$q.reject(null); });
        };
        notificationService.prototype._getText = function (typeNotification, text) {
            var _this = this;
            return this.$translate("NOTIFICATIONS." + typeNotification + "_text")
                .then(function (message) { return _this.$q.when(message.replace('TEXT', text || '')); })
                .catch(function (error) { return _this.$q.reject(null); });
        };
        notificationService.prototype._updateEvents = function () {
            var _this = this;
            var url = this.path + "notifications/events";
            var reference = new Firebase(url);
            reference.on('child_added', function (snapshot) {
                var current = snapshot.val();
                if (_this.$localStorage.lastUpdate < current.date) {
                    _this.userService
                        .home(_this.userAuth.id)
                        .then(function (user) {
                        _this.userAuth = _this.userAuthService.updateUserAuth(user);
                        _this.$rootScope.$broadcast('HomeSponzorController:getEvents');
                        _this.$rootScope.$broadcast('MenuSponzor:counts');
                    });
                }
            });
        };
        return notificationService;
    }());
    notificationModule.notificationService = notificationService;
    angular
        .module('app')
        .service('notificationService', notificationService);
})(notificationModule || (notificationModule = {}));

/// <reference path="../../typings/tsd.d.ts" />
/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
var perkModule;
(function (perkModule) {
    var perkService = (function () {
        function perkService($http, $localStorage, BackendVariables, $q) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.BackendVariables = BackendVariables;
            this.$q = $q;
            this.$inject = [
                '$http',
                '$localStorage',
                'BackendVariables',
                '$q'
            ];
            this.path = BackendVariables.url;
        }
        perkService.prototype.allPerks = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "perks"
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerks(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkService.prototype.createPerk = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "perks",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerk(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkService.prototype.deletePerk = function (perkId) {
            var _this = this;
            return this.$http({
                method: 'DELETE',
                url: this.path + "perks/" + perkId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkService.prototype.editPerkPatch = function (perkId, data) {
            var _this = this;
            return this.$http({
                method: 'PATCH',
                url: this.path + "perks/" + perkId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerk(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkService.prototype.editPerkPut = function (perkId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + "perks/" + perkId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerk(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkService.prototype.buildPerk = function (data) {
            var perk = data;
            perk.event = data.Event || {};
            perk.sponzor_tasks = data.SponzorTasks || [];
            perk.tasks = data.Tasks || [];
            return perk;
        };
        perkService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        perkService.prototype._preparatePerks = function (data) {
            return data.Perk;
        };
        perkService.prototype._preparatePerk = function (data) {
            return this.buildPerk(data.Perk);
        };
        return perkService;
    }());
    perkModule.perkService = perkService;
    angular
        .module('app')
        .service('perkService', perkService);
})(perkModule || (perkModule = {}));

/// <reference path="../../typings/tsd.d.ts" />
/**
* @Servicio de PerkTask
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
var perkTaskModule;
(function (perkTaskModule) {
    var perkTaskService = (function () {
        function perkTaskService($http, $localStorage, BackendVariables, $q) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.BackendVariables = BackendVariables;
            this.$q = $q;
            this.$inject = [
                '$http',
                '$localStorage',
                'BackendVariables',
                '$q'
            ];
            this.path = BackendVariables.url;
        }
        perkTaskService.prototype.allPerkTasks = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "perk_tasks"
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerkTasks(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.getPerkTask = function (perkTaskId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "perk_tasks/" + perkTaskId,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerkTask(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.getPerkTaskByOrganizer = function (userId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "perk_tasks_organizer/" + userId,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerkTasks(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.createPerkTask = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "perk_tasks",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerkTaskCreate(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.deletePerkTask = function (perkTaskId) {
            var _this = this;
            return this.$http({
                method: 'DELETE',
                url: this.path + "perk_tasks/" + perkTaskId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.editPerkTaskPatch = function (perkTaskId, data) {
            var _this = this;
            return this.$http({
                method: 'PATCH',
                url: this.path + "perk_tasks/" + perkTaskId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerkTaskUpdate(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.editPerkTaskPut = function (perkTaskId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + "perk_tasks/" + perkTaskId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparatePerkTaskUpdate(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        perkTaskService.prototype.buildPerkTask = function (data) {
            var task = data.PerkTask;
            task.event = data.Event || {};
            task.perk = data.Perk || {};
            task.user = data.User || {};
            task.status = task.status == 1 ? true : false;
            return task;
        };
        perkTaskService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        perkTaskService.prototype._preparatePerkTasks = function (data) {
            return data.PerkTasks;
        };
        perkTaskService.prototype._preparatePerkTask = function (data) {
            return this.buildPerkTask(data.data);
        };
        perkTaskService.prototype._preparatePerkTaskUpdate = function (data) {
            return this.buildPerkTask(data);
        };
        perkTaskService.prototype._preparatePerkTaskCreate = function (data) {
            data.PerkTask = this.buildPerkTask(data);
            return data;
        };
        return perkTaskService;
    }());
    perkTaskModule.perkTaskService = perkTaskService;
    angular
        .module('app')
        .service('perkTaskService', perkTaskService);
})(perkTaskModule || (perkTaskModule = {}));

/// <reference path="../../typings/tsd.d.ts" />
var pushModule;
(function (pushModule) {
    var pushService = (function () {
        function pushService($http, $q, IONIC) {
            this.$http = $http;
            this.$q = $q;
            this.IONIC = IONIC;
            this.$inject = [
                '$http',
                '$q',
                'IONIC'
            ];
            this.path = IONIC.URL;
            this.profile = IONIC.PROFILE;
            this.token = IONIC.TOKEN;
        }
        pushService.prototype.sendPushNotification = function (user_ids, notification) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.token
                },
                data: {
                    "user_ids": ['d4254687-b993-4918-8127-d037a1cc156c'],
                    "profile": this.profile,
                    "notification": {
                        "title": notification.title,
                        "message": notification.message,
                        "ios": {
                            "title": notification.title,
                            "message": notification.message,
                            "payload": notification
                        },
                        "android": {
                            "title": notification.title,
                            "message": notification.message,
                            "payload": notification
                        }
                    }
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        return pushService;
    }());
    pushModule.pushService = pushService;
    angular
        .module('app')
        .service('pushService', pushService);
})(pushModule || (pushModule = {}));

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="event.service.ts" />
/**
* @Servicio de Sponzorships (Beneficios)
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
var sponsorshipModule;
(function (sponsorshipModule) {
    var sponsorshipService = (function () {
        function sponsorshipService($http, $localStorage, $q, eventService, BackendVariables) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.$q = $q;
            this.eventService = eventService;
            this.BackendVariables = BackendVariables;
            this.$inject = [
                '$http',
                '$localStorage',
                '$q',
                'eventService',
                'BackendVariables'
            ];
            this.path = this.BackendVariables.url;
        }
        sponsorshipService.prototype.allSponsorships = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "sponzorships"
            })
                .then(function (response) { return _this.$q.when(_this._preparateSponsorships(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        sponsorshipService.prototype.getSponzorship = function (sponsorshipId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "sponzorships/" + sponsorshipId
            })
                .then(function (response) { return _this.$q.when(_this._preparateSponsorship(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        sponsorshipService.prototype.createSponzorship = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "sponzorships",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateSponsorship(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        sponsorshipService.prototype.deleteSponzorship = function (sponsorshipId) {
            var _this = this;
            return this.$http({
                method: 'DELETE',
                url: this.path + "sponzorships/" + sponsorshipId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        sponsorshipService.prototype.editSponzorshipPatch = function (sponsorshipId, data) {
            var _this = this;
            return this.$http({
                method: 'PATCH',
                url: this.path + "sponzorships/" + sponsorshipId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateSponsorship(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        sponsorshipService.prototype.editSponzorshipPut = function (sponsorshipId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + "sponzorships/" + sponsorshipId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateSponsorship(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        sponsorshipService.prototype.buildSponsorship = function (data) {
            var sponzorship = data;
            sponzorship.sponzor = data.Sponzor || data.sponzor || {};
            sponzorship.perk = data.Perk || data.perk || {};
            sponzorship.organizer = data.Organizer || data.organizer || {};
            sponzorship.event = sponzorship.event ? sponzorship.event : data.Event || {};
            sponzorship.tasks = data.Tasks || data.tasks || [];
            if (!sponzorship.sponzor.image) {
                sponzorship.sponzor.image = (sponzorship.sponzor.image == "") ? 'img/photo.png' : sponzorship.sponzor.image;
            }
            if (!sponzorship.organizer.image) {
                sponzorship.organizer.image = sponzorship.organizer.image == "" ? 'img/photo.png' : sponzorship.organizer.image;
            }
            sponzorship.event = this.eventService.buildEvent(sponzorship.event);
            return sponzorship;
        };
        sponsorshipService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        sponsorshipService.prototype._preparateSponsorships = function (data) {
            return data.SponzorsEvents;
        };
        sponsorshipService.prototype._preparateSponsorship = function (data) {
            return this.buildSponsorship(data.Sponzorship);
        };
        return sponsorshipService;
    }());
    sponsorshipModule.sponsorshipService = sponsorshipService;
    angular
        .module('app')
        .service('sponsorshipService', sponsorshipService);
})(sponsorshipModule || (sponsorshipModule = {}));

/// <reference path="../../typings/tsd.d.ts" />
/**
* @Servive for tasks of sponsor
*
* @author Nicolas Molina
* @version 0.1
*/
var taskSponsorModule;
(function (taskSponsorModule) {
    var taskSponsorService = (function () {
        function taskSponsorService($http, $localStorage, BackendVariables, $q) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.BackendVariables = BackendVariables;
            this.$q = $q;
            this.$inject = [
                '$http',
                '$localStorage',
                'BackendVariables',
                '$q'
            ];
            this.path = this.BackendVariables.url;
        }
        taskSponsorService.prototype.getAllTasks = function () {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "task_sponzor",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) { return _this.$q.when(_this._preparateTasksSponsor(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        taskSponsorService.prototype.getTask = function (taskId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "task_sponzor/" + taskId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(_this._preparateTaskSponsor(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        taskSponsorService.prototype.createTask = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "task_sponzor",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        taskSponsorService.prototype.editPutTask = function (taskId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + "task_sponzor/" + taskId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateTaskSponsor(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        taskSponsorService.prototype.editPatchTask = function (taskId, data) {
            var _this = this;
            return this.$http({
                method: 'PATCH',
                url: this.path + "task_sponzor/" + taskId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateTaskSponsor(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        taskSponsorService.prototype.deleteTask = function (taskId) {
            var _this = this;
            return this.$http({
                method: 'DELETE',
                url: this.path + "task_sponzor/" + taskId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        taskSponsorService.prototype._preparateTasksSponsor = function (data) {
            return data.TasksSponzor;
        };
        taskSponsorService.prototype._preparateTaskSponsor = function (data) {
            var taskSponsor = data.TaskSponzor ? data.TaskSponzor : data.data;
            taskSponsor.task = data.PerkTask;
            return taskSponsor;
        };
        taskSponsorService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        return taskSponsorService;
    }());
    taskSponsorModule.taskSponsorService = taskSponsorService;
    angular
        .module('app')
        .service('taskSponsorService', taskSponsorService);
})(taskSponsorModule || (taskSponsorModule = {}));

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="event.service.ts" />
/// <reference path="sponsorship.service.ts" />
/**
* @Servicio de Usuarios
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
var userModule;
(function (userModule) {
    var userService = (function () {
        function userService($http, $localStorage, BackendVariables, $q, eventService, sponsorshipService) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.BackendVariables = BackendVariables;
            this.$q = $q;
            this.eventService = eventService;
            this.sponsorshipService = sponsorshipService;
            this.$inject = [
                '$http',
                '$localStorage',
                'BackendVariables',
                '$q',
                'eventService',
                'sponsorshipService'
            ];
            this.path = BackendVariables.url;
        }
        userService.prototype.buildUser = function (data) {
            var user = data.user;
            user.age = parseInt(data.user.age || 0);
            user.comunity_size = parseInt(data.user.comunity_size || 0);
            if (user.type == "0") {
                user.events.forEach(this.eventService.buildEvent, this.eventService);
                user.sponzorships_like_organizer.forEach(this.sponsorshipService.buildSponsorship, this.sponsorshipService);
            }
            else {
                user.sponzorships.forEach(this.sponsorshipService.buildSponsorship, this.sponsorshipService);
                data.events.forEach(this.eventService.buildEvent, this.eventService);
                user.events = data.events;
            }
            return user;
        };
        userService.prototype.login = function (email, password) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "auth",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email: email,
                    password: password
                }
            })
                .then(function (response) { return _this.$q.when(_this.buildUser(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.home = function (userId) {
            var _this = this;
            return this.$http({
                method: 'GET',
                url: this.path + "home/" + userId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(_this._preparateUser(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.createUser = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "users",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._getUser(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.deleteUser = function (userId) {
            var _this = this;
            return this.$http({
                method: 'DELETE',
                url: this.path + "users/" + userId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': "Basic " + this._getToken()
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.editUserPatch = function (userId, data) {
            var _this = this;
            return this.$http({
                method: 'PATCH',
                url: this.path + "users/" + userId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._getUser(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.editUserPut = function (userId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + "users/" + userId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._getUser(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.forgotPassword = function (email) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "send_reset_password",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: {
                    email: email
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype.invitedUser = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "invite_friend",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userService.prototype._getUser = function (data) {
            data.User.age = parseInt(data.User.age || 0);
            data.User.comunity_size = parseInt(data.User.comunity_size || 0);
            return data.User;
        };
        userService.prototype._preparateUser = function (data) {
            return this.buildUser(data.data);
        };
        userService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        return userService;
    }());
    userModule.userService = userService;
    angular
        .module('app')
        .service('userService', userService);
})(userModule || (userModule = {}));

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="user.service.ts" />
/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
var userAuthModule;
(function (userAuthModule) {
    var userAuthService = (function () {
        function userAuthService($http, $q, $localStorage, userService, $rootScope) {
            this.$http = $http;
            this.$q = $q;
            this.$localStorage = $localStorage;
            this.userService = userService;
            this.$rootScope = $rootScope;
            this.$inject = [
                '$http',
                '$q',
                '$localStorage',
                'userService',
                '$rootScope'
            ];
        }
        userAuthService.prototype.getUserAuth = function () {
            return this.$localStorage.userAuth;
        };
        userAuthService.prototype.updateUserAuth = function (data) {
            this.$localStorage.userAuth = angular.extend(this.$localStorage.userAuth || {}, data);
            this.$localStorage.lastUpdate = new Date().getTime();
            return this.$localStorage.userAuth;
        };
        userAuthService.prototype.checkSession = function () {
            if (angular.isDefined(this.$localStorage.token) && angular.isDefined(this.$localStorage.userAuth)) {
                return true;
            }
            return false;
        };
        userAuthService.prototype.refresh = function () {
            var _this = this;
            this.userService.home(this.getUserAuth().id)
                .then(function (user) {
                var userAuth = _this.updateUserAuth(user);
                if (userAuth.type == "0") {
                    _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_events');
                    _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_sponsors');
                    _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
                    _this.$rootScope.$broadcast('HomeOrganizerCtrl:count_sponsors');
                    _this.$rootScope.$broadcast('HomeOrganizerCtrl:count_events');
                    _this.$rootScope.$broadcast('EventsTabsCtrl:count_events');
                    _this.$rootScope.$broadcast('EventListOrganizerCtrl:getEvents');
                    _this.$rootScope.$broadcast('PastEventsOrganizerCtrl:getEvents');
                    _this.$rootScope.$broadcast('TaskListCtrl:getTasks');
                    _this.$rootScope.$broadcast('PastTasksCtrl:getTasks');
                    _this.$rootScope.$broadcast('TaskTabsCtrl:count_tasks');
                    _this.$rootScope.$broadcast('SponsorshipsListCtrl:getSponzorships');
                    _this.$rootScope.$broadcast('SponsorshipsPastEventsCtrl:getSponzorships');
                    _this.$rootScope.$broadcast('SponsorshipsTabsCtrl:count_sponsors');
                }
                else {
                    _this.$rootScope.$broadcast('HomeSponsorCtrl:getEvents');
                    _this.$rootScope.$broadcast('MenuSponsorCtrl:count');
                    _this.$rootScope.$broadcast('FollowEventsController:getSponzorships');
                    _this.$rootScope.$broadcast('SponsoringEventsCtrl:getSponzorships');
                    _this.$rootScope.$broadcast('SponsorshipSponsorDetailCtrl:update');
                }
            });
        };
        return userAuthService;
    }());
    userAuthModule.userAuthService = userAuthService;
    angular
        .module('app')
        .service('userAuthService', userAuthService);
})(userAuthModule || (userAuthModule = {}));

/// <reference path="../../typings/tsd.d.ts" />
/**
* @Servicio de Interes del usuario
*
* @author Nicolas Molina
* @version 0.1
*/
var userInterestModule;
(function (userInterestModule) {
    var userInterestService = (function () {
        function userInterestService($http, $localStorage, BackendVariables, $q) {
            this.$http = $http;
            this.$localStorage = $localStorage;
            this.BackendVariables = BackendVariables;
            this.$q = $q;
            this.$inject = [
                '$http',
                '$localStorage',
                'BackendVariables',
                '$q',
            ];
            this.path = BackendVariables.url;
        }
        userInterestService.prototype.createUserInterest = function (data) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + "user_interests",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(_this._preparateUserInterest(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userInterestService.prototype.bulkUserInterest = function (userId, data) {
            var _this = this;
            return this.$http({
                method: 'PUT',
                url: this.path + "user_interests/" + userId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + this._getToken()
                },
                data: data
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        userInterestService.prototype._preparateUserInterest = function (data) {
            return data.UserInterest;
        };
        userInterestService.prototype._getToken = function () {
            return this.$localStorage.token;
        };
        return userInterestService;
    }());
    userInterestModule.userInterestService = userInterestService;
    angular
        .module('app')
        .service('userInterestService', userInterestService);
})(userInterestModule || (userInterestModule = {}));

/// <reference path="../../typings/tsd.d.ts" />
/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
var utilsServiceModule;
(function (utilsServiceModule) {
    var utilsService = (function () {
        function utilsService($ionicLoading, $ionicPopup, $translate, $ionicHistory) {
            this.$ionicLoading = $ionicLoading;
            this.$ionicPopup = $ionicPopup;
            this.$translate = $translate;
            this.$ionicHistory = $ionicHistory;
            this.$inject = [
                '$ionicLoading',
                '$ionicPopup',
                '$translate',
                '$ionicHistory'
            ];
        }
        utilsService.prototype.showLoad = function () {
            return this.$ionicLoading.show();
        };
        utilsService.prototype.hideLoad = function () {
            return this.$ionicLoading.hide();
        };
        utilsService.prototype.alert = function (msg) {
            var options = msg || {};
            options.title = options.title || '<p>Ocurrió un error.</p>';
            options.template = options.template || '<p class="text-center">Intento de nuevo.</p>';
            return this.$ionicPopup.alert(options);
        };
        utilsService.prototype.confirm = function (msg) {
            var options = msg || {};
            options.title = options.title || '¿ Estas seguro ?';
            options.template = options.template || 'Estas seguro de eliminar.';
            return this.$ionicPopup.confirm(options);
        };
        utilsService.prototype.trim = function (str) {
            if (typeof (str) == "string" || typeof (str) == "number" || typeof (str) == "boolean") {
                return str.toString().replace(/^\s+|\s+$/g, "");
            }
            return "";
        };
        ;
        utilsService.prototype.resetForm = function (form) {
            form.$setPristine();
            form.$setUntouched();
        };
        return utilsService;
    }());
    utilsServiceModule.utilsService = utilsService;
    angular
        .module('app')
        .service('utilsService', utilsService);
})(utilsServiceModule || (utilsServiceModule = {}));
/*
(function() {
  'use strict';

  angular
    .module('app')
    .factory('utilsService', utilsService);

  utilsService.$inject = [
    '$ionicLoading',
    '$ionicPopup',
    '$translate',
    '$localStorage',
    '$ionicHistory'
  ];

  function utilsService( $ionicLoading, $ionicPopup, $translate, $localStorage) {

    var service = {
      showLoad: showLoad,
      hideLoad: hideLoad,
      alert: alert,
      confirm: confirm,
      trim: trim,
      resetForm: resetForm,
      updateUserAuth: updateUserAuth
    };

    return service;

    ////////////

    

    function hideLoad(){
      $ionicLoading.hide();
    }

    function alert( msg ){
      var options = msg || {};
      options.title = options.title || '<p>Ocurrió un error.</p>';
      options.template  = options.template || '<p class="text-center">Intento de nuevo.</p>';
      return $ionicPopup.alert( options );
    }

    function confirm( msg ){
      var options = msg || {};
      options.title = options.title || '¿ Estas seguro ?';
      options.template  = options.template || 'Estas seguro de eliminar.';
      return $ionicPopup.confirm( options );
    }

    function trim( str ){
      if(typeof(str) == "string" || typeof(str) == "number" || typeof(str) == "boolean"){
        return str.toString().replace(/^\s+|\s+$/g,"");
      }
      return "";
    };

    function resetForm( form ){
      //Validate
      var typeForm = typeof form;
      if(typeForm !== 'object' || Array.isArray(form)) throw new Error();
      
      form.$setPristine();
      form.$setUntouched();
    }

    function updateUserAuth( data ){
      return angular.extend($localStorage.userAuth || {}, data);
    }

    

  }
})();
*/

/// <reference path="../../typings/tsd.d.ts" />
// Description:
//  Creates a new Spinner and sets its options
// Usage:
//  <div data-cc-spinner="vm.spinnerOptions"></div>
(function () {
    'use strict';
    angular
        .module('app.widgets')
        .directive('spmCropImage', spmCropImage);
    spmCropImage.$inject = [];
    function spmCropImage() {
        var directive = {
            restrict: 'E',
            transclude: true,
            scope: {
                edit: '=edit'
            },
            template: '<div class="spm-crop">' +
                '<i ng-show="edit" class="icon ion-edit edit"></i>' +
                '<ng-transclude></ng-transclude>' +
                '</div>'
        };
        return directive;
    }
})();

/// <reference path="../../typings/tsd.d.ts" />
// Description:
// Hide tabs
// Usage:
// <ion-tabs class="tabs-icon-top tabs-positive {{$root.hideTabs}}"></ion-tabs>
// <ion-view spm-hide-tabs></ion-view>
(function () {
    'use strict';
    angular
        .module('app.widgets')
        .directive('spmHideTabs', spmHideTabs);
    spmHideTabs.$inject = [
        '$rootScope'
    ];
    function spmHideTabs($rootScope) {
        var directive = {
            restrict: 'A',
            link: link
        };
        return directive;
        function link($scope, $el) {
            $rootScope.hideTabs = 'tabs-item-hide';
            $scope.$on('$destroy', function () {
                $rootScope.hideTabs = '';
            });
        }
    }
})();

/// <reference path="../../typings/tsd.d.ts" />
// Description:
// Network message online / offline
// Usage:
// <spm-network-message></spm-network-message>
(function () {
    'use strict';
    angular
        .module('app.widgets')
        .directive('spmNetworkMessage', spmNetworkMessage);
    spmNetworkMessage.$inject = [
        '$cordovaNetwork',
        '$rootScope'
    ];
    function spmNetworkMessage($cordovaNetwork, $rootScope) {
        var directive = {
            restrict: 'E',
            controller: controller,
            controllerAs: 'vm',
            templateUrl: 'templates/widgets/network-message.html'
        };
        return directive;
        function controller($scope) {
            var vm = this;
            //Attributes
            vm.message = false;
            //activate();
            //////////////
            function activate() {
                vm.message = $cordovaNetwork.isOffline();
                // listen for Online event
                $rootScope.$on('$cordovaNetwork:online', updateNetworkState);
                // listen for Offline event
                $rootScope.$on('$cordovaNetwork:offline', updateNetworkState);
            }
            function updateNetworkState(event, networkState) {
                vm.message = $cordovaNetwork.isOffline();
            }
        }
    }
})();

/// <reference path="../../typings/tsd.d.ts" />
// Description:
//  Creates a new Spinner and sets its options
// Usage:
//  <div data-cc-spinner="vm.spinnerOptions"></div>
(function () {
    'use strict';
    angular
        .module('app.widgets')
        .directive('spmAccordionItem', spmAccordionItem);
    spmAccordionItem.$inject = [];
    function spmAccordionItem() {
        var directive = {
            restrict: 'E',
            replace: true,
            transclude: true,
            require: '^spmAccordion',
            scope: {
                title: '@title',
                model: '@model'
            },
            controller: function () { },
            templateUrl: 'templates/widgets/spm-accordion-item.html',
            link: function (scope, element, attrs, controller, transclude) {
                scope.active = false;
                controller.addSection(scope);
                scope.activate = function () {
                    controller.select(scope);
                };
            }
        };
        return directive;
    }
})();

/// <reference path="../../typings/tsd.d.ts" />
// Description:
//  Creates a new Spinner and sets its options
// Usage:
//  <div data-cc-spinner="vm.spinnerOptions"></div>
(function () {
    'use strict';
    angular
        .module('app.widgets')
        .directive('spmAccordion', spmAccordion);
    spmAccordion.$inject = [];
    function spmAccordion() {
        var directive = {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                autoOpen: '@autoOpen',
                type: '@type'
            },
            templateUrl: 'templates/widgets/spm-accordion.html',
            controller: function ($scope) {
                var controller = this;
                var sections = controller.sections = $scope.sections = [];
                var autoOpen = controller.autoOpen = $scope.autoOpen = $scope.autoOpen || true; //auto open opens first tab on render
                controller.select = function (selectSection) {
                    sections.forEach(function (section) {
                        section.scope.active = section.scope === selectSection ? !section.scope.active : false;
                    });
                };
                controller.addSection = function (sectionScope) {
                    sections.push({ scope: sectionScope });
                    if (sections.length === 1 && autoOpen === true) {
                        sections[0].active = true;
                        sections[0].scope.active = true;
                    }
                };
            },
            link: function (scope, element, attrs, controller) {
                scope.autoOpen = controller.autoOpen = scope.autoOpen === "true" ? true : false;
            }
        };
        return directive;
    }
})();

/// <reference path="../../typings/tsd.d.ts" />
// Description:
// Network message online / offline
// Usage:
// <spm-network-message></spm-network-message>
(function () {
    'use strict';
    angular
        .module('app.widgets')
        .directive('spmNotification', spmNotification);
    spmNotification.$inject = [
        '$state',
        'BackendVariables',
        'userAuthService',
    ];
    function spmNotification($state, BackendVariables, userAuthService) {
        var path = BackendVariables.f_url;
        var userAuth = userAuthService.getUserAuth();
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '='
            },
            link: link,
            templateUrl: 'templates/widgets/spm-notification.html'
        };
        return directive;
        function link($scope) {
            $scope.read = read;
            var events = {
                'newSponsorship': goDetailOrganizerSponsorhip,
                'acceptSponsorship': goDetailSponsorSponsorhip,
                'rejectSponsorship': goFollowing,
                'newTaskOrganizer': goDetailSponsorshipSponsor,
                'updateTaskOrganizer': goDetailSponsorshipSponsor,
                'doneTaskOrganizer': goDetailSponsorshipSponsor
            };
            function read() {
                var url = path + 'notifications/' + userAuth.id + '/' + $scope.model.$id;
                var reference = new Firebase(url);
                if ($scope.model.typeNotification && $scope.model.modelId) {
                    events[$scope.model.typeNotification]($scope.model.modelId)
                        .then(function () {
                        reference.update({ read: true })
                            .then(function () {
                            console.log('update notification');
                        });
                    });
                }
            }
            function goDetailOrganizerSponsorhip(id) {
                return $state.go('organizer.sponsorship', {
                    id: id
                });
            }
            function goDetailSponsorSponsorhip(id) {
                return $state.go('sponzor.sponsorship', {
                    id: id
                });
            }
            function goFollowing() {
                return $state.go('sponzor.following');
            }
            function goDetailSponsorshipSponsor(id) {
                return $state.go('sponzor.sponsorship', {
                    id: id
                });
            }
            /*
            function goSponzoring() {
              $state.go('sponzor.sponzoring');
            }
            */
            /*
            function goDetailSponsorshipOrganizer( id ){
               $state.go('organizer.sponsorship',{
                 id: id
               });
            }
            */
            /*
            function goDetailEvent( id ) {
              $state.go('sponzor.event',{
                 idEvent: id
               });
            }
            */
        }
    }
})();

/// <reference path="../../typings/tsd.d.ts" />
/*
(function() {
  'use strict';

  angular
    .module('app.filters')
    .filter('humanize', humanizeFilter);

  humanizeFilter.$inject = [];
  
  function humanizeFilter() {
    return function( time ){
      console.log(time);
      console.log(new Date(time));
     return moment.duration(new Date(time),'years').humanize(true);
    }
  }
})();
*/ 

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller HomeOrganizerCtrl
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.3
*/
var HomeOrganizerCtrl = (function () {
    function HomeOrganizerCtrl($rootScope, userAuthService, notificationService) {
        this.$rootScope = $rootScope;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.$inject = [
            '$rootScope',
            'userAuthService',
            'notificationService'
        ];
        this.count_events = 0;
        this.count_sponsors = 0;
        this.count_comunity = 0;
        this.userAuth = userAuthService.getUserAuth();
        this.count_events = this.userAuth.events.filter(this.filterDate).length;
        this.count_comunity = this.userAuth.comunity_size;
        this.count_sponsors = this.userAuth.sponzorships_like_organizer.length;
        this.notifications = notificationService.getNotifications(this.userAuth.id);
        this.registerListenerCountEvents();
        this.registerListenerCountSponsors();
    }
    HomeOrganizerCtrl.prototype.registerListenerCountSponsors = function () {
        var _this = this;
        this.$rootScope.$on('HomeOrganizerCtrl:count_sponsors', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_sponsors = _this.userAuth.sponzorships_like_organizer.length;
        });
    };
    HomeOrganizerCtrl.prototype.registerListenerCountEvents = function () {
        var _this = this;
        this.$rootScope.$on('HomeOrganizerCtrl:count_events', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_sponsors = _this.userAuth.sponzorships_like_organizer.length;
        });
    };
    HomeOrganizerCtrl.prototype.filterDate = function (item) {
        var today = moment(new Date().getTime()).subtract(1, 'days');
        return moment(item.ends).isAfter(today);
    };
    return HomeOrganizerCtrl;
}());
angular
    .module('app.dashboard-organizer')
    .controller('HomeOrganizerCtrl', HomeOrganizerCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var IntroOrganizerCtrl = (function () {
    function IntroOrganizerCtrl($state, $scope, $ionicHistory, $ionicSideMenuDelegate) {
        var _this = this;
        this.$state = $state;
        this.$scope = $scope;
        this.$ionicHistory = $ionicHistory;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$inject = [
            '$state',
            '$scope',
            '$ionicHistory',
            '$ionicSideMenuDelegate'
        ];
        this.slideIndex = 0;
        this.slider = null;
        this.data = {};
        this.$ionicSideMenuDelegate.canDragContent(false);
        this.$scope.$watch(function () { return _this.data; }, function (oldValue, newValue) {
            if (Object.keys(_this.data).length > 0) {
                _this.slider = _this.data;
                _this.slider.on('slideChangeEnd', function () {
                    _this.slideIndex = _this.slider.activeIndex;
                    _this.$scope.$apply();
                });
            }
        });
    }
    IntroOrganizerCtrl.prototype.startApp = function () {
        this.$ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        this.$state.go("organizer.home");
    };
    IntroOrganizerCtrl.prototype.nextSlide = function () {
        this.slider.slideNext();
    };
    IntroOrganizerCtrl.prototype.previousSlide = function () {
        this.slider.slidePrev();
    };
    return IntroOrganizerCtrl;
}());
angular
    .module('app.dashboard-organizer')
    .controller('IntroOrganizerCtrl', IntroOrganizerCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var MenuOrganizerCtrl = (function () {
    function MenuOrganizerCtrl($state, $rootScope, $ionicAuth, $ionicHistory, userAuthService, notificationService, $localStorage) {
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$ionicAuth = $ionicAuth;
        this.$ionicHistory = $ionicHistory;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.$localStorage = $localStorage;
        this.$inject = [
            '$state',
            '$rootScope',
            '$ionicAuth',
            '$ionicHistory',
            'userAuthService',
            'notificationService',
            '$localStorage'
        ];
        this.count_events = 0;
        this.count_sponsors = 0;
        this.count_tasks = 0;
        this.notifications = [];
        this.userAuth = this.userAuthService.getUserAuth();
        this.count_events = this.userAuth.events.filter(this.filterDate).length;
        this.count_sponsors = this.userAuth.sponzorships_like_organizer.length;
        this.count_tasks = this.countTasks().length;
        this.notifications = notificationService.getNotifications(this.userAuth.id);
        this.registerListenerCountEvents();
        this.registerListenerCountSponsors();
        this.registerListenerCountTasks();
    }
    MenuOrganizerCtrl.prototype.registerListenerCountEvents = function () {
        var _this = this;
        this.$rootScope.$on('MenuOrganizerCtrl:count_events', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_events = _this.userAuth.events.filter(_this.filterDate).length;
        });
    };
    MenuOrganizerCtrl.prototype.registerListenerCountSponsors = function () {
        var _this = this;
        this.$rootScope.$on('MenuOrganizerCtrl:count_sponsors', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_sponsors = _this.userAuth.sponzorships_like_organizer.length;
        });
    };
    MenuOrganizerCtrl.prototype.registerListenerCountTasks = function () {
        var _this = this;
        this.$rootScope.$on('MenuOrganizerCtrl:count_tasks', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_tasks = _this.countTasks().length;
        });
    };
    MenuOrganizerCtrl.prototype.logout = function () {
        var _this = this;
        this.$ionicAuth.logout();
        this.$localStorage.$reset();
        this.$ionicHistory.clearCache()
            .then(function () { return _this.$state.go('signin'); });
    };
    MenuOrganizerCtrl.prototype.filterDate = function (item) {
        var today = moment(new Date().getTime()).subtract(1, 'days');
        return moment(item.ends).isAfter(today);
    };
    MenuOrganizerCtrl.prototype.countTasks = function () {
        var _this = this;
        return this.userAuth.events
            .reduce(function (a, b) { return a.concat(b.perks || []); }, [])
            .reduce(function (a, b) { return a.concat(b.tasks || []); }, [])
            .filter(function (item) { return item.user_id == _this.userAuth.id && item.status != '1'; });
    };
    return MenuOrganizerCtrl;
}());
angular
    .module('app.dashboard-organizer')
    .controller('MenuOrganizerCtrl', MenuOrganizerCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var HomeSponsorCtrl = (function () {
    function HomeSponsorCtrl($localStorage, userService, utilsService, $scope, $rootScope, userAuthService) {
        this.$localStorage = $localStorage;
        this.userService = userService;
        this.utilsService = utilsService;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$localStorage',
            'userService',
            'utilsService',
            '$scope',
            '$rootScope',
            'userAuthService'
        ];
        this.events = [];
        this.userAuth = this.userAuthService.getUserAuth();
        this.events = this.userAuth.events.filter(this.filterDate);
        this.registerListenerEvents();
    }
    HomeSponsorCtrl.prototype.registerListenerEvents = function () {
        var _this = this;
        this.$rootScope.$on('HomeSponsorCtrl:getEvents', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.events = _this.userAuth.events.filter(_this.filterDate);
        });
    };
    HomeSponsorCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.events = _this.userAuth.events.filter(_this.filterDate);
            _this.$scope.$broadcast('scroll.refreshComplete');
        })
            .catch(function () { return _this.$scope.$broadcast('scroll.refreshComplete'); });
    };
    HomeSponsorCtrl.prototype.filterDate = function (item) {
        return moment(item.starts).isAfter(new Date());
    };
    return HomeSponsorCtrl;
}());
angular
    .module('app.dashboard-sponzor')
    .controller('HomeSponsorCtrl', HomeSponsorCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var IntroSponsorCtrl = (function () {
    function IntroSponsorCtrl($state, $scope, $ionicHistory, $ionicSideMenuDelegate) {
        var _this = this;
        this.$state = $state;
        this.$scope = $scope;
        this.$ionicHistory = $ionicHistory;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$inject = [
            '$state',
            '$scope',
            '$ionicHistory',
            '$ionicSideMenuDelegate'
        ];
        this.slideIndex = 0;
        this.slider = null;
        this.data = {};
        this.$ionicSideMenuDelegate.canDragContent(false);
        this.$scope.$watch(function () { return _this.data; }, function (oldValue, newValue) {
            if (Object.keys(_this.data).length > 0) {
                _this.slider = _this.data;
                _this.slider.on('slideChangeEnd', function () {
                    _this.slideIndex = _this.slider.activeIndex;
                    _this.$scope.$apply();
                });
            }
        });
    }
    IntroSponsorCtrl.prototype.startApp = function () {
        this.$ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        this.$state.go("sponzor.home");
    };
    IntroSponsorCtrl.prototype.nextSlide = function () {
        this.slider.slideNext();
    };
    IntroSponsorCtrl.prototype.previousSlide = function () {
        this.slider.slidePrev();
    };
    return IntroSponsorCtrl;
}());
angular
    .module('app.dashboard-sponzor')
    .controller('IntroSponsorCtrl', IntroSponsorCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var MenuSponsorCtrl = (function () {
    function MenuSponsorCtrl($state, $localStorage, $rootScope, $ionicAuth, $ionicHistory, userAuthService, notificationService) {
        this.$state = $state;
        this.$localStorage = $localStorage;
        this.$rootScope = $rootScope;
        this.$ionicAuth = $ionicAuth;
        this.$ionicHistory = $ionicHistory;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.$inject = [
            '$state',
            '$localStorage',
            '$rootScope',
            '$ionicAuth',
            '$ionicHistory',
            'userAuthService',
            'notificationService'
        ];
        this.count_following = 0;
        this.count_sponsoring = 0;
        this.notifications = [];
        this.userAuth = userAuthService.getUserAuth();
        this.count_sponsoring = this.userAuth.sponzorships.filter(this.filterByAccepted).length;
        this.count_following = this.userAuth.sponzorships.filter(this._filterByDateAndByPending).length;
        this.notifications = notificationService.getNotifications(this.userAuth.id);
        this.registerListenerCounts();
    }
    MenuSponsorCtrl.prototype.registerListenerCounts = function () {
        var _this = this;
        this.$rootScope.$on('MenuSponsorCtrl:counts', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_sponsoring = _this.userAuth.sponzorships.filter(_this.filterByAccepted).length;
            _this.count_following = _this.userAuth.sponzorships.filter(_this._filterByDateAndByPending).length;
        });
    };
    MenuSponsorCtrl.prototype.filterByAccepted = function (item) {
        return item.status == '1';
    };
    MenuSponsorCtrl.prototype._filterByDateAndByPending = function (item) {
        return item.status != '1' && moment(item.event.starts).isAfter(new Date());
    };
    MenuSponsorCtrl.prototype.logout = function () {
        var _this = this;
        this.$ionicAuth.logout();
        this.$localStorage.$reset();
        this.$ionicHistory.clearCache()
            .then(function () { return _this.$state.go('signin'); });
    };
    return MenuSponsorCtrl;
}());
angular
    .module('app.dashboard-sponzor')
    .controller('MenuSponsorCtrl', MenuSponsorCtrl);

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
                _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_events');
                _this.$rootScope.$broadcast('EventsTabsCtrl:count_events');
                _this.$rootScope.$broadcast('EventListOrganizerCtrl:getEvents');
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
                _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_events');
                _this.$rootScope.$broadcast('EventsTabsCtrl:count_events');
                _this.$rootScope.$broadcast('EventListOrganizerCtrl:getEvents');
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

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var EventDetailOrganizerCtrl = (function () {
    function EventDetailOrganizerCtrl($scope, $stateParams, $state, $translate, $rootScope, $ionicPopup, $ionicActionSheet, $ionicSideMenuDelegate, $ionicHistory, $ionicModal, $cordovaSocialSharing, $cordovaCalendar, $cordovaToast, BackendVariables, eventService, utilsService, sponsorshipService, notificationService, userAuthService, perkTaskService) {
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
            'perkTaskService'
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
        this.userAuth = this.userAuthService.getUserAuth();
        this.event = _.findWhere(this.userAuth.events, { id: $stateParams.id });
        this.event.perks.forEach(this._preparatePerks, this);
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

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var EventsTabsOrganizerCtrl = (function () {
    function EventsTabsOrganizerCtrl(userAuthService, $rootScope) {
        this.userAuthService = userAuthService;
        this.$rootScope = $rootScope;
        this.$inject = [
            '$rootScope',
            'userAuthService'
        ];
        this.count_events = 0;
        this.count_past_events = 0;
        this.userAuth = this.userAuthService.getUserAuth();
        this.count_events = this.userAuth.events.filter(this._filterByDateIsAfter).length;
        this.count_past_events = this.userAuth.events.length - this.count_events;
        this._registerListenerCounts();
    }
    EventsTabsOrganizerCtrl.prototype._registerListenerCounts = function () {
        var _this = this;
        this.$rootScope.$on('EventsTabsCtrl:count_events', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_events = _this.userAuth.events.filter(_this._filterByDateIsAfter).length;
            _this.count_past_events = _this.userAuth.events.length - _this.count_events;
        });
    };
    EventsTabsOrganizerCtrl.prototype._filterByDateIsAfter = function (item) {
        var today = moment(new Date()).subtract(1, 'days');
        return moment(item.ends).isAfter(today);
    };
    return EventsTabsOrganizerCtrl;
}());
angular
    .module('app.events-organizer')
    .controller('EventsTabsOrganizerCtrl', EventsTabsOrganizerCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var EventListOrganizerCtrl = (function () {
    function EventListOrganizerCtrl($scope, $rootScope, userService, utilsService, userAuthService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.userService = userService;
        this.utilsService = utilsService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$scope',
            '$rootScope',
            'userService',
            'utilsService',
            'userAuthService'
        ];
        this.events = [];
        this.showEmptyState = true;
        this.userAuth = this.userAuthService.getUserAuth();
        this.events = this.userAuth.events.filter(this._filterDate);
        this.showEmptyState = this.events.length == 0 ? true : false;
        this._registerListenerEvents();
    }
    EventListOrganizerCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.$scope.$broadcast('scroll.refreshComplete');
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.events = _this.userAuth.events.filter(_this._filterDate);
            _this.showEmptyState = _this.events.length == 0 ? true : false;
        })
            .catch(function (error) {
            _this.$scope.$broadcast('scroll.refreshComplete');
        });
    };
    EventListOrganizerCtrl.prototype._filterDate = function (item) {
        var today = moment(new Date()).subtract(1, 'days');
        return moment(item.ends).isAfter(today);
    };
    EventListOrganizerCtrl.prototype._registerListenerEvents = function () {
        var _this = this;
        this.$rootScope.$on('EventListOrganizerCtrl:getEvents', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.events = _this.userAuth.events.filter(_this._filterDate);
            _this.showEmptyState = _this.events.length == 0 ? true : false;
        });
    };
    return EventListOrganizerCtrl;
}());
angular
    .module('app.events-organizer')
    .controller('EventListOrganizerCtrl', EventListOrganizerCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var PastEventsOrganizerCtrl = (function () {
    function PastEventsOrganizerCtrl($scope, $rootScope, userService, utilsService, userAuthService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.userService = userService;
        this.utilsService = utilsService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$scope',
            '$rootScope',
            'userService',
            'utilsService',
            'userAuthService'
        ];
        this.events = [];
        this.showEmptyState = true;
        this.userAuth = this.userAuthService.getUserAuth();
        this.events = this.userAuth.events.filter(this._filterDate);
        this.showEmptyState = this.events.length == 0 ? true : false;
        this._registerListenerEvents();
    }
    PastEventsOrganizerCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.$scope.$broadcast('scroll.refreshComplete');
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.events = _this.userAuth.events.filter(_this._filterDate);
            _this.showEmptyState = _this.events.length == 0 ? true : false;
        })
            .catch(function (error) {
            _this.$scope.$broadcast('scroll.refreshComplete');
        });
    };
    PastEventsOrganizerCtrl.prototype._filterDate = function (item) {
        var today = moment(new Date()).subtract(1, 'days');
        return moment(item.ends).isBefore(today);
    };
    PastEventsOrganizerCtrl.prototype._registerListenerEvents = function () {
        var _this = this;
        this.$rootScope.$on('PastEventsOrganizerCtrl:getEvents', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.events = _this.userAuth.events.filter(_this._filterDate);
            _this.showEmptyState = _this.events.length == 0 ? true : false;
        });
    };
    return PastEventsOrganizerCtrl;
}());
angular
    .module('app.events-organizer')
    .controller('PastEventsOrganizerCtrl', PastEventsOrganizerCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var EventDetailSponsorCtrl = (function () {
    function EventDetailSponsorCtrl($scope, $stateParams, $rootScope, $translate, $ionicModal, $ionicHistory, $cordovaToast, eventService, utilsService, sponsorshipService, notificationService, userAuthService) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$rootScope = $rootScope;
        this.$translate = $translate;
        this.$ionicModal = $ionicModal;
        this.$ionicHistory = $ionicHistory;
        this.$cordovaToast = $cordovaToast;
        this.eventService = eventService;
        this.utilsService = utilsService;
        this.sponsorshipService = sponsorshipService;
        this.notificationService = notificationService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$scope',
            '$stateParams',
            '$rootScope',
            '$translate',
            '$ionicModal',
            '$ionicHistory',
            '$cordovaToast',
            'eventService',
            'utilsService',
            'sponsorshipService',
            'notificationService',
            'userAuthService'
        ];
        this.modalSponsorIt = null;
        this.newSponsorIt = {};
        this.userAuth = this.userAuthService.getUserAuth();
        this.event = _.findWhere(this.userAuth.events, { id: $stateParams.id });
        this.event.perks.forEach(this._preparatePerks, this);
        this._loadModalSponsorIt();
    }
    EventDetailSponsorCtrl.prototype._preparatePerks = function (perk) {
        perk.sponzorship = _.where(this.userAuth.sponzorships, { perk_id: perk.id });
        perk.already = _.findWhere(perk.sponzorship, { sponzor_id: this.userAuth.id });
        perk.tasks = _.where(perk.tasks, { type: "0" });
    };
    EventDetailSponsorCtrl.prototype._loadModalSponsorIt = function () {
        var _this = this;
        this.$ionicModal.fromTemplateUrl('templates/events-sponsor/sponsor-it-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            _this.modalSponsorIt = modal;
        });
    };
    EventDetailSponsorCtrl.prototype.openModalSponsorIt = function () {
        this.modalSponsorIt.show();
    };
    EventDetailSponsorCtrl.prototype.closeModalSponsorIt = function () {
        this.modalSponsorIt.hide();
        this.newSponsorIt = {};
    };
    EventDetailSponsorCtrl.prototype.createSponsorIt = function (perk) {
        this.newSponsorIt.perk = perk;
        this.openModalSponsorIt();
    };
    EventDetailSponsorCtrl.prototype.submitSponsorIt = function () {
        var _this = this;
        this.sponsorshipService.createSponzorship(this._preparateDataSponzorship())
            .then(function (newSponsorship) {
            _this.closeModalSponsorIt();
            _this.userAuth.sponzorships.push(newSponsorship);
            _this.event.perks.forEach(_this._preparatePerks, _this);
            _this.userAuthService.updateUserAuth(_this.userAuth);
            _this.$rootScope.$broadcast('MenuSponsorCtrl:count');
            _this.$rootScope.$broadcast('FollowEventsController:getSponzorships');
            var notification = {
                text: _this.event.title,
                link: '#/organizers/sponzors',
                modelId: newSponsorship.id
            };
            _this.notificationService.sendNewSponsorship(notification, _this.event.user_organizer.id, _this.event.user_organizer.ionic_id);
            _this.$cordovaToast.showShortBottom(_this.$translate.instant("MESSAGES.succ_sponsor_it"));
        })
            .catch(function (error) {
            _this.closeModalSponsorIt();
        });
    };
    EventDetailSponsorCtrl.prototype._preparateDataSponzorship = function () {
        return {
            sponzor_id: this.userAuth.id,
            perk_id: this.newSponsorIt.perk.id,
            event_id: this.event.id,
            organizer_id: this.event.user_organizer.id,
            status: 0,
            cause: this.newSponsorIt.cause
        };
    };
    return EventDetailSponsorCtrl;
}());
angular
    .module('app.events-sponzor')
    .controller('EventDetailSponsorCtrl', EventDetailSponsorCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var FollowEventsCtrl = (function () {
    function FollowEventsCtrl($scope, $rootScope, utilsService, userService, userAuthService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.utilsService = utilsService;
        this.userService = userService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$scope',
            '$rootScope',
            'utilsService',
            'userService',
            'userAuthService'
        ];
        this.sponzorships = [];
        this.showEmptyState = false;
        this.userAuth = this.userAuthService.getUserAuth();
        this.sponzorships = this.userAuth.sponzorships.filter(this._filterByDateAndByPending);
        this.showEmptyState = this.sponzorships.length == 0 ? true : false;
        this._registerListenerSponzorships();
    }
    FollowEventsCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.$scope.$broadcast('scroll.refreshComplete');
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.sponzorships = _this.userAuth.sponzorships.filter(_this._filterByDateAndByPending);
            _this.showEmptyState = _this.sponzorships.length == 0 ? true : false;
        })
            .catch(function (error) {
            _this.$scope.$broadcast('scroll.refreshComplete');
        });
    };
    FollowEventsCtrl.prototype._registerListenerSponzorships = function () {
        var _this = this;
        this.$rootScope.$on('FollowEventsController:getSponzorships', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.sponzorships = _this.userAuth.sponzorships.filter(_this._filterByDateAndByPending);
            _this.showEmptyState = _this.sponzorships.length == 0 ? true : false;
        });
    };
    FollowEventsCtrl.prototype._filterByDateAndByPending = function (item) {
        return item.status != '1' && moment(item.event.starts).isAfter(new Date());
    };
    return FollowEventsCtrl;
}());
angular
    .module('app.events-sponzor')
    .controller('FollowEventsCtrl', FollowEventsCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SponsoringEventsCtrl = (function () {
    function SponsoringEventsCtrl($scope, $rootScope, userService, utilsService, userAuthService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.userService = userService;
        this.utilsService = utilsService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$scope',
            '$rootScope',
            'userService',
            'utilsService',
            'userAuthService'
        ];
        this.sponzorships = [];
        this.showEmptyState = false;
        this.userAuth = this.userAuthService.getUserAuth();
        this.sponzorships = this.userAuth.sponzorships.filter(this._filterByAccepted);
        this.showEmptyState = this.sponzorships.length == 0 ? true : false;
        this._registerListenerSponzorships();
    }
    SponsoringEventsCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.$scope.$broadcast('scroll.refreshComplete');
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.sponzorships = _this.userAuth.sponzorships.filter(_this._filterByAccepted);
            _this.showEmptyState = _this.sponzorships.length == 0 ? true : false;
        })
            .catch(function (error) {
            _this.$scope.$broadcast('scroll.refreshComplete');
        });
    };
    SponsoringEventsCtrl.prototype._registerListenerSponzorships = function () {
        var _this = this;
        this.$rootScope.$on('SponsoringEventsCtrl:getSponzorships', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.sponzorships = _this.userAuth.sponzorships.filter(_this._filterByAccepted);
            _this.showEmptyState = _this.sponzorships.length == 0 ? true : false;
        });
    };
    SponsoringEventsCtrl.prototype._filterByAccepted = function (item) {
        return item.status == '1';
    };
    return SponsoringEventsCtrl;
}());
angular
    .module('app.events-sponzor')
    .controller('SponsoringEventsCtrl', SponsoringEventsCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Detail Event
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SponsorshipSponsorDetailCtrl = (function () {
    function SponsorshipSponsorDetailCtrl($scope, $rootScope, $stateParams, $translate, $ionicModal, $ionicHistory, $cordovaToast, utilsService, taskSponsorService, userAuthService, notificationService) {
        var _this = this;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$stateParams = $stateParams;
        this.$translate = $translate;
        this.$ionicModal = $ionicModal;
        this.$ionicHistory = $ionicHistory;
        this.$cordovaToast = $cordovaToast;
        this.utilsService = utilsService;
        this.taskSponsorService = taskSponsorService;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.$inject = [
            '$scope',
            '$rootScope',
            '$stateParams',
            '$translate',
            '$ionicModal',
            '$ionicHistory',
            '$cordovaToast',
            'utilsService',
            'taskSponsorService',
            'userAuthService',
            'notificationService'
        ];
        this.sponsorship = {};
        this.modalTask = null;
        this.isNewTask = true;
        this.sponsorTask = { task: {} };
        this.indexSlide = 0;
        this.userAuth = this.userAuthService.getUserAuth();
        this.sponsorship = _.findWhere(this.userAuth.sponzorships, { id: this.$stateParams.id });
        this.sponsorship.task_sponzor = this.sponsorship.task_sponzor.filter(function (item) { return item.task.user_id == _this.userAuth.id; });
        this._loadModalTask();
        this._registerListenerSponsorshipDetail();
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
        this.taskSponsorService.createTask(this._preparateTask())
            .then(function (data) {
            _this.sponsorship.perk.tasks.push(data.TaskSponzor.task);
            _this.sponsorship.task_sponzor.push(data.TaskSponzor);
            _this.hideModalTask(form);
            _this.notificationService.sendNewTaskSponsor({
                text: data.TaskSponzor.task.title,
                modelId: _this.sponsorship.id
            }, data.TaskSponzor.organizer_id, data.TaskSponzor.organizer_ionic_id);
            _this.utilsService.hideLoad();
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    SponsorshipSponsorDetailCtrl.prototype.deleteTask = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.taskSponsorService.deleteTask(this.sponsorTask.id)
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
        this.taskSponsorService.editPutTask(String(task.id), task)
            .then(function (TaskSponsor) {
            var perkTask = _.findWhere(_this.sponsorship.perk.tasks, { id: _this.sponsorTask.task.id });
            var taskSponzor = _.findWhere(_this.sponsorship.task_sponzor, { id: _this.sponsorTask.id });
            var indexPerkTask = _.indexOf(_this.sponsorship.perk.tasks, perkTask);
            var indexSponzorTask = _.indexOf(_this.sponsorship.task_sponzor, taskSponzor);
            if (_this.sponsorTask.status == 1 && TaskSponsor.status == "1") {
                _this.notificationService.sendDoneTaskSponsor({
                    text: _this.sponsorTask.task.title,
                    modelId: _this.sponsorship.id
                }, TaskSponsor.organizer_id, TaskSponsor.organizer_ionic_id);
            }
            else {
                _this.notificationService.sendUpdateTaskSponsor({
                    text: _this.sponsorTask.task.title,
                    modelId: _this.sponsorship.id
                }, TaskSponsor.organizer_id, TaskSponsor.organizer_ionic_id);
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
    SponsorshipSponsorDetailCtrl.prototype._registerListenerSponsorshipDetail = function () {
        var _this = this;
        this.$rootScope.$on('SponsorshipSponsorDetailCtrl:update', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.sponsorship = _.findWhere(_this.userAuth.sponzorships, { id: _this.$stateParams.id });
            _this.sponsorship.task_sponzor = _this.sponsorship.task_sponzor.filter(function (item) { return item.task.user_id == _this.userAuth.id; });
        });
    };
    return SponsorshipSponsorDetailCtrl;
}());
angular
    .module('app.events-sponzor')
    .controller('SponsorshipSponsorDetailCtrl', SponsorshipSponsorDetailCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Detail Sponsorship
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SponsorshipOrganizerDetailCtrl = (function () {
    function SponsorshipOrganizerDetailCtrl($stateParams, $rootScope, sponsorshipService, utilsService, userAuthService, notificationService) {
        var _this = this;
        this.$stateParams = $stateParams;
        this.$rootScope = $rootScope;
        this.sponsorshipService = sponsorshipService;
        this.utilsService = utilsService;
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.$inject = [
            '$stateParams',
            '$rootScope',
            'sponsorshipService',
            'utilsService',
            'userAuthService',
            'notificationService'
        ];
        this.sponsorship = {};
        this.showEmptyState = false;
        this.userAuth = this.userAuthService.getUserAuth();
        this.sponsorship = _.findWhere(this.userAuth.sponzorships_like_organizer, { id: this.$stateParams.id });
        this.sponsorship.task_sponzor = this.sponsorship.task_sponzor.filter(function (item) { return item.task.user_id != _this.userAuth.id; });
    }
    SponsorshipOrganizerDetailCtrl.prototype.sponsorAccept = function () {
        var _this = this;
        this.utilsService.confirm({
            title: 'Are you sure?',
            template: '<p class="text-center">In accept the sponsor</p>'
        })
            .then(function (rta) {
            if (rta)
                _this._updateSponsorship(1); //Accepted 
        });
    };
    SponsorshipOrganizerDetailCtrl.prototype.sponsorReject = function () {
        var _this = this;
        this.utilsService.confirm({
            title: 'Are you sure?',
            template: '<p class="text-center">In reject the sponsor</p>'
        })
            .then(function (rta) {
            if (rta)
                _this._updateSponsorship(2); //Deny
        });
    };
    SponsorshipOrganizerDetailCtrl.prototype._updateSponsorship = function (status) {
        var _this = this;
        this.utilsService.showLoad();
        var sponsorship = angular.copy(this.sponsorship);
        sponsorship.status = status;
        this.sponsorshipService.editSponzorshipPut(sponsorship.id, sponsorship)
            .then(function (sponsorship) {
            _this.utilsService.hideLoad();
            var notification = {
                text: _this.sponsorship.event.title,
                link: '#/sponzors/sponzoring',
                modelId: _this.sponsorship.id
            };
            _this.sponsorship.status = sponsorship.status;
            _this.$rootScope.$broadcast('SponsorshipsListCtrl:getSponzorships');
            _this.$rootScope.$broadcast('SponsorshipsPastEventsCtrl:getSponzorships');
            _this.$rootScope.$broadcast('SponsorshipsTabsCtrl:count_sponsors');
            if (_this.sponsorship.status == 1) {
                _this.notificationService.sendAcceptSponsorship(notification, _this.sponsorship.sponzor_id, _this.sponsorship.sponzor_ionic_id);
            }
            else if (_this.sponsorship.status == 2) {
                _this.notificationService.sendRejectSponsorship(notification, _this.sponsorship.sponzor_id, _this.sponsorship.sponzor_ionic_id);
            }
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    return SponsorshipOrganizerDetailCtrl;
}());
angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipOrganizerDetailCtrl', SponsorshipOrganizerDetailCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SponsorshipsListCtrl = (function () {
    function SponsorshipsListCtrl($scope, $rootScope, $ionicScrollDelegate, sponsorshipService, userService, utilsService, notificationService, userAuthService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$ionicScrollDelegate = $ionicScrollDelegate;
        this.sponsorshipService = sponsorshipService;
        this.userService = userService;
        this.utilsService = utilsService;
        this.notificationService = notificationService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$scope',
            '$rootScope',
            '$ionicScrollDelegate',
            'sponsorshipService',
            'userService',
            'utilsService',
            'notificationService',
            'userAuthService'
        ];
        this.sponsorships = [];
        this.showEmptyState = false;
        this.userAuth = this.userAuthService.getUserAuth();
        this.sponsorships = this.userAuth.sponzorships_like_organizer.filter(this._filterByDateIsAfter);
        this.showEmptyState = this.sponsorships.length == 0 ? true : false;
        this._registerListenerSponzorships();
    }
    SponsorshipsListCtrl.prototype.sponsorAccept = function (sponzor) {
        var _this = this;
        this.utilsService.confirm({
            title: 'Are you sure?',
            template: '<p class="text-center">In the accept the sponsor</p>'
        })
            .then(function (rta) {
            if (rta)
                _this._updateSponsorship(sponzor, 1); //Accepted 
        });
    };
    SponsorshipsListCtrl.prototype.sponsorReject = function (sponzor) {
        var _this = this;
        this.utilsService.confirm({
            title: 'Are you sure?',
            template: '<p class="text-center">In the reject the sponsor</p>'
        })
            .then(function (rta) {
            if (rta)
                _this._updateSponsorship(sponzor, 2); //Deny
        });
    };
    SponsorshipsListCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.$scope.$broadcast('scroll.refreshComplete');
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.sponsorships = _this.userAuth.sponzorships_like_organizer.filter(_this._filterByDateIsAfter);
            _this.showEmptyState = _this.sponsorships.length == 0 ? true : false;
        })
            .catch(function (error) {
            _this.showEmptyState = true;
        });
    };
    SponsorshipsListCtrl.prototype._updateSponsorship = function (sponzor, status) {
        var _this = this;
        this.utilsService.showLoad();
        var sponzorCopy = angular.copy(sponzor);
        sponzorCopy.status = status;
        this.sponsorshipService.editSponzorshipPut(sponzorCopy.id, sponzorCopy)
            .then(function (sponsorship) {
            _this.utilsService.hideLoad();
            sponzor.status = sponsorship.status;
            var notification = {
                text: sponzor.event.title,
                link: '#/sponzors/sponzoring',
                modelId: sponsorship.id
            };
            _this.$rootScope.$broadcast('SponsorshipsListCtrl:getSponzorships');
            _this.$rootScope.$broadcast('SponsorshipsPastEventsCtrl:getSponzorships');
            _this.$rootScope.$broadcast('SponsorshipsTabsCtrl:count_sponsors');
            if (sponzor.status == 1) {
                _this.notificationService.sendAcceptSponsorship(notification, sponsorship.sponzor_id, sponsorship.sponzor_ionic_id);
            }
            else if (sponzor.status == 2) {
                _this.notificationService.sendRejectSponsorship(notification, sponsorship.sponzor_id, sponsorship.sponzor_ionic_id);
            }
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    SponsorshipsListCtrl.prototype._registerListenerSponzorships = function () {
        var _this = this;
        this.$rootScope.$on('SponsorshipsListCtrl:getSponzorships', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.sponsorships = _this.userAuth.sponzorships_like_organizer.filter(_this._filterByDateIsAfter);
            ;
            _this.showEmptyState = _this.sponsorships.length == 0 ? true : false;
        });
    };
    SponsorshipsListCtrl.prototype._filterByDateIsAfter = function (item) {
        var today = moment(new Date()).subtract(1, 'days');
        return moment(item.event.ends).isAfter(today);
    };
    return SponsorshipsListCtrl;
}());
angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipsListCtrl', SponsorshipsListCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SponsorshipsPastEventsCtrl = (function () {
    function SponsorshipsPastEventsCtrl($scope, $rootScope, $ionicScrollDelegate, userService, userAuthService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$ionicScrollDelegate = $ionicScrollDelegate;
        this.userService = userService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$scope',
            '$rootScope',
            '$ionicScrollDelegate',
            'userService',
            'userAuthService'
        ];
        this.sponsorships = [];
        this.showEmptyState = false;
        this.userAuth = this.userAuthService.getUserAuth();
        this.sponsorships = this.userAuth.sponzorships_like_organizer.filter(this._filterByDateIsBefore);
        this.showEmptyState = this.sponsorships.length == 0 ? true : false;
        this._registerListenerSponzorships();
    }
    SponsorshipsPastEventsCtrl.prototype.doRefresh = function () {
        var _this = this;
        this.userService.home(this.userAuth.id)
            .then(function (user) {
            _this.$scope.$broadcast('scroll.refreshComplete');
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.sponsorships = _this.userAuth.sponzorships_like_organizer.filter(_this._filterByDateIsBefore);
            _this.showEmptyState = _this.sponsorships.length == 0 ? true : false;
        })
            .catch(function (error) {
            _this.showEmptyState = true;
        });
    };
    SponsorshipsPastEventsCtrl.prototype._registerListenerSponzorships = function () {
        var _this = this;
        this.$rootScope.$on('SponsorshipsPastEventsCtrl:getSponzorships', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.sponsorships = _this.userAuth.sponzorships_like_organizer.filter(_this._filterByDateIsBefore);
            _this.showEmptyState = _this.sponsorships.length == 0 ? true : false;
        });
    };
    SponsorshipsPastEventsCtrl.prototype._filterByDateIsBefore = function (item) {
        var today = moment(new Date()).subtract(1, 'days');
        return moment(item.event.ends).isBefore(today);
    };
    return SponsorshipsPastEventsCtrl;
}());
angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipsPastEventsCtrl', SponsorshipsPastEventsCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SponsorshipsTabsCtrl = (function () {
    function SponsorshipsTabsCtrl($rootScope, userAuthService) {
        this.$rootScope = $rootScope;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$rootScope',
            'userAuthService',
        ];
        this.count_events = 0;
        this.count_past_events = 0;
        this.userAuth = this.userAuthService.getUserAuth();
        this.count_events = this.userAuth.sponzorships_like_organizer.filter(this._filterByDateIsAfter).length;
        this.count_past_events = this.userAuth.sponzorships_like_organizer.length - this.count_events;
        this._registerListenerCounts();
    }
    SponsorshipsTabsCtrl.prototype._registerListenerCounts = function () {
        var _this = this;
        this.$rootScope.$on('SponsorshipsTabsCtrl:count_sponsors', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_events = _this.userAuth.sponzorships_like_organizer.length;
            _this.count_past_events = _this.userAuth.sponzorships_like_organizer.length - _this.count_events;
        });
    };
    SponsorshipsTabsCtrl.prototype._filterByDateIsAfter = function (item) {
        var today = moment(new Date()).subtract(1, 'days');
        return moment(item.event.ends).isAfter(today);
    };
    return SponsorshipsTabsCtrl;
}());
angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipsTabsCtrl', SponsorshipsTabsCtrl);

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
        this.modalSponsorship = null;
        this.isNewTask = true;
        this.task = {};
        this.perk = {};
        this.userAuth = this.userAuthService.getUserAuth();
        this.events = this.userAuth.events.filter(this._filterEvents);
        this.events.forEach(this._preparateEvents, this);
        this.showEmptyState = this.events.length == 0 ? true : false;
        this._loadTaskModal();
        this._loadSponsorshipModal();
        this._registerListenerPastTasksCtrl();
    }
    PastTasksCtrl.prototype._filterEvents = function (event) {
        var count = event.perks.reduce(function (a, b) { return a.concat(b.tasks); }, []);
        return moment(event.ends).isBefore(new Date()) && count.length > 0;
    };
    PastTasksCtrl.prototype._preparateEvents = function (event) {
        var _this = this;
        event.perks.forEach(function (perk) {
            perk.sponzorship = _.where(_this.userAuth.sponzorships_like_organizer, { perk_id: perk.id });
        });
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
    PastTasksCtrl.prototype._loadSponsorshipModal = function () {
        var _this = this;
        this.$ionicModal.fromTemplateUrl('templates/tasks-organizer/sponsorship-detail-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            _this.modalSponsorship = modal;
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
            }, sponzorship.sponzor_id, sponzorship.sponzor_ionic_id);
        }
    };
    PastTasksCtrl.prototype.sendDeleteTaskNotification = function (text) {
        for (var index = 0; index < this.events[this.indexEvent].perks[this.indexPerk].sponzorship.length; index++) {
            var sponzorship = this.events[this.indexEvent].perks[this.indexPerk].sponzorship[index];
            this.notificationService.sendDeleteTaskOrganizer({
                text: text,
                modelId: sponzorship.id
            }, sponzorship.sponzor_id, sponzorship.sponzor_ionic_id);
        }
    };
    PastTasksCtrl.prototype.sendUpdateTaskNotification = function (text, done) {
        for (var index = 0; index < this.events[this.indexEvent].perks[this.indexPerk].sponzorship.length; index++) {
            var sponzorship = this.events[this.indexEvent].perks[this.indexPerk].sponzorship[index];
            if (done) {
                this.notificationService.sendDoneTaskOrganizer({
                    text: text,
                    modelId: sponzorship.id
                }, sponzorship.sponzor_id, sponzorship.sponzor_ionic_id);
            }
            else {
                this.notificationService.sendUpdateTaskOrganizer({
                    text: text,
                    modelId: sponzorship.id
                }, sponzorship.sponzor_id, sponzorship.sponzor_ionic_id);
            }
        }
    };
    PastTasksCtrl.prototype.showModalTask = function () {
        this.modalTask.show();
    };
    PastTasksCtrl.prototype.openSponsorship = function (perk) {
        this.perk = perk;
        this.modalSponsorship.show();
    };
    PastTasksCtrl.prototype.hideModalSponsorship = function () {
        this.modalSponsorship.hide();
        this.perk = {};
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
            _this.sendDeleteTaskNotification(_this.events[_this.indexEvent].perks[_this.indexPerk].tasks[_this.indexTask].title);
            _this.events[_this.indexEvent].perks[_this.indexPerk].tasks.splice(_this.indexTask, 1);
            _this.hideModalTask(form);
            _this.utilsService.hideLoad();
            _this.$rootScope.$broadcast('PastTasksCtrl:getTasks');
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
            _this.$rootScope.$broadcast('PastTasksCtrl:getTasks');
            _this.$rootScope.$broadcast('TaskTabsCtrl:count_tasks');
            _this.$rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
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
    PastTasksCtrl.prototype._registerListenerPastTasksCtrl = function () {
        var _this = this;
        this.$rootScope.$on('PastTasksCtrl:getTasks', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.events = _this.userAuth.events.filter(_this._filterEvents);
            _this.events.forEach(_this._preparateEvents, _this);
            _this.showEmptyState = _this.events.length == 0 ? true : false;
        });
    };
    return PastTasksCtrl;
}());
angular
    .module('app.tasks-organizer')
    .controller('PastTasksCtrl', PastTasksCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var TaskTabsCtrl = (function () {
    function TaskTabsCtrl($rootScope, userAuthService) {
        this.$rootScope = $rootScope;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$rootScope',
            'userAuthService'
        ];
        this.count_tasks = 0;
        this.count_past_tasks = 0;
        this.userAuth = this.userAuthService.getUserAuth();
        this.count_tasks = this._countTasks(this.userAuth.events.filter(this._filterEventsIsAfter)).length;
        this.count_past_tasks = this._countTasks(this.userAuth.events.filter(this._filterEventsisBefore)).length;
        this._registerListenerCounts();
    }
    TaskTabsCtrl.prototype._registerListenerCounts = function () {
        var _this = this;
        this.$rootScope.$on('TaskTabsCtrl:count_tasks', function () {
            _this.userAuth = _this.userAuthService.getUserAuth();
            _this.count_tasks = _this._countTasks(_this.userAuth.events.filter(_this._filterEventsIsAfter)).length;
            _this.count_past_tasks = _this._countTasks(_this.userAuth.events.filter(_this._filterEventsisBefore)).length;
        });
    };
    TaskTabsCtrl.prototype._filterEventsIsAfter = function (event) {
        var count = event.perks.reduce(function (a, b) { return a.concat(b.tasks); }, []);
        var today = moment(new Date()).subtract(1, 'days');
        return moment(event.ends).isAfter(today) && count.length > 0;
    };
    TaskTabsCtrl.prototype._filterEventsisBefore = function (event) {
        var count = event.perks.reduce(function (a, b) { return a.concat(b.tasks); }, []);
        var today = moment(new Date()).subtract(1, 'days');
        return moment(event.ends).isBefore(today) && count.length > 0;
    };
    TaskTabsCtrl.prototype._countTasks = function (events) {
        var _this = this;
        return events
            .reduce(function (a, b) { return a.concat(b.perks); }, [])
            .reduce(function (a, b) { return a.concat(b.tasks); }, [])
            .filter(function (item) { return item.user_id == _this.userAuth.id && item.status != '1'; });
    };
    return TaskTabsCtrl;
}());
angular
    .module('app.tasks-organizer')
    .controller('TaskTabsCtrl', TaskTabsCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var TaskListCtrl = (function () {
    function TaskListCtrl($scope, $rootScope, $ionicModal, perkTaskService, userService, utilsService, userAuthService, notificationService) {
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
        this.modalSponsorship = null;
        this.isNewTask = true;
        this.task = {};
        this.perk = {};
        this.userAuth = this.userAuthService.getUserAuth();
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

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var ForgotCtrl = (function () {
    function ForgotCtrl($state, $ionicHistory, userService, utilsService) {
        this.$state = $state;
        this.$ionicHistory = $ionicHistory;
        this.userService = userService;
        this.utilsService = utilsService;
        this.$inject = [
            '$state',
            '$ionicHistory',
            'userService',
            'utilsService',
        ];
        this.user = {};
    }
    ForgotCtrl.prototype.resetPassword = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.userService.forgotPassword(this.user.email)
            .then(function () {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.utilsService.alert({
                title: 'Reset password',
                template: '<p class="text-center">Reset password Link sent, review your email.</p>'
            })
                .then(function () {
                _this.$ionicHistory.clearCache();
                _this.$state.go("signin");
                _this.user = {};
            });
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
        });
    };
    ;
    return ForgotCtrl;
}());
angular
    .module('app.users')
    .controller('ForgotCtrl', ForgotCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Interests of user
*
* @author Nicolas Molina
* @version 0.1
*/
var FormInterestsCtrl = (function () {
    function FormInterestsCtrl($state, utilsService, categoryService, userInterestService, userService, userAuthService) {
        this.$state = $state;
        this.utilsService = utilsService;
        this.categoryService = categoryService;
        this.userInterestService = userInterestService;
        this.userService = userService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$state',
            'utilsService',
            'categoryService',
            'userInterestService',
            'userService',
            'userAuthService'
        ];
        this.categories = [];
        this.userAuth = this.userAuthService.getUserAuth();
        this._getCategories();
    }
    FormInterestsCtrl.prototype.updateInterests = function () {
        var _this = this;
        this.utilsService.showLoad();
        this.userInterestService.bulkUserInterest(this.userAuth.id, {
            interests: this._getInterestCheck()
        })
            .then(function () {
            _this.utilsService.hideLoad();
            if (_this.userAuth.type == "0") {
                _this.$state.go("organizer.intro");
            }
            else {
                _this.$state.go("sponzor.intro");
            }
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    FormInterestsCtrl.prototype._getCategories = function () {
        var _this = this;
        this.utilsService.showLoad();
        this.categoryService.allCategories()
            .then(function (categories) {
            _this.utilsService.hideLoad();
            _this.categories = categories;
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    FormInterestsCtrl.prototype._getInterestCheck = function () {
        var _this = this;
        return this.categories
            .filter(function (item) { return item.interests; })
            .map(function (item) { return item.interests; })
            .reduce(function (a, b) { return a.concat(b); }, [])
            .filter(function (item) { return item.check; })
            .map(function (item) {
            return {
                'user_id': _this.userAuth.id,
                'interest_id': item.id_interest
            };
        });
    };
    return FormInterestsCtrl;
}());
angular
    .module('app.users')
    .controller('FormInterestsCtrl', FormInterestsCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Personal information of user
*
* @author Nicolas Molina
* @version 0.1
*/
var FormProfileCtrl = (function () {
    function FormProfileCtrl($state, $translate, userService, utilsService, userAuthService) {
        this.$state = $state;
        this.$translate = $translate;
        this.userService = userService;
        this.utilsService = utilsService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$state',
            '$translate',
            'userService',
            'utilsService',
            'userAuthService'
        ];
        this.userAuth = this.userAuthService.getUserAuth();
        this.userAuth.lang = 'en';
        this.userAuth.sex = 1;
    }
    FormProfileCtrl.prototype.changeLang = function () {
        this.$translate.use(this.userAuth.lang);
    };
    FormProfileCtrl.prototype.updateProfile = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.userService.editUserPatch(this.userAuth.id, this._preparateData())
            .then(function (user) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.$state.go("interests");
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    FormProfileCtrl.prototype._preparateData = function () {
        return {
            name: this.userAuth.name,
            age: this.userAuth.age,
            location: this.userAuth.location.formatted_address,
            location_reference: this.userAuth.location.place_id,
            lang: this.userAuth.lang,
            sex: this.userAuth.sex
        };
    };
    return FormProfileCtrl;
}());
angular
    .module('app.users')
    .controller('FormProfileCtrl', FormProfileCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var InviteUsersCtrl = (function () {
    function InviteUsersCtrl(userService, utilsService, userAuthService) {
        this.userService = userService;
        this.utilsService = utilsService;
        this.userAuthService = userAuthService;
        this.$inject = [
            'userService',
            'utilsService',
            'userAuthService'
        ];
        this.friend = {};
        this.userAuth = this.userAuthService.getUserAuth();
    }
    InviteUsersCtrl.prototype.inviteFriend = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.userService.invitedUser(this._preparateData())
            .then(function () {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.friend = {};
            _this.utilsService.alert({
                title: "Nice!",
                template: '<p class="text-center">Your Invitation was Sent.</p>'
            });
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    InviteUsersCtrl.prototype._preparateData = function () {
        return {
            user_id: this.userAuth.id,
            email: this.friend.email,
            message: "Try this ;)"
        };
    };
    return InviteUsersCtrl;
}());
angular
    .module('app.users')
    .controller('InviteUsersCtrl', InviteUsersCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Login user
*
* @author Nicolas Molina
* @version 0.1
*/
var LoginCtrl = (function () {
    function LoginCtrl($state, $q, $translate, $base64, $localStorage, $ionicUser, $ionicAuth, userService, utilsService, notificationService, userAuthService) {
        this.$state = $state;
        this.$q = $q;
        this.$translate = $translate;
        this.$base64 = $base64;
        this.$localStorage = $localStorage;
        this.$ionicUser = $ionicUser;
        this.$ionicAuth = $ionicAuth;
        this.userService = userService;
        this.utilsService = utilsService;
        this.notificationService = notificationService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$state',
            '$q',
            '$translate',
            '$base64',
            '$localStorage',
            '$ionicUser',
            '$ionicAuth',
            'userService',
            'utilsService',
            'notificationService',
            'userAuthService',
        ];
        this.user = {};
        if (userAuthService.checkSession()) {
            this.user = this.userAuthService.getUserAuth();
            if (this.user.type == 0) {
                this.$state.go("organizer.home");
            }
            else {
                this.$state.go("sponzor.home");
            }
        }
    }
    LoginCtrl.prototype.signIn = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this.userService.login(this.user.email, this.user.password)
            .then(function (user) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.$localStorage.token = _this.$base64.encode(_this.user.email + ':' + _this.user.password);
            _this.user = _this.userAuthService.updateUserAuth(user);
            _this.notificationService.activate();
            _this._validateIonicId(user)
                .then(function (data) {
                console.log(data);
                if (_this.user.type == 0) {
                    _this.$state.go("organizer.home");
                }
                else {
                    _this.$state.go("sponzor.home");
                }
                _this.user = {};
            })
                .catch(function (error) {
                console.log(error);
            });
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
            if (_this.utilsService.trim(error.message) === "Invalid credentials") {
                _this.utilsService.alert({
                    title: _this.$translate.instant("ERRORS.signin_title_credentials"),
                    template: "<p class=\"text-center\">" + _this.$translate.instant("ERRORS.signin_incorrect_credentials") + "</p>"
                });
            }
            _this.user.password = '';
        });
    };
    ;
    LoginCtrl.prototype._loginInIonicIO = function (email, password) {
        return this.$ionicAuth
            .login(
        //authProvider
        'basic', 
        //authSettings
        { 'remember': true }, 
        //data
        {
            'email': email,
            'password': password
        });
    };
    LoginCtrl.prototype._registerInIonicIO = function (email, password) {
        var _this = this;
        return this.$ionicAuth
            .signup({
            'email': email,
            'password': password
        })
            .then(function (data) {
            _this.user.ionic_id = _this.$ionicUser.current()._id;
            return _this._uploadProfile();
        })
            .catch(function (error) {
            return _this.$q.reject(error);
        });
    };
    LoginCtrl.prototype._uploadProfile = function () {
        return this.userService.editUserPatch(this.user.id, this.user);
    };
    LoginCtrl.prototype._validateIonicId = function (user) {
        if (user.ionic_id == "") {
            return this._registerInIonicIO(this.user.email, this.user.password);
        }
        return this._loginInIonicIO(this.user.email, this.user.password);
    };
    return LoginCtrl;
}());
angular
    .module('app.users')
    .controller('LoginCtrl', LoginCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var NotificationsCtrl = (function () {
    function NotificationsCtrl(userAuthService, notificationService) {
        this.userAuthService = userAuthService;
        this.notificationService = notificationService;
        this.$inject = [
            'userAuthService',
            'notificationService'
        ];
        this.notifications = [];
        this.userAuth = this.userAuthService.getUserAuth();
        this.notifications = this.notificationService.getNotifications(this.userAuth.id);
        /*this.notifications = [
            {
              title: 'nuevo',
              text: 'Angular 2',
              typeNotification: 'newSponsorship',
              type: 'sponsorship',
              date: new Date(),
              modelId: 1,
              read: false,
              toApp: 'mobileApp'
            },
            {
              title: 'nuevo',
              text: 'Angular 2',
              typeNotification: 'acceptSponsorship',
              type: 'sponsorship',
              date: new Date(),
              modelId: 1,
              read: false,
              toApp: 'mobileApp'
            },
            {
              title: 'nuevo',
              text: 'Angular 2',
              typeNotification: 'rejectSponsorship',
              type: 'sponsorship',
              date: new Date(),
              modelId: 1,
              read: false,
              toApp: 'mobileApp'
            },
            {
              title: 'nuevo',
              text: 'Angular 2',
              typeNotification: 'newTaskOrganizer',
              type: 'task',
              date: new Date(),
              modelId: 1,
              read: false,
              toApp: 'mobileApp'
            },
            {
              title: 'nuevo',
              text: 'Angular 2',
              typeNotification: 'updateTaskOrganizer',
              type: 'task',
              date: new Date(),
              modelId: 1,
              read: false,
              toApp: 'mobileApp'
            },
            {
              title: 'nuevo',
              text: 'Angular 2',
              typeNotification: 'doneTaskOrganizer',
              type: 'task',
              date: new Date(),
              modelId: 1,
              read: false,
              toApp: 'mobileApp'
            },
          ];*/
    }
    return NotificationsCtrl;
}());
angular
    .module('app.users')
    .controller('NotificationsCtrl', NotificationsCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var ProfileCtrl = (function () {
    function ProfileCtrl($cordovaToast, $cordovaCamera, userService, utilsService, imgurService, userAuthService) {
        this.$cordovaToast = $cordovaToast;
        this.$cordovaCamera = $cordovaCamera;
        this.userService = userService;
        this.utilsService = utilsService;
        this.imgurService = imgurService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$cordovaToast',
            '$cordovaCamera',
            'userService',
            'utilsService',
            'imgurService',
            'userAuthService'
        ];
        this.imageURI = null;
        this.userAuth = this.userAuthService.getUserAuth();
    }
    ProfileCtrl.prototype.getPhoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 500,
            targetHeight: 500,
            //popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        this.$cordovaCamera.getPicture(options)
            .then(function (imageURI) {
            _this.imageURI = imageURI;
            _this.userAuth.image = "data:image/jpeg;base64," + imageURI;
        });
        //.catch( failed );
    };
    ProfileCtrl.prototype.submitProfile = function (form) {
        this.utilsService.showLoad();
        if (this.imageURI) {
            this._uploadProfileWithImage(form);
        }
        else {
            this._uploadProfile(form);
        }
    };
    ProfileCtrl.prototype._uploadProfileWithImage = function (form) {
        var _this = this;
        this.imgurService.uploadImage(this.imageURI)
            .then(function (image) {
            _this.userAuth.image = image;
            return _this.userService.editUserPatch(_this.userAuth.id, _this.userAuth);
        })
            .then(function (user) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.$cordovaToast.showShortBottom("Su perfil se ha actulizado");
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    ProfileCtrl.prototype._uploadProfile = function (form) {
        var _this = this;
        this.userService.editUserPatch(this.userAuth.id, this.userAuth)
            .then(function (user) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.userAuth = _this.userAuthService.updateUserAuth(user);
            _this.$cordovaToast.showShortBottom("Su perfil se ha actulizado");
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    return ProfileCtrl;
}());
angular
    .module('app.users')
    .controller('ProfileCtrl', ProfileCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Login user
*
* @author Nicolas Molina
* @version 0.1
*/
var RegisterCtrl = (function () {
    function RegisterCtrl($state, $translate, $base64, $localStorage, $ionicUser, $ionicAuth, userService, utilsService, notificationService, userAuthService) {
        this.$state = $state;
        this.$translate = $translate;
        this.$base64 = $base64;
        this.$localStorage = $localStorage;
        this.$ionicUser = $ionicUser;
        this.$ionicAuth = $ionicAuth;
        this.userService = userService;
        this.utilsService = utilsService;
        this.notificationService = notificationService;
        this.userAuthService = userAuthService;
        this.$inject = [
            '$state',
            '$translate',
            '$base64',
            '$localStorage',
            '$ionicUser',
            '$ionicAuth',
            'userService',
            'utilsService',
            'notificationService',
            'userAuthService'
        ];
        this.newUser = {};
        this.newUser.type = 0;
    }
    RegisterCtrl.prototype.registerNewUser = function (form) {
        var _this = this;
        this.utilsService.showLoad();
        this._registerInIonicIO(this.newUser.email, this.newUser.password)
            .then(function (data) {
            _this.newUser.ionic_id = _this.$ionicUser.current()._id;
            return _this.userService.createUser(_this._preparateData());
        })
            .then(function (user) {
            return _this.userService.login(_this.newUser.email, _this.newUser.password);
        })
            .then(function (user) {
            _this.utilsService.hideLoad();
            _this.utilsService.resetForm(form);
            _this.utilsService.alert({
                title: _this.$translate.instant("MESSAGES.succ_user_tit"),
                template: _this.$translate.instant("MESSAGES.succ_user_mess")
            });
            _this.$localStorage.token = _this.$base64.encode(_this.newUser.email + ':' + _this.newUser.password);
            _this.newUser = {};
            _this.newUser.type = 0;
            _this.userAuthService.updateUserAuth(user);
            _this.notificationService.activate();
            _this.$state.go("profile");
        })
            .catch(function (data) {
            _this.utilsService.hideLoad();
            if (_this.utilsService.trim(data.message) === "Invalid credentials") {
                _this.utilsService.alert({
                    title: _this.$translate.instant("ERRORS.signin_title_credentials"),
                    template: _this.$translate.instant("ERRORS.signin_incorrect_credentials")
                });
            }
            else if (_this.utilsService.trim(data.message) === "Not inserted") {
                _this.utilsService.alert({
                    title: _this.$translate.instant("ERRORS.signin_notinserted_credentials_title"),
                    template: _this.$translate.instant("ERRORS.signin_notinserted_credentials_message")
                });
            }
            else if (data.error && _this.utilsService.trim(data.error.email) === "The email has already been taken.") {
                _this.utilsService.alert({
                    title: _this.$translate.instant("ERRORS.signin_taken_credentials_title"),
                    template: _this.$translate.instant("ERRORS.signin_taken_credentials_message")
                });
            }
        });
    };
    RegisterCtrl.prototype._registerInIonicIO = function (email, password) {
        return this.$ionicAuth.signup({
            'email': email,
            'password': password
        });
    };
    RegisterCtrl.prototype._preparateData = function () {
        return {
            email: this.newUser.email,
            password: this.newUser.password,
            password_confirmation: this.newUser.password,
            name: this.newUser.name,
            lang: 'en',
            type: this.newUser.type,
            ionic_id: this.newUser.ionic_id
        };
    };
    return RegisterCtrl;
}());
angular
    .module('app.users')
    .controller('RegisterCtrl', RegisterCtrl);

/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
var SettingsCtrl = (function () {
    function SettingsCtrl($translate, $cordovaToast, $ionicDeploy, utilsService, BackendVariables) {
        this.$translate = $translate;
        this.$cordovaToast = $cordovaToast;
        this.$ionicDeploy = $ionicDeploy;
        this.utilsService = utilsService;
        this.BackendVariables = BackendVariables;
        this.$inject = [
            '$translate',
            '$cordovaToast',
            '$ionicDeploy',
            'utilsService',
            'BackendVariables'
        ];
        this.lang = this.$translate.use();
        this.$ionicDeploy.setChannel(BackendVariables.channel);
    }
    SettingsCtrl.prototype.save = function () {
        this.$translate.use(this.lang);
    };
    SettingsCtrl.prototype.checkForUpdates = function () {
        var _this = this;
        this.utilsService.showLoad();
        this.$ionicDeploy.check()
            .then(function (hasUpdate) {
            _this.utilsService.hideLoad();
            if (hasUpdate) {
                _this.utilsService.confirm({
                    title: _this.$translate.instant("MESSAGES.update_title"),
                    template: '<p class="text-center">' + _this.$translate.instant("MESSAGES.update_text") + '</p>'
                })
                    .then(function (rta) {
                    if (rta)
                        _this._doUpdate();
                });
            }
            else {
                _this.utilsService.alert({
                    title: _this.$translate.instant("MESSAGES.update_title"),
                    template: '<p class="text-center">' + _this.$translate.instant("MESSAGES.update_text_nothing") + '</p>'
                });
            }
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
        });
    };
    SettingsCtrl.prototype._doUpdate = function () {
        var _this = this;
        this.utilsService.showLoad();
        this.$ionicDeploy.update()
            .then(function () {
            _this.utilsService.hideLoad();
            _this.$cordovaToast.showShortBottom(_this.$translate.instant("MESSAGES.update_success"));
        })
            .catch(function (error) {
            _this.utilsService.hideLoad();
            _this.utilsService.alert();
        });
    };
    return SettingsCtrl;
}());
angular
    .module('app.users')
    .controller('SettingsCtrl', SettingsCtrl);

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

/// <reference path="../typings/tsd.d.ts" />
/**
* @author Nicolas Molina
* @version 0.1
*/
(function () {
    'use strict';
    angular
        .module('app')
        .run(run);
    function run($ionicPlatform, $translate, $cordovaGlobalization, $ionicPopup, $ionicDeploy, utilsService, $cordovaToast, $ionicAnalytics, $ionicPush, $localStorage, userAuthService, notificationService, BackendVariables) {
        //function run($ionicPlatform ) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            registerToken();
            activateNotifications();
            chooseLanguage();
            ionicAnalytics();
        });
        function activateNotifications() {
            if (userAuthService.checkSession()) {
                notificationService.activate();
                userAuthService.refresh();
            }
        }
        function ionicAnalytics() {
            $ionicAnalytics.register();
            $ionicAnalytics.setGlobalProperties({
                app_version_number: BackendVariables.version,
                channel: BackendVariables.channel,
                day_of_week: (new Date()).getDay()
            });
        }
        function registerToken() {
            $ionicPush.init({
                "debug": true,
                "onNotification": function (notification) {
                    var payload = notification.payload;
                    console.log(notification, payload);
                },
                "onRegister": function (data) {
                    $ionicPush.saveToken(data.token);
                }
            });
            $ionicPush.register();
        }
        function chooseLanguage() {
            if (!checkChooseLang()) {
                $cordovaGlobalization.getPreferredLanguage()
                    .then(complete)
                    .catch(failed);
            }
            else {
                checkForUpdates();
            }
            function complete(language) {
                var lang = (language.value).split("-")[0];
                var messages = {
                    'es': '¿Quieres cambiar el lenguaje a Español?',
                    'en': ' Do you want changue the language to English?',
                    'pt': '¿Você quer mudar a língua para Português?'
                };
                $ionicPopup.confirm({
                    title: 'Language',
                    template: '<p class="text-center">' + messages[lang] + '</p>'
                })
                    .then(function (rta) {
                    if (rta) {
                        $translate.use(lang);
                    }
                    else {
                        $translate.use("en");
                    }
                    $localStorage.chooseLang = true;
                })
                    .then(checkForUpdates);
            }
            function failed(error) {
                $translate.use("en");
            }
        }
        function checkChooseLang() {
            if (angular.isDefined($localStorage.chooseLang)) {
                return true;
            }
            return false;
        }
        function checkForUpdates() {
            $ionicDeploy.setChannel(BackendVariables.channel);
            $ionicDeploy.check()
                .then(complete);
            function complete(hasUpdate) {
                if (hasUpdate) {
                    utilsService.confirm({
                        title: $translate.instant("MESSAGES.update_title"),
                        template: '<p class="text-center">' + $translate.instant("MESSAGES.update_text") + '</p>'
                    })
                        .then(function (rta) {
                        if (rta)
                            doUpdate();
                    });
                }
            }
        }
        function doUpdate() {
            utilsService.showLoad();
            $ionicDeploy.update()
                .then(complete)
                .catch(failed);
            function complete() {
                utilsService.hideLoad();
                $cordovaToast.showShortBottom($translate.instant("MESSAGES.update_success"));
            }
            function failed() {
                utilsService.hideLoad();
                utilsService.alert();
            }
        }
    }
})();
