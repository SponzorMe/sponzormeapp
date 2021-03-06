describe("Controller: EventDetailOrganizerController", function() {

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($injector, _$rootScope_, $controller) {

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

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
    $httpBackend.whenGET('app/events-organizer/task-modal.html').respond(200, '');

    //Dependences
    $localStorage = $injector.get('$localStorage');
    sponsorshipService = $injector.get('sponsorshipService');
    eventService = $injector.get('eventService');
    
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $q = $injector.get('$q');
    $stateParams = $injector.get('$stateParams');
    $state = chai.spy.object($injector.get('$state'), ['go']);
    $ionicPopup = $injector.get('$ionicPopup');
    $ionicModal = $injector.get('$ionicModal');
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
	    '$ionicModal': $ionicModal,
	    '$ionicActionSheet': $ionicActionSheet,
	    '$cordovaSocialSharing': $cordovaSocialSharing,
	    '$cordovaCalendar': $cordovaCalendar,
	    '$ionicSideMenuDelegate': $ionicSideMenuDelegate,
	    '$ionicHistory': $ionicHistory,
	    '$cordovaToast': $cordovaToast,
	    '$translate': $translate,
	    'BackendVariables': BackendVariables,
      '$localStorage': $localStorage
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
  describe('Tests to modalTask variable', function(){

    it('Should modalTask variable', function() {
      chai.assert.isDefined( eventDetailOrganizerController.modalTask );
      chai.assert.isNull( eventDetailOrganizerController.modalTask );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to isNewTask variable', function(){

    it('Should isNewTask variable', function() {
      chai.assert.isDefined( eventDetailOrganizerController.isNewTask );
      chai.assert.isTrue( eventDetailOrganizerController.isNewTask );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to task object', function(){

    it('Should task object', function() {
      chai.assert.isDefined( eventDetailOrganizerController.task );
      chai.assert.isObject( eventDetailOrganizerController.task );
      chai.expect( eventDetailOrganizerController.task ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to ionicSideMenuDelegate', function(){

  	var dataEvent = mockData.eventService.getEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
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
  		$httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
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
      chai.assert.isObject( eventDetailOrganizerController.event.user_organizer );
      chai.assert.isArray( eventDetailOrganizerController.event.sponzorship );
      chai.assert.isArray( eventDetailOrganizerController.event.perks );
      chai.assert.instanceOf( eventDetailOrganizerController.event.starts, Date );
      chai.assert.instanceOf( eventDetailOrganizerController.event.ends, Date );
    });

    it('Should have an perks array', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( eventDetailOrganizerController.event.perks.length, dataEvent.event.perks.length );
    	for (var i = 0; i < eventDetailOrganizerController.event.perks.length; i++) {
    		chai.assert.isArray(eventDetailOrganizerController.event.perks[i].tasks);
    		chai.assert.isArray(eventDetailOrganizerController.event.perks[i].sponzorship);
    	};
    });

    it('Should perks tasks be type 0 an Organizer', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	for (var i = 0; i < eventDetailOrganizerController.event.perks.length; i++) {
    		for (var j = 0; j < eventDetailOrganizerController.event.perks[i].tasks.length; j++) {
    			chai.assert.equal(eventDetailOrganizerController.event.perks[i].tasks[j].type, 0);
    		};
    	};
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to getEvent method failed', function(){

		var dataEvent = mockData.failed();
 
  	beforeEach(function() {
  		$httpBackend.whenGET(URL_REST + 'events/1').respond(400, dataEvent);
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
  		$httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenDELETE( URL_REST + 'events/1').respond(200, dataDelete);
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
  		$httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenDELETE(URL_REST + 'events/1').respond(400, dataDelete);
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
  		$httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
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
  		$httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
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
  		$httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenPUT(URL_REST + 'sponzorships/1').respond(200, dataSponzorship);
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
  		$httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenPUT(URL_REST + 'sponzorships/1').respond(400, dataSponzorship);
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
  		$httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
  	});

  	it('Should be called state.go methods', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.optionsActionSheet[0]();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with('organizer.editevent',{ id: "1" });
    });


  });

  ////////////////////////////////////////////////////////////
  describe('Tests to shareEvent success ', function(){
  	

  	var dataEvent = mockData.eventService.getEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
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
  		$httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
  	});

  	it('Should be called $cordovaToast.showShortBottom', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.optionsActionSheet[2]();
      $rootScope.$digest();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });


  });

  ////////////////////////////////////////////////////////////
  describe('Tests to showModalTask method ', function(){
    
    var dataEvent = mockData.eventService.getEvent();
 
    beforeEach(function() {
      $httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
    });

    it('Should showModalTask method', function() {
      chai.assert.isDefined( eventDetailOrganizerController.showModalTask );
      chai.assert.isFunction( eventDetailOrganizerController.showModalTask );
    });

    it('Should be called showModalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.showModalTask();
      $rootScope.$digest();
      chai.assert.isTrue(eventDetailOrganizerController.modalTask._isShown);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to newTask method ', function(){
    
    var dataEvent = mockData.eventService.getEvent();
 
    beforeEach(function() {
      $httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
    });

    it('Should newTask method', function() {
      chai.assert.isDefined( eventDetailOrganizerController.newTask );
      chai.assert.isFunction( eventDetailOrganizerController.newTask );
    });

    it('Should be open modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
        id: 1
      };
      eventDetailOrganizerController.newTask( mockPerk );
      $rootScope.$digest();
      chai.assert.isTrue(eventDetailOrganizerController.modalTask._isShown);
    });

    it('Should isNewTask be  true', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
        id: 1
      };
      eventDetailOrganizerController.newTask( mockPerk );
      $rootScope.$digest();
      chai.assert.isTrue(eventDetailOrganizerController.isNewTask);
      chai.assert.equal(eventDetailOrganizerController.task.perk_id, mockPerk.id);
    });

    it('Should task.perk_id be equal that mockPerk.id', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
        id: 1
      };
      eventDetailOrganizerController.newTask( mockPerk );
      $rootScope.$digest();
      chai.assert.equal(eventDetailOrganizerController.task.perk_id, mockPerk.id);
      
    });

    it('Should task.event_id be equal that event.id', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
        id: 1
      };
      eventDetailOrganizerController.newTask( mockPerk );
      $rootScope.$digest();
      chai.assert.equal(eventDetailOrganizerController.task.event_id, dataEvent.event.id);
    });
    
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to hideModalTask method ', function(){
    
    var dataEvent = mockData.eventService.getEvent();
 
    beforeEach(function() {
      $httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
    });

    it('Should hideModalTask method', function() {
      chai.assert.isDefined( eventDetailOrganizerController.hideModalTask );
      chai.assert.isFunction( eventDetailOrganizerController.hideModalTask );
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.hideModalTask( );
      $rootScope.$digest();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    it('Should task be empty', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.hideModalTask();
      $rootScope.$digest();
      chai.assert.isObject( eventDetailOrganizerController.task );
      chai.expect( eventDetailOrganizerController.task ).to.be.empty;
    });
    
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to editTask method ', function(){
    
    var dataEvent = mockData.eventService.getEvent();
 
    beforeEach(function() {
      $httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
    });

    it('Should hideModalTask method', function() {
      chai.assert.isDefined( eventDetailOrganizerController.editTask );
      chai.assert.isFunction( eventDetailOrganizerController.editTask );
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      var mockTask = {
        id: 1
      };
      eventDetailOrganizerController.editTask( mockTask );
      $rootScope.$digest();
      chai.assert.isTrue(eventDetailOrganizerController.modalTask._isShown);
    });

    it('Should isNewTask be false', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      var mockTask = {
        id: 1
      };
      eventDetailOrganizerController.editTask( mockTask );
      $rootScope.$digest();
      chai.assert.isFalse(eventDetailOrganizerController.isNewTask);
    });

    it('Should task be equal that mockTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      var mockTask = {
        id: 1
      };
      eventDetailOrganizerController.editTask( mockTask );
      $rootScope.$digest();
      chai.expect( eventDetailOrganizerController.task ).to.eql( mockTask );
    });
    
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to submitTask method ', function(){
    it('Should have submitTask method', function() {
      chai.assert.isDefined( eventDetailOrganizerController.submitTask );
      chai.assert.isFunction( eventDetailOrganizerController.submitTask );
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to createTask success ', function(){

    var dataEvent = mockData.eventService.getEvent();
    var dataPerk = mockData.perkTaskService.createPerkTask();

    beforeEach(function() {
      $httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
      $httpBackend.whenPOST(URL_REST + 'perk_tasks').respond(200, dataPerk);
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.isNewTask = true;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    it('Should be called resetForm', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.isNewTask = true;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to createTask failed ', function(){

    var dataEvent = mockData.eventService.getEvent();
    var dataPerk = mockData.failed();

    beforeEach(function() {
      $httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
      $httpBackend.whenPOST(URL_REST + 'perk_tasks').respond(400, dataPerk);
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.isNewTask = true;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    it('Should be called resetForm', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.isNewTask = true;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateTask success ', function(){

    var dataEvent = mockData.eventService.getEvent();
    var dataPerk = mockData.perkTaskService.editPerkTaskPatch();

    beforeEach(function() {
      $httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
      $httpBackend.whenPATCH(URL_REST + 'perk_tasks/1').respond(200, dataPerk);
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.task = {
        id: 1
      };
      eventDetailOrganizerController.isNewTask = false;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    it('Should be called resetForm', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.task = {
        id: 1
      };
      eventDetailOrganizerController.isNewTask = false;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateTask failed ', function(){

    var dataEvent = mockData.eventService.getEvent();
    var dataPerk = mockData.failed();

    beforeEach(function() {
      $httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
      $httpBackend.whenPATCH(URL_REST + 'perk_tasks/1').respond(400, dataPerk);
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.task = {
        id: 1
      };
      eventDetailOrganizerController.isNewTask = false;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    it('Should be called resetForm', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.task = {
        id: 1
      };
      eventDetailOrganizerController.isNewTask = false;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to deleteTask success ', function(){

    var dataEvent = mockData.eventService.getEvent();
    var dataPerk = mockData.perkTaskService.deletePerkTask();

    beforeEach(function() {
      $httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
      $httpBackend.whenDELETE(URL_REST + 'perk_tasks/1').respond(200, dataPerk);
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.task = {
        id: 1
      };
      eventDetailOrganizerController.showModalTask();
      eventDetailOrganizerController.deleteTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    it('Should be called resetForm', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.task = {
        id: 1
      };
      eventDetailOrganizerController.showModalTask();
      eventDetailOrganizerController.deleteTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to deleteTask failed ', function(){

    var dataEvent = mockData.eventService.getEvent();
    var dataPerk = mockData.perkTaskService.deletePerkTask();

    beforeEach(function() {
      $httpBackend.whenGET(URL_REST + 'events/1').respond(200, dataEvent);
      $httpBackend.whenDELETE(URL_REST + 'perk_tasks/1').respond(400, dataPerk);
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.task = {
        id: 1
      };
      eventDetailOrganizerController.showModalTask();
      eventDetailOrganizerController.deleteTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    it('Should be called resetForm', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.task = {
        id: 1
      };
      eventDetailOrganizerController.showModalTask();
      eventDetailOrganizerController.deleteTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });
  });

});

