describe("Controller: SponsorshipsListCtrl", function() {

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
    
    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');
    
    $q = $injector.get('$q');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});

    //Dependences
    //Angular
    $ionicScrollDelegate = chai.spy.object( function(){
    	this.scrollTop = function(){}
    }, ['scrollTop']);
    //Services
    sponsorshipService = $injector.get('sponsorshipService');
    userService = $injector.get('userService');
    utilsService = $injector.get('utilsService');
    utilsService.confirm = function(){
      var defer = $q.defer();
      defer.resolve(true);
      return defer.promise;
    }
    notificationService = $injector.get('notificationService');
    userAuthService = $injector.get('userAuthService');
    
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );

    sponsorshipsListController = $controller('SponsorshipsListCtrl', {
  		'$scope': $scope,
      '$rootScope': $rootScope,
      '$ionicScrollDelegate': $ionicScrollDelegate,
      'sponsorshipService': sponsorshipService,
      'userService': userService,
      'utilsService': utilsService,
      'notificationService': notificationService,
      'userAuthService': userAuthService
  	});

  }));

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorships array', function(){

    it('Should have sponsorships array', function() {
      chai.assert.isDefined( sponsorshipsListController.sponsorships );
      chai.assert.isArray( sponsorshipsListController.sponsorships );
    });

  });

  

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( sponsorshipsListController.userAuth );
      chai.assert.isObject( sponsorshipsListController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( sponsorshipsListController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to showEmptyState variable', function(){

    it('Should have showEmptyState variable', function() {
      chai.assert.isDefined( sponsorshipsListController.showEmptyState );
      chai.assert.isBoolean( sponsorshipsListController.showEmptyState );
    });

  });

  

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorAccept method', function(){

    it('Should have sponsorAccept method', function() {
      chai.assert.isDefined( sponsorshipsListController.sponsorAccept );
      chai.assert.isFunction( sponsorshipsListController.sponsorAccept );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorAccept method success', function(){

  	
  	var dataEdit = mockData.sponsorshipService.editSponzorshipPut();
  	dataEdit.Sponzorship.status = 1;

  	beforeEach(function() {
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(200, dataEdit);
  	});

    it('Should status be equal that Sponzorship.status', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	var mockSponsor = {
    		id: 1,
        event: {
          title: "Evento"
        }
    	};
      sponsorshipsListController.sponsorAccept( mockSponsor );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(mockSponsor.status, dataEdit.Sponzorship.status)
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to sponsorAccept method failed', function(){

  	var dataEdit = mockData.failed();

  	beforeEach(function() {
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(400, dataEdit);
  	});

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorReject method', function(){

    it('Should have sponsorReject method', function() {
      chai.assert.isDefined( sponsorshipsListController.sponsorReject );
      chai.assert.isFunction( sponsorshipsListController.sponsorReject );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsorReject method success', function(){

  	var dataEdit = mockData.sponsorshipService.editSponzorshipPut();
  	dataEdit.Sponzorship.status = 2;

  	beforeEach(function() {
  		$httpBackend.whenPUT( URL_REST + 'sponzorships/1').respond(200, dataEdit);
  	});

    it('Should status be equal that Sponzorship.status', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	var mockSponsor = {
    		id: 1,
        event: {
          title: "Evento"
        }
    	};
      sponsorshipsListController.sponsorReject( mockSponsor );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(mockSponsor.status, dataEdit.Sponzorship.status)
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
    	var mockSponsor = {
    		id: 1
    	};
      sponsorshipsListController.sponsorReject( mockSponsor );
      $rootScope.$digest();
      $httpBackend.flush();
      //chai.expect(utilsService.showLoad).to.have.been.called();
      //chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method', function(){

    it('Should have doRefresh method', function() {
      chai.assert.isDefined( sponsorshipsListController.doRefresh );
      chai.assert.isFunction( sponsorshipsListController.doRefresh );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method success', function(){

    var dataUser = mockData.userService.home("0");
    data.data.user.type = "0";

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'home/' + $localStorage.userAuth.id ).respond(200, dataOrganizer);
  	});

		it('Should have a sponsors array', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipsListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( sponsorshipsListController.sponsorships.length, dataOrganizer.data.user.sponzorships_like_organizer.length)
    });

    it('Should be called scroll.refreshComplete broadcast', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipsListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

    it('Should be called Menu:count_sponsors broadcast', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipsListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($rootScopeBroadcast).to.have.been.called();
      chai.expect($rootScopeBroadcast).to.have.been.with('Menu:count_sponsors', dataOrganizer.data.user.sponzorships_like_organizer.length);
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method failed', function(){

    var dataOrganizer = mockData.failed();

  	beforeEach(function() {
			$httpBackend.whenGET( URL_REST + 'home/'  + $localStorage.userAuth.id ).respond(400, dataOrganizer);
  	});

  	it('Should showEmptyState be true', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipsListController.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isTrue(sponsorshipsListController.showEmptyState);
    });

  });

});
