// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards','pascalprecht.translate'])


.config(function($stateProvider, $urlRouterProvider, $translateProvider) {

$stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
    })
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
    .state('forgotpassword', {
      url: "/forgot-password",
      templateUrl: "templates/forgot-password.html"
    })
    .state('joinnow', {
      url: "/joinnow",
      templateUrl: "templates/joinnow.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })


  $urlRouterProvider.otherwise("/sign-in");

$translateProvider.translations('en', {
            signin_message: "Sign in",
            goodbye_message: "Goodbye"
        });

$translateProvider.translations('es', {
            signin_message: "Ingresar",
            goodbye_message: "Adios"
        });

$translateProvider.translations('pt', {
            signin_message: "Hola",
            goodbye_message: "Adios"
        });

        $translateProvider.preferredLanguage("en");

        $translateProvider.fallbackLanguage("en");
})
.run(function($ionicPlatform, $translate) {
        $ionicPlatform.ready(function() {
          $translate.use("es");
          });
})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.controller('CardsCtrl', function($scope, TDCardDelegate) {
  console.log('CARDS CTRL');
  var cardTypes = [
    { image: 'img/2.jpeg' },
    { image: 'img/3.jpeg' },
    { image: 'img/4.jpeg' },
  ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
})

.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };
})
.controller('userController', function ($scope, $user) {
  $scope.signIn = function () {
    $user.signIn($scope.user).then(function (response) {
      $scope.user.key = $user.info.key;
      // do more sign up things :)
      // success
    }, function (error){
      // maybe wrong login
      // maybe error server
    });
  };

})
.service('$user', function ($http, $q) {
  var _this = this;
  _this.info = {};

  _this.signIn = function (user) {
    var request;
    request = $http({
      data: {
        email: user.email,
        password: user.password
      },
      method : 'POST',
      url: 'http://staging.sponzor.me/api/v1/authentication'
    });
    return request.then(function (response) {
      console.log(response);
      if(!angular.isObject(response)){
        $q.reject({error: "something error"});
      }
      if(!response.key){
       $q.reject({error: "invalid user"});
      }
      _this.info.key = response.key;
      _this.info.email = user.email;
      return response;
    }, function (error) {
      return error;
    });
  };

});
