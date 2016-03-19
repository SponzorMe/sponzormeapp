/**
* @Controller for Personal information of user
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('FormProfileController', FormProfileController);

  FormProfileController.$inject = [
    '$translate',
    'userService',
    '$state',
    'utilsService',
    '$localStorage',
    'userAuthService'
  ];

  function FormProfileController( $translate, userService, $state , utilsService, $localStorage, userAuthService) {

    var vm = this;
    //Attributes
    vm.userAuth = userAuthService.getUserAuth();
    //Funcions
    vm.updateProfile = updateProfile;
    vm.changeLang = changeLang;
    
    activate();

    ////////////
    
    function activate(){
      vm.userAuth.lang = 'en';
      vm.userAuth.gender = 1;
      vm.userAuth.age = vm.userAuth.age == '0' ? null : parseInt( vm.userAuth.age );
    }

    function updateProfile( form ){
      utilsService.showLoad();
      userService.editUserPatch( vm.userAuth.id, preparateData() )
        .then( updateUser )
        .catch( failed );

      function updateUser( user ){
          utilsService.hideLoad();
          utilsService.resetForm( form );
          user.age = parseInt( user.age );
          user.comunity_size = parseInt( user.comunity_size );
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.userAuth = {};
          $state.go("interests");
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

    function preparateData(){
      return {
        name: vm.userAuth.name,
        age: parseInt(vm.userAuth.age),
        location: vm.userAuth.location.formatted_address,
        location_reference: vm.userAuth.location.place_id,
        lang: vm.userAuth.lang,
        sex: parseInt(vm.userAuth.sex)
      }
    }

    function changeLang(){
      $translate.use(vm.userAuth.lang);
    }

  }
})();