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

  beforeEach(inject(function($injector, _tasksSponsorService_) {
    tasksSponsorService = _tasksSponsorService_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
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

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET('https://apilocal.sponzor.me/task_sponzor').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        tasksSponsorService.getAllTasks()
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getAllTasks success', function() {

      var data = mockData.tasksSponsorService.getAllTasks();

      beforeEach(function() {
        $httpBackend.whenGET('https://apilocal.sponzor.me/task_sponzor').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an array of TasksSponzor', function( done ){
        tasksSponsorService.getAllTasks()
          .then(function( result ) {
            chai.assert.isArray( result );
            chai.expect( result ).to.eql( data.TasksSponzor );
            done();
          });
        $httpBackend.flush();
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

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET('https://apilocal.sponzor.me/task_sponzor/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        tasksSponsorService.getTask(1)
          .catch(function( result ) {
            chai.assert.isDefined( result.message )
            done();
          });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getTask success', function() {

      var data = mockData.tasksSponsorService.getTask();

      beforeEach(function() {
        $httpBackend.whenGET('https://apilocal.sponzor.me/task_sponzor/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a Task', function( done ){
        tasksSponsorService.getTask(1)
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.expect( result ).to.have.all.keys([
            'organizer',
            'event',
            'sponzor'
          ]);
          chai.assert.isObject( result.event );
          chai.assert.isObject( result.organizer );
          chai.assert.isObject( result.sponzor );
          done();
        });
        $httpBackend.flush();
        
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

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPOST('https://apilocal.sponzor.me/task_sponzor').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        tasksSponsorService.createTask({})
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('createTask success', function() {

      var data = mockData.tasksSponsorService.createTask();

      beforeEach(function() {
        $httpBackend.whenPOST('https://apilocal.sponzor.me/task_sponzor').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a TaskSponzor', function( done ){
        tasksSponsorService.createTask({})
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.expect( result ).to.eql( data.TaskSponzor );
          done();
        });
        $httpBackend.flush();
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

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenDELETE('https://apilocal.sponzor.me/task_sponzor/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        tasksSponsorService.deleteTask(1)
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('deleteTask success', function() {

      var data = mockData.tasksSponsorService.deleteTask();

      beforeEach(function() {
        $httpBackend.whenDELETE('https://apilocal.sponzor.me/task_sponzor/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a message', function( done ){
        tasksSponsorService.deleteTask(1)
        .then(function( result ) {
          chai.expect( result.message ).to.eql( data.message );
          done();
        });
        $httpBackend.flush();
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

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPATCH('https://apilocal.sponzor.me/task_sponzor/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        tasksSponsorService.editPatchTask(1, {})
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
        
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPatchTask success', function() {

      var data = mockData.tasksSponsorService.editPatchTask();

      beforeEach(function() {
        $httpBackend.whenPATCH('https://apilocal.sponzor.me/task_sponzor/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an message', function( done ){
        tasksSponsorService.editPatchTask(1, {})
        .then(function( result ) {
          chai.expect( result ).to.eql( data.TaskSponzor );
          done();
        });
        $httpBackend.flush();
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

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPUT('https://apilocal.sponzor.me/task_sponzor/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        tasksSponsorService.editPutTask(1, {})
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPutTask success', function() {

      var data = mockData.tasksSponsorService.editPutTask();

      beforeEach(function() {
        $httpBackend.whenPUT('https://apilocal.sponzor.me/task_sponzor/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an message', function( done ){
        var result;
        tasksSponsorService.editPutTask(1, {})
        .then(function( result ) {
          chai.expect( result ).to.eql( data.TaskSponzor );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

});