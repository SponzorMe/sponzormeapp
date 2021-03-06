describe("Service: eventService", function() {

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($injector, _eventService_) {
    eventService = _eventService_;
    
    $localStorage = $injector.get('$localStorage');
    $localStorage.token = "123";

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
  }));
  
  ////////////////////////////////////////////////////////////
  describe('Test to _getToken method', function(){

    it('Should define a _getToken function', function(){
      chai.assert.isDefined(eventService._getToken);
    });

    it('Should return a string', function(){
      chai.assert.isString( eventService._getToken() );
      chai.expect( "123" ).to.eql(  eventService._getToken() );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to eventService method', function(){

    it('Should define a eventService function', function(){
      chai.assert.isDefined(eventService.allEvents);
    });

    it('Should return a promise', function(){
      var promise = eventService.allEvents();
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('allEvents failed', function() {
      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET(URL_REST + 'events').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        eventService.allEvents()
          .catch(function( result ) {
            chai.assert.isDefined( result.message )
            done();
          });
        $httpBackend.flush();
        
      });
    });

    ////////////////////////////////////////////////////////////
    describe('allEvents success', function() {

      var data = mockData.eventService.allEvents();

      beforeEach(function() {
        $httpBackend.whenGET(URL_REST + 'events').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an array of events', function( done ){
        eventService.allEvents()
          .then(function( result ) {
            chai.assert.isArray( result );
            for(var j = 0; j < result.length;j++){
              var event = result[j];
              chai.assert.isObject( event );
              chai.assert.isDefined( event.id );
              chai.assert.instanceOf( event.starts, Date );
              chai.assert.instanceOf( event.ends, Date );
              chai.assert.isArray( event.perks );
              chai.assert.isObject( event.type );
              chai.assert.isObject( event.user_organizer );
            }
            done();
          });
        $httpBackend.flush();
        
      });

    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to getEvent method', function(){

    it('Should define a getUser function', function(){
      chai.assert.isDefined(eventService.getEvent);
    });
    
    /*it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        eventService.getEvent();
      });
      chai.assert.throws(function(){
        eventService.getEvent([]);
      });
      chai.assert.throws(function(){
        eventService.getEvent({});
      });
      chai.assert.throws(function(){
        eventService.getEvent(Object);
      });
    });*/

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        eventService.getEvent(1);
      });
      chai.assert.doesNotThrow(function(){
        eventService.getEvent("1");
      });
    });

    it('Should return a promise', function(){
      var promise = eventService.getEvent("123");
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getEvent failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET(URL_REST + 'events/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        eventService.getEvent( 1 )
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
        
      }); 
    });

    ////////////////////////////////////////////////////////////
    describe('getEvent success', function() {
      //Assemble  

      var data = mockData.eventService.getEvent();

      beforeEach(function() {
        $httpBackend.whenGET(URL_REST + 'events/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an event', function( done ){
        eventService.getEvent( 1 )
        .then(function( result ) {
          var event = result;
          chai.assert.isObject( event );
          chai.assert.isDefined( event.id );
          chai.assert.instanceOf( event.starts, Date );
          chai.assert.instanceOf( event.ends, Date );
          chai.assert.isArray( event.perks );
          chai.assert.isObject( event.type );
          chai.assert.isObject( event.category );
          chai.assert.isObject( event.user_organizer );
          chai.assert.isArray( event.sponzor_tasks );
          chai.assert.isArray( event.sponzorship );
          done();
        });
        $httpBackend.flush();
      });
    });
  });

	////////////////////////////////////////////////////////////
  describe('Test to createEvent method', function(){

    it('Should define a createEvent function', function(){
      chai.assert.isDefined(eventService.createEvent);
    });

    /*it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        eventService.createEvent();
      });
      chai.assert.throws(function(){
        eventService.createEvent([]);
      });
      chai.assert.throws(function(){
        eventService.createEvent("as");
      });
      chai.assert.throws(function(){
        eventService.createEvent(1);
      });
      chai.assert.throws(function(){
        eventService.createEvent(Object);
      });
    });*/

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        eventService.createEvent({});
      });
    });

    it('Should return a promise', function(){
      var promise = eventService.createEvent({});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('createEvent failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPOST(URL_REST + 'events').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        eventService.createEvent({})
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
        
      });
    });

    ////////////////////////////////////////////////////////////
    describe('createEvent success', function() {

      var data = mockData.eventService.createEvent();

      beforeEach(function() {
        $httpBackend.whenPOST(URL_REST + 'events').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an event', function( done ){
        var result;
        eventService.createEvent({})
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.assert.isDefined( result.category );
          chai.assert.isDefined( result.description );
          chai.assert.isDefined( result.image );
          chai.assert.isDefined( result.lang );
          chai.assert.isDefined( result.location );
          chai.assert.isDefined( result.privacy );
          chai.assert.instanceOf( result.starts, Date );
          chai.assert.instanceOf( result.ends, Date );
          chai.assert.isDefined( result.type );
          chai.assert.isDefined( result.user_organizer );
          chai.assert.isArray( result.perks );
          chai.assert.isArray( result.sponzor_tasks );
          chai.assert.isArray( result.sponzorship );
          done();
        });
        $httpBackend.flush();
        
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to deleteEvent method', function(){

    it('Should define a deleteEvent function', function(){
      chai.assert.isDefined(eventService.deleteEvent);
    });

    /*it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        eventService.deleteEvent();
      });
      chai.assert.throws(function(){
        eventService.deleteEvent([]);
      });
      chai.assert.throws(function(){
        eventService.deleteEvent({});
      });
      chai.assert.throws(function(){
        eventService.deleteEvent(Object);
      });
    });*/

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        eventService.deleteEvent("1");
      });
      chai.assert.doesNotThrow(function(){
        eventService.deleteEvent(1);
      });
    });

    it('Should return a promise', function(){
      var promise = eventService.deleteEvent(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('deleteEvent failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenDELETE(URL_REST + 'events/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        eventService.deleteEvent(1)
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('deleteEvent success', function() {

      var data = mockData.eventService.deleteEvent();

      beforeEach(function() {
        $httpBackend.whenDELETE(URL_REST + 'events/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an message', function( done ){
        eventService.deleteEvent(1)
        .then(function( result ) {
          chai.expect( result.message ).to.eql( data.message );
          done();
        });
        $httpBackend.flush();
        
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to editEventPatch method', function(){

    it('Should define a editEventPatch function', function(){
      chai.assert.isDefined(eventService.editEventPatch);
    });

    /*it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        eventService.editEventPatch();
      });
      chai.assert.throws(function(){
        eventService.editEventPatch([], {});
      });
      chai.assert.throws(function(){
        eventService.editEventPatch(Object, {});
      });
      chai.assert.throws(function(){
        eventService.editEventPatch({}, {});
      });
      chai.assert.throws(function(){
        eventService.editEventPatch(1, []);
      });
      chai.assert.throws(function(){
        eventService.editEventPatch("1", Object);
      });
      chai.assert.throws(function(){
        eventService.editEventPatch(2, "as");
      });
    });*/

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        eventService.editEventPatch("1", {});
      });
      chai.assert.doesNotThrow(function(){
        eventService.editEventPatch(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = eventService.editEventPatch(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editEventPatch failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPATCH(URL_REST + 'events/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        eventService.editEventPatch(1, {})
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
        
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editEventPatch success', function() {

      var data = mockData.eventService.editEventPatch();

      beforeEach(function() {
        $httpBackend.whenPATCH( URL_REST + 'events/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an event', function( done ){
        eventService.editEventPatch(1, {})
          .then(function( result ) {
            chai.assert.isDefined( result.category );
            chai.assert.isDefined( result.description );
            chai.assert.isDefined( result.image );
            chai.assert.isDefined( result.lang );
            chai.assert.isDefined( result.location );
            chai.assert.isDefined( result.privacy );
            chai.assert.instanceOf( result.starts, Date );
            chai.assert.instanceOf( result.ends, Date );
            chai.assert.isDefined( result.type );
            chai.assert.isDefined( result.user_organizer );
            done();
          });
        $httpBackend.flush();
        
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to editEventPut method', function(){

    it('Should define a editEventPut function', function(){
      chai.assert.isDefined(eventService.editEventPut);
    });

    /*it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        eventService.editEventPut();
      });
      chai.assert.throws(function(){
        eventService.editEventPut([], {});
      });
      chai.assert.throws(function(){
        eventService.editEventPut(Object, {});
      });
      chai.assert.throws(function(){
        eventService.editEventPut({}, {});
      });
      chai.assert.throws(function(){
        eventService.editEventPut(1, []);
      });
      chai.assert.throws(function(){
        eventService.editEventPut("1", Object);
      });
      chai.assert.throws(function(){
        eventService.editEventPut(2, "as");
      });
    });*/

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        eventService.editEventPut("1", {});
      });
      chai.assert.doesNotThrow(function(){
        eventService.editEventPut(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = eventService.editEventPut(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editEventPut failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPUT(URL_REST + 'events/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        var result;
        eventService.editEventPut(1, {})
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
        
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editEventPut success', function() {

      var data = mockData.eventService.editEventPut();

      beforeEach(function() {
        $httpBackend.whenPUT(URL_REST + 'events/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an event', function( done ){
        eventService.editEventPut(1, {})
          .then(function( result ) {
            chai.assert.isDefined( result.category );
            chai.assert.isDefined( result.description );
            chai.assert.isDefined( result.image );
            chai.assert.isDefined( result.lang );
            chai.assert.isDefined( result.location );
            chai.assert.isDefined( result.privacy );
            chai.assert.instanceOf( result.starts, Date );
            chai.assert.instanceOf( result.ends, Date );
            chai.assert.isDefined( result.type );
            chai.assert.isDefined( result.user_organizer );
            done();
          });
        $httpBackend.flush();
      });
    });

  });
	
});