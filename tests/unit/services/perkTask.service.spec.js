describe("Service: perkTaskService", function(){

	var perkTaskService;

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function( _perkTaskService_ ) {
    perkTaskService = _perkTaskService_;
  }));

  ////////////////////////////////////////////////////////////
  describe('Test to allPerkTasks method', function(){

    it('Should define a allPerkTasks function', function(){
      chai.assert.isDefined(perkTaskService.allPerkTasks);
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.allPerkTasks();
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('allPerkTasks failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/perk_tasks')
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
        perkTaskService.allPerkTasks()
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('allPerkTasks success', function() {
      var $httpBackend;
      var data = mockData.perkTaskService.allPerkTasks();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/perk_tasks')
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
        perkTaskService.allPerkTasks()
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isArray( result );
        chai.expect( result ).to.eql( data.PerkTasks );
      });
    });

  });


  ////////////////////////////////////////////////////////////
  describe('Test to getPerkTask method', function(){

    it('Should define a getPerkTask function', function(){
      chai.assert.isDefined(perkTaskService.getPerkTask);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkTaskService.getPerkTask();
      });
      chai.assert.throws(function(){
        perkTaskService.getPerkTask([]);
      });
      chai.assert.throws(function(){
        perkTaskService.getPerkTask({});
      });
      chai.assert.throws(function(){
        perkTaskService.getPerkTask(Object);
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkTaskService.getPerkTask("1");
      });
      chai.assert.doesNotThrow(function(){
        perkTaskService.getPerkTask(1);
      });
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.getPerkTask(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getPerkTask failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/perk_tasks/1')
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
        perkTaskService.getPerkTask(1)
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getPerkTask success', function() {
      var $httpBackend;
      var data = mockData.perkTaskService.getPerkTask();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/perk_tasks/1')
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

      it('Should return a PerkTask', function(){
        var result;
        perkTaskService.getPerkTask(1)
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isObject( result );
        chai.expect( result ).to.have.all.keys([
          'event',
          'perk',
          'user'
        ]);
        chai.assert.isObject( result.event );
        chai.assert.isObject( result.perk );
        chai.assert.isObject( result.user );
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to createPerkTask method', function(){

    it('Should define a createPerkTask function', function(){
      chai.assert.isDefined(perkTaskService.createPerkTask);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkTaskService.createPerkTask();
      });
      chai.assert.throws(function(){
        perkTaskService.createPerkTask([]);
      });
      chai.assert.throws(function(){
        perkTaskService.createPerkTask("as");
      });
      chai.assert.throws(function(){
        perkTaskService.createPerkTask(1);
      });
      chai.assert.throws(function(){
        perkTaskService.createPerkTask(Object);
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkTaskService.createPerkTask({});
      });
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.createPerkTask({});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('createPerkTask failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'https://apilocal.sponzor.me/perk_tasks')
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
        perkTaskService.createPerkTask({})
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('createPerkTask success', function() {
      var $httpBackend;
      var data = mockData.perkTaskService.createPerkTask();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'https://apilocal.sponzor.me/perk_tasks')
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

      it('Should return a PerkTask', function(){
        var result;
        perkTaskService.createPerkTask({})
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isObject( result );
        chai.expect( result ).to.eql( data.PerkTask );
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to deletePerkTask method', function(){

    it('Should define a deletePerkTask function', function(){
      chai.assert.isDefined(perkTaskService.deletePerkTask);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkTaskService.deletePerkTask();
      });
      chai.assert.throws(function(){
        perkTaskService.deletePerkTask([]);
      });
      chai.assert.throws(function(){
        perkTaskService.deletePerkTask({});
      });
      chai.assert.throws(function(){
        perkTaskService.deletePerkTask(Object);
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkTaskService.deletePerkTask("1");
      });
      chai.assert.doesNotThrow(function(){
        perkTaskService.deletePerkTask(1);
      });
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.deletePerkTask(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('deletePerkTask failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('DELETE', 'https://apilocal.sponzor.me/perk_tasks/1')
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
        perkTaskService.deletePerkTask(1)
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('deletePerkTask success', function() {
      var $httpBackend;
      var data = mockData.perkTaskService.deletePerkTask();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('DELETE', 'https://apilocal.sponzor.me/perk_tasks/1')
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
        perkTaskService.deletePerkTask(1)
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.expect( result.message ).to.eql( data.message );
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to editPerkTaskPatch method', function(){

    it('Should define a editPerkTaskPatch function', function(){
      chai.assert.isDefined(perkTaskService.editPerkTaskPatch);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch();
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch([], {});
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch(Object, {});
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch({}, {});
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch(1, []);
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch("1", Object);
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch(2, "as");
      });
    });

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        perkTaskService.editPerkTaskPatch("1", {});
      });
      chai.assert.doesNotThrow(function(){
        perkTaskService.editPerkTaskPatch(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.editPerkTaskPatch(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkTaskPatch failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PATCH', 'https://apilocal.sponzor.me/perk_tasks/1')
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
        perkTaskService.editPerkTaskPatch(1, {})
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkTaskPatch success', function() {
      var $httpBackend;
      var data = mockData.perkTaskService.editPerkTaskPatch();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PATCH', 'https://apilocal.sponzor.me/perk_tasks/1')
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
        perkTaskService.editPerkTaskPatch(1, {})
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.expect( result ).to.eql( data.PerkTask );
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to editPerkTaskPut method', function(){

    it('Should define a editPerkTaskPut function', function(){
      chai.assert.isDefined(perkTaskService.editPerkTaskPut);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut();
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut([], {});
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut(Object, {});
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut({}, {});
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut(1, []);
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut("1", Object);
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut(2, "as");
      });
    });

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        perkTaskService.editPerkTaskPut("1", {});
      });
      chai.assert.doesNotThrow(function(){
        perkTaskService.editPerkTaskPut(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.editPerkTaskPut(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkTaskPut failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PUT', 'https://apilocal.sponzor.me/perk_tasks/1')
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
        perkTaskService.editPerkTaskPut(1, {})
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkTaskPut success', function() {
      var $httpBackend;
      var data = mockData.perkTaskService.editPerkTaskPut();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PUT', 'https://apilocal.sponzor.me/perk_tasks/1')
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
        perkTaskService.editPerkTaskPut(1, {})
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.expect( result ).to.eql( data.PerkTask );
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to getPerkTaskByOrganizer method', function(){

    it('Should define a getPerkTaskByOrganizer function', function(){
      chai.assert.isDefined(perkTaskService.getPerkTaskByOrganizer);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkTaskService.getPerkTaskByOrganizer();
      });
      chai.assert.throws(function(){
        perkTaskService.getPerkTaskByOrganizer([]);
      });
      chai.assert.throws(function(){
        perkTaskService.getPerkTaskByOrganizer({});
      });
      chai.assert.throws(function(){
        perkTaskService.getPerkTaskByOrganizer(Object);
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkTaskService.getPerkTaskByOrganizer("1");
      });
      chai.assert.doesNotThrow(function(){
        perkTaskService.getPerkTaskByOrganizer(1);
      });
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.getPerkTaskByOrganizer(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getPerkTaskByOrganizer failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/perk_tasks_organizer/1')
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
        perkTaskService.getPerkTaskByOrganizer(1)
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getPerkTaskByOrganizer success', function() {
      var $httpBackend;
      var data = mockData.perkTaskService.getPerkTaskByOrganizer();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/perk_tasks_organizer/1')
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

      it('Should return an array of perk tasks', function(){
        var result;
        perkTaskService.getPerkTaskByOrganizer(1)
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isArray( result );
        chai.expect( result ).to.eql( data.PerkTasks );
      });
    });

  });

}); 