/* global describe, chai, userInterestService, $httpBackend */
describe("Service: userInterestService", function(){

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

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

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

  	var data = mockData.userInterestService.createUserInterest();

  	beforeEach(function() {
      $httpBackend.whenPOST( URL_REST + 'user_interests').respond(200, data);
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
      $httpBackend.whenPOST( URL_REST + 'user_interests').respond(401, data);
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
  
  describe('Test to bulkUserInterest method', function(){
    
    it('Should define a bulkUserInterest function', function(){
      chai.assert.isDefined(userInterestService.bulkUserInterest);
    });
    
  });
  
  describe('Test bulkUserInterest failed', function() {

  	var data = mockData.failed();

  	beforeEach(function() {
      $httpBackend.whenPUT( URL_REST + 'user_interests/' + 1003).respond(401, data);
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should return an error message', function( done ){
      userInterestService.bulkUserInterest( 1003,  {} )
    	.catch(function( result ) {
        chai.assert.isDefined( result.message );
        done();
      });
      $httpBackend.flush();
	  });
	});
  
  describe('Test bulkUserInterest success', function() {

  	var data = mockData.userInterestService.bulkUserInterest();

  	beforeEach(function() {
      $httpBackend.whenPUT( URL_REST + 'user_interests/' + 1003).respond(200, data);
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should return the result with inserted and noInserted', function( done ){
      userInterestService.bulkUserInterest( 1003,  {} )
    	.then(function( result ) {
        chai.assert.isDefined( result.inserted );
        chai.assert.isArray( result.inserted );
        chai.assert.isDefined( result.noInserted );
        chai.assert.isArray( result.noInserted );
        done();
      });
      $httpBackend.flush();
	  });
	});
  
});