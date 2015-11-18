/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.sponsors-organizer')
    .controller('SponzorListController', SponzorListController);

  SponzorListController.$inject = [
    '$localStorage',
    'sponzorshipService',
    'utilsService'
  ];

  function SponzorListController( $localStorage, sponzorshipService , utilsService) {

    var vm = this;
    vm.userAuth = $localStorage.userAuth;
    vm.sponsors = [];
    vm.showEmptyState = false;

    activate();

    ////////////

    function activate(){
      getSponsors();
    }

    function getSponsors(){
      utilsService.showLoad();
      sponzorshipService.sponzorshipByOrganizer( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( sponsors ){
          utilsService.hideLoad();
          vm.showEmptyState = true;
          vm.sponsors = sponsors;
          console.log( sponsors );
        }

        function failed( error ){
          utilsService.hideLoad();
          vm.showEmptyState = true;
          console.log( error );
        }
    }
    

  }
})();