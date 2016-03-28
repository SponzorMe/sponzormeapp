/// <reference path="../typings/main.d.ts" />
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
            .state('tests', {
            url: '/tests',
            templateUrl: 'templates/users/tests.html',
            controller: 'TestsController as test'
        })
            .state('signin', {
            url: '/sign-in',
            templateUrl: 'templates/users/login.html',
            controller: 'LoginController as login'
        })
            .state('joinnow', {
            url: "/joinnow",
            templateUrl: "templates/users/register.html"
        })
            .state('profile', {
            url: "/profile",
            templateUrl: "templates/users/form-profile.html"
        })
            .state('interests', {
            url: "/interests",
            templateUrl: "templates/users/form-interests.html"
        })
            .state('forgot-password', {
            url: "/forgot-password",
            templateUrl: "templates/users/forgot-password.html"
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
                    templateUrl: "templates/dashboard-organizer/intro.html"
                }
            }
        })
            .state('organizer.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/dashboard-organizer/home.html"
                }
            }
        })
            .state('organizer.profile', {
            url: "/profile",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/profile.html"
                }
            }
        })
            .state('organizer.events', {
            url: "/events",
            abstract: true,
            views: {
                'menuContent': {
                    templateUrl: "templates/events-organizer/event-list-tabs.html"
                }
            }
        })
            .state('organizer.events.list', {
            url: "/list",
            views: {
                'tabEventList': {
                    templateUrl: "templates/events-organizer/event-list.html"
                }
            }
        })
            .state('organizer.events.detail-list', {
            url: "/event/:idEvent",
            views: {
                'tabEventList': {
                    templateUrl: "templates/events-organizer/event-detail.html"
                }
            }
        })
            .state('organizer.events.past', {
            url: "/past",
            views: {
                'tabPastEvents': {
                    templateUrl: "templates/events-organizer/past-events.html"
                }
            }
        })
            .state('organizer.events.detail-past', {
            url: "/past-event/:idEvent",
            views: {
                'tabPastEvents': {
                    templateUrl: "templates/events-organizer/event-detail.html"
                }
            }
        })
            .state('organizer.addevent', {
            url: "/addevent",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-organizer/add-event.html"
                }
            },
            cache: false
        })
            .state('organizer.editevent', {
            url: "/editevent/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-organizer/edit-event.html"
                }
            },
            cache: false
        })
            .state('organizer.event', {
            url: "/event/:idEvent",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-organizer/event-detail.html"
                }
            }
        })
            .state('organizer.sponsorships', {
            url: "/sponsorships",
            views: {
                'menuContent': {
                    templateUrl: "templates/sponsors-organizer/sponsorships-tabs.html"
                }
            }
        })
            .state('organizer.sponsorships.list', {
            url: "/list",
            views: {
                'tabEventList': {
                    templateUrl: "templates/sponsors-organizer/sponsorships-list.html"
                }
            }
        })
            .state('organizer.sponsorships.past', {
            url: "/past",
            views: {
                'tabPastEvents': {
                    templateUrl: "templates/sponsors-organizer/sponsorships-past-events.html"
                }
            }
        })
            .state('organizer.sponsorship', {
            url: "/sponsorship/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/sponsors-organizer/sponsorship-detail.html"
                }
            }
        })
            .state('organizer.tasks', {
            url: "/tasks",
            abstract: true,
            views: {
                'menuContent': {
                    templateUrl: "templates/tasks-organizer/task-list-tabs.html"
                }
            }
        })
            .state('organizer.tasks.list', {
            url: "/list",
            views: {
                'tabTasksList': {
                    templateUrl: "templates/tasks-organizer/task-list.html"
                }
            }
        })
            .state('organizer.tasks.list-past', {
            url: "/past",
            views: {
                'tabPastTasks': {
                    templateUrl: "templates/tasks-organizer/past-tasks.html"
                }
            }
        })
            .state('organizer.invite', {
            url: "/invite",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/invite-users.html"
                }
            }
        })
            .state('organizer.settings', {
            url: "/settings",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/settings.html"
                }
            }
        })
            .state('organizer.notifications', {
            url: "/notifications",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/notifications.html"
                }
            }
        })
            .state('sponzor', {
            url: "/sponzor",
            abstract: true,
            templateUrl: "templates/dashboard-sponzor/menu.html"
        })
            .state('sponzor.intro', {
            url: "/intro",
            views: {
                'menuContent': {
                    templateUrl: "templates/dashboard-sponzor/intro.html"
                }
            }
        })
            .state('sponzor.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/dashboard-sponzor/home.html"
                }
            }
        })
            .state('sponzor.following', {
            url: "/following",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-sponsor/follow-events.html"
                }
            }
        })
            .state('sponzor.sponzoring', {
            url: "/sponzoring",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-sponsor/sponsoring-events.html"
                }
            }
        })
            .state('sponzor.profile', {
            url: "/profile",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/profile.html"
                }
            }
        })
            .state('sponzor.event', {
            url: "/event/:idEvent",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-sponsor/event-detail.html"
                }
            }
        })
            .state('sponzor.sponsorship', {
            url: "/sponsorship/:id",
            views: {
                'menuContent': {
                    templateUrl: "templates/events-sponsor/sponsorship-detail.html"
                }
            }
        })
            .state('sponzor.invite', {
            url: "/invite",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/invite-users.html"
                }
            }
        })
            .state('sponzor.settings', {
            url: "/settings",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/settings.html"
                }
            }
        })
            .state('sponzor.notifications', {
            url: "/notifications",
            views: {
                'menuContent': {
                    templateUrl: "templates/users/notifications.html"
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
