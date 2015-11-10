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
    'ngCordova',
    'ngMessages',
    'ngStorage',
    'ngIOS9UIWebViewPatch',
    'pascalprecht.translate',
    'base64',
    //'app.widgets',
    //Feature areas
    'app.users',
    'app.dashboard-organizer',
    'app.events-organizer',
    //'app.dashboard',
    //'app.layout'
  ])
})();