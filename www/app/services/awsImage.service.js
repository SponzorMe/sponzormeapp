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
  ];

  function categoryService( AMAZON, $q ) {

    var accessKeyId = AMAZON.AMAZONSECRET;
    var secretAccessKey = AMAZON.AMAZONKEY;
    var region = AMAZON.AMAZONBUCKETREGION;
    var bucket = AMAZON.AMAZONBUCKET;
    var urlImg = AMAZON.AMAZONBUCKETURL;

    var service = {
      uploadImage: uploadImage,
    };

    return service;

    ////////////

    function config(){
      AWS.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
      });
      AWS.config.region = region;
    }

    function getParams( fileName, image ){
      return {
        Key: fileName,
        ContentType: 'image/jpeg'
        Body: image,
        ServerSideEncryption: 'AES256'
      }
    }

    function makeNameImage(){
      return "" + (new Date()).getTime() + ".jpg";
    }

    function createBucket(){
      return new AWS.S3({
        params: {
          Bucket: bucket
        }
      });
    }

    function uploadImage( image ){
      var fileName = makeNameImage();
      var params = getParams( fileName ,image );
      var bucketObj = createBucket();
      bucketObj.putObject( getParams( fileName ,image ), function(err, data) {
        if (!err) {
          console.log( urlImg + fileName );
        }
      });
    }

    
  }
})();
