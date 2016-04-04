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
    $rootScopeOn = chai.spy.on($rootScope, '$on');
    
  	$q = $injector.get('$q');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('templates/dashboard-sponzor/menu.html').respond(200, '');
    $httpBackend.whenGET('templates/dashboard-sponzor/home.html').respond(200, '');

    //Dependences
  	$scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');

    eventService = $injector.get('eventService');

    utilsService = $injector.get('utilsService');
    utilsService = chai.spy.object( utilsService , ['showLoad', 'hideLoad','alert', 'resetForm','trim', 'confirm']);

    $localStorage = $injector.get('$localStorage');
    var userData = mockData.userService.login("1");
    userData.user.type = "1";
    $localStorage.userAuth = userAuthService.updateUserAuth( userData );

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
    });

    it('Should events be empty', function() {
      chai.assert.equal( homeSponzorController.events.length, 1 );
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
  describe('Tests to $rootScope.$on methods', function(){


    it('Should have called a HomeSponzorController:getEvents', function() {
    	$rootScope.$digest();
      chai.expect($rootScopeOn).to.have.been.called();
    });

    it('Should count_events be 3 before call HomeOrganizerController:count_sponsors', function() {
    	$rootScope.$digest();
    	$rootScope.$broadcast('HomeOrganizerController:count_sponsors');
      chai.assert.equal( homeSponzorController.events.length, 3 );
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
      chai.assert.equal( homeSponzorController.events.length, 3 );
    });

  });

});