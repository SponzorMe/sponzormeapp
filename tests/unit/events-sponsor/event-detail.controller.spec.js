describe("Controller: EventDetailSponzorController", function() {

	var eventDetailSponzorController, utilsService, eventService, sponsorshipService;
	var $rootScope, $httpBackend, $localStorage, $ionicHistory, $q, $stateParams, $ionicModal;

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
    $httpBackend.whenGET('app/events-sponsor/sponsor-it-modal.html').respond(200, '<ion-modal-view></<ion-modal-view>');

    //Dependences
    $localStorage = $injector.get('$localStorage');
    sponsorshipService = $injector.get('sponsorshipService');
    eventService = $injector.get('eventService');
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $q = $injector.get('$q');
    $stateParams = $injector.get('$stateParams');
    $ionicModal = $injector.get('$ionicModal');
    $translate = $injector.get('$translate');
    $ionicHistory = chai.spy.object($injector.get('$ionicHistory'), ['clearCache']);

    $localStorage.userAuth = mockData.userService.login().user;

    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');

    $cordovaToastMock = {
      throwsError: false,
      showShortBottom: function (message) {
        var defer = $q.defer();
        if (this.throwsError) {
          defer.reject('There was an error showing the toast.');
        } else {
          defer.resolve();
        }
        return defer.promise;
      },
    };

    $stateParams.idEvent = 1;

    eventDetailSponzorController = $controller('EventDetailSponzorController', {
  		'$scope': $scope,
	    'eventService': eventService,
	    'utilsService': utilsService,
	    '$stateParams': $stateParams,
	    'sponsorshipService': sponsorshipService,
	    '$localStorage': $localStorage,
	    '$ionicModal': $ionicModal,
	    '$ionicHistory': $ionicHistory,
	    '$cordovaToast': $cordovaToastMock,
	    '$translate': $translate
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to event object', function(){

    it('Should have event object', function() {
      chai.assert.isDefined( eventDetailSponzorController.event );
      chai.assert.isObject( eventDetailSponzorController.event );
      chai.expect( eventDetailSponzorController.event ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( eventDetailSponzorController.userAuth );
      chai.assert.isObject( eventDetailSponzorController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( eventDetailSponzorController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getEvent method success', function(){

		var dataEvent = mockData.eventService.getEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  	});

  	it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should have an event', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isObject( eventDetailSponzorController.event );
      chai.assert.isObject( eventDetailSponzorController.event.category );
      chai.assert.isObject( eventDetailSponzorController.event.type );
      chai.assert.isObject( eventDetailSponzorController.event.user_organizer );
      chai.assert.isArray( eventDetailSponzorController.event.sponzorships );
      chai.assert.instanceOf( eventDetailSponzorController.event.starts, Date );
      chai.assert.instanceOf( eventDetailSponzorController.event.ends, Date );
    });

    it('Should have an perks array', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( eventDetailSponzorController.event.perks.length, dataEvent.event.perks.length );
    	for (var i = 0; i < eventDetailSponzorController.event.perks.length; i++) {
    		chai.assert.isArray(eventDetailSponzorController.event.perks[i].tasks);
    		chai.assert.isArray(eventDetailSponzorController.event.perks[i].sponzorship);
    	};
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to getEvent method failed', function(){

		var dataEvent = mockData.failed();
 
  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(400, dataEvent);
  	});

  	it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to openModalSponsorIt method', function(){

  	var dataEvent = mockData.eventService.getEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  	});

    it('Should have openModalSponsorIt method', function() {
      chai.assert.isDefined( eventDetailSponzorController.openModalSponsorIt );
      chai.assert.isFunction( eventDetailSponzorController.openModalSponsorIt );
    });

    it('Should be called modal.show method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      eventDetailSponzorController.openModalSponsorIt();
      chai.assert.isTrue(eventDetailSponzorController.modalSponsorIt._isShown);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to closeModalSponsorIt method', function(){

  	var dataEvent = mockData.eventService.getEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  	});

    it('Should have closeModalSponsorIt method', function() {
      chai.assert.isDefined( eventDetailSponzorController.closeModalSponsorIt );
      chai.assert.isFunction( eventDetailSponzorController.closeModalSponsorIt );
    });

    it('Should be called modal.show method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      eventDetailSponzorController.closeModalSponsorIt();
      chai.assert.isFalse(eventDetailSponzorController.modalSponsorIt._isShown);
    });

    it('Should newSponsorIt be empty', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	eventDetailSponzorController.closeModalSponsorIt();
      chai.assert.isObject( eventDetailSponzorController.newSponsorIt );
      chai.expect( eventDetailSponzorController.newSponsorIt ).to.be.empty;
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to createSponsorIt method', function(){

  	var dataEvent = mockData.eventService.getEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  	});

    it('Should have createSponsorIt method', function() {
      chai.assert.isDefined( eventDetailSponzorController.createSponsorIt );
      chai.assert.isFunction( eventDetailSponzorController.createSponsorIt );
    });

    it('Should be called modal.show method', function() {
    	var perkMock = {
    		id: 1
    	};
    	$rootScope.$digest();
      $httpBackend.flush();
      eventDetailSponzorController.createSponsorIt( perkMock );
      chai.assert.isTrue(eventDetailSponzorController.modalSponsorIt._isShown);
    });

    it('Should newSponsorIt.perk be equal that perkMock', function() {
    	var perkMock = {
    		id: 1
    	};
    	$rootScope.$digest();
      $httpBackend.flush();
      eventDetailSponzorController.createSponsorIt( perkMock );
      chai.expect(  eventDetailSponzorController.newSponsorIt.perk ).to.eql( perkMock );
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to submitSponsorIt method', function(){

    it('Should have submitSponsorIt method', function() {
      chai.assert.isDefined( eventDetailSponzorController.submitSponsorIt );
      chai.assert.isFunction( eventDetailSponzorController.submitSponsorIt );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to submitSponsorIt method success', function(){


  	var dataEvent = mockData.eventService.getEvent();
  	var dataSponzorship = mockData.sponsorshipService.createSponzorship();

 
  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenPOST( URL_REST + 'sponzorships').respond(200, dataSponzorship);
  	});

    it('Should be called modal.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      eventDetailSponzorController.newSponsorIt.perk = {
      	id: 1
      };
      eventDetailSponzorController.newSponsorIt.cause = "Yolo";
    	eventDetailSponzorController.submitSponsorIt();
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse(eventDetailSponzorController.modalSponsorIt._isShown);
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to submitSponsorIt method failed', function(){


  	var dataEvent = mockData.eventService.getEvent();
  	var dataSponzorship = mockData.failed();

 
  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenPOST( URL_REST + 'sponzorships').respond(400, dataSponzorship);
  	});

    it('Should be called modal.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      eventDetailSponzorController.newSponsorIt.perk = {
      	id: 1
      };
      eventDetailSponzorController.newSponsorIt.cause = "Yolo";
    	eventDetailSponzorController.submitSponsorIt();
    	$rootScope.$digest();
      $httpBackend.flush();
      
      chai.assert.isFalse(eventDetailSponzorController.modalSponsorIt._isShown);
    });

  });

});