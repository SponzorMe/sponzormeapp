describe('Controller: EventListController', function(){

	var eventListController, utilsService, userService;
	var $rootScope, $httpBackend, $localStorage, $scope, $rootScopeBroadcast, $scopeBroadcast;

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
  	$rootScopeBroadcast = chai.spy.on( $rootScope, '$broadcast' );

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});	

    //Dependences
    $localStorage = $injector.get('$localStorage');
    userService = $injector.get('userService');
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);

    $localStorage.userAuth = mockData.userService.login().user;

    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');

    eventListController = $controller('EventListController', {
  		'$localStorage': $localStorage,
	    'userService': userService,
	    'utilsService': utilsService,
	    '$scope': $scope,
	    '$rootScope': $rootScope
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( eventListController.userAuth );
      chai.assert.isObject( eventListController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( eventListController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to events array', function(){

    it('Should have events array', function() {
      chai.assert.isDefined( eventListController.events );
      chai.assert.isArray( eventListController.events  );
    });
    
     it('Should filter by newst events', function() {
      chai.assert.equal(eventListController.events.length, 1);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to showEmptyState variable', function(){

    it('Should have showEmptyState variable', function() {
      chai.assert.isDefined( eventListController.showEmptyState );
      chai.assert.isFalse( eventListController.showEmptyState );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method', function(){

    it('Should have doRefresh method', function() {
      chai.assert.isDefined( eventListController.doRefresh );
      chai.assert.isFunction( eventListController.doRefresh );
    });
    
    it('Should filter by newst events', function() {
      $rootScope.$digest();
      chai.assert.equal(eventListController.events.length, 1);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh success', function(){

  	var dataEvents = mockData.userService.home();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'home/1').respond(200, dataEvents);
  	});

    it('Should showEmptyState be boolean', function() {
      eventListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isBoolean(eventListController.showEmptyState);
    });

    it('Should filter by newst events', function() {
      eventListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(eventListController.events.length, 1);
    });

    it('Should be called broadcast Menu:count_events', function() {
      eventListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($rootScopeBroadcast).to.have.been.called();
      chai.expect($rootScopeBroadcast).to.have.been.with('Menu:count_events', 1);
    });

    it('Should be called broadcast scroll.refreshComplete', function() {
      eventListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to doRefresh failed', function(){

  	var dataEvents = mockData.failed();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'home/1').respond(400, dataEvents);
  	});

    it('Should be called broadcast scroll.refreshComplete', function() {
      eventListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

  });


});