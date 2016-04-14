/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Home Organizer
*
* @author Carlos Rojas, Nicolas Molina
* @version 0.2
*/
class TaskTabsCtrl{
  
  $inject = [
    '$rootScope',
    'userAuthService'
  ];
  userAuth:userModule.User;
  count_tasks:number = 0;
  count_past_tasks:number = 0;
  
  constructor(
    private $rootScope: angular.IRootScopeService,
    private userAuthService: userAuthModule.IUserAuthService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
    
    this.count_tasks = this._countTasks(this.userAuth.events.filter( this._filterEventsIsAfter )).length;
    this.count_past_tasks = this._countTasks(this.userAuth.events.filter( this._filterEventsisBefore )).length;
    
    this._registerListenerCounts();
  }
  
  private _registerListenerCounts(){
    this.$rootScope.$on('TaskTabsCtrl:count_tasks', () => {
      this.userAuth = this.userAuthService.getUserAuth();
      this.count_tasks = this._countTasks(this.userAuth.events.filter( this._filterEventsIsAfter )).length;
      this.count_past_tasks = this._countTasks(this.userAuth.events.filter( this._filterEventsisBefore )).length;
    });
  }
  
  private _filterEventsIsAfter( event ){
    let count = event.perks.reduce((a,b) =>a.concat(b.tasks), []);
    let today = moment( new Date() ).subtract(1, 'days');
    return moment( event.ends ).isAfter( today ) && count.length > 0;
  }
  
  private _filterEventsisBefore( event ){
    let count = event.perks.reduce((a,b) =>a.concat(b.tasks), []);
    let today = moment( new Date() ).subtract(1, 'days');
    return moment( event.ends ).isBefore( today ) && count.length > 0;
  }
  
  private _countTasks( events ) {
    return events
      .reduce((a,b) => a.concat(b.perks), [])
      .reduce((a,b) => a.concat(b.tasks), [])
      .filter( item => item.user_id == this.userAuth.id && item.status != '1' );
  }
    
}
angular
  .module('app.tasks-organizer')
  .controller('TaskTabsCtrl', TaskTabsCtrl);