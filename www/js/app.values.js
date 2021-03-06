/// <reference path="../typings/tsd.d.ts" />
/**
* @author Nicolas Molina
* @version 0.1
*/
(function () {
    'use strict';
    angular
        .module('app')
        .value('BackendVariables', {
        url: "https://api.sponzor.me/",
        f_url: "https://sponzorme.firebaseio.com/production/",
        url_web: "https://sponzor.me/",
        version: "v1.1.1",
        channel: "dev"
    })
        .value('AMAZON', {
        'AMAZONSECRET': 'RlzqEBFUlJW/8YGkeasfmTZRLTlWMWwaBpJNBxu6',
        'AMAZONKEY': 'AKIAJDGUKWK3H7SJZKSQ',
        'AMAZONBUCKET': 'sponzormewebappimages',
        'AMAZONBUCKETREGION': 'us-west-2',
        'AMAZONBUCKETURL': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/'
    });
})();
