describe('Controller: HomeSponzorController', function(){

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

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('app/dashboard-sponzor/menu.html').respond(200, '');
    $httpBackend.whenGET('app/dashboard-sponzor/home.html').respond(200, '');

    //Dependences
  	$scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');

    eventService = $injector.get('eventService');

    utilsService = $injector.get('utilsService');
    utilsService = chai.spy.object( utilsService , ['showLoad', 'hideLoad','alert', 'resetForm','trim', 'confirm']);

    $localStorage = $injector.get('$localStorage');
  	
    $localStorage.userAuth = mockData.userService.login().user;

    homeSponzorController = $controller('HomeSponzorController', {
      '$localStorage': $localStorage,
      'eventService': eventService,
      'utilsService': utilsService,
      '$scope': $scope
  		
  	});

  }));

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( homeSponzorController.userAuth );
      chai.assert.isObject( homeSponzorController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( homeSponzorController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to events array', function(){

    it('Should have events array', function() {
      chai.assert.isDefined( homeSponzorController.events );
      chai.assert.isArray( homeSponzorController.events );
      chai.expect( homeSponzorController.events ).to.be.empty;
    });

    it('Should events be empty', function() {
      chai.expect( homeSponzorController.events ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getEvents success', function(){

    var dataEvents = mockData.eventService.allEvents();
 
    beforeEach(function() {
      $httpBackend.whenGET( URL_REST + 'events').respond(200, dataEvents);
    });

    it('Should be called utilsService methods', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should be events.length', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( homeSponzorController.events.length, 1 );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getEvents failed', function(){

    var dataEvents = mockData.failed();
 
    beforeEach(function() {
      $httpBackend.whenGET( URL_REST +'events').respond(400, dataEvents);
    });

    it('Should be called utilsService methods', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method', function(){

    it('Should have doRefresh method', function() {
      chai.assert.isDefined( homeSponzorController.doRefresh );
      chai.assert.isFunction( homeSponzorController.doRefresh );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh success', function(){

    var dataEvents = mockData.eventService.allEvents();
 
    beforeEach(function() {
      $httpBackend.whenGET( URL_REST + 'events').respond(200, dataEvents);
    });

    it('Should be called $scopeBroadcast', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      homeSponzorController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

    it('Should be events.length', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      homeSponzorController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( homeSponzorController.events.length, 1 );
    });

  });

});