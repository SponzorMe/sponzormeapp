describe("Controller: FormInterestsController", function() {

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
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $localStorage = $injector.get('$localStorage');
    $translate = chai.spy.object( $injector.get('$translate'), ['use']);
    $state = chai.spy.object( $injector.get('$state'), ['go']);
    userService =  chai.spy.object($injector.get('userService'), ['editUserPatch']);
    categoryService = $injector.get('categoryService');
    userInterestService = chai.spy.object($injector.get('userInterestService'), ['bulkUserInterest']);
    $q = $injector.get('$q');

    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $localStorage.userAuth = mockData.userService.login().user;

    formInterestsController = $controller('FormInterestsController', {
  		'userService': userService,
	    '$state': $state,
	    'utilsService': utilsService,
	    '$localStorage': $localStorage,
	    'categoryService': categoryService,
	    'userInterestService': userInterestService,
	    '$q': $q
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
  	 	$localStorage.userAuth.type = 0;
      $httpBackend.whenPUT( URL_REST + 'user_interests/1').respond(400, data);
  		$httpBackend.whenGET( URL_REST + 'categories').respond(200, dataCategories);
  	});

    it('Should be called utilsService methods', function() {
			$rootScope.$digest();
      $httpBackend.flush();
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateInterests method success like organizer', function(){

  	var data = mockData.userInterestService.bulkUserInterest();
  	var dataCategories = mockData.categoryService.allCategories();

  	 beforeEach(function() {
  	 	$localStorage.userAuth.type = 0;
  		$httpBackend.whenPUT( URL_REST + 'user_interests/1').respond(200, data);
  		$httpBackend.whenGET( URL_REST + 'categories').respond(200, dataCategories);
  		$httpBackend.whenGET('app/dashboard-organizer/menu.html').respond(200, dataCategories);
  		$httpBackend.whenGET('app/dashboard-organizer/intro.html').respond(200, dataCategories);
  	});

    it('Should be called utilsService methods', function() {
			$rootScope.$digest();
      $httpBackend.flush();
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

		it('Should be called bulkUserInterest', function() {
			$rootScope.$digest();
      $httpBackend.flush();
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(userInterestService.bulkUserInterest).to.have.been.called.exactly(1);
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

  	 	$localStorage.userAuth.type = 1;

  		$httpBackend.whenPUT( URL_REST + 'user_interests/1').respond(200, data);
  		$httpBackend.whenGET( URL_REST + 'categories').respond(200, dataCategories);
  		$httpBackend.whenGET('app/dashboard-sponzor/menu.html').respond(200, dataCategories);
  		$httpBackend.whenGET('app/dashboard-sponzor/intro.html').respond(200, dataCategories);
  	
  	});

    it('Should be called utilsService methods', function() {
			$rootScope.$digest();
      $httpBackend.flush();
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

		it('Should be called bulkUserInterest', function() {
			$rootScope.$digest();
      $httpBackend.flush();
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(userInterestService.bulkUserInterest).to.have.been.called.exactly(1);
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