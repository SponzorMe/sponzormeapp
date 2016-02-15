/**
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app')
    .value('BackendVariables',{
      url: "https://apistaging.sponzor.me/", // i'm using the Ionic Proxy
      url_web: "https://sponzor.me/",
    })
    .value('AMAZON',{
      'AMAZONSECRET': 'RlzqEBFUlJW/8YGkeasfmTZRLTlWMWwaBpJNBxu6',
      'AMAZONKEY': 'AKIAJDGUKWK3H7SJZKSQ',
      'AMAZONBUCKET': 'sponzormewebappimages',
      'AMAZONBUCKETREGION': 'us-west-2',
      'AMAZONBUCKETURL': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/',
    });
})();
