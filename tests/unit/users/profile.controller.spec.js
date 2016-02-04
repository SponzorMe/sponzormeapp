describe("Controller: ProfileController", function() {

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

    $cordovaCameraMock = {
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

    $cordovaToastMock = {
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

    $cordovaToastMock = chai.spy.object($cordovaToastMock, ['showShortBottom']),

    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    userService = $injector.get('userService');
    utilsService = chai.spy.object($injector.get('utilsService'), ['showLoad', 'hideLoad','alert', 'resetForm','trim']);
    $localStorage = $injector.get('$localStorage');
    imgurService = chai.spy.object($injector.get('imgurService'), ['uploadImage']);
    $localStorage = $injector.get('$localStorage');

    $localStorage.userAuth = mockData.userService.login().user;

    profileController = $controller('ProfileController', {
      'userService': userService,
      'utilsService': utilsService,
      '$cordovaCamera': $cordovaCameraMock,
      '$localStorage': $localStorage,
      '$q': $q,
      'imgurService': imgurService,
      '$cordovaToast': $cordovaToastMock
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
      $cordovaCameraMock.imageData = '123456.jpg';
      var image = "data:image/jpeg;base64," + $cordovaCameraMock.imageData;
      profileController.getPhoto();
      $rootScope.$digest();
      chai.assert.equal(profileController.imageURI, $cordovaCameraMock.imageData);
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

    it('Should be called uploadImage', function() {
      profileController.imageURI = "12346.jpg";
      profileController.updateProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(imgurService.uploadImage).to.have.been.called();
      chai.expect(imgurService.uploadImage).to.have.been.with(profileController.imageURI);
      chai.assert.equal(profileController.userAuth.image, dataImage.data.link);
      
      
    });

    it('Should be equal userAuth.image that image', function() {
      profileController.imageURI = "12346.jpg";
      profileController.updateProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(profileController.userAuth.image, dataImage.data.link);
    });

    it('Should be called utilsService and cordovaToast', function() {
      profileController.imageURI = "12346.jpg";
      profileController.updateProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.resetForm).to.have.been.called();
      chai.expect($cordovaToastMock.showShortBottom).to.have.been.called();
    });

     it('Should be equal userAuth with $localStorage.userAuth', function() {
      profileController.imageURI = "12346.jpg";
      profileController.updateProfile( mockForm );
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
      profileController.updateProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
      chai.expect(utilsService.resetForm).to.have.been.called();
      chai.expect($cordovaToastMock.showShortBottom).to.have.been.called();
    });

     it('Should be equal userAuth with $localStorage.userAuth', function() {
      profileController.updateProfile( mockForm );
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
      profileController.updateProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
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
      profileController.updateProfile( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.hideLoad).to.have.been.called();
    });

  });


});