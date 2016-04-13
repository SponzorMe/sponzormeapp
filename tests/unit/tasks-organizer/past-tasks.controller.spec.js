describe("Controller: PastTaskCtrl", function() {

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
  	$rootScopeBroadcast = chai.spy.on(_$rootScope_, '$broadcast');
    
    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('templates/tasks-organizer/task-modal.html').respond(200, {});
    

    //Dependences
    //Ionic
    $ionicModal =  $injector.get('$ionicModal');
    //Services
    perkTaskService =  $injector.get('perkTaskService');
    userService =  $injector.get('userService');
    utilsService = $injector.get('utilsService');
    userAuthService =  $injector.get('userAuthService');
    notificationService =  $injector.get('notificationService');
    
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );

    pastTaskCtrl = $controller('PastTaskCtrl', {
  		'$scope': $scope,
      '$rootScope': $rootScope,
      '$ionicModal': $ionicModal,
      'perkTaskService': perkTaskService,
      'userService': userService,
      'utilsService': utilsService,
      'userAuthService': userAuthService,
      'notificationService': notificationService
  	});

  }));

	////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( pastTaskCtrl.userAuth );
      chai.assert.isObject( pastTaskCtrl.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( pastTaskCtrl.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to tasks variable', function(){

    it('Should have tasks variable', function() {
      chai.assert.isDefined( pastTaskCtrl.events );
      chai.assert.isArray(pastTaskCtrl.events );
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to showEmptyState variable', function(){

    it('Should have showEmptyState variable', function() {
      chai.assert.isDefined( pastTaskCtrl.showEmptyState );
      chai.assert.isTrue(pastTaskCtrl.showEmptyState );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to events array', function(){

  	it('Should have events array', function() {
      chai.assert.isDefined( pastTaskCtrl.events );
      chai.assert.isArray( pastTaskCtrl.events );
      chai.assert.equal( pastTaskCtrl.events.length, 0 );
    });
    
    it('Should events.length be equal that 0', function() {
      chai.assert.equal( pastTaskCtrl.events.length, 0 );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to loadModal', function(){

  	it('Should have modalTask variable', function() {
      $rootScope.$digest();
      chai.assert.isDefined( pastTaskCtrl.modalTask );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method', function(){

  	it('Should have user variable', function() {
      chai.assert.isDefined( pastTaskCtrl.doRefresh );
      chai.assert.isFunction( pastTaskCtrl.doRefresh );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method success', function(){

  	var userData = mockData.userService.home("0");
    userData.data.user.type = "0";
 
    beforeEach(function() {
      $httpBackend.whenGET( URL_REST + 'home/1').respond(200, userData);
    });

    it('Should have an event array', function() {
      pastTaskCtrl.doRefresh();
      $httpBackend.flush();
      chai.assert.equal( pastTaskCtrl.events.length, 0);
    });

    it('Should be called broadcast', function() {
    	pastTaskCtrl.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($rootScopeBroadcast).to.have.been.called();
    });

    it('Should be called broadcast scroll.refreshComplete', function() {
    	pastTaskCtrl.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

  });
  
  

  
});