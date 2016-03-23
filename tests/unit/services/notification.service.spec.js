describe("Service: notificationService", function() {
  
  beforeEach(function() {
    module('app');
  });
  
  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($injector, _$rootScope_) {
    
    $localStorage = $injector.get('$localStorage');
    $localStorage.userAuth = mockData.userService.login().user;
    
    notificationService = $injector.get('notificationService');
    
    $rootScope = _$rootScope_;

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('langs/lang-en.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-pt.json').respond(200, {});
    $httpBackend.whenGET('langs/lang-es.json').respond(200, {});
  }));
  
  ////////////////////////////////////////////////////////////
  describe('Tests to userAuth variable', function(){

    it('Should have user variable', function() {
      chai.assert.isDefined( notificationService.userAuth );
      chai.assert.isObject( notificationService.userAuth );
    });

    it('Should userAuth be equal that $localStorage.userAuth', function() {
      chai.assert.equal( notificationService.userAuth, $localStorage.userAuth );
    });

  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to activate method like Organizer', function(){
    
    it('Should define a activate function', function(){
      chai.assert.isDefined(notificationService.activate);
    });
    
    it('Should be called activate', function() {
      $localStorage.userAuth = mockData.userService.login("0").user;
    	notificationService.activate();
      $rootScope.$digest();
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to activate method like Sponsor', function(){
    
    it('Should define a activate function', function(){
      chai.assert.isDefined(notificationService.activate);
    });
    
    it('Should be called activate', function() {
      $localStorage.userAuth = mockData.userService.login("1").user;
    	notificationService.activate();
      $rootScope.$digest();
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to getNotifications method', function(){
    
    it('Should define a getNotifications function', function(){
      chai.assert.isDefined(notificationService.getNotifications);
    });
    
    it('Should return an array', function() {
      chai.assert.isArray( notificationService.getNotifications() );
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to sendNewSponsorship method', function(){
    
    it('Should define a sendNewSponsorship function', function(){
      chai.assert.isDefined(notificationService.sendNewSponsorship);
    });
    
    it('Should not throw an error', function() {
      chai.assert.doesNotThrow(function(){
        notificationService.sendNewSponsorship({}, 1);
      });
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to sendAcceptSponsorship method', function(){
    
    it('Should define a sendAcceptSponsorship function', function(){
      chai.assert.isDefined(notificationService.sendAcceptSponsorship);
    });
    
    it('Should not throw an error', function() {
      chai.assert.doesNotThrow(function(){
        notificationService.sendAcceptSponsorship({}, 1);
      });
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to sendRejectSponsorship method', function(){
    
    it('Should define a sendRejectSponsorship function', function(){
      chai.assert.isDefined(notificationService.sendRejectSponsorship);
    });
    
    it('Should not throw an error', function() {
      chai.assert.doesNotThrow(function(){
        notificationService.sendRejectSponsorship({}, 1);
      });
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to sendNewTaskOrganizer method', function(){
    
    it('Should define a sendNewTaskOrganizer function', function(){
      chai.assert.isDefined(notificationService.sendNewTaskOrganizer);
    });
    
    it('Should not throw an error', function() {
      chai.assert.doesNotThrow(function(){
        notificationService.sendNewTaskOrganizer({}, 1);
      });
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to sendNewTaskOrganizer method', function(){
    
    it('Should define a sendNewTaskOrganizer function', function(){
      chai.assert.isDefined(notificationService.sendNewTaskOrganizer);
    });
    
    it('Should not throw an error', function() {
      chai.assert.doesNotThrow(function(){
        notificationService.sendNewTaskOrganizer({}, 1);
      });
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to sendUpdateTaskOrganizer method', function(){
    
    it('Should define a sendUpdateTaskOrganizer function', function(){
      chai.assert.isDefined(notificationService.sendUpdateTaskOrganizer);
    });
    
    it('Should not throw an error', function() {
      chai.assert.doesNotThrow(function(){
        notificationService.sendUpdateTaskOrganizer({}, 1);
      });
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to sendDoneTaskOrganizer method', function(){
    
    it('Should define a sendDoneTaskOrganizer function', function(){
      chai.assert.isDefined(notificationService.sendDoneTaskOrganizer);
    });
    
    it('Should not throw an error', function() {
      chai.assert.doesNotThrow(function(){
        notificationService.sendDoneTaskOrganizer({}, 1);
      });
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to sendNewTaskSponsor method', function(){
    
    it('Should define a sendNewTaskSponsor function', function(){
      chai.assert.isDefined(notificationService.sendNewTaskSponsor);
    });
    
    it('Should not throw an error', function() {
      chai.assert.doesNotThrow(function(){
        notificationService.sendNewTaskSponsor({}, 1);
      });
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to sendUpdateTaskSponsor method', function(){
    
    it('Should define a sendUpdateTaskSponsor function', function(){
      chai.assert.isDefined(notificationService.sendUpdateTaskSponsor);
    });
    
    it('Should not throw an error', function() {
      chai.assert.doesNotThrow(function(){
        notificationService.sendUpdateTaskSponsor({}, 1);
      });
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to sendDoneTaskSponsor method', function(){
    
    it('Should define a sendDoneTaskSponsor function', function(){
      chai.assert.isDefined(notificationService.sendDoneTaskSponsor);
    });
    
    it('Should not throw an error', function() {
      chai.assert.doesNotThrow(function(){
        notificationService.sendDoneTaskSponsor({}, 1);
      });
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to sendNewEvent method', function(){
    
    it('Should define a sendNewEvent function', function(){
      chai.assert.isDefined(notificationService.sendNewEvent);
    });
    
    it('Should not throw an error', function() {
      notificationService.sendNewEvent();
      chai.assert.doesNotThrow(function(){
        notificationService.sendNewEvent();
      });
    });
    
  });
  
  ////////////////////////////////////////////////////////////
  describe('Test to sendUpdateEvent method', function(){
    
    it('Should define a sendUpdateEvent function', function(){
      chai.assert.isDefined(notificationService.sendUpdateEvent);
    });
    
    it('Should not throw an error', function() {
      chai.assert.doesNotThrow(function(){
        notificationService.sendUpdateEvent();
      });
    });
    
  });
  
});