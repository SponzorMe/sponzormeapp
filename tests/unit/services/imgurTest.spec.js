describe("Imagur Service Unit Tests -", function() {

  var imgurService;
  var httpBackend;

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($injector, _imgurService_) {
    imgurService = _imgurService_;
  }));

  it('should define a uploadImage function', function(){
    expect(imgurService.uploadImage).toBeDefined();
  });

  //Upload image
  describe('- Test of upload Success Image', function() {

    var $httpBackend;
    var rtaImage = 'http://i.imgur.com/SpKEBB5.jpg';

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'https://api.imgur.com/3/image').respond(200, {
        data: {
          link : rtaImage
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

    it('Return Image.', function(  ) {
      var returnedPromise = imgurService.uploadImage( 'database64' );
      var result;
      returnedPromise.then(function(image) {
        result = image;
      });
      $httpBackend.flush();
      expect(result).toEqual(rtaImage);
    });
  });

  //Upload image
  describe('- Test upload Failed Image', function() {

    var $httpBackend;

    beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'https://api.imgur.com/3/image').respond(400, {
        data: {
          message : 'error'
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

    it('Return Image.', function(  ) {
      var returnedPromise = imgurService.uploadImage( 'database64' );
      var result, error;
      returnedPromise.then(function(image) {
        result = image;
      }).catch(function( error ){
        result = error;
      });
      $httpBackend.flush();
      expect(result.message).toEqual('error');
    });
  });
  
});
