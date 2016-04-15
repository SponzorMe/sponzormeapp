describe("Controller: LoginCtrl", function() {

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
    
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    //Dependences
    //Angular
    $state = chai.spy.object($injector.get('$state'), ['go']);
    $translate = $injector.get('$translate');
    $base64 = $injector.get('$base64');
    $localStorage = $injector.get('$localStorage');
    //Ionic
    $ionicUser = $injector.get('$ionicUser');
    $ionicAnalytics = $injector.get('$ionicAnalytics');
    //Services
    userService =  $injector.get('userService');
    utilsService =  $injector.get('utilsService');
    userAuthService =  $injector.get('userAuthService');
    notificationService =  $injector.get('notificationService');

    loginController = $controller('LoginCtrl', {
  		'$state': $state,
      '$translate': $translate,
      '$base64': $base64,
      '$localStorage': $localStorage,
      '$ionicUser': $ionicUser, 
      '$ionicAnalytics': $ionicAnalytics,
      'userService': userService,
      'utilsService': utilsService,
      'notificationService': notificationService,
      'userAuthService': userAuthService,
  	});

  }));

  ////////////////////////////////////////////////////////////
  describe('Tests to variables', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( loginController.user );
      chai.assert.isObject( loginController.user );
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
  	beforeEach(function() {
  		$httpBackend.whenPOST( URL_REST + 'auth').respond(400, data);
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
  describe('Tests to signIn method like organizer success', function(){
  	var userData = mockData.userService.login("0");
    userData.user.type = "0";
    
  	beforeEach(function() {
  		$httpBackend.whenPOST( URL_REST + 'auth').respond(200, userData);
  		$httpBackend.whenGET('templates/dashboard-organizer/menu.html').respond(200, '');
  		$httpBackend.whenGET('templates/dashboard-organizer/home.html').respond(200, '');
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

    it('Should redirect to organizer.intro', function() {
    	loginController.user.email = "mail@domain.com";
    	loginController.user.password = "123456";
      loginController.signIn( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
  		chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("organizer.home");
      $localStorage.$reset();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to signIn method like sponsor success', function(){
    
  	var userData = mockData.userService.login("1");
    userData.user.type = "1";
    
  	beforeEach(function() {
  		$httpBackend.whenPOST( URL_REST + 'auth').respond(200, userData);
  		$httpBackend.whenGET('templates/dashboard-sponzor/menu.html').respond(200, '');
  		$httpBackend.whenGET('templates/dashboard-sponzor/home.html').respond(200, '');
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

    it('Should redirect to sponzor.intro', function() {
    	loginController.user.email = "mail@domain.com";
    	loginController.user.password = "123456";
      loginController.signIn( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
  		chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("sponzor.home");
      $localStorage.$reset();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to signIn with session as organizer', function(){

  	beforeEach(inject(function($controller) {
			//Start session
	    var userData = mockData.userService.login("0");
      userData.user.type = "0";
	  	$localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );
	    $localStorage.token = "1234565";
      
      loginController = $controller('LoginCtrl', {
        '$state': $state,
        '$translate': $translate,
        '$base64': $base64,
        '$localStorage': $localStorage,
        '$ionicUser': $ionicUser, 
        '$ionicAnalytics': $ionicAnalytics,
        'userService': userService,
        'utilsService': utilsService,
        'notificationService': notificationService,
        'userAuthService': userAuthService,
      });
  	}));

  	it('Should have userResponse be equal that $localStorage.userAuth', function() {
      chai.assert.equal( loginController.user, $localStorage.userAuth );
    });

    it('Should redirect to sponzor.home', function() {
  		chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("organizer.home");
      $localStorage.$reset();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to signIn with session as sponsor', function(){

  	var loginControllerSession;

  	beforeEach(inject(function($controller) {
			//Start session
	    var userData = mockData.userService.login("1");
      userData.user.type = "1";
	  	$localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );
	    $localStorage.token = "1234565";
      
      loginController = $controller('LoginCtrl', {
        '$state': $state,
        '$translate': $translate,
        '$base64': $base64,
        '$localStorage': $localStorage,
        '$ionicUser': $ionicUser, 
        '$ionicAnalytics': $ionicAnalytics,
        'userService': userService,
        'utilsService': utilsService,
        'notificationService': notificationService,
        'userAuthService': userAuthService,
      });
  	}));

  	it('Should have userResponse be equal that $localStorage.userAuth', function() {
      chai.assert.equal( loginController.user, $localStorage.userAuth );
    });

    it('Should redirect to organizer.home', function() {
  		chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("sponzor.home");
      $localStorage.$reset();
    });

  });

});