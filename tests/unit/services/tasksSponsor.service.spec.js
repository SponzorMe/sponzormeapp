describe("Service: tasksSponsorService", function(){

	var tasksSponsorService;

	beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function(_tasksSponsorService_) {
    tasksSponsorService = _tasksSponsorService_;
  }));

  ////////////////////////////////////////////////////////////
  describe('Test to getAllTasks method', function(){

    it('Should define a getAllTasks function', function(){
      chai.assert.isDefined(tasksSponsorService.getAllTasks);
    });

    it('Should return a promise', function(){
      var promise = tasksSponsorService.getAllTasks();
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getAllTasks failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/task_sponzor')
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
        tasksSponsorService.getAllTasks()
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getAllTasks success', function() {
      var $httpBackend;
      var data = mockData.tasksSponsorService.getAllTasks();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/task_sponzor')
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

      it('Should return an array of TasksSponzor', function(){
        var result;
        tasksSponsorService.getAllTasks()
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isArray( result );
        chai.expect( result ).to.eql( data.TasksSponzor );
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to getTask method', function(){

    it('Should define a getTask function', function(){
      chai.assert.isDefined(tasksSponsorService.getTask);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        tasksSponsorService.getTask();
      });
      chai.assert.throws(function(){
        tasksSponsorService.getTask([]);
      });
      chai.assert.throws(function(){
        tasksSponsorService.getTask(Object);
      });
      chai.assert.throws(function(){
        tasksSponsorService.getTask({});
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        tasksSponsorService.getTask("1");
      });
      chai.assert.doesNotThrow(function(){
        tasksSponsorService.getTask(1);
      });
    });

    it('Should return a promise', function(){
      var promise = tasksSponsorService.getTask(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getTask failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/task_sponzor/1')
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
        tasksSponsorService.getTask(1)
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getTask success', function() {
      var $httpBackend;
      var data = mockData.tasksSponsorService.getTask();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', 'https://apilocal.sponzor.me/task_sponzor/1')
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

      it('Should return a Task', function(){
        var result;
        tasksSponsorService.getTask(1)
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isObject( result );
        chai.expect( result ).to.have.all.keys([
          'organizer',
          'event',
          'sponzor'
        ]);
        chai.assert.isObject( result.event );
        chai.assert.isObject( result.organizer );
        chai.assert.isObject( result.sponzor );
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to createTask method', function(){

    it('Should define a createTask function', function(){
      chai.assert.isDefined(tasksSponsorService.createTask);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        tasksSponsorService.createTask();
      });
      chai.assert.throws(function(){
        tasksSponsorService.createTask([]);
      });
      chai.assert.throws(function(){
        tasksSponsorService.createTask("as");
      });
      chai.assert.throws(function(){
        tasksSponsorService.createTask(1);
      });
      chai.assert.throws(function(){
        tasksSponsorService.createTask(Object);
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        tasksSponsorService.createTask({});
      });
    });

    it('Should return a promise', function(){
      var promise = tasksSponsorService.createTask({});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('createTask failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'https://apilocal.sponzor.me/task_sponzor')
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
        tasksSponsorService.createTask({})
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('createTask success', function() {
      var $httpBackend;
      var data = mockData.tasksSponsorService.createTask();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'https://apilocal.sponzor.me/task_sponzor')
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

      it('Should return a TaskSponzor', function(){
        var result;
        tasksSponsorService.createTask({})
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isObject( result );
        chai.expect( result ).to.eql( data.TaskSponzor );
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to deleteTask method', function(){

    it('Should define a deleteTask function', function(){
      chai.assert.isDefined(tasksSponsorService.deleteTask);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        tasksSponsorService.deleteTask();
      });
      chai.assert.throws(function(){
        tasksSponsorService.deleteTask([]);
      });
      chai.assert.throws(function(){
        tasksSponsorService.deleteTask({});
      });
      chai.assert.throws(function(){
        tasksSponsorService.deleteTask(Object);
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        tasksSponsorService.deleteTask("1");
      });
      chai.assert.doesNotThrow(function(){
        tasksSponsorService.deleteTask(1);
      });
    });

    it('Should return a promise', function(){
      var promise = tasksSponsorService.deleteTask(1);
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
        $httpBackend.when('DELETE', 'https://apilocal.sponzor.me/task_sponzor/1')
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
        tasksSponsorService.deleteTask(1)
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('deleteTask success', function() {
      var $httpBackend;
      var data = mockData.tasksSponsorService.deleteTask();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('DELETE', 'https://apilocal.sponzor.me/task_sponzor/1')
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
        tasksSponsorService.deleteTask(1)
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.expect( result.message ).to.eql( data.message );
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to editPatchTask method', function(){

    it('Should define a editPatchTask function', function(){
      chai.assert.isDefined(tasksSponsorService.editPatchTask);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        tasksSponsorService.editPatchTask();
      });
      chai.assert.throws(function(){
        tasksSponsorService.editPatchTask([], {});
      });
      chai.assert.throws(function(){
        tasksSponsorService.editPatchTask(Object, {});
      });
      chai.assert.throws(function(){
        tasksSponsorService.editPatchTask({}, {});
      });
      chai.assert.throws(function(){
        tasksSponsorService.editPatchTask(1, []);
      });
      chai.assert.throws(function(){
        tasksSponsorService.editPatchTask("1", Object);
      });
      chai.assert.throws(function(){
        tasksSponsorService.editPatchTask(2, "as");
      });
    });

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        tasksSponsorService.editPatchTask("1", {});
      });
      chai.assert.doesNotThrow(function(){
        tasksSponsorService.editPatchTask(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = tasksSponsorService.editPatchTask(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editPatchTask failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PATCH', 'https://apilocal.sponzor.me/task_sponzor/1')
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
        tasksSponsorService.editPatchTask(1, {})
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPatchTask success', function() {
      var $httpBackend;
      var data = mockData.tasksSponsorService.editPatchTask();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PATCH', 'https://apilocal.sponzor.me/task_sponzor/1')
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
        tasksSponsorService.editPatchTask(1, {})
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.expect( result ).to.eql( data.TaskSponzor );
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to editPutTask method', function(){

    it('Should define a editPutTask function', function(){
      chai.assert.isDefined(tasksSponsorService.editPutTask);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        tasksSponsorService.editPutTask();
      });
      chai.assert.throws(function(){
        tasksSponsorService.editPutTask([], {});
      });
      chai.assert.throws(function(){
        tasksSponsorService.editPutTask(Object, {});
      });
      chai.assert.throws(function(){
        tasksSponsorService.editPutTask({}, {});
      });
      chai.assert.throws(function(){
        tasksSponsorService.editPutTask(1, []);
      });
      chai.assert.throws(function(){
        tasksSponsorService.editPutTask("1", Object);
      });
      chai.assert.throws(function(){
        tasksSponsorService.editPutTask(2, "as");
      });
    });

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        tasksSponsorService.editPutTask("1", {});
      });
      chai.assert.doesNotThrow(function(){
        tasksSponsorService.editPutTask(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = tasksSponsorService.editPutTask(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editPutTask failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PUT', 'https://apilocal.sponzor.me/task_sponzor/1')
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
        tasksSponsorService.editPutTask(1, {})
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPutTask success', function() {
      var $httpBackend;
      var data = mockData.tasksSponsorService.editPutTask();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('PUT', 'https://apilocal.sponzor.me/task_sponzor/1')
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
        tasksSponsorService.editPutTask(1, {})
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.expect( result ).to.eql( data.TaskSponzor );
      });
    });

  });

});