describe("Controller: TaskListController", function() {

	var taskListController, utilsService, mockForm, perkTaskService;
	var $rootScope, $httpBackend, $localStorage, $scope;

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($injector, _$rootScope_, $controller) {

  	$rootScope = _$rootScope_;
  	$broadcastSpy = chai.spy.on(_$rootScope_, '$broadcast');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});

    //Dependences with spy
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $localStorage = $injector.get('$localStorage');
    perkTaskService =  $injector.get('perkTaskService');
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $localStorage.userAuth = mockData.userService.login().user;
    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');

    taskListController = $controller('TaskListController', {
  		'$localStorage': $localStorage,
	    'perkTaskService': perkTaskService,
	    'utilsService': utilsService,
	    '$scope': $scope,
	    '$rootScope': $rootScope
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( taskListController.userAuth );
      chai.assert.isObject( taskListController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( taskListController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to tasks variable', function(){

    it('Should have tasks variable', function() {
      chai.assert.isDefined( taskListController.tasks );
      chai.assert.isArray(taskListController.tasks );
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to showEmptyState variable', function(){

    it('Should have showEmptyState variable', function() {
      chai.assert.isDefined( taskListController.showEmptyState );
      chai.assert.isFalse(taskListController.showEmptyState );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getTasks success', function(){

  	var data = mockData.perkTaskService.getPerkTaskByOrganizer();

    beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/perk_tasks_organizer/1').respond(200, data);
  	});

  	it('Should be called utilsService methods', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should showEmptyState be boolean', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isBoolean(taskListController.showEmptyState);
    });

    it('Should tasks is group by eventTitle', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(taskListController.tasks.length, 1);
      chai.assert.equal(taskListController.tasks[0].tasks.length, 2);
    });

    it('Should filter by tasks with done', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(taskListController.tasks.length, 1);
      chai.assert.equal(taskListController.tasks[0].tasks.length, 2);
    });

    it('Should be called broadcast Menu:count_tasks', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($broadcastSpy).to.have.been.called();
      chai.expect($broadcastSpy).to.have.been.with('Menu:count_tasks', 1);
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to getTasks failed', function(){

  	var data = mockData.failed();

    beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/perk_tasks_organizer/1').respond(400, data);
  	});

  	it('Should be called utilsService methods', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method', function(){

  	it('Should have user variable', function() {
      chai.assert.isDefined( taskListController.doRefresh );
      chai.assert.isFunction( taskListController.doRefresh );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method success', function(){

  	var data = mockData.perkTaskService.getPerkTaskByOrganizer();

    beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/perk_tasks_organizer/1').respond(200, data);
  	});

  	it('Should showEmptyState be boolean', function() {
  		taskListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isBoolean(taskListController.showEmptyState);
    });

    it('Should tasks is group by eventTitle', function() {
    	taskListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(taskListController.tasks.length, 1);
      chai.assert.equal(taskListController.tasks[0].tasks.length, 2);
    });

    it('Should filter by tasks with done', function() {
    	taskListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(taskListController.tasks.length, 1);
      chai.assert.equal(taskListController.tasks[0].tasks.length, 2);
    });

    it('Should be called broadcast Menu:count_tasks', function() {
    	taskListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($broadcastSpy).to.have.been.called();
      chai.expect($broadcastSpy).to.have.been.with('Menu:count_tasks', 1);
    });

    it('Should be called broadcast scroll.refreshComplete', function() {
    	taskListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to doRefresh failed', function(){

  	var data = mockData.failed();

    beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/perk_tasks_organizer/1').respond(400, data);
  	});

  	it('Should be called utilsService methods', function() {
  		taskListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });
});