/**
* @Servicio de Sponzorships (Beneficios)
*
* @author Sebastian, Nicolas Molina
* @version 0.2
*/
(function() {
  'use strict';

  angular
    .module('app')
    .factory('sponzorshipService', sponzorshipService);

  sponzorshipService.$inject = [ '$http', '$localStorage', 'BackendVariables', '$q'];

  function sponzorshipService( $http, $localStorage, BackendVariables, $q ) {

    var path = BackendVariables.url;
    var token = $localStorage.token;

    var service = {
      allSponzorships: allSponzorships,
      getSponzorship: getSponzorship,
      sponzorshipByOrganizer: sponzorshipByOrganizer,
      sponzorshipBySponzor: sponzorshipBySponzor,
      createSponzorship: createSponzorship,
      deleteSponzorship: deleteSponzorship,
      editSponzorshipPatch: editSponzorshipPatch,
      editSponzorshipPut: editSponzorshipPut
    };

    return service;

    ////////////

    function allSponzorships(){
      return $http.get(path + 'sponzorships')
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response );
      }

      function failed( response ){
        return $q.reject( response );
      }
    }

    function getSponzorship( sponzorshipId ){
      return $http.get(path + 'sponzorships/' + sponzorshipId)
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response );
      }

      function failed( response ){
        return $q.reject( response );
      }
    }

    function sponzorshipByOrganizer( organizerId ){
      return $http.get(path + 'sponzorships_organizer/' + organizerId)
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.SponzorsEvents );
      }

      function failed( response ){
        return $q.reject( response );
      }
    }

    function sponzorshipBySponzor( sponzorId ){
      return $http.get(path + 'sponzorships_sponzor/' + organizerId)
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.SponzorsEvents );
      }

      function failed( response ){
        return $q.reject( response );
      }
    }

    function createSponzorship( data ){
      return $http({
        method: 'POST',
        url: path + 'sponzorships',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response );
      }

      function failed( response ){
        return $q.reject( response );
      }
    }

    function deleteSponzorship( sponzorshipId ){
      return $http({
        method: 'DELETE',
        url: path + 'sponzorships/' + sponzorshipId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response );
      }

      function failed( response ){
        return $q.reject( response );
      }
    }

    function editSponzorshipPatch( sponzorshipId, data ){
      return $http({
        method: 'PATCH',
        url: path + 'sponzorships/' + sponzorshipId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response );
      }

      function failed( response ){
        return $q.reject( response );
      }
    }

    function editSponzorshipPut( sponzorshipId, data ){
      return $http({
        method: 'PUT',
        url: path + 'sponzorships/' + sponzorshipId,
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
        data: $.param(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response );
      }

      function failed( response ){
        return $q.reject( response );
      }
    }

  }
})();