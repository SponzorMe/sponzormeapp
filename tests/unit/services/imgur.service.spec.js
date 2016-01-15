describe("Service: imgurService", function() {

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

  beforeEach(inject(function(_imgurService_) {
    imgurService = _imgurService_;
  }));

  it('Should define a uploadImage function', function(){
    chai.assert.isDefined(imgurService.uploadImage);
  });

  //Upload image
  describe('Test of upload Success Image', function() {

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

    it('Return image', function(  ) {
      var returnedPromise = imgurService.uploadImage( 'database64' );
      var result;
      returnedPromise.then(function(image) {
        result = image;
      });
      $httpBackend.flush();
      chai.assert.equal(result, rtaImage);
    });
  });

  //Upload image
  describe('Test upload Failed Image', function() {

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

    it('Return error', function(  ) {
      var returnedPromise = imgurService.uploadImage( 'database64' );
      var result, error;
      returnedPromise.then(function(image) {
        result = image;
      }).catch(function( error ){
        result = error;
      });
      $httpBackend.flush();
      chai.assert.equal(result.message, 'error');
    });
  });
  
});
