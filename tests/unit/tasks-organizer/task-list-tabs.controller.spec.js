describe("Controller: TaskTabsCtrl", function() {

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
  	$rootScopeBroadcast = chai.spy.on( $rootScope, '$broadcast' );;

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('templates/tasks-organizer/task-modal.html').respond(200, '');
    
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    //Dependences
    //Services
    userService = $injector.get('userService');
    utilsService = $injector.get('utilsService');
    userAuthService = $injector.get('userAuthService');

    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );
    
    pastTasksCtrl = $controller('TaskTabsCtrl', {
      '$rootScope': $rootScope,
      'userAuthService': userAuthService,
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
  describe('Tests to count_tasks variable', function(){

    it('Should have count_tasks variable', function() {
      chai.assert.isDefined( pastTasksCtrl.count_tasks );
      chai.assert.isNumber( pastTasksCtrl.count_tasks );
    });

    it('Should count_tasks be equal that 0', function() {
      chai.assert.equal( pastTasksCtrl.count_tasks, 4 );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to count_past_tasks variable', function(){

    it('Should have count_past_tasks variable', function() {
      chai.assert.isDefined( pastTasksCtrl.count_past_tasks );
      chai.assert.isNumber( pastTasksCtrl.count_past_tasks );
    });

    it('Should count_past_tasks be equal that 0', function() {
      chai.assert.equal( pastTasksCtrl.count_past_tasks, 2 );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests called TaskTabsCtrl:TaskTabsCtrl', function(){
    
    it('Should have called a TaskTabsCtrl:TaskTabsCtrl', function() {
    	$rootScope.$digest();
      $rootScope.$broadcast('TaskTabsCtrl:TaskTabsCtrl');
      chai.assert.equal( pastTasksCtrl.userAuth, $localStorage.userAuth );
      chai.assert.equal( pastTasksCtrl.count_tasks, 4);
      chai.assert.equal( pastTasksCtrl.count_past_tasks, 2);
    });
    
  });
	

});