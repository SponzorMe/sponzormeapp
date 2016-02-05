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
  	$rootScopeOn = chai.spy.on($rootScope, '$on');
  	$q = $injector.get('$q');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('app/users/login.html').respond(200, {});

    //Dependences
    sponsorshipService = $injector.get('sponsorshipService');
    perkTaskService = $injector.get('perkTaskService');
  	userService = $injector.get('userService');
  	$localStorage = $injector.get('$localStorage');
  	$localStorage = chai.spy.object($localStorage, ['$reset']);
  	$state = $injector.get('$state');
  	$state = chai.spy.object($state, ['go']);
  	
    $ionicHistory = $injector.get('$ionicHistory');
    $ionicHistory = chai.spy.object($ionicHistory, ['clearCache', 'nextViewOptions', 'goBack']);

    $localStorage.userAuth = mockData.userService.login().user;

    menuOrganizerCtrl = $controller('MenuOrganizerCtrl', {
  		'$state': $state,
      '$localStorage': $localStorage,
      '$rootScope': $rootScope,
      'userService': userService,
      'sponsorshipService': sponsorshipService,
      'perkTaskService': perkTaskService,
      '$ionicHistory': $ionicHistory
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

    it('Should count_events be 0', function() {
      chai.assert.equal( menuOrganizerCtrl.count_events, 0 );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_sponsors variable', function(){

    it('Should have count_sponsors variable', function() {
      chai.assert.isDefined( menuOrganizerCtrl.count_sponsors );
      chai.assert.isNumber( menuOrganizerCtrl.count_sponsors );
    });

    it('Should count_sponsors be 0', function() {
      chai.assert.equal( menuOrganizerCtrl.count_sponsors, 0 );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to $rootScope.$on methods', function(){

    var dataEvents = mockData.userService.getUser();
    var dataSponsors = mockData.sponsorshipService.sponzorshipByOrganizer();
    var dataTasks = mockData.perkTaskService.getPerkTaskByOrganizer();

  	beforeEach(function() {
      $httpBackend.whenGET( URL_REST + 'users/1').respond(200, dataEvents);
      $httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataSponsors);
      $httpBackend.whenGET( URL_REST + 'perk_tasks_organizer/1').respond(200, dataTasks);
    });

    it('Should have called a Menu:count_following and Menu:count_sponsoring', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	
      chai.expect($rootScopeOn).to.have.been.called();
    });

    it('Should count_events be 3 before call Menu:count_following', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	$rootScope.$broadcast('Menu:count_events', 3);
      chai.assert.equal(menuOrganizerCtrl.count_events, 3);
    });

    it('Should count_sponsors be 31 before call Menu:count_sponsors', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	$rootScope.$broadcast('Menu:count_sponsors', 31);
      chai.assert.equal(menuOrganizerCtrl.count_sponsors, 31);
    });

    it('Should count_tasks be 1 before call Menu:count_tasks', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      $rootScope.$broadcast('Menu:count_tasks', 1);
      chai.assert.equal(menuOrganizerCtrl.count_tasks, 1);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getEvents success', function(){

  	var dataEvents = mockData.userService.getUser();
    var dataSponsors = mockData.sponsorshipService.sponzorshipByOrganizer();
    var dataTasks = mockData.perkTaskService.getPerkTaskByOrganizer();

    beforeEach(function() {
      $httpBackend.whenGET( URL_REST + 'users/1').respond(200, dataEvents);
      $httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataSponsors);
      $httpBackend.whenGET( URL_REST + 'perk_tasks_organizer/1').respond(200, dataTasks);
    });
  	
    it('Should count_events be 1', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	chai.assert.equal(menuOrganizerCtrl.count_events, 1);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getSponsors success', function(){

    var dataEvents = mockData.userService.getUser();
    var dataSponsors = mockData.sponsorshipService.sponzorshipByOrganizer();
    var dataTasks = mockData.perkTaskService.getPerkTaskByOrganizer();

    beforeEach(function() {
      $httpBackend.whenGET( URL_REST + 'users/1').respond(200, dataEvents);
      $httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataSponsors);
      $httpBackend.whenGET( URL_REST + 'perk_tasks_organizer/1').respond(200, dataTasks);
    });
    
    it('Should count_sponsors be 2', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(menuOrganizerCtrl.count_sponsors, 2);
    });

  });

   ////////////////////////////////////////////////////////////
  describe('Tests to getTasks success', function(){

    var dataEvents = mockData.userService.getUser();
    var dataSponsors = mockData.sponsorshipService.sponzorshipByOrganizer();
    var dataTasks = mockData.perkTaskService.getPerkTaskByOrganizer();

    beforeEach(function() {
      $httpBackend.whenGET( URL_REST + 'users/1').respond(200, dataEvents);
      $httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataSponsors);
      $httpBackend.whenGET( URL_REST + 'perk_tasks_organizer/1').respond(200, dataTasks);
    });
    
    it('Should count_tasks be 1', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(menuOrganizerCtrl.count_tasks, 1);
    });

  });

   ////////////////////////////////////////////////////////////
  describe('Tests to logout', function(){

  	var dataEvents = mockData.userService.getUser();
    var dataSponsors = mockData.sponsorshipService.sponzorshipByOrganizer();
    var dataTasks = mockData.perkTaskService.getPerkTaskByOrganizer();

    beforeEach(function() {
      $httpBackend.whenGET( URL_REST + 'users/1').respond(200, dataEvents);
      $httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataSponsors);
      $httpBackend.whenGET( URL_REST + 'perk_tasks_organizer/1').respond(200, dataTasks);
    });
  	
    it('Should have createEvent method', function() {
      chai.assert.isDefined( menuOrganizerCtrl.logout );
      chai.assert.isFunction( menuOrganizerCtrl.logout );
    });

    it('Should have called ionicHistory.clearCache', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	menuOrganizerCtrl.logout();
    	$rootScope.$digest();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should have called localStorage.$reset', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	menuOrganizerCtrl.logout();
    	$rootScope.$digest();
      chai.expect($localStorage.$reset).to.have.been.called();
    });

    it('Should redirect a signin', function() {
    	$rootScope.$digest();
    	$httpBackend.flush();
    	menuOrganizerCtrl.logout();
    	$rootScope.$digest();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with('signin');
    });

  });

});