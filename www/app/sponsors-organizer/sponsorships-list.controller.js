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
    'notificationService',
    'userAuthService'
  ];

  function SponsorshipsListController( $localStorage, sponsorshipService, userService, utilsService, $ionicScrollDelegate, $scope, $rootScope, notificationService, userAuthService) {

    var vm = this;
    //Atributes
    vm.sponsorships = [];
    vm.userAuth = userAuthService.getUserAuth();
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

        function complete( sponsorship ){
          utilsService.hideLoad();
          var notification = {
            text: sponzor.event.title,
            link: '#/sponzors/sponzoring',
            type: 'sponsorship',
            idModel: sponsorship.id
          };
          notificationService.sendNotification(notification, sponsorship.sponzor_id);
          sponzor.status = sponsorship.status;
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
          vm.userAuth = userAuthService.updateUserAuth( user );
          vm.sponsorships = vm.userAuth.sponzorships_like_organizer;
          vm.showEmptyState = vm.sponsorships.length == 0 ? true : false;
          $rootScope.$broadcast('Menu:count_sponsors');
        }

        function failed( error ){
          vm.showEmptyState = true;
        }
    }
    

  }
})();