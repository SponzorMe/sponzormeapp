describe("Service: eventTypeService", function() {

  var eventTypeService;

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($injector, _eventTypeService_) {
    eventTypeService = _eventTypeService_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
  }));

  ////////////////////////////////////////////////////////////
  describe('Test to allEventTypes method', function(){

    it('Should define a allEventTypes function', function(){
      chai.assert.isDefined(eventTypeService.allEventTypes);
    });

    it('Should return a promise', function(){
      var promise = eventTypeService.allEventTypes();
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('allEventTypes failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET('https://apilocal.sponzor.me/event_types').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        eventTypeService.allEventTypes()
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('allEventTypes success', function() {

      var data = mockData.eventTypeService.allEventTypes();

      beforeEach(function() {
        $httpBackend.whenGET('https://apilocal.sponzor.me/event_types').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an array of perks tasks', function( done ){
        eventTypeService.allEventTypes()
        .then(function( result ) {
          chai.assert.isArray( result );
          chai.expect( result ).to.eql( data.eventTypes );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to getEventType method', function(){

    it('Should define a getEventType function', function(){
      chai.assert.isDefined(eventTypeService.getEventType);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        eventTypeService.getEventType();
      });
      chai.assert.throws(function(){
        eventTypeService.getEventType([]);
      });
      chai.assert.throws(function(){
        eventTypeService.getEventType({});
      });
      chai.assert.throws(function(){
        eventTypeService.getEventType(Object);
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        eventTypeService.getEventType("1");
      });
      chai.assert.doesNotThrow(function(){
        eventTypeService.getEventType(1);
      });
    });

    it('Should return a promise', function(){
      var promise = eventTypeService.getEventType(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getEventType failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET('https://apilocal.sponzor.me/event_types/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        eventTypeService.getEventType(1)
          .catch(function( result ) {
            chai.assert.isDefined( result.message )
            done();
          });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getEventType success', function() {

      var data = mockData.eventTypeService.getEventType();

      beforeEach(function() {
        $httpBackend.whenGET('https://apilocal.sponzor.me/event_types/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a eventType', function( done ){
        eventTypeService.getEventType(1)
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.expect( result ).to.eql( data.data.eventTypes );
          chai.assert.isArray( result.events );
          done();
        });
        $httpBackend.flush();
      });
    });

  });
});