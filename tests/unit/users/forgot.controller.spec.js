describe("Controller: ForgotCtrl", function() {


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
    $httpBackend.whenGET('templates/users/login.html').respond(200, '');

    //Dependences with spy
    //Angular
    $state = chai.spy.object( $injector.get('$state'), ['go']);
    $translate = chai.spy.object( $injector.get('$translate'), ['use']);
    //ionic
    $ionicHistory = chai.spy.object($injector.get('$ionicHistory'), ['clearCache']);
    //services
    utilsService = $injector.get('utilsService');
    userService =  $injector.get('userService');
    userAuthService =  $injector.get('userAuthService');
    
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );

    forgotController = $controller('ForgotCtrl', {
  		'$state': $state,
      '$translate': $translate,
      '$ionicHistory': $ionicHistory,
      'userService': userService, 
      'utilsService': utilsService,
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to user variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( forgotController.user );
      chai.assert.isObject( forgotController.user );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to resetPassword method', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( forgotController.resetPassword );
      chai.assert.isFunction( forgotController.resetPassword );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to resetPassword method success', function(){

    var data = mockData.userService.forgotPassword();
  	
    beforeEach(function() {
  		$httpBackend.whenPOST( URL_REST + 'send_reset_password').respond(200, data);
  	});

    it('Should be called clearCache', function() {
			forgotController.user.email = "mail@domain.com";
      forgotController.resetPassword();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should redirect to signin', function() {
			forgotController.user.email = "mail@domain.com";
      forgotController.resetPassword();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with('signin');
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to resetPassword method failed', function(){

    var data = mockData.failed();
  	
    beforeEach(inject(function($controller) {
  		$httpBackend.whenPOST( URL_REST + 'send_reset_password').respond(400, data);
  	}));

    it('Should be called utilsService methods', function() {
			forgotController.user.email = "mail@domain.com";
      forgotController.resetPassword();
      $rootScope.$digest();
      $httpBackend.flush();
      //chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });
});