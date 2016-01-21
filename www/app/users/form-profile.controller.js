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
    '$localStorage'
  ];

  function FormProfileController( $translate, userService, $state , utilsService, $localStorage) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth || {};
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
          $localStorage.userAuth = utilsService.updateUserAuth( user );
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
        location: vm.userAuth.location, 
        lang: vm.userAuth.lang,
        sex: parseInt(vm.userAuth.sex)
      }
    }

    function changeLang(){
      $translate.use(vm.userAuth.lang);
    }

  }
})();