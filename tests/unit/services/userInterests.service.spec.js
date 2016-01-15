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

  beforeEach(inject(function(_userInterestService_) {
    userInterestService = _userInterestService_;
  }));

  it('Should define a createUserInterest function', function(){
    chai.assert.isDefined(userInterestService.createUserInterest);
  });

  ///////////////////////////////////////////////////////////

  describe('Test createUserInterest success', function() {
  	var $httpBackend;
  	var data = mockData.userInterestService.createUserInterestSuccess();

  	beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'https://apilocal.sponzor.me/user_interests')
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

    it('Should return a the new user interests', function(){
      var result;
      userInterestService.createUserInterest( {} )
      	.then(function( rta ) {
	        result = rta;
	      });
      $httpBackend.flush();
      chai.expect( result ).to.eql( data.UserInterest );
	  });
  });

	describe('Test createUserInterest failed', function() {
		var $httpBackend;
  	var data = mockData.failed();

  	beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('POST', 'https://apilocal.sponzor.me/user_interests')
      	.respond(401, data);
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
      userInterestService.createUserInterest( {} )
      	.catch(function( rta ) {
	        result = rta;
	      });
      $httpBackend.flush();
      chai.assert.isDefined( result.message );
	  });
	});
  
});