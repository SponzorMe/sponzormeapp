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
    $httpBackend.whenGET('app/events-organizer/perk-modal.html').respond(200, '');
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
    $ionicHistory.clearCache = function () {
      var q = $q.defer();
      q.resolve();
      return q.promise;
    }
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
  describe('Tests to newPerk variable', function(){

    it('Should have newPerk variable', function() {
      chai.assert.isDefined( addEventController.newPerk );
      chai.assert.isObject( addEventController.newPerk );
    });

    it('Should newPerk be empty', function() {
    	chai.expect( addEventController.newPerk ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to isNewPerk variable', function(){

    it('Should have isNewPerk variable', function() {
      chai.assert.isDefined( addEventController.isNewPerk );
      chai.assert.isBoolean( addEventController.isNewPerk );
    });

    it('Should isNewPerk be true', function() {
    	chai.assert.isTrue( addEventController.isNewPerk );
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
  describe('Tests to perks array', function(){

    it('Should have perks array', function() {
      chai.assert.isDefined( addEventController.newEvent.perks );
      chai.assert.isArray( addEventController.newEvent.perks );
    });

    it('Should perks be empty', function() {
    	chai.expect( addEventController.newEvent.perks ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to modalPerk variable', function(){

    it('Should have modalPerk variable', function() {
      chai.assert.isDefined( addEventController.modalPerk );
    });

    it('Should modalPerk be null', function() {
    	chai.assert.isNull( addEventController.modalPerk );
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
  	var dataEvent = mockData.eventService.createEvent();

    beforeEach(function() {
    	$httpBackend.whenPOST( URL_REST + 'events').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  		$httpBackend.whenPOST('https://api.imgur.com/3/image').respond(200, dataImage);
  	});

  	it('Should be called uploadImage', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.newEvent.location = {
        place_id: 'Bla',
        formatted_address: 'bla'
      };
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
      addEventController.newEvent.location = {
        place_id: 'Bla',
        formatted_address: 'bla'
      };
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
      addEventController.newEvent.location = {
        place_id: 'Bla',
        formatted_address: 'bla'
      };
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
      addEventController.newEvent.location = {
        place_id: 'Bla',
        formatted_address: 'bla'
      };
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });

    it('Should be redirect', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.newEvent.location = {
        place_id: 'Bla',
        formatted_address: 'bla'
      };
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("organizer.events.list");
    });

    it('Should newEvent be empty', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.newEvent.location = {
        place_id: 'Bla',
        formatted_address: 'bla'
      };
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( addEventController.newEvent ).to.be.empty;
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to createEvent method success without imageURI', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();
  	var dataEvent = mockData.eventService.createEvent();

    beforeEach(function() {
    	$httpBackend.whenPOST( URL_REST + 'events').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.newEvent.location = {
        place_id: 'Bla',
        formatted_address: 'bla'
      };
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
      addEventController.newEvent.location = {
        place_id: 'Bla',
        formatted_address: 'bla'
      };
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.nextViewOptions).to.have.been.called();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
    });

    it('Should be called $cordovaToast.showShortBottom method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.newEvent.location = {
        place_id: 'Bla',
        formatted_address: 'bla'
      };
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });

    it('Should be redirect', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.newEvent.location = {
        place_id: 'Bla',
        formatted_address: 'bla'
      };
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("organizer.events.list");
    });

    it('Should newEvent be empty', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.newEvent.location = {
        place_id: 'Bla',
        formatted_address: 'bla'
      };
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
  	var dataEvent = mockData.eventService.createEvent();

    beforeEach(function() {
    	$httpBackend.whenPOST( URL_REST + 'events').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  		$httpBackend.whenPOST('https://api.imgur.com/3/image').respond(400, dataImage);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.newEvent.location = {
        place_id: 'Bla',
        formatted_address: 'bla'
      };
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
  	//var dataEvent = mockData.eventService.createEvent();
  	var dataEvent = mockData.failed();

    beforeEach(function() {
    	$httpBackend.whenPOST( URL_REST + 'events').respond(400, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  		$httpBackend.whenPOST('https://api.imgur.com/3/image').respond(200, dataImage);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.imageURI = "12346.jpg";
      addEventController.newEvent.location = {
        place_id: 'Bla',
        formatted_address: 'bla'
      };
      addEventController.createEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to openModalPerk method', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have openModalSponsor method', function() {
      chai.assert.isDefined( addEventController.openModalPerk );
      chai.assert.isFunction( addEventController.openModalPerk );
    });

    it('Should be called modalPerk.show method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.openModalPerk();
      $rootScope.$digest();
      chai.assert.isTrue(addEventController.modalPerk._isShown);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to closeModalPerk method', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have closeModalPerk method', function() {
      chai.assert.isDefined( addEventController.closeModalPerk );
      chai.assert.isFunction( addEventController.closeModalPerk );
    });

    it('Should be called modalPerk.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.closeModalPerk( mockForm );
      $rootScope.$digest();
      chai.assert.isFalse(addEventController.modalPerk._isShown);
    });

    it('Should be called utilsService.resetForm', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.closeModalPerk( mockForm );
      $rootScope.$digest();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should newPerk be empty', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.closeModalPerk( mockForm );
      $rootScope.$digest();
    	chai.expect( addEventController.newPerk ).to.be.empty;
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to createPerk method', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have createSponsor method', function() {
      chai.assert.isDefined( addEventController.createPerk );
      chai.assert.isFunction( addEventController.createPerk );
    });

    it('Should be called modalSponsor.show method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.createPerk();
      $rootScope.$digest();
      chai.assert.isTrue(addEventController.isNewPerk);
      chai.assert.isTrue(addEventController.modalPerk._isShown);
    });

    it('Should isNewSponsor be true', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.createPerk();
      $rootScope.$digest();
      chai.assert.isTrue(addEventController.isNewPerk);
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to editPerk method', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have editPerk method', function() {
      chai.assert.isDefined( addEventController.editPerk );
      chai.assert.isFunction( addEventController.editPerk );
    });

    it('Should be called modalSponsor.show method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
      	kind: "asas",
      	total_quantity: 0,
      	usd: 0
      }
      addEventController.editPerk( mockPerk );
      $rootScope.$digest();
      chai.assert.isTrue(addEventController.modalPerk._isShown);
    });

    it('Should newPerk be that mockPerk', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
      	kind: "asas",
      	total_quantity: 0,
      	usd: 0,
      }
      addEventController.editPerk( mockPerk );
      $rootScope.$digest();
      chai.expect( addEventController.newPerk ).to.eql( mockPerk );
    });

    it('Should isNewPerk be false', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
      	kind: "asas",
      	total_quantity: 0,
      	usd: 0
      }
      addEventController.editPerk( mockPerk );
      $rootScope.$digest();
      chai.assert.isFalse(addEventController.isNewPerk);
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to deletePerk method', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have editPerk method', function() {
      chai.assert.isDefined( addEventController.deletePerk );
      chai.assert.isFunction( addEventController.deletePerk );
    });

    it('Should be called modalPerk.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.newPerk = mockPerk;
      addEventController.newEvent.perks.push(mockPerk);
    	addEventController.deletePerk();
      $rootScope.$digest();
      chai.assert.isFalse(addEventController.modalPerk._isShown);
    });

    it('Should be perks be less', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var size = addEventController.newEvent.perks.length;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.newPerk = mockPerk;
      addEventController.newEvent.perks.push(mockPerk);
    	addEventController.deletePerk();
      $rootScope.$digest();
      chai.assert.equal( addEventController.newEvent.perks.length, size  );
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to submitPerk for newPerk', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

  	it('Should have submitPerk method', function() {
      chai.assert.isDefined( addEventController.submitPerk );
      chai.assert.isFunction( addEventController.submitPerk );
    });

  	it('Should be called modalPerk.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.isNewPerk = true;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.newPerk = mockPerk;
    	addEventController.submitPerk( mockForm );
      $rootScope.$digest();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should sponsors be +1 ', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var size = addEventController.newEvent.perks.length;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.isNewPerk = true;
      addEventController.newPerk = mockPerk;
    	addEventController.submitPerk( mockForm );
      $rootScope.$digest();
      chai.assert.equal( addEventController.newEvent.perks.length, size + 1 );
    });

    it('Should be called modalPerk.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.isNewPerk = true;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.newPerk = mockPerk;
    	addEventController.submitPerk( mockForm );
      $rootScope.$digest();
      chai.assert.isFalse(addEventController.modalPerk._isShown);
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to submitPerk for !newPerk', function(){

  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

  	it('Should have submitPerk method', function() {
      chai.assert.isDefined( addEventController.submitPerk );
      chai.assert.isFunction( addEventController.submitPerk );
    });

  	it('Should be called isNewPerk.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.isNewPerk = false;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.isNewPerk = mockPerk;
    	addEventController.submitPerk( mockForm );
      $rootScope.$digest();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should perks be equal that size', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var size = addEventController.newEvent.perks.length;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.isNewPerk = false;
      addEventController.newPerk = mockPerk;
    	addEventController.submitPerk( mockForm );
      $rootScope.$digest();
      chai.assert.equal( addEventController.newEvent.perks.length, size );
    });

    it('Should be called modalPerk.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      addEventController.isNewPerk = false;
      var mockPerk = {
      	id_event: "1002",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      addEventController.newPerk = mockPerk;
    	addEventController.submitPerk( mockForm );
      $rootScope.$digest();
      chai.assert.isFalse(addEventController.modalPerk._isShown);
    });

  });
});