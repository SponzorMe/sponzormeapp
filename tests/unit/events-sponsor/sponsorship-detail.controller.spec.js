describe("Controller: SponsorshipSponsorDetailCtrl", function() {

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
    $scope = $rootScope.$new();
    
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');

    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('templates/events-sponsor/task-modal.html').respond(200, '');

    //Dependences
    //Angular
    $stateParams= $injector.get('$stateParams');
    $translate = $injector.get('$translate');
    //Ionic
    $ionicModal= $injector.get('$ionicModal');
    $ionicHistory= $injector.get('$ionicHistory');
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
    //Services
    utilsService = $injector.get('utilsService');
    taskSponsorService = $injector.get('taskSponsorService');
    userService = $injector.get('userService');
    userAuthService = $injector.get('userAuthService');
    notificationService = $injector.get('notificationService');
    
    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("1");
    userData.user.type = "1";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );
    
    $stateParams.id = "30";

    sponsorshipSponsorDetailController = $controller('SponsorshipSponsorDetailCtrl', {
  		'$scope': $scope,
      '$stateParams': $stateParams,
      '$translate': $translate,
      '$ionicModal': $ionicModal,
      '$ionicHistory': $ionicHistory,
      '$cordovaToast': $cordovaToast,
      'utilsService': utilsService,
      'taskSponsorService': taskSponsorService,
      'userAuthService': userAuthService,
      'notificationService': notificationService
  	});

  }));
  
  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( sponsorshipSponsorDetailController.userAuth );
      chai.assert.isObject( sponsorshipSponsorDetailController.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( sponsorshipSponsorDetailController.userAuth, $localStorage.userAuth );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to a sponzorship', function(){

    it('Should have a sponzorship', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isDefined( sponsorshipSponsorDetailController.sponsorship );
      chai.assert.isObject( sponsorshipSponsorDetailController.sponsorship );
    });
    
     it('Should sponzorship be equal that $localStorage.userAuth.sponzorships', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( sponsorshipSponsorDetailController.sponsorship, $localStorage.userAuth.sponzorship[0] );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to slideChange', function(){

    it('Should have a slideChange', function() {
      chai.assert.isDefined( sponsorshipSponsorDetailController.slideChange );
      chai.assert.isFunction( sponsorshipSponsorDetailController.slideChange );
    });
    
    it('Should indexSlide be equal be 0', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( sponsorshipSponsorDetailController.indexSlide, 0 );
    });
    
    it('Should indexSlide be equal be 1', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      sponsorshipSponsorDetailController.slideChange( 1 );
      chai.assert.equal( sponsorshipSponsorDetailController.indexSlide, 1 );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to showModalTask method', function(){

    it('Should have showModalTask method', function() {
      chai.assert.isDefined( sponsorshipSponsorDetailController.showModalTask );
      chai.assert.isFunction( sponsorshipSponsorDetailController.showModalTask );
    });

    it('Should be called showModalTask.show method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipSponsorDetailController.showModalTask();
      $rootScope.$digest();
      chai.assert.isTrue(sponsorshipSponsorDetailController.modalTask._isShown);
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to newTask method', function(){

    it('Should have newTask method', function() {
      chai.assert.isDefined( sponsorshipSponsorDetailController.newTask );
      chai.assert.isFunction( sponsorshipSponsorDetailController.newTask );
    });

    it('Should be called newTask method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipSponsorDetailController.newTask();
      $rootScope.$digest();
      chai.assert.isTrue(sponsorshipSponsorDetailController.isNewTask);
      chai.assert.isTrue(sponsorshipSponsorDetailController.modalTask._isShown);
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to hideModalTask method', function(){

    it('Should have hideModalTask method', function() {
      chai.assert.isDefined( sponsorshipSponsorDetailController.hideModalTask );
      chai.assert.isFunction( sponsorshipSponsorDetailController.hideModalTask );
    });

    it('Should be called hideModalTask method', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipSponsorDetailController.hideModalTask();
      $rootScope.$digest();
      chai.assert.isFalse(sponsorshipSponsorDetailController.modalTask._isShown);
      chai.expect( sponsorshipSponsorDetailController.sponsorTask ).to.eql( { task: {} } );
    });
    
     it('Should be called hideModalTask method with form', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipSponsorDetailController.hideModalTask( mockForm );
      $rootScope.$digest();
      chai.assert.isFalse(sponsorshipSponsorDetailController.modalTask._isShown);
      chai.expect( sponsorshipSponsorDetailController.sponsorTask ).to.eql( { task: {} } );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to editTask method', function(){

    it('Should have editTask method', function() {
      chai.assert.isDefined( sponsorshipSponsorDetailController.editTask );
      chai.assert.isFunction( sponsorshipSponsorDetailController.editTask );
    });

    it('Should be set modalTask and isNewTask', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockTask = {
        id: 1
      };
      sponsorshipSponsorDetailController.editTask( mockTask );
      $rootScope.$digest();
      chai.assert.isTrue(sponsorshipSponsorDetailController.modalTask._isShown);
      chai.assert.isFalse(sponsorshipSponsorDetailController.isNewTask);
    });
    
    it('Should sponsorTask be equal that mockTask', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockTask = {
        id: 1
      };
      sponsorshipSponsorDetailController.editTask( mockTask );
      $rootScope.$digest();
      chai.expect( sponsorshipSponsorDetailController.sponsorTask.id ).to.eql( mockTask.id );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to submitTask method', function(){

    it('Should have submitTask method', function() {
      chai.assert.isDefined( sponsorshipSponsorDetailController.submitTask );
      chai.assert.isFunction( sponsorshipSponsorDetailController.submitTask );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to createTask method success', function(){
    
    var dataTaskSponsor = mockData.taskSponsorService.createTask();

  	beforeEach(function() {
  		$httpBackend.whenPOST( URL_REST + 'task_sponzor').respond(200, dataTaskSponsor);
  	});

    /*
    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipSponsorDetailController.newTask();
      sponsorshipSponsorDetailController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( utilsService.showLoad ).to.have.been.called();
      chai.expect( utilsService.hideLoad ).to.have.been.called();
    });
    */
    
    it('Should be add a TaskSponzor in array tasks', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var size = sponsorshipSponsorDetailController.sponsorship.perk.tasks.length;
      sponsorshipSponsorDetailController.newTask();
      sponsorshipSponsorDetailController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( sponsorshipSponsorDetailController.sponsorship.perk.tasks.length, size + 1 );
    });
    
    it('Should be add a TaskSponzor in array task_sponzor', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var size = sponsorshipSponsorDetailController.sponsorship.task_sponzor.length;
      sponsorshipSponsorDetailController.newTask();
      sponsorshipSponsorDetailController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( sponsorshipSponsorDetailController.sponsorship.task_sponzor.length, size + 1 );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to createTask method failed', function(){
    
    var dataTaskSponsor = mockData.failed();

  	beforeEach(function() {
  		$httpBackend.whenPOST( URL_REST + 'task_sponzor').respond(400, dataTaskSponsor);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      sponsorshipSponsorDetailController.newTask();
      sponsorshipSponsorDetailController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      //chai.expect( utilsService.showLoad ).to.have.been.called();
      //chai.expect( utilsService.hideLoad ).to.have.been.called();
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to updateTask method success', function(){
    
    var dataTaskSponsor = mockData.taskSponsorService.editPutTask();

  	beforeEach(function() {
  		$httpBackend.whenPUT( URL_REST + 'task_sponzor/1').respond(200, dataTaskSponsor);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockTask = {
        id: "1",
        task:{
          title: "Nicoas",
          description: "Bla",
          status: "0"
        }
      };
      sponsorshipSponsorDetailController.editTask( mockTask );
      sponsorshipSponsorDetailController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      //chai.expect( utilsService.showLoad ).to.have.been.called();
      //chai.expect( utilsService.hideLoad ).to.have.been.called();
    });
    
    it('Should be update a TaskSponzor in array task_sponzor', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockTask = {
        id: "1",
        task:{
          title: "Nicoas",
          description: "Bla",
          status: "0"
        }
      };
      sponsorshipSponsorDetailController.editTask( mockTask );
      sponsorshipSponsorDetailController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( sponsorshipSponsorDetailController.sponsorship.task_sponzor[0].id ).to.eql( mockTask.id );
    });
    
    it('Should be update a PerkTaks in array tasks', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockTask = {
        id: "1",
        task:{
          id: "1",
          title: "Nicoas",
          description: "Bla",
          status: "0"
        }
      };
      sponsorshipSponsorDetailController.editTask( mockTask );
      sponsorshipSponsorDetailController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect( sponsorshipSponsorDetailController.sponsorship.perk.tasks[0].id ).to.eql( mockTask.task.id );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to editTask method failed', function(){
    
    var dataTaskSponsor = mockData.failed();

  	beforeEach(function() {
  		$httpBackend.whenPUT( URL_REST + 'task_sponzor/1').respond(400, dataTaskSponsor);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockTask = {
        id: "1",
        task:{
          title: "Nicoas",
          description: "Bla",
          status: "0"
        }
      };
      sponsorshipSponsorDetailController.editTask( mockTask );
      sponsorshipSponsorDetailController.submitTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      //chai.expect( utilsService.showLoad ).to.have.been.called();
      //chai.expect( utilsService.hideLoad ).to.have.been.called();
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to deleteTask method', function(){

    it('Should have deleteTask method', function() {
      chai.assert.isDefined( sponsorshipSponsorDetailController.deleteTask );
      chai.assert.isFunction( sponsorshipSponsorDetailController.deleteTask );
    });

  });
  
  
  ////////////////////////////////////////////////////////////
  describe('Tests to deleteTask method success', function(){
    
    var dataTaskSponsor = mockData.taskSponsorService.deleteTask();

  	beforeEach(function() {
  		$httpBackend.whenDELETE( URL_REST + 'task_sponzor/1').respond(200, dataTaskSponsor);
  	});

    it('Should be called utilsService methods', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var mockTask = {
        id: "1",
        task:{
          title: "Nicoas",
          description: "Bla",
          status: "0"
        }
      };
      sponsorshipSponsorDetailController.editTask( mockTask );
      sponsorshipSponsorDetailController.deleteTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      //chai.expect( utilsService.showLoad ).to.have.been.called();
      //chai.expect( utilsService.hideLoad ).to.have.been.called();
    });
    
    it('Should be remove a TaskSponzor in array task_sponzor', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var size = sponsorshipSponsorDetailController.sponsorship.task_sponzor.length;
      var mockTask = {
        id: "1",
        task:{
          title: "Nicoas",
          description: "Bla",
          status: "0"
        }
      };
      sponsorshipSponsorDetailController.editTask( mockTask );
      sponsorshipSponsorDetailController.deleteTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( sponsorshipSponsorDetailController.sponsorship.task_sponzor.length, size - 1 );
    });
    
    it('Should be remove a PerkTaks in array tasks', function() {
    	$rootScope.$digest();
      $httpBackend.flush();
      var size = sponsorshipSponsorDetailController.sponsorship.perk.tasks.length;
      var mockTask = {
        id: "1",
        task:{
          id: "1",
          title: "Nicoas",
          description: "Bla",
          status: "0"
        }
      };
      sponsorshipSponsorDetailController.editTask( mockTask );
      sponsorshipSponsorDetailController.deleteTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( sponsorshipSponsorDetailController.sponsorship.perk.tasks.length, size - 1 );
    });

  });
  
});