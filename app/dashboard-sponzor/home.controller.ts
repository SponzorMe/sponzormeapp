/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services/user.service.ts" />
/// <reference path="../services/userAuth.service.ts" />
/// <reference path="../services/event.service.ts" />
/// <reference path="../services/utils.service.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class HomeSponzorCtrl{
  
  $inject = [
    '$localStorage',
    'userService',
    'utilsService',
    '$scope',
    '$rootScope',
    'userAuthService'
  ];
  userAuth:userModule.User;
  events:eventModule.Event[] = [];
  
  constructor(
    private $localStorage,
    private userService: userModule.IUserService,
    private utilsService: utilsServiceModule.IUtilsService,
    private $scope: angular.IRootScopeService,
    private $rootScope: angular.IRootScopeService,
    private userAuthService: userAuthModule.IUserAuthService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
    this.events = this.userAuth.events.filter( this.filterDate );
    
    this.registerListenerEvents();
  }
  
  registerListenerEvents() {
    this.$rootScope.$on('HomeSponzorCtrl:getEvents', () => {
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
  .controller('HomeSponzorCtrl', HomeSponzorCtrl);