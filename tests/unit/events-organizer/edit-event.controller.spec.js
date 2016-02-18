describe("Controller: EditEventController", function() {

	var editEventController, eventService, userService, utilsService, eventTypeService, perkService, imgurService, mockForm;
	var $rootScope, $q, httpBackend, $scope, $translate, $localStorage, $cordovaDatePicker, $cordovaCamera, $ionicModal, $cordovaToast, $ionicHistory;

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
    $httpBackend.whenGET('app/events-organizer/perk-edit-modal.html').respond(200, '');

    //Dependences
    $scope = $rootScope.$new();
  	$translate = $injector.get('$translate');
  	$localStorage = $injector.get('$localStorage');
  	
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
    $ionicHistory.clearCache = function () {
      var q = $q.defer();
      q.resolve();
      return q.promise;
    }
    $ionicHistory = chai.spy.object($ionicHistory, ['clearCache', 'nextViewOptions', 'goBack']);

    imgurService = $injector.get('imgurService');
    imgurService = chai.spy.object( imgurService, ['uploadImage']);

    $stateParams = $injector.get('$stateParams');

    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }
    
    $stateParams.id = 1;
    $localStorage.userAuth = mockData.userService.login().user;

    editEventController = $controller('EditEventController', {
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
	    '$stateParams': $stateParams
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( editEventController.userAuth );
      chai.assert.isObject( editEventController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( editEventController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to newEvent variable', function(){

    it('Should have newEvent variable', function() {
      chai.assert.isDefined( editEventController.newEvent );
      chai.assert.isObject( editEventController.newEvent );
    });

    it('Should newEvent be empty', function() {
    	chai.expect( editEventController.newEvent ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to newPerk variable', function(){

    it('Should have newPerk variable', function() {
      chai.assert.isDefined( editEventController.newPerk );
      chai.assert.isObject( editEventController.newPerk );
    });

    it('Should newPerk be empty', function() {
    	chai.expect( editEventController.newPerk ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to isNewPerk variable', function(){

    it('Should have isNewPerk variable', function() {
      chai.assert.isDefined( editEventController.isNewPerk );
      chai.assert.isBoolean( editEventController.isNewPerk );
    });

    it('Should isNewPerk be true', function() {
    	chai.assert.isTrue( editEventController.isNewPerk );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to eventTypes array', function(){

    it('Should have eventTypes array', function() {
      chai.assert.isDefined( editEventController.eventTypes );
      chai.assert.isArray( editEventController.eventTypes );
    });

    it('Should eventTypes be empty', function() {
    	chai.expect( editEventController.eventTypes ).to.be.empty;
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to modalPerk variable', function(){

    it('Should have modalPerk variable', function() {
      chai.assert.isDefined( editEventController.modalPerk );
    });

    it('Should perks be null', function() {
    	chai.assert.isNull( editEventController.modalPerk );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to imageURI variable', function(){

    it('Should have imageURI variable', function() {
      chai.assert.isDefined( editEventController.imageURI );
    });

    it('Should imageURI be null', function() {
    	chai.assert.isNull( editEventController.imageURI );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to getEvent success', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

  	it('Should be called utilsService methods', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

    it('Should newEvent not be empty', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( editEventController.newEvent ).to.not.be.empty;
    });

    it('Should dates is format correct', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(editEventController.newEvent.start, '2016-01-31');
      chai.assert.equal(editEventController.newEvent.starttime, '09:57:00');
      chai.assert.equal(editEventController.newEvent.end, moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD'));
      chai.assert.isArray(editEventController.newEvent.perks);
      //chai.assert.equal(editEventController.newEvent.endtime, moment(new Date().getTime()).add(1, 'days').format('YYYY-MM-DD');
    });

    it('Should access be boolean', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isBoolean(editEventController.newEvent.access);
    });

    it('Should eventTypes be an array', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isArray( editEventController.eventTypes );
      chai.expect( editEventController.eventTypes ).to.eql( dataEventTypes.eventTypes );
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to getEvent failed', function(){

  	var dataEvent = mockData.failed();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(400, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

  	it('Should be called utilsService methods', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
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
      chai.assert.isDefined( editEventController.clickedStartDate );
      chai.assert.isFunction( editEventController.clickedStartDate );
    });

    it('Should start be format date correct', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      $cordovaDatePicker.date = new Date(2014,2,2);
      editEventController.clickedStartDate();
      $rootScope.$digest();
      chai.assert.equal( editEventController.newEvent.start, '2014-03-02' );
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
      chai.assert.isDefined( editEventController.clickedEndDate );
      chai.assert.isFunction( editEventController.clickedEndDate );
    });

    it('Should start be format date correct', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      $cordovaDatePicker.date = new Date(2016,2,2);
      editEventController.clickedEndDate();
      $rootScope.$digest();
      chai.assert.equal( editEventController.newEvent.end, '2016-03-02' );
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
      chai.assert.isDefined( editEventController.clickedStartTime );
      chai.assert.isFunction( editEventController.clickedStartTime );
    });

    it('Should start be format date correct', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      $cordovaDatePicker.date = new Date(2016,2,2,2,3,4);
      editEventController.clickedStartTime();
      $rootScope.$digest();
      chai.assert.equal( editEventController.newEvent.starttime, '02:03:04' );
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
      chai.assert.isDefined( editEventController.clickedEndTime );
      chai.assert.isFunction( editEventController.clickedEndTime );
    });

    it('Should start be format date correct', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      $cordovaDatePicker.date = new Date(2016,2,2,13,3,24);
      editEventController.clickedEndTime();
      $rootScope.$digest();
      chai.assert.equal( editEventController.newEvent.endtime, '13:03:24' );
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
      chai.assert.isDefined( editEventController.getPhoto );
      chai.assert.isFunction( editEventController.getPhoto );
    });

    it('Should be the image equal before call getPhoto', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      $cordovaCamera.imageData = '123456.jpg';
      var image = "data:image/jpeg;base64," + $cordovaCamera.imageData;
      editEventController.getPhoto();
      $rootScope.$digest();
      chai.assert.equal(editEventController.imageURI, $cordovaCamera.imageData);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to updateEvent method', function(){

    it('Should have updateEvent method', function() {
      chai.assert.isDefined( editEventController.updateEvent );
      chai.assert.isFunction( editEventController.updateEvent );
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to updateEvent method success with imageURI', function(){

    var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();
  	var dataImage = mockData.imgurService.uploadImage();
  	var dataEditEvent = mockData.eventService.editEventPatch();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  		$httpBackend.whenPOST('https://api.imgur.com/3/image').respond(200, dataImage);
  		$httpBackend.whenPUT( URL_REST + 'events/1').respond(200, dataEditEvent);
  	});

  	it('Should be called uploadImage', function() {
  		$rootScope.$digest();
      $httpBackend.flush();
      editEventController.imageURI = "12346.jpg";
      editEventController.updateEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(imgurService.uploadImage).to.have.been.called();
      chai.expect(imgurService.uploadImage).to.have.been.with(editEventController.imageURI);
    });

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.imageURI = "12346.jpg";
      editEventController.updateEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should be called $ionicHistory methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.imageURI = "12346.jpg";
      editEventController.updateEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.nextViewOptions).to.have.been.called();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
      chai.expect($ionicHistory.goBack).to.have.been.called();
    });

    it('Should be called $cordovaToast.showShortBottom method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.imageURI = "12346.jpg";
      editEventController.updateEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });

    it('Should newEvent be empty', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.imageURI = "12346.jpg";
      editEventController.updateEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( editEventController.newEvent ).to.be.empty;
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to updateEvent method success without imageURI', function(){

    var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();
  	var dataEditEvent = mockData.eventService.editEventPatch();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  		$httpBackend.whenPUT( URL_REST + 'events/1').respond(200, dataEditEvent);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.updateEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should be called $ionicHistory methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.updateEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($ionicHistory.nextViewOptions).to.have.been.called();
      chai.expect($ionicHistory.clearCache).to.have.been.called();
      chai.expect($ionicHistory.goBack).to.have.been.called();
    });

    it('Should be called $cordovaToast.showShortBottom method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.updateEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });

    it('Should newEvent be empty', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.updateEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( editEventController.newEvent ).to.be.empty;
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to updateEvent method failed with imageURI by uploadImage', function(){

    var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();
  	var dataImage = mockData.failed();
  	var dataEditEvent = mockData.eventService.editEventPatch();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  		$httpBackend.whenPOST('https://api.imgur.com/3/image').respond(400, dataImage);
  		$httpBackend.whenPUT( URL_REST + 'events/1').respond(200, dataEditEvent);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.imageURI = "12346.jpg";
      editEventController.updateEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.alert).to.have.been.called();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to updateEvent method failed with imageURI by editEventPatch', function(){

    var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();
  	var dataImage = mockData.imgurService.uploadImage();
  	//var dataEditEvent = mockData.eventService.editEventPatch();
  	var dataEditEvent = mockData.failed();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  		$httpBackend.whenPOST('https://api.imgur.com/3/image').respond(200, dataImage);
  		$httpBackend.whenPUT( URL_REST + 'events/1').respond(400, dataEditEvent);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.imageURI = "12346.jpg";
      editEventController.updateEvent( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.alert).to.have.been.called();
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to openModalPerk method', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have openModalPerk method', function() {
      chai.assert.isDefined( editEventController.openModalPerk );
      chai.assert.isFunction( editEventController.openModalPerk );
    });

    it('Should be called modalPerk.show method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.openModalPerk();
      $rootScope.$digest();
      chai.assert.isTrue(editEventController.modalPerk._isShown);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to closeModalPerk method', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have closeModalPerk method', function() {
      chai.assert.isDefined( editEventController.closeModalPerk );
      chai.assert.isFunction( editEventController.closeModalPerk );
    });

    it('Should be called modalPerk.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.closeModalPerk( mockForm);
      $rootScope.$digest();
      chai.assert.isFalse(editEventController.modalPerk._isShown);
    });

    it('Should be called utilsService.resetForm', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.closeModalPerk( mockForm );
      $rootScope.$digest();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should newPerk be empty', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.closeModalPerk( mockForm );
      $rootScope.$digest();
    	chai.expect( editEventController.newPerk ).to.be.empty;
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

    it('Should have createPerk method', function() {
      chai.assert.isDefined( editEventController.createPerk );
      chai.assert.isFunction( editEventController.createPerk );
    });

    it('Should be called modalPerk.show method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.createPerk();
      $rootScope.$digest();
      chai.assert.isTrue(editEventController.isNewPerk);
      chai.assert.isTrue(editEventController.modalPerk._isShown);
    });

    it('Should isNewPerk be true', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.createPerk();
      $rootScope.$digest();
      chai.assert.isTrue(editEventController.isNewPerk);
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to editPerk method', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

    it('Should have editPerk method', function() {
      chai.assert.isDefined( editEventController.editPerk );
      chai.assert.isFunction( editEventController.editPerk );
    });

    it('Should be called modalPerk.show method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
      	kind: "asas",
      	total_quantity: 0,
      	usd: 0
      }
      editEventController.editPerk( mockPerk );
      $rootScope.$digest();
      chai.assert.isTrue(editEventController.modalPerk._isShown);
    });

    it('Should newPerk be that mockPerk', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
      	kind: "asas",
      	total_quantity: 0,
      	usd: 0,
      }
      editEventController.editPerk( mockPerk );
      $rootScope.$digest();
      chai.expect( editEventController.newPerk ).to.eql( mockPerk );
    });

    it('Should isNewPerk be false', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockPerk = {
      	kind: "asas",
      	total_quantity: 0,
      	usd: 0
      }
      editEventController.editPerk( mockPerk );
      $rootScope.$digest();
      chai.assert.isFalse(editEventController.isNewPerk);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to submitPerk for newPerk', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

  	it('Should have submitPerk method', function() {
      chai.assert.isDefined( editEventController.submitPerk );
      chai.assert.isFunction( editEventController.submitPerk );
    });

  	it('Should be called modalPerk.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.isNewPerk = true;
      var mockPerk = {
      	id_event: "1",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      editEventController.newPerk = mockPerk;
    	editEventController.submitPerk( mockForm );
      $rootScope.$digest();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should perks be +1 ', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var size = editEventController.newEvent.perks.length;
      var mockPerk = {
      	id_event: "1",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      editEventController.isNewPerk = true;
      editEventController.newPerk = mockPerk;
    	editEventController.submitPerk( mockForm );
      $rootScope.$digest();
      chai.assert.equal( editEventController.newEvent.perks.length, size + 1 );
    });

    it('Should be called modalPerk.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.isNewPerk = true;
      var mockPerk = {
      	id_event: "1",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      editEventController.newPerk = mockPerk;
    	editEventController.submitPerk( mockForm );
      $rootScope.$digest();
      chai.assert.isFalse(editEventController.modalPerk._isShown);
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to submitPerk for !newPerk', function(){

  	var dataEvent = mockData.eventService.getEvent();
  	var dataEventTypes = mockData.eventTypeService.allEventTypes();

    beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'events/1').respond(200, dataEvent);
  		$httpBackend.whenGET( URL_REST + 'event_types').respond(200, dataEventTypes);
  	});

  	it('Should have submitPerk method', function() {
      chai.assert.isDefined( editEventController.submitPerk );
      chai.assert.isFunction( editEventController.submitPerk );
    });

  	it('Should be called modalPerk.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.isNewPerk = false;
      var mockPerk = {
      	id_event: "1",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      editEventController.newPerk = mockPerk;
    	editEventController.submitPerk( mockForm );
      $rootScope.$digest();
      chai.expect(utilsService.resetForm).to.have.been.called();
    });

    it('Should perks be equal that size', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var size = editEventController.newEvent.perks.length;
      var mockPerk = {
      	id_event: "1",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      editEventController.isNewPerk = false;
      editEventController.newPerk = mockPerk;
    	editEventController.submitPerk( mockForm );
      $rootScope.$digest();
      chai.assert.equal( editEventController.newEvent.perks.length, size );
    });

    it('Should be called modalPerk.hide method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      editEventController.isNewPerk = false;
      var mockPerk = {
      	id_event: "1",
				kind: "A",
				reserved_quantity: "0",
				total_quantity: "2",
				usd: "10"
      }
      editEventController.newPerk = mockPerk;
    	editEventController.submitPerk( mockForm );
      $rootScope.$digest();
      chai.assert.isFalse(editEventController.modalPerk._isShown);
    });

  });

});