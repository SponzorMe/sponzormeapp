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
    'ionic.service.deploy',
    'ngCordova',
    //'ngCordovaMocks',
    'ngMessages',
    'ngStorage',
    'ngIOS9UIWebViewPatch',
    'pascalprecht.translate',
    'base64',
    'tabSlideBox',
    //Widgets
    'app.widgets',
    //Feature areas
    'app.users',
    'app.dashboard-organizer',
    'app.dashboard-sponzor',
    'app.events-organizer',
    'app.events-sponzor',
    'app.sponsors-organizer',
    'app.tasks-organizer',
    'app.tasks-sponsor',
  ])
})();