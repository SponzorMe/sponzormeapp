describe("Controller: SponzorListController", function() {

	var sponzorListController, utilsService, mockForm, sponsorshipService;
	var $rootScope, $httpBackend, $localStorage, $ionicHistory, $ionicPopover, $ionicPopup, $ionicScrollDelegate, $scope, $q, $rootScopeBroadcast, $scopeBroadcast;

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
    $ionicPopover = chai.spy.object( $injector.get('$ionicPopover'), ['fromTemplateUrl']);
    $q = $injector.get('$q');
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
    $ionicScrollDelegate = chai.spy.object( function(){
    	this.scrollTop = function(){}
    }, ['scrollTop']);
    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');
    $ionicHistory =  chai.spy.object($injector.get('$ionicHistory'), ['nextViewOptions','clearCache','goBack']);
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $localStorage.userAuth = mockData.userService.login().user;


    sponzorListController = $controller('SponzorListController', {
  		'$localStorage': $localStorage,
	    'sponsorshipService': sponsorshipService,
	    'utilsService': utilsService,
	    '$ionicPopover': $ionicPopover,
	    '$ionicPopup': $ionicPopup,
	    '$ionicScrollDelegate': $ionicScrollDelegate,
	    '$scope': $scope,
	    '$rootScope': $rootScope,
	    '$ionicHistory': $ionicHistory
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to search variable', function(){

    it('Should have search variable', function() {
      chai.assert.isDefined( sponzorListController.search );
      chai.assert.isObject( sponzorListController.search );
      chai.expect( sponzorListController.search ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsors array', function(){

    it('Should have sponsors array', function() {
      chai.assert.isDefined( sponzorListController.sponsors );
      chai.assert.isArray( sponzorListController.sponsors );
      chai.expect( sponzorListController.sponsors ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to events array', function(){

    it('Should have events array', function() {
      chai.assert.isDefined( sponzorListController.events );
      chai.assert.isArray( sponzorListController.events );
      chai.expect( sponzorListController.events ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to results array', function(){

    it('Should have results array', function() {
      chai.assert.isDefined( sponzorListController.results );
      chai.assert.isArray( sponzorListController.results );
      chai.expect( sponzorListController.results ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( sponzorListController.userAuth );
      chai.assert.isObject( sponzorListController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( sponzorListController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to showEmptyState variable', function(){

    it('Should have showEmptyState variable', function() {
      chai.assert.isDefined( sponzorListController.showEmptyState );
      chai.assert.isBoolean( sponzorListController.showEmptyState );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to $ionicPopover.fromTemplateUrl', function(){

  	var dataOrganizer = mockData.sponsorshipService.sponzorshipByOrganizer();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataOrganizer);
  	});

    it('Should be called ionicPopover.fromTemplateUrl method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicPopover.fromTemplateUrl).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getSponsors method success', function(){

  	var dataOrganizer = mockData.sponsorshipService.sponzorshipByOrganizer();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataOrganizer);
  	});

  	it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should have a sponsors array', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( sponzorListController.sponsors.length, dataOrganizer.SponzorsEvents.length)
    });

    it('Should have an events array', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockEvents = [
      	{
      		id: 1,
					title: "event"
      	}
      ];
      chai.expect(sponzorListController.events).to.eql( mockEvents );
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to getSponsors method failed', function(){

  	var dataOrganizer = mockData.failed();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(400, dataOrganizer);
  	});

  	it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should showEmptyState be true', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isTrue(sponzorListController.showEmptyState);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to showFilter method', function(){

  	var dataOrganizer = mockData.sponsorshipService.sponzorshipByOrganizer();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataOrganizer);
  	});

    it('Should have showFilter method', function() {
      chai.assert.isDefined( sponzorListController.showFilter );
      chai.assert.isFunction( sponzorListController.showFilter );
    });

    it('Should have showFilter method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	sponzorListController.showFilter();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to filterByEvent method', function(){

  	var dataOrganizer = mockData.sponsorshipService.sponzorshipByOrganizer();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataOrganizer);
  	});

    it('Should have filterByEvent method', function() {
      chai.assert.isDefined( sponzorListController.filterByEvent );
      chai.assert.isFunction( sponzorListController.filterByEvent );
    });

    it('Should search have an event_id variable', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	sponzorListController.filterByEvent(1);
    	chai.assert.equal( sponzorListController.search.event_id, 1 );
    });

    it('Should be called $ionicScrollDelegate.scrollTop', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	sponzorListController.filterByEvent(1);
    	chai.expect($ionicScrollDelegate.scrollTop).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorAccept method', function(){

    it('Should have sponsorAccept method', function() {
      chai.assert.isDefined( sponzorListController.sponsorAccept );
      chai.assert.isFunction( sponzorListController.sponsorAccept );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorAccept method success', function(){

  	var dataOrganizer = mockData.sponsorshipService.sponzorshipByOrganizer();
  	var dataEdit = mockData.sponsorshipService.editSponzorshipPut();
  	dataEdit.Sponzorship.status = 1;

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataOrganizer);
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(200, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	var mockSponsor = {
    		id: 1
    	};
      sponzorListController.sponsorAccept( mockSponsor );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

   	it('Should be called ionicHistory methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	var mockSponsor = {
    		id: 1
    	};
      sponzorListController.sponsorAccept( mockSponsor );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should status be equal that Sponzorship.status', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	var mockSponsor = {
    		id: 1
    	};
      sponzorListController.sponsorAccept( mockSponsor );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(mockSponsor.status, dataEdit.Sponzorship.status)
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to sponsorAccept method failed', function(){

  	var dataOrganizer = mockData.sponsorshipService.sponzorshipByOrganizer();
  	var dataEdit = mockData.failed();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataOrganizer);
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(400, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	var mockSponsor = {
    		id: 1
    	};
      sponzorListController.sponsorAccept( mockSponsor );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorReject method', function(){

    it('Should have sponsorReject method', function() {
      chai.assert.isDefined( sponzorListController.sponsorReject );
      chai.assert.isFunction( sponzorListController.sponsorReject );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorReject method success', function(){

  	var dataOrganizer = mockData.sponsorshipService.sponzorshipByOrganizer();
  	var dataEdit = mockData.sponsorshipService.editSponzorshipPut();
  	dataEdit.Sponzorship.status = 2;

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataOrganizer);
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(200, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	var mockSponsor = {
    		id: 1
    	};
      sponzorListController.sponsorReject( mockSponsor );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

   	it('Should be called ionicHistory methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	var mockSponsor = {
    		id: 1
    	};
      sponzorListController.sponsorReject( mockSponsor );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should status be equal that Sponzorship.status', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	var mockSponsor = {
    		id: 1
    	};
      sponzorListController.sponsorReject( mockSponsor );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(mockSponsor.status, dataEdit.Sponzorship.status)
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to sponsorReject method failed', function(){

  	var dataOrganizer = mockData.sponsorshipService.sponzorshipByOrganizer();
  	var dataEdit = mockData.failed();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataOrganizer);
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(400, dataEdit);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	var mockSponsor = {
    		id: 1
    	};
      sponzorListController.sponsorReject( mockSponsor );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method', function(){

    it('Should have doRefresh method', function() {
      chai.assert.isDefined( sponzorListController.doRefresh );
      chai.assert.isFunction( sponzorListController.doRefresh );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method success', function(){

    var dataOrganizer = mockData.sponsorshipService.sponzorshipByOrganizer();
    console.log();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(200, dataOrganizer);
  	});

		it('Should have a sponsors array', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponzorListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( sponzorListController.sponsors.length, dataOrganizer.SponzorsEvents.length)
    });

		it('Should have an events array', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponzorListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      var mockEvents = [
      	{
      		id: 1,
					title: "event"
      	}
      ];
      chai.expect(sponzorListController.events).to.eql( mockEvents );
    });

    it('Should be called scroll.refreshComplete broadcast', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponzorListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

    it('Should be called Menu:count_sponsors broadcast', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponzorListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($rootScopeBroadcast).to.have.been.called();
      chai.expect($rootScopeBroadcast).to.have.been.with('Menu:count_sponsors', sponzorListController.sponsors.length);
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method failed', function(){

    var dataOrganizer = mockData.failed();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'sponzorships_organizer/1').respond(400, dataOrganizer);
  	});

  	it('Should showEmptyState be true', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponzorListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isTrue(sponzorListController.showEmptyState);
    });

  });

});
