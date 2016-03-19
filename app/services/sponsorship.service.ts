/// <reference path="../../typings/main.d.ts" />
/**
* @Servicio de Sponzorships (Beneficios)
*
* @author Sebastian, Nicolas Molina
* @version 0.2

(function() {
  'use strict';

  angular
    .module('app')
    .factory('sponsorshipService', sponsorshipService);

  sponsorshipService.$inject = [
    '$http',
    '$localStorage',
    'BackendVariables',
    '$q',
    '$httpParamSerializerJQLike'
  ];

  function sponsorshipService( $http, $localStorage, BackendVariables, $q, $httpParamSerializerJQLike ) {

    var path = BackendVariables.url;

    var service = {
      allSponsorships: allSponsorships,
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

    function allSponsorships(){
      return $http.get(path + 'sponzorships')
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( response.data.SponzorsEvents );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function getSponzorship( sponzorshipId ){

      //Validate
      var typeSponzorshipId = typeof sponzorshipId;
      if(typeSponzorshipId !== 'string' && typeSponzorshipId !== 'number') throw new Error();

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
        sponzorship.tasks = data.Tasks || [];
        return sponzorship;
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function sponzorshipByOrganizer( organizerId ){

      //Validate
      var typeOrganizerId = typeof organizerId;
      if(typeOrganizerId !== 'string' && typeOrganizerId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'sponzorships_organizer/' + organizerId,
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( preparateData( response.data.SponzorsEvents ) );
      }

      function preparateData( data ){
        return data.map( preparateItem );

        function preparateItem( item ){
          item.starts = moment(item.starts)._d;
          item.ends = moment(item.ends)._d;
          return item;
        }
        
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function sponzorshipBySponzor( sponzorId ){

      //Validate
      var typeSponzorId = typeof sponzorId;
      if( typeSponzorId !== 'string' && typeSponzorId !== 'number') throw new Error();

      return $http({
        method: 'GET',
        url: path + 'sponzorships_sponzor/' + sponzorId,
      })
      .then( complete )
      .catch( failed );

      function complete( response ){
        return $q.when( preparateData( response.data.SponzorsEvents ) );
      }

      function preparateData( data ){
        return data.map( preparateItem );

        function preparateItem( item ){
          item.starts = moment(item.starts)._d;
          item.ends = moment(item.ends)._d;
          return item;
        }
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function createSponzorship( data ){

      //Validate
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

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

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function deleteSponzorship( sponzorshipId ){

      //Validate
      var typeSponzorshipId = typeof sponzorshipId;
      if( typeSponzorshipId !== 'string' && typeSponzorshipId !== 'number') throw new Error();

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
        return $q.when( response.data );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function editSponzorshipPatch( sponzorshipId, data ){

      //Validate
      var typeSponzorshipId = typeof sponzorshipId;
      if(typeSponzorshipId !== 'number' && typeSponzorshipId !== 'string') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

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
        return $q.when( response.data.Sponzorship );
      }

      function failed( response ){
        return $q.reject( response.data );
      }
    }

    function editSponzorshipPut( sponzorshipId, data ){

      //Validate
      var typeSponzorshipId = typeof sponzorshipId;
      if(typeSponzorshipId !== 'number' && typeSponzorshipId !== 'string') throw new Error();
      var typeData = typeof data;
      if(typeData !== 'object' || Array.isArray(data)) throw new Error();

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
        return $q.reject( response.data );
      }
    }

    function getToken(){
      return $localStorage.token;
    }

  }
})();
*/