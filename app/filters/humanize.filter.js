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