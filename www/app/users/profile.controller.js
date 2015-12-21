/**
* @Controller for Forgot Password
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
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
    '$cordovaToast'
  ];

  function ProfileController( userService, utilsService, $cordovaCamera, $localStorage, $q, imgurService, $cordovaToast) {

    var vm = this;
    vm.user = $localStorage.userAuth;
    vm.getPhoto = getPhoto;
    vm.updateProfile = updateProfile;
    vm.imageURI = null;

    activate();

    ////////////
    
    function activate(){
      vm.user.age = parseInt( vm.user.age );
      vm.user.comunity_size = vm.user.comunity_size || 0;
      vm.user.comunity_size = parseInt( vm.user.comunity_size );
      console.log( vm.user );
    }

    function getPhoto(){
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
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
        vm.user.image = "data:image/jpeg;base64," + imageURI;
      }

      function failed( error ){
        console.log( error );
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
        userService.editUserPatch( vm.user.id, vm.user )
          .then( updateUser )
          .catch( failed );
      }

        function updateImage( image ){
          console.log( image );
          vm.user.image = image;
          return userService.editUserPatch( vm.user.id, vm.user );
        }

        function updateUser( user ){
          utilsService.hideLoad();
          utilsService.resetForm( form );
          vm.user = user;
          vm.user.age = parseInt( vm.user.age );
          $localStorage.userAuth = utilsService.updateUserAuth( user );
          $cordovaToast.showShortBottom("Su perfil se ha actulizado");
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

  }
})();