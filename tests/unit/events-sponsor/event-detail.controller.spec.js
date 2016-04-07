describe("Controller: EventDetailSponsorCtrl", function() {

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
    $httpBackend.whenGET('templates/events-sponsor/sponsor-it-modal.html').respond(200, '');

    //Dependences
    //Angular
    $stateParams = $injector.get('$stateParams');
    $translate = $injector.get('$translate');
    //ionic
    $ionicModal = $injector.get('$ionicModal');
    $ionicHistory = chai.spy.object($injector.get('$ionicHistory'), ['clearCache']);
    //Cordova
    $cordovaToast = {
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
    //Services
    eventService = $injector.get('eventService');
    utilsService = $injector.get('utilsService');
    sponsorshipService = $injector.get('sponsorshipService');
    notificationService = $injector.get('notificationService');
    userAuthService = $injector.get('userAuthService');
    utilsService = $injector.get('utilsService');
    userService = $injector.get('userService');

    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );
    
    $stateParams.id = "1";

    eventDetailSponzorController = $controller('EventDetailSponsorCtrl', {
  		'$scope': $scope,
      '$stateParams': $stateParams,
      '$rootScope': $rootScope,
      '$translate': $translate,
      '$ionicModal': $ionicModal,
      '$ionicHistory': $ionicHistory,
      '$cordovaToast': $cordovaToast,
      'eventService': eventService,
      'utilsService': utilsService,
      'sponsorshipService': sponsorshipService,
      'notificationService': notificationService,
      'userAuthService': userAuthService
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to event object', function(){

    it('Should have event object', function() {
      chai.assert.isDefined( eventDetailSponzorController.event );
      chai.assert.isObject( eventDetailSponzorController.event );
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


    it('Should have an event', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isObject( eventDetailSponzorController.event );
      chai.assert.isObject( eventDetailSponzorController.event.category );
      chai.assert.isObject( eventDetailSponzorController.event.type );
      chai.assert.isObject( eventDetailSponzorController.event.user_organizer );
      chai.assert.isArray( eventDetailSponzorController.event.sponzorship );
      chai.assert.instanceOf( eventDetailSponzorController.event.starts, Date );
      chai.assert.instanceOf( eventDetailSponzorController.event.ends, Date );
    });

    it('Should have an perks array', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( eventDetailSponzorController.event.perks.length, $localStorage.userAuth.events[0].perks.length );
    	for (var i = 0; i < eventDetailSponzorController.event.perks.length; i++) {
    		chai.assert.isArray(eventDetailSponzorController.event.perks[i].tasks);
    		chai.assert.isArray(eventDetailSponzorController.event.perks[i].sponzorship);
    	};
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to openModalSponsorIt method', function(){

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
    
  	var dataSponzorship = mockData.sponsorshipService.createSponzorship();

 
  	beforeEach(function() {
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
    
  	var dataSponzorship = mockData.failed();
 
  	beforeEach(function() {
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