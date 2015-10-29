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
        $scope.myPicture = "data:image/jpeg;base64,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";
        $scope.file = "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wgARCACgAKADACIAAREBAhEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAUHAQQGAwL/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/9oADAMAAAEQAhAAAAGvB0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbkyc0zgAAAG8aLe8zVbukAD6LJ5nV6vN5zm+l6mqxzavoVNizNwqfNjb5VtoSWpEZ7cvsktXVhzpUA1Hv4Cyfmt0tq6spUUWJG8YrtpCuRYcZx4nprhx0sZGrLJxW6WbhCgQDOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//EACYQAAIDAAEDAQkAAAAAAAAAAAQFAQIDBhITIHAAEBEUFSMwQEH/2gAIAQAAAQUC9DhRtir6I2GdPwwIRI4om5dqD7ablC7CaeKzuTxtVubZnyG2dm/nn0dwBhofnYiVxbneVntyWZut8K1m1tKlKCxCx3Nw13U707TALqFAYLxgtGbAXAPj4m4+gGtx1wBY4W7QoMeKceE0XhqOox9yG0lPOTfdYThgPf34aTjuZiG6sKMAougrJBpByzq0aLrEpWtBNBWAmi4o9WdhqwVmY5ta3fEstpZS2rZEgLxCNkqfqJLVd3y2Sw2GZ/ztvHC1BwZn4z+l/PRv/8QAFBEBAAAAAAAAAAAAAAAAAAAAYP/aAAgBAgEBPwFJ/8QAGREBAQADAQAAAAAAAAAAAAAAEQAQIFAx/9oACAEBAQE/AeWzOxexERg5X//EADQQAAIBAwEGAwUHBQAAAAAAAAIDAQAEERIFEyEiMUEUIFEjMlJhkTAzNEJwgfBAQ3Fy0f/aAAgBAAAGPwL9DtFusjL5dq1bnPyEsz9lv4Se5+PHCpi2VJ461uQWUt6acca0XC5AuvmZGzvxWrnx1/mKSsHt1yXNBl275p0pxjhnHr9gG89zPHHpV+MBAoBWla4irLZ1pONJDvp+KZpxowN1dH73wjFbONn3kxx+nlgRjJTOIioiD0O055Zz9ahF4vdXeORy+FRZO4wJc3zir6ItlKBJwCTiO9W2zlWy2avvDKONXMgnS1GRJeMjPzijDSEu1RBFjoXWmNfaqHZyeCtQ8xUu8i0VL7mdUBPQIq2Uad0w4hgyEcC9RmtoClQsujDVjHT0x9KuHXY6M82O+IpTD6kcsmpVHbSqP5+9WdmvtGPrR2xWYRYrVljzjjM+RbR6gUFQ3CbsUuxggOvEXF2LnD7oBTtou5SdMisa0zL9CSyKBHEavWo2hob4uBxC+2avG3OZY3mjHeaYraUGZy3e4H81LB03CgV0UMcJpQXC3KFE+zGOOYoLx8SKh5Yj0jFOurdhLkuEf60xBsYd2zrn/P8AypbcZxomIxGa8VjPtd5j968apRsvNOBgukUDLrxMyP8AY/LmggVCpK+ABHbzWd5qGLdNvMafU5xUzPWeP9Hjt+jn/8QAKRABAAIBAgUCBgMAAAAAAAAAAQARITFBUWFxgZGhsRAgcNHh8DBAwf/aAAgBAAABPyH6HU8rLs6naPGSag8ERFERMI7fwoWz+R0jTPOmA7sYl6o4E1uFXIoNInJPmsSAXc7c9kw5JUSmaHlct0YHoa5lnGKGrLl5lkslxZBx8bLNTa3UxYhbBXhRl41n7y4Ri8JxtGGOr7zK9eXGyssurz8jeggbrB41HiU7cUEGi1Ba/caR8hZZsF+uPMw/AfW1fbzCjkhbNdPvAe7pTccJxVc5jvO8kRA8jELfglymF7vrKwjlurdHau7Cy4Pw1D21mguj8EQeRmK2lrgK5jyJ2rt+0cGx9Q6+sFb1SOS69ieKZIBd2c806Xw+IgCYHemUVv5T39pU4jiYel+87SYsa+weZQDLs2HU754sCT3YbFWv+zYO8cXHLWPLzQ1PPyR9DaV4J6eA5fp+YW1kZbeD3idBw8GgnaPWJGdni4aJVbveA2RjztTvqqaMMLpeL+JR6GQtvY9bjDX0phzfkQdZVGILc4TOgeRia7FdX+nbqO6rx9HP/9oADAMAAAEAAgAAABD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/d//AP8A791//SYkUot6e/tc+ueeONcc/wD3/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/xAAaEQACAwEBAAAAAAAAAAAAAAAAEQEQUDFB/9oACAECAQE/EMpCEKvBWzg5HI7c5X//xAAeEQADAQABBQEAAAAAAAAAAAAAAREhEDBAUFFhcf/aAAgBAQEBPxDv6ulJpZnH4PwNpqk3ROLn0olWkSEEEEVpIs8T/8QAJhABAQACAgICAQMFAAAAAAAAAREAITFBUXFhgZEQIHAwQKGx0f/aAAgBAAABPxD+DkJkiIHlID24BPL9Hg1+riIiQIo5E6f6IfBr0LPk12Ew+nVnw6gC9Frm8PUxJDoO11l9R08iQj+dfuTTNM3327T9GbyMIeGQV9Dpcb0PTiB++B+RwZgF95wge3EBVA85GlL4zZKX3iBVA83AJRE84jZfbuHuZZkgnWWL9igE4OvKUiRqbQziN87GARW8BRQ8IX7PIYhYLLFflrHJUHwv7ASKZVkA9rnNdiazCSbDpE7POHdkenbF5GDsq3JjWFqITs7A4TF613+nldTqdpci2q0i1UfFHAIEzVxyCtGdIJdPyTXKpPNwIsHE9uBJAQK0HV0a5Tti5OD9M1w9TZAq9EwBydIlBgFHPnvwxB0Gx7um6EqnxhqIsTWANDV1zrKYKh6gT6Y/GKhIPhB/yPxhKAX8SfwLiCmTCCl9+jYsJoZoAbLHNT7/AO/rwaiMRMfcx8Ik48pRDSpaEmDY+qqCKFKxQUBcMErTdQu9gWeTyyd3wk9Qbcre3jOCAo2gkmhSHjq5GRC6hLX4KduoYKSu7uSEhaCmpMtz0CWQIE0aNkr5y2dA9AAaWCARevlm9gXKgQ5alnnVmK6i0XQMUdBj3ia82JAr1IQHfWV+qGSpwb2CXOg51kaE9ahg98IJ1DoEFLT4nOLkBQoN1BE60a6xMkbMnKAcw0aPl3+zgA+zISQZ0Ydsr8GHlRvdfePhXn5K/wC/7NcJwxaHyHF/hz//2Q==";
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
