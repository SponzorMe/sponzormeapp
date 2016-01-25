describe("Controller: SponzoringEventsController", function() {

	var sponzoringEventsController, utilsService, sponsorshipService;
	var $rootScope, $httpBackend, $localStorage, $ionicHistory, $q, $rootScopeBroadcast, $scopeBroadcast;

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
  	$httpBackend = $injector.get('$httpBackend');

    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});

    //Dependences
    $localStorage = $injector.get('$localStorage');
    sponsorshipService= $injector.get('sponsorshipService');
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $q = $injector.get('$q');

    $localStorage.userAuth = mockData.userService.login().user;

    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');

    sponzoringEventsController = $controller('SponzoringEventsController', {
  		'$localStorage': $localStorage,
	    'utilsService': utilsService,
	    'sponsorshipService': sponsorshipService,
	    '$scope': $scope,
	    '$rootScope': $rootScope
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to events array', function(){

    it('Should have events array', function() {
      chai.assert.isDefined( sponzoringEventsController.events );
      chai.assert.isArray( sponzoringEventsController.events );
      chai.expect( sponzoringEventsController.events ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( sponzoringEventsController.userAuth );
      chai.assert.isObject( sponzoringEventsController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( sponzoringEventsController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to showEmptyState variable', function(){

    it('Should have showEmptyState variable', function() {
      chai.assert.isDefined( sponzoringEventsController.showEmptyState );
      chai.assert.isFalse( sponzoringEventsController.showEmptyState );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getEvents method success', function(){

  	var dataSponzorship = mockData.sponsorshipService.sponzorshipBySponzor();

  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/sponzorships_sponzor/1').respond(200, dataSponzorship);
  	});

  	it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should have an event array', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( sponzoringEventsController.events.length, 1);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getEvents method failed', function(){

  	var dataSponzorship = mockData.failed();

  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/sponzorships_sponzor/1').respond(400, dataSponzorship);
  	});

  	it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should showEmptyState be true', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isTrue( sponzoringEventsController.showEmptyState );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method', function(){

    it('Should have doRefresh method', function() {
      chai.assert.isDefined( sponzoringEventsController.doRefresh );
      chai.assert.isFunction( sponzoringEventsController.doRefresh );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method success', function(){

  	var dataSponzorship = mockData.sponsorshipService.sponzorshipBySponzor();

  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/sponzorships_sponzor/1').respond(200, dataSponzorship);
  	});

    it('Should have an event array', function() {
      sponzoringEventsController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( sponzoringEventsController.events.length, 1);
    });

    it('Should be called broadcast Menu:count_tasks', function() {
    	sponzoringEventsController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($rootScopeBroadcast).to.have.been.called();
      chai.expect($rootScopeBroadcast).to.have.been.with('Menu:count_sponsoring', 1);
    });

    it('Should be called broadcast scroll.refreshComplete', function() {
    	sponzoringEventsController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

  });

////////////////////////////////////////////////////////////
  describe('Tests to doRefresh failed', function(){

  	var dataSponzorship = mockData.sponsorshipService.sponzorshipBySponzor();

  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/sponzorships_sponzor/1').respond(400, dataSponzorship);
  	});

  	it('Should be called broadcast scroll.refreshComplete', function() {
    	sponzoringEventsController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

  });

});