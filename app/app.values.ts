/// <reference path="../typings/tsd.d.ts" />
/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .value('BackendVariables',{
      //url: "https://apistaging.sponzor.me/", // i'm using the Ionic Proxy
      url: "https://api.sponzor.me/", // i'm using the Ionic Proxy
      //f_url: "https://sponzorme.firebaseio.com/staging/",
      f_url: "https://sponzorme.firebaseio.com/production/",
      url_web: "https://sponzor.me/",
      version: "v1.2.4",
      channel: "v1.2.4",
      debug: false,
    })
    .value('AMAZON',{
      'AMAZONSECRET': 'RlzqEBFUlJW/8YGkeasfmTZRLTlWMWwaBpJNBxu6',
      'AMAZONKEY': 'AKIAJDGUKWK3H7SJZKSQ',
      'AMAZONBUCKET': 'sponzormewebappimages',
      'AMAZONBUCKETREGION': 'us-west-2',
      'AMAZONBUCKETURL': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/',
    })
    .value('IONIC',{
      'TOKEN': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0MDU3MDJkMi1lZDdkLTRiNGEtYTMzNC1jNDZjMWVlZDJmM2YifQ.atiOm4djFPeewnRRNIzc5Wba3m0rkozNRBouEI1DcaE',
      'PROFILE': 'production',
      'URL': 'https://api.ionic.io/push/notifications'
    });
})();
