describe("Service: userService", function(){

  var userService;

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($injector, _userService_) {
    userService = _userService_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
  }));

  ////////////////////////////////////////////////////////////
  describe('Test to login method', function(){

    it('Should define a login function', function(){
      chai.assert.isDefined(userService.login);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        userService.login();
      });
      chai.assert.throws(function(){
        userService.login("test");
      });
      chai.assert.throws(function(){
        userService.login("test", []);
      });
      chai.assert.throws(function(){
        userService.login(1, "123");
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        userService.login("asas", "123");
      });
      chai.assert.doesNotThrow(function(){
        userService.login("asas", 121212);
      });
    });

    it('Should return a promise', function(){
      var promise = userService.login("mail@domain.co", "123");
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('login failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPOST('https://apilocal.sponzor.me/auth').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        userService.login( 'mail@domain.com', '123455' )
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('login success', function() {

      var data = mockData.userService.login();

      beforeEach(function() {
        $httpBackend.when('POST', 'https://apilocal.sponzor.me/auth').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an user', function( done ){
        userService.login( 'mail@domain.com', '123456' )
        .then(function( result ) {
          chai.expect( result ).to.eql( data.user );
          done();
        });
        $httpBackend.flush();
      });
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to getUser method', function(){

    it('Should define a getUser function', function(){
      chai.assert.isDefined(userService.getUser);
    });
    
    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        userService.getUser();
      });
      chai.assert.throws(function(){
        userService.getUser([]);
      });
      chai.assert.throws(function(){
        userService.getUser({});
      });
    });

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        userService.getUser(1);
      });
      chai.assert.doesNotThrow(function(){
        userService.getUser("1");
      });
    });

    it('Should return a promise', function(){
      var promise = userService.getUser("123");
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getUser failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET('https://apilocal.sponzor.me/users/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        userService.getUser( 1 )
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      }); 
    });

    ////////////////////////////////////////////////////////////
    describe('getUser success', function() {
      //Assemble  
      var data = mockData.userService.getUser();

      beforeEach(function() {
        $httpBackend.whenGET('https://apilocal.sponzor.me/users/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return the user', function( done ){
        userService.getUser( 1 )
        .then(function( result ) {
          chai.expect( result.email ).to.eql( data.data.user.email );
          chai.expect( result ).to.have.property( 'events' );
          done();
        });
        $httpBackend.flush();
      });

      it('Should be instance Of Date the events', function( done ){
        userService.getUser( 1 )
        .then(function( result ) {
          for (var i = 0; i < result.events.length; i++) {
            chai.assert.instanceOf( result.events[i].starts, Date );
            chai.assert.instanceOf( result.events[i].ends, Date );
          };
          done();
        });
        $httpBackend.flush();
      });

      it('Should be match with images', function( done ){
        userService.getUser( 1 )
        .then(function( result ) {
          chai.expect( result.events[0].image ).to.eql( 'img/banner.jpg' );
          chai.expect( result.events[1].image ).to.eql( 'https://staging.sponzor.me/#/event/1' );
          done();
        });
        $httpBackend.flush();
      });
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Test to createUser method', function(){

    it('Should define a createUser function', function(){
      chai.assert.isDefined(userService.createUser);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        userService.createUser();
      });
      chai.assert.throws(function(){
        userService.createUser("test");
      });
      chai.assert.throws(function(){
        userService.createUser("test", []);
      });
      chai.assert.throws(function(){
        userService.createUser([]);
      });
      chai.assert.throws(function(){
        userService.createUser(Object);
      });
    });

    it('Should not throw an error in case a Object', function(){
      chai.assert.doesNotThrow(function(){
        userService.createUser({});
      });
    });

    it('Should return a promise', function(){
      var promise = userService.createUser({});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('createUser failed', function() {

      var data = mockData.failed();

      beforeEach(inject(function() {
        $httpBackend.when('POST', 'https://apilocal.sponzor.me/users').respond(400, data);
      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        userService.createUser( {} )
        .catch(function( result ) {
          chai.assert.isDefined( result.message )
          done();
        });
        $httpBackend.flush();
      }); 
    });

    ////////////////////////////////////////////////////////////
    describe('createUser success', function() {

      var data = mockData.userService.createUser();

      beforeEach(function() {
        $httpBackend.whenPOST('https://apilocal.sponzor.me/users').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return the user', function( done ){
        userService.createUser( {} )
        .then(function( result ) {
          chai.expect( result ).to.eql( data.User );
          done();
        });
        $httpBackend.flush();
      }); 
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to deleteUser method', function(){

    it('Should define a deleteUser function', function(){
      chai.assert.isDefined(userService.deleteUser);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        userService.deleteUser();
      });
      chai.assert.throws(function(){
        userService.deleteUser([]);
      });
      chai.assert.throws(function(){
        userService.deleteUser({});
      });
      chai.assert.throws(function(){
        userService.deleteUser(Object);
      });
    });

    it('Should not throw an error in case a number or string', function(){
      chai.assert.doesNotThrow(function(){
        userService.deleteUser(1);
      });
      chai.assert.doesNotThrow(function(){
        userService.deleteUser("1");
      });
    });

    it('Should return a promise', function(){
      var promise = userService.deleteUser(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('deleteUser failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenDELETE('https://apilocal.sponzor.me/users/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        userService.deleteUser( 1 )
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      }); 
    });

    ////////////////////////////////////////////////////////////
    describe('deleteUser success', function() {

      var data = mockData.userService.deleteUser();

      beforeEach(function() {
        $httpBackend.whenDELETE('https://apilocal.sponzor.me/users/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an message', function( done ){
        userService.deleteUser( 1 )
        .then(function( result ) {
          chai.expect( result.message ).to.eql( data.message );
          done();
        });
        $httpBackend.flush();
      }); 
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to editUserPatch method', function(){

    it('Should define a editUserPatch function', function(){
      chai.assert.isDefined(userService.editUserPatch);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        userService.editUserPatch();
      });
      chai.assert.throws(function(){
        userService.editUserPatch([], {});
      });
      chai.assert.throws(function(){
        userService.editUserPatch({}, {});
      });
      chai.assert.throws(function(){
        userService.editUserPatch(Object, {});
      });
      chai.assert.throws(function(){
        userService.editUserPatch(1, []);
      });
      chai.assert.throws(function(){
        userService.editUserPatch(2, 1);
      });
      chai.assert.throws(function(){
        userService.editUserPatch(2, "as");
      });
      chai.assert.throws(function(){
        userService.editUserPatch("2", Object);
      });
    });

    it('Should not throw an error in case a number or string and Object', function(){
      chai.assert.doesNotThrow(function(){
        userService.editUserPatch(1, {});
      });
      chai.assert.doesNotThrow(function(){
        userService.editUserPatch("1", {});
      });
    });

    it('Should return a promise', function(){
      var promise = userService.editUserPatch(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editUserPatch failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPATCH('https://apilocal.sponzor.me/users/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        userService.editUserPatch( 1, {} )
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      }); 
    });

    ////////////////////////////////////////////////////////////
    describe('editUserPatch success', function() {

      var data = mockData.userService.editUserPatch();

      beforeEach(function() {
        $httpBackend.whenPATCH('https://apilocal.sponzor.me/users/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return the user', function( done ){
        userService.editUserPatch( 1, {} )
        .then(function( result ) {
          chai.expect( result ).to.eql( data.User );
          done();
        });
        $httpBackend.flush();
      }); 
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to editUserPut method', function(){

    it('Should define a editUserPut function', function(){
      chai.assert.isDefined(userService.editUserPut);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        userService.editUserPut();
      });
      chai.assert.throws(function(){
        userService.editUserPut([], {});
      });
      chai.assert.throws(function(){
        userService.editUserPut({}, {});
      });
      chai.assert.throws(function(){
        userService.editUserPut(Object, {});
      });
      chai.assert.throws(function(){
        userService.editUserPut(1, []);
      });
      chai.assert.throws(function(){
        userService.editUserPut(2, 1);
      });
      chai.assert.throws(function(){
        userService.editUserPut(2, "as");
      });
      chai.assert.throws(function(){
        userService.editUserPut("2", Object);
      });
    });

    it('Should not throw an error in case a number or string and Object', function(){
      chai.assert.doesNotThrow(function(){
        userService.editUserPut(1, {});
      });
      chai.assert.doesNotThrow(function(){
        userService.editUserPut("1", {});
      });
    });

    it('Should return a promise', function(){
      var promise = userService.editUserPut(1, {});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('editUserPut failed', function() {
      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPUT('https://apilocal.sponzor.me/users/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        userService.editUserPut( 1, {} )
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      }); 
    });

    ////////////////////////////////////////////////////////////
    describe('editUserPut success', function() {

      var data = mockData.userService.editUserPut();

      beforeEach(function() {
        $httpBackend.whenPUT('https://apilocal.sponzor.me/users/1').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return the user', function( done ){
        userService.editUserPut( 1, {} )
        .then(function( result ) {
          chai.expect( result ).to.eql( data.User );
          done();
        });
        $httpBackend.flush(); 
      }); 
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to forgotPassword method', function(){

    it('Should define a forgotPassword function', function(){
      chai.assert.isDefined(userService.forgotPassword);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        userService.forgotPassword();
      });
      chai.assert.throws(function(){
        userService.forgotPassword(121212);
      });
      chai.assert.throws(function(){
        userService.forgotPassword([]);
      });
      chai.assert.throws(function(){
        userService.forgotPassword({});
      });
      chai.assert.throws(function(){
        userService.forgotPassword(Object);
      });
    });

    it('Should not throw an error in case a string', function(){
      chai.assert.doesNotThrow(function(){
        userService.forgotPassword("mail@domain.com");
      });
    });

    it('Should return a promise', function(){
      var promise = userService.forgotPassword("mail@domain.com");
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('forgotPassword failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPOST('https://apilocal.sponzor.me/send_reset_password').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        userService.forgotPassword( "mail@domain.com" )
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      }); 
    });

    ////////////////////////////////////////////////////////////
    describe('forgotPassword success', function() {

      var data = mockData.userService.forgotPassword();

      beforeEach(function() {
        $httpBackend.whenPOST('https://apilocal.sponzor.me/send_reset_password').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return the user', function( done ){
        userService.forgotPassword( "mail@domain.com" )
        .then(function( result ) {
          chai.expect( result ).to.eql( data );
          done();
        });
        $httpBackend.flush();
      }); 
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to invitedUser method', function(){

    it('Should define a invitedUser function', function(){
      chai.assert.isDefined(userService.invitedUser);
    });

    it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        userService.invitedUser();
      });
      chai.assert.throws(function(){
        userService.invitedUser("test");
      });
      chai.assert.throws(function(){
        userService.invitedUser("test", []);
      });
      chai.assert.throws(function(){
        userService.invitedUser([]);
      });
      chai.assert.throws(function(){
        userService.invitedUser(Object);
      });
    });

    it('Should not throw an error in case a Object', function(){
      chai.assert.doesNotThrow(function(){
        userService.invitedUser({});
      });
    });

    it('Should return a promise', function(){
      var promise = userService.invitedUser({});
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('invitedUser failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenPOST('https://apilocal.sponzor.me/invite_friend').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        userService.invitedUser( {} )
        .catch(function( result ) {
          chai.assert.isDefined( result.message );
          done();
        });
        $httpBackend.flush();
      }); 
    });

    ////////////////////////////////////////////////////////////
    describe('invitedUser success', function() {

      var data = mockData.userService.invitedUser();

      beforeEach(function() {
        $httpBackend.whenPOST('https://apilocal.sponzor.me/invite_friend').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an message', function( done ){
        userService.invitedUser({})
        .then(function( result ) {
          chai.expect( result.message ).to.eql( data.message );
          done();
        });
        $httpBackend.flush();
      }); 
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to checkSession method', function(){

    var $localStorage;

    beforeEach(inject(function(_$localStorage_) {
      // Set up the mock http service responses
      $localStorage = _$localStorage_;
    }));

    it('Should define a checkSession function', function(){
      chai.assert.isDefined(userService.checkSession);
    });

    it('Should return true', function(){
      $localStorage.userAuth = {};
      $localStorage.token = "";
      chai.assert.isTrue( userService.checkSession() );
    });

    it('Should return false', function(){
      $localStorage.$reset();
      chai.assert.isFalse( userService.checkSession() );
    });

  });
});