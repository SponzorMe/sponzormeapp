describe("Controller: ProfileCtrl", function() {

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($injector, _$rootScope_, $controller) {
    $rootScope = _$rootScope_;
    $httpBackend = $injector.get('$httpBackend');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    

    $q = $injector.get('$q');
    
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    //Dependendes
    //Cordova
    $cordovaCamera = {
      throwsError: false,
      imageData: '',
      getPicture: function (options) {
        var defer = $q.defer();
        if (this.throwsError) {
          defer.reject('There was an error getting the picture.');
        } else {
          if (options) {
            options = options;  // This is just to get by JSHint.
          }
          defer.resolve(this.imageData);
        }
        return defer.promise;
      }
    };
    $cordovaToast = {
      throwsError: false,
      showShortBottom: function (message) {
        var defer = $q.defer();
        if (this.throwsError) {
          defer.reject('There was an error showing the toast.');
        } else {
          defer.resolve();
        }
        return defer.promise;
      },
    };

    $cordovaToast = chai.spy.object($cordovaToast, ['showShortBottom']);
    //Services
    userService =  $injector.get('userService');
    utilsService =  $injector.get('utilsService');
    imgurService =  $injector.get('imgurService');
    userAuthService =  $injector.get('userAuthService');

    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );

    profileController = $controller('ProfileCtrl', {
      '$cordovaToast': $cordovaToast,
      '$cordovaCamera': $cordovaCamera,
      'userService': userService, 
      'utilsService': utilsService,
      'imgurService': imgurService,
      'userAuthService': userAuthService
    });
    
  }));

  ////////////////////////////////////////////////////////////
  describe('Tests to variables', function(){

    it('Should have userAuth variable', function() {
      chai.assert.isDefined( profileController.userAuth );
      chai.assert.isObject( profileController.userAuth );
      chai.expect( profileController.userAuth ).to.eql( $localStorage.userAuth );
      chai.assert.isNumber( profileController.userAuth.age );
      chai.assert.isNumber( profileController.userAuth.comunity_size );
    });

    it('Should have imageURI variable', function() {
      chai.assert.isDefined( profileController.imageURI );
      chai.assert.isNull( profileController.imageURI );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to getPhoto method success', function(){

    it('Should have getPhoto method', function() {
      chai.assert.isDefined(profileController.getPhoto);
      chai.assert.isFunction(profileController.getPhoto);
    });

     it('Should be the image equal before call getPhoto', function() {
      $cordovaCamera.imageData = '123456.jpg';
      var image = "data:image/jpeg;base64," + $cordovaCamera.imageData;
      profileController.getPhoto();
      $rootScope.$digest();
      chai.assert.equal(profileController.imageURI, $cordovaCamera.imageData);
      chai.assert.equal(profileController.userAuth.image, image);
    });
  });

  ////////////////////////////////////////////////////////////
  describe('Test to updateProfile method success with imageURI', function(){

    var dataImage = mockData.imgurService.uploadImage();
    var dataUser = mockData.userService.editUserPatch();


    beforeEach(function() {
      // Set up the mock http service responses
      $httpBackend.whenPOST('https://api.imgur.com/3/image').respond(200, dataImage);
      $httpBackend.whenPATCH( URL_REST + 'users/1').respond(200, dataUser);
    });

   
    it('Should be equal userAuth.image that image', function() {
      profileController.imageURI = "12346.jpg";
      profileController.submitProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      console.log(profileController.userAuth.image);
      chai.assert.equal(profileController.userAuth.image, dataImage.data.link);
    });

    it('Should be called utilsService and cordovaToast', function() {
      profileController.imageURI = "12346.jpg";
      profileController.submitProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });

     it('Should be equal userAuth with $localStorage.userAuth', function() {
      profileController.imageURI = "12346.jpg";
      profileController.submitProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( profileController.userAuth ).to.eql( $localStorage.userAuth );
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to updateProfile method success without imageURI', function(){

    var dataUser = mockData.userService.editUserPatch();


    beforeEach(function() {
      // Set up the mock http service responses
      $httpBackend.whenPATCH( URL_REST + 'users/1').respond(200, dataUser);
    });

    it('Should be called utilsService and cordovaToast', function() {
      profileController.submitProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });

     it('Should be equal userAuth with $localStorage.userAuth', function() {
      profileController.submitProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( profileController.userAuth ).to.eql( $localStorage.userAuth );
    });

  });


  ////////////////////////////////////////////////////////////
  describe('Test to updateProfile method failed by Image', function(){

    var data = mockData.failed();
    var dataUser = mockData.userService.editUserPatch();


    beforeEach(function() {
      // Set up the mock http service responses
      $httpBackend.whenPOST('https://api.imgur.com/3/image').respond(400, data);
      //$httpBackend.whenPATCH('https://apilocal.sponzor.me/users/1').respond(200, dataUser);
    });

    it('Should be called utilsService.hideLoad', function() {
      profileController.imageURI = "12346.jpg";
      profileController.submitProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      //chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to updateProfile method failed by update', function(){

    var data = mockData.failed();


    beforeEach(function() {
      // Set up the mock http service responses
      $httpBackend.whenPATCH( URL_REST + 'users/1').respond(400, data);
    });

    it('Should be called utilsService.hideLoad', function() {
      profileController.submitProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      //chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });


});