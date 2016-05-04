/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../services.d.ts" />
/**
* @Controller for Interests of user
*
* @author Nicolas Molina
* @version 0.1
*/
class FormInterestsCtrl{
  
  $inject = [
    '$state',
    'utilsService',
    'categoryService',
    'userInterestService',
    'userService',
    'userAuthService'
  ];
  userAuth:userModule.User;
  categories:any[] = [];
  
  constructor(
    private $state: angular.ui.IStateService,
    private utilsService: utilsServiceModule.IUtilsService,
    private categoryService: categoryModule.ICategoryService,
    private userInterestService: userInterestModule.IUserAuthService,
    private userService: userModule.IUserService,
    private userAuthService: userAuthModule.IUserAuthService
  ){
    this.userAuth = this.userAuthService.getUserAuth();
    this._getCategories();
  }
  
  updateInterests(){
    this.utilsService.showLoad();
    this.userInterestService.bulkUserInterest( this.userAuth.id, {
      interests: this._getInterestCheck()
    })
    .then( () => {
      this.utilsService.hideLoad();
      if( this.userAuth.type == "0" ){ // is an Organizer.
        this.$state.go("organizer.intro");
      }else{ // is an Sponzor
        this.$state.go("sponzor.intro");
      }
    })
    .catch( error => {
      this.utilsService.hideLoad();
    });

  }
  
  goIntro(){
    if( this.userAuth.type == "0" ){ // is an Organizer.
      this.$state.go("organizer.intro");
    }else{ // is an Sponzor
      this.$state.go("sponzor.intro");
    }
  }
  
  private _getCategories(){
    this.utilsService.showLoad();
    this.categoryService.allCategories()
    .then( categories => {
      this.utilsService.hideLoad();
      this.categories = categories;
    })
    .catch( error => {
      this.utilsService.hideLoad();
    });
  }
  
  private _getInterestCheck(){
    return this.categories
      .filter( item => item.interests )
      .map( item => item.interests )
      .reduce( (a,b) => a.concat(b), [] )
      .filter( item => item.check )
      .map( item => {
        return {
          'user_id': this.userAuth.id,
          'interest_id': item.id_interest
        }
      });
  }
  
}
angular
  .module('app.users')
  .controller('FormInterestsCtrl', FormInterestsCtrl);