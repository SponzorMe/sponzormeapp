describe("Service: sponsorshipService", function(){

	var sponsorshipService;

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function( _sponsorshipService_ ) {
    sponsorshipService = _sponsorshipService_;
  }));

	////////////////////////////////////////////////////////////
  describe('Test to allSponsorships method', function(){

  	it('Should define a allSponsorships function', function(){
      chai.assert.isDefined(sponsorshipService.allSponsorships);
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.allSponsorships();
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('allSponsorships failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/sponzorships')
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
        sponsorshipService.allSponsorships()
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

		////////////////////////////////////////////////////////////
    describe('allSponsorships success', function() {
      var $httpBackend;
      var data = mockData.sponsorshipService.allSponsorships();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/sponzorships')
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

      it('Should return an array of sponsorships', function(){
        var result;
        sponsorshipService.allSponsorships()
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isArray( result );
        chai.expect( result ).to.eql( data.SponzorsEvents );
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to getSponzorship method', function(){

  	it('Should define a getSponzorship function', function(){
      chai.assert.isDefined(sponsorshipService.getSponzorship);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        sponsorshipService.getSponzorship();
      });
      chai.assert.throws(function(){
        sponsorshipService.getSponzorship([]);
      });
      chai.assert.throws(function(){
        sponsorshipService.getSponzorship(Object);
      });
      chai.assert.throws(function(){
        sponsorshipService.getSponzorship({});
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        sponsorshipService.getSponzorship("1");
      });
      chai.assert.doesNotThrow(function(){
        sponsorshipService.getSponzorship(1);
      });
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.getSponzorship(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getSponzorship failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/sponzorships/1')
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
        sponsorshipService.getSponzorship(1)
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

		////////////////////////////////////////////////////////////
    describe('getSponzorship success', function() {
      var $httpBackend;
      var data = mockData.sponsorshipService.getSponzorship();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/sponzorships/1')
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

      it('Should return the sponzorship', function(){
        var result;
        sponsorshipService.getSponzorship(1)
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isObject( result );
	      chai.expect( result ).to.have.all.keys([
	        'event',
	        'organizer',
	        'perk',
	        'sponzor',
	        'tasks'
	      ]);
	      chai.assert.isObject( result.event );
	      chai.assert.isObject( result.organizer );
	      chai.assert.isObject( result.perk );
	      chai.assert.isObject( result.sponzor );
	      chai.assert.isArray( result.tasks );
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to sponzorshipByOrganizer method', function(){

  	it('Should define a sponzorshipByOrganizer function', function(){
      chai.assert.isDefined(sponsorshipService.sponzorshipByOrganizer);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        sponsorshipService.sponzorshipByOrganizer();
      });
      chai.assert.throws(function(){
        sponsorshipService.sponzorshipByOrganizer([]);
      });
      chai.assert.throws(function(){
        sponsorshipService.sponzorshipByOrganizer(Object);
      });
      chai.assert.throws(function(){
        sponsorshipService.sponzorshipByOrganizer({});
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        sponsorshipService.sponzorshipByOrganizer("1");
      });
      chai.assert.doesNotThrow(function(){
        sponsorshipService.sponzorshipByOrganizer(1);
      });
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.sponzorshipByOrganizer(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('sponzorshipByOrganizer failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/sponzorships_organizer/1')
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
        sponsorshipService.sponzorshipByOrganizer(1)
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

		////////////////////////////////////////////////////////////
    describe('sponzorshipByOrganizer success', function() {
      var $httpBackend;
      var data = mockData.sponsorshipService.sponzorshipByOrganizer();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/sponzorships_organizer/1')
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
        sponsorshipService.sponzorshipByOrganizer(1)
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isArray( result );
      });

      it('Should be instance Of Date in the array of events', function(){
        var result;
        sponsorshipService.sponzorshipByOrganizer(1)
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
  describe('Test to sponzorshipBySponzor method', function(){

  	it('Should define a sponzorshipBySponzor function', function(){
      chai.assert.isDefined(sponsorshipService.sponzorshipBySponzor);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        sponsorshipService.sponzorshipBySponzor();
      });
      chai.assert.throws(function(){
        sponsorshipService.sponzorshipBySponzor([]);
      });
      chai.assert.throws(function(){
        sponsorshipService.sponzorshipBySponzor(Object);
      });
      chai.assert.throws(function(){
        sponsorshipService.sponzorshipBySponzor({});
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        sponsorshipService.sponzorshipBySponzor("1");
      });
      chai.assert.doesNotThrow(function(){
        sponsorshipService.sponzorshipBySponzor(1);
      });
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.sponzorshipBySponzor(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('sponzorshipBySponzor failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/sponzorships_sponzor/1')
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
        sponsorshipService.sponzorshipBySponzor(1)
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

		////////////////////////////////////////////////////////////
    describe('sponzorshipBySponzor success', function() {
      var $httpBackend;
      var data = mockData.sponsorshipService.sponzorshipBySponzor();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/sponzorships_sponzor/1')
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
        sponsorshipService.sponzorshipBySponzor(1)
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isArray( result );
      });

      it('Should be instance Of Date in the array of events', function(){
        var result;
        sponsorshipService.sponzorshipBySponzor(1)
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
  describe('Test to createSponzorship method', function(){

  	it('Should define a createSponzorship function', function(){
      chai.assert.isDefined(sponsorshipService.createSponzorship);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        sponsorshipService.createSponzorship();
      });
      chai.assert.throws(function(){
        sponsorshipService.createSponzorship([]);
      });
      chai.assert.throws(function(){
        sponsorshipService.createSponzorship(Object);
      });
      chai.assert.throws(function(){
        sponsorshipService.createSponzorship("asas");
      });
      chai.assert.throws(function(){
        sponsorshipService.createSponzorship(1);
      });
    });

    it("Should not throw an error in case a Object", function(){
      chai.assert.doesNotThrow(function(){
        sponsorshipService.createSponzorship({});
      });
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.createSponzorship({});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('createSponzorship failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'https://apilocal.sponzor.me/sponzorships')
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
        sponsorshipService.createSponzorship({})
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

		////////////////////////////////////////////////////////////
    describe('createSponzorship success', function() {
      var $httpBackend;
      var data = mockData.sponsorshipService.createSponzorship();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'https://apilocal.sponzor.me/sponzorships')
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

      it('Should return an sponzorship', function(){
        var result;
        sponsorshipService.createSponzorship({})
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isObject( result );
      });

    });
  });

	////////////////////////////////////////////////////////////
  describe('Test to deleteSponzorship method', function(){

  	it('Should define a deleteSponzorship function', function(){
      chai.assert.isDefined(sponsorshipService.deleteSponzorship);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        sponsorshipService.deleteSponzorship();
      });
      chai.assert.throws(function(){
        sponsorshipService.deleteSponzorship([]);
      });
      chai.assert.throws(function(){
        sponsorshipService.deleteSponzorship(Object);
      });
      chai.assert.throws(function(){
        sponsorshipService.deleteSponzorship({});
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        sponsorshipService.deleteSponzorship("1");
      });
      chai.assert.doesNotThrow(function(){
        sponsorshipService.deleteSponzorship(1);
      });
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.deleteSponzorship(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('deleteSponzorship failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('DELETE', 'https://apilocal.sponzor.me/sponzorships/1')
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
        sponsorshipService.deleteSponzorship(1)
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

		////////////////////////////////////////////////////////////
    describe('deleteSponzorship success', function() {
      var $httpBackend;
      var data = mockData.sponsorshipService.deleteSponzorship();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('DELETE', 'https://apilocal.sponzor.me/sponzorships/1')
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

      it('Should return an sponzorship', function(){
        var result;
        sponsorshipService.deleteSponzorship(1)
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.expect( result.message ).to.eql( data.message );
      });

    });
  });

	////////////////////////////////////////////////////////////
  describe('Test to editSponzorshipPatch method', function(){

  	it('Should define a editSponzorshipPatch function', function(){
      chai.assert.isDefined(sponsorshipService.editSponzorshipPatch);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch();
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch([], {});
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch(Object, {});
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch({}, {});
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch(1, []);
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch("1", Object);
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch(2, "as");
      });
    });

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        sponsorshipService.editSponzorshipPatch("1", {});
      });
      chai.assert.doesNotThrow(function(){
        sponsorshipService.editSponzorshipPatch(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.editSponzorshipPatch(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editSponzorshipPatch failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PATCH', 'https://apilocal.sponzor.me/sponzorships/1')
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
        sponsorshipService.editSponzorshipPatch(1, {})
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

		////////////////////////////////////////////////////////////
    describe('editSponzorshipPatch success', function() {
      var $httpBackend;
      var data = mockData.sponsorshipService.editSponzorshipPatch();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PATCH', 'https://apilocal.sponzor.me/sponzorships/1')
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

      it('Should return an sponzorship', function(){
        var result;
        sponsorshipService.editSponzorshipPatch(1, {})
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.expect( result ).to.eql( data.Sponzorship );
      });

    });
  });

	////////////////////////////////////////////////////////////
  describe('Test to editSponzorshipPut method', function(){

  	it('Should define a editSponzorshipPut function', function(){
      chai.assert.isDefined(sponsorshipService.editSponzorshipPut);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut();
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut([], {});
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut(Object, {});
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut({}, {});
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut(1, []);
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut("1", Object);
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut(2, "as");
      });
    });

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        sponsorshipService.editSponzorshipPut("1", {});
      });
      chai.assert.doesNotThrow(function(){
        sponsorshipService.editSponzorshipPut(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.editSponzorshipPut(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editSponzorshipPut failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PUT', 'https://apilocal.sponzor.me/sponzorships/1')
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
        sponsorshipService.editSponzorshipPut(1, {})
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

		////////////////////////////////////////////////////////////
    describe('editSponzorshipPut success', function() {
      var $httpBackend;
      var data = mockData.sponsorshipService.editSponzorshipPut();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PUT', 'https://apilocal.sponzor.me/sponzorships/1')
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

      it('Should return an sponzorship', function(){
        var result;
        sponsorshipService.editSponzorshipPut(1, {})
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.expect( result ).to.eql( data.Sponzorship );
      });

    });
  });

});