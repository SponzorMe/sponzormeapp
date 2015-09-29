'use strict';
(function () {
angular.module('App').factory('gStorage', function(googleConfiguration, $log, $timeout, BackendVariables) {
  return {
      load: function() {
      if (angular.isUndefined(gapi.client)) {
        $timeout(load, 500);
      } else {
        gapi.client.setApiKey(googleConfiguration.apiKey);
        gapi.auth.setToken(BackendVariables.token);
        gapi.client.load('storage', googleConfiguration.api_version , function() {
          $log.log('loaded! :');
          BackendVariables.ready = "true";
          var request = gapi.client.storage.buckets.list({ project: googleConfiguration.project});
          $log.log(angular.toJson(request));
          request.execute(function(response) { $log.log(angular.toJson(request)); });
        });
        }
      },
      getToken: function() {
        $log.log("getToken()");
        var pHeader = {"alg":"RS256","typ":"JWT"}
        var sHeader = angular.toJson(pHeader);
        var pClaim = {};
        pClaim.aud = "https://www.googleapis.com/oauth2/v3/token";
        pClaim.scope = googleConfiguration.scopes;
        pClaim.iss = googleConfiguration.client_email;
        pClaim.exp = KJUR.jws.IntDate.get("now + 1hour");
        pClaim.iat = KJUR.jws.IntDate.get("now");

        var sClaim = angular.toJson(pClaim);
        var sJWS = KJUR.jws.JWS.sign(null, sHeader, sClaim, googleConfiguration.private_key);
        $log.log("sJWS: ", sJWS);
        var XHR = new XMLHttpRequest();
        var urlEncodedData = "";
        var urlEncodedDataPairs = [];

        urlEncodedDataPairs.push(encodeURIComponent("grant_type") + '=' + encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer"));
        urlEncodedDataPairs.push(encodeURIComponent("assertion") + '=' + encodeURIComponent(sJWS));
        urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

        // We define what will happen if the data are successfully sent
        XHR.addEventListener('load', function(event) {
            var response = JSON.parse(XHR.responseText);
            BackendVariables.token = response["access_token"];
            $log.log("oauth token: ", BackendVariables.token);
        });

        // We define what will happen in case of error
        XHR.addEventListener('error', function(event) {
            $log.log('Oops! Something went wrong.');
        });

        XHR.open('POST', 'https://www.googleapis.com/oauth2/v3/token');
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XHR.send(urlEncodedData)

        },
      listObjects: function(bucketObject) {
        if (angular.isUndefined(gapi.client)) {
          $timeout(load, 500);
        } else {
            if(BackendVariables.ready==="true"){
            $log.log('listObjects()!!');
            var request = gapi.client.storage.objects.list({ bucket : bucketObject});
            $log.log("Info sent: ",angular.toJson(request));
            request.execute(function(response) { $log.log("Response: " , angular.toJson(request)); });
            }
          }
        }

  }

});
})();
