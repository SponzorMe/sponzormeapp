(function() {
  'use strict';

  angular
    .module('app.filters')
    .filter('humanize', humanizeFilter);

  humanizeFilter.$inject = [];
  
  function humanizeFilter() {
    return function( time ){
     return moment.duration(-time, "hours").humanize(true); 
    }
  }
})();