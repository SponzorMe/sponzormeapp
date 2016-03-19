/// <reference path="../../typings/main.d.ts" />
/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2

(function() {
  'use strict';

  angular
    .module('app')
    .factory('imgurService', imgurService);

  imgurService.$inject = [
    '$http',
    '$q'
  ];

  function imgurService( $http, $q ) {

    var path = 'https://api.imgur.com/3/';
    var clientId = "bdff09d775f47b9";

    var service = {
      uploadImage: uploadImage,
    };

    return service;

    ////////////

    function uploadImage( image ){

      var typeImage = typeof image;
      if(typeImage !== 'string') throw new Error();

      return $http({
        method: 'POST',
        url: path + 'image',
        headers: {
          'Authorization' : 'Client-ID '+ clientId
        },
        data: {
          image: image,
          type: 'base64'
        },
      })
      .then( complete )
      .catch( failed );

      function complete( response ) {
        return $q.when( response.data.data.link );
      }

      function failed( response ) {
        return $q.reject( response.data );
      }
    }

  }
})();
*/ 
