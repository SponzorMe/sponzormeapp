/**
* @Controller for Detail Sponsorship
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.sponsors-organizer')
    .controller('SponsorshipOrganizerDetailController', SponsorshipOrganizerDetailController);

  SponsorshipOrganizerDetailController.$inject = [
    '$localStorage',
    'sponsorshipService',
    'utilsService',
    '$stateParams',
    '$ionicHistory'
  ];

  function SponsorshipOrganizerDetailController( $localStorage, sponsorshipService , utilsService, $stateParams, $ionicHistory) {

    var vm = this;
    //Atributes
    vm.sponzorship = {};
    vm.userAuth = $localStorage.userAuth;
    vm.showEmptyState = false;
    //Accions
    vm.sponsorAccept = sponsorAccept;
    vm.sponsorReject = sponsorReject;

    activate();

    ////////////

    function activate(){
      vm.sponzorship = _.findWhere(vm.userAuth.sponzorships_like_organizer, {id: $stateParams.id});
    }

    function sponsorAccept(){
       utilsService.confirm({
         title: 'Are you sure?', 
         template: '<p class="text-center">In accept the sponsor</p>'
       })
      .then( complete );

      function complete( rta ){
        if( rta ) updateSponsorship( 1 ); //Accepted 
      }
    }

    function sponsorReject(){
      utilsService.confirm({
         title: 'Are you sure?', 
         template: '<p class="text-center">In reject the sponsor</p>'
       })
      .then( complete );

      function complete( rta ){
        if( rta ) updateSponsorship( 2 ); //Deny
      }
    }

    function updateSponsorship( status ){
      utilsService.showLoad();
      var sponsorship = angular.copy( vm.sponsorship );
      sponsorship.status = status;
      sponsorshipService.editSponzorshipPut( sponsorship.id, sponsorship )
        .then( complete )
        .catch( failed );

        function complete( sponsorship ){
          utilsService.hideLoad();
          vm.sponsorship.status = sponsorship.status;
          $ionicHistory.clearCache();
        }

        function failed( error ){
          utilsService.hideLoad();
        }

    }
    

  }
})();