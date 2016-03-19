describe("Controller: TaskListController", function() {

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
    $httpBackend.whenGET('app/tasks-organizer/task-modal.html').respond(200, {});
    

    //Dependences with spy
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $localStorage = $injector.get('$localStorage');
    perkTaskService =  $injector.get('perkTaskService');
    userService =  $injector.get('userService');
    $ionicModal =  $injector.get('$ionicModal');
    
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
      'userService': userService,
	    'utilsService': utilsService,
	    '$scope': $scope,
	    '$rootScope': $rootScope,
      '$ionicModal': $ionicModal
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
      chai.assert.isDefined( taskListController.events );
      chai.assert.isArray(taskListController.events );
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
  describe('Tests to doRefresh method', function(){

  	it('Should have user variable', function() {
      chai.assert.isDefined( taskListController.doRefresh );
      chai.assert.isFunction( taskListController.doRefresh );
    });

  });

  
});