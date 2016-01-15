describe("Service: utilsService", function(){

  var $localStorage;
  var utilsService;

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function(_utilsService_, _$localStorage_) {
    utilsService = _utilsService_;
    $localStorage = _$localStorage_;
  }));



  describe('When I use showLoad method', function(){
    //Assemble
    it('Should have showLoad method', function() {
      //Act and Assert
      chai.expect(utilsService.showLoad).to.be.defined;
    });
    //Assemble
    it('Should return a object the showLoad method ', function() {
      //Act and Assert
      chai.assert.isObject(utilsService.showLoad());
    });
  });

  
  describe('When I use hideLoad method', function(){
    //Assemble
    it('Should have hideLoad method', function() {
      //Act and Assert
      chai.expect(utilsService.hideLoad).to.be.defined;
    });
    //Assemble
    it('Should return a undefined the hideLoad method ', function() {
      //Act and Assert
      chai.expect(utilsService.hideLoad()).to.be.undefined;
    });
  });

  
  describe('When I use alert method', function(){
    //Assemble
    it('Should have alert method', function() {
      //Act and Assert
      chai.expect(utilsService.alert).to.be.defined;
    });
    //Assemble
    it('The alert method should return a object without parameters', function() {
      //Act 
      var response = utilsService.alert();
      //Assert
      chai.assert.isObject( response );
    });
    //Assemble
    it('The alert method should return a object with parameters', function() {
      //Act 
      var response = utilsService.alert({
        title: 'Prueba',
        template: 'Mensaje'
      });
      //Assert
      chai.assert.isObject( response );
    });
  });

  describe('When I use trim method', function(){
    //Assemble
    it('Should have trim method', function() {
      //Act and Assert
      chai.assert.isDefined(utilsService.trim);
    });
    //Assemble
    it('The trim method should return a string without spaces in the begin or final (trim)', function() {
      //Act and Assert
      chai.assert.strictEqual( utilsService.trim("uno dos tres"),"uno dos tres");
      chai.assert.strictEqual( utilsService.trim(" uno dos tres "), "uno dos tres");
      chai.assert.strictEqual( utilsService.trim("   uno dos tres"), "uno dos tres");
      chai.assert.strictEqual( utilsService.trim("uno dos tres   "), "uno dos tres");
      chai.assert.strictEqual( utilsService.trim(12), "12");
      chai.assert.strictEqual( utilsService.trim(true), "true");
      chai.assert.strictEqual( utilsService.trim({}), "");
      chai.assert.strictEqual( utilsService.trim([]), "");
    });
  });
  
  describe('When I use resetForm method', function(){
    //Assemble
    it('Should have resetForm method', function() {
      //Act and Assert
      chai.assert.isDefined(utilsService.resetForm);
    });
  });

  describe('When I use updateUserAuth method', function(){
    //Assemble
    it('Should have updateUserAuth method', function() {
      //Act and Assert
      chai.assert.isDefined(utilsService.updateUserAuth);
    });

    //Assemble
    it('Should extend the object userAuth and overwrite not delete', function() {
      //Act
      var response = utilsService.updateUserAuth();
      //Assert
      chai.assert.isObject( response );
      //Act
      $localStorage.userAuth = {
        id: 2,
        last_name: 'Molina'
      };
      var response = utilsService.updateUserAuth({
        id: 1,
        name: "Juan"
      });
      var data = {
        id: 1,
        name: "Juan",
        last_name: "Molina"
      };
      //Assert
      chai.expect(response).to.eql(data);
    });
  });
});


