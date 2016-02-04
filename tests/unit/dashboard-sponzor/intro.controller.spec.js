describe('Controller: IntroSponzorCtrl', function(){

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
    $httpBackend.whenGET('app/dashboard-sponzor/menu.html').respond(200, '');
    $httpBackend.whenGET('app/dashboard-sponzor/home.html').respond(200, '');

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

    introSponzorCtrl = $controller('IntroSponzorCtrl', {
  		'$state': $state,
      '$ionicSlideBoxDelegate': $ionicSlideBoxDelegate,
      '$ionicHistory': $ionicHistory,
      '$ionicSideMenuDelegate': $ionicSideMenuDelegate
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to slideIndex variable', function(){

    it('Should have slideIndex variable', function() {
      chai.assert.isDefined( introSponzorCtrl.slideIndex );
      chai.assert.isNumber( introSponzorCtrl.slideIndex );
    });

    it('Should slideIndex be equal that 0', function() {
      chai.assert.equal( introSponzorCtrl.slideIndex, 0 );
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
      chai.assert.isDefined( introSponzorCtrl.startApp );
      chai.assert.isFunction( introSponzorCtrl.startApp );
    });

    it('Should be called $ionicHistory.nextViewOptions', function() {
    	$rootScope.$digest();
    	introSponzorCtrl.startApp();
    	$rootScope.$digest();
      chai.expect($ionicHistory.nextViewOptions).to.have.been.called();
    });

    it('Should redirect sponzor.home', function() {
    	$rootScope.$digest();
    	introSponzorCtrl.startApp();
    	$rootScope.$digest();
      chai.expect($state.go).to.have.been.called();
      chai.expect($state.go).to.have.been.with("sponzor.home");
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to nextSlide method', function(){

    it('Should have nextSlide method', function() {
      chai.assert.isDefined( introSponzorCtrl.nextSlide );
      chai.assert.isFunction( introSponzorCtrl.nextSlide );
    });

    it('Should be called $ionicSlideBoxDelegate.next', function() {
    	$rootScope.$digest();
    	introSponzorCtrl.nextSlide();
    	$rootScope.$digest();
      chai.expect($ionicSlideBoxDelegate.next).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to previousSlide method', function(){

    it('Should have previousSlide method', function() {
      chai.assert.isDefined( introSponzorCtrl.previousSlide );
      chai.assert.isFunction(introSponzorCtrl.previousSlide );
    });

    it('Should be called $ionicSlideBoxDelegate.previous', function() {
    	$rootScope.$digest();
    	introSponzorCtrl.previousSlide();
    	$rootScope.$digest();
      chai.expect($ionicSlideBoxDelegate.previous).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to slideChanged method', function(){

    it('Should have slideChanged method', function() {
      chai.assert.isDefined( introSponzorCtrl.slideChanged );
      chai.assert.isFunction(introSponzorCtrl.slideChanged );
    });

    it('Should be called $ionicSlideBoxDelegate.previous', function() {
    	$rootScope.$digest();
    	introSponzorCtrl.slideChanged(2);
    	$rootScope.$digest();
      chai.assert.equal(introSponzorCtrl.slideIndex, 2);
    });

  });

});