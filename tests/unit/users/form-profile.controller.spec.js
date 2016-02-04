describe("Controller: FormProfileController", function() {

	var formProfileController, userService, utilsService, mockForm;
	var $rootScope, $httpBackend, $localStorage, $translate, $state;

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

    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    //Dependences with spy
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $localStorage = $injector.get('$localStorage');
    $translate = chai.spy.object( $injector.get('$translate'), ['use']);
    $state = chai.spy.object( $injector.get('$state'), ['go']);
    userService =  chai.spy.object($injector.get('userService'), ['editUserPatch']);

    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $localStorage.userAuth = mockData.userService.login().user;

    formProfileController = $controller('FormProfileController', {
  		'$translate': $translate,
	    'userService': userService,
	    '$state': $state,
	    'utilsService': utilsService,
	    '$localStorage': $localStorage
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have userAuth variable', function() {
      chai.assert.isDefined( formProfileController.userAuth );
      chai.assert.isObject( formProfileController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( formProfileController.userAuth, $localStorage.userAuth );
    });

    it('Should userAuth have be lang variable', function() {
    	chai.assert.isDefined( formProfileController.userAuth.lang );
      chai.assert.equal( formProfileController.userAuth.lang, 'en' );
    });

    it('Should userAuth have be gender variable', function() {
    	chai.assert.isDefined( formProfileController.userAuth.gender );
      chai.assert.equal( formProfileController.userAuth.gender, 1 );
    });

    it('Should userAuth have be age variable', function() {
    	chai.assert.isDefined( formProfileController.userAuth.age );
    	chai.assert.isNumber( formProfileController.userAuth.age );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateProfile method', function(){

    it('Should have updateProfile method', function() {
      chai.assert.isDefined( formProfileController.updateProfile );
      chai.assert.isFunction( formProfileController.updateProfile );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateProfile method success', function(){

  	var dataUser = mockData.userService.editUserPatch();
  	
    beforeEach(function() {
  		$httpBackend.whenPATCH( URL_REST + 'users/1').respond(200, dataUser);
  		$httpBackend.whenGET('app/users/form-interests.html').respond(200, '');
  	});

    it('Should be called utilsService methods', function() {
    	formProfileController.userAuth.name = "Nicolas";
    	formProfileController.userAuth.age = "1";
    	formProfileController.userAuth.location = "Bogota";
    	formProfileController.userAuth.sex = 1;
      formProfileController.updateProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.resetForm).to.have.been.called();
      chai.expect(utilsService.updateUserAuth).to.have.been.called();
    });

    it('Should redirect to interests', function() {
    	formProfileController.userAuth.name = "Nicolas";
    	formProfileController.userAuth.age = "1";
    	formProfileController.userAuth.location = "Bogota";
    	formProfileController.userAuth.sex = 1;
    	formProfileController.updateProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
  		chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("interests");
    });

    it('Should $localStorage.userAuth be equal dataUser', function() {
    	formProfileController.userAuth.name = "Nicolas";
    	formProfileController.userAuth.age = "1";
    	formProfileController.userAuth.location = "Bogota";
    	formProfileController.userAuth.sex = 1;
    	formProfileController.updateProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      dataUser = utilsService.updateUserAuth( dataUser );
  		chai.expect( dataUser ).to.eql( $localStorage.userAuth );
    });

    it('Should userAuth be empty', function() {
    	formProfileController.userAuth.name = "Nicolas";
    	formProfileController.userAuth.age = "1";
    	formProfileController.userAuth.location = "Bogota";
    	formProfileController.userAuth.sex = 1;
    	formProfileController.updateProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( formProfileController.userAuth ).to.be.empty;
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to updateProfile method failed', function(){

  	var data = mockData.failed();
  	
    beforeEach(function() {
  		$httpBackend.whenPATCH( URL_REST + 'users/1').respond(400, data);
  	});

    it('Should be called utilsService methods', function() {
    	formProfileController.userAuth.name = "Nicolas";
    	formProfileController.userAuth.age = "1";
    	formProfileController.userAuth.location = "Bogota";
    	formProfileController.userAuth.sex = 1;
      formProfileController.updateProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(userService.editUserPatch).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to changeLang method', function(){

  	it('Should have changeLang method', function() {
      chai.assert.isDefined( formProfileController.updateProfile );
      chai.assert.isFunction( formProfileController.updateProfile );
    });

    it('Should be called $translate.use', function() {
    	formProfileController.changeLang();
    	$rootScope.$digest();
    	chai.expect($translate.use).to.have.been.called();
    	chai.expect($translate.use).to.have.been.with(formProfileController.userAuth.lang);
    });

  });
});