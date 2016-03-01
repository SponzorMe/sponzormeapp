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
    .controller('SponsorshipsListController', SponsorshipsListController);

  SponsorshipsListController.$inject = [
    '$localStorage',
    'sponsorshipService',
    'userService',
    'utilsService',
    '$ionicScrollDelegate',
    '$scope',
    '$rootScope',
    'notificationService'
  ];

  function SponsorshipsListController( $localStorage, sponsorshipService, userService, utilsService, $ionicScrollDelegate, $scope, $rootScope, notificationService) {

    var vm = this;
    //Atributes
    vm.sponsorships = [];
    vm.userAuth = $localStorage.userAuth;
    vm.showEmptyState = false;
    //Accions
    vm.sponsorAccept = sponsorAccept;
    vm.sponsorReject = sponsorReject;
    vm.doRefresh = doRefresh;

    activate();
    ////////////

    function activate(){
      vm.sponsorships = vm.userAuth.sponzorships_like_organizer;
      vm.showEmptyState = vm.sponsorships.length == 0 ? true : false;
      $rootScope.$on('SponsorshipsListController:getSponzorships', getSponzorships);
    }
    
    function getSponzorships() {
      vm.userAuth = $localStorage.userAuth;
      vm.sponsorships = vm.userAuth.sponzorships_like_organizer;
      vm.showEmptyState = vm.sponsorships.length == 0 ? true : false;
    }

    function sponsorAccept( sponzor ){
      utilsService.confirm({
        title: 'Are you sure?', 
        template: '<p class="text-center">In the accept the sponsor</p>'
      })
      .then( complete );

      function complete( rta ){
        if( rta ) updateSponsorship( sponzor, 1 ); //Accepted 
      }
    }

    function sponsorReject( sponzor ){
      utilsService.confirm({
        title: 'Are you sure?', 
        template: '<p class="text-center">In the reject the sponsor</p>'
      })
      .then( complete );

      function complete( rta ){
        if( rta ) updateSponsorship( sponzor, 2 ); //Deny
      }
    }

    function updateSponsorship( sponzor, status ){
      utilsService.showLoad();
      var sponzorCopy = angular.copy( sponzor );
      sponzorCopy.status = status;
      sponsorshipService.editSponzorshipPut( sponzorCopy.id, sponzorCopy )
        .then( complete )
        .catch( failed );

        function complete( sponzorRta ){
          utilsService.hideLoad();
          var notification = {
            text: sponzor.event.title,
            link: '#/sponzors/sponzoring'
          };
          notificationService.sendNotification(notification, sponzorRta.sponzor_id);
          sponzor.status = sponzorRta.status;
        }

        function failed( error ){
          utilsService.hideLoad();
        }

    }

    function doRefresh(){
      userService.home( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( user ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.userAuth = $localStorage.userAuth = user;
          vm.sponsorships = vm.userAuth.sponzorships_like_organizer;
          vm.showEmptyState = vm.sponsorships.length == 0 ? true : false;
          $rootScope.$broadcast('Menu:count_sponsors', vm.sponsorships.length);
        }

        function failed( error ){
          vm.showEmptyState = true;
        }
    }
    

  }
})();