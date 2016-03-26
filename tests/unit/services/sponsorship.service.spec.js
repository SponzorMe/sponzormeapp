describe("Service: sponsorshipService", function(){

	var sponsorshipService;

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($injector, _sponsorshipService_ ) {
    sponsorshipService = _sponsorshipService_;

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;
    
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
  }));

	////////////////////////////////////////////////////////////
  describe('Test to allSponsorships method', function(){

  	it('Should define a allSponsorships function', function(){
      chai.assert.isDefined(sponsorshipService.allSponsorships);
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.allSponsorships();
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('allSponsorships failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET(URL_REST + 'sponzorships').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        sponsorshipService.allSponsorships()
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      });
    });

		////////////////////////////////////////////////////////////
    describe('allSponsorships success', function() {

      var data = mockData.sponsorshipService.allSponsorships();

      beforeEach(function() {
        $httpBackend.whenGET(URL_REST + 'sponzorships').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an array of sponsorships', function(){
        sponsorshipService.allSponsorships()
        .then(function( result ) {
          chai.assert.isArray( result );
          chai.expect( result ).to.eql( data.SponzorsEvents );
        });
        $httpBackend.flush();
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to getSponzorship method', function(){

  	it('Should define a getSponzorship function', function(){
      chai.assert.isDefined(sponsorshipService.getSponzorship);
    });

    /*
    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        sponsorshipService.getSponzorship();
      });
      chai.assert.throws(function(){
        sponsorshipService.getSponzorship([]);
      });
      chai.assert.throws(function(){
        sponsorshipService.getSponzorship(Object);
      });
      chai.assert.throws(function(){
        sponsorshipService.getSponzorship({});
      });
    });
    */

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        sponsorshipService.getSponzorship("1");
      });
      chai.assert.doesNotThrow(function(){
        sponsorshipService.getSponzorship(1);
      });
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.getSponzorship(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getSponzorship failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET(URL_REST + 'sponzorships/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        var result;
        sponsorshipService.getSponzorship(1)
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      });
    });

		////////////////////////////////////////////////////////////
    describe('getSponzorship success', function() {

      var data = mockData.sponsorshipService.getSponzorship();

      beforeEach(function() {
        $httpBackend.whenGET(URL_REST + 'sponzorships/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return the sponzorship', function( done ){
        sponsorshipService.getSponzorship(1)
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.assert.isString( result.id );
          chai.assert.isString( result.cause );
          chai.assert.isString( result.event_id );
          chai.assert.isString( result.organizer_id );
          chai.assert.isString( result.perk_id );
          chai.assert.isString( result.event_id );
          chai.assert.isString( result.sponzor_id );
          chai.assert.isString( result.status );
          chai.assert.isObject( result.event );
          chai.assert.isObject( result.organizer );
          chai.assert.isObject( result.perk );
          chai.assert.isObject( result.sponzor );
          chai.assert.isArray( result.tasks );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to createSponzorship method', function(){

  	it('Should define a createSponzorship function', function(){
      chai.assert.isDefined(sponsorshipService.createSponzorship);
    });

    /*it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        sponsorshipService.createSponzorship();
      });
      chai.assert.throws(function(){
        sponsorshipService.createSponzorship([]);
      });
      chai.assert.throws(function(){
        sponsorshipService.createSponzorship(Object);
      });
      chai.assert.throws(function(){
        sponsorshipService.createSponzorship("asas");
      });
      chai.assert.throws(function(){
        sponsorshipService.createSponzorship(1);
      });
    });*/

    it("Should not throw an error in case a Object", function(){
      chai.assert.doesNotThrow(function(){
        sponsorshipService.createSponzorship({});
      });
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.createSponzorship({});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('createSponzorship failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPOST(URL_REST + 'sponzorships').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        sponsorshipService.createSponzorship({})
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      });
    });

		////////////////////////////////////////////////////////////
    describe('createSponzorship success', function() {

      var data = mockData.sponsorshipService.createSponzorship();

      beforeEach(function() {
        $httpBackend.whenPOST(URL_REST + 'sponzorships').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an sponzorship', function( done ){
        sponsorshipService.createSponzorship({})
        .then(function( result ) {
          chai.assert.isObject( result );
          done();
        });
        $httpBackend.flush();
      });

    });
  });

	////////////////////////////////////////////////////////////
  describe('Test to deleteSponzorship method', function(){

  	it('Should define a deleteSponzorship function', function(){
      chai.assert.isDefined(sponsorshipService.deleteSponzorship);
    });

    /*it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        sponsorshipService.deleteSponzorship();
      });
      chai.assert.throws(function(){
        sponsorshipService.deleteSponzorship([]);
      });
      chai.assert.throws(function(){
        sponsorshipService.deleteSponzorship(Object);
      });
      chai.assert.throws(function(){
        sponsorshipService.deleteSponzorship({});
      });
    });*/

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        sponsorshipService.deleteSponzorship("1");
      });
      chai.assert.doesNotThrow(function(){
        sponsorshipService.deleteSponzorship(1);
      });
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.deleteSponzorship(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('deleteSponzorship failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.when('DELETE', URL_REST + 'sponzorships/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        sponsorshipService.deleteSponzorship(1)
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });
    });

		////////////////////////////////////////////////////////////
    describe('deleteSponzorship success', function() {

      var data = mockData.sponsorshipService.deleteSponzorship();

      beforeEach(function() {
        $httpBackend.whenDELETE(URL_REST + 'sponzorships/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an sponzorship', function( done ){
        sponsorshipService.deleteSponzorship(1)
        .then(function( result ) {
          chai.expect( result.message ).to.eql( data.message );
          done();
        });
        $httpBackend.flush();
      });

    });
  });

	////////////////////////////////////////////////////////////
  describe('Test to editSponzorshipPatch method', function(){

  	it('Should define a editSponzorshipPatch function', function(){
      chai.assert.isDefined(sponsorshipService.editSponzorshipPatch);
    });

    /*it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch();
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch([], {});
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch(Object, {});
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch({}, {});
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch(1, []);
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch("1", Object);
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPatch(2, "as");
      });
    });*/

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        sponsorshipService.editSponzorshipPatch("1", {});
      });
      chai.assert.doesNotThrow(function(){
        sponsorshipService.editSponzorshipPatch(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.editSponzorshipPatch(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editSponzorshipPatch failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPATCH(URL_REST + 'sponzorships/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function(){
        sponsorshipService.editSponzorshipPatch(1, {})
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
        });
        $httpBackend.flush();
      });
    });

		////////////////////////////////////////////////////////////
    describe('editSponzorshipPatch success', function() {

      var data = mockData.sponsorshipService.editSponzorshipPatch();

      beforeEach(function() {
        $httpBackend.whenPATCH(URL_REST + 'sponzorships/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an sponzorship', function( done ){
        sponsorshipService.editSponzorshipPatch(1, {})
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.assert.isString( result.id );
          chai.assert.isString( result.cause );
          chai.assert.isString( result.event_id );
          chai.assert.isString( result.organizer_id );
          chai.assert.isString( result.perk_id );
          chai.assert.isString( result.event_id );
          chai.assert.isString( result.sponzor_id );
          chai.assert.isString( result.status );
          chai.assert.isObject( result.event );
          chai.assert.isObject( result.organizer );
          chai.assert.isObject( result.perk );
          chai.assert.isObject( result.sponzor );
          chai.assert.isArray( result.tasks );
          done();
        });
        $httpBackend.flush();
      });

    });
  });

	////////////////////////////////////////////////////////////
  describe('Test to editSponzorshipPut method', function(){

  	it('Should define a editSponzorshipPut function', function(){
      chai.assert.isDefined(sponsorshipService.editSponzorshipPut);
    });

    /*it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut();
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut([], {});
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut(Object, {});
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut({}, {});
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut(1, []);
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut("1", Object);
      });
      chai.assert.throws(function(){
        sponsorshipService.editSponzorshipPut(2, "as");
      });
    });*/

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        sponsorshipService.editSponzorshipPut("1", {});
      });
      chai.assert.doesNotThrow(function(){
        sponsorshipService.editSponzorshipPut(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = sponsorshipService.editSponzorshipPut(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editSponzorshipPut failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPUT(URL_REST + 'sponzorships/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        sponsorshipService.editSponzorshipPut(1, {})
          .catch(function( result ) {
            chai.assert.isDefined( result.message );
            done();
          });
        $httpBackend.flush();
      });
    });

		////////////////////////////////////////////////////////////
    describe('editSponzorshipPut success', function() {

      var data = mockData.sponsorshipService.editSponzorshipPut();

      beforeEach(function() {
        $httpBackend.whenPUT(URL_REST + 'sponzorships/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an sponzorship', function( done ){
        sponsorshipService.editSponzorshipPut(1, {})
          .then(function( result ) {
            chai.assert.isObject( result );
            chai.assert.isString( result.id );
            chai.assert.isString( result.cause );
            chai.assert.isString( result.event_id );
            chai.assert.isString( result.organizer_id );
            chai.assert.isString( result.perk_id );
            chai.assert.isString( result.event_id );
            chai.assert.isString( result.sponzor_id );
            chai.assert.isString( result.status );
            chai.assert.isObject( result.event );
            chai.assert.isObject( result.organizer );
            chai.assert.isObject( result.perk );
            chai.assert.isObject( result.sponzor );
            chai.assert.isArray( result.tasks );
            done();
          });
        $httpBackend.flush();
      });

    });
  });

});