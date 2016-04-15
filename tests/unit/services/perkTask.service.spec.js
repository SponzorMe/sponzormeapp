describe("Service: perkTaskService", function(){

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function( $injector, _perkTaskService_ ) {
    perkTaskService = _perkTaskService_;

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
  }));

  ////////////////////////////////////////////////////////////
  describe('Test to allPerkTasks method', function(){

    it('Should define a allPerkTasks function', function(){
      chai.assert.isDefined(perkTaskService.allPerkTasks);
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.allPerkTasks();
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('allPerkTasks failed', function() {
 
      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET( URL_REST + 'perk_tasks').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        perkTaskService.allPerkTasks()
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('allPerkTasks success', function() {
    
      var data = mockData.perkTaskService.allPerkTasks();

      beforeEach(function() {
        $httpBackend.whenGET( URL_REST + 'perk_tasks').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an array of perks tasks', function(){
        perkTaskService.allPerkTasks()
        .then(function( result ) {
          chai.assert.isArray( result );
          chai.expect( result ).to.eql( data.PerkTasks );
        });
        $httpBackend.flush();
      });
    });

  });


  ////////////////////////////////////////////////////////////
  describe('Test to getPerkTask method', function(){

    it('Should define a getPerkTask function', function(){
      chai.assert.isDefined(perkTaskService.getPerkTask);
    });

    /*it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkTaskService.getPerkTask();
      });
      chai.assert.throws(function(){
        perkTaskService.getPerkTask([]);
      });
      chai.assert.throws(function(){
        perkTaskService.getPerkTask({});
      });
      chai.assert.throws(function(){
        perkTaskService.getPerkTask(Object);
      });
    });*/

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkTaskService.getPerkTask("1");
      });
      chai.assert.doesNotThrow(function(){
        perkTaskService.getPerkTask(1);
      });
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.getPerkTask(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getPerkTask failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET( URL_REST + 'perk_tasks/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function(){
        perkTaskService.getPerkTask(1)
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getPerkTask success', function() {

      var data = mockData.perkTaskService.getPerkTask();

      beforeEach(function() {
        $httpBackend.whenGET( URL_REST + 'perk_tasks/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a PerkTask', function( done ){
        perkTaskService.getPerkTask(1)
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.assert.isString( result.id );
          chai.assert.isString( result.title );
          chai.assert.isString( result.description );
          chai.assert.isString( result.perk_id );
          chai.assert.isBoolean( result.status );
          chai.assert.isString( result.event_id );
          chai.assert.isString( result.type );
          chai.assert.isString( result.user_id );
          chai.assert.isObject( result.event );
          chai.assert.isObject( result.perk );
          chai.assert.isObject( result.user );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to createPerkTask method', function(){

    it('Should define a createPerkTask function', function(){
      chai.assert.isDefined(perkTaskService.createPerkTask);
    });

    /*it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkTaskService.createPerkTask();
      });
      chai.assert.throws(function(){
        perkTaskService.createPerkTask([]);
      });
      chai.assert.throws(function(){
        perkTaskService.createPerkTask("as");
      });
      chai.assert.throws(function(){
        perkTaskService.createPerkTask(1);
      });
      chai.assert.throws(function(){
        perkTaskService.createPerkTask(Object);
      });
    });*/

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkTaskService.createPerkTask({});
      });
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.createPerkTask({});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('createPerkTask failed', function() {
      
      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPOST( URL_REST + 'perk_tasks').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        perkTaskService.createPerkTask({})
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('createPerkTask success', function() {

      var data = mockData.perkTaskService.createPerkTask();

      beforeEach(function() {
        $httpBackend.whenPOST( URL_REST + 'perk_tasks').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a PerkTask', function( done ){
        perkTaskService.createPerkTask({})
        .then(function( result ) {
          chai.assert.isObject( result.PerkTask );
          chai.assert.isString( result.PerkTask.id );
          chai.assert.isString( result.PerkTask.title );
          chai.assert.isString( result.PerkTask.description );
          chai.assert.isString( result.PerkTask.perk_id );
          chai.assert.isBoolean( result.PerkTask.status );
          chai.assert.isString( result.PerkTask.event_id );
          chai.assert.isString( result.PerkTask.type );
          chai.assert.isString( result.PerkTask.user_id );
          chai.assert.isObject( result.PerkTask.event );
          chai.assert.isObject( result.PerkTask.perk );
          chai.assert.isObject( result.PerkTask.user );
          chai.assert.isArray( result.sponzorships_like_organizer );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to deletePerkTask method', function(){

    it('Should define a deletePerkTask function', function(){
      chai.assert.isDefined(perkTaskService.deletePerkTask);
    });

    /*it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkTaskService.deletePerkTask();
      });
      chai.assert.throws(function(){
        perkTaskService.deletePerkTask([]);
      });
      chai.assert.throws(function(){
        perkTaskService.deletePerkTask({});
      });
      chai.assert.throws(function(){
        perkTaskService.deletePerkTask(Object);
      });
    });*/

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkTaskService.deletePerkTask("1");
      });
      chai.assert.doesNotThrow(function(){
        perkTaskService.deletePerkTask(1);
      });
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.deletePerkTask(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('deletePerkTask failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenDELETE( URL_REST + 'perk_tasks/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        var result;
        perkTaskService.deletePerkTask(1)
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('deletePerkTask success', function() {

      var data = mockData.perkTaskService.deletePerkTask();

      beforeEach(function() {
        $httpBackend.whenDELETE( URL_REST + 'perk_tasks/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an message', function( done ){
        perkTaskService.deletePerkTask(1)
        .then(function( result ) {
          chai.expect( result.message ).to.eql( data.message );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to editPerkTaskPatch method', function(){

    it('Should define a editPerkTaskPatch function', function(){
      chai.assert.isDefined(perkTaskService.editPerkTaskPatch);
    });

     /*
    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch();
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch([], {});
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch(Object, {});
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch({}, {});
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch(1, []);
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch("1", Object);
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPatch(2, "as");
      });
    });*/

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        perkTaskService.editPerkTaskPatch("1", {});
      });
      chai.assert.doesNotThrow(function(){
        perkTaskService.editPerkTaskPatch(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.editPerkTaskPatch(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkTaskPatch failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPATCH( URL_REST + 'perk_tasks/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        var result;
        perkTaskService.editPerkTaskPatch(1, {})
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkTaskPatch success', function() {

      var data = mockData.perkTaskService.editPerkTaskPatch();

      beforeEach(function() {
        $httpBackend.whenPATCH(URL_REST + 'perk_tasks/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return a perkTaks', function( done ){
        perkTaskService.editPerkTaskPatch(1, {})
        .then(function( result ) {
          chai.assert.isObject( result );
          chai.assert.isString( result.id );
          chai.assert.isString( result.title );
          chai.assert.isString( result.description );
          chai.assert.isString( result.perk_id );
          chai.assert.isBoolean( result.status );
          chai.assert.isString( result.event_id );
          chai.assert.isString( result.type );
          chai.assert.isString( result.user_id );
          chai.assert.isObject( result.event );
          chai.assert.isObject( result.perk );
          chai.assert.isObject( result.user );
          done();
        });
        $httpBackend.flush();
        
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to editPerkTaskPut method', function(){

    it('Should define a editPerkTaskPut function', function(){
      chai.assert.isDefined(perkTaskService.editPerkTaskPut);
    });

    /*
    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut();
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut([], {});
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut(Object, {});
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut({}, {});
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut(1, []);
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut("1", Object);
      });
      chai.assert.throws(function(){
        perkTaskService.editPerkTaskPut(2, "as");
      });
    });*/

    it("Should not throw an error in case a string or number and an Object", function(){
      chai.assert.doesNotThrow(function(){
        perkTaskService.editPerkTaskPut("1", {});
      });
      chai.assert.doesNotThrow(function(){
        perkTaskService.editPerkTaskPut(1, {});
      });
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.editPerkTaskPut(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkTaskPut failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPUT( URL_REST + 'perk_tasks/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        perkTaskService.editPerkTaskPut(1, {})
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('editPerkTaskPut success', function() {

      var data = mockData.perkTaskService.editPerkTaskPut();

      beforeEach(function() {
        $httpBackend.whenPUT(URL_REST + 'perk_tasks/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an message', function( done ){
        perkTaskService.editPerkTaskPut(1, {})
          .then(function( result ) {
            chai.assert.isObject( result );
            chai.assert.isString( result.id );
            chai.assert.isString( result.title );
            chai.assert.isString( result.description );
            chai.assert.isString( result.perk_id );
            chai.assert.isBoolean( result.status );
            chai.assert.isString( result.event_id );
            chai.assert.isString( result.type );
            chai.assert.isString( result.user_id );
            chai.assert.isObject( result.event );
            chai.assert.isObject( result.perk );
            chai.assert.isObject( result.user );
            done();
          });
        $httpBackend.flush();
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to getPerkTaskByOrganizer method', function(){

    it('Should define a getPerkTaskByOrganizer function', function(){
      chai.assert.isDefined(perkTaskService.getPerkTaskByOrganizer);
    });

    /*
    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        perkTaskService.getPerkTaskByOrganizer();
      });
      chai.assert.throws(function(){
        perkTaskService.getPerkTaskByOrganizer([]);
      });
      chai.assert.throws(function(){
        perkTaskService.getPerkTaskByOrganizer({});
      });
      chai.assert.throws(function(){
        perkTaskService.getPerkTaskByOrganizer(Object);
      });
    });*/

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        perkTaskService.getPerkTaskByOrganizer("1");
      });
      chai.assert.doesNotThrow(function(){
        perkTaskService.getPerkTaskByOrganizer(1);
      });
    });

    it('Should return a promise', function(){
      var promise = perkTaskService.getPerkTaskByOrganizer(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getPerkTaskByOrganizer failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET( URL_REST + 'perk_tasks_organizer/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        perkTaskService.getPerkTaskByOrganizer(1)
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getPerkTaskByOrganizer success', function() {

      var data = mockData.perkTaskService.getPerkTaskByOrganizer();

      beforeEach(function() {
        $httpBackend.whenGET( URL_REST + 'perk_tasks_organizer/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an array of perk tasks', function( done ){
        perkTaskService.getPerkTaskByOrganizer(1)
        .then(function( result ) {
          chai.assert.isArray( result );
          chai.expect( result ).to.eql( data.PerkTasks );
          done();
        });
        $httpBackend.flush();
        
      });
    });

  });

}); 