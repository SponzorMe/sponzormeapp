describe("Controller: AddTaskController", function() {

	var addTaskController, utilsService, mockForm, perkTaskService, perkTaskService, userService;
	var $rootScope, $httpBackend, $localStorage, $ionicHistory;

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
    $q = $injector.get('$q');
  	$httpBackend = $injector.get('$httpBackend');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});

    //Dependences with spy
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $localStorage = $injector.get('$localStorage');
    perkTaskService =  $injector.get('perkTaskService');
    perkService =  $injector.get('perkService');
    userService =  $injector.get('userService');
    
    $ionicHistory = $injector.get('$ionicHistory');
    $ionicHistory.clearCache = function () {
      var q = $q.defer();
      q.resolve();
      return q.promise;
    }
    $ionicHistory =  chai.spy.object($ionicHistory, ['nextViewOptions','clearCache','goBack']);
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }
    $stateParams = $injector.get('$stateParams');
    $stateParams.eventId = 1;

    $localStorage.userAuth = mockData.userService.login().user;


    addTaskController = $controller('AddTaskController', {
  		'$localStorage': $localStorage,
	    'perkTaskService': perkTaskService,
	    'perkService': perkService,
	    'userService': userService,
	    'utilsService': utilsService,
	    '$ionicHistory': $ionicHistory,
      '$stateParams': $stateParams
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to newTask variable', function(){

    it('Should have newTask variable', function() {
      chai.assert.isDefined( addTaskController.newTask );
      chai.assert.isObject( addTaskController.newTask );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( addTaskController.userAuth );
      chai.assert.isObject( addTaskController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( addTaskController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to perks variable', function(){

    it('Should have events variable', function() {
      chai.assert.isDefined( addTaskController.perks );
      chai.assert.isArray( addTaskController.perks );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getPerks method success', function(){

  	var dataUser = mockData.userService.getUser();
  	var dataPerks = mockData.perkService.allPerks();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'users/1').respond(200, dataUser);
  		$httpBackend.whenGET( URL_REST + 'perks').respond(200, dataPerks);
  	});

  	it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should have an perks array', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(addTaskController.perks.length, dataPerks.Perk.length)
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getPerks method failed', function(){

  	var dataUser = mockData.userService.getUser();
  	var dataPerks = mockData.failed();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'users/1').respond(200, dataUser);
  		$httpBackend.whenGET( URL_REST + 'perks').respond(400, dataPerks);
  	});

  	it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to createTask method', function(){

  	it('Should  have createTask method', function() {
      chai.assert.isDefined( addTaskController.createTask );
      chai.assert.isFunction( addTaskController.createTask );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to createTask method success', function(){

  	var dataUser = mockData.userService.getUser();
  	var dataPerks = mockData.perkService.allPerks();
  	var dataPerkCreate = mockData.perkTaskService.createPerkTask();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'users/1').respond(200, dataUser);
  		$httpBackend.whenGET( URL_REST + 'perks').respond(200, dataPerks);
  		$httpBackend.whenPOST( URL_REST + 'perk_tasks').respond(200, dataPerkCreate);
  	});

  	it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addTaskController.newTask.event = {
      	id: 1
      };
      addTaskController.newTask.perk = {
      	id: 1
      };
      addTaskController.newTask.title = 'Nueva';
      addTaskController.newTask.description = 'Nueva';
      addTaskController.createTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should be called ionicHistory methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addTaskController.newTask.event = {
      	id: 1
      };
      addTaskController.newTask.perk = {
      	id: 1
      };
      addTaskController.newTask.title = 'Nueva';
      addTaskController.newTask.description = 'Nueva';
      addTaskController.createTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.nextViewOptions).to.have.been.called();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
      chai.expect($ionicHistory.goBack).to.have.been.called();
    });

    it('Should newTask be empty', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addTaskController.newTask.event = {
      	id: 1
      };
      addTaskController.newTask.perk = {
      	id: 1
      };
      addTaskController.newTask.title = 'Nueva';
      addTaskController.newTask.description = 'Nueva';
      addTaskController.createTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( addTaskController.newTask ).to.be.empty;
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to createTask method failed', function(){

  	var dataUser = mockData.userService.getUser();
  	var dataPerks = mockData.perkService.allPerks();
  	var dataPerkCreate = mockData.failed();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'users/1').respond(200, dataUser);
  		$httpBackend.whenGET( URL_REST + 'perks').respond(200, dataPerks);
  		$httpBackend.whenPOST( URL_REST + 'perk_tasks').respond(400, dataPerkCreate);
  	});

  	it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addTaskController.newTask.event = {
      	id: 1
      };
      addTaskController.newTask.perk = {
      	id: 1
      };
      addTaskController.newTask.title = 'Nueva';
      addTaskController.newTask.description = 'Nueva';
      addTaskController.createTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });
});