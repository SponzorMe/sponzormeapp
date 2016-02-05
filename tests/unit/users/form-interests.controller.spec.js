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
    userInterestService = chai.spy.object($injector.get('userInterestService'), ['createUserInterest']);
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
  describe('Tests to categorySelected variable', function(){

    it('Should have categorySelected variable', function() {
      chai.assert.isDefined( formInterestsController.categorySelected );
      chai.assert.isNull( formInterestsController.categorySelected );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getCategory method', function(){

    it('Should have getCategory method', function() {
      chai.assert.isDefined( formInterestsController.getCategory );
      chai.assert.isFunction( formInterestsController.getCategory );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getCategory method success', function(){

  	var dataCategory = mockData.categoryService.getCategory();
  	var dataCategories = mockData.categoryService.allCategories();
  	
    beforeEach(inject(function($controller) {
  		$httpBackend.whenGET( URL_REST + 'categories/1').respond(200, dataCategory);
  		$httpBackend.whenGET( URL_REST + 'categories').respond(200, dataCategories);
  	}));

    it('Should be called utilsService methods', function() {
			var mockCategory = {
    		body: "All About the Bussines!",
        id: "1",
        lang: "en",
        title: "Art & Culture"
    	};
      formInterestsController.getCategory( mockCategory );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should have be categorySelected equal that mockCategory', function() {
    	var mockCategory = {
    		body: "All About the Bussines!",
        id: "1",
        lang: "en",
        title: "Art & Culture"
    	};
      formInterestsController.getCategory( mockCategory );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( formInterestsController.categorySelected ).to.eql( mockCategory );
  	});

  	it('Should have be categorySelected equal that be null if double getCategory', function() {
    	var mockCategory = {
    		body: "All About the Bussines!",
        id: "1",
        lang: "en",
        title: "Art & Culture"
    	};
      formInterestsController.getCategory( mockCategory );
      formInterestsController.getCategory( mockCategory );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isNull( formInterestsController.categorySelected );
  	});

  	it('Should have interests in the category', function() {
    	var mockCategory = {
    		body: "All About the Bussines!",
        id: "1",
        lang: "en",
        title: "Art & Culture",
    	};
      formInterestsController.getCategory( mockCategory );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( mockCategory.interests ).to.eql( dataCategory.data.category.interests );
  	});

  });

	////////////////////////////////////////////////////////////
  describe('Tests to getCategory method failed', function(){

  	var data = mockData.failed();
  	var dataCategories = mockData.categoryService.allCategories();
  	
    beforeEach(inject(function($controller) {
  		$httpBackend.whenGET( URL_REST + 'categories/1').respond(400, data);
  		$httpBackend.whenGET( URL_REST + 'categories').respond(200, dataCategories);
  	}));

    it('Should be called utilsService methods', function() {
			var mockCategory = {
    		body: "All About the Bussines!",
        id: "1",
        lang: "en",
        title: "Art & Culture"
    	};
      formInterestsController.getCategory( mockCategory );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to isCategorySelected method failed', function(){

    it('Should have getCategory method', function() {
      chai.assert.isDefined( formInterestsController.isCategorySelected );
      chai.assert.isFunction( formInterestsController.isCategorySelected );
    });

    it('Should return true', function() {
			var mockCategory = {
    		body: "All About the Bussines!",
        id: "1",
        lang: "en",
        title: "Art & Culture"
    	};
    	formInterestsController.categorySelected = mockCategory;
      var rta = formInterestsController.isCategorySelected( mockCategory );
      chai.assert.isTrue(rta);
    });

    it('Should return false', function() {
			var mockCategory = {
    		body: "All About the Bussines!",
        id: "1",
        lang: "en",
        title: "Art & Culture"
    	};
      var rta = formInterestsController.isCategorySelected( mockCategory );
      chai.assert.isFalse(rta);
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
  describe('Tests to updateInterests method failed by createUserInterest', function(){

  	var data = mockData.failed();
  	var dataInterests = mockData.categoryService.getInterests();
  	var dataCategories = mockData.categoryService.allCategories();

  	 beforeEach(function() {

  	 	$localStorage.userAuth.type = 0;
  		$httpBackend.whenPOST( URL_REST + 'user_interests').respond(400, data);
  		$httpBackend.whenGET( URL_REST + 'categories').respond(200, dataCategories);
  	
  	});

    it('Should be called utilsService methods', function() {
			formInterestsController.categories = dataInterests;
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getCategories method failed', function(){

  	var dataInterest = mockData.userInterestService.createUserInterestSuccess();
  	var dataInterests = mockData.categoryService.getInterests();
  	var data = mockData.failed();

  	 beforeEach(inject(function($controller) {

  	 	$localStorage.userAuth.type = 0;
  		$httpBackend.whenPOST( URL_REST + 'user_interests').respond(200, dataInterest);
  		$httpBackend.whenGET( URL_REST + 'categories').respond(400, data);
  	
  	}));

    it('Should be called utilsService methods', function() {
			
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getCategory method failed', function(){

  	var dataInterest = mockData.userInterestService.createUserInterestSuccess();
  	var dataInterests = mockData.categoryService.getInterests();
  	var data = mockData.failed();

  	 beforeEach(inject(function($controller) {

  	 	$localStorage.userAuth.type = 0;
  		$httpBackend.whenPOST( URL_REST + 'user_interests').respond(200, dataInterest);
  		$httpBackend.whenGET( URL_REST + 'categories').respond(400, data);
  	
  	}));

    it('Should be called utilsService methods', function() {
			
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateInterests method success like organizer', function(){

  	var data = mockData.userInterestService.createUserInterestSuccess();
  	var dataCategories = mockData.categoryService.allCategories();
  	var dataInterests = mockData.categoryService.getInterests();

  	 beforeEach(inject(function($controller) {

  	 	$localStorage.userAuth.type = 0;

  		$httpBackend.whenPOST( URL_REST + 'user_interests').respond(200, data);
  		$httpBackend.whenGET( URL_REST + 'categories').respond(200, dataCategories);
  		$httpBackend.whenGET('app/dashboard-organizer/menu.html').respond(200, dataCategories);
  		$httpBackend.whenGET('app/dashboard-organizer/intro.html').respond(200, dataCategories);
  	
  	}));

    it('Should be called utilsService methods', function() {
			formInterestsController.categories = dataInterests;
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

		it('Should be called createUserInterest', function() {
			formInterestsController.categories = dataInterests;
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(userInterestService.createUserInterest).to.have.been.called.exactly(3);
    });

    it('Should redirect to organizer.intro', function() {
			formInterestsController.categories = dataInterests;
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("organizer.intro");
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to updateInterests method success like sponsor', function(){

  	var data = mockData.userInterestService.createUserInterestSuccess();
  	var dataCategories = mockData.categoryService.allCategories();
  	var dataInterests = mockData.categoryService.getInterests();

  	 beforeEach(inject(function($controller) {

  	 	$localStorage.userAuth.type = 1;

  		$httpBackend.whenPOST( URL_REST + 'user_interests').respond(200, data);
  		$httpBackend.whenGET( URL_REST + 'categories').respond(200, dataCategories);
  		$httpBackend.whenGET('app/dashboard-sponzor/menu.html').respond(200, dataCategories);
  		$httpBackend.whenGET('app/dashboard-sponzor/intro.html').respond(200, dataCategories);
  	
  	}));

    it('Should be called utilsService methods', function() {
			formInterestsController.categories = dataInterests;
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

		it('Should be called createUserInterest', function() {
			formInterestsController.categories = dataInterests;
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(userInterestService.createUserInterest).to.have.been.called.exactly(3);
    });

    it('Should redirect to sponzor.intro', function() {
			formInterestsController.categories = dataInterests;
      formInterestsController.updateInterests();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("sponzor.intro");
    });

  });

});