describe("UserService Unit Tests", function() {

  var $httpBackend, $rootScope, userService;
  var mocks = {};

  // load the module for our app
  beforeEach(module('app'));

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));
  
  beforeEach(inject(function($injector, _userService_) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    //Service
    userService = _userService_;
    //Mocks
    mocks.login = mockData.UserService.login();
    mocks.getUser = mockData.UserService.getUser();
  }));

  it('should be registered', function() {
    expect(userService).not.toBe(null);
  });

  /*-------------  LOGIN  --------------- */
  describe('login function', function() {

    it('should exist', function () {
      expect(userService.login).not.toBe(null);
    });
    
    it('login success', function (done) {

      $httpBackend
        .when('POST', 'http://apistaging.sponzor.me/auth')
        .respond(200, mocks.login );

      userService
        .login('organizer@sponzor.me', 'sponzorme')
        .then(function( user ){
          expect(user).toEqual(jasmine.any(Object));
          expect(user.email).toEqual("organizer@sponzor.me");
          done();
        });

      $rootScope.$apply();
      $httpBackend.flush();
      
    });
    
  });

  //getUser
  describe('Get One User', function() {
    it('should exist', function () {
      expect(userService.getUser).not.toBe(null);
    });
    
    it('get success', function (done) {

      var eventId = '1';

      $httpBackend
        .when('GET', 'http://apistaging.sponzor.me/users/' + eventId)
        .respond(200, mocks.getUser );

      userService
        .getUser( eventId )
        .then(function( event ){
          expect(event).toEqual(jasmine.any(Object));
          done();
        });

      $rootScope.$apply();
      $httpBackend.flush();
      
    });
  });
  
  
  //createUser
  describe('create User', function() {
  });
  //deleteUser
  describe('Delete User', function() {
  });
  //editUserPatch
  describe('Edit User PATCH', function() {
  });
  //editUserPut
  describe('Edit User PUT', function() {
  });
});
