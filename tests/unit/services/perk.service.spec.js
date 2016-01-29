describe("Service: perkService", function(){


  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($injector, _perkService_ ) {
    perkService = _perkService_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
  }));

  ////////////////////////////////////////////////////////////
  describe('Test to allPerks method', function(){

    it('Should define a allPerks function', function(){
      chai.assert.isDefined(perkService.allPerks);
    });

    it('Should return a promise', function(){
      var promise = perkService.allPerks();
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('allPerks failed', function() {
      
      var data = mockData.failed();

      beforeEach(inject(function($injector) {
        $httpBackend.whenGET('https://apilocal.sponzor.me/perks').respond(400, data);
      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        perkService.allPerks()
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('allPerks success', function() {

      var data = mockData.perkService.allPerks();

      beforeEach(function() {
        $httpBackend.whenGET('https://apilocal.sponzor.me/perks').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an array of perks tasks', function( done ){
        perkService.allPerks()
        .then(function( result ) {
          chai.assert.isArray( result );
          chai.expect( result ).to.eql( data.Perk );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to getPerk method', function(){

    it('Should define a getPerk function', function(){
      chai.assert.isDefined(perkService.getPerk);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkService.getPerk();
      });
      chai.assert.throws(function(){
        perkService.getPerk([]);
      });
      chai.assert.throws(function(){
        perkService.getPerk({});
      });
      chai.assert.throws(function(){
        perkService.getPerk(Object);
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkService.getPerk("1");
      });
      chai.assert.doesNotThrow(function(){
        perkService.getPerk(1);
      });
    });

    it('Should return a promise', function(){
      var promise = perkService.getPerk(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getPerk failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET('https://apilocal.sponzor.me/perks/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        perkService.getPerk(1)
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });

    });

    ////////////////////////////////////////////////////////////
    describe('getPerk success', function() {
      
      var data = mockData.perkService.getPerk();

      beforeEach(function() {
        $httpBackend.whenGET('https://apilocal.sponzor.me/perks/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a Perk', function( done ){
        perkService.getPerk(1)
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.expect( result ).to.have.all.keys([
            'event',
            'sponzorTasks',
            'tasks'
          ]);
          chai.assert.isObject( result.event );
          chai.assert.isArray( result.sponzorTasks );
          chai.assert.isArray( result.tasks );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to createPerk method', function(){

    it('Should define a createPerk function', function(){
      chai.assert.isDefined(perkService.createPerk);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkService.createPerk();
      });
      chai.assert.throws(function(){
        perkService.createPerk([]);
      });
      chai.assert.throws(function(){
        perkService.createPerk("as");
      });
      chai.assert.throws(function(){
        perkService.createPerk(1);
      });
      chai.assert.throws(function(){
        perkService.createPerk(Object);
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkService.createPerk({});
      });
    });

    it('Should return a promise', function(){
      var promise = perkService.createPerk({});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('createPerk failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPOST('https://apilocal.sponzor.me/perks').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        perkService.createPerk({})
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('createPerk success', function() {

      var data = mockData.perkService.createPerk();

      beforeEach(function() {
        $httpBackend.when('POST', 'https://apilocal.sponzor.me/perks').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a Perk', function( done ){
        perkService.createPerk({})
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.expect( result ).to.eql( data.Perk );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to deletePerk method', function(){

    it('Should define a deletePerk function', function(){
      chai.assert.isDefined(perkService.deletePerk);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkService.deletePerk();
      });
      chai.assert.throws(function(){
        perkService.deletePerk([]);
      });
      chai.assert.throws(function(){
        perkService.deletePerk({});
      });
      chai.assert.throws(function(){
        perkService.deletePerk(Object);
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkService.deletePerk("1");
      });
      chai.assert.doesNotThrow(function(){
        perkService.deletePerk(1);
      });
    });

    it('Should return a promise', function(){
      var promise = perkService.deletePerk(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('deletePerk failed', function() {
   
      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenDELETE('https://apilocal.sponzor.me/perks/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        perkService.deletePerk(1)
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('deletePerk success', function() {

      var data = mockData.perkService.deletePerk();

      beforeEach(function() {
        $httpBackend.whenDELETE('https://apilocal.sponzor.me/perks/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a message', function( done ){
        perkService.deletePerk(1)
        .then(function( result ) {
          chai.expect( result.message ).to.eql( data.message );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to editPerkPatch method', function(){

    it('Should define a editPerkPatch function', function(){
      chai.assert.isDefined(perkService.editPerkPatch);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkService.editPerkPatch();
      });
      chai.assert.throws(function(){
        perkService.editPerkPatch([], {});
      });
      chai.assert.throws(function(){
        perkService.editPerkPatch(Object, {});
      });
      chai.assert.throws(function(){
        perkService.editPerkPatch({}, {});
      });
      chai.assert.throws(function(){
        perkService.editPerkPatch(1, []);
      });
      chai.assert.throws(function(){
        perkService.editPerkPatch("1", Object);
      });
      chai.assert.throws(function(){
        perkService.editPerkPatch(2, "as");
      });
    });

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        perkService.editPerkPatch("1", {});
      });
      chai.assert.doesNotThrow(function(){
        perkService.editPerkPatch(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = perkService.editPerkPatch(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkPatch failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPATCH('https://apilocal.sponzor.me/perks/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        perkService.editPerkPatch(1, {})
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkPatch success', function() {

      var data = mockData.perkService.editPerkPatch();

      beforeEach(function() {
        $httpBackend.whenPATCH('https://apilocal.sponzor.me/perks/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an message', function( done ){
        perkService.editPerkPatch(1, {})
        .then(function( result ) {
          chai.expect( result ).to.eql( data.Perk );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to editPerkPut method', function(){

    it('Should define a editPerkPut function', function(){
      chai.assert.isDefined(perkService.editPerkPut);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkService.editPerkPut();
      });
      chai.assert.throws(function(){
        perkService.editPerkPut([], {});
      });
      chai.assert.throws(function(){
        perkService.editPerkPut(Object, {});
      });
      chai.assert.throws(function(){
        perkService.editPerkPut({}, {});
      });
      chai.assert.throws(function(){
        perkService.editPerkPut(1, []);
      });
      chai.assert.throws(function(){
        perkService.editPerkPut("1", Object);
      });
      chai.assert.throws(function(){
        perkService.editPerkPut(2, "as");
      });
    });

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        perkService.editPerkPut("1", {});
      });
      chai.assert.doesNotThrow(function(){
        perkService.editPerkPut(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = perkService.editPerkPut(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkPut failed', function() {
  
      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPUT('https://apilocal.sponzor.me/perks/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        perkService.editPerkPut(1, {})
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkPut success', function() {

      var data = mockData.perkService.editPerkPut();

      beforeEach(function() {
        $httpBackend.whenPUT('https://apilocal.sponzor.me/perks/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an message', function( done ){
        perkService.editPerkPut(1, {})
        .then(function( result ) {
          chai.expect( result ).to.eql( data.Perk );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

});