/// <reference path="../typings/tsd.d.ts" />
/**
* @File the start the app
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';
  
  let modules = [
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
    'ionic-material',
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
  ];
  
  angular.module('app', modules)
})();