describe('Controller: HomeOrganizerController', function(){

	var homeOrganizerController, sponsorshipService, userService;
	var $rootScope, $q, $httpBackend, $scope, $localStorage;

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

    it('Should count_events be 0', function() {
      chai.assert.equal( homeOrganizerController.count_events, 0 )
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_comunity variable', function(){

    it('Should have count_comunity variable', function() {
      chai.assert.isDefined( homeOrganizerController.count_comunity );
      chai.assert.isNumber( homeOrganizerController.count_comunity );
    });

    it('Should count_comunity be 0', function() {
      chai.assert.equal( homeOrganizerController.count_comunity, 0 )
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to count_sponsors variable', function(){

    it('Should have count_sponsors variable', function() {
      chai.assert.isDefined( homeOrganizerController.count_sponsors );
      chai.assert.isNumber( homeOrganizerController.count_sponsors );
    });

    it('Should count_sponsors be 0', function() {
      chai.assert.equal( homeOrganizerController.count_sponsors, 0 )
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getData success', function(){

    var dataEvents = mockData.userService.getUser();
    var dataSponsors = mockData.sponsorshipService.sponzorshipByOrganizer();

    beforeEach(function() {
      $httpBackend.whenGET('https://apilocal.sponzor.me/users/1').respond(200, dataEvents);
      $httpBackend.whenGET('https://apilocal.sponzor.me/sponzorships_organizer/1').respond(200, dataSponsors);
    });

    it('Should be called utilsService methods', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should count_events be 1', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( homeOrganizerController.count_events, 1 );
    });

    it('Should count_comunity be 0', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( homeOrganizerController.count_comunity, 0 );
    });

    it('Should count_sponsors be 2', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( homeOrganizerController.count_sponsors, dataSponsors.SponzorsEvents.length );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getData failed by getUser', function(){

    var dataEvents = mockData.failed();
    var dataSponsors = mockData.sponsorshipService.sponzorshipByOrganizer();

    beforeEach(function() {
      $httpBackend.whenGET('https://apilocal.sponzor.me/users/1').respond(400, dataEvents);
      $httpBackend.whenGET('https://apilocal.sponzor.me/sponzorships_organizer/1').respond(200, dataSponsors);
    });

    it('Should be called utilsService methods', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getData failed by sponzorshipByOrganizer', function(){

    var dataEvents = mockData.userService.getUser();
    var dataSponsors = mockData.failed();

    beforeEach(function() {
      $httpBackend.whenGET('https://apilocal.sponzor.me/users/1').respond(200, dataEvents);
      $httpBackend.whenGET('https://apilocal.sponzor.me/sponzorships_organizer/1').respond(400, dataSponsors);
    });

    it('Should be called utilsService methods', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

});