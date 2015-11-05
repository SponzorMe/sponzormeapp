/**
* @Controller for events
*
* @author Nicolas Molina
* @version 0.1

(function() {
  'use strict';

  angular
    .module('App.events')
    .controller('CreateEventController', CreateEventController);

  CreateEventController.$inject = ['eventTypeService'];

  function AddEventController( eventTypeService ) {

    var self = this;
    self.newEvent = {};
    self.eventTypes = [];

    activate();

    function activate(){
      //Obtener los tipos de evento
      getEventTypes();
    }

    /////////////

    function createEvent(){

    }

    function getEventTypes() {
      return eventTypeService.allEventTypes()
        .then(function( data ) {
          self.eventTypes = data;
          return self.eventTypes;
        });
    }

  }
})();
*/