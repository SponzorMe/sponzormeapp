describe('Controller: HomeOrganizerController', function(){

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

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('app/dashboard-sponzor/menu.html').respond(200, '');
    $httpBackend.whenGET('app/dashboard-sponzor/home.html').respond(200, '');

    //Dependences
  	$scope = $rootScope.$new();

    sponsorshipService = $injector.get('sponsorshipService');

    utilsService = $injector.get('utilsService');
    utilsService = chai.spy.object( utilsService , ['showLoad', 'hideLoad','alert', 'resetForm','trim', 'confirm']);

    userService = $injector.get('userService');

    $localStorage = $injector.get('$localStorage');
  	
    $localStorage.userAuth = mockData.userService.login().user;

    homeOrganizerController = $controller('HomeOrganizerController', {
      '$localStorage': $localStorage,
      'userService': userService,
      'utilsService': utilsService,
      'sponsorshipService': sponsorshipService,
      '$q': $q
  	});

  }));

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( homeOrganizerController.userAuth );
      chai.assert.isObject( homeOrganizerController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( homeOrganizerController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_events variable', function(){

    it('Should have count_events variable', function() {
      chai.assert.isDefined( homeOrganizerController.count_events );
      chai.assert.isNumber( homeOrganizerController.count_events );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_comunity variable', function(){

    it('Should have count_comunity variable', function() {
      chai.assert.isDefined( homeOrganizerController.count_comunity );
      chai.assert.isNumber( homeOrganizerController.count_comunity );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_sponsors variable', function(){

    it('Should have count_sponsors variable', function() {
      chai.assert.isDefined( homeOrganizerController.count_sponsors );
      chai.assert.isNumber( homeOrganizerController.count_sponsors );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to activate()', function(){

    it('Should count_events be equal that 1', function() {
      $rootScope.$digest();
      chai.assert.equal( homeOrganizerController.count_events, 1);
    });
    
    it('Should count_sponsors be equal that 2', function() {
      $rootScope.$digest();
      chai.assert.equal( homeOrganizerController.count_sponsors, 2);
    });
    
    it('Should count_comunity be equal that 0', function() {
      $rootScope.$digest();
      chai.assert.equal( homeOrganizerController.count_comunity, 0);
    });

  });

});