describe("Controller: RegisterController", function() {

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

	beforeEach(inject(function($injector, $rootScope, $controller) {

    $translate = $injector.get('$translate');
    $state = chai.spy.object($injector.get('$state'), ['go']);
    userService = $injector.get('userService');
		utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $localStorage = $injector.get('$localStorage');
    $base64 = $injector.get('$base64');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    registerController = $controller('RegisterController', {
      '$translate': $translate,
      '$state': $state,
      'userService': userService,
      'utilsService': utilsService,
      '$localStorage': $localStorage,
      '$base64': $base64
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

    var $httpBackend;
    var dataCreateUser = mockData.userService.createUser();
    var dataLogin = mockData.userService.login();
    var mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.whenPOST( URL_REST + 'users').respond(200, dataCreateUser);
      $httpBackend.whenPOST( URL_REST + 'auth').respond(200, dataLogin);
      $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
      $httpBackend.whenGET('app/users/form-profile.html').respond(200,"");
    }));

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
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.alert).to.have.been.called();
      chai.expect(utilsService.resetForm).to.have.been.called();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with('profile');
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Test to registerNewUser method failed by Not inserted', function(){

    var $httpBackend;
    var data = mockData.failed();
    data.message = "Not inserted";
    var mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.whenPOST( URL_REST + 'users').respond(400, data);
      $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
      $httpBackend.whenGET('app/users/form-profile.html').respond(200,"");
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
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.alert).to.have.been.called();
      chai.expect(utilsService.trim).to.have.been.called();
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Test to registerNewUser method failed by email has already', function(){

    var $httpBackend;
    var data = mockData.failed();
    data.error = {
      email : "The email has already been taken."
    }

    var mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    beforeEach(inject(function($injector) { 
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.whenPOST( URL_REST + 'users').respond(400, data);
      $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
      $httpBackend.whenGET('app/users/form-profile.html').respond(200,"");
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
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.alert).to.have.been.called();
      chai.expect(utilsService.trim).to.have.been.called();
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Test to registerNewUser method failed by Invalid credentials', function(){

    var $httpBackend;
    var data = mockData.failed();
    data.message = "Invalid credentials";

    var mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.whenPOST( URL_REST + 'users').respond(400, data);
      $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
      $httpBackend.whenGET('app/users/form-profile.html').respond(200,"");
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
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.alert).to.have.been.called();
      chai.expect(utilsService.trim).to.have.been.called();
    });
  });
});