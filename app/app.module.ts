/// <reference path="../typings/tsd.d.ts" />
/**
* @File the start the app
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';
  angular.module('app', [
    // Core 
    'ionic',
    'ionic.service.core',
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
  ])
})();