describe("Controller: FollowEventsCtrl", function() {

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
    userService = $injector.get('userService');
    utilsService = $injector.get('utilsService');
    userAuthService = $injector.get('userAuthService');
    
    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("1");
    userData.user.type = "1";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );

    followEventsController = $controller('FollowEventsCtrl', {
  		'$scope': $scope,
      '$rootScope': $rootScope,
      'utilsService': utilsService,
      'userService': userService,
      'userAuthService': userAuthService
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to events array', function(){

    it('Should have events array', function() {
      chai.assert.isDefined( followEventsController.sponzorships );
      chai.assert.isArray( followEventsController.sponzorships );
      chai.assert.equal( followEventsController.sponzorships.length, 3);
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
      chai.assert.equal( followEventsController.sponzorships.length, 3);
    });

    it('Should be called broadcast Menu:count_following', function() {
    	followEventsController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($rootScopeBroadcast).to.have.been.called();
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

  	var dataHome = mockData.failed();

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
  
  ////////////////////////////////////////////////////////////
  describe('Tests called FollowEventsController:getSponzorships', function(){
    
    it('Should have called a FollowEventsController:getSponzorships', function() {
    	$rootScope.$digest();
      $rootScope.$broadcast('FollowEventsController:getSponzorships');
      chai.assert.equal( followEventsController.userAuth, $localStorage.userAuth );
      chai.assert.equal( followEventsController.sponzorships.length, 3);
      chai.assert.isFalse( followEventsController.showEmptyState );
    });
    
  });


});