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
    vm.user = $localStorage.userAuth || {};
    //Funcions
    vm.updateProfile = updateProfile;
    vm.changeLang = changeLang;
    
    activate();

    ////////////
    
    function activate(){
      vm.user.lang = 'en';
      vm.user.gender = 1;
    }

    function updateProfile( form ){
      utilsService.showLoad();
      userService.editUserPatch( vm.user.id, preparateData() )
        .then( updateUser )
        .catch( failed );

      function updateUser( user ){
          utilsService.hideLoad();
          utilsService.resetForm( form );
          vm.user = user;
          vm.user.age = parseInt( vm.user.age );
          $localStorage.userAuth = user;
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

    function preparateData(){
      return {
        name: vm.newUser.name,
        age: vm.newUser.age,
        location: vm.newUser.location, 
        lang: vm.newUser.lang,
        gender: vm.newUser.gender
      }
    }

    function changeLang(){
      $translate.use(vm.newUser.lang);
    }

  }
})();