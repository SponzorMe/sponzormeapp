describe("Service: eventService", function() {

	var eventService;

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function(_eventService_) {
    eventService = _eventService_;
  }));

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
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/events')
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
        eventService.allEvents()
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('allEvents success', function() {
      var $httpBackend;
      var data = mockData.eventService.allEvents();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/events')
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

      it('Should return an array of events', function(){
        var result;
        eventService.allEvents()
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isArray( result );
      });

      it('Should be match with images', function(){
        var result;
        eventService.allEvents()
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.expect( result[0].image ).to.eql( 'img/banner.jpg' );
        chai.expect( result[1].image ).to.eql( 'http://i.imgur.com/t8YehGM.jpg' );
      });

      it('Should be instance Of Date the events', function(){
        var result;
        eventService.allEvents()
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        for (var i = 0; i < result.length; i++) {
          chai.assert.instanceOf( result[i].starts, Date );
          chai.assert.instanceOf( result[i].ends, Date );
        };
      });

    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to getEvent method', function(){

    it('Should define a getUser function', function(){
      chai.assert.isDefined(eventService.getEvent);
    });
    
    it('Should throw an error on an incompatible type', function(){
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
    });

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
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/events/1')
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
        eventService.getEvent( 1 )
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      }); 
    });

    ////////////////////////////////////////////////////////////
    describe('getEvent success', function() {
      //Assemble  
      var $httpBackend;
      var data = mockData.eventService.getEvent();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/events/1')
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

      it('Should return an event', function(){
        var result;
        eventService.getEvent( 1 )
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isObject( result );
        chai.expect( result ).to.have.all.keys([
          'category',
          'type',
          'organizer',
          'sponzorships'
        ]);
        chai.assert.isObject( result.category );
        chai.assert.isObject( result.type );
        chai.assert.isObject( result.organizer );
        chai.assert.isArray( result.sponzorships );
        chai.assert.instanceOf( result.starts, Date );
        chai.assert.instanceOf( result.ends, Date );
      });
    });
  });
	
});