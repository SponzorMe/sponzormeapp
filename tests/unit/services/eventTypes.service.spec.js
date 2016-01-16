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

  beforeEach(inject(function(_eventTypeService_) {
    eventTypeService = _eventTypeService_;
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
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/event_types')
          .respond(400, data);
        $httpBackend.whenGET('langs/lang-en.json').respond(200, {
          "title": 'Sponzorme EN'
        });
        $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
          "title": 'Sponzorme PT'
        });
        $httpBackend.whenGET('langs/lang-es.json').respond(200, {
          "title": 'Sponzorme ES'
        });
      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function(){
        var result;
        eventTypeService.allEventTypes()
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('allEventTypes success', function() {
      var $httpBackend;
      var data = mockData.eventTypeService.allEventTypes();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/event_types')
          .respond(200, data);
        $httpBackend.whenGET('langs/lang-en.json').respond(200, {
          "title": 'Sponzorme EN'
        });
        $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
          "title": 'Sponzorme PT'
        });
        $httpBackend.whenGET('langs/lang-es.json').respond(200, {
          "title": 'Sponzorme ES'
        });
      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an array of perks tasks', function(){
        var result;
        eventTypeService.allEventTypes()
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isArray( result );
        chai.expect( result ).to.eql( data.eventTypes );
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
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/event_types/1')
          .respond(400, data);
        $httpBackend.whenGET('langs/lang-en.json').respond(200, {
          "title": 'Sponzorme EN'
        });
        $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
          "title": 'Sponzorme PT'
        });
        $httpBackend.whenGET('langs/lang-es.json').respond(200, {
          "title": 'Sponzorme ES'
        });
      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function(){
        var result;
        eventTypeService.getEventType(1)
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getEventType success', function() {
      var $httpBackend;
      var data = mockData.eventTypeService.getEventType();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/event_types/1')
          .respond(200, data);
        $httpBackend.whenGET('langs/lang-en.json').respond(200, {
          "title": 'Sponzorme EN'
        });
        $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
          "title": 'Sponzorme PT'
        });
        $httpBackend.whenGET('langs/lang-es.json').respond(200, {
          "title": 'Sponzorme ES'
        });
      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a eventType', function(){
        var result;
        eventTypeService.getEventType(1)
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isObject( result );
        chai.expect( result ).to.eql( data.data.eventTypes );
        chai.assert.isArray( result.events );
      });
    });

  });
});