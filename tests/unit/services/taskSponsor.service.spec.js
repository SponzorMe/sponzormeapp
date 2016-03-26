describe("Service: taskSponsorService", function(){

	var tasksSponsorService;

	beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($injector, _taskSponsorService_) {
    taskSponsorService = _taskSponsorService_;

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
  }));

  ////////////////////////////////////////////////////////////
  describe('Test to getAllTasks method', function(){

    it('Should define a getAllTasks function', function(){
      chai.assert.isDefined(taskSponsorService.getAllTasks);
    });

    it('Should return a promise', function(){
      var promise = taskSponsorService.getAllTasks();
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getAllTasks failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET( URL_REST + 'task_sponzor').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        taskSponsorService.getAllTasks()
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getAllTasks success', function() {

      var data = mockData.taskSponsorService.getAllTasks();

      beforeEach(function() {
        $httpBackend.whenGET( URL_REST + 'task_sponzor').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an array of TasksSponzor', function( done ){
        taskSponsorService.getAllTasks()
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
      chai.assert.isDefined(taskSponsorService.getTask);
    });

    /*it('Should throw an error on an incompatible type', function(){
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
    });*/

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        taskSponsorService.getTask("1");
      });
      chai.assert.doesNotThrow(function(){
        taskSponsorService.getTask(1);
      });
    });

    it('Should return a promise', function(){
      var promise = taskSponsorService.getTask(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getTask failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET( URL_REST + 'task_sponzor/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        taskSponsorService.getTask(1)
          .catch(function( result ) {
            chai.assert.isDefined( result.message )
            done();
          });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getTask success', function() {

      var data = mockData.taskSponsorService.getTask();

      beforeEach(function() {
        $httpBackend.whenGET( URL_REST + 'task_sponzor/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a Task', function( done ){
        taskSponsorService.getTask(1)
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.assert.isString( result.sponzor_id );
          chai.assert.isString( result.perk_id );
          chai.assert.isString( result.event_id );
          chai.assert.isString( result.task_id );
          chai.assert.isString( result.sponzorship_id );
          chai.assert.isString( result.organizer_id );
          //chai.assert.isObject( result.event );
          //chai.assert.isObject( result.organizer );
          //chai.assert.isObject( result.sponzor );
          done();
        });
        $httpBackend.flush();
        
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to createTask method', function(){

    it('Should define a createTask function', function(){
      chai.assert.isDefined(taskSponsorService.createTask);
    });

    /*it('Should throw an error on an incompatible type', function(){
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
    });*/

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        taskSponsorService.createTask({});
      });
    });

    it('Should return a promise', function(){
      var promise = taskSponsorService.createTask({});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('createTask failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPOST( URL_REST + 'task_sponzor').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        taskSponsorService.createTask({})
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('createTask success', function() {

      var data = mockData.taskSponsorService.createTask();

      beforeEach(function() {
        $httpBackend.whenPOST( URL_REST + 'task_sponzor').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a TaskSponzor', function( done ){
        taskSponsorService.createTask({})
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.assert.isString( result.TaskSponzor.id );
          chai.assert.isString( result.TaskSponzor.perk_id );
          chai.assert.isString( result.TaskSponzor.event_id );
          chai.assert.isString( result.TaskSponzor.task_id );
          chai.assert.isString( result.TaskSponzor.sponzorship_id );
          chai.assert.isString( result.TaskSponzor.organizer_id );
          //chai.assert.isObject( result.TaskSponzor.event );
          //chai.assert.isObject( result.TaskSponzor.organizer );
          //chai.assert.isObject( result.TaskSponzor.sponzor );
          chai.assert.isObject( result.PerkSponzor );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to deleteTask method', function(){

    it('Should define a deleteTask function', function(){
      chai.assert.isDefined(taskSponsorService.deleteTask);
    });

    /*
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
    });*/

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        taskSponsorService.deleteTask("1");
      });
      chai.assert.doesNotThrow(function(){
        taskSponsorService.deleteTask(1);
      });
    });

    it('Should return a promise', function(){
      var promise = taskSponsorService.deleteTask(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('deletePerk failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenDELETE( URL_REST + 'task_sponzor/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        taskSponsorService.deleteTask(1)
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('deleteTask success', function() {

      var data = mockData.taskSponsorService.deleteTask();

      beforeEach(function() {
        $httpBackend.whenDELETE( URL_REST + 'task_sponzor/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a message', function( done ){
        taskSponsorService.deleteTask(1)
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
      chai.assert.isDefined(taskSponsorService.editPatchTask);
    });

    /*it('Should throw an error on an incompatible type', function(){
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
    });*/

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        taskSponsorService.editPatchTask("1", {});
      });
      chai.assert.doesNotThrow(function(){
        taskSponsorService.editPatchTask(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = taskSponsorService.editPatchTask(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editPatchTask failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPATCH( URL_REST + 'task_sponzor/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        taskSponsorService.editPatchTask(1, {})
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
        
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPatchTask success', function() {

      var data = mockData.taskSponsorService.editPatchTask();

      beforeEach(function() {
        $httpBackend.whenPATCH( URL_REST + 'task_sponzor/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an message', function( done ){
        taskSponsorService.editPatchTask(1, {})
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.assert.isString( result.sponzor_id );
          chai.assert.isString( result.perk_id );
          chai.assert.isString( result.event_id );
          chai.assert.isString( result.task_id );
          chai.assert.isString( result.sponzorship_id );
          chai.assert.isString( result.organizer_id );
          //chai.assert.isObject( result.event );
          //chai.assert.isObject( result.organizer );
          //chai.assert.isObject( result.sponzor );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to editPutTask method', function(){

    it('Should define a editPutTask function', function(){
      chai.assert.isDefined(taskSponsorService.editPutTask);
    });

    /*
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
    });*/

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        taskSponsorService.editPutTask("1", {});
      });
      chai.assert.doesNotThrow(function(){
        taskSponsorService.editPutTask(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = taskSponsorService.editPutTask(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editPutTask failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPUT( URL_REST + 'task_sponzor/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        taskSponsorService.editPutTask(1, {})
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPutTask success', function() {

      var data = mockData.taskSponsorService.editPutTask();

      beforeEach(function() {
        $httpBackend.whenPUT( URL_REST + 'task_sponzor/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an message', function( done ){
        var result;
        taskSponsorService.editPutTask(1, {})
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.assert.isString( result.sponzor_id );
          chai.assert.isString( result.perk_id );
          chai.assert.isString( result.event_id );
          chai.assert.isString( result.task_id );
          chai.assert.isString( result.sponzorship_id );
          chai.assert.isString( result.organizer_id );
          //chai.assert.isObject( result.event );
          //chai.assert.isObject( result.organizer );
          //chai.assert.isObject( result.sponzor );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

});