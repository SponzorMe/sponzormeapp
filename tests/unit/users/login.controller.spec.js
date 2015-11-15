describe('Controlador Login', function () {
  var scope, httpBackend;

  beforeEach(module('app'));

  /*beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    httpBackend.when('GET', 'http://maps.googleapis.com/maps/api/geocode/json?address=london').respond({results: [{}, {}, {}]});
    httpBackend.when('GET', 'views/weather/weather.html').respond('');
    httpBackend.when('GET', 'views/settings/settings.html').respond('');
    httpBackend.when('GET', 'views/search/search.html').respond('');
    $controller('SearchController', {
      $scope: scope
    });
  }));*/

  /*it('Deberia cargar un modelo en blanco', function () {
    expect(scope.model.term).toEqual('');
  });*/

})