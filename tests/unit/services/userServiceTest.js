describe("User Service Unit Tests", function() {

  beforeEach(function() {
    module('userService');
  });

  var userService;

  var httpBackend = null;

  beforeEach(inject(function(userService) {
    userService = _userService_;
  }));

  //allCategories
  describe('All Categories', function() {

    var $httpBackend;
    //var token;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://api.sponzor.me/users').respond(200, {
        "success": true
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });



  });
  //oneUser
  describe('Get One User', function() {
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
