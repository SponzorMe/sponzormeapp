/**
* @Controller for Interests of user
*
* @author Nicolas Molina
* @version 0.1
*/
(function() {
  //'use strict';

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
    //Attributes
    vm.userAuth = $localStorage.userAuth;
    vm.categories = [];
    //Funcions
    vm.updateInterests = updateInterests;
    
    activate();
    ////////////
    
    function activate(){
      getCategories();
    }

    function updateInterests(){
      utilsService.showLoad();
      
      userInterestService.bulkUserInterest( vm.userAuth.id, {
        interests: getInterestCheck()
      })
      .then( complete )
      .catch( failed );

      function complete( results ){
        utilsService.hideLoad();
        redirectTutorial();
      }

      function failed( error ){
        utilsService.hideLoad();
      }

    }

    function getInterestCheck( data ){
      return vm.categories
        .filter( ByInterest )
        .map( mapInterest )
        .reduce( mergeArrays, [] )
        .filter( interestCheck )
        .map( preparateData );

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
        
        function preparateData( item ) {
           return {
             interest_id: item.id_interest,
             user_id: vm.userAuth.id
           }
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
        }
    }

    function redirectTutorial(){
      if( vm.userAuth.type == 0 ){ // is an Organizer.
        $state.go("organizer.intro");
      }else{ // is an Sponzor
        $state.go("sponzor.intro");
      }
    }

    
  }
})();