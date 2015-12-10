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
    'categoryService',
    'userInterestService',
    '$q'
  ];

  function FormInterestsController( userService, $state , utilsService, $localStorage, categoryService, userInterestService, $q) {

    var vm = this;
    var memorize = [];
    //Attributes
    vm.userAuth = $localStorage.userAuth || {};
    vm.categories = [];
    vm.categorySelected = null;
    //Funcions
    vm.updateInterests = updateInterests;
    vm.getCategory = getCategory;
    vm.isCategorySelected = isCategorySelected;
    vm.validateTutorial = validateTutorial;
    
    activate();

    ////////////
    
    function activate(){
      getCategories();
    }

    function updateInterests(){
      utilsService.showLoad();
      var interests = getInterestCheck();
      var promises = [];
      for (var i = 0; i < interests.length; i++) {
        promises.push( createUserInterest( interests[i] ) );
      };

      $q.all( promises )
        .then( complete )
        .catch( failed );

      function complete( results ){
        utilsService.hideLoad();
        validateTutorial();
      }

      function failed( error ){
        utilsService.hideLoad();
        console.log( error );
      }

    }

    function createUserInterest( interest ){
      return userInterestService.createUserInterest({
        interest_id: interest.id_interest,
        user_id: vm.userAuth.id
      })
    }

    function getInterestCheck( data ){
      return vm.categories
        .filter( ByInterest )
        .map( mapInterest )
        .reduce( mergeArrays, [] )
        .filter( interestCheck );

        function ByInterest( item ){
          return item.interests;
        }

        function mapInterest( item ){
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

    function saveUser(){
      $localStorage.userAuth = utilsService.updateUserAuth(vm.userAuth);
    }

    function updateUser(){
      vm.userAuth.demo = 1;
      saveUser();
      userService.editUserPatch( vm.userAuth.id, vm.userAuth )
        .then( redirectTutorial )
        .catch( failed );

        function failed( error ){
          console.log( error );
        }
    };

    function validateTutorial(){
      if( vm.userAuth.demo == 0){
        updateUser();
      }else{
        redirectHome();
      }
    }

    function redirectTutorial(){
      if( vm.userAuth.type == 0 ){ // is an Organizer.
        $state.go("organizer.intro");
      }else{ // is an Sponzor
        $state.go("sponzor.intro");
      }
    }

    function redirectHome(){
      if( vm.userAuth.type == 0 ){ // is an Organizer.
        $state.go("organizer.home");
      }else{ // is an Sponzor
        $state.go("sponzor.home");
      }
    }

    
  }
})();