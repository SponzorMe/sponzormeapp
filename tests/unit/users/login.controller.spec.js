describe("Controller: LoginController", function() {


	var loginController, userService, utilsService, mockForm;
	var $rootScope, $httpBackend, $q, $state, $localStorage, $translate, $base64;

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

    //Dependences with spy
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $state = chai.spy.object($injector.get('$state'), ['go']);
    $localStorage = $injector.get('$localStorage');
    $translate = $injector.get('$translate');
    userService =  chai.spy.object($injector.get('userService'), ['editUserPatch']);
    $base64 = $injector.get('$base64');

    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    loginController = $controller('LoginController', {
  		'$translate': $translate,
	    'userService': userService,
	    '$localStorage': $localStorage,
	    '$state': $state,
	    'utilsService': utilsService,
	    '$base64': $base64
  	});

  }));

  ////////////////////////////////////////////////////////////
  describe('Tests to variables', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( loginController.user );
      chai.assert.isObject( loginController.user );
    });

    it('Should have userResponse variable', function() {
      chai.assert.isDefined( loginController.userResponse );
      chai.assert.isObject( loginController.userResponse );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to signIn', function(){

   	it('Should have signIn variable', function() {
      chai.assert.isDefined( loginController.signIn );
      chai.assert.isFunction( loginController.signIn );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to signIn method failed', function(){
  	var data = mockData.failed();
  	data.message = "Invalid credentials";
  	beforeEach(inject(function($controller) {
  		$httpBackend.whenPOST('https://apilocal.sponzor.me/auth').respond(400, data);
  	}));

    it('Should be called utilsService methods', function() {
    	loginController.user.email = "mail@domain.com";
    	loginController.user.password = "123456";
      loginController.signIn( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.trim).to.have.been.called();
      chai.expect(utilsService.alert).to.have.been.called();
    });

    it('Should password be empty ', function() {
    	loginController.user.email = "mail@domain.com";
    	loginController.user.password = "123456";
      loginController.signIn( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(loginController.user.password, '');
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to signIn failed by editUserPatch', function(){
  	var data = mockData.userService.login();
  	var dataUser = mockData.failed();
  	data.user.type = 0;
  	data.user.demo = 0;
  	beforeEach(inject(function($controller) {
  		$httpBackend.whenPOST('https://apilocal.sponzor.me/auth').respond(200, data);
  		$httpBackend.whenPATCH('https://apilocal.sponzor.me/users/1').respond(400, dataUser);
  	}));

    it('Should be failed', function() {
    	loginController.user.email = "mail@domain.com";
    	loginController.user.password = "123456";
      loginController.signIn( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to signIn method like organizer and demo 0 success', function(){
  	var data = mockData.userService.login();
  	var dataUser = mockData.userService.editUserPatch();
  	data.user.type = 0;
  	data.user.demo = 0;
  	beforeEach(inject(function($controller) {
  		$httpBackend.whenPOST('https://apilocal.sponzor.me/auth').respond(200, data);
  		$httpBackend.whenPATCH('https://apilocal.sponzor.me/users/1').respond(200, dataUser);
  		$httpBackend.whenGET('app/dashboard-organizer/menu.html').respond(200, '');
  		$httpBackend.whenGET('app/dashboard-organizer/intro.html').respond(200, '');
  	}));

    it('Should be called utilsService', function() {
    	loginController.user.email = "mail@domain.com";
    	loginController.user.password = "123456";
      loginController.signIn( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should token be equal that localStorage.token', function() {
    	loginController.user.email = "mail@domain.com";
    	loginController.user.password = "123456";
      loginController.signIn( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      var token = $base64.encode('mail@domain.com:123456');
    	chai.assert.equal( $localStorage.token, token );
    	chai.expect( loginController.user ).to.be.empty;
    });

    it('Should be called userService.editUserPatch', function() {
    	loginController.user.email = "mail@domain.com";
    	loginController.user.password = "123456";
      loginController.signIn( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(userService.editUserPatch).to.have.been.called();
    });

    it('Should redirect to organizer.intro', function() {
    	loginController.user.email = "mail@domain.com";
    	loginController.user.password = "123456";
      loginController.signIn( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
  		chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("organizer.intro");
      $localStorage.$reset();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to signIn method like sponzor and demo 0 success', function(){
  	var data = mockData.userService.login();
  	var dataUser = mockData.userService.editUserPatch();
  	data.user.type = 1;
  	data.user.demo = 0;
  	beforeEach(inject(function($controller) {
  		$httpBackend.whenPOST('https://apilocal.sponzor.me/auth').respond(200, data);
  		$httpBackend.whenPATCH('https://apilocal.sponzor.me/users/1').respond(200, dataUser);
  		$httpBackend.whenGET('app/dashboard-sponzor/menu.html').respond(200, '');
  		$httpBackend.whenGET('app/dashboard-sponzor/intro.html').respond(200, '');
  	}));

    it('Should be called utilsService', function() {
    	loginController.user.email = "mail@domain.com";
    	loginController.user.password = "123456";
      loginController.signIn( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should token be equal that localStorage.token', function() {
    	loginController.user.email = "mail@domain.com";
    	loginController.user.password = "123456";
      loginController.signIn( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      var token = $base64.encode('mail@domain.com:123456');
    	chai.assert.equal( $localStorage.token, token );
    	chai.expect( loginController.user ).to.be.empty;
    });

    it('Should be called userService.editUserPatch', function() {
    	loginController.user.email = "mail@domain.com";
    	loginController.user.password = "123456";
      loginController.signIn( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(userService.editUserPatch).to.have.been.called();
    });

    it('Should redirect to sponzor.intro', function() {
    	loginController.user.email = "mail@domain.com";
    	loginController.user.password = "123456";
      loginController.signIn( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
  		chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("sponzor.intro");
      $localStorage.$reset();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to signIn with session demo is 1 and type is 1', function(){

  	var loginControllerSession;

  	beforeEach(inject(function($controller) {
			//Start session
	    var data = mockData.userService.login().user;
	    data.type = 1;
	    data.demo = 1;
	  	$localStorage.userAuth = data;
	    $localStorage.token = "1234565";

	  	loginControllerSession = $controller('LoginController', {
	  		'$translate': $translate,
		    'userService': userService,
		    '$localStorage': $localStorage,
		    '$state': $state,
		    'utilsService': utilsService,
		    '$base64': $base64
	  	});
  	}));

  	it('Should have userResponse be equal that $localStorage.userAuth', function() {
      chai.assert.equal( loginControllerSession.userResponse, $localStorage.userAuth );
    });

    it('Should redirect to sponzor.home', function() {
  		chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("sponzor.home");
      $localStorage.$reset();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to signIn with session demo is 0 and type is 1', function(){

  	var loginControllerSession;
  	var data = mockData.userService.login().user;
  	var dataUser = mockData.userService.editUserPatch();

  	beforeEach(inject(function($controller) {

  		$httpBackend.whenPATCH('https://apilocal.sponzor.me/users/1').respond(200, dataUser);
  		$httpBackend.whenGET('app/dashboard-sponzor/menu.html').respond(200, '');
  		$httpBackend.whenGET('app/dashboard-sponzor/intro.html').respond(200, '');
			//Start session
	    data.type = 1;
	    data.demo = 0;
	  	$localStorage.userAuth = data;
	    $localStorage.token = "1234565";

	  	loginControllerSession = $controller('LoginController', {
	  		'$translate': $translate,
		    'userService': userService,
		    '$localStorage': $localStorage,
		    '$state': $state,
		    'utilsService': utilsService,
		    '$base64': $base64
	  	});

	  	
  		$httpBackend.flush();
  	}));

  	it('Should have userResponse be equal that $localStorage.userAuth', function() {
      chai.assert.equal( loginControllerSession.userResponse, $localStorage.userAuth );
    });

    it('Should be demo variables equal 1', function() {
      chai.assert.equal( loginControllerSession.userResponse.demo, 1);
    });

    it('Should be called editUserPatch', function() {
    	chai.expect( userService.editUserPatch ).to.have.been.called();
    });

    it('Should redirect to sponzor.intro', function() {
  		chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("sponzor.intro");
      $localStorage.$reset();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to signIn with session demo is 1 and type is 0', function(){

  	var loginControllerSession;

  	beforeEach(inject(function($controller) {
			//Start session
	    var data = mockData.userService.login().user;
	    data.type = 0;
	    data.demo = 1;
	  	$localStorage.userAuth = data;
	    $localStorage.token = "1234565";

	  	loginControllerSession = $controller('LoginController', {
	  		'$translate': $translate,
		    'userService': userService,
		    '$localStorage': $localStorage,
		    '$state': $state,
		    'utilsService': utilsService,
		    '$base64': $base64
	  	});
  	}));

  	it('Should have userResponse be equal that $localStorage.userAuth', function() {
      chai.assert.equal( loginControllerSession.userResponse, $localStorage.userAuth );
    });

    it('Should redirect to organizer.home', function() {
  		chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("organizer.home");
      $localStorage.$reset();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to signIn with session demo is 0 and type is 0', function(){

  	var loginControllerSession;
  	var data = mockData.userService.login().user;
  	var dataUser = mockData.userService.editUserPatch();

  	beforeEach(inject(function($controller) {

  		$httpBackend.whenPATCH('https://apilocal.sponzor.me/users/1').respond(200, dataUser);
  		$httpBackend.whenGET('app/dashboard-organizer/menu.html').respond(200, '');
  		$httpBackend.whenGET('app/dashboard-organizer/intro.html').respond(200, '');
			//Start session
	    data.type = 0;
	    data.demo = 0;
	  	$localStorage.userAuth = data;
	    $localStorage.token = "1234565";

	  	loginControllerSession = $controller('LoginController', {
	  		'$translate': $translate,
		    'userService': userService,
		    '$localStorage': $localStorage,
		    '$state': $state,
		    'utilsService': utilsService,
		    '$base64': $base64
	  	});

	  	
  		$httpBackend.flush();
  	}));

  	it('Should have userResponse be equal that $localStorage.userAuth', function() {
      chai.assert.equal( loginControllerSession.userResponse, $localStorage.userAuth );
    });

    it('Should be demo variables equal 1', function() {
      chai.assert.equal( loginControllerSession.userResponse.demo, 1);
    });

    it('Should be called editUserPatch', function() {
    	chai.expect( userService.editUserPatch ).to.have.been.called();
    });

    it('Should redirect to organizer.intro', function() {
  		chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("organizer.intro");
      $localStorage.$reset();
    });

  });


});