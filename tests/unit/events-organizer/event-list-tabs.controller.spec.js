describe("Controller: EventsTabsOrganizerCtrl", function() {

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));
  
  beforeEach(inject(function($injector, _$rootScope_, $controller) {

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$rootScope = _$rootScope_;
    
  	$httpBackend = $injector.get('$httpBackend');

    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    
    userAuthService = $injector.get('userAuthService');
    userService = $injector.get('userService');
    
    $localStorage = $injector.get('$localStorage');
    
    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );

    eventsTabsCtrl = $controller('EventsTabsOrganizerCtrl', {
  		'$rootScope': $rootScope,
      'userAuthService': userAuthService
  	});

  }));
  
  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( eventsTabsCtrl.userAuth );
      chai.assert.isObject( eventsTabsCtrl.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( eventsTabsCtrl.userAuth, $localStorage.userAuth );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to count_events and count_past_events', function(){

    it('Should have count_events variable', function() {
      chai.assert.isDefined( eventsTabsCtrl.count_events );
      chai.assert.isNumber( eventsTabsCtrl.count_events );
    });
    
    it('Should have count_past_events variable', function() {
      chai.assert.isDefined( eventsTabsCtrl.count_past_events );
      chai.assert.isNumber( eventsTabsCtrl.count_past_events );
    });
    
    it('Should be count_events equal that 0', function() {
      $rootScope.$digest();
      chai.assert.equal( eventsTabsCtrl.count_events, 3);
    });
    
    it('Should be count_past_events equal that 0', function() {
      $rootScope.$digest();
      chai.assert.equal( eventsTabsCtrl.count_past_events, 0);
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests called EventsTabsOrganizerCtrl:count_events', function(){
    
    it('Should have called a EventsTabsOrganizerCtrl:count_events', function() {
    	$rootScope.$digest();
      $rootScope.$broadcast('EventsTabsOrganizerCtrl:count_events');
      chai.assert.equal( eventsTabsCtrl.count_events, 3);
      chai.assert.equal( eventsTabsCtrl.count_past_events, 0);
    });
    
  });
  
});