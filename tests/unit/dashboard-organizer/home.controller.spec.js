describe('Controller: HomeOrganizerCtrl', function(){

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
    $rootScopeOn = chai.spy.on($rootScope, '$on');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('templates/dashboard-sponzor/menu.html').respond(200, '');
    $httpBackend.whenGET('templates/dashboard-sponzor/home.html').respond(200, '');

    //Dependences
    userAuthService = $injector.get('userAuthService');
    userService = $injector.get('userService');
    notificationService = $injector.get('notificationService');
    
    $localStorage = $injector.get('$localStorage');
    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );
    
   

    homeOrganizerCtrl = $controller('HomeOrganizerCtrl', {
      '$rootScope': $rootScope,
      'userAuthService': userAuthService,
      'notificationService': notificationService
  	});

  }));

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( homeOrganizerCtrl.userAuth );
      chai.assert.isObject( homeOrganizerCtrl.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( homeOrganizerCtrl.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_events variable', function(){

    it('Should have count_events variable', function() {
      chai.assert.isDefined( homeOrganizerCtrl.count_events );
      chai.assert.isNumber( homeOrganizerCtrl.count_events );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_comunity variable', function(){

    it('Should have count_comunity variable', function() {
      chai.assert.isDefined( homeOrganizerCtrl.count_comunity );
      chai.assert.isNumber( homeOrganizerCtrl.count_comunity );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_sponsors variable', function(){

    it('Should have count_sponsors variable', function() {
      chai.assert.isDefined( homeOrganizerCtrl.count_sponsors );
      chai.assert.isNumber( homeOrganizerCtrl.count_sponsors );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to activate()', function(){

    it('Should count_events be equal that 1', function() {
      $rootScope.$digest();
      chai.assert.equal( homeOrganizerCtrl.count_events, 3);
    });
    
    it('Should count_sponsors be equal that 3', function() {
      $rootScope.$digest();
      chai.assert.equal( homeOrganizerCtrl.count_sponsors, 3);
    });
    
    it('Should count_comunity be equal that 12', function() {
      $rootScope.$digest();
      chai.assert.equal( homeOrganizerCtrl.count_comunity, 12);
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to $rootScope.$on methods', function(){


    it('Should have called a HomeOrganizerController:count_sponsors and HomeOrganizerController:count_events', function() {
    	$rootScope.$digest();
      chai.expect($rootScopeOn).to.have.been.called();
    });

    it('Should count_events be 3 before call Menu:count_following', function() {
    	$rootScope.$digest();
    	$rootScope.$broadcast('HomeOrganizerController:count_sponsors');
      chai.assert.equal(homeOrganizerCtrl.count_events, 3);
    });

    it('Should count_sponsors be 3 before call Menu:count_sponsors', function() {
    	$rootScope.$digest();
    	$rootScope.$broadcast('HomeOrganizerController:count_events');
      chai.assert.equal(homeOrganizerCtrl.count_sponsors, 3);
    });

  });

});