describe("Controller: SponsorshipOrganizerDetailController", function() {

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
    $q = $injector.get('$q');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('app/sponsors-organizer/events-popover.html').respond(200, '');

    //Dependences
    $localStorage = $injector.get('$localStorage');
    sponsorshipService= $injector.get('sponsorshipService');
    
    utilsService = $injector.get('utilsService');
    utilsService.confirm = function(){
      var defer = $q.defer();
        if (false) {
          defer.reject(false);
        } else {
          defer.resolve(true);
        }
        return defer.promise;
    }
    utilsService = chai.spy.object(utilsService, ['showLoad', 'hideLoad','alert', 'resetForm','trim', 'confirm']);
    
    $stateParams = $injector.get('$stateParams');
    $ionicHistory =  chai.spy.object($injector.get('$ionicHistory'), ['nextViewOptions','clearCache','goBack']);
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $localStorage.userAuth = mockData.userService.login().user;

    $stateParams.id = "1";
    sponsorshipOrganizerDetailController = $controller('SponsorshipOrganizerDetailController', {
  		'$localStorage': $localStorage,
	    'sponsorshipService': sponsorshipService,
	    'utilsService': utilsService,
	    '$stateParams': $stateParams,
	    '$ionicHistory': $ionicHistory
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to sponzorship variable', function(){

    it('Should have sponzorship variable', function() {
      chai.assert.isDefined( sponsorshipOrganizerDetailController.sponzorship );
      chai.assert.isObject( sponsorshipOrganizerDetailController.sponzorship );
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
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(200, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorAccept();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

   	it('Should be called ionicHistory methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorAccept();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should status be equal that Sponzorship.status', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorAccept();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(1, dataEdit.Sponzorship.status)
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to sponsorAccept method failed', function(){

  	var dataEdit = mockData.failed();

  	beforeEach(function() {
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(400, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorAccept();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
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
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(200, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorReject();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

   	it('Should be called ionicHistory methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorReject();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should status be equal that Sponzorship.status', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorReject();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(2, dataEdit.Sponzorship.status)
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to sponsorReject method failed', function(){

  	var dataEdit = mockData.failed();

  	beforeEach(function() {
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(400, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipOrganizerDetailController.sponsorReject();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

});