describe("Tasks Sponsors Service Testing -", function(){

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

 	it('1 should define a getAllTasks function', function(){
    expect(tasksSponsorService.getAllTasks).toBeDefined();
  });

  it('2 should define a getTask function', function(){
    expect(tasksSponsorService.getTask).toBeDefined();
  });

  it('3 should define a editPutTask function', function(){
    expect(tasksSponsorService.editPutTask).toBeDefined();
  });

  it('4 should define a editPatchTask function', function(){
    expect(tasksSponsorService.editPatchTask).toBeDefined();
  });

  it('5 should define a editPacthTask function', function(){
    expect(tasksSponsorService.deleteTask).toBeDefined();
  });

  it('6 should define a editPacthTask function', function(){
    expect(tasksSponsorService.createTask).toBeDefined();
  });

 	///////////////////////////////////////////////////////////

  describe('2. Test get all Tasks', function() {

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

	  it('2.1 should return a array of tasks', function(){
      var result;
      tasksSponsorService.getAllTasks().then(function( tasks ) {
        result = tasks;
      });
      $httpBackend.flush();
      expect(response.TasksSponzor).toEqual(result);
	  });
  });

 	///////////////////////////////////////////////////////////
 	
  describe('3. Test get Task', function() {

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

	  it('3.1 should return the task object', function(){
      var result;
      tasksSponsorService.getTask( 1 ).then(function( task ) {
        result = task;
      });
      $httpBackend.flush();
      expect(result).toEqual(jasmine.objectContaining({
	      "organizer": {},
		  	"sponzor": {},
		  	"event": {}
	    }));
	  });
  });

	///////////////////////////////////////////////////////////
 	
  describe('4. Test create a task', function() {

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

	  it('4.1 should return the new task object', function(){
      var result;
      tasksSponsorService.createTask( {} ).then(function( task ) {
        result = task;
      });
      $httpBackend.flush();
      expect(response.TaskSponzor).toEqual( result );
	  });
  });

	///////////////////////////////////////////////////////////
 	
  describe('5. Test update task PATCH', function() {

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

	  it('5.1 should return the new task object', function(){
      var result;
      tasksSponsorService.editPatchTask( 1, {} ).then(function( task ) {
        result = task;
      });
      $httpBackend.flush();
      expect(response.TaskSponzor).toEqual( result );
	  });
  });

	///////////////////////////////////////////////////////////
 	
  describe('6. Test update task PUT', function() {

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

	  it('6.1 should return the new task object', function(){
      var result;
      tasksSponsorService.editPutTask( 1, {} ).then(function( task ) {
        result = task;
      });
      $httpBackend.flush();
      expect(response.TaskSponzor).toEqual( result );
	  });
  });

	///////////////////////////////////////////////////////////
 	
  describe('7. Test delete task', function() {

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

	  it('6.1 should return a message', function(){
      var result;
      tasksSponsorService.deleteTask( 1 ).then(function( rta ) {
        result = rta;
      });
      $httpBackend.flush();
      expect(response.message).toEqual( result.message );
	  });
  });

});