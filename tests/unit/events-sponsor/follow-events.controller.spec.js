describe("Controller: FollowEventsController", function() {

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
    userService= $injector.get('userService');
    utilsService= $injector.get('utilsService');
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $q = $injector.get('$q');

    $localStorage.userAuth = mockData.userService.login().user;

    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');

    followEventsController = $controller('FollowEventsController', {
  		'$localStorage': $localStorage,
	    'utilsService': utilsService,
	    'userService': userService,
	    '$scope': $scope,
	    '$rootScope': $rootScope
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to events array', function(){

    it('Should have events array', function() {
      chai.assert.isDefined( followEventsController.sponzorships );
      chai.assert.isArray( followEventsController.sponzorships );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( followEventsController.userAuth );
      chai.assert.isObject( followEventsController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( followEventsController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to showEmptyState variable', function(){

    it('Should have showEmptyState variable', function() {
      chai.assert.isDefined( followEventsController.showEmptyState );
      chai.assert.isFalse( followEventsController.showEmptyState );
    });

  });


  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method', function(){

    it('Should have doRefresh method', function() {
      chai.assert.isDefined( followEventsController.doRefresh );
      chai.assert.isFunction( followEventsController.doRefresh );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method success', function(){

  	var dataHome = mockData.userService.home();

  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'home/' + $localStorage.userAuth.id ).respond(200, dataHome);
  	});

    it('Should have an event array', function() {
      followEventsController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( followEventsController.sponzorships.length, 1);
    });

    it('Should be called broadcast Menu:count_following', function() {
    	followEventsController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($rootScopeBroadcast).to.have.been.called();
      chai.expect($rootScopeBroadcast).to.have.been.with('Menu:count_following', 1);
    });

    it('Should be called broadcast scroll.refreshComplete', function() {
    	followEventsController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to doRefresh failed', function(){

  	var dataHome = mockData.sponsorshipService.sponzorshipBySponzor();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'home/' + $localStorage.userAuth.id ).respond(400, dataHome);
  	});

  	it('Should be called broadcast scroll.refreshComplete', function() {
    	followEventsController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

  });

});