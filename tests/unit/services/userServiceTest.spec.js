describe("User Service Unit Tests", function() {

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  var userRequest;

  var httpBackend = null;

  beforeEach(inject(function($injector, _userService_) {
    userRequest = _userService_;
  }));
  //allCategories

  describe('All Categories', function() {

    var $httpBackend;
    var token;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'https://apistaging.sponzor.me/users').respond(200, {
        "success": true
      });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('All users.', function() {
      var returnData = {
        "success": true
      };
      var returnedPromise = userRequest.allUsers();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });

  //oneUser
  /*
  describe('One User', function() {
    var $httpBackend;
    var userId = '3';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://apistaging.sponzor.me/users/'+userId).respond(200, {
      "data": {
        "user": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": []
        }
      }
    });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
      "title": 'Sponzorme EN'
    });
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
      "title": 'Sponzorme PT'
    });
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {
      "title": 'Sponzorme ES'
    });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('A user.', function() {
      var returnData = {
        "data": {
          "user": {
            "id": "3",
            "title": "Dancing",
            "body": "All About the Bussines!",
            "lang": "en",
            "events": [],
          }
        }
      };
      var returnedPromise = userRequest.getUser(userId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.id).toEqual(userId);
    });
  });
  //createUser
/*
  describe('create User', function() {
    var $httpBackend;
    var user = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'http://apistaging.sponzor.me/users').respond(200, {
        "message": "Inserted",
        "user": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      });
      $httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Create User.', function() {
      var returnData = {
        "message": "Inserted",
        "user": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      };
      var returnedPromise = userRequest.createUser(user);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.message).toEqual(returnData.message);
    });
  });
  //deleteUser
  describe('Delete User', function() {
    var $httpBackend;
    var userId = '15';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('DELETE', 'http://apistaging.sponzor.me/users/'+userId).respond(200, {
        "message": "Deleted"
      });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Delete User.', function() {
      var returnData = {"message": "Deleted"};
      var returnedPromise = userRequest.deleteUser(userId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  //editUserPatch
  describe('Edit User PATCH', function() {
    var $httpBackend;
    var userId = '15';
    var user = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PATCH', 'http://apistaging.sponzor.me/users/'+userId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "user": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      });
      $httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Edit User PATCH', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "user": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      console.log("userID: " + userId);
      console.log("user:" + JSON.stringify(user));
      var returnedPromise = userRequest.editUserPatch(userId, user);
      var result;
      $httpBackend.flush();
      returnedPromise.then(function(response) {
        result = response;
      });
      console.log(result);
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  */

  //editUserPut
 /*
  describe('Edit User PUT', function() {
    var $httpBackend;
    var userId = '15';
    var user = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PUT', 'http://apistaging.sponzor.me/users/'+userId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "user": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      });$httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Edit User PUT', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "user": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = userRequest.editUserPut(userId, user);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      console.log(result);
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });*/
});