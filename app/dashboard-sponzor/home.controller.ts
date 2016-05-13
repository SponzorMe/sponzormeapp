/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class HomeSponsorCtrl{
  
  $inject = [
    '$localStorage',
    'userService',
    'utilsService',
    '$scope',
    '$rootScope',
    'userAuthService',
    'ionicMaterialInk'
  ];
  userAuth:userModule.User;
  events:eventModule.Event[] = [];
  
  constructor(
    private $localStorage,
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService,
    private $scope: angular.IRootScopeService,
    private $rootScope: angular.IRootScopeService,
    private userAuthService: userAuthModule.IUserAuthService,
    private ionicMaterialInk
  ){
    this.ionicMaterialInk.displayEffect();
    
    this.userAuth = this.userAuthService.getUserAuth();
    this.events = this.userAuth.events.filter( this.filterDate );
    
    this.registerListenerEvents();
  }
  
  registerListenerEvents() {
    this.$rootScope.$on('HomeSponsorCtrl:getEvents', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.events = this.userAuth.events.filter( this.filterDate );
    });
  }
  
  doRefresh(){
    this.userService.home( this.userAuth.id  )
      .then( user => {
        this.userAuth = this.userAuthService.updateUserAuth( user );
        this.events = this.userAuth.events.filter( this.filterDate );
        this.$scope.$broadcast('scroll.refreshComplete');
      })
      .catch(() => this.$scope.$broadcast('scroll.refreshComplete') );
    }
  
  filterDate( item ){
    return moment(item.starts).isAfter( new Date() );
  }
  
}
angular
  .module('app.dashboard-sponzor')
  .controller('HomeSponsorCtrl', HomeSponsorCtrl);