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
    'sponzorshipService',
    'utilsService',
    '$ionicPopup',
    '$stateParams',
    '$scope',
    '$ionicHistory'
  ];

  function SponsorshipDetailController( $localStorage, sponzorshipService , utilsService, $ionicPopup, $stateParams, $scope, $ionicHistory) {

    var vm = this;
    //Atributes
    vm.sponsorship = {};
    vm.userAuth = $localStorage.userAuth;
    vm.showEmptyState = false;
    //Accions
    vm.sponzorAccept = sponzorAccept;
    vm.sponzorReject = sponzorReject;

    activate();

    ////////////

    function activate(){
      getSponsorship();
    }

    function getSponsorship(){
      utilsService.showLoad();
      sponzorshipService.getSponzorship( $stateParams.id )
        .then( complete )
        .catch( failed );

        function complete( sponsorship ){
          utilsService.hideLoad();
          console.log( sponsorship );
          vm.sponsorship = sponsorship;
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }


    function sponzorAccept( index ){
      confirmPopup('Are you sure?', 'In accept the sponsor')
        .then( complete );

        function complete( rta ){
          if( rta ) updateSponsorship( 1 ); //Accepted 
        }
    }

    function sponzorReject( index ){
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
      sponzorshipService.editSponzorshipPut( sponsorship.id, sponsorship )
        .then( complete )
        .catch( failed );

        function complete( sponsorship ){
          utilsService.hideLoad();
          vm.sponsorship.status = sponsorship.status;
          $ionicHistory.clearCache();
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }

    }
    

  }
})();