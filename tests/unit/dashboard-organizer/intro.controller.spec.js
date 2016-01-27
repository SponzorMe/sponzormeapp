describe('Controller: IntroOrganizerCtrl', function(){

	var introOrganizerCtrl;
	var $rootScope, $q, $httpBackend, $state, $ionicSlideBoxDelegate, $ionicHistory, $ionicSideMenuDelegate;

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

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('app/dashboard-organizer/menu.html').respond(200, '');
    $httpBackend.whenGET('app/dashboard-organizer/home.html').respond(200, '');

    //Dependences
  	$state = $injector.get('$state');
  	$state = chai.spy.object($state, ['go']);

    $ionicSlideBoxDelegate = {
    	next: function(){},
    	previous: function(){}
    };
    $ionicSlideBoxDelegate = chai.spy.object($ionicSlideBoxDelegate, ['next','previous']);

    $ionicSideMenuDelegate = {
    	canDragContent: function(){}
    }
    $ionicSideMenuDelegate = chai.spy.object($ionicSideMenuDelegate, ['canDragContent']);
  	
    $ionicHistory = $injector.get('$ionicHistory');
    $ionicHistory = chai.spy.object($ionicHistory, ['clearCache', 'nextViewOptions', 'goBack']);

    introOrganizerCtrl = $controller('IntroOrganizerCtrl', {
  		'$state': $state,
      '$ionicSlideBoxDelegate': $ionicSlideBoxDelegate,
      '$ionicHistory': $ionicHistory,
      '$ionicSideMenuDelegate': $ionicSideMenuDelegate
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to slideIndex variable', function(){

    it('Should have slideIndex variable', function() {
      chai.assert.isDefined( introOrganizerCtrl.slideIndex );
      chai.assert.isNumber( introOrganizerCtrl.slideIndex );
    });

    it('Should slideIndex be equal that 0', function() {
      chai.assert.equal( introOrganizerCtrl.slideIndex, 0 );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to ionicSideMenuDelegate variable', function(){

    it('Should be called ionicSideMenuDelegate', function() {
      $rootScope.$digest();
      chai.expect($ionicSideMenuDelegate.canDragContent).to.have.been.called();
      chai.expect($ionicSideMenuDelegate.canDragContent).to.have.been.with(false);
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to startApp method', function(){

    it('Should have startApp method', function() {
      chai.assert.isDefined( introOrganizerCtrl.startApp );
      chai.assert.isFunction( introOrganizerCtrl.startApp );
    });

    it('Should be called $ionicHistory.nextViewOptions', function() {
    	$rootScope.$digest();
    	introOrganizerCtrl.startApp();
    	$rootScope.$digest();
      chai.expect($ionicHistory.nextViewOptions).to.have.been.called();
    });

    it('Should redirect sponzor.home', function() {
    	$rootScope.$digest();
    	introOrganizerCtrl.startApp();
    	$rootScope.$digest();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("organizer.home");
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to nextSlide method', function(){

    it('Should have nextSlide method', function() {
      chai.assert.isDefined( introOrganizerCtrl.nextSlide );
      chai.assert.isFunction( introOrganizerCtrl.nextSlide );
    });

    it('Should be called $ionicSlideBoxDelegate.next', function() {
    	$rootScope.$digest();
    	introOrganizerCtrl.nextSlide();
    	$rootScope.$digest();
      chai.expect($ionicSlideBoxDelegate.next).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to previousSlide method', function(){

    it('Should have previousSlide method', function() {
      chai.assert.isDefined( introOrganizerCtrl.previousSlide );
      chai.assert.isFunction(introOrganizerCtrl.previousSlide );
    });

    it('Should be called $ionicSlideBoxDelegate.previous', function() {
    	$rootScope.$digest();
    	introOrganizerCtrl.previousSlide();
    	$rootScope.$digest();
      chai.expect($ionicSlideBoxDelegate.previous).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to slideChanged method', function(){

    it('Should have slideChanged method', function() {
      chai.assert.isDefined( introOrganizerCtrl.slideChanged );
      chai.assert.isFunction(introOrganizerCtrl.slideChanged );
    });

    it('Should be called $ionicSlideBoxDelegate.previous', function() {
    	$rootScope.$digest();
    	introOrganizerCtrl.slideChanged(2);
    	$rootScope.$digest();
      chai.assert.equal(introOrganizerCtrl.slideIndex, 2);
    });

  });

});