describe("Service: categoryService", function() {

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function( $injector, _categoryService_) {
    
    $localStorage = $injector.get('$localStorage');
    $localStorage.token = "123";
    
    categoryService = _categoryService_;

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;
    
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
  }));
  
  ////////////////////////////////////////////////////////////
  describe('Test to _getToken method', function(){

    it('Should define a _getToken function', function(){
      chai.assert.isDefined(categoryService._getToken);
    });

    it('Should return a string', function(){
      chai.assert.isString( categoryService._getToken() );
      chai.expect( "123" ).to.eql(  categoryService._getToken() );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to allCategories method', function(){

    it('Should define a allCategories function', function(){
      chai.assert.isDefined(categoryService.allCategories);
    });

    it('Should return a promise', function(){
      var promise = categoryService.allCategories();
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('allCategories failed', function() {
      var data = mockData.failed();

      beforeEach(function(){
        $httpBackend.whenGET(URL_REST + 'categories').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        categoryService.allCategories()
          .catch(function( result ) {
            chai.assert.isDefined( result.message );
            done();
          });
        $httpBackend.flush();
      });
    });

    ////////////////////////////////////////////////////////////
    describe('allCategories success', function() {

      var data = mockData.categoryService.allCategories();

      beforeEach(function() {
        $httpBackend.whenGET(URL_REST + 'categories').respond(200, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an array of categories', function( done ){
        categoryService.allCategories()
          .then(function( result ) {
            chai.assert.isArray( result );
            for(var i = 0; i < result.length;i++){
              var category = result[i];
              chai.assert.isObject( category );
              chai.assert.isDefined( category.id );
              chai.assert.isString( category.body );
              chai.assert.isString( category.lang );
              chai.assert.isString( category.title );
              chai.assert.isArray( category.interests );
              for(var j = 0; j < category.interests.length;j++){
                var interest = category.interests[j];
                chai.assert.isObject( interest );
                chai.assert.isDefined( interest.id_interest );
                chai.assert.isString( interest.description );
                chai.assert.isString( interest.lang );
                chai.assert.isString( interest.category_id );
                chai.assert.isString( interest.name );
              }
            }
            done();
          });
        $httpBackend.flush();
      });
      
      it('Should return the categories with interests', function( done ){
        categoryService.allCategories()
          .then(function( result ) {
            
            for(var i = 0;i < result.length; i++){
              chai.assert.isArray( result[i].interests );
            }
            done();
          });
        $httpBackend.flush();
      });
    });

  });

	////////////////////////////////////////////////////////////
  describe('Test to getCategory method', function(){

    it('Should define a getCategory function', function(){
      chai.assert.isDefined(categoryService.getCategory);
    });

    /*it('Should throw an error on an incompatible type', function(){
      chai.assert.throws(function(){
        categoryService.getCategory();
      });
      chai.assert.throws(function(){
        categoryService.getCategory([]);
      });
      chai.assert.throws(function(){
        categoryService.getCategory({});
      });
      chai.assert.throws(function(){
        categoryService.getCategory(Object);
      });
    });*/

    it("Should not throw an error in case a string or number", function(){
      chai.assert.doesNotThrow(function(){
        categoryService.getCategory("1");
      });
      chai.assert.doesNotThrow(function(){
        categoryService.getCategory(1);
      });
    });

    it('Should return a promise', function(){
      var promise = categoryService.getCategory(1);
      chai.assert.instanceOf( promise.then, Function);
      chai.assert.property( promise, '$$state');
    });

    ////////////////////////////////////////////////////////////
    describe('getCategory failed', function() {

      var data = mockData.failed();

      beforeEach(function() {
        $httpBackend.whenGET(URL_REST + 'categories/1').respond(400, data);
      });

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('Should return an error message', function( done ){
        categoryService.getCategory(1)
          .catch(function( result ) {
            chai.assert.isDefined( result.message );
            done();
          });
        $httpBackend.flush();
        
      });
    });

    ////////////////////////////////////////////////////////////
    describe('getCategory success', function() {

      var data = mockData.categoryService.getCategory();

      beforeEach(function() {
        $httpBackend.whenGET(URL_REST + 'categories/1').respond(200, data);
      });

      it('Should return a Category', function( done ){
        categoryService.getCategory(1)
          .then(function( result ) {
            chai.assert.isObject( result );
            chai.expect( result ).to.eql( data.data.category );
            //chai.assert.isArray( result.events );
            chai.assert.isArray( result.interests );
            done();
          });
        $httpBackend.flush();
      });
    });

  });

});