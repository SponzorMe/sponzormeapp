describe("Controller: FormInterestsCtrl", function() {

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
    $httpBackend = $injector.get('$httpBackend');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});

    //Dependences with spy
    //Angular
    $state = chai.spy.object( $injector.get('$state'), ['go']);
    //Services
    utilsService = $injector.get('utilsService');
    categoryService = $injector.get('categoryService');
    userInterestService = $injector.get('userInterestService');
    userService =  $injector.get('userService');
    userAuthService =  $injector.get('userAuthService');

    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );

    formInterestsController = $controller('FormInterestsCtrl', {
  		'$state': $state,
      'utilsService': utilsService,
      'categoryService': categoryService,
      'userInterestService': userInterestService,
      'userService': userService,
      'userAuthService': userAuthService
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have userAuth variable', function() {
      chai.assert.isDefined( formInterestsController.userAuth );
      chai.assert.isObject( formInterestsController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( formInterestsController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to categories variable', function(){

    it('Should have categories variable', function() {
      chai.assert.isDefined( formInterestsController.categories );
      chai.assert.isArray( formInterestsController.categories );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateInterests method', function(){

    it('Should have updateInterests method', function() {
      chai.assert.isDefined( formInterestsController.updateInterests );
      chai.assert.isFunction( formInterestsController.updateInterests );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateInterests method failed by bulkUserInterest', function(){

  	var data = mockData.failed();
  	var dataCategories = mockData.categoryService.allCategories();

  	 beforeEach(function() {
      $httpBackend.whenPUT( URL_REST + 'user_interests/1').respond(400, data);
  		$httpBackend.whenGET( URL_REST + 'categories').respond(200, dataCategories);
  	});

    it('Should be called utilsService methods', function() {
			$rootScope.$digest();
      $httpBackend.flush();
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      //chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateInterests method success like organizer', function(){

  	var data = mockData.userInterestService.bulkUserInterest();
  	var dataCategories = mockData.categoryService.allCategories();

  	 beforeEach(function() {
  	 	formInterestsController.userAuth.type = 0;
  		$httpBackend.whenPUT( URL_REST + 'user_interests/1').respond(200, data);
  		$httpBackend.whenGET( URL_REST + 'categories').respond(200, dataCategories);
  		$httpBackend.whenGET('templates/dashboard-organizer/menu.html').respond(200, dataCategories);
  		$httpBackend.whenGET('templates/dashboard-organizer/intro.html').respond(200, dataCategories);
  	});

    it('Should redirect to organizer.intro', function() {
			$rootScope.$digest();
      $httpBackend.flush();
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("organizer.intro");
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to updateInterests method success like sponsor', function(){

  	var data = mockData.userInterestService.bulkUserInterest();
  	var dataCategories = mockData.categoryService.allCategories();

  	 beforeEach(function() {

  	 	formInterestsController.userAuth.type = 1;

  		$httpBackend.whenPUT( URL_REST + 'user_interests/1').respond(200, data);
  		$httpBackend.whenGET( URL_REST + 'categories').respond(200, dataCategories);
  		$httpBackend.whenGET('templates/dashboard-sponzor/menu.html').respond(200, dataCategories);
  		$httpBackend.whenGET('templates/dashboard-sponzor/intro.html').respond(200, dataCategories);
  	
  	});

    it('Should redirect to sponzor.intro', function() {
			$rootScope.$digest();
      $httpBackend.flush();
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("sponzor.intro");
    });

  });

});