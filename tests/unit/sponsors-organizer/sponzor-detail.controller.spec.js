describe("Controller: SponsorshipDetailController", function() {

	var sponsorshipDetailController, utilsService, mockForm, sponsorshipService;
	var $rootScope, $httpBackend, $localStorage, $ionicHistory,  $ionicPopup, $q, $stateParams;

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
    $httpBackend.whenGET('app/sponsors-organizer/events-popover.html').respond(200, '');

    //Dependences
    $localStorage = $injector.get('$localStorage');
    sponsorshipService= $injector.get('sponsorshipService');
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $q = $injector.get('$q');
    $stateParams = $injector.get('$stateParams');
    $ionicPopup = {
      throwsError: false,
      confirm: function () {
        var defer = $q.defer();
        if (this.throwsError) {
          defer.reject(false);
        } else {
          defer.resolve(true);
        }
        return defer.promise;
      }
    };
    $ionicHistory =  chai.spy.object($injector.get('$ionicHistory'), ['nextViewOptions','clearCache','goBack']);
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $localStorage.userAuth = mockData.userService.login().user;

    $stateParams.id = 1;
    sponsorshipDetailController = $controller('SponsorshipDetailController', {
  		'$localStorage': $localStorage,
	    'sponsorshipService': sponsorshipService,
	    'utilsService': utilsService,
	    '$ionicPopup': $ionicPopup,
	    '$stateParams': $stateParams,
	    '$ionicHistory': $ionicHistory
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to sponsorship variable', function(){

    it('Should have sponsorship variable', function() {
      chai.assert.isDefined( sponsorshipDetailController.sponsorship );
      chai.assert.isObject( sponsorshipDetailController.sponsorship );
      chai.expect( sponsorshipDetailController.sponsorship ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( sponsorshipDetailController.userAuth );
      chai.assert.isObject( sponsorshipDetailController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( sponsorshipDetailController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to showEmptyState variable', function(){

    it('Should have showEmptyState variable', function() {
      chai.assert.isDefined( sponsorshipDetailController.showEmptyState );
      chai.assert.isFalse( sponsorshipDetailController.showEmptyState );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getSponsorship method success', function(){

  	var dataSponzorship = mockData.sponsorshipService.getSponzorship();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'sponzorships/1').respond(200, dataSponzorship);
  	});

  	it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should have a sponsorship', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isObject( sponsorshipDetailController.sponsorship );
      chai.expect( sponsorshipDetailController.sponsorship ).to.have.all.keys([
        'event',
        'organizer',
        'perk',
        'sponzor',
        'tasks',
        'id'
      ]);
      chai.assert.isObject( sponsorshipDetailController.sponsorship.event );
      chai.assert.isObject( sponsorshipDetailController.sponsorship.organizer );
      chai.assert.isObject( sponsorshipDetailController.sponsorship.perk );
      chai.assert.isObject( sponsorshipDetailController.sponsorship.sponzor );
      chai.assert.isArray( sponsorshipDetailController.sponsorship.tasks );
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to getSponsorship method failed', function(){

  	var dataSponzorship = mockData.failed();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'sponzorships/1').respond(400, dataSponzorship);
  	});

  	it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorAccept method', function(){

    it('Should have sponsorAccept method', function() {
      chai.assert.isDefined( sponsorshipDetailController.sponsorAccept );
      chai.assert.isFunction( sponsorshipDetailController.sponsorAccept );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorAccept method success', function(){

  	var dataSponzorship = mockData.sponsorshipService.getSponzorship();
  	var dataEdit = mockData.sponsorshipService.editSponzorshipPut();
  	dataEdit.Sponzorship.status = 1;

  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'sponzorships/1').respond(200, dataSponzorship);
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(200, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipDetailController.sponsorAccept();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

   	it('Should be called ionicHistory methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipDetailController.sponsorAccept();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should status be equal that Sponzorship.status', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipDetailController.sponsorAccept();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(1, dataEdit.Sponzorship.status)
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to sponsorAccept method failed', function(){

  	var dataSponzorship = mockData.sponsorshipService.getSponzorship();
  	var dataEdit = mockData.failed();

  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'sponzorships/1').respond(200, dataSponzorship);
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(400, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipDetailController.sponsorAccept();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorReject method', function(){

    it('Should have sponsorReject method', function() {
      chai.assert.isDefined( sponsorshipDetailController.sponsorReject );
      chai.assert.isFunction( sponsorshipDetailController.sponsorReject );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorReject method success', function(){

  	var dataSponzorship = mockData.sponsorshipService.getSponzorship();
  	var dataEdit = mockData.sponsorshipService.editSponzorshipPut();
  	dataEdit.Sponzorship.status = 2;

  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'sponzorships/1').respond(200, dataSponzorship);
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(200, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipDetailController.sponsorReject();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

   	it('Should be called ionicHistory methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipDetailController.sponsorReject();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should status be equal that Sponzorship.status', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipDetailController.sponsorReject();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(2, dataEdit.Sponzorship.status)
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to sponsorReject method failed', function(){

  	var dataSponzorship = mockData.sponsorshipService.getSponzorship();
  	var dataEdit = mockData.failed();

  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'sponzorships/1').respond(200, dataSponzorship);
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(400, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipDetailController.sponsorReject();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

});