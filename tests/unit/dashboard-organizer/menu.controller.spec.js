describe('Controller: MenuOrganizerCtrl', function(){

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
    $q = $injector.get('$q');
  	$rootScopeOn = chai.spy.on($rootScope, '$on');

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

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );
    

    menuOrganizerCtrl = $controller('MenuOrganizerCtrl', {
  		'$state': $state,
      '$rootScope': $rootScope,
      '$ionicHistory': $ionicHistory,
      'userAuthService': userAuthService,
      'notificationService': notificationService,
      '$localStorage': $localStorage
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( menuOrganizerCtrl.userAuth );
      chai.assert.isObject( menuOrganizerCtrl.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( menuOrganizerCtrl.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_events variable', function(){

    it('Should have count_events variable', function() {
      chai.assert.isDefined( menuOrganizerCtrl.count_events );
      chai.assert.isNumber( menuOrganizerCtrl.count_events );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_sponsors variable', function(){

    it('Should have count_sponsors variable', function() {
      chai.assert.isDefined( menuOrganizerCtrl.count_sponsors );
      chai.assert.isNumber( menuOrganizerCtrl.count_sponsors );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to notifications array', function(){

    it('Should have count_sponsors variable', function() {
      chai.assert.isDefined( menuOrganizerCtrl.notifications );
      chai.assert.isArray( menuOrganizerCtrl.notifications );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getEvents success', function(){
    
    it('Should count_events be 3', function() {
    	$rootScope.$digest();
    	chai.assert.equal(menuOrganizerCtrl.count_events, 3);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getSponsors success', function(){
    
    it('Should count_sponsors be 3', function() {
      $rootScope.$digest();
      chai.assert.equal(menuOrganizerCtrl.count_sponsors, 3);
    });

  });

   ////////////////////////////////////////////////////////////
  describe('Tests to getTasks success', function(){
    
    
    it('Should count_tasks be 6', function() {
      $rootScope.$digest();
      console.log(menuOrganizerCtrl.count_tasks);
      chai.assert.equal(menuOrganizerCtrl.count_tasks, 6);
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to $rootScope.$on methods', function(){


    it('Should have called a MenuOrganizerCtrl:count_following and MenuOrganizerCtrl:count_sponsoring', function() {
    	$rootScope.$digest();
      chai.expect($rootScopeOn).to.have.been.called();
    });

    it('Should count_events be 3 before call Menu:count_following', function() {
    	$rootScope.$digest();
    	$rootScope.$broadcast('MenuOrganizerCtrl:count_events');
      chai.assert.equal(menuOrganizerCtrl.count_events, 3);
    });

    it('Should count_sponsors be 3 before call Menu:count_sponsors', function() {
    	$rootScope.$digest();
    	$rootScope.$broadcast('MenuOrganizerCtrl:count_sponsors');
      chai.assert.equal(menuOrganizerCtrl.count_sponsors, 3);
    });

    it('Should count_tasks be 2 before call Menu:count_tasks', function() {
      $rootScope.$digest();
      $rootScope.$broadcast('MenuOrganizerCtrl:count_tasks');
      chai.assert.equal(menuOrganizerCtrl.count_tasks, 6);
    });

  });

   ////////////////////////////////////////////////////////////
  describe('Tests to logout', function(){
  	
    it('Should have createEvent method', function() {
      chai.assert.isDefined( menuOrganizerCtrl.logout );
      chai.assert.isFunction( menuOrganizerCtrl.logout );
    });

    it('Should have called ionicHistory.clearCache', function() {
    	$rootScope.$digest();
    	menuOrganizerCtrl.logout();
    	$rootScope.$digest();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should have called localStorage.$reset', function() {
    	$rootScope.$digest();
    	menuOrganizerCtrl.logout();
    	$rootScope.$digest();
      chai.expect($localStorage.$reset).to.have.been.called();
    });

    it('Should redirect a signin', function() {
    	$rootScope.$digest();
    	menuOrganizerCtrl.logout();
    	$rootScope.$digest();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with('signin');
    });

  });

});