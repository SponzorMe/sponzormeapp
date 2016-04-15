describe('Controller: EventListOrganizerCtrl', function(){

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
    
    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});	

    //Dependences
    $localStorage = $injector.get('$localStorage');
    userService = $injector.get('userService');
    userAuthService = $injector.get('userAuthService');
    utilsService = $injector.get('utilsService');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );


    eventListController = $controller('EventListOrganizerCtrl', {
  		'$scope': $scope,
      '$rootScope': $rootScope,
      'userService': userService,
      'utilsService': utilsService,
      'userAuthService': userAuthService
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
      chai.assert.equal(eventListController.events.length, 2);
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
      chai.assert.equal(eventListController.events.length, 2);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh success', function(){

  	var dataEvents = mockData.userService.home("0");
    dataEvents.data.user.type = "0";

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
      chai.assert.equal(eventListController.events.length, 2);
    });

    it('Should be called broadcast', function() {
      eventListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($rootScopeBroadcast).to.have.been.called();
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
  
  ////////////////////////////////////////////////////////////
  describe('Tests called EventListOrganizerCtrl:getEvents', function(){
    
    it('Should have called a EventListOrganizerCtrl:getEvents', function() {
    	$rootScope.$digest();
      $rootScope.$broadcast('EventListOrganizerCtrl:getEvents');
      chai.assert.equal( eventListController.userAuth, $localStorage.userAuth );
      chai.assert.equal(eventListController.events.length, 2);
      chai.assert.isFalse( eventListController.showEmptyState );
    });
    
  });


});