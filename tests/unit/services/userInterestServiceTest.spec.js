describe("User Category Service Unit Tests", function() {

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  var userInterestRequest;
  var httpBackend = null;
  var $scope;
  var $q;
  var deferred;

  beforeEach(inject(function($injector, _$rootScope_, _$q_, _userInterestService_) {
    $q = _$q_;
    $scope = _$rootScope_;
    deferred = _$q_.defer();
    userInterestRequest = _userInterestService_;
    spyOn(_userInterestService_, 'createUserInterest').and.returnValue(deferred.promise);
  }));
  //allCategories
  /*
  describe('All Categories', function() {

    var $httpBackend;
    var token;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://apistaging.sponzor.me/user_interests').respond(200, {
        "success": true
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('All user_interests.', function() {
      var returnData = {
        "success": true
      };
      var returnedPromise = userInterestRequest.allUserInterests();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
    });
  });
  */
  //oneCategory
  /*
  describe('One Category', function() {
    var $httpBackend;
    var userInterestId = '3';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://apistaging.sponzor.me/user_interests/'+userInterestId).respond(200, {
      "data": {
        "category": {
          "id": "3",
          "title": "Dancing",
          "body": "All About the Bussines!",
          "lang": "en",
          "events": []
        }
      }
    });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('A category.', function() {
      var returnData = {
        "data": {
          "category": {
            "id": "3",
            "title": "Dancing",
            "body": "All About the Bussines!",
            "lang": "en",
            "events": [],
          }
        }
      };
      var returnedPromise = userInterestRequest.oneUserInterest(userInterestId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.data.category.id).toEqual(userInterestId);
    });
  });
  */
  //createCategory
<<<<<<< HEAD
=======
  /*
>>>>>>> 39bb856024d016f476fc76afbb8bbc61fce8b0ef
  describe('create Category', function() {
    var category = {
      "title": "Test",
      "body": "test",
      "lang": "123"};

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {
      "title": 'Sponzorme EN'
    });
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
      "title": 'Sponzorme PT'
    });
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {
      "title": 'Sponzorme ES'
    });

    it('Create User Interest.', function() {
      var returnData = {
        "message": "Inserted",
        "category": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
      };
      deferred.resolve({
        "message": "Inserted",
        "category": {
          "title": "Test",
          "body": "test",
          "lang": "123",
          "id": 15
        }
       });
        // We have to call apply for this to work
      $scope.$apply();

      // Since we called apply, not we can perform our assertions
      expect($scope.results).not.toBe(undefined);
      console.log($scope.results);
      expect($scope.error).toBe(undefined);
    });
  });
  //deleteCategory
  /*
  describe('Delete Category', function() {
    var $httpBackend;
    var userInterestId = '15';
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('DELETE', 'http://apistaging.sponzor.me/user_interests/'+userInterestId).respond(200, {
        "message": "Deleted"
      })
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Delete User Interest.', function() {
      var returnData = {"message": "Deleted"};
      var returnedPromise = userInterestRequest.deleteUserInterest(userInterestId);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  */
  //editCategoryPatch
  /*
  describe('Edit Category PATCH', function() {
    var $httpBackend;
    var userInterestId = '15';
    var category = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PATCH', 'http://apistaging.sponzor.me/user_interests/'+userInterestId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "category": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Edit Category PATCH', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "category": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = userInterestRequest.editUserInterestPatch(userInterestId, category);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  */
  //editCategoryPut
  /*
  describe('Edit Category PUT', function() {
    var $httpBackend;
    var userInterestId = '15';
    var category = {
      "title": "Test",
      "body": "test",
      "lang": "123"};
    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('PUT', 'http://apistaging.sponzor.me/user_interests/'+userInterestId).respond(200, {
        "message": "Updated",
        "warnings": [],
        "category": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      });
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('Edit Category PUT', function() {
      var returnData = {
        "message": "Updated",
        "warnings": [],
        "category": {
          "id": "15",
          "title": "Test",
          "body": "test",
          "lang": "123"
        }
      };
      var returnedPromise = userInterestRequest.editUserInterestPut(userInterestId, category);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.message).toEqual(returnData.message);
    });
  });
  */
});
