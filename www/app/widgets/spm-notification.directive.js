// Description:
// Network message online / offline
// Usage:
// <spm-network-message></spm-network-message>
(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('spmNotification', spmNotification);

  spmNotification.$inject = [
    '$state',
    '$firebaseArray',
    'BackendVariables',
    'userAuthService',
    '$translate'
  ];

  function spmNotification( $state, $firebaseArray, BackendVariables, userAuthService, $translate ) {
    
    var path = BackendVariables.f_url;
    var userAuth = userAuthService.getUserAuth();

    var directive = {
      restrict: 'E',
      replace: true,
      scope:{
        model: '=',
      },
      controller: controller,
      link: link,
      templateUrl: 'app/widgets/spm-notification.html'
    };
    return directive;
    
    function controller($scope) {
      
      activate();
      
      function activate() {
        $scope.title =  $translate.instant("NOTIFICATIONS." + $scope.model.typeNotification + "_title");
        $scope.text =  $translate.instant("NOTIFICATIONS." + $scope.model.typeNotification + "_text").replace('TEXT', $scope.model.text || '');
      }
    }

    function link( $scope ) {
      
      $scope.read = read;
      
      var events = {
        'newSponsorship': goDetailSponsorhip,
        'acceptSponsorship': goSponzoring,
        'rejectSponsorship': goFollowing,
        'newTaskOrganizer': goDetailSponsorshipOrganizer,
        'updateTaskOrganizer': goDetailSponsorshipOrganizer,
        'doneTaskOrganizer': goDetailSponsorshipOrganizer,
        'newEvent': goDetailEvent,
        'updateEvent': goDetailEvent
      }
      
      function read(){
        var url = path + 'notifications/' + userAuth.id + '/' + $scope.model.$id;
        var reference = $firebaseArray( new Firebase( url ));
        reference.update({
          read: true
        }).then(function(){
          events[$scope.model.typeNotification]($scope.model.modelId || null);
        });
      }
      
      function goSponsorhips() {
        $state.go('organizer.sponsorships');
      }
      
      function goSponzoring() {
        $state.go('sponzor.sponzoring');
      }
      
      function goFollowing() {
        $state.go('sponzor.following');
      }
      
      function goDetailSponsorshipOrganizer( id ){
         $state.go('sponzor.sponsorship',{
           id: id
         });
      }
      
      function goDetailEvent( id ) {
        $state.go('sponzor.event',{
           idEvent: id
         });
      }
      

    }
  }
})();