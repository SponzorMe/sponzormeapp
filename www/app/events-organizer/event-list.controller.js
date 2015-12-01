/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app.events-organizer')
    .controller('EventListController', EventListController);

  EventListController.$inject = ['$translate', '$localStorage' ,'userService', 'utilsService'];

  function EventListController( $translate, $localStorage, userService , utilsService) {

    var vm = this;
    vm.userAuth = $localStorage.userAuth;
    vm.events = [];
    vm.showEmptyState = false;

    activate();

    ////////////

    function activate(){
      getEvents();
    }

    function getEvents(){
      utilsService.showLoad();
      userService.getUser( vm.userAuth.id )
        .then( getEventsComplete )
        .catch( getEventsFailed );

        function getEventsComplete( user ){
          utilsService.hideLoad();
          vm.showEmptyState = true;
          vm.events = user.events.filter( filterDate );

          function filterDate( item ){
            return moment(item.ends).isAfter(new Date());
          }
        }

        function getEventsFailed( error ){
          utilsService.hideLoad();
          vm.showEmptyState = true;
          console.log( error );
        }
    }
    

  }
})();