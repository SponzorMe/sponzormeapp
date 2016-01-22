describe("Controller: ForgotController", function() {

	var forgotController, userService, utilsService, mockForm;
	var $rootScope, $httpBackend, $localStorage, $translate, $state, $q, $ionicHistory;

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
    $localStorage = $injector.get('$localStorage');
    $translate = chai.spy.object( $injector.get('$translate'), ['use']);
    $state = chai.spy.object( $injector.get('$state'), ['go']);
    userService =  chai.spy.object($injector.get('userService'), ['editUserPatch']);
    $q = $injector.get('$q');
    $ionicHistory = chai.spy.object($injector.get('$ionicHistory'), ['clearCache']);
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $localStorage.userAuth = mockData.userService.login().user;

    forgotController = $controller('ForgotController', {
  		'$translate': $translate,
	    'userService': userService, 
	    '$state': $state,
	    'utilsService': utilsService,
	    '$ionicHistory': $ionicHistory
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
  	
    beforeEach(inject(function($controller) {
  		$httpBackend.whenPOST('https://apilocal.sponzor.me/send_reset_password').respond(200, data);
  		$httpBackend.whenGET('app/users/login.html').respond(200, '');
  	}));

    it('Should be called utilsService methods', function() {
			forgotController.user.email = "mail@domain.com";
      forgotController.resetPassword();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
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
  		$httpBackend.whenPOST('https://apilocal.sponzor.me/send_reset_password').respond(400, data);
  		$httpBackend.whenGET('app/users/login.html').respond(200, '');
  	}));

    it('Should be called utilsService methods', function() {
			forgotController.user.email = "mail@domain.com";
      forgotController.resetPassword();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });
});