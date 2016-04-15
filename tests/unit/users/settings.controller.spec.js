describe("Controller: SettingsCtrl", function() {

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

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    
    $q = $injector.get('$q');
    
    //Dependeces
    //Angular
    $translate = $injector.get('$translate');
    //Cordova
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

    $ionicDeploy = {
      throwsError: false,
      checkRta: false,
      setChannel: function(){},
      watch: function(){
        var defer = $q.defer();
        if(this.throwsError){
          defer.reject();
        }else{
          defer.resolve(this.checkRta);
        }
        return defer.promise;
      },
      check: function(){
        var defer = $q.defer();
        if(this.throwsError){
          defer.reject();
        }else{
          defer.resolve(this.checkRta);
        }
        return defer.promise;
      },
      update: function(){
        var defer = $q.defer();
        if(this.throwsError){
          defer.reject();
        }else{
          defer.resolve();
        }
        return defer.promise;
      }
    }

    utilsService = $injector.get('utilsService');
    utilsService.confirm = function(){
      var defer = $q.defer();
      defer.resolve(true);
      return defer.promise;
    }
    utilsService = chai.spy.object($injector.get('$utilsService'), ['confirm']);

    settingsController = $controller('SettingsCtrl', {
    	'$translate': $translate,
      '$cordovaToast': $cordovaToast,
      '$ionicDeploy': $ionicDeploy,
      'utilsService': utilsService,
      'BackendVariables': BackendVariables
    });
  }));

	////////////////////////////////////////////////////////////
  describe('Tests to variables', function(){

  	it('Should have lang variable', function() {
      chai.assert.isDefined(settingsController.lang);
    });

    it('Should be lang variable equal that $translate', function() {
      chai.assert.equal(settingsController.lang, $translate.use());
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to save method', function(){

  	it('Should have save method', function() {
      chai.assert.isDefined(settingsController.save);
      chai.assert.isFunction(settingsController.save);
    });

    it('Should change the lang variable in $translate', function() {
      settingsController.lang = "es";
      settingsController.save();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(settingsController.lang, $translate.use());
    });


  });
  
  
  ////////////////////////////////////////////////////////////
  describe('Test to checkForUpdates ', function(){

    it('Should have checkForUpdates method', function() {
      chai.assert.isDefined(settingsController.checkForUpdates);
      chai.assert.isFunction(settingsController.checkForUpdates);
    });


    it('Should be called utilsService success and have update ', function() {
      $ionicDeploy.checkRta = true;
      settingsController.checkForUpdates();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect(utilsService.confirm).to.have.been.called();
    });

  });

  ////////////////////////////////////////////////////////////
  describe('Test to doUpdate method', function(){

    it('Should have doUpdate method', function() {
      chai.assert.isDefined(settingsController.doUpdate);
      chai.assert.isFunction(settingsController.doUpdate);
    });

    it('Should be called utilsService methods success', function() {
      settingsController.doUpdate();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($cordovaToast.showShortBottom).to.have.been.called();
    });

  });

});