describe("Controller: SponsorshipsPastEventsCtrl", function() {

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
    
    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');
    
    $q = $injector.get('$q');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});

    //Dependences
    //Angular
    $ionicScrollDelegate = chai.spy.object( function(){
    	this.scrollTop = function(){}
    }, ['scrollTop']);
    //Services
    sponsorshipService = $injector.get('sponsorshipService');
    userService = $injector.get('userService');
    notificationService = $injector.get('notificationService');
    userAuthService = $injector.get('userAuthService');
    
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );

    sponsorshipsListController = $controller('SponsorshipsPastEventsCtrl', {
  		'$scope': $scope,
      '$rootScope': $rootScope,
      '$ionicScrollDelegate': $ionicScrollDelegate,
      'userService': userService,
      'userAuthService': userAuthService,
  	});

  }));

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorships array', function(){

    it('Should have sponsorships array', function() {
      chai.assert.isDefined( sponsorshipsListController.sponsorships );
      chai.assert.isArray( sponsorshipsListController.sponsorships );
    });

  });

  

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( sponsorshipsListController.userAuth );
      chai.assert.isObject( sponsorshipsListController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( sponsorshipsListController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to showEmptyState variable', function(){

    it('Should have showEmptyState variable', function() {
      chai.assert.isDefined( sponsorshipsListController.showEmptyState );
      chai.assert.isBoolean( sponsorshipsListController.showEmptyState );
    });

  });
  

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method', function(){

    it('Should have doRefresh method', function() {
      chai.assert.isDefined( sponsorshipsListController.doRefresh );
      chai.assert.isFunction( sponsorshipsListController.doRefresh );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method success', function(){

    var dataUser = mockData.userService.home("0");
    dataUser.data.user.type = "0";
    console.log(dataUser);

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'home/' + $localStorage.userAuth.id ).respond(200, dataUser);
  	});

		it('Should have a sponsors array', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipsListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( sponsorshipsListController.sponsorships.length, 0 )
    });

    it('Should be called scroll.refreshComplete broadcast', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipsListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method failed', function(){

    var dataOrganizer = mockData.failed();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'home/'  + $localStorage.userAuth.id ).respond(400, dataOrganizer);
  	});

  	it('Should showEmptyState be true', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipsListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isTrue(sponsorshipsListController.showEmptyState);
    });

  });
  
   ////////////////////////////////////////////////////////////
  describe('Tests called SponsorshipsPastEventsCtrl:getSponzorships', function(){
    
    it('Should have called a SponsorshipsPastEventsCtrl:getSponzorships', function() {
    	$rootScope.$digest();
      $rootScope.$broadcast('SponsorshipsPastEventsCtrl:getSponzorships');
      chai.assert.equal( sponsorshipsListController.userAuth, $localStorage.userAuth );
      chai.assert.equal( sponsorshipsListController.sponsorships.length, 0);
      chai.assert.isTrue( sponsorshipsListController.showEmptyState );
    });
    
  });

});
