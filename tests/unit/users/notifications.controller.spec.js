describe("Controller: NotificationsCtrl", function() {

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
    $httpBackend = $injector.get('$httpBackend');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    //Dependences
    //Services
    userService =  $injector.get('userService');
    userAuthService =  $injector.get('userAuthService');
    notificationService =  $injector.get('notificationService');
    
    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) ); 

    notificationsCtrl = $controller('NotificationsCtrl', {
  		'userAuthService': userAuthService, 
      'notificationService': notificationService
  	});

  }));

  ////////////////////////////////////////////////////////////
  describe('Tests to variables', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( notificationsCtrl.userAuth );
      chai.assert.isObject( notificationsCtrl.userAuth );
    });
    
    it('Should have userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal(  notificationsCtrl.userAuth , $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to notifications array', function(){

    it('Should notifications be an array ', function() {
    	chai.assert.isArray( notificationsCtrl.notifications );
    });

  });
  
});