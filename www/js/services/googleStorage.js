'use strict';
(function () {
angular.module('App').factory('gStorage', function(googleConfiguration,$log) {
  $log.log("Client ID:",gStorage.clientId);

  return {
    load: function load() {
      $log.log('loading google apis...');
      if (typeof gapi.client === 'undefined') {
        setTimeout(load, 500);
      } else {
        gapi.client.setApiKey(gStorage.apiKey);
        gapi.client.load('storage', gStorage.api_version , function() {
          $log.log('loaded! :)');
          var request = gapi.client.storage.buckets.list({ project: ''});
          $log.log(request);
          request.execute(function(response) { $log.log(response); });
        });
        }
      }
  }

});
})();
