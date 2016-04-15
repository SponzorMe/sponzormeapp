describe("Controller: PastTasksCtrl", function() {

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
  	$rootScopeBroadcast = chai.spy.on( $rootScope, '$broadcast' );
    
    $scope = $rootScope.$new();
    $scopeBroadcast = chai.spy.on($scope, '$broadcast');

    BackendVariables = $injector.get('BackendVariables');
    URL_REST = BackendVariables.url;

  	$httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
    $httpBackend.whenGET('templates/tasks-organizer/task-modal.html').respond(200, '');
    
    mockForm = {
      $setPristine: function() {},
      $setUntouched: function() {},
    }

    //Dependences
    //ionic
    $ionicModal = $injector.get('$ionicModal');
    //Services
    perkTaskService = $injector.get('perkTaskService');
    userService = $injector.get('userService');
    utilsService = $injector.get('utilsService');
    userAuthService = $injector.get('userAuthService');
    notificationService = $injector.get('notificationService');

    $localStorage = $injector.get('$localStorage');

    var userData = mockData.userService.login("0");
    userData.user.type = "0";
    $localStorage.userAuth = userAuthService.updateUserAuth( userService.buildUser(userData) );
    
    pastTasksCtrl = $controller('PastTasksCtrl', {
  		'$scope': $scope,
      '$rootScope': $rootScope,
      '$ionicModal': $ionicModal,
      'perkTaskService': perkTaskService,
      'userService': userService,
      'utilsService': utilsService,
      'userAuthService': userAuthService,
      'notificationService': notificationService
  	});

  }));
  
  
  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( pastTasksCtrl.userAuth );
      chai.assert.isObject( pastTasksCtrl.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( pastTasksCtrl.userAuth, $localStorage.userAuth );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method', function(){

    it('Should have doRefresh method', function() {
      chai.assert.isDefined( pastTasksCtrl.doRefresh );
      chai.assert.isFunction( pastTasksCtrl.doRefresh );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( pastTasksCtrl.userAuth, $localStorage.userAuth );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method success', function(){
    
  	var dataUser = mockData.userService.home("0");
    dataUser.data.user.type = "0";
 
  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'home/1').respond(200, dataUser);
  	});

    it('Should have an event in the array', function() {
    	pastTasksCtrl.doRefresh();
    	$rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal( pastTasksCtrl.events.length, 2 );
    });
    
    it('Should be called broadcast scroll.refreshComplete', function() {
    	pastTasksCtrl.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to doRefresh method failed', function(){
    
  	var data = mockData.failed();
 
  	beforeEach(function() {
  		$httpBackend.whenGET( URL_REST + 'home/1').respond(400, data);
  	});

    it('Should be called broadcast scroll.refreshComplete', function() {
    	pastTasksCtrl.doRefresh();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($scopeBroadcast).to.have.been.called();
      chai.expect($scopeBroadcast).to.have.been.with('scroll.refreshComplete');
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to showModalTask method ', function(){


    it('Should showModalTask method', function() {
      chai.assert.isDefined( pastTasksCtrl.showModalTask );
      chai.assert.isFunction( pastTasksCtrl.showModalTask );
    });

    it('Should be called showModalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.showModalTask();
      $rootScope.$digest();
      chai.assert.isTrue(pastTasksCtrl.modalTask._isShown);
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to newTask method ', function(){


    it('Should newTask method', function() {
      chai.assert.isDefined( pastTasksCtrl.newTask );
      chai.assert.isFunction( pastTasksCtrl.newTask );
    });
    
     it('Should indexEvent and indexPerk be 1 and 2', function() {
      var mockPerk = {
        id: 1
      };
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.newTask( mockPerk, 1, 2 );
      $rootScope.$digest();
      chai.assert.equal(pastTasksCtrl.indexEvent, 1);
      chai.assert.equal(pastTasksCtrl.indexPerk, 2);
    });

    it('Should be open modalTask', function() {
      var mockPerk = {
        id: 1
      };
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.newTask( mockPerk, 1, 1  );
      $rootScope.$digest();
      chai.assert.isTrue( pastTasksCtrl.modalTask._isShown );
    });

    it('Should isNewTask be true', function() {
      var mockPerk = {
        id: 1
      };
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.newTask( mockPerk, 1, 1 );
      $rootScope.$digest();
      chai.assert.isTrue(pastTasksCtrl.isNewTask);
    });

    it('Should task.perk_id be equal that mockPerk.id', function() {
      var mockPerk = {
        id: 1
      };
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.newTask( mockPerk, 1, 1 );
      $rootScope.$digest();
      chai.assert.equal(pastTasksCtrl.task.perk_id, mockPerk.id);
    });

    it('Should task.event_id be equal that event.id', function() {
      var mockPerk = {
        id: 1,
        id_event: 1
      };
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.newTask( mockPerk, 1, 1 );
      $rootScope.$digest();
      chai.assert.equal(pastTasksCtrl.task.event_id, mockPerk.id_event);
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to hideModalTask method ', function(){


    it('Should hideModalTask method', function() {
      chai.assert.isDefined( pastTasksCtrl.hideModalTask );
      chai.assert.isFunction( pastTasksCtrl.hideModalTask );
    });

    it('Should close the modalTask', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.hideModalTask();
      $rootScope.$digest();
      chai.assert.isFalse( pastTasksCtrl.modalTask._isShown );
    });

    it('Should close the modalTask with form', function() {
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.hideModalTask();
      $rootScope.$digest();
      chai.assert.isFalse( pastTasksCtrl.modalTask._isShown );
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to editTask method ', function(){

    it('Should editTask method', function() {
      chai.assert.isDefined( pastTasksCtrl.editTask );
      chai.assert.isFunction( pastTasksCtrl.editTask );
    });
    
     it('Should indexEvent, indexPerk and indexTask be 1, 2, 3', function() {
      var mockTask = {
        id: 1
      };
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.editTask( mockTask, 1, 2, 3 );
      $rootScope.$digest();
      chai.assert.equal(pastTasksCtrl.indexEvent, 1);
      chai.assert.equal(pastTasksCtrl.indexPerk, 2);
      chai.assert.equal(pastTasksCtrl.indexTask, 3);
    });

    it('Should isNewTask be false', function() {
      var mockTask = {
        id: 1,
        status: 1
      };
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.editTask( mockTask, 1, 1, 1 );
      $rootScope.$digest();
      chai.assert.isFalse(pastTasksCtrl.isNewTask);
    });

    it('Should status be true', function() {
      var mockTask = {
        id: 1,
        status: 1
      };
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.editTask( mockTask, 1, 1, 1 );
      $rootScope.$digest();
      chai.assert.isTrue(pastTasksCtrl.task.status);
    });
    
    it('Should status be false', function() {
      var mockTask = {
        id: 1,
        status: 0
      };
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.editTask( mockTask, 1, 1, 1 );
      $rootScope.$digest();
      chai.assert.isFalse(pastTasksCtrl.task.status);
    });

    it('Should be open modalTask', function() {
      var mockTask = {
        id: 1,
        status: 0
      };
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.editTask( mockTask, 1, 1, 1 );
      $rootScope.$digest();
      chai.assert.isTrue( pastTasksCtrl.modalTask._isShown );
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to createTask method', function(){
    
    it('Should createTask method', function() {
      chai.assert.isDefined( pastTasksCtrl.createTask );
      chai.assert.isFunction( pastTasksCtrl.createTask );
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to createTask method success', function(){
    
    var data = mockData.perkTaskService.createPerkTask();
 
  	beforeEach(function() {
  		$httpBackend.whenPOST( URL_REST + 'perk_tasks').respond(200, data);
  	});
    
    it('Should add an event in the array', function() {
      
      pastTasksCtrl.task = {
        event_id: 1,
        perk_id: 1,
        title: "title",
        description: "description",
        status: 1
      };
      pastTasksCtrl.indexEvent = 0;
      pastTasksCtrl.indexPerk = 0;
      pastTasksCtrl.indexTask = 0;
      var size = pastTasksCtrl.events[0].perks[0].tasks.length;
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.createTask();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(pastTasksCtrl.events[0].perks[0].tasks.length, size + 1);
    });
    
    it('Should be called $rootScopeBroadcast', function() {
      pastTasksCtrl.task = {
        event_id: 1,
        perk_id: 1,
        title: "title",
        description: "description",
        status: 1
      };
      pastTasksCtrl.indexEvent = 0;
      pastTasksCtrl.indexPerk = 0;
      pastTasksCtrl.indexTask = 0;
      var size = pastTasksCtrl.events[0].perks[0].tasks.length;
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.createTask();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($rootScopeBroadcast).to.have.been.called();
    });
    
    it('Should sponzorships_like_organizer be equal that 0', function() {
      pastTasksCtrl.task = {
        event_id: 1,
        perk_id: 1,
        title: "title",
        description: "description",
        status: 1
      };
      pastTasksCtrl.indexEvent = 0;
      pastTasksCtrl.indexPerk = 0;
      pastTasksCtrl.indexTask = 0;
      var size = pastTasksCtrl.events[0].perks[0].tasks.length;
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.createTask();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(pastTasksCtrl.userAuth.sponzorships_like_organizer, 0);
    });
    
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to createTask method failed', function(){
    
    var data = mockData.failed();
 
  	beforeEach(function() {
  		$httpBackend.whenPOST( URL_REST + 'perk_tasks').respond(400, data);
  	});
    
    it('Should add an event in the array', function() {
      
      pastTasksCtrl.task = {
        event_id: 1,
        perk_id: 1,
        title: "title",
        description: "description",
        status: 1
      };
      pastTasksCtrl.indexEvent = 0;
      pastTasksCtrl.indexPerk = 0;
      pastTasksCtrl.indexTask = 0;
      var size = pastTasksCtrl.events[0].perks[0].tasks.length;
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.createTask();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse( pastTasksCtrl.modalTask._isShown );
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to deleteTask method', function(){
    
    it('Should deleteTask method', function() {
      chai.assert.isDefined( pastTasksCtrl.deleteTask );
      chai.assert.isFunction( pastTasksCtrl.deleteTask );
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to deleteTask method success', function(){
    
    var data = mockData.perkTaskService.deletePerkTask();
 
  	beforeEach(function() {
  		$httpBackend.whenDELETE( URL_REST + 'perk_tasks/1').respond(200, data);
  	});
    
    it('Should subtract an event in the array', function() {
      
      pastTasksCtrl.task = {
        event_id: 1,
        perk_id: 1,
        title: "title",
        description: "description",
        status: 1,
        id: 1
      };
      pastTasksCtrl.indexEvent = 0;
      pastTasksCtrl.indexPerk = 0;
      pastTasksCtrl.indexTask = 0;
      var size = pastTasksCtrl.events[0].perks[0].tasks.length;
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.deleteTask();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(pastTasksCtrl.events[0].perks[0].tasks.length, size - 1);
    });
    
    it('Should be called $rootScopeBroadcast', function() {
      pastTasksCtrl.task = {
        event_id: 1,
        perk_id: 1,
        title: "title",
        description: "description",
        status: 1,
        id: 1
      };
      pastTasksCtrl.indexEvent = 0;
      pastTasksCtrl.indexPerk = 0;
      pastTasksCtrl.indexTask = 0;
      var size = pastTasksCtrl.events[0].perks[0].tasks.length;
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.deleteTask();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($rootScopeBroadcast).to.have.been.called();
    });
    
    it('Should sponzorships_like_organizer be equal that 0', function() {
      pastTasksCtrl.task = {
        event_id: 1,
        perk_id: 1,
        title: "title",
        description: "description",
        status: 1,
        id: 1
      };
      pastTasksCtrl.indexEvent = 0;
      pastTasksCtrl.indexPerk = 0;
      pastTasksCtrl.indexTask = 0;
      var size = pastTasksCtrl.events[0].perks[0].tasks.length;
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.deleteTask();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(pastTasksCtrl.userAuth.sponzorships_like_organizer, 0);
    });
    
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to createTask method failed', function(){
    
    var data = mockData.failed();
 
  	beforeEach(function() {
  		$httpBackend.whenDELETE( URL_REST + 'perk_tasks/1').respond(400, data);
  	});
    
    it('Should add an event in the array', function() {
      
      pastTasksCtrl.task = {
        event_id: 1,
        perk_id: 1,
        title: "title",
        description: "description",
        status: 1,
        id: 1
      };
      pastTasksCtrl.indexEvent = 0;
      pastTasksCtrl.indexPerk = 0;
      pastTasksCtrl.indexTask = 0;
      var size = pastTasksCtrl.events[0].perks[0].tasks.length;
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.deleteTask();
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse( pastTasksCtrl.modalTask._isShown );
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to updateTask method', function(){
    
    it('Should updateTask method', function() {
      chai.assert.isDefined( pastTasksCtrl.updateTask );
      chai.assert.isFunction( pastTasksCtrl.updateTask );
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to updateTask method success', function(){
    
    var data = mockData.perkTaskService.editPerkTaskPatch();
 
  	beforeEach(function() {
  		$httpBackend.whenPATCH( URL_REST + 'perk_tasks/1').respond(200, data);
  	});
    
    it('Should add an event in the array', function() {
      
      pastTasksCtrl.task = {
        event_id: 1,
        perk_id: 1,
        title: "title",
        description: "description",
        status: 1,
        id: 1
      };
      pastTasksCtrl.indexEvent = 0;
      pastTasksCtrl.indexPerk = 0;
      pastTasksCtrl.indexTask = 0;
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.updateTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.equal(pastTasksCtrl.events[0].perks[0].tasks[0].id, data.PerkTask.id);
    });
    
    it('Should be called $rootScopeBroadcast', function() {
      pastTasksCtrl.task = {
        event_id: 1,
        perk_id: 1,
        title: "title",
        description: "description",
        status: 1,
        id: 1
      };
      pastTasksCtrl.indexEvent = 0;
      pastTasksCtrl.indexPerk = 0;
      pastTasksCtrl.indexTask = 0;
      var size = pastTasksCtrl.events[0].perks[0].tasks.length;
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.updateTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.expect($rootScopeBroadcast).to.have.been.called();
    });
    
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Tests to updateTask method failed', function(){
    
    var data = mockData.failed();
 
  	beforeEach(function() {
  		$httpBackend.whenPATCH( URL_REST + 'perk_tasks/1').respond(400, data);
  	});
    
    it('Should add an event in the array', function() {
      
      pastTasksCtrl.task = {
        event_id: 1,
        perk_id: 1,
        title: "title",
        description: "description",
        status: 1,
        id: 1
      };
      pastTasksCtrl.indexEvent = 0;
      pastTasksCtrl.indexPerk = 0;
      pastTasksCtrl.indexTask = 0;
      var size = pastTasksCtrl.events[0].perks[0].tasks.length;
      $rootScope.$digest();
      $httpBackend.flush();
      pastTasksCtrl.updateTask( mockForm );
      $rootScope.$digest();
      $httpBackend.flush();
      chai.assert.isFalse( pastTasksCtrl.modalTask._isShown );
    });
    
  });

	

});