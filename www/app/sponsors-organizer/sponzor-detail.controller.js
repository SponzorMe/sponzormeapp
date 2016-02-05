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
    .controller('SponsorshipDetailController', SponsorshipDetailController);

  SponsorshipDetailController.$inject = [
    '$localStorage',
    'sponsorshipService',
    'utilsService',
    '$ionicPopup',
    '$stateParams',
    '$ionicHistory'
  ];

  function SponsorshipDetailController( $localStorage, sponsorshipService , utilsService, $ionicPopup, $stateParams, $ionicHistory) {

    var vm = this;
    //Atributes
    vm.sponsorship = {};
    vm.userAuth = $localStorage.userAuth;
    vm.showEmptyState = false;
    //Accions
    vm.sponsorAccept = sponsorAccept;
    vm.sponsorReject = sponsorReject;

    activate();

    ////////////

    function activate(){
      getSponsorship();
    }

    function getSponsorship(){
      utilsService.showLoad();
      sponsorshipService.getSponzorship( $stateParams.id )
        .then( complete )
        .catch( failed );

        function complete( sponsorship ){
          utilsService.hideLoad();
          vm.sponsorship = sponsorship;
        }

        function failed( error ){
          utilsService.hideLoad();
        }
    }


    function sponsorAccept(){
      confirmPopup('Are you sure?', 'In accept the sponsor')
        .then( complete );

        function complete( rta ){
          if( rta ) updateSponsorship( 1 ); //Accepted 
        }
    }

    function sponsorReject(){
      confirmPopup('Are you sure?', 'In reject the sponsor')
        .then( complete );

        function complete( rta ){
          if( rta ) updateSponsorship( 2 ); //Deny
        }
    }

    function confirmPopup(title, template){
      return $ionicPopup.confirm({
        title: title,
        template: template
      });
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