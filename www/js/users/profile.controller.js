/// <reference path="../../typings/main.d.ts" />
/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2

(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = [
    'userService',
    'utilsService',
    '$cordovaCamera',
    '$localStorage',
    '$q',
    'imgurService',
    '$cordovaToast',
    'userAuthService'
  ];

  function ProfileController( userService, utilsService, $cordovaCamera, $localStorage, $q, imgurService, $cordovaToast, userAuthService) {

    var vm = this;
    vm.userAuth = userAuthService.getUserAuth();
    vm.imageURI = null;
    vm.getPhoto = getPhoto;
    vm.updateProfile = updateProfile;
    
    activate();

    ////////////
    
    function activate(){
      vm.userAuth.age = parseInt( vm.userAuth.age );
      vm.userAuth.comunity_size = vm.userAuth.comunity_size || 0;
      vm.userAuth.comunity_size = parseInt( vm.userAuth.comunity_size );
    }

    function getPhoto(){

      var Camera = Camera || null;
      var CameraPopoverOptions = CameraPopoverOptions || null;

      var options = {
        quality: 100,
        destinationType: Camera ? Camera.DestinationType.DATA_URL : null,
        sourceType: Camera ? Camera.PictureSourceType.PHOTOLIBRARY : null,
        allowEdit: true,
        encodingType: Camera ? Camera.EncodingType.JPEG : null,
        targetWidth: 500,
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
      };
      $cordovaCamera.getPicture( options )
        .then( complete )
        .catch( failed );

      function complete( imageURI ){
        vm.imageURI = imageURI;
        vm.userAuth.image = "data:image/jpeg;base64," + imageURI;
      }

      function failed( error ){
        //console.log( error );
      }
    }

    function updateProfile( form ){
      utilsService.showLoad();

      if(vm.imageURI){
        imgurService.uploadImage( vm.imageURI )
          .then( updateImage )
          .then( updateUser )
          .catch( failed );
      }else{
        userService.editUserPatch( vm.userAuth.id, vm.userAuth )
          .then( updateUser )
          .catch( failed );
      }

        function updateImage( image ){
          vm.userAuth.image = image;
          return userService.editUserPatch( vm.userAuth.id, vm.userAuth );
        }

        function updateUser( user ){
          utilsService.hideLoad();
          utilsService.resetForm( form );
          user.age = parseInt( user.age );
          user.comunity_size = parseInt( user.comunity_size );
          vm.userAuth = userAuthService.updateUserAuth( user );
          $cordovaToast.showShortBottom("Su perfil se ha actulizado");
        }

        function failed( error ){
          utilsService.hideLoad();
          //console.log( error );
        }
    }

  }
})();
*/ 
