describe("AWS image Service Unit Tests", function() {

  var awsImageService;
  var httpBackend;

  beforeEach(function() {
    module('awsImageService');
  });

  beforeEach(inject(function(_awsImageService_) {
    awsImageService = _awsImageService_;
  }));

  //Upload image
  describe('Upload Image', function() {

    var $httpBackend;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'http://apistaging.sponzor.me/categories').respond(200, {
        "success": true
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Upload Image.', function() {
      var returnData = {
        "success": true
      };
      var returnedPromise = awsImageService.uploadImage();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      $httpBackend.flush();
      expect(result.data.success).toEqual(returnData.success);
      
    });
  });
  
});
