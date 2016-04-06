describe("Controller: EventDetailOrganizerCtrl", function() {

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
    
    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');
    
  	$httpBackend = $injector.get('$httpBackend');

    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('templates/events-sponsor/sponsor-it-modal.html').respond(200, '');
    $httpBackend.whenGET('templates/events-organizer/options-sponsorship.html').respond(200, '');
    $httpBackend.whenGET('templates/dashboard-organizer/menu.html').respond(200, '');
    $httpBackend.whenGET('templates/events-organizer/edit-event.html').respond(200, '');
    $httpBackend.whenGET('templates/events-organizer/task-modal.html').respond(200, '');

    //Dependences
    //Angular
    $q = $injector.get('$q');
    $localStorage = $injector.get('$localStorage');
    $stateParams = $injector.get('$stateParams');
    $state = chai.spy.object($injector.get('$state'), ['go']);
    $translate = $injector.get('$translate');
    //Ionic
    $ionicPopup = $injector.get('$ionicPopup');
    $ionicSideMenuDelegate = {
    	canDragContent: function(){}
    }
    $ionicSideMenuDelegate = chai.spy.object($ionicSideMenuDelegate, ['canDragContent'])
    $ionicActionSheet = $injector.get('$ionicActionSheet');
    $ionicHistory = chai.spy.object($injector.get('$ionicHistory'), ['clearCache', 'goBack']);
    $ionicModal = $injector.get('$ionicModal');
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
	      defer.resolve();
	      return defer.promise;
	    }
    };

    $cordovaCalendar = chai.spy.object($cordovaCalendar, ['createEvent']);
    //Services
    eventService = $injector.get('eventService');
    utilsService = $injector.get('utilsService');
    sponsorshipService = $injector.get('sponsorshipService');
    notificationService = $injector.get('notificationService');
    userAuthService = $injector.get('userAuthService');
    userService = $injector.get('userService');
    perkTaskService = $injector.get('perkTaskService');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );

    $stateParams.id = "1";

    eventDetailOrganizerController = $controller('EventDetailOrganizerCtrl', {
  		'$scope': $scope,
      '$stateParams': $stateParams,
      '$state': $state,
      '$translate': $translate,
      '$rootScope': $rootScope,
      '$ionicPopup': $ionicPopup,
      '$ionicActionSheet': $ionicActionSheet,
      '$ionicSideMenuDelegate': $ionicSideMenuDelegate,
      '$ionicHistory': $ionicHistory,
      '$ionicModal': $ionicModal,
      '$cordovaSocialSharing': $cordovaSocialSharing,
      '$cordovaCalendar': $cordovaCalendar,
      '$cordovaToast': $cordovaToast,
      'BackendVariables': BackendVariables,
      'eventService': eventService,
      'utilsService': utilsService,
      'sponsorshipService': sponsorshipService,
      'notificationService': notificationService,
      'userAuthService': userAuthService,
      'perkTaskService': perkTaskService
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to event object', function(){

    it('Should have event object', function() {
      chai.assert.isDefined( eventDetailOrganizerController.event );
      chai.assert.isObject( eventDetailOrganizerController.event );
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

    it('Should ionicSideMenuDelegate be false', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicSideMenuDelegate.canDragContent).to.have.been.called();
      chai.expect($ionicSideMenuDelegate.canDragContent).to.have.been.with(false);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getEvent method success', function(){


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
    	for (var i = 0; i < eventDetailOrganizerController.event.perks.length; i++) {
    		chai.assert.isArray(eventDetailOrganizerController.event.perks[i].tasks);
    		chai.assert.isArray(eventDetailOrganizerController.event.perks[i].sponzorship);
    	};
    });

    it('Should perks tasks should be of userAuth', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
    	for (var i = 0; i < eventDetailOrganizerController.event.perks.length; i++) {
    		for (var j = 0; j < eventDetailOrganizerController.event.perks[i].tasks.length; j++) {
    			chai.assert.equal(eventDetailOrganizerController.event.perks[i].tasks[j].user_id, $localStorage.userAuth.id);
    		};
    	};
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
    
  	var dataDelete = mockData.eventService.deleteEvent();
 
  	beforeEach(function() {
  		$httpBackend.whenDELETE( URL_REST + 'events/1').respond(200, dataDelete);
  	});

    /*
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
    */

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

  	var dataDelete = mockData.failed();
 
  	beforeEach(function() {
  		$httpBackend.whenDELETE(URL_REST + 'events/1').respond(400, dataDelete);
  	});

  	it('Should be called utilsService methods', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.showActionSheet();
      eventDetailOrganizerController.deleteEvent();
      $rootScope.$digest();
      $httpBackend.flush();
      //chai.expect(utilsService.showLoad).to.have.been.called();
      //chai.expect(utilsService.hideLoad).to.have.been.called();
      //chai.expect(utilsService.alert).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to openOptionsSponsorship method ', function(){

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

  	var dataSponzorship = mockData.sponsorshipService.editSponzorshipPut();
  	dataSponzorship.Sponzorship.status = 1;
 
  	beforeEach(function() {
  		$httpBackend.whenPUT(URL_REST + 'sponzorships/1').respond(200, dataSponzorship);
  	});

    /*
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
    */

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
    
  	var dataSponzorship = mockData.failed();
 
  	beforeEach(function() {
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
      //chai.expect(utilsService.showLoad).to.have.been.called();
      //chai.expect(utilsService.hideLoad).to.have.been.called();
    });


  });

  ////////////////////////////////////////////////////////////
  describe('Tests to editEvent success ', function(){

  	it('Should be called state.go methods', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController._editEvent();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with('organizer.editevent',{ id: "1" });
    });


  });

  ////////////////////////////////////////////////////////////
  describe('Tests to shareEvent success ', function(){


  	it('Should be called $cordovaToast.showShortBottom', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController._shareEvent();
      $rootScope.$digest();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });


  });

  ////////////////////////////////////////////////////////////
  describe('Tests to addToCalendar success ', function(){
  	

  	it('Should be called $cordovaToast.showShortBottom', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController._addToCalendar();
      $rootScope.$digest();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });


  });

  ////////////////////////////////////////////////////////////
  describe('Tests to showModalTask method ', function(){


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
      chai.assert.equal(eventDetailOrganizerController.task.event_id, eventDetailOrganizerController.event.id);
    });
    
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to hideModalTask method ', function(){


    it('Should hideModalTask method', function() {
      chai.assert.isDefined( eventDetailOrganizerController._hideModalTask );
      chai.assert.isFunction( eventDetailOrganizerController._hideModalTask );
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController._hideModalTask( );
      $rootScope.$digest();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    it('Should task be empty', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController._hideModalTask();
      $rootScope.$digest();
      chai.assert.isObject( eventDetailOrganizerController.task );
      chai.expect( eventDetailOrganizerController.task ).to.be.empty;
    });
    
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to editTask method ', function(){


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
      chai.expect( eventDetailOrganizerController.task.id ).to.eql( mockTask.id );
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
    
    var dataPerk = mockData.perkTaskService.createPerkTask();

    beforeEach(function() {
      $httpBackend.whenPOST(URL_REST + 'perk_tasks').respond(200, dataPerk);
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.indexPerk = 0;
      eventDetailOrganizerController.isNewTask = true;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    /*
    it('Should be called resetForm', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.isNewTask = true;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });
    */
    
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to createTask failed ', function(){
    
    var dataPerk = mockData.failed();

    beforeEach(function() {
      $httpBackend.whenPOST(URL_REST + 'perk_tasks').respond(400, dataPerk);
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      console.log();
      eventDetailOrganizerController.indexPerk = 0;
      eventDetailOrganizerController.isNewTask = true;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    /*
    it('Should be called resetForm', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.isNewTask = true;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });
    */
    
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateTask success ', function(){
    
    var dataPerk = mockData.perkTaskService.editPerkTaskPatch();

    beforeEach(function() {
      $httpBackend.whenPATCH(URL_REST + 'perk_tasks/1').respond(200, dataPerk);
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.indexPerk = 0;
      eventDetailOrganizerController.indexTask = 0;
      eventDetailOrganizerController.task = {
        id: 1
      };
      eventDetailOrganizerController.isNewTask = false;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    /*
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
    */
    
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateTask failed ', function(){
   
    var dataPerk = mockData.failed();

    beforeEach(function() {
      $httpBackend.whenPATCH(URL_REST + 'perk_tasks/1').respond(400, dataPerk);
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.indexPerk = 0;
      eventDetailOrganizerController.indexTask = 0;
      eventDetailOrganizerController.task = {
        id: 1
      };
      eventDetailOrganizerController.isNewTask = false;
      eventDetailOrganizerController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    /*
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
    */
    
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to deleteTask success ', function(){
    
    var dataPerk = mockData.perkTaskService.deletePerkTask();

    beforeEach(function() {
      $httpBackend.whenDELETE(URL_REST + 'perk_tasks/1').respond(200, dataPerk);
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.indexPerk = 0;
      eventDetailOrganizerController.indexTask = 0;
      eventDetailOrganizerController.task = {
        id: 1
      };
      eventDetailOrganizerController.showModalTask();
      eventDetailOrganizerController.deleteTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    /*
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
    */
    
  });

  ////////////////////////////////////////////////////////////
  describe('Tests to deleteTask failed ', function(){
    
    var dataPerk = mockData.perkTaskService.deletePerkTask();

    beforeEach(function() {
      $httpBackend.whenDELETE(URL_REST + 'perk_tasks/1').respond(400, dataPerk);
    });

    it('Should be close modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      eventDetailOrganizerController.indexPerk = 0;
      eventDetailOrganizerController.indexTask = 0;
      eventDetailOrganizerController.task = {
        id: 1
      };
      eventDetailOrganizerController.showModalTask();
      eventDetailOrganizerController.deleteTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse(eventDetailOrganizerController.modalTask._isShown);
    });

    /*
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
    */
    
  });

});

