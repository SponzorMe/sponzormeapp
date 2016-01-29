describe("Service: userInterestService", function(){
	var userInterestService;

	beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($injector, _userInterestService_) {
    userInterestService = _userInterestService_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
  }));

  it('Should define a createUserInterest function', function(){
    chai.assert.isDefined(userInterestService.createUserInterest);
  });

  ///////////////////////////////////////////////////////////

  describe('Test createUserInterest success', function() {

  	var data = mockData.userInterestService.createUserInterestSuccess();

  	beforeEach(function() {
      $httpBackend.whenPOST('https://apilocal.sponzor.me/user_interests').respond(200, data);
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should return a the new user interests', function( done ){
      userInterestService.createUserInterest( {} )
    	.then(function( result ) {
        chai.expect( result ).to.eql( data.UserInterest );
        done();
      });
      $httpBackend.flush();
	  });
  });

	describe('Test createUserInterest failed', function() {

  	var data = mockData.failed();

  	beforeEach(function() {
      $httpBackend.whenPOST('https://apilocal.sponzor.me/user_interests').respond(401, data);
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should return an error message', function( done ){
      userInterestService.createUserInterest( {} )
    	.catch(function( result ) {
        chai.assert.isDefined( result.message );
        done();
      });
      $httpBackend.flush();
	  });
	});
  
});