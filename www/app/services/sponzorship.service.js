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

  sponzorshipService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function sponzorshipService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

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
        return $q.when( preparateData( response.data.data ) );
      }

      function preparateData( data ){
        var sponzorship = data.SponzorEvent;
        sponzorship.sponzor = data.Sponzor || {};
        sponzorship.perk = data.Perk || {};
        sponzorship.organizer = data.Organizer || {};
        sponzorship.event = data.Event || {};
        return sponzorship;
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
        return $q.when( getData( response.data.SponzorsEvents ) );
      }

      function getData( data ){
        return data
          .filter( filterDate )
          .map( preparateItem );

        function preparateItem( item ){
          item.starts = moment(item.starts)._d;
          return item;
        }

        function filterDate( item ){
          return moment(item.ends).isAfter(new Date());
        }
      }

      function failed( response ){
        return $q.reject( response );
      }
    }

    function sponzorshipBySponzor( sponzorId ){
      return $http.get(path + 'sponzorships_sponzor/' + sponzorId)
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( getData( response.data.SponzorsEvents ) );
      }

      function getData( data ){
        return data
          .map( preparateItem );

        function preparateItem( item ){
          item.starts = moment(item.starts)._d;
          return item;
        }
      }

      function failed( response ){
        return $q.reject( response );
      }
    }

    function createSponzorship( data ){
      return $http({
        method: 'POST',
        url: path + 'sponzorships',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.Sponzorship );
      }

      function failed( error ){
        return $q.reject( error.data );
      }
    }

    function deleteSponzorship( sponzorshipId ){
      return $http({
        method: 'DELETE',
        url: path + 'sponzorships/' + sponzorshipId,
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
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
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
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
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic '+ getToken()
        },
        data: $httpParamSerializerJQLike(data)
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.Sponzorship );
      }

      function failed( response ){
        return $q.reject( responses );
      }
    }

    function getToken(){
      return $localStorage.token;
    }

  }
})();