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
