describe('Controller: MenuSponzorCtrl', function(){

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

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('templates/users/login.html').respond(200, {});

    //Dependences
  	$localStorage = $injector.get('$localStorage');
  	$localStorage = chai.spy.object($localStorage, ['$reset']);
  	$state = $injector.get('$state');
  	$state = chai.spy.object($state, ['go']);
   
    $ionicHistory = $injector.get('$ionicHistory');
    $ionicHistory.clearCache = function () {
      var q = $q.defer();
      q.resolve();
      return q.promise;
    }
    $ionicHistory = chai.spy.object($ionicHistory, ['clearCache', 'nextViewOptions', 'goBack']);

    userAuthService = $injector.get('userAuthService');
    userService = $injector.get('userService');
    notificationService = $injector.get('notificationService');
    
    var userData = mockData.userService.login("1");
    userData.user.type = "1";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );

    menuSponzorCtrl = $controller('MenuSponzorCtrl', {
      '$state': $state,
      '$localStorage': $localStorage,
      '$rootScope': $rootScope,
      '$ionicHistory': $ionicHistory,
      'userAuthService': userAuthService,
      'notificationService': notificationService
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
    
    it('Should count_following be equal that 1', function() {
      $rootScope.$digest();
      chai.assert.equal(menuSponzorCtrl.count_following, 3);
    });
    
    

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_sponsoring variable', function(){

    it('Should have count_sponsoring variable', function() {
      chai.assert.isDefined( menuSponzorCtrl.count_sponsoring );
      chai.assert.isNumber( menuSponzorCtrl.count_sponsoring );
    });
    
     it('Should count_following be equal that 0', function() {
       $rootScope.$digest();
      chai.assert.equal(menuSponzorCtrl.count_sponsoring, 0);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to $rootScope.$on methods', function(){


    it('Should have called a MenuSponzor:counts', function() {
    	$rootScope.$digest();
      chai.expect($rootScopeOn).to.have.been.called();
    });

    it('Should count_following be 3 before call MenuSponzor:counts', function() {
    	$rootScope.$digest();
    	$rootScope.$broadcast('MenuSponzor:counts');
      chai.assert.equal(menuSponzorCtrl.count_following, 3);
    });

    it('Should count_sponsoring be 0 before call Menu:count_sponsoring', function() {
    	$rootScope.$digest();
    	$rootScope.$broadcast('MenuSponzor:counts');
      chai.assert.equal(menuSponzorCtrl.count_sponsoring, 0);
    });

  });

   ////////////////////////////////////////////////////////////
  describe('Tests to logout', function(){
    
    it('Should have logout method', function() {
    	$rootScope.$digest();
      chai.assert.isDefined( menuSponzorCtrl.logout );
      chai.assert.isFunction( menuSponzorCtrl.logout );
    });

    it('Should have called ionicHistory.clearCache', function() {
    	$rootScope.$digest();
    	menuSponzorCtrl.logout();
    	$rootScope.$digest();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should have called localStorage.$reset', function() {
    	$rootScope.$digest();
    	menuSponzorCtrl.logout();
    	$rootScope.$digest();
      chai.expect($localStorage.$reset).to.have.been.called();
    });

    it('Should redirect a signin', function() {
    	$rootScope.$digest();
    	menuSponzorCtrl.logout();
    	$rootScope.$digest();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with('signin');
    });

  });

});