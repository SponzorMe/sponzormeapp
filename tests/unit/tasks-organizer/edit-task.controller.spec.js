describe("Controller: EditTaskController", function() {

	var editTaskController, utilsService, mockForm, perkTaskService;
	var $rootScope, $httpBackend, $localStorage, $scope, $stateParams, $ionicHistory;

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

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});

    //Dependences with spy
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $localStorage = $injector.get('$localStorage');
    perkTaskService =  $injector.get('perkTaskService');
    $stateParams =  $injector.get('$stateParams');
    $ionicHistory =  chai.spy.object($injector.get('$ionicHistory'), ['nextViewOptions','clearCache','goBack']);
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $localStorage.userAuth = mockData.userService.login().user;
    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');

    $stateParams.id = 1;

    editTaskController = $controller('EditTaskController', {
  		'$localStorage': $localStorage,
      'perkTaskService': perkTaskService,
      'utilsService': utilsService,
      '$stateParams': $stateParams,
      '$ionicHistory': $ionicHistory
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to newTask variable', function(){

    it('Should have newTask variable', function() {
      chai.assert.isDefined( editTaskController.newTask );
      chai.assert.isObject( editTaskController.newTask );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( editTaskController.userAuth );
      chai.assert.isObject( editTaskController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( editTaskController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getTask success', function(){

  	var dataPerkTask = mockData.perkTaskService.getPerkTask();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'perk_tasks/1').respond(200, dataPerkTask);
  	});

    it('Should be called utilsService methods', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should be PerkTask equal that dataPerkTask', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	chai.assert.isObject( editTaskController.newTask );
      chai.expect( editTaskController.newTask ).to.have.all.keys([
        'event',
        'perk',
        'user',
        'status'
      ]);
      chai.assert.isObject( editTaskController.newTask.event );
      chai.assert.isObject( editTaskController.newTask.perk );
      chai.assert.isObject( editTaskController.newTask.user );
      chai.assert.isBoolean( editTaskController.newTask.status );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getTask failed', function(){

  	var dataPerkTask = mockData.failed();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'perk_tasks/1').respond(400, dataPerkTask);
  	});

    it('Should be called utilsService methods', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to editTask method', function(){

    it('Should have editTask method', function() {
      chai.assert.isDefined( editTaskController.editTask );
      chai.assert.isFunction( editTaskController.editTask );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to editTask method success', function(){

    var dataPerkTask = mockData.perkTaskService.getPerkTask();
    var dataEditPerkTask = mockData.perkTaskService.editPerkTaskPatch();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'perk_tasks/1').respond(200, dataPerkTask);
  		$httpBackend.whenPATCH( URL_REST + 'perk_tasks/1').respond(200, dataEditPerkTask);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	editTaskController.editTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should newTask be empty', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	editTaskController.editTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( editTaskController.newTask ).to.be.empty;
    });

    it('Should be called ionicHistory methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	editTaskController.editTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.nextViewOptions).to.have.been.called();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
      chai.expect($ionicHistory.goBack).to.have.been.called();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to editTask method failed', function(){

    var dataPerkTask = mockData.perkTaskService.getPerkTask();
    var data = mockData.failed();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'perk_tasks/1').respond(200, dataPerkTask);
  		$httpBackend.whenPATCH( URL_REST + 'perk_tasks/1').respond(400, data);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	editTaskController.editTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to deleteTask method', function(){

    it('Should have deleteTask method', function() {
      chai.assert.isDefined( editTaskController.deleteTask );
      chai.assert.isFunction( editTaskController.deleteTask );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to deleteTask method success', function(){

    var dataPerkTask = mockData.perkTaskService.getPerkTask();
    var dataDeletePerkTask = mockData.perkTaskService.deletePerkTask();


  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'perk_tasks/1').respond(200, dataPerkTask);
  		$httpBackend.whenDELETE( URL_REST + 'perk_tasks/1')
          .respond(200, dataDeletePerkTask);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	editTaskController.deleteTask();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should newTask be empty', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	editTaskController.deleteTask();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( editTaskController.newTask ).to.be.empty;
    });

    it('Should be called ionicHistory methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	editTaskController.deleteTask();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.nextViewOptions).to.have.been.called();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
      chai.expect($ionicHistory.goBack).to.have.been.called();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to deleteTask method failed', function(){

    var dataPerkTask = mockData.perkTaskService.getPerkTask();
    var dataDeletePerkTask = mockData.failed();


  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'perk_tasks/1').respond(200, dataPerkTask);
  		$httpBackend.whenDELETE( URL_REST + 'perk_tasks/1')
          .respond(400, dataDeletePerkTask);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	editTaskController.deleteTask();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.alert).to.have.been.called();
    });

  });

});