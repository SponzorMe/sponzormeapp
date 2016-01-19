describe("Controller: SettingsController", function() {

	var settingsController;
	var $translate;

  beforeEach(function() {
    module('app');
  });

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

	beforeEach(inject(function($injector, $rootScope, $controller) {
    $translate = $injector.get('$translate');
    settingsController = $controller('SettingsController', {
    	'$translate': $translate
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

  	var $httpBackend;

  	beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.whenGET('langs/lang-en.json').respond(200, {
        "title": 'Sponzorme EN'
      });
      $httpBackend.whenGET('langs/lang-pt.json').respond(200, {
        "title": 'Sponzorme PT'
      });
      $httpBackend.whenGET('langs/lang-es.json').respond(200, {
        "title": 'Sponzorme ES'
      });
    }));

  	it('Should have save method', function() {
      chai.assert.isDefined(settingsController.save);
      chai.assert.isFunction(settingsController.save);
    });

    it('Should change the lang variable in $translate', function() {
      settingsController.lang = "es";
      settingsController.save();
      //chai.assert.equal(settingsController.lang, $translate.use());
    });


  });

});