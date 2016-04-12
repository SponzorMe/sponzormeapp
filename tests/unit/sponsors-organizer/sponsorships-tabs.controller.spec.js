describe("Controller: SponsorshipsTabsCtrl", function() {

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
  	$rootScopeBroadcast = chai.spy.on( $rootScope, '$broadcast' );

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});

    //Dependences
    userService = $injector.get('userService');;
    userAuthService = $injector.get('userAuthService');

    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );

    sponsorshipsTabsCtrl = $controller('SponsorshipsTabsCtrl', {
  		'$rootScope': $rootScope,
      'userAuthService': userAuthService,
  	});

  }));

  ////////////////////////////////////////////////////////////
  describe('Tests to count_events', function(){

    it('Should have count_events variable', function() {
      chai.assert.isDefined( sponsorshipsTabsCtrl.count_events );
      chai.assert.isNumber( sponsorshipsTabsCtrl.count_events );
    });
    
    it('Should count_events be equal that 3', function() {
      console.log( sponsorshipsTabsCtrl.count_events );
      chai.assert.equal( sponsorshipsTabsCtrl.count_events, 3 );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to count_past_events', function(){

    it('Should have count_past_events variable', function() {
      chai.assert.isDefined( sponsorshipsTabsCtrl.count_past_events );
      chai.assert.isNumber( sponsorshipsTabsCtrl.count_past_events );
    });
    
    it('Should count_past_events be equal that 0', function() {
      chai.assert.equal( sponsorshipsTabsCtrl.count_past_events, 0 );
    });

  });  

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( sponsorshipsTabsCtrl.userAuth );
      chai.assert.isObject( sponsorshipsTabsCtrl.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( sponsorshipsTabsCtrl.userAuth, $localStorage.userAuth );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests called SponsorshipsTabsCtrl:count_sponsors', function(){
    
    it('Should have called a SponsorshipsTabsCtrl:count_sponsors', function() {
    	$rootScope.$digest();
      $rootScope.$broadcast('SponsorshipsTabsCtrl:count_sponsors');
      chai.assert.equal( sponsorshipsTabsCtrl.userAuth, $localStorage.userAuth );
      chai.assert.equal( sponsorshipsTabsCtrl.count_events, 3);
      chai.assert.equal( sponsorshipsTabsCtrl.count_past_events, 0);
    });
    
  });

});
