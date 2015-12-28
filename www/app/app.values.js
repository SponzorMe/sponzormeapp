/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .value('BackendVariables',{
      url: "http://apilocal.sponzor.me/", // i'm using the Ionic Proxy
      ready: "false"
    })
    .value('gAnalytics',{
      trackCode: "UA-54490148-5"
    })
    ;
})();
