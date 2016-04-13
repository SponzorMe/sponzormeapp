describe("Controller: PastTasksCtrl", function() {

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

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('templates/tasks-organizer/task-modal.html').respond(200, '');

    //Dependences
    //ionic
    $ionicModal = $injector.get('$ionicModal');
    //Services
    perkTaskService = $injector.get('perkTaskService');
    userService = $injector.get('userService');
    utilsService = $injector.get('utilsService');
    userAuthService = $injector.get('userAuthService');
    notificationService = $injector.get('notificationService');

    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );
    
    pastTasksCtrl = $controller('PastTasksCtrl', {
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
      chai.assert.isDefined( pastTasksCtrl.userAuth );
      chai.assert.isObject( pastTasksCtrl.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( pastTasksCtrl.userAuth, $localStorage.userAuth );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method', function(){

    it('Should have doRefresh method', function() {
      chai.assert.isDefined( pastTasksCtrl.doRefresh );
      chai.assert.isFunction( pastTasksCtrl.doRefresh );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( pastTasksCtrl.userAuth, $localStorage.userAuth );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method success', function(){
    
  	var dataUser = mockData.userService.home("0");
    dataUser.data.user.type = "0";
 
  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'home/1').respond(200, dataUser);
  	});

    it('Should have an event in the array', function() {
    	pastTasksCtrl.doRefresh();
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( pastTasksCtrl.events.length, 1 );
    });
    
    it('Should be called broadcast scroll.refreshComplete', function() {
    	pastTasksCtrl.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method failed', function(){
    
  	var data = mockData.failed();
 
  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'home/1').respond(400, data);
  	});

    it('Should be called broadcast scroll.refreshComplete', function() {
    	pastTasksCtrl.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

  });

	

});