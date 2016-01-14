describe("Utils Service Testing -", function(){

  var utilsService, httpBackend, localStorage;

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
    localStorage = _$localStorage_;
  }));



  describe('1. When I use showLoad method', function(){
    //Assemble
    it('1.1 should have showLoad method', function() {
      //Act and Assert
      expect(utilsService.showLoad).toBeDefined();
    });
    //Assemble
    it('1.2 the showLoad method should return a object', function() {
      //Act and Assert
      expect(utilsService.showLoad()).toEqual(jasmine.any(Object));
    });
  });

  describe('2. When I use hideLoad method', function(){
    //Assemble
    it('2.1 should have hideLoad method', function() {
      //Act and Assert
      expect(utilsService.hideLoad).toBeDefined();
    });
    //Assemble
    it('2.2 the hideLoad method should return a undefined', function() {
      //Act and Assert
      expect(utilsService.hideLoad()).not.toBeDefined();
    });
  });

  describe('3. When I use alert method', function(){
    //Assemble
    it('3.1 should have alert method', function() {
      //Act and Assert
      expect(utilsService.alert).toBeDefined();
    });
    //Assemble
    it('3.2 the alert method should return a object without parameters', function() {
      //Act 
      var response = utilsService.alert();
      //Assert
      expect( response ).toEqual(jasmine.any(Object));
    });
    //Assemble
    it('3.3 the alert method should return a object with parameters', function() {
      //Act 
      var response = utilsService.alert({
        title: 'Prueba',
        template: 'Mensaje'
      });
      //Assert
      expect( response ).toEqual(jasmine.any(Object));
    });
  });

  describe('4. When I use trim method', function(){
    //Assemble
    it('4.1 should have trim method', function() {
      //Act and Assert
      expect(utilsService.trim).toBeDefined();
    });
    //Assemble
    it('4.2 the trim method should return a string without spaces in the begin or final (trim)', function() {
      //Act and Assert
      expect( utilsService.trim("uno dos tres") ).toEqual("uno dos tres");
      expect( utilsService.trim(" uno dos tres ") ).toEqual("uno dos tres");
      expect( utilsService.trim("   uno dos tres") ).toEqual("uno dos tres");
      expect( utilsService.trim("uno dos tres   ") ).toEqual("uno dos tres");
      expect( utilsService.trim(12) ).toEqual("12");
      expect( utilsService.trim(true) ).toEqual("true");
      expect( utilsService.trim({}) ).toEqual("");
      expect( utilsService.trim([]) ).toEqual("");
    });
  });

  describe('5. When I use resetForm method', function(){
    //Assemble
    it('5.1 should have resetForm method', function() {
      //Act and Assert
      expect(utilsService.resetForm).toBeDefined();
    });
  });

  describe('6. When I use updateUserAuth method', function(){
    //Assemble
    it('6.1 should have updateUserAuth method', function() {
      //Act and Assert
      expect(utilsService.updateUserAuth).toBeDefined();
    });

    //Assemble
    it('6.2 should extend the object userAuth and overwrite not delete', function() {
      //Act
      var response = utilsService.updateUserAuth();
      //Assert
      expect( response ).toEqual(jasmine.any(Object));
      //Act
      localStorage.userAuth = {
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
      expect( response ).toEqual( data );
    });
  });
});


