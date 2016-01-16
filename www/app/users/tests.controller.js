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
    .controller('TestsController', TestsController);

  TestsController.$inject = [
    '$localStorage',
    'userInterestService',
    'userService'
  ];

  function TestsController( $localStorage, userInterestService, userService ) {

    var vm = this;
    vm.userAuth = $localStorage.userAuth || {};

    invitedUser();
    //////////////////////////////////////

    function rta( response ){
      console.log( response );
    }

    function createUserInterest(){
      userInterestService.createUserInterest({
        interest_id: 1,
        user_id: vm.userAuth.id
      })
      .then( rta )
      .catch( rta );
    }

    function login(){
      userService.login( 'nicolas.molina.monroy@gmail.com', '123456' )
      .then( rta )
      .catch( rta );
    }

    function getUser(){
      userService.getUser( 1007 )
      .then( rta )
      .catch( rta );
    }

    function createUser(){
      userService.createUser({
        email: "nico@as.co",
        password: "123456",
        password_confirmation: "123456",
        name: "Nicolas",
        lang: 'en',
        type: 1,
      })
      .then( rta )
      .catch( rta );
    }

    function editUserPatch(){
      userService.editUserPatch( 1007, {
        email: "nicolas.molina.monroy@hotmail.com",
      })
      .then( rta )
      .catch( rta );
    }

    function forgotPassword(){
      userService.forgotPassword("nicolas.molina.monroy@hotmail.com")
      .then( rta )
      .catch( rta );
    }

    function deleteUser(){
      userService.deleteUser( 1008 )
      .then( rta )
      .catch( rta );
    }

    function invitedUser(){
      userService.invitedUser({
        user_id: 1007,
        email: "nicolas.molina.monroy@gmail.com",
        message: "Try this ;)"
      })
      .then( rta )
      .catch( rta );
    }

    
  }
})();