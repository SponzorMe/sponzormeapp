describe("Controller: RegisterCtrl", function() {

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

    //Angular
    $state = chai.spy.object($injector.get('$state'), ['go']);
    $translate = $injector.get('$translate');
    $base64 = $injector.get('$base64');
    $localStorage = $injector.get('$localStorage');
    //Services
    userService = $injector.get('userService');
    utilsService = $injector.get('utilsService');
    notificationService = $injector.get('notificationService');
    userAuthService = $injector.get('userAuthService');
    

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    registerController = $controller('RegisterCtrl', {
      '$state': $state,
      '$translate': $translate,
      '$base64': $base64,
      '$localStorage': $localStorage,
      'userService': userService,
      'utilsService': utilsService,
      'notificationService': notificationService,
      'userAuthService': userAuthService
    });
  }));

  ////////////////////////////////////////////////////////////
  describe('Tests to variables', function(){

    it('Should have newUser variable', function() {
      chai.assert.isDefined(registerController.newUser);
      chai.assert.isObject(registerController.newUser);
    });

    it('Should have newUser start with type 0', function() {
      chai.assert.isDefined(registerController.newUser.type);
      chai.assert.equal(registerController.newUser.type, 0);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to registerNewUser method success', function(){
    
    var dataCreateUser = mockData.userService.createUser();
    var dataLogin = mockData.userService.login();
    

    beforeEach(function() {
      $httpBackend.whenPOST( URL_REST + 'users').respond(200, dataCreateUser);
      $httpBackend.whenPOST( URL_REST + 'auth').respond(200, dataLogin);
      $httpBackend.whenGET('templates/users/form-profile.html').respond(200,"");
    });

    it('Should have registerNewUser method', function() {
      chai.assert.isDefined(registerController.registerNewUser);
      chai.assert.isFunction(registerController.registerNewUser);
    });

    it('Should have a token and userAuth in the localStorage', function() {

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      registerController.newUser = {
        email: "nicolas.molina.monroy@mail.com",
        password: "123456",
        name: "Nicolas",
        type: 0,//An organizer
      };

      var token = $base64.encode(registerController.newUser.email +':'+ registerController.newUser.password);
      registerController.registerNewUser( mockForm );
      $httpBackend.flush();
      chai.assert.equal($localStorage.token, token);
      chai.assert.isDefined($localStorage.userAuth);
      chai.expect( $localStorage.userAuth.id ).to.eql( dataLogin.user.id );
      chai.assert.isObject(registerController.newUser);
      chai.assert.isDefined(registerController.newUser.type);
      chai.assert.equal(registerController.newUser.type, 0);
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Test to registerNewUser method failed by Not inserted', function(){

    var data = mockData.failed();
    data.message = "Not inserted";

    beforeEach(function() {
      // Set up the mock http service responses
      $httpBackend.whenPOST( URL_REST + 'users').respond(400, data);
      $httpBackend.whenGET('templates/users/form-profile.html').respond(200,"");
    });

    it('Methods that should be called', function() {

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      registerController.newUser = {
        email: "nicolas.molina.monroy@mail.com",
        password: "123456",
        name: "Nicolas",
        type: 0,//An organizer
      };

      registerController.registerNewUser( mockForm );
      $httpBackend.flush();
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Test to registerNewUser method failed by email has already', function(){

    var data = mockData.failed();
    data.error = {
      email : "The email has already been taken."
    }

    beforeEach(inject(function($injector) { 
      // Set up the mock http service responses
      $httpBackend.whenPOST( URL_REST + 'users').respond(400, data);
      $httpBackend.whenGET('templates/users/form-profile.html').respond(200,"");
    }));

    it('Methods that should be called', function() {

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      registerController.newUser = {
        email: "nicolas.molina.monroy@mail.com",
        password: "123456",
        name: "Nicolas",
        type: 0,//An organizer
      };

      registerController.registerNewUser( mockForm );
      $httpBackend.flush();
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Test to registerNewUser method failed by Invalid credentials', function(){

    var data = mockData.failed();
    data.message = "Invalid credentials";

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend.whenPOST( URL_REST + 'users').respond(400, data);
      $httpBackend.whenGET('templates/users/form-profile.html').respond(200,"");
    }));

    it('Methods that should be called', function() {

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      registerController.newUser = {
        email: "nicolas.molina.monroy@mail.com",
        password: "123456",
        name: "Nicolas",
        type: 0,//An organizer
      };

      registerController.registerNewUser( mockForm );
      $httpBackend.flush();
    });
  });
});