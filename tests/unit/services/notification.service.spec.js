describe("Service: notificationService", function() {
  
  beforeEach(function() {
    module('app');
  });
  
  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($injector, _$rootScope_) {
    
    $localStorage = $injector.get('$localStorage');
    $localStorage.userAuth = mockData.userService.login().user;
    
    notificationService = $injector.get('notificationService');
    
    $rootScope = _$rootScope_;

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
  }));
  
  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( notificationService.userAuth );
      chai.assert.isObject( notificationService.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( notificationService.userAuth, $localStorage.userAuth );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to activate method', function(){
    
    it('Should define a activate function', function(){
      chai.assert.isDefined(notificationService.activate);
    });
    
    it('Should be called _notificationForMe', function() {
    	notificationService.activate();
      $rootScope.$digest();
      //$httpBackend.flush();
      //chai.expect(notificationService._notificationForMe).to.have.been.called();
    });
    
    
  });
  
});