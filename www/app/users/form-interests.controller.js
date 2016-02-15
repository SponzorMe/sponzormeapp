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
        redirectTutorial();
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