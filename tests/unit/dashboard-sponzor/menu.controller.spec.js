describe('Controller: MenuSponzorCtrl', function(){

	var menuSponzorCtrl, sponsorshipService;
	var $rootScope, $q, $httpBackend, $localStorage, $ionicHistory, $rootScopeOn;

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
  	$q = $injector.get('$q');

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('app/users/login.html').respond(200, {});

    //Dependences
  	sponsorshipService = $injector.get('sponsorshipService');
  	$localStorage = $injector.get('$localStorage');
  	$localStorage = chai.spy.object($localStorage, ['$reset']);
  	$state = $injector.get('$state');
  	$state = chai.spy.object($state, ['go']);
  	
    $ionicHistory = $injector.get('$ionicHistory');
    $ionicHistory = chai.spy.object($ionicHistory, ['clearCache', 'nextViewOptions', 'goBack']);

    $localStorage.userAuth = mockData.userService.login().user;

    menuSponzorCtrl = $controller('MenuSponzorCtrl', {
  		'$state': $state,
	    '$localStorage': $localStorage,
	    'sponsorshipService': sponsorshipService,
	    '$rootScope': $rootScope,
	    '$ionicHistory': $ionicHistory
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( menuSponzorCtrl.userAuth );
      chai.assert.isObject( menuSponzorCtrl.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( menuSponzorCtrl.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_following variable', function(){

    it('Should have count_following variable', function() {
      chai.assert.isDefined( menuSponzorCtrl.count_following );
      chai.assert.isNumber( menuSponzorCtrl.count_following );
    });

    it('Should count_following be 0', function() {
      chai.assert.equal( menuSponzorCtrl.count_following, 0 );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_sponsoring variable', function(){

    it('Should have count_sponsoring variable', function() {
      chai.assert.isDefined( menuSponzorCtrl.count_sponsoring );
      chai.assert.isNumber( menuSponzorCtrl.count_sponsoring );
    });

    it('Should count_sponsoring be 0', function() {
      chai.assert.equal( menuSponzorCtrl.count_sponsoring, 0 );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to $rootScope.$on methods', function(){

  	var data = mockData.sponsorshipService.sponzorshipBySponzor();

  	beforeEach(function() {
    	$httpBackend.whenGET('https://apilocal.sponzor.me/sponzorships_sponzor/1').respond(200, data);
  	});

    it('Should have called a Menu:count_following and Menu:count_sponsoring', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();

    	function renderCountFollowing(event, total ){
	      vm.count_following = total;
	    }

	    function renderCountSponsoring(event, total ){
	      vm.count_sponsoring = total;
	    }

    	/*var params = [
    		['Menu:count_following', renderCountFollowing],
    		['Menu:count_sponsoring', renderCountSponsoring],
    	]*/
    	
      chai.expect($rootScopeOn).to.have.been.called();
      //chai.expect($rootScopeOn).to.have.been.with(params);
    });

    it('Should count_following be 3 before call Menu:count_following', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	$rootScope.$broadcast('Menu:count_following', 3);
      chai.assert.equal(menuSponzorCtrl.count_following, 3);
    });

    it('Should count_sponsoring be 31 before call Menu:count_sponsoring', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	$rootScope.$broadcast('Menu:count_sponsoring', 31);
      chai.assert.equal(menuSponzorCtrl.count_sponsoring, 31);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getCounts success', function(){

  	var data = mockData.sponsorshipService.sponzorshipBySponzor();

  	beforeEach(function() {
    	$httpBackend.whenGET('https://apilocal.sponzor.me/sponzorships_sponzor/1').respond(200, data);
  	});
  	
    it('Should count_following be 2', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	chai.assert.equal(menuSponzorCtrl.count_following, 2);
    });

    it('Should count_sponsoring be 1', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	chai.assert.equal(menuSponzorCtrl.count_sponsoring, 1);
    });

  });

   ////////////////////////////////////////////////////////////
  describe('Tests to logout', function(){

  	var data = mockData.sponsorshipService.sponzorshipBySponzor();

  	beforeEach(function() {
    	$httpBackend.whenGET('https://apilocal.sponzor.me/sponzorships_sponzor/1').respond(200, data);
  	});
  	
    it('Should have createEvent method', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
      chai.assert.isDefined( menuSponzorCtrl.logout );
      chai.assert.isFunction( menuSponzorCtrl.logout );
    });

    it('Should have called ionicHistory.clearCache', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	menuSponzorCtrl.logout();
    	$rootScope.$digest();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should have called localStorage.$reset', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	menuSponzorCtrl.logout();
    	$rootScope.$digest();
      chai.expect($localStorage.$reset).to.have.been.called();
    });

    it('Should redirect a signin', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	menuSponzorCtrl.logout();
    	$rootScope.$digest();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with('signin');
    });

  });

});