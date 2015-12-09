/**
* @Controller for Interests of user
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('FormInterestsController', FormInterestsController);

  FormInterestsController.$inject = [
    'userService',
    '$state',
    'utilsService',
    '$localStorage'
  ];

  function FormInterestsController( userService, $state , utilsService, $localStorage) {

    var vm = this;
    //Attributes
    vm.user = $localStorage.userAuth || {};
    //Funcions
    vm.updateInterests = updateInterests;
    
    activate();

    ////////////
    
    function activate(){
      
    }

    function updateInterests(){
      
    }

    
  }
})();