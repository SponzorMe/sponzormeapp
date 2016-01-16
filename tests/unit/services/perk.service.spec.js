describe("Service: perkService", function(){

	var perkService;

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function( _perkService_ ) {
    perkService = _perkService_;
  }));

  ////////////////////////////////////////////////////////////
  describe('Test to allPerks method', function(){

    it('Should define a allPerks function', function(){
      chai.assert.isDefined(perkService.allPerks);
    });

    it('Should return a promise', function(){
      var promise = perkService.allPerks();
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('allPerks failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/perks')
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
        perkService.allPerks()
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('allPerks success', function() {
      var $httpBackend;
      var data = mockData.perkService.allPerks();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/perks')
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
        perkService.allPerks()
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isArray( result );
        chai.expect( result ).to.eql( data.Perk );
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to getPerk method', function(){

    it('Should define a getPerk function', function(){
      chai.assert.isDefined(perkService.getPerk);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkService.getPerk();
      });
      chai.assert.throws(function(){
        perkService.getPerk([]);
      });
      chai.assert.throws(function(){
        perkService.getPerk({});
      });
      chai.assert.throws(function(){
        perkService.getPerk(Object);
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkService.getPerk("1");
      });
      chai.assert.doesNotThrow(function(){
        perkService.getPerk(1);
      });
    });

    it('Should return a promise', function(){
      var promise = perkService.getPerk(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getPerk failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/perks/1')
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
        perkService.getPerk(1)
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getPerk success', function() {
      var $httpBackend;
      var data = mockData.perkService.getPerk();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/perks/1')
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

      it('Should return a Perk', function(){
        var result;
        perkService.getPerk(1)
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isObject( result );
        chai.expect( result ).to.have.all.keys([
          'event',
          'sponzorTasks',
          'tasks'
        ]);
        chai.assert.isObject( result.event );
        chai.assert.isArray( result.sponzorTasks );
        chai.assert.isArray( result.tasks );
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to createPerk method', function(){

    it('Should define a createPerk function', function(){
      chai.assert.isDefined(perkService.createPerk);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkService.createPerk();
      });
      chai.assert.throws(function(){
        perkService.createPerk([]);
      });
      chai.assert.throws(function(){
        perkService.createPerk("as");
      });
      chai.assert.throws(function(){
        perkService.createPerk(1);
      });
      chai.assert.throws(function(){
        perkService.createPerk(Object);
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkService.createPerk({});
      });
    });

    it('Should return a promise', function(){
      var promise = perkService.createPerk({});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('createPerk failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'https://apilocal.sponzor.me/perks')
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
        perkService.createPerk({})
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('createPerk success', function() {
      var $httpBackend;
      var data = mockData.perkService.createPerk();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'https://apilocal.sponzor.me/perks')
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

      it('Should return a Perk', function(){
        var result;
        perkService.createPerk({})
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isObject( result );
        chai.expect( result ).to.eql( data.Perk );
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to deletePerk method', function(){

    it('Should define a deletePerk function', function(){
      chai.assert.isDefined(perkService.deletePerk);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkService.deletePerk();
      });
      chai.assert.throws(function(){
        perkService.deletePerk([]);
      });
      chai.assert.throws(function(){
        perkService.deletePerk({});
      });
      chai.assert.throws(function(){
        perkService.deletePerk(Object);
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkService.deletePerk("1");
      });
      chai.assert.doesNotThrow(function(){
        perkService.deletePerk(1);
      });
    });

    it('Should return a promise', function(){
      var promise = perkService.deletePerk(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('deletePerk failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('DELETE', 'https://apilocal.sponzor.me/perks/1')
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
        perkService.deletePerk(1)
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('deletePerk success', function() {
      var $httpBackend;
      var data = mockData.perkService.deletePerk();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('DELETE', 'https://apilocal.sponzor.me/perks/1')
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

      it('Should return a message', function(){
        var result;
        perkService.deletePerk(1)
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.expect( result.message ).to.eql( data.message );
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to editPerkPatch method', function(){

    it('Should define a editPerkPatch function', function(){
      chai.assert.isDefined(perkService.editPerkPatch);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkService.editPerkPatch();
      });
      chai.assert.throws(function(){
        perkService.editPerkPatch([], {});
      });
      chai.assert.throws(function(){
        perkService.editPerkPatch(Object, {});
      });
      chai.assert.throws(function(){
        perkService.editPerkPatch({}, {});
      });
      chai.assert.throws(function(){
        perkService.editPerkPatch(1, []);
      });
      chai.assert.throws(function(){
        perkService.editPerkPatch("1", Object);
      });
      chai.assert.throws(function(){
        perkService.editPerkPatch(2, "as");
      });
    });

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        perkService.editPerkPatch("1", {});
      });
      chai.assert.doesNotThrow(function(){
        perkService.editPerkPatch(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = perkService.editPerkPatch(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkPatch failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PATCH', 'https://apilocal.sponzor.me/perks/1')
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
        perkService.editPerkPatch(1, {})
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkPatch success', function() {
      var $httpBackend;
      var data = mockData.perkService.editPerkPatch();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PATCH', 'https://apilocal.sponzor.me/perks/1')
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

      it('Should return an message', function(){
        var result;
        perkService.editPerkPatch(1, {})
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.expect( result ).to.eql( data.Perk );
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to editPerkPut method', function(){

    it('Should define a editPerkPut function', function(){
      chai.assert.isDefined(perkService.editPerkPut);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkService.editPerkPut();
      });
      chai.assert.throws(function(){
        perkService.editPerkPut([], {});
      });
      chai.assert.throws(function(){
        perkService.editPerkPut(Object, {});
      });
      chai.assert.throws(function(){
        perkService.editPerkPut({}, {});
      });
      chai.assert.throws(function(){
        perkService.editPerkPut(1, []);
      });
      chai.assert.throws(function(){
        perkService.editPerkPut("1", Object);
      });
      chai.assert.throws(function(){
        perkService.editPerkPut(2, "as");
      });
    });

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        perkService.editPerkPut("1", {});
      });
      chai.assert.doesNotThrow(function(){
        perkService.editPerkPut(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = perkService.editPerkPut(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkPut failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PUT', 'https://apilocal.sponzor.me/perks/1')
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
        perkService.editPerkPut(1, {})
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkPut success', function() {
      var $httpBackend;
      var data = mockData.perkService.editPerkPut();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PUT', 'https://apilocal.sponzor.me/perks/1')
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

      it('Should return an message', function(){
        var result;
        perkService.editPerkPut(1, {})
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.expect( result ).to.eql( data.Perk );
      });
    });

  });

});