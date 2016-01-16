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
  
  ////////////////////////////////////////////////////////////
  describe('Test to uploadImage method', function(){

    it('Should define a uploadImage function', function(){
      chai.assert.isDefined(imgurService.uploadImage);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        imgurService.uploadImage();
      });
      chai.assert.throws(function(){
        imgurService.uploadImage([]);
      });
      chai.assert.throws(function(){
        imgurService.uploadImage({});
      });
      chai.assert.throws(function(){
        imgurService.uploadImage(Object);
      });
      chai.assert.throws(function(){
        imgurService.uploadImage(156);
      });
    });

    it("Should not throw an error in case a string", function(){
      chai.assert.doesNotThrow(function(){
        imgurService.uploadImage("asasa");
      });
    });

    it('Should return a promise', function(){
      var promise = imgurService.uploadImage("asas");
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('uploadImage failed', function() {
      var $httpBackend;
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'https://api.imgur.com/3/image')
          .respond(400, data);
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

      it('Should return an error message', function(){
        var result;
        imgurService.uploadImage("asas")
          .catch(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isDefined( result.message )
      });
    });

    ////////////////////////////////////////////////////////////
    describe('uploadImage success', function() {
      var $httpBackend;
      var data = mockData.imgurService.uploadImage();

      beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', 'https://api.imgur.com/3/image')
          .respond(200, data);
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

      it('Should return an image', function(){
        var result;
        imgurService.uploadImage("asas")
          .then(function( rta ) {
            result = rta;
          });
        $httpBackend.flush();
        chai.assert.isString( result );
        chai.expect( result ).to.eql( data.data.link );
      });
    });

  });

});
