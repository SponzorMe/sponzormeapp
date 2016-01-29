describe("Service: imgurService", function() {

  var imgurService;

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
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
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

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPOST('https://api.imgur.com/3/image').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        imgurService.uploadImage("asas")
          .catch(function( result ) {
            chai.assert.isDefined( result.message );
            done();
          });
        $httpBackend.flush();
        
      });
    });

    ////////////////////////////////////////////////////////////
    describe('uploadImage success', function() {

      var data = mockData.imgurService.uploadImage();

      beforeEach(function() {
        $httpBackend.whenPOST('https://api.imgur.com/3/image').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an image', function( done ){
        imgurService.uploadImage("asas")
        .then(function( result ) {
          chai.assert.isString( result );
          chai.expect( result ).to.eql( data.data.link );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

});
