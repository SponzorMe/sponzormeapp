describe("Controller: InviteUsersCtrl", function() {

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

    //Dependences with spy
    userService =  $injector.get('userService');
    utilsService =  $injector.get('utilsService');
    userAuthService =  $injector.get('userAuthService');

    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );

    inviteUsersController = $controller('InviteUsersCtrl', {
  		'userService': userService, 
      'utilsService': utilsService,
      'userAuthService': userAuthService
  	});

  }));

  ////////////////////////////////////////////////////////////
  describe('Tests to friend variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( inviteUsersController.friend );
      chai.assert.isObject( inviteUsersController.friend );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have userAuth variable', function() {
      chai.assert.isDefined( inviteUsersController.userAuth );
      chai.assert.isObject( inviteUsersController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( inviteUsersController.userAuth, $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to inviteFriend method', function(){

    it('Should have methods method', function() {
      chai.assert.isDefined( inviteUsersController.inviteFriend );
      chai.assert.isFunction( inviteUsersController.inviteFriend );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Tests to inviteFriend method success', function(){

  	var data = mockData.userService.invitedUser();
  	
    beforeEach(function() {
  		$httpBackend.whenPOST( URL_REST + 'invite_friend').respond(200, data);
  	});

    it('Should friend be empty', function() {
    	inviteUsersController.friend.email = 'mail@domain.com';
      inviteUsersController.inviteFriend( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( inviteUsersController.friend ).to.be.empty;
    });

  });

	////////////////////////////////////////////////////////////
  describe('Tests to inviteFriend method failed', function(){

  	var data = mockData.failed();
  	
    beforeEach(function() {
  		$httpBackend.whenPOST( URL_REST + 'invite_friend').respond(400, data);
  	});

    it('Should be called utilsService methods', function() {
    	inviteUsersController.friend.email = 'mail@domain.com';
      inviteUsersController.inviteFriend( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      //chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

});