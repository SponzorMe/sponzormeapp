describe("Service: userService", function(){
  
  beforeEach(function() {
    module('app');
  });
  
  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));
  
  beforeEach(inject(function($injector, _userAuthService_) {
    
    userAuthService = _userAuthService_;
    
    $localStorage = $injector.get('$localStorage');
    $localStorage.userAuth = mockData.userService.login().user;

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
  }));
  
  ////////////////////////////////////////////////////////////
  describe('Test to getUserAuth method', function(){
    
    it('Should define a getUserAuth function', function(){
      chai.assert.isDefined(userAuthService.getUserAuth);
    });

    it('Should not throw an error in case a number or string', function(){
      chai.assert.doesNotThrow(function(){
        userAuthService.getUserAuth(1);
      });
      chai.assert.doesNotThrow(function(){
        userAuthService.getUserAuth("1");
      });
    });
    
    it('Should return userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( userAuthService.getUserAuth(), $localStorage.userAuth );
    });
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to getUserAuth method', function(){
    
    it('Should define a getUserAuth function', function(){
      chai.assert.isDefined(userAuthService.getUserAuth);
    });

    it('Should not throw an error in case a number or string', function(){
      chai.assert.doesNotThrow(function(){
        userAuthService.getUserAuth(1);
      });
      chai.assert.doesNotThrow(function(){
        userAuthService.getUserAuth("1");
      });
    });
    
    it('Should return userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( userAuthService.getUserAuth(), $localStorage.userAuth );
    });
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to  updateUserAuth method', function(){
    
    it('Should have updateUserAuth method', function() {
      chai.assert.isDefined(userAuthService.updateUserAuth);
    });
    
    it('Should extend the object userAuth and overwrite not delete', function() {
      var response = userAuthService.updateUserAuth();
      chai.assert.isObject( response );
      $localStorage.userAuth = {
        id: 2,
        last_name: 'Molina'
      };
      var response = userAuthService.updateUserAuth({
        id: 1,
        name: "Juan"
      });
      var data = {
        id: 1,
        name: "Juan",
        last_name: "Molina"
      };
      chai.expect(response).to.eql(data);
    });
    
    it('Should return a number like getTime()', function() {
      userAuthService.updateUserAuth();
      chai.assert.isNumber( $localStorage.lastUpdate );
    });
    
  });
  
});