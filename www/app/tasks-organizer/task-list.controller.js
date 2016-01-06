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
    'perkTaskService',
    'utilsService',
    '$scope',
    '$rootScope'
  ];

  function TaskListController( $localStorage, perkTaskService , utilsService, $scope, $rootScope) {

    var vm = this;
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.tasks = [];
    vm.showEmptyState = false;
    //Funcions
    vm.doRefresh = doRefresh;
    
    activate();

    ////////////

    function activate(){
      getTasks();
    }

    function getTasks(){
      utilsService.showLoad();
      perkTaskService.getPerkTaskByOrganizer( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( tasks ){
          utilsService.hideLoad();
          vm.tasks = groupByEvent( tasks );
          var total = tasks.filter( filterByDone ).length;
          vm.showEmptyState = vm.tasks.length == 0 ? true : false;
          $rootScope.$broadcast('Menu:count_tasks', total);
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

    function doRefresh(){
      perkTaskService.getPerkTaskByOrganizer( vm.userAuth.id )
        .then( complete )
        .catch( failed );

        function complete( tasks ){
          $scope.$broadcast('scroll.refreshComplete');
          vm.tasks = groupByEvent( tasks );
          var total = tasks.filter( filterByDone ).length;
          $rootScope.$broadcast('Menu:count_tasks', total);
        }

        function failed( error ){
          console.log( error );
        }
    }

    function groupByEvent( data ){
      //http://underscorejs.org/#groupBy
      var groups = _.groupBy( data, 'eventTitle' );
      
      function parseEvent( value, key ){
        return {
          title: key,
          tasks: value
        }
      }
      //http://underscorejs.org/#map
      return _.map( groups , parseEvent);
    }

    function filterByDone( item ){
      return item.status != '1';
    }

    

  }
})();