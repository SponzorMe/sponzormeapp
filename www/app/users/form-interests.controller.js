/**
* @Controller for Interests of user
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('FormInterestsController', FormInterestsController);

  FormInterestsController.$inject = [
    'userService',
    '$state',
    'utilsService',
    '$localStorage',
    'categoryService'
  ];

  function FormInterestsController( userService, $state , utilsService, $localStorage, categoryService) {

    var vm = this;
    var memorize = [];
    //Attributes
    vm.user = $localStorage.userAuth || {};
    vm.categories = [];
    vm.categorySelected = null;
    //Funcions
    vm.updateInterests = updateInterests;
    vm.getCategory = getCategory;
    vm.isCategorySelected = isCategorySelected;
    
    activate();

    ////////////
    
    function activate(){
      getCategories();
    }

    function updateInterests(){
      var interests = getInterestCheck();
    }

    function getInterestCheck( data ){
      return vm.categories
        .filter( ByInterest )
        .map( mapInterests )
        .reduce( mergeArrays, [] )
        .filter( interestCheck );

        function ByInterest( item ){
          return item.interests;
        }

        function mapInterests( item ){
          return item.interests;
        }

        function mergeArrays(a,b){
          return a.concat(b);
        }

        function interestCheck( item ){
          return item.check;
        }
    }

    function getCategories(){
      utilsService.showLoad();
      categoryService.allCategories()
        .then( complete )
        .catch( failed );

        function complete( categories ){
          utilsService.hideLoad();
          vm.categories = categories;
        }

        function failed( error ){
          utilsService.hideLoad();
          console.log( error );
        }
    }

    function getCategory( category ){
      
      toggleCategory( category );
      if(memorize.indexOf( category.id ) == -1){
        utilsService.showLoad();
        categoryService.getCategory( category.id )
          .then( complete )
          .catch( failed );

          function complete( categoryRta ){
            utilsService.hideLoad();
            category.interests = categoryRta.interests;
            memorize.push( category.id );
          }

          function failed( error ){
            utilsService.hideLoad();
            console.log( error );
          }
      }
    }

    function toggleCategory( category ){
      if(isCategorySelected(category)){
        vm.categorySelected = null;
      }else{
        vm.categorySelected = category;
      }
    }

    function isCategorySelected(category){
      return vm.categorySelected == category;
    }

    
  }
})();