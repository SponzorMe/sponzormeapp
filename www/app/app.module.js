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
    //'app.widgets',
    //Feature areas
    'app.users',
    'app.dashboard-organizer',
    //'app.dashboard',
    //'app.layout'
  ])
})();