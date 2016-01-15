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

 	it('Should define a getAllTasks function', function(){
    chai.assert.isDefined(tasksSponsorService.getAllTasks);
  });

  it('Should define a getTask function', function(){
    chai.assert.isDefined(tasksSponsorService.getTask);
  });

  it('Should define a editPutTask function', function(){
    chai.assert.isDefined(tasksSponsorService.editPutTask);
  });

  it('Should define a editPatchTask function', function(){
    chai.assert.isDefined(tasksSponsorService.editPatchTask);
  });

  it('Should define a editPacthTask function', function(){
    chai.assert.isDefined(tasksSponsorService.editPatchTask);
  });

  it('Should define a editPacthTask function', function(){
    chai.assert.isDefined(tasksSponsorService.createTask);
  });

  it('Should define a deleteTask function', function(){
    chai.assert.isDefined(tasksSponsorService.deleteTask);
  });

 	///////////////////////////////////////////////////////////

  describe('Test get all Tasks', function() {

    var $httpBackend;
    var response = {
		  "success": true,
		  "TasksSponzor": []
		}

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'https://apilocal.sponzor.me/task_sponzor').respond(200, response);
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

	  it('Should return a array of tasks', function(){
      var result;
      tasksSponsorService.getAllTasks().then(function( tasks ) {
        result = tasks;
      });
      $httpBackend.flush();
      chai.expect(response.TasksSponzor).to.eql(result);
	  });
  });

 	///////////////////////////////////////////////////////////
 	
  describe('Test get Task', function() {

    var $httpBackend;
    var response = {
		  "success": true,
		  "Task": {},
		  "Organizer": {},
		  "Sponzor": {},
		  "Event": {}
		}

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'https://apilocal.sponzor.me/task_sponzor/1').respond(200, response);
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

	  it('Should return the task object', function(){
      var result;
      tasksSponsorService.getTask( 1 ).then(function( task ) {
        result = task;
      });
      $httpBackend.flush();
      chai.expect( result ).to.include.keys('organizer', 'sponzor', 'event');
	  });
  });

	///////////////////////////////////////////////////////////
 	
  describe('Test create a task', function() {

    var $httpBackend;
    var response = {
		  "message": "Inserted",
		  "TaskSponzor": {
		    "sponzor_id": "1",
		    "perk_id": "1",
		    "event_id": "1",
		    "task_id": "1",
		    "sponzorship_id": "1",
		    "organizer_id": "2",
		    "id": 2
		  }
		}

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'https://apilocal.sponzor.me/task_sponzor').respond(200, response);
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

	  it('Should return the new task object', function(){
      var result;
      tasksSponsorService.createTask( {} ).then(function( task ) {
        result = task;
      });
      $httpBackend.flush();
      chai.expect(response.TaskSponzor).to.eql( result );
	  });
  });

	///////////////////////////////////////////////////////////
 	
  describe('Test update task PATCH', function() {

    var $httpBackend;
    var response = {
		  "message": "Updated",
		  "warnings": [],
		  "TaskSponzor": {
		    "id": 2,
		    "task_id": "1",
		    "perk_id": "1",
		    "sponzor_id": "1",
		    "organizer_id": "2",
		    "event_id": "1",
		    "sponzorship_id": "1",
		    "status": 0
		  }
		}

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PATCH', 'https://apilocal.sponzor.me/task_sponzor/1').respond(200, response);
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

	  it('Should return the new task object', function(){
      var result;
      tasksSponsorService.editPatchTask( 1, {} ).then(function( task ) {
        result = task;
      });
      $httpBackend.flush();
      chai.expect(response.TaskSponzor).to.eql( result );
	  });
  });

	///////////////////////////////////////////////////////////
 	
  describe('Test update task PUT', function() {

    var $httpBackend;
    var response = {
		  "message": "Updated",
		  "TaskSponzor": {
		    "id": 2,
		    "task_id": "1",
		    "perk_id": "1",
		    "sponzor_id": "1",
		    "organizer_id": "2",
		    "event_id": "1",
		    "sponzorship_id": "1",
		    "status": null
		  }
		}

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PUT', 'https://apilocal.sponzor.me/task_sponzor/1').respond(200, response);
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

	  it('Should return the new task object', function(){
      var result;
      tasksSponsorService.editPutTask( 1, {} ).then(function( task ) {
        result = task;
      });
      $httpBackend.flush();
      chai.expect(response.TaskSponzor).to.eql( result );
	  });
  });

	///////////////////////////////////////////////////////////
 	
  describe('Test delete task', function() {

    var $httpBackend;
    var response = {
		  "message": "Deleted"
		}

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('DELETE', 'https://apilocal.sponzor.me/task_sponzor/1').respond(200, response);
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
      tasksSponsorService.deleteTask( 1 ).then(function( rta ) {
        result = rta;
      });
      $httpBackend.flush();
      chai.expect(response.message).to.eql( result.message );
	  });
  });

});