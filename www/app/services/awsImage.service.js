/**
* @Servicio para subir imagenes con amazon
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('awsImageService', awsImageService);

  awsImageService.$inject = [
    'AMAZON',
    '$q',
    '$cordovaFileTransfer'
  ];

  function awsImageService( AMAZON, $q, $cordovaFileTransfer ) {

    var accessKeyId = AMAZON.AMAZONKEY;
    var secretAccessKey = AMAZON.AMAZONSECRET;
    var region = AMAZON.AMAZONBUCKETREGION;
    var urlImg = AMAZON.AMAZONBUCKETURL;
    var server = 'https://'+  AMAZON.AMAZONBUCKET +'.s3.amazonaws.com/';

    var service = {
      uploadImage: uploadImage,
    };

    return service;

    ////////////

    function makeNameImage(){

      function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };

      // Generate a pseudo-GUID by concatenating random hexadecimal.
      function guid() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
      };

      return guid() + ".jpg";
    }

    function uploadImage( image ){

      var fileName = makeNameImage();
      var filePath =  image;

      var options = {};
      options.fileKey = "file";
      options.fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      options.chunkedMode = false;
      options.params = {
        AWSAccessKeyId: accessKeyId,
        Key: filePath,
        ContentType: 'image/jpeg',
      };

      return $cordovaFileTransfer.upload(server, filePath, options)
        .then( complete )
        .catch( failed );

        function complete( response ){
          console.log( response );
          return $q.when( urlImg + fileName );
        }

        function failed( error ){
          console.log( error );
          return $q.reject( error );
        }
    }

  }
})();
