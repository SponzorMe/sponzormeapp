describe("Controller: InviteUsersController", function() {

	var inviteUsersController, userService, utilsService, mockForm;
	var $rootScope, $httpBackend, $localStorage;

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

    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});

    //Dependences with spy
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $localStorage = $injector.get('$localStorage');
    userService =  chai.spy.object($injector.get('userService'), ['editUserPatch']);

    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    $localStorage.userAuth = mockData.userService.login().user;

    inviteUsersController = $controller('InviteUsersController', {
  		'userService': userService, 
	    'utilsService': utilsService,
	    '$localStorage': $localStorage
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
  	
    beforeEach(inject(function($controller) {
  		$httpBackend.whenPOST('https://apilocal.sponzor.me/invite_friend').respond(200, data);
  	}));

    it('Should be called utilsService methods', function() {
    	inviteUsersController.friend.email = 'mail@domain.com';
      inviteUsersController.inviteFriend( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.showLoad).to.have.been.called();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.resetForm).to.have.been.called();
      chai.expect(utilsService.alert).to.have.been.called();
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
  	
    beforeEach(inject(function($controller) {
  		$httpBackend.whenPOST('https://apilocal.sponzor.me/invite_friend').respond(400, data);
  	}));

    it('Should be called utilsService methods', function() {
    	inviteUsersController.friend.email = 'mail@domain.com';
      inviteUsersController.inviteFriend( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

});