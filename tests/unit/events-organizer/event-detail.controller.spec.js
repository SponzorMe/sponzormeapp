describe("Controller: EventDetailOrganizerController", function() {

	var eventDetailOrganizerController, utilsService, eventService, sponsorshipService, BackendVariables;
	var $rootScope, $scope, $httpBackend, $localStorage, $ionicHistory, $q, $stateParams, $state, $ionicPopup, $ionicActionSheet, $cordovaSocialSharing, $cordovaCalendar, $ionicSideMenuDelegate, $translate, $cordovaToast;


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
  	$httpBackend = $injector.get('$httpBackend');

    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('app/events-sponsor/sponsor-it-modal.html').respond(200, '');
    $httpBackend.whenGET('app/events-organizer/options-sponsorship.html').respond(200, '');
    $httpBackend.whenGET('app/dashboard-organizer/menu.html').respond(200, '');
    $httpBackend.whenGET('app/events-organizer/edit-event.html').respond(200, '');

    //Dependences
    $localStorage = $injector.get('$localStorage');
    sponsorshipService = $injector.get('sponsorshipService');
    eventService = $injector.get('eventService');
    BackendVariables = $injector.get('BackendVariables');
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $q = $injector.get('$q');
    $stateParams = $injector.get('$stateParams');
    $state = chai.spy.object($injector.get('$state'), ['go']);
    $ionicPopup = $injector.get('$ionicPopup');
    $ionicActionSheet = $injector.get('$ionicActionSheet');
    $translate = $injector.get('$translate');
    $ionicHistory = chai.spy.object($injector.get('$ionicHistory'), ['clearCache', 'goBack']);

    $localStorage.userAuth = mockData.userService.login().user;

    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');

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

    $cordovaToast = chai.spy.object($cordovaToast, ['showShortBottom']);

    $cordovaSocialSharing = {
    	throwsError: false,
    	message: '',
    	subject: '',
    	attachments: '',
    	link: '',
    	share: function (message, subject, file, link) {
	      var defer = $q.defer();
	      if (this.throwsError) {
	        defer.reject('There was an error sharing via SMS.');
	      } else {
	        this.message = message;
	        this.subject = subject;
	        this.attachments = file;
	        this.link = link;

	        defer.resolve();
	      }
	      return defer.promise;
	    }
    };

    $cordovaCalendar = {
    	createEvent: function ( obj ) {

	      var defer = $q.defer();
	      if (false) {
	        defer.reject('There was an error sharing via SMS.');
	      } else {
	        defer.resolve();
	      }
	      return defer.promise;
	    }
    };

    $cordovaCalendar = chai.spy.object($cordovaCalendar, ['createEvent']);

    

    $ionicSideMenuDelegate = {
    	canDragContent: function(){}
    }

    $ionicSideMenuDelegate = chai.spy.object($ionicSideMenuDelegate, ['canDragContent'])

    $stateParams.idEvent = 1;

    eventDetailOrganizerController = $controller('EventDetailOrganizerController', {
  		'$scope': $scope,
	    'eventService': eventService,
	    'utilsService': utilsService,
	    '$stateParams': $stateParams,
	    '$state': $state,
	    'sponsorshipService': sponsorshipService,
	    '$ionicPopup': $ionicPopup,
	    '$ionicActionSheet': $ionicActionSheet,
	    '$cordovaSocialSharing': $cordovaSocialSharing,
	    '$cordovaCalendar': $cordovaCalendar,
	    '$ionicSideMenuDelegate': $ionicSideMenuDelegate,
	    '$ionicHistory': $ionicHistory,
	    '$cordovaToast': $cordovaToast,
	    '$translate': $translate,
	    'BackendVariables': BackendVariables
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to event object', function(){

    it('Should have event object', function() {
      chai.assert.isDefined( eventDetailOrganizerController.event );
      chai.assert.isObject( eventDetailOrganizerController.event );
      chai.expect( eventDetailOrganizerController.event ).to.be.empty;
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to perks array', function(){

    it('Should have perks array', function() {
      chai.assert.isDefined( eventDetailOrganizerController.perks );
      chai.assert.isArray( eventDetailOrganizerController.perks );
      chai.expect( eventDetailOrganizerController.perks ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to ionicSideMenuDelegate', function(){

  	var dataEvent = mockData.eventService.getEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/events/1').respond(200, dataEvent);
  	});

    it('Should ionicSideMenuDelegate be false', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicSideMenuDelegate.canDragContent).to.have.been.called();
      chai.expect($ionicSideMenuDelegate.canDragContent).to.have.been.with(false);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getEvent method success', function(){

		var dataEvent = mockData.eventService.getEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/events/1').respond(200, dataEvent);
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
      chai.assert.isObject( eventDetailOrganizerController.event );
      chai.assert.isObject( eventDetailOrganizerController.event.category );
      chai.assert.isObject( eventDetailOrganizerController.event.type );
      chai.assert.isObject( eventDetailOrganizerController.event.organizer );
      chai.assert.isArray( eventDetailOrganizerController.event.sponzorships );
      chai.assert.instanceOf( eventDetailOrganizerController.event.starts, Date );
      chai.assert.instanceOf( eventDetailOrganizerController.event.ends, Date );
    });

    it('Should have an perks array', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( eventDetailOrganizerController.perks.length, dataEvent.data.event.perks.length );
    	for (var i = 0; i < eventDetailOrganizerController.perks.length; i++) {
    		chai.assert.isArray(eventDetailOrganizerController.perks[i].tasks);
    		chai.assert.isArray(eventDetailOrganizerController.perks[i].sponsorships);
    	};
    });

    it('Should perks tasks be type 0 an Organizer', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	for (var i = 0; i < eventDetailOrganizerController.perks.length; i++) {
    		for (var j = 0; j < eventDetailOrganizerController.perks[i].tasks.length; j++) {
    			chai.assert.equal(eventDetailOrganizerController.perks[i].tasks[j].type, 0);
    		};
    	};
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to getEvent method failed', function(){

		var dataEvent = mockData.failed();
 
  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/events/1').respond(400, dataEvent);
  	});

  	it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to deleteEvent method ', function(){

  	it('Should have a deleteEvent method', function() {
      chai.assert.isDefined(eventDetailOrganizerController.deleteEvent);
      chai.assert.isFunction(eventDetailOrganizerController.deleteEvent);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to deleteEvent success ', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataDelete = mockData.eventService.deleteEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/events/1').respond(200, dataEvent);
  		$httpBackend.whenDELETE('https://apilocal.sponzor.me/events/1').respond(200, dataDelete);
  	});

  	it('Should be called utilsService methods', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.showActionSheet();
      eventDetailOrganizerController.deleteEvent();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should be called $ionicHistory methods', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.showActionSheet();
      eventDetailOrganizerController.deleteEvent();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
      chai.expect($ionicHistory.goBack).to.have.been.called();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to deleteEvent failed ', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataDelete = mockData.failed();
 
  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/events/1').respond(200, dataEvent);
  		$httpBackend.whenDELETE('https://apilocal.sponzor.me/events/1').respond(400, dataDelete);
  	});

  	it('Should be called utilsService methods', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.showActionSheet();
      eventDetailOrganizerController.deleteEvent();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.alert).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to openOptionsSponsorship method ', function(){

  	var dataEvent = mockData.eventService.getEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/events/1').respond(200, dataEvent);
  	});

  	it('Should have a openOptionsSponsorship method', function() {
      chai.assert.isDefined(eventDetailOrganizerController.openOptionsSponsorship);
      chai.assert.isFunction(eventDetailOrganizerController.openOptionsSponsorship);
    });

    it('Should sponsorshipSelected be equal that mockSponsorship', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	var mockSponsorship = {
    		id: 1
    	};
      eventDetailOrganizerController.openOptionsSponsorship( mockSponsorship );
      chai.assert.equal(eventDetailOrganizerController.sponsorshipSelected.id, mockSponsorship.id);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to closeOptionsSponsorship method ', function(){

  	var dataEvent = mockData.eventService.getEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/events/1').respond(200, dataEvent);
  	});

  	it('Should have a closeOptionsSponsorship method', function() {
      chai.assert.isDefined(eventDetailOrganizerController.closeOptionsSponsorship);
      chai.assert.isFunction(eventDetailOrganizerController.closeOptionsSponsorship);
    });

    it('Should sponsorshipSelected be equal that mockSponsorship', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	var mockSponsorship = {
    		id: 1
    	};
      eventDetailOrganizerController.openOptionsSponsorship( mockSponsorship );
      eventDetailOrganizerController.closeOptionsSponsorship();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateSponsorship method ', function(){

  	it('Should have a openOptionsSponsorship method', function() {
      chai.assert.isDefined(eventDetailOrganizerController.updateSponsorship);
      chai.assert.isFunction(eventDetailOrganizerController.updateSponsorship);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateSponsorship success ', function(){
  	

  	var dataEvent = mockData.eventService.getEvent();
  	var dataSponzorship = mockData.sponsorshipService.editSponzorshipPut();
  	dataSponzorship.Sponzorship.status = 1;
 
  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/events/1').respond(200, dataEvent);
  		$httpBackend.whenPUT('https://apilocal.sponzor.me/sponzorships/1').respond(200, dataSponzorship);
  	});

  	it('Should be called utilsService methods', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      var mockSponsorship = {
    		id: 1
    	};
      eventDetailOrganizerController.openOptionsSponsorship( mockSponsorship );
      eventDetailOrganizerController.updateSponsorship(1);
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  	it('Should sponsorshipSelected be equal that mockSponsorship', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	var mockSponsorship = {
    		id: 1
    	};
      eventDetailOrganizerController.openOptionsSponsorship( mockSponsorship );
      eventDetailOrganizerController.updateSponsorship(1);
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(eventDetailOrganizerController.sponsorshipSelected.id, mockSponsorship.id);
    	chai.assert.equal(eventDetailOrganizerController.sponsorshipSelected.status, dataSponzorship.Sponzorship.status);
    });


  });

	////////////////////////////////////////////////////////////
  describe('Tests to updateSponsorship failed ', function(){
  	

  	var dataEvent = mockData.eventService.getEvent();
  	var dataSponzorship = mockData.failed();
 
  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/events/1').respond(200, dataEvent);
  		$httpBackend.whenPUT('https://apilocal.sponzor.me/sponzorships/1').respond(400, dataSponzorship);
  	});

  	it('Should be called utilsService methods', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      var mockSponsorship = {
    		id: 1
    	};
      eventDetailOrganizerController.openOptionsSponsorship( mockSponsorship );
      eventDetailOrganizerController.updateSponsorship(1);
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });


  });

  ////////////////////////////////////////////////////////////
  describe('Tests to editEvent success ', function(){
  	

  	var dataEvent = mockData.eventService.getEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/events/1').respond(200, dataEvent);
  	});

  	it('Should be called state.go methods', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.optionsActionSheet[0]();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with('organizer.editevent',{ id: "1002" });
    });


  });

  ////////////////////////////////////////////////////////////
  describe('Tests to shareEvent success ', function(){
  	

  	var dataEvent = mockData.eventService.getEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/events/1').respond(200, dataEvent);
  	});

  	it('Should be called $cordovaToast.showShortBottom', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.optionsActionSheet[1]();
      $rootScope.$digest();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });


  });

  ////////////////////////////////////////////////////////////
  describe('Tests to addToCalendar success ', function(){
  	

  	var dataEvent = mockData.eventService.getEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET('https://apilocal.sponzor.me/events/1').respond(200, dataEvent);
  	});

  	it('Should be called $cordovaToast.showShortBottom', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.optionsActionSheet[2]();
      $rootScope.$digest();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });


  });

});
