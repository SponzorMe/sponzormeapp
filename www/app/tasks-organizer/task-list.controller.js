/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.tasks-organizer')
    .controller('TaskListController', TaskListController);

  TaskListController.$inject = [
    '$localStorage',
    'sponzorshipService',
    'utilsService',
    '$q'
  ];

  function TaskListController( $localStorage, sponzorshipService , utilsService, $q) {

    var vm = this;
    vm.userAuth = $localStorage.userAuth;
    vm.sponsors = [];
    vm.showEmptyState = false;

    activate();

    ////////////

    function activate(){
      getTasks();
    }

    function getTasks(){
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

    function test(){
      var promises = [
        sponzorshipService.sponzorshipByOrganizer( vm.userAuth.id ),
        sponzorshipService.sponzorshipByOrganizer( vm.userAuth.id )
      ];

      $q.all(promises)
        .then(function( result ){
          console.log( result );
        })
        .catch(function( result ){
          console.log( result );
        });
    }

    
    

  }
})();