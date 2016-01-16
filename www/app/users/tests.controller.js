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
    'userService',
    'sponsorshipService'
  ];

  function TestsController( $localStorage, userInterestService, userService, sponsorshipService) {

    var vm = this;
    vm.userAuth = $localStorage.userAuth || {};

    editSponzorshipPut();
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

    function allSponsorships(){
      sponsorshipService.allSponsorships()
      .then( rta )
      .catch( rta );
    }

    function getSponzorship(){
      sponsorshipService.getSponzorship( 12 )
      .then( rta )
      .catch( rta );
    }

    function sponzorshipByOrganizer(){
      sponsorshipService.sponzorshipByOrganizer( 1002 )
      .then( rta )
      .catch( rta );
    }

    function sponzorshipBySponzor(){
      sponsorshipService.sponzorshipBySponzor( 1002 )
      .then( rta )
      .catch( rta );
    }

    function createSponzorship(){
      sponsorshipService.createSponzorship({
        sponzor_id: 1002,
        perk_id: 18,
        event_id: 1018,
        organizer_id: 1003,
        status: 0,
        cause: 'YOLO'
      })
      .then( rta )
      .catch( rta );
    }

    function deleteSponzorship(){
      sponsorshipService.deleteSponzorship( 31 )
      .then( rta )
      .catch( rta );
    }

    function editSponzorshipPatch(){
      sponsorshipService.editSponzorshipPatch( 32, {
        cause: 'as'
      })
      .then( rta )
      .catch( rta );
    }

    function editSponzorshipPut(){
      sponsorshipService.editSponzorshipPut( 32, {
        cause: 'as'
      })
      .then( rta )
      .catch( rta );
    }

    
  }
})();