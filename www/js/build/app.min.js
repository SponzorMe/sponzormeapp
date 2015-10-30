'use strict';
(function () {

  angular.module('App', [
    'ionic',
    'ionic.service.core',
    'ngCordova', 
    'pascalprecht.translate',
    'ngMessages',
    'ngStorage',
    'base64',
    'loginService',
    'userService',
    'eventService',
    'sponzorshipService',
    'eventService',
    'perkService',
    'perkTaskService',
    'sponzorshipService',
    'imgurUploader',
    'google.places',
    'ngIOS9UIWebViewPatch'
  ])
  .config(function($stateProvider, $urlRouterProvider, $translateProvider) {
    $stateProvider
      .state('signin', {
        url: '/sign-in',
        controller: 'userController',
        templateUrl: 'views/users/sign-in.html'
      })
      .state('joinnow', {
        url: "/joinnow",
        controller: "registerController",
        templateUrl: "views/users/joinnow.html"
      })
      .state('introorganizers', {
        url: "/introorganizers",
        controller: "IntroOrgCtrl",
        templateUrl: "views/intro/introorganizers.html"
      })
      .state('introsponzors', {
        url: "/introsponzors",
        controller: "IntroSpoCtrl",
        templateUrl: "views/intro/introsponzors.html"
      })
      .state('menuorganizers', {
        url: "/menuorganizers",
        abstract: true,
        templateUrl: "views/dashboard/dash-menu-organizers.html"
      })
      .state('menusponzors', {
        url: "/menusponzors",
        abstract: true,
        templateUrl: "views/dashboard/dash-menu-sponzors.html"
      })
      .state('forgotpassword', {
        url: "/forgot-password",
        templateUrl: "views/users/forgot-password.html",
        controller:"forgotController"
      })
      .state('menuorganizers.addevent', {
        url: "/addevent",
        views: {
          'menuContent' :{
            templateUrl: "views/events/add-events.html",
            controller: "AddEventsController"
          }
        }
      })
      .state('menuorganizers.organizershome', {
        url: "/organizershome",
        views: {
          'menuContent' :{
            templateUrl: "views/dashboard/home-organizers.html",
            controller: "HomeOrganizersController"
          }
        }
      })
      .state('menuorganizers.organizersevents', {
        url: "/organizersevents",
        views: {
          'menuContent' :{
            templateUrl: "views/events/dash-events.html",
            controller: "DashEventsController"
          }
        }
      })
      .state('menuorganizers.organizerssponzors', {
        url: "/organizerssponzors",
        views: {
          'menuContent' :{
            templateUrl: "views/sponzors/dash-sponzors.html",
            controller: "DashSponzorsController"
          }
        }
      })
      .state('menuorganizers.organizerstask', {
        url: "/organizerstask",
        views: {
          'menuContent' :{
            templateUrl: "views/tasks/task-organizers.html",
            controller:"taskOrganizerController"
          }
        }
      })
      .state('menuorganizers.addTask', {
        url: "/addTask",
        views: {
          'menuContent' :{
            templateUrl: "views/tasks/add-tasks.html",
            controller: "AddTasksController"
          }
        }
      })
      .state('menuorganizers.organizersinvite', {
        url: "/organizersinvite",
        views: {
          'menuContent' :{
            templateUrl: "views/users/invite-users.html",
            controller: "InviteUsersController"
          }
        }
      })
      .state('menuorganizers.organizerssettings', {
        url: "/organizerssettings",
        views: {
          'menuContent' :{
            templateUrl: "views/users/settings-users.html",
            controller: 'settingUserController'
          }
        }
      })
      .state('menusponzors.homesponzors', {
        url: "/homesponzors",
        views: {
          'menuContent' :{
            templateUrl: "views/sponzors/search.html",
            controller: "SearchController"
          }
        }
      })
      .state('menusponzors.following', {
        url: "/following",
        views: {
          'menuContent' :{
            templateUrl: "views/events/follow-events.html",
            controller: "followEventsController"
          }
        }
      })
      .state('menusponzors.sponzoring', {
        url: "/sponzoring",
        views: {
          'menuContent' :{
            templateUrl: "views/sponzors/dash-sponzoring.html",
            controller: 'sponzoringEventsController'
          }
        }
      })
      .state('menusponzors.sponzorsettings', {
        url: "/sponzorsettings",
        views: {
          'menuContent' :{
            templateUrl: "views/users/settings-users.html",
            controller: 'settingUserController'
          }
        }
      })
      .state('menusponzors.sponzorsinvite', {
        url: "/sponzorsinvite",
        views: {
          'menuContent' :{
            templateUrl: "views/users/invite-users.html",
            controller: "InviteUsersController"
          }
        }
      });


$urlRouterProvider.otherwise("/sign-in");

// Languages
$translateProvider.useStaticFilesLoader({
      prefix: 'langs/lang-',
      suffix: '.json'
    });

$translateProvider.useSanitizeValueStrategy('escaped');
$translateProvider.preferredLanguage("en");
$translateProvider.fallbackLanguage("en");

// End Languages
})

.constant('imgurConfig',{
            client_id: "bdff09d775f47b9",
            client_secret: "c74df575cc74efa5c14c57c4620238e400a4ef32"
})

.value('BackendVariables', {
            url: "http://api.sponzor.me/", // i'm using the Ionic Proxy
            ready: "false"
        })

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
})

.config(['$logProvider', function($logProvider){ // dev: true,  staging: false, prod:false
    $logProvider.debugEnabled(true);
}])

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(5); // improving performance
})



.run(function($ionicPlatform, $translate) {
  $ionicPlatform.ready(function() {
    $translate.use("en");
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

})();

'use strict';
(function(){
  function AddEventsController( $scope, $state, $location, $log, $translate, $localStorage, $cordovaDatePicker, Camera, eventRequest, perkRequest, Utils, $imgur, imgurConfig){
      var counter=0;
      $scope.questionelemnt = [];

      $scope.newItem = function($event){
          $scope.questionelemnt.push(  { id:counter, text1 : '', text2 : '',text3 : '', answer : ''} );
          $event.preventDefault();
          counter++;
      };

      $scope.showitems = function($event){
          $('#displayitems').css('visibility','none');
      };

    document.addEventListener("deviceready", function () {
      $scope.getPhoto = function() {
        var optionsCamera = {
            quality: 50,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: navigator.camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
          };
      Camera.getPicture(optionsCamera).then(function(imageURI) {
        $log.log(imageURI);
        var imageData = imageURI;
        $scope.imageURI = "data:image/jpeg;base64," + imageURI;
        //TODO upload image to imgur and update $scope.event.image
        var params = {
          image: imageData
        };
        $imgur.imageUpload(params).
        then(function(response) {
          $log.log("Response: " + angular.toJson(response));
          $scope.event.image = response.data.link;
          $log.log("Event.image ", $scope.event.image);
        }, function(reason) {
          $log.error('Failed: ' + angular.toJson(reason));
        });
      }, function(err) {
        $log.log(err);
      });
      };

      $scope.selectStart = function(){
        var options = {
          date: new Date(),
          mode: 'date', // or 'time'
          minDate: new Date() - 10000,
          allowOldDates: true,
          allowFutureDates: true,
          doneButtonLabel: 'DONE',
          doneButtonColor: '#F2F3F4',
          cancelButtonLabel: 'CANCEL',
          cancelButtonColor: '#000000'
        };

        $cordovaDatePicker.show(options).then(function(date){
            $scope.event.start = moment(date).format('YYYY-MM-DD');
            $log.log("event start", $scope.event.start);
        });
      };

      $scope.selectEnd = function(){
        var options2 = {
          date: new Date(),
          mode: 'date', // or 'time'
          minDate: new Date() - 10000,
          allowOldDates: true,
          allowFutureDates: true,
          doneButtonLabel: 'DONE',
          doneButtonColor: '#F2F3F4',
          cancelButtonLabel: 'CANCEL',
          cancelButtonColor: '#000000'
        };

        $cordovaDatePicker.show(options2).then(function(date2){
            $scope.event.end = moment(date2).format('YYYY-MM-DD');
            $log.log("event end", $scope.event.end);
        });
      };

      $scope.selectStartTime = function(){
        var options = {
          date: new Date(),
          mode: 'time', // or 'time'
          minDate: new Date() - 10000,
          allowOldDates: true,
          allowFutureDates: true,
          doneButtonLabel: 'DONE',
          doneButtonColor: '#F2F3F4',
          cancelButtonLabel: 'CANCEL',
          cancelButtonColor: '#000000'
        };

        $cordovaDatePicker.show(options).then(function(date3){
            $scope.event.starttime = moment(date3).format('HH:mm:ss');
            $log.log("event start time", $scope.event.starttime);
        });
      };

      $scope.selectEndTime = function(){
        var options = {
          date: new Date(),
          mode: 'time', // or 'time'
          minDate: new Date() - 10000,
          allowOldDates: true,
          allowFutureDates: true,
          doneButtonLabel: 'DONE',
          doneButtonColor: '#F2F3F4',
          cancelButtonLabel: 'CANCEL',
          cancelButtonColor: '#000000'
        };

        $cordovaDatePicker.show(options).then(function(date4){
            $scope.event.endtime = moment(date4).format('HH:mm:ss');
            $log.log("event start time", $scope.event.endtime);
        });
      };

    }, false);

    $scope.init = function(){
      $scope.imageURI = "";
      $scope.event = {};
    };

    $scope.addEvent = function(event){
      Utils.show();

      var idEvent = "";


      $log.log("add Event" + angular.toJson(event));

      var timeini, dateini, timedate;

      $scope.objevent = {}
      $scope.objevent.title = $scope.event.title;
      $scope.objevent.location = $scope.event.location;
      $scope.objevent.location_reference = "referencia";
      $scope.objevent.description = $scope.event.description;
      dateini = moment($scope.event.start,"YYYY-MM-DD").format("YYYY-MM-DD");
      $log.log("dateini ", dateini);
      timeini = moment(dateini + " " + $scope.event.starttime).format("HH:mm:ss");
      $log.log("timeini ", timeini);
      timedate = dateini + " " + timeini;
      $log.log("timedate ", timedate);
      $scope.objevent.starts = timedate;
      //$scope.objevent.starttime = $scope.event.starttime;
      $scope.objevent.ends = $scope.event.end;
      dateini = moment($scope.event.end).format("YYYY-MM-DD");
      $log.log("datefin ", dateini);
      timeini = moment(dateini + " " + $scope.event.endtime).format("HH:mm:ss");
      $log.log("timefin ", timeini);
      timedate = dateini + " " + timeini;
      $log.log("timedate ", timedate);
      //$scope.objevent.image = $scope.event.image;
      //$scope.objevent.image = $scope.event.image;
      if(angular.isDefined($scope.event.image)){
        $scope.objevent.image = $scope.event.image;
      }
      else{
      $scope.objevent.image = "http://i.imgur.com/t8YehGM.jpg";
      }
      $scope.objevent.privacy = $scope.event.public;
      $scope.objevent.lang = $translate.use();
      $scope.objevent.organizer = $localStorage.userAuth.id;
      $scope.objevent.category = 1;
      $scope.objevent.type = $scope.event.type;


      $log.log("Event curated:" + angular.toJson($scope.objevent));

      eventRequest.createEvent($scope.objevent).success(function(adata){
            $log.log("adata=" + angular.toJson(adata));
            idEvent = adata.event.id;
            $log.log("idEvent" + idEvent);

            // TODO create the sponzors first.
            var objperk = {};
            //Utils.show();
            angular.forEach($scope.questionelemnt,function(value,key){
                $log.log("Sponzor Values text1" +  value.text1 + "Value text2" + value.text2 +  " key " + key);
                objperk.kind = value.text1;
                objperk.total_quantity = value.text2;
                objperk.usd = value.text3;
                objperk.reserved_quantity = 0;
                objperk.id_event = idEvent;

                perkRequest.createPerk(objperk)
                .success(
                  function(result){
                    $log.log("result" + angular.toJson(result));
                  }
                )
                .error(function(data,status, headers, config){
                  $log.log("Result" +  angular.toJson(data));
                }
              );
            });
            //Utils.hide();



            Utils.hide();
            if(Utils.trim(adata.message) === "Inserted"){
              Utils.alertshow($translate.instant("MESSAGES.succ_event_tit"),$translate.instant("MESSAGES.succ_event_mess"));
              $scope.event = {};
              $state.go("menuorganizers.organizershome");
            }

      }).
      error(function (data, status, headers, config) {
            $log.error('Error fetching feed:', angular.toJson(data));
            $scope.event = {};
            Utils.hide();
            Utils.alertshow($translate.instant("ERRORS.addeventsform_error_tit"),$translate.instant("ERRORS.addeventsform_error_mess"));
          });



    };

  };
angular.module("App").controller("AddEventsController",AddEventsController);
})();

'use strict';
(function(){
function AddTasksController($scope, $state, $log, $location, $localStorage, perkTaskRequest, sponzorshipRequest, Utils){

    $scope.addTask = function(task){
      Utils.show();
      $log.log("task" +  angular.toJson(task));

      var newPerkTask = {};
      newPerkTask.user_id = $localStorage.userAuth.id;
      newPerkTask.event_id = task.type;
      newPerkTask.perk_id = task.kind;
      newPerkTask.title = task.title;
      newPerkTask.description = task.description;
      newPerkTask.type = 0;
      newPerkTask.status = 0;

      perkTaskRequest.createPerkTask(newPerkTask).success(function(data){
        $log.log("new Perk Task: " + angular.toJson(data));
        Utils.hide();
      }
      ).
      error(function(data, status, headers, config){
        $log.log("error perkTask:" + angular.toJson(data));
        Utils.hide();
      }
      );

    };

    $scope.init = function(){
      // TODO get all users events


      // TODO get user type of sponzors
      $log.log("init");

    };

  };
angular.module("App").controller("AddTasksController", AddTasksController);
})();

'use strict';
(function(){
  function DashEventsController($scope, $state, $log, $location, $localStorage, userRequest, Utils) {
    $scope.events = [];
    $scope.newEvent = function () {
      $state.go('menuorganizers.addevent');
    };

    $scope.init = function(){
      Utils.show();
      var userId = $localStorage.userAuth.id;
      $log.log("userId", userId);
      userRequest.oneUser(userId).success(function(adata){
          $log.log("all events", angular.toJson(adata));
          //$scope.events = adata.data.user.events;
          angular.forEach(adata.data.user.events, function(element) {
            element.starts = moment(element.starts).format('MMMM Do YYYY');
            $scope.events.push(element);  
          });
          Utils.hide();

      }).
      error(function(data, status, headers, config){
          $log.error("Error when get events", angular.toJson(data));
          Utils.hide();
      });
    };
  };
angular.module('App').controller('DashEventsController', DashEventsController);
})();

'use strict';
(function () {
function menuOrganizersController($scope, $state, $localStorage, $location, $translate, $log, Utils) {

      $scope.logout = function(){
        $localStorage.$reset();
        $state.go('signin');
      };

    };
angular.module('App').controller('menuOrganizersController', menuOrganizersController);
})();

'use strict';
(function () {
function menuSponzorsController($scope, $state, $localStorage, $location, $translate, $log, Utils) {

    $scope.logout = function(){
      $localStorage.$reset();
      $state.go('signin');
    };

  };
angular.module('App').controller('menuSponzorsController', menuSponzorsController);
})();

'use strict';
(function(){
function sponzoringEventsController($scope, $state, $localStorage, $location, $translate, $log, sponzorshipRequest, Utils) {
      $scope.init = function(){
        Utils.show();
        var userId = $localStorage.userAuth.id;
        sponzorshipRequest.sponzorshipBySponzor($localStorage.userAuth.id).success(
          function(data){
            $log.log("Data: " + angular.toJson(data) + " Contenido: " + data.SponzorsEvents.length);

            $scope.sponzorships = [];
            angular.forEach(data.SponzorsEvents, function(value, key) {
              if (value.status == 1) {
                $scope.sponzorships.push(value);
                $log.log("Valor en sponzorships: " + angular.toJson(value));
              }
            });
            Utils.hide();
          }
        )
        .error(
          function(data,headers,status,config){
            $log.log("Error: " + angular.toJson(data));
            Utils.hide();
          }
        );
      };
    };
angular.module('App').controller('sponzoringEventsController',sponzoringEventsController );
})();

'use strict';
(function(){
function DashSponzorsController($scope, $state, $log, $location, $localStorage, perkTaskRequest, sponzorshipRequest, Utils) {
      $scope.sponzorships={};
      $scope.tasks={};

      $scope.init = function(){
        Utils.show();
        var userId = $localStorage.userAuth.id;
        $log.log("userId", userId);
        sponzorshipRequest.sponzorshipByOrganizer(userId).success(function(data){
          $log.log("Sponzorships: " + angular.toJson(data));
          Utils.hide();
        }
        ).
        error(function(data, status, headers, config){
          $log.log("error perkTask", angular.toJson(data));
          Utils.hide();
        });

      };
  };
angular.module("App").controller("DashSponzorsController", DashSponzorsController);
})();

'use strict';
(function(){
function followEventsController($scope, $state, $localStorage, $location, $translate, $log, sponzorshipRequest, Utils) {
      $scope.init = function(){
        var userId = $localStorage.userAuth.id;
        sponzorshipRequest.sponzorshipBySponzor($localStorage.userAuth.id).success(
          function(data){
            $log.log("Data: " + angular.toJson(data) + " Contenido: " + data.SponzorsEvents.length);

            $scope.sponzorships = [];
            angular.forEach(data.SponzorsEvents, function(value, key) {
              if (value.status == 0 || value.status === 2) {
                $scope.sponzorships.push(value);
                $log.log("Valor en sponzorships: " + angular.toJson(value));
              }
            });

          }
        )
        .error(
          function(data,headers,status,config){
            $log.log("Error: " + angular.toJson(data));
          }
        );
      };
    };
angular.module('App').controller('followEventsController',followEventsController );
})();

'use strict';
(function () {
  function forgotController($scope, $state, userRequest, $log, Utils) {
    $scope.resetPass = function (user) {
      Utils.show();
      console.log("Usuario " + user.email);

      $scope.objuser = {}
      $scope.objuser.email = user.email;

      userRequest.forgotPassword($scope.objuser).success(function(adata){
            $log.log("adata=" + angular.toJson(adata));
            user.email ="";
            Utils.hide();
      }).
      error(function (data, status, headers, config) {
              // data is always undefined here when there is an error
              $log.error('Error fetching feed:', angular.toJson(data));
              if(data.message === "Invalid credentials"){
              Utils.alertshow($translate.instant("ERRORS.signin_title_credentials"),$translate.instant("ERRORS.signin_incorrect_credentials"));
              }
              user.email ="";
              Utils.hide();
          });
    };

  };
angular.module('App').controller('forgotController', forgotController);
})();

'use strict';
(function(){
  function HomeOrganizersController($scope, $state, $log, $location, $localStorage, userRequest, sponzorshipRequest, Utils) {
    $scope.events = [];
    $scope.sponzorships = [];

    $scope.init = function(){
      Utils.show();
      var userId = $localStorage.userAuth.id;
      $log.log("userId", userId);
      userRequest.oneUser(userId).success(function(adata){
          $log.log("all events", angular.toJson(adata));
          //$scope.events = adata.data.user.events;
          angular.forEach(adata.data.user.events, function(element) {
            element.starts = moment(element.starts).format('MMMM Do YYYY');
            $scope.events.push(element);
            if($scope.events.length > 3 ){
              $scope.events.shift();
            }
          });
          Utils.hide();

      }).
      error(function(data, status, headers, config){
          $log.error("Error when get events", angular.toJson(data));
          Utils.hide();
      });



      sponzorshipRequest.organizerSponzors(userId).success(function(adata2){
        $log.log("all perks", angular.toJson(adata2));
        //TODO get the last three Sponzorships and save in $scope.sponzorships
      }
      ).
      error(function(data2, status, headers, config){
          $log.error("Error when get events", angular.toJson(data2));
      });
    };



  };
angular.module('App').controller('HomeOrganizersController', HomeOrganizersController);
})();

'use strict';
(function(){
  function IntroOrgCtrl($scope, $state, $ionicSlideBoxDelegate) {

    // Called to navigate to the main app
    $scope.startApp = function() {
      $state.go("menuorganizers.organizershome");
    };
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
  };
angular.module('App').controller('IntroOrgCtrl', IntroOrgCtrl);
})();

'use strict';
(function(){
function IntroSpoCtrl($scope, $state, $ionicSlideBoxDelegate) {

    // Called to navigate to the main app
    $scope.startApp = function() {
      $state.go("menusponzors.homesponzors");
    };
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
  };
angular.module('App').controller('IntroSpoCtrl', IntroSpoCtrl);
})();

'use strict';
(function () {
  function InviteUsersController($scope,$state,$location,$log, $localStorage, userRequest, Utils){
    $scope.init = function(){
      //check the session
      if(!userRequest.checkSession($localStorage.token,$localStorage.userAuth)){
        $state.go("signin");
      }
    };

    $scope.invitefriend = function(user){
            Utils.show();
             $scope.objuserinv = {};
             $scope.objuserinv.user_id = $localStorage.userAuth.id;
             $scope.objuserinv.email = user.email;
             $scope.objuserinv.message = "Try this ;)";
             $log.log("Scope objuserinv ",angular.toJson($scope.objuserinv));
             userRequest.invitedUser($scope.objuserinv).success(function(adata){
                   $log.log("Enviado", angular.toJson(adata));
                   Utils.hide();
                   Utils.alertshow("Nice!", "Your Invitation was Sent.");
             })
             .error(function(data, status) {
               $log.error('Invite User error', status, data);
               Utils.hide();
               })
             ;

       }

  };
angular.module("App").controller("InviteUsersController", InviteUsersController);
})();

'use strict';
(function () {
  function registerController($scope, $state, userRequest, $translate, $log, Utils) {
    // we will store all of our form data in this object
    $scope.user = {};
    if(!angular.isDefined($scope.step)){
      $scope.step = 1;
    }


    $scope.step2 = function(){
      $scope.step++;
      //$state.go('joinnow.step2');
    }
    $scope.step3 = function(){
      $scope.step++;
      //$state.go('joinnow.step2');
    }

    $scope.register = function (user) {
      Utils.show();
      $log.log("Usuario " + user.email);
      $log.log("Pass " + user.password);
      $log.log("Type " + user.type);


      $scope.objuser = {}
      $scope.objuser.email = user.email;
      $scope.objuser.password = user.password;
      $scope.objuser.password_confirmation = user.password;
      $scope.objuser.lang = "en";
      $scope.objuser.type = user.type;
      $scope.objuser.name = "First Name" + " " + "Last Name";


      userRequest.createUser($scope.objuser).success(function(adata){
            $log.log("adata=" + angular.toJson(adata));
            user.email = "";
            user.password = "";
            $state.go("signin");
            Utils.alertshow($translate.instant("MESSAGES.succ_user_tit"),$translate.instant("MESSAGES.succ_user_mess"));
            Utils.hide();
      }).
      error(function (data, status, headers, config) {
              // data is always undefined here when there is an error
              $log.error('Error fetching feed:', angular.toJson(data));
              $log.error("data.error.email: ",Utils.trim(data.error.email));
              if(Utils.trim(data.message) === "Invalid credentials"){
                Utils.alertshow($translate.instant("ERRORS.signin_title_credentials"),$translate.instant("ERRORS.signin_incorrect_credentials"));
              }
              else if (Utils.trim(data.error.email) === "The email has already been taken.") {
                Utils.alertshow($translate.instant("ERRORS.signin_taken_credentials_title"),$translate.instant("ERRORS.signin_taken_credentials_message"));
              }
              else if (Utils.trim(data.message) === "Not inserted") {
                Utils.alertshow($translate.instant("ERRORS.signin_notinserted_credentials_title"),$translate.instant("ERRORS.signin_notinserted_credentials_message"));
              }

              Utils.hide();
          });
      ;
    };

  };
angular.module('App').controller('registerController', registerController);
})();

'use strict';
(function () {
function SearchController($scope, $http, $localStorage, $location, $translate, $log, eventRequest, Utils) {
    $scope.events = [];
    $scope.init = function(){
        Utils.show();
        eventRequest.allEvents().success(function(data){
          $scope.events = data.events;
          Utils.hide();

        }).error(function(data,headers,status, config){
          $log.log("Data: " + angular.toJson(data));
          Utils.hide();
        }
      );
    };
  };
angular.module('App').controller('SearchController', SearchController);
})();

'use strict';
(function () {
  function settingUserController($scope, $state, $base64, $localStorage, $location, $translate, $log, $cordovaFile, $cordovaCamera, $cordovaFileTransfer, $timeout, $imgur, userRequest, Utils, imgurConfig, Camera) {
    $scope.user = $localStorage.userAuth;
    $log.log("userAuth",angular.toJson($scope.user));

    $scope.myPicture = "";
    $scope.file = "";
    var options = {
        quality: 50,
        destinationType: navigator.camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: navigator.camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

    $scope.init = function(){
      //check the session
      if(!userRequest.checkSession($localStorage.token,$localStorage.userAuth)){
        $state.go("signin");
      }
      // TODO - download the current user profile image and convert to base64
      if(!Utils.isUndefinedOrNull($localStorage.userAuth.image))
      {
      if($localStorage.userAuth.image != "")
      {
      $log.log("User image " + $localStorage.userAuth.image);
      $scope.downloadImage($localStorage.userAuth.image);
      $log.log("scope.myPicture = " + $scope.myPicture);
      }
      }
      else{
        $scope.myPicture = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wgARCACgAKADACIAAREBAhEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAUHAQQGAwL/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/9oADAMAAAEQAhAAAAGvB0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbkyc0zgAAAG8aLe8zVbukAD6LJ5nV6vN5zm+l6mqxzavoVNizNwqfNjb5VtoSWpEZ7cvsktXVhzpUA1Hv4Cyfmt0tq6spUUWJG8YrtpCuRYcZx4nprhx0sZGrLJxW6WbhCgQDOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//EACYQAAIDAAEDAQkAAAAAAAAAAAQFAQIDBhITIHAAEBEUFSMwQEH/2gAIAQAAAQUC9DhRtir6I2GdPwwIRI4om5dqD7ablC7CaeKzuTxtVubZnyG2dm/nn0dwBhofnYiVxbneVntyWZut8K1m1tKlKCxCx3Nw13U707TALqFAYLxgtGbAXAPj4m4+gGtx1wBY4W7QoMeKceE0XhqOox9yG0lPOTfdYThgPf34aTjuZiG6sKMAougrJBpByzq0aLrEpWtBNBWAmi4o9WdhqwVmY5ta3fEstpZS2rZEgLxCNkqfqJLVd3y2Sw2GZ/ztvHC1BwZn4z+l/PRv/8QAFBEBAAAAAAAAAAAAAAAAAAAAYP/aAAgBAgEBPwFJ/8QAGREBAQADAQAAAAAAAAAAAAAAEQAQIFAx/9oACAEBAQE/AeWzOxexERg5X//EADQQAAIBAwEGAwUHBQAAAAAAAAIDAQAEERIFEyEiMUEUIFEjMlJhkTAzNEJwgfBAQ3Fy0f/aAAgBAAAGPwL9DtFusjL5dq1bnPyEsz9lv4Se5+PHCpi2VJ461uQWUt6acca0XC5AuvmZGzvxWrnx1/mKSsHt1yXNBl275p0pxjhnHr9gG89zPHHpV+MBAoBWla4irLZ1pONJDvp+KZpxowN1dH73wjFbONn3kxx+nlgRjJTOIioiD0O055Zz9ahF4vdXeORy+FRZO4wJc3zir6ItlKBJwCTiO9W2zlWy2avvDKONXMgnS1GRJeMjPzijDSEu1RBFjoXWmNfaqHZyeCtQ8xUu8i0VL7mdUBPQIq2Uad0w4hgyEcC9RmtoClQsujDVjHT0x9KuHXY6M82O+IpTD6kcsmpVHbSqP5+9WdmvtGPrR2xWYRYrVljzjjM+RbR6gUFQ3CbsUuxggOvEXF2LnD7oBTtou5SdMisa0zL9CSyKBHEavWo2hob4uBxC+2avG3OZY3mjHeaYraUGZy3e4H81LB03CgV0UMcJpQXC3KFE+zGOOYoLx8SKh5Yj0jFOurdhLkuEf60xBsYd2zrn/P8AypbcZxomIxGa8VjPtd5j968apRsvNOBgukUDLrxMyP8AY/LmggVCpK+ABHbzWd5qGLdNvMafU5xUzPWeP9Hjt+jn/8QAKRABAAIBAgUCBgMAAAAAAAAAAQARITFBUWFxgZGhsRAgcNHh8DBAwf/aAAgBAAABPyH6HU8rLs6naPGSag8ERFERMI7fwoWz+R0jTPOmA7sYl6o4E1uFXIoNInJPmsSAXc7c9kw5JUSmaHlct0YHoa5lnGKGrLl5lkslxZBx8bLNTa3UxYhbBXhRl41n7y4Ri8JxtGGOr7zK9eXGyssurz8jeggbrB41HiU7cUEGi1Ba/caR8hZZsF+uPMw/AfW1fbzCjkhbNdPvAe7pTccJxVc5jvO8kRA8jELfglymF7vrKwjlurdHau7Cy4Pw1D21mguj8EQeRmK2lrgK5jyJ2rt+0cGx9Q6+sFb1SOS69ieKZIBd2c806Xw+IgCYHemUVv5T39pU4jiYel+87SYsa+weZQDLs2HU754sCT3YbFWv+zYO8cXHLWPLzQ1PPyR9DaV4J6eA5fp+YW1kZbeD3idBw8GgnaPWJGdni4aJVbveA2RjztTvqqaMMLpeL+JR6GQtvY9bjDX0phzfkQdZVGILc4TOgeRia7FdX+nbqO6rx9HP/9oADAMAAAEAAgAAABD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/d//AP8A791//SYkUot6e/tc+ueeONcc/wD3/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/xAAaEQACAwEBAAAAAAAAAAAAAAAAEQEQUDFB/9oACAECAQE/EMpCEKvBWzg5HI7c5X//xAAeEQADAQABBQEAAAAAAAAAAAAAAREhEDBAUFFhcf/aAAgBAQEBPxDv6ulJpZnH4PwNpqk3ROLn0olWkSEEEEVpIs8T/8QAJhABAQACAgICAQMFAAAAAAAAAREAITFBUXFhgZEQIHAwQKGx0f/aAAgBAAABPxD+DkJkiIHlID24BPL9Hg1+riIiQIo5E6f6IfBr0LPk12Ew+nVnw6gC9Frm8PUxJDoO11l9R08iQj+dfuTTNM3327T9GbyMIeGQV9Dpcb0PTiB++B+RwZgF95wge3EBVA85GlL4zZKX3iBVA83AJRE84jZfbuHuZZkgnWWL9igE4OvKUiRqbQziN87GARW8BRQ8IX7PIYhYLLFflrHJUHwv7ASKZVkA9rnNdiazCSbDpE7POHdkenbF5GDsq3JjWFqITs7A4TF613+nldTqdpci2q0i1UfFHAIEzVxyCtGdIJdPyTXKpPNwIsHE9uBJAQK0HV0a5Tti5OD9M1w9TZAq9EwBydIlBgFHPnvwxB0Gx7um6EqnxhqIsTWANDV1zrKYKh6gT6Y/GKhIPhB/yPxhKAX8SfwLiCmTCCl9+jYsJoZoAbLHNT7/AO/rwaiMRMfcx8Ik48pRDSpaEmDY+qqCKFKxQUBcMErTdQu9gWeTyyd3wk9Qbcre3jOCAo2gkmhSHjq5GRC6hLX4KduoYKSu7uSEhaCmpMtz0CWQIE0aNkr5y2dA9AAaWCARevlm9gXKgQ5alnnVmK6i0XQMUdBj3ia82JAr1IQHfWV+qGSpwb2CXOg51kaE9ahg98IJ1DoEFLT4nOLkBQoN1BE60a6xMkbMnKAcw0aPl3+zgA+zISQZ0Ydsr8GHlRvdfePhXn5K/wC/7NcJwxaHyHF/hz//2Q==";
        $scope.file = "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";
      }

    };

    $scope.editUser = function(user){
      $log.log("User", angular.toJson(user));

      var imageData = $scope.file;
      $log.log("data:",imageData);

      var clientId = imgurConfig.client_id;
      $log.log("clientId:", imgurConfig.client_id);

      Utils.show();
      var params = {
        image: imageData
      };
      $imgur.imageUpload(params).
      then(function(response) {
        $log.log('Success: ' + angular.toJson(response));

        user.image = response.data.link;
        $log.log("User Image:", user.image);

        userRequest.editUserPatch($scope.user.id, user)
        .success(function(response){
        $log.log("response" +  angular.toJson(response));
        //$state.go("introorganizers");
        Utils.alertshow("Success","User Updated.");
        })
        .error(function(data, status) {
        $log.error('editUserPatch error', status, data);
        Utils.alertshow("Error","Ops. Something happened. Try later...");
        })
        .finally(function() {
          $log.log("finally finished editUserPatch");
        });

        Utils.hide();
      }, function(reason) {
        $log.error('Failed: ' + angular.toJson(reason));
        Utils.hide();
      });


    };

    document.addEventListener("deviceready", function () {

    $scope.fromAlbum = function(){

          Utils.show();

          $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.myPicture = "data:image/jpeg;base64," + imageData;
            $scope.file = imageData;
            $log.log("imageData: ", imageData);
            Utils.hide();
          }, function(err) {
            // error
          });

      };

    $scope.downloadImage = function(urlImage){
      var url = urlImage;
      var targetPath = cordova.file.applicationStorageDirectory + "spzProfile.jpg";
      $log.log("url " + url);
      $log.log("targetPath " + targetPath);
      var trustHosts = true
      var options = {};

      $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
        .then(function(result) {
          // Success!
          $log.log("Download image success" + angular.toJson(result));
          $log.log("nativeURL= " + result.nativeURL);

          Camera.toBase64Image(result.nativeURL).then(function (_result) {
              $log.log("resul.nativeURL ", result.nativeURL );
              var binImage = "data:image/jpeg;base64," + _result.imageData;
              $log.log("binImage=", binImage);
              $scope.file = _result.imageData;
              $scope.myPicture = binImage;
              $cordovaFile.removeFile(cordova.file.applicationStorageDirectory, "spzProfile.jpg")
              .then(function (success) {
                  $log.log("Deleted File. " + angular.toJson(success));
                }, function (error) {
                  // error
                  $log.log("Error. Deleting File. " + angular.toJson(error));
                });
          }).then(function (_convertedBase64) {
              $log.log("convert base image ");
          }, function (_error) {
              $log.log(_error);
          });

          $log.log("Scope.myPicture = " + angular.toJson($scope.myPicture));

        }, function(err) {
          // Error
          $log.log("Download image Error" + angular.toJson(result));
        }, function (progress) {
          $timeout(function () {
            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
          })
        });
    };

    }, false);

  };
angular.module('App').controller('settingUserController', settingUserController);
})();

'use strict';
(function () {
  function userController($scope, $state, $base64,$localStorage, $log, $location, $translate, loginRequest, userRequest, Utils) {

    $scope.init = function(){
      //check the session
      if(userRequest.checkSession($localStorage.token,$localStorage.userAuth)){
        if($localStorage.userAuth.type == 0){ // is an Organizer
            if($localStorage.userAuth.demo == 0)
            {
              var user = {};
              $log.log("id de usuario:" + $localStorage.userAuth.id);
              user.demo = 1;
              userRequest.editUserPatch($localStorage.userAuth.id, user)
            .success(function(response){
              $log.log("response" +  angular.toJson(response));
              $localStorage.userAuth.demo = 1;
              $state.go("introorganizers");
            })
            .error(function(data, status) {
              $log.error('editUserPatch error', status, data);
              })
            .finally(function() {
                $log.log("finally finished editUserPatch");
              });
            }
            else{
              $state.go("menuorganizers.organizershome");
            }
        }
        else{ // is a Sponzor
          if($localStorage.userAuth.demo == 0)
          {
             var user = {};
             $log.log("id de usuario:" + $localStorage.userAuth.id);
             user.demo = 1;
             userRequest.editUserPatch($localStorage.userAuth.id, user)
             .success(function(response){
             $log.log("response" +  angular.toJson(response));
             $localStorage.userAuth.demo = 1;
             $state.go("introsponzors");
             })
             .error(function(data, status) {
               $log.error('editUserPatch error', status, data);
               })
             .finally(function() {
                 $log.log("finally finished editUserPatch");
               });
          }
          else{
             $state.go("menusponzors.homesponzors");
          }
        }

      }
    };

    $scope.signIn = function (user) {
      console.log(user);
      Utils.show();

      $scope.objuser = {}
      $scope.objuser.email = user.email;
      $scope.objuser.password = user.password;

      loginRequest.login($scope.objuser).success(function(adata){
            $log.log("adata=" + angular.toJson(adata));
            $localStorage.token = $base64.encode($scope.objuser.email +':'+ $scope.objuser.password);
            $log.log("")
            // we need parse variable types in order to use in the app.
            adata.user.age = parseInt(adata.user.age);
            $localStorage.userAuth = adata.user;
            $log.log("localStorage=" + angular.toJson($localStorage.userAuth));

            if(adata.user.type == 0){ // is an Organizer.
                $log.info("Is an Organizer");

                if(adata.user.demo == 0)
                {
                  var user = {};
                  $log.log("id de usuario:" + $localStorage.userAuth.id);
                  user.demo = 1;

                  userRequest.editUserPatch($localStorage.userAuth.id, user)
                .success(function(response){
                  $log.log("response" +  angular.toJson(response));
                  $localStorage.userAuth.demo = 1;
                  $state.go("introorganizers");
                })
                .error(function(data, status) {
                  $log.error('editUserPatch error', status, data);
                  })
                .finally(function() {
                    $log.log("finally finished editUserPatch");
                  });


                }
                else{
                  $state.go("menuorganizers.organizershome");
                }
            }else{ // is an Sponzor

                $log.info("Is an Sponzor.");

                if(adata.user.demo == 0)
                {
                      var user = {};
                      $log.log("id de usuario:" + $localStorage.userAuth.id);
                      user.demo = 1;
                      userRequest.editUserPatch($localStorage.userAuth.id, user)
                      .success(function(response){
                      $log.log("response" +  angular.toJson(response));
                      $localStorage.userAuth.demo = 1;
                      $state.go("introsponzors");
                      })
                      .error(function(data, status) {
                        $log.error('editUserPatch error', status, data);
                        })
                      .finally(function() {
                          $log.log("finally finished editUserPatch");
                        });
               }
               else{
                 $state.go("menusponzors.homesponzors");
               }

            }
            Utils.hide();
      }).
      error(function (data, status, headers, config) {
              // data is always undefined here when there is an error
              $log.error('Error fetching feed:', angular.toJson(data));
              if(data.message === "Invalid credentials"){
              Utils.alertshow($translate.instant("ERRORS.signin_title_credentials"),$translate.instant("ERRORS.signin_incorrect_credentials"));
              }
              Utils.hide();
          });
      ;
    };

  };
angular.module('App').controller('userController', userController);
})();

'use strict';
(function(){
  function taskOrganizerController($scope, $state, $log, $location, $localStorage, sponzorshipRequest, Utils){

      $scope.newEvent = function(){
        $state.go('menuorganizers.addTask');
      };

      $scope.init = function(){

        var userId = $localStorage.userAuth.id;


        sponzorshipRequest.sponzorshipByOrganizer(userId).success(
        function(data){
          $log.log(data);
        }
        ).
        error(
          function(data, status, headers, config){
          $log.log(data)
          }
        );

      };
  };
angular.module("App").controller("taskOrganizerController", taskOrganizerController);
})();

'use strict';
(function () {
angular.module('App')
.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
});
})();

'use strict';
(function () {
  angular.module("App")
  .factory('Camera', ['$q', function($q) {

    return {
      getPicture: function(options) {
        var q = $q.defer();

        navigator.camera.getPicture(function(result) {
          // Do any magic you need
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);

        return q.promise;
      },
      /**
             *
             * @param img_path
             * @returns {*}
             */
            resizeImage: function (img_path) {
                var q = $q.defer();
                window.imageResizer.resizeImage(function (success_resp) {
                    console.log('success, img re-size: ' + JSON.stringify(success_resp));
                    q.resolve(success_resp);
                }, function (fail_resp) {
                    console.log('fail, img re-size: ' + JSON.stringify(fail_resp));
                    q.reject(fail_resp);
                }, img_path, 200, 0, {
                    imageDataType: ImageResizer.IMAGE_DATA_TYPE_URL,
                    resizeType: ImageResizer.RESIZE_TYPE_MIN_PIXEL,
                    pixelDensity: true,
                    storeImage: false,
                    photoAlbum: false,
                    format: 'jpg'
                });

                return q.promise;
            },

            toBase64Image: function (img_path) {
                var q = $q.defer();
                window.imageResizer.resizeImage(function (success_resp) {
                    console.log('success, img toBase64Image: ' + JSON.stringify(success_resp));
                    q.resolve(success_resp);
                }, function (fail_resp) {
                    console.log('fail, img toBase64Image: ' + JSON.stringify(fail_resp));
                    q.reject(fail_resp);
                }, img_path, 1, 1, {
                    imageDataType: ImageResizer.IMAGE_DATA_TYPE_URL,
                    resizeType: ImageResizer.RESIZE_TYPE_FACTOR,
                    format: 'jpg'
                });

                return q.promise;
            }
    }
  }]);
})();

/**
* @Servicio de Categories
*
* @author Sebastian
* @version 0.1
*/
/*
angular.module('App', ['ngCookies'])
	.factory('categoryRequest', function($http,$cookies) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $cookies.get('token');
		return {
			/**
			* Get all categories
			* @returns success(function(data, status, headers, config)
			
			allCategories : function(){
				return $http.get(path + 'categories');

			},
			/**
			* Get Category By Id
			* @param {JSON} categoryId
			* @returns success(function(data, status, headers, config)
			
			oneCategory : function(categoryId){
				return $http.get(path + 'categories/' + categoriesId);

			},
			createCategory : function(data){
				return $http({
					method: 'POST',
					url: path + 'categories',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteCategory : function(categoryId){
				return $http({
					method: 'DELETE',
					url: path + 'categories/' + categoriesId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editCategoryPatch : function(categoryId,data){
				return $http({
					method: 'PATCH',
					url: path + 'categories/' + categoriesId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editCategoryPut : function(categoryId,data){
				return $http({
					method: 'PUT',
					url: path + 'categories/' + CategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});
*/
/**
* @Servicio de Eventos
*
* @author Sebastian
* @version 0.1
*/
angular.module('eventService', ['ngStorage'])
	.factory('eventRequest', function($http,$localStorage,$log,BackendVariables) {
		var path = BackendVariables.url; //API path
		var token = $localStorage.token;
		$log.info("Token in userService:", token);
		return {
			allEvents : function(){
				return $http.get(path + 'events');

			},
			oneEvent : function(EventId){
				return $http.get(path + 'events/' + EventId);

			},
			createEvent : function(data){
				return $http({
					method: 'POST',
					url: path + 'events',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteEvent : function(EventId){
				return $http({
					method: 'DELETE',
					url: path + 'events/' + EventId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editEventPatch : function(EventId,data){
				return $http({
					method: 'PATCH',
					url: path + 'events/' + EventId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editEventPut : function(EventId,data){
				return $http({
					method: 'PUT',
					url: path + 'events/' + EventId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});

/**
* @Servicio de event_types
*
* @author Sebastian
* @version 0.1
*/
/*
angular.module('App', ['ngCookies'])
	.factory('eventTypeRequest', function($http,$cookies) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $cookies.get('token');
		return {
			allEventTypes : function(){
				return $http.get(path + 'event_types');

			},
			oneEventTypes : function(eventTypeId){
				return $http.get(path + 'event_types/' + categoriesId);

			},
			createEventType : function(data){
				return $http({
					method: 'POST',
					url: path + 'event_types',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteEventType : function(eventTypeId){
				return $http({
					method: 'DELETE',
					url: path + 'event_types/' + categoriesId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editEventTypePatch : function(eventTypeId,data){
				return $http({
					method: 'PATCH',
					url: path + 'event_types/' + categoriesId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editEventTypePut : function(eventTypeId,data){
				return $http({
					method: 'PUT',
					url: path + 'event_types/' + CategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});
*/
/*
'use strict';
(function () {
angular.module('App').factory('gStorage', function(googleConfiguration, $log, $timeout, BackendVariables) {
  return {
      load: function() {
      if (angular.isUndefined(gapi.client)) {
        $timeout(load, 500);
      } else {
        gapi.client.setApiKey(googleConfiguration.apiKey);
        gapi.auth.setToken(BackendVariables.token);
        gapi.client.load('storage', googleConfiguration.api_version , function() {
          $log.log('loaded! :');
          BackendVariables.ready = "true";
          var request = gapi.client.storage.buckets.list({ project: googleConfiguration.project});
          $log.log(angular.toJson(request));
          request.execute(function(response) { $log.log(angular.toJson(request)); });
        });
        }
      },
      getToken: function() {
        $log.log("getToken()");
        var pHeader = {"alg":"RS256","typ":"JWT"}
        var sHeader = angular.toJson(pHeader);
        var pClaim = {};
        pClaim.aud = "https://www.googleapis.com/oauth2/v3/token";
        pClaim.scope = googleConfiguration.scopes;
        pClaim.iss = googleConfiguration.client_email;
        pClaim.exp = KJUR.jws.IntDate.get("now + 1hour");
        pClaim.iat = KJUR.jws.IntDate.get("now");

        var sClaim = angular.toJson(pClaim);
        var sJWS = KJUR.jws.JWS.sign(null, sHeader, sClaim, googleConfiguration.private_key);
        $log.log("sJWS: ", sJWS);
        var XHR = new XMLHttpRequest();
        var urlEncodedData = "";
        var urlEncodedDataPairs = [];

        urlEncodedDataPairs.push(encodeURIComponent("grant_type") + '=' + encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer"));
        urlEncodedDataPairs.push(encodeURIComponent("assertion") + '=' + encodeURIComponent(sJWS));
        urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

        // We define what will happen if the data are successfully sent
        XHR.addEventListener('load', function(event) {
            var response = JSON.parse(XHR.responseText);
            BackendVariables.token = response["access_token"];
            $log.log("oauth token: ", BackendVariables.token);
        });

        // We define what will happen in case of error
        XHR.addEventListener('error', function(event) {
            $log.log('Oops! Something went wrong.');
        });

        XHR.open('POST', 'https://www.googleapis.com/oauth2/v3/token');
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XHR.send(urlEncodedData)

        },
      listObjects: function(bucketObject) {
        if (angular.isUndefined(gapi.client)) {
          $timeout(load, 500);
        } else {
            if(BackendVariables.ready==="true"){
            $log.log('listObjects()!!');
            var request = gapi.client.storage.objects.list({ bucket : bucketObject});
            $log.log("Info sent: ",angular.toJson(request));
            request.execute(function(response) { $log.log("Response: " , angular.toJson(request)); });
            }
          }
        }

  }

});
})();*/

/**
* @Servicio de interests_category
*
* @author Sebastian
* @version 0.1
*/
/*
angular.module('App', ['ngCookies'])
	.factory('eventTypeRequest', function($http,$cookies) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $cookies.get('token');
		return {
			allInterestsCategoriesId : function(){
				return $http.get(path + 'interests_category');

			},
			oneInterestsCategory : function(interestsCategoryId){
				return $http.get(path + 'interests_category/' + interestsCategoryId);

			},
			createInterestsCategory : function(data){
				return $http({
					method: 'POST',
					url: path + 'interests_category',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteInterestsCategory : function(interestsCategoryId){
				return $http({
					method: 'DELETE',
					url: path + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editInterestsCategoryPatch : function(interestsCategoryId,data){
				return $http({
					method: 'PATCH',
					url: path + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editInterestsCategoryPut : function(interestsCategoryId,data){
				return $http({
					method: 'PUT',
					url: path + 'interests_category/' + interestsCategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});
*/
/**
* @Servicio de Login
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function () {
angular.module('loginService', [])
	.factory('loginRequest', function($http, $log, BackendVariables) {
		var path = BackendVariables.url; //API path
		return {
			/**
			* Login function return the user info if the credentials match
			* @param {JSON} credentials.email
			* @param {JSON} credentials.password
			* @returns success(function(data, status, headers, config)
			*/
			login : function(credentials){

				$log.log("Credentials in loginService:", angular.toJson(credentials));
				var data={"email":credentials.email,"password":credentials.password};
				return $http({
					method: 'POST',
					url: path + 'auth',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(data)
				});
			}
		}
	});
})();

/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
angular.module('perkService',['ngStorage'])
	.factory('perkRequest', function($http, $localStorage,$log, BackendVariables) {
		var path = BackendVariables.url; //API path
		var token = $localStorage.token;
		return {
			allPerks : function(){
				return $http.get(path + 'perks');

			},
			onePerk : function(perkId){
				return $http.get(path + 'perks/' + perkId);

			},
			createPerk : function(data){
				return $http({
					method: 'POST',
					url: path + 'perks',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deletePerk : function(perkId){
				return $http({
					method: 'DELETE',
					url: path + 'perks/' + perkId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editPerkPatch : function(perkId,data){
				return $http({
					method: 'PATCH',
					url: path + 'perks/' + perkId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editPerkPut : function(perkId,data){
				return $http({
					method: 'PUT',
					url: path + 'perks/' + perkId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});

/**
* @Servicio de Perks (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
angular.module('perkTaskService',['ngStorage'])
	.factory('perkTaskRequest', function($http,$localStorage,$log, BackendVariables) {
		var path = BackendVariables.url; //API path
		var token = $localStorage.token;
		return {
			allPerkTasks : function(){
				return $http.get(path + 'perk_tasks');

			},
			onePerkTask : function(perkTaskId){
				return $http.get(path + 'perk_tasks/' + perkTaskId);

			},
			createPerkTask : function(data){
				return $http({
					method: 'POST',
					url: path + 'perk_tasks',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deletePerkTask : function(perkTaskId){
				return $http({
					method: 'DELETE',
					url: path + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editPerkTaskPatch : function(perkTaskId,data){
				return $http({
					method: 'PATCH',
					url: path + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editPerkTaskPut : function(perkTaskId,data){
				return $http({
					method: 'PUT',
					url: path + 'perk_tasks/' + perkTaskId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});

/**
* @Servicio de Sponzorships (Beneficios)
*
* @author Sebastian
* @version 0.1
*/
angular.module('sponzorshipService', ['ngStorage'])
	.factory('sponzorshipRequest', function($http,$localStorage,$log, BackendVariables) {
		var path = BackendVariables.url; //API path
		var token = $localStorage.token;
		return {
			allSponzorships : function(){
				return $http.get(path + 'sponzorships');

			},
			oneSponzorship : function(sponzorshipId){
				return $http.get(path + 'sponzorships/' + sponzorshipId);

			},
			organizerSponzors : function(organizerId){
				return $http.get(path + 'sponzorships_organizer/' + organizerId);

			},
			sponzorshipByOrganizer : function(organizerId){
				return $http.get(path + 'sponzorships_organizer/' + organizerId);
			},
			sponzorshipBySponzor : function(sponzorId){
				return $http.get(path + 'sponzorships_sponzor/' + sponzorId);
			},
			createSponzorship : function(data){
				return $http({
					method: 'POST',
					url: path + 'sponzorships',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteSponzorship : function(sponzorshipId){
				return $http({
					method: 'DELETE',
					url: path + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editSponzorshipPatch : function(sponzorshipId,data){
				return $http({
					method: 'PATCH',
					url: path + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editSponzorshipPut : function(sponzorshipId,data){
				return $http({
					method: 'PUT',
					url: path + 'sponzorships/' + sponzorshipId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});

/**
* @Servicio de TaskSponzor (Tareas de los patrocinadores)
*
* @author Sebastian
* @version 0.1
*/
/*
angular.module('App', ['ngCookies'])
	.factory('taskSponzorRequest', function($http,$cookies) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $cookies.get('token');
		return {
			allTaskSponzor : function(){
				return $http.get(path + 'task_sponzor');

			},
			oneTaskSponzor : function(taskSponzorId){
				return $http.get(path + 'task_sponzor/' + taskSponzorId);

			},
			createTaskSponzor : function(data){
				return $http({
					method: 'POST',
					url: path + 'task_sponzor',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteTaskSponzor : function(taskSponzorId){
				return $http({
					method: 'DELETE',
					url: path + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editTaskSponzorPatch : function(taskSponzorId,data){
				return $http({
					method: 'PATCH',
					url: path + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editTaskSponzorPut : function(taskSponzorId,data){
				return $http({
					method: 'PUT',
					url: path + 'task_sponzor/' + taskSponzorId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});
*/
/**
* @Servicio de Usuarios
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function () {
angular.module('userService', ['ngStorage'])
	.factory('userRequest', function($http,$localStorage,$log,BackendVariables) {
		var path = BackendVariables.url; //API path
		var token = $localStorage.token;
		$log.info("Token in userService:", token);
		return {
			allUsers : function(){
				return $http.get(path + 'users');
			},
			oneUser : function(userId){
				$http.defaults.headers.common['Authorization'] = 'Basic ' + token;
				return $http.get(path + 'users/' + userId);
			},
			createUser : function(data){
				return $http({
					method: 'POST',
					url: path + 'users',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteUser : function(userId){
				return $http({
					method: 'DELETE',
					url: path + 'users/' + userId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editUserPatch : function(userId,data){
				return $http({
					method: 'PATCH',
					url: path + 'users/' + userId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editUserPut : function(userId,data){
				return $http({
					method: 'PUT',
					url: path + 'users/' + userId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			forgotPassword : function(data){
				return $http({
					method: 'POST',
					url: path + 'send_reset_password/',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			invitedUser : function(data){
					return $http({
						method: 'POST',
						url: path + 'invite_friend/',
						headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
						data: $.param(data)
					});
				},
		checkSession: function(localToken, localUser){
			if(angular.isDefined(localToken) && angular.isDefined(localUser)){
				return true;
			}
			else{
			  return false;
		  }
		}
		}
	});
})();

/**
* @Servicio de UserCategory (Categorias de preferencia de los usuarios)
*
* @author Sebastian
* @version 0.1
*/
/*
angular.module('App', ['ngCookies'])
	.factory('userInterestRequest', function($http,$cookies) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $cookies.get('token');
		return {
			allUserCategories : function(){
				return $http.get(path + 'user_categories');
			},
			oneUserCategory : function(userCategoryId){
				return $http.get(path + 'user_categories/' + userCategoryId);
			},
			createUserCategory : function(data){
				return $http({
					method: 'POST',
					url: path + 'user_categories',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteUserCategory : function(userCategoryId){
				return $http({
					method: 'DELETE',
					url: path + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editUserCategoryPatch : function(userCategoryId,data){
				return $http({
					method: 'PATCH',
					url: path + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editUserCategoryPut : function(userCategoryId,data){
				return $http({
					method: 'PUT',
					url: path + 'user_categories/' + userCategoryId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});
*/
/**
* @Servicio de TaskSponzor (Tareas de los patrocinadores)
*
* @author Sebastian
* @version 0.1
*/
/*
angular.module('App', ['ngCookies'])
	.factory('userInterestRequest', function($http,$cookies) {
		var path = "http://api.sponzor.me/"; //API path
		var token = $cookies.get('token');
		return {
			allUserInterests : function(){
				return $http.get(path + 'user_interests');
			},
			oneUserInterest : function(userInterestId){
				return $http.get(path + 'user_interests/' + userInterestId);
			},
			createUserInterest : function(data){
				return $http({
					method: 'POST',
					url: path + 'user_interests',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			deleteUserInterest : function(userInterestId){
				return $http({
					method: 'DELETE',
					url: path + 'user_interests/' + userInterestId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token}
				});
			},
			editUserInterestPatch : function(userInterestId,data){
				return $http({
					method: 'PATCH',
					url: path + 'user_interests/' + userInterestId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			},
			editUserInterestPut : function(userInterestId,data){
				return $http({
					method: 'PUT',
					url: path + 'user_interests/' + userInterestId,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic '+ token},
					data: $.param(data)
				});
			}
		}
	});
*/
// agrega cositas cheveres
angular.module('App').factory('Utils', function($ionicLoading,$ionicPopup,$translate) {

	var Utils = {

    show: function() {
			//console.log("texto:" + $translate.instant('MESSAGES.loading'));
      $ionicLoading.show({
  	    animation: 'fade-in',
  	    showBackdrop: false,
  	    maxWidth: 200,
  	    showDelay: 500,
        template: '<p class="item-icon-left">'+ $translate.instant('MESSAGES.loading')+'<ion-spinner icon="bubbles"/></p>'
      });
    },

    hide: function(){
      $ionicLoading.hide();
    },

		trim: function(str){
			str = str.toString();
			return str.replace(/^\s+|\s+$/g,"");
		},

		isUndefinedOrNull: function(val) {
    return angular.isUndefined(val) || val === null
		},

		alertshow: function(tit,msg){
			var alertPopup = $ionicPopup.alert({
				title: tit,
				template: msg
			});
			alertPopup.then(function(res) {
				//console.log('Registrado correctamente.');
			});
		},

  };

	return Utils;

});
