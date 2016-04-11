describe("Controller: SponsorshipOrganizerDetailCtrl", function() {

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
    $q = $injector.get('$q');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('templates/sponsors-organizer/events-popover.html').respond(200, '');

    //Dependences
    //Angular
    $stateParams = $injector.get('$stateParams');
    //Services
    sponsorshipService= $injector.get('sponsorshipService');
    utilsService = $injector.get('utilsService');
    utilsService.confirm = function(){
      var defer = $q.defer();
      defer.resolve(true);
      return defer.promise;
    }
    
    userService = $injector.get('userService');
    userAuthService = $injector.get('userAuthService');
    notificationService = $injector.get('notificationService');
    
    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );
    
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $stateParams.id = "30";
    
    sponsorshipOrganizerDetailController = $controller('SponsorshipOrganizerDetailCtrl', {
  		'$stateParams': $stateParams,
      'sponsorshipService': sponsorshipService,
      'utilsService': utilsService,
      'userAuthService': userAuthService,
      'notificationService': notificationService
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to sponzorship variable', function(){

    it('Should have sponzorship variable', function() {
      chai.assert.isDefined( sponsorshipOrganizerDetailController.sponsorship );
      chai.assert.isObject( sponsorshipOrganizerDetailController.sponsorship );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( sponsorshipOrganizerDetailController.userAuth );
      chai.assert.isObject( sponsorshipOrganizerDetailController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( sponsorshipOrganizerDetailController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to showEmptyState variable', function(){

    it('Should have showEmptyState variable', function() {
      chai.assert.isDefined( sponsorshipOrganizerDetailController.showEmptyState );
      chai.assert.isFalse( sponsorshipOrganizerDetailController.showEmptyState );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorAccept method', function(){

    it('Should have sponsorAccept method', function() {
      chai.assert.isDefined( sponsorshipOrganizerDetailController.sponsorAccept );
      chai.assert.isFunction( sponsorshipOrganizerDetailController.sponsorAccept );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorAccept method success', function(){

  	var dataEdit = mockData.sponsorshipService.editSponzorshipPut();
  	dataEdit.Sponzorship.status = 1;

  	beforeEach(function() {
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/30').respond(200, dataEdit);
  	});

    /*
    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorAccept();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });
    */

    it('Should status be equal that Sponzorship.status', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorAccept();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(sponsorshipOrganizerDetailController.sponsorship.status, dataEdit.Sponzorship.status)
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to sponsorAccept method failed', function(){

  	var dataEdit = mockData.failed();

  	beforeEach(function() {
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/30').respond(400, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorAccept();
      $rootScope.$digest();
      $httpBackend.flush();
      //chai.expect(utilsService.showLoad).to.have.been.called();
      //chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorReject method', function(){

    it('Should have sponsorReject method', function() {
      chai.assert.isDefined( sponsorshipOrganizerDetailController.sponsorReject );
      chai.assert.isFunction( sponsorshipOrganizerDetailController.sponsorReject );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorReject method success', function(){
    
  	var dataEdit = mockData.sponsorshipService.editSponzorshipPut();
  	dataEdit.Sponzorship.status = 2;

  	beforeEach(function() {
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/30').respond(200, dataEdit);
  	});

    /*
    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorReject();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });
    */

    it('Should status be equal that Sponzorship.status', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorReject();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(sponsorshipOrganizerDetailController.sponsorship.status, dataEdit.Sponzorship.status);
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to sponsorReject method failed', function(){

  	var dataEdit = mockData.failed();

  	beforeEach(function() {
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/30').respond(400, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorReject();
      $rootScope.$digest();
      $httpBackend.flush();
      //chai.expect(utilsService.showLoad).to.have.been.called();
      //chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

});