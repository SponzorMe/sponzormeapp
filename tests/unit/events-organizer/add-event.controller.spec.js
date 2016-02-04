describe('Controller: AddEventController', function(){

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
  	$q = $injector.get('$q');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('app/events-organizer/sponsor-modal.html').respond(200, '');
    $httpBackend.whenGET('app/dashboard-organizer/menu.html').respond(200, '');
    $httpBackend.whenGET('app/events-organizer/event-list-tabs.html').respond(200, '');
    $httpBackend.whenGET('app/events-organizer/event-list.html').respond(200, '');

    //Dependences
    $scope = $rootScope.$new();
  	$translate = $injector.get('$translate');
  	$localStorage = $injector.get('$localStorage');
  	$state = $injector.get('$state');
  	$state = chai.spy.object($state, ['go']);
  	
    userService = $injector.get('userService');

    utilsService = $injector.get('utilsService');
    utilsService = chai.spy.object( utilsService , ['showLoad', 'hideLoad','alert', 'resetForm','trim', 'confirm']);
    utilsService.throwsError = true;
    utilsService.confirm = function () {
      var q = $q.defer();
      q.resolve(this.throwsError);
      return q.promise;
    }
    //Mock $cordovaDatePicker
    $cordovaDatePicker = {
    	date: null,
	    show: function (options) {
	      var q = $q.defer();
	      q.resolve(this.date);
	      return q.promise;
	    }
	  };
	  $cordovaDatePicker = chai.spy.object($cordovaDatePicker, ['show']);

	  //Mock Camera
	  $cordovaCamera = {
      throwsError: false,
      imageData: '',
      getPicture: function (options) {
        var defer = $q.defer();
        if (this.throwsError) {
          defer.reject('There was an error getting the picture.');
        } else {
          if (options) {
            options = options;  // This is just to get by JSHint.
          }
          defer.resolve(this.imageData);
        }
        return defer.promise;
      }
    };

    eventTypeService = $injector.get('eventTypeService');
    eventService = $injector.get('eventService');
    perkService = $injector.get('perkService');
    perkService = chai.spy.object( perkService, ['editPerkPatch','createPerk'] )

    $ionicModal = $injector.get('$ionicModal');

    //Mock Toast
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

    $ionicHistory = $injector.get('$ionicHistory');
    $ionicHistory = chai.spy.object($ionicHistory, ['clearCache', 'nextViewOptions', 'goBack']);

    imgurService = $injector.get('imgurService');
    imgurService = chai.spy.object( imgurService, ['uploadImage']);


    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }
    $localStorage.userAuth = mockData.userService.login().user;

    addEventController = $controller('AddEventController', {
  		'$scope': $scope,
	    '$translate': $translate,
	    '$localStorage': $localStorage,
	    'userService': userService,
	    'utilsService': utilsService,
	    '$cordovaDatePicker': $cordovaDatePicker,
	    '$cordovaCamera': $cordovaCamera,
	    'eventTypeService': eventTypeService,
	    'eventService': eventService,
	    'perkService': perkService,
	    '$ionicModal': $ionicModal,
	    '$cordovaToast': $cordovaToast,
	    '$ionicHistory': $ionicHistory,
	    'imgurService': imgurService,
	    '$q': $q,
	    '$state': $state
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( addEventController.userAuth );
      chai.assert.isObject( addEventController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( addEventController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to newEvent variable', function(){

    it('Should have newEvent variable', function() {
      chai.assert.isDefined( addEventController.newEvent );
      chai.assert.isObject( addEventController.newEvent );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to newSponsor variable', function(){

    it('Should have newSponsor variable', function() {
      chai.assert.isDefined( addEventController.newSponsor );
      chai.assert.isObject( addEventController.newSponsor );
    });

    it('Should newSponsor be empty', function() {
    	chai.expect( addEventController.newSponsor ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to isNewSponsor variable', function(){

    it('Should have isNewSponsor variable', function() {
      chai.assert.isDefined( addEventController.isNewSponsor );
      chai.assert.isBoolean( addEventController.isNewSponsor );
    });

    it('Should isNewSponsor be true', function() {
    	chai.assert.isTrue( addEventController.isNewSponsor );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to eventTypes array', function(){

    it('Should have eventTypes array', function() {
      chai.assert.isDefined( addEventController.eventTypes );
      chai.assert.isArray( addEventController.eventTypes );
    });

    it('Should eventTypes be empty', function() {
    	chai.expect( addEventController.eventTypes ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to sponsors array', function(){

    it('Should have sponsors array', function() {
      chai.assert.isDefined( addEventController.sponsors );
      chai.assert.isArray( addEventController.sponsors );
    });

    it('Should sponsors be empty', function() {
    	chai.expect( addEventController.sponsors ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to modalSponsor variable', function(){

    it('Should have modalSponsor variable', function() {
      chai.assert.isDefined( addEventController.modalSponsor );
    });

    it('Should sponsors be null', function() {
    	chai.assert.isNull( addEventController.modalSponsor );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to imageURI variable', function(){

    it('Should have imageURI variable', function() {
      chai.assert.isDefined( addEventController.imageURI );
    });

    it('Should imageURI be null', function() {
    	chai.assert.isNull( addEventController.imageURI );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to clickedStartDate method', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have clickedStartDate method', function() {
      chai.assert.isDefined( addEventController.clickedStartDate );
      chai.assert.isFunction( addEventController.clickedStartDate );
    });

    it('Should start be format date correct', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      $cordovaDatePicker.date = new Date(2014,2,2);
      addEventController.clickedStartDate();
      $rootScope.$digest();
      chai.assert.equal( addEventController.newEvent.start, '2014-03-02' );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to clickedEndDate method', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have clickedEndDate method', function() {
      chai.assert.isDefined( addEventController.clickedEndDate );
      chai.assert.isFunction( addEventController.clickedEndDate );
    });

    it('Should start be format date correct', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      $cordovaDatePicker.date = new Date(2016,2,2);
      addEventController.clickedEndDate();
      $rootScope.$digest();
      chai.assert.equal( addEventController.newEvent.end, '2016-03-02' );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to clickedStartTime method', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have clickedStartTime method', function() {
      chai.assert.isDefined( addEventController.clickedStartTime );
      chai.assert.isFunction( addEventController.clickedStartTime );
    });

    it('Should start be format date correct', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      $cordovaDatePicker.date = new Date(2016,2,2,2,3,4);
      addEventController.clickedStartTime();
      $rootScope.$digest();
      chai.assert.equal( addEventController.newEvent.starttime, '02:03:04' );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to clickedEndTime method', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have clickedEndTime method', function() {
      chai.assert.isDefined( addEventController.clickedEndTime );
      chai.assert.isFunction( addEventController.clickedEndTime );
    });

    it('Should start be format date correct', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      $cordovaDatePicker.date = new Date(2016,2,2,13,3,24);
      addEventController.clickedEndTime();
      $rootScope.$digest();
      chai.assert.equal( addEventController.newEvent.endtime, '13:03:24' );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getPhoto method', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have getPhoto method', function() {
      chai.assert.isDefined( addEventController.getPhoto );
      chai.assert.isFunction( addEventController.getPhoto );
    });

    it('Should be the image equal before call getPhoto', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      $cordovaCamera.imageData = '123456.jpg';
      var image = "data:image/jpeg;base64," + $cordovaCamera.imageData;
      addEventController.getPhoto();
      $rootScope.$digest();
      chai.assert.equal(addEventController.imageURI, $cordovaCamera.imageData);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getEventsTypes success', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should eventTypes be an array', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isArray( addEventController.eventTypes );
      chai.expect( addEventController.eventTypes ).to.eql( dataEventTypes.eventTypes );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to createEvent method', function(){

    it('Should have createEvent method', function() {
      chai.assert.isDefined( addEventController.createEvent );
      chai.assert.isFunction( addEventController.createEvent );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to createEvent method success with imageURI', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();
  	var dataImage = mockData.imgurService.uploadImage();
  	var dataCreatePerk = mockData.perkService.createPerk();
  	var dataEvent = mockData.eventService.createEvent();

    beforeEach(function() {
    	$httpBackend.whenPOST( URL_REST + 'events').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  		$httpBackend.whenPOST('https://api.imgur.com/3/image').respond(200, dataImage);
  		$httpBackend.whenPOST( URL_REST + 'perks').respond(200, dataCreatePerk);
  	});

  	it('Should be called uploadImage', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(imgurService.uploadImage).to.have.been.called();
      chai.expect(imgurService.uploadImage).to.have.been.with(addEventController.imageURI);
    });

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should be called $ionicHistory methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.nextViewOptions).to.have.been.called();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should be called $cordovaToast.showShortBottom method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });

    it('Should be redirect', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("organizer.events.list");
    });

    it('Should be called createPerk method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.createEvent( mockForm );
      addEventController.sponsors.push({
      	kind: "asas",
      	total_quantity: 0,
      	usd: 0
      });
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(perkService.createPerk).to.have.been.called();
      chai.expect(perkService.createPerk).to.have.been.called.exactly(1);
    });

    it('Should newEvent be empty', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( addEventController.newEvent ).to.be.empty;
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to createEvent method success without imageURI', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();
  	var dataCreatePerk = mockData.perkService.createPerk();
  	var dataEvent = mockData.eventService.createEvent();

    beforeEach(function() {
    	$httpBackend.whenPOST( URL_REST + 'events').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  		$httpBackend.whenPOST( URL_REST + 'perks').respond(200, dataCreatePerk);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should be called $ionicHistory methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.nextViewOptions).to.have.been.called();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should be called $cordovaToast.showShortBottom method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });

    it('Should be redirect', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("organizer.events.list");
    });

    it('Should be called createPerk method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.createEvent( mockForm );
      addEventController.sponsors.push({
      	kind: "asas",
      	total_quantity: 0,
      	usd: 0
      });
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(perkService.createPerk).to.have.been.called();
      chai.expect(perkService.createPerk).to.have.been.called.exactly(1);
    });

    it('Should newEvent be empty', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( addEventController.newEvent ).to.be.empty;
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to createEvent method failed with imageURI by uploadImage', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();
  	//var dataImage = mockData.imgurService.uploadImage();
  	var dataImage = mockData.failed();
  	var dataCreatePerk = mockData.perkService.createPerk();
  	var dataEvent = mockData.eventService.createEvent();

    beforeEach(function() {
    	$httpBackend.whenPOST( URL_REST + 'events').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  		$httpBackend.whenPOST('https://api.imgur.com/3/image').respond(400, dataImage);
  		$httpBackend.whenPOST( URL_REST + 'perks').respond(200, dataCreatePerk);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to createEvent method failed with imageURI by createEvent', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();
  	var dataImage = mockData.imgurService.uploadImage();
  	var dataCreatePerk = mockData.perkService.createPerk();
  	//var dataEvent = mockData.eventService.createEvent();
  	var dataEvent = mockData.failed();

    beforeEach(function() {
    	$httpBackend.whenPOST( URL_REST + 'events').respond(400, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  		$httpBackend.whenPOST('https://api.imgur.com/3/image').respond(200, dataImage);
  		$httpBackend.whenPOST( URL_REST + 'perks').respond(200, dataCreatePerk);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to createEvent method failed with imageURI by createPerk', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();
  	var dataImage = mockData.imgurService.uploadImage();
  	//var dataCreatePerk = mockData.perkService.createPerk();
  	var dataCreatePerk = mockData.failed();
  	var dataEvent = mockData.eventService.createEvent();

    beforeEach(function() {
    	$httpBackend.whenPOST( URL_REST + 'events').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  		$httpBackend.whenPOST('https://api.imgur.com/3/image').respond(200, dataImage);
  		$httpBackend.whenPOST( URL_REST + 'perks').respond(400, dataCreatePerk);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to openModalSponsor method', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have openModalSponsor method', function() {
      chai.assert.isDefined( addEventController.openModalSponsor );
      chai.assert.isFunction( addEventController.openModalSponsor );
    });

    it('Should be called modalSponsor.show method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.openModalSponsor();
      $rootScope.$digest();
      chai.assert.isTrue(addEventController.modalSponsor._isShown);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to closeModalSponsor method', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have closeModalSponsor method', function() {
      chai.assert.isDefined( addEventController.closeModalSponsor );
      chai.assert.isFunction( addEventController.closeModalSponsor );
    });

    it('Should be called modalSponsor.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.closeModalSponsor( mockForm);
      $rootScope.$digest();
      chai.assert.isFalse(addEventController.modalSponsor._isShown);
    });

    it('Should be called utilsService.resetForm', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.closeModalSponsor( mockForm );
      $rootScope.$digest();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should newSponsor be empty', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.closeModalSponsor( mockForm );
      $rootScope.$digest();
    	chai.expect( addEventController.newSponsor ).to.be.empty;
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to createSponsor method', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have createSponsor method', function() {
      chai.assert.isDefined( addEventController.createSponsor );
      chai.assert.isFunction( addEventController.createSponsor );
    });

    it('Should be called modalSponsor.show method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.createSponsor();
      $rootScope.$digest();
      chai.assert.isTrue(addEventController.isNewSponsor);
      chai.assert.isTrue(addEventController.modalSponsor._isShown);
    });

    it('Should isNewSponsor be true', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.createSponsor();
      $rootScope.$digest();
      chai.assert.isTrue(addEventController.isNewSponsor);
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to editSponsor method', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have editSponsor method', function() {
      chai.assert.isDefined( addEventController.editSponsor );
      chai.assert.isFunction( addEventController.editSponsor );
    });

    it('Should be called modalSponsor.show method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
      	kind: "asas",
      	total_quantity: 0,
      	usd: 0
      }
      addEventController.editSponsor( mockPerk );
      $rootScope.$digest();
      chai.assert.isTrue(addEventController.modalSponsor._isShown);
    });

    it('Should newSponsor be that mockPerk', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
      	kind: "asas",
      	total_quantity: 0,
      	usd: 0,
      }
      addEventController.editSponsor( mockPerk );
      $rootScope.$digest();
      chai.expect( addEventController.newSponsor ).to.eql( mockPerk );
    });

    it('Should isNewSponsor be false', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
      	kind: "asas",
      	total_quantity: 0,
      	usd: 0
      }
      addEventController.editSponsor( mockPerk );
      $rootScope.$digest();
      chai.assert.isFalse(addEventController.isNewSponsor);
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to deleteSponsor method', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have editSponsor method', function() {
      chai.assert.isDefined( addEventController.deleteSponsor );
      chai.assert.isFunction( addEventController.deleteSponsor );
    });

    it('Should be called modalSponsor.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.newSponsor = mockPerk;
      addEventController.sponsors.push(mockPerk);
    	addEventController.deleteSponsor();
      $rootScope.$digest();
      chai.assert.isFalse(addEventController.modalSponsor._isShown);
    });

    it('Should be sponsors be less', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var size = addEventController.sponsors.length;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.newSponsor = mockPerk;
      addEventController.sponsors.push(mockPerk);
    	addEventController.deleteSponsor();
      $rootScope.$digest();
      chai.assert.equal( addEventController.sponsors.length, size  );
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to submitSponsor for newSponsor', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

  	it('Should have submitSponsor method', function() {
      chai.assert.isDefined( addEventController.submitSponsor );
      chai.assert.isFunction( addEventController.submitSponsor );
    });

  	it('Should be called modalSponsor.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.isNewSponsor = true;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.newSponsor = mockPerk;
    	addEventController.submitSponsor( mockForm );
      $rootScope.$digest();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should sponsors be +1 ', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var size = addEventController.sponsors.length;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.isNewSponsor = true;
      addEventController.newSponsor = mockPerk;
    	addEventController.submitSponsor( mockForm );
      $rootScope.$digest();
      chai.assert.equal( addEventController.sponsors.length, size + 1 );
    });

    it('Should be called modalSponsor.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.isNewSponsor = true;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.newSponsor = mockPerk;
    	addEventController.submitSponsor( mockForm );
      $rootScope.$digest();
      chai.assert.isFalse(addEventController.modalSponsor._isShown);
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to submitSponsor for !newSponsor', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

  	it('Should have submitSponsor method', function() {
      chai.assert.isDefined( addEventController.submitSponsor );
      chai.assert.isFunction( addEventController.submitSponsor );
    });

  	it('Should be called modalSponsor.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.isNewSponsor = false;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.newSponsor = mockPerk;
    	addEventController.submitSponsor( mockForm );
      $rootScope.$digest();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should sponsors be equal that size', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var size = addEventController.sponsors.length;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.isNewSponsor = false;
      addEventController.newSponsor = mockPerk;
    	addEventController.submitSponsor( mockForm );
      $rootScope.$digest();
      chai.assert.equal( addEventController.sponsors.length, size );
    });

    it('Should be called modalSponsor.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.isNewSponsor = false;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.newSponsor = mockPerk;
    	addEventController.submitSponsor( mockForm );
      $rootScope.$digest();
      chai.assert.isFalse(addEventController.modalSponsor._isShown);
    });

  });
});