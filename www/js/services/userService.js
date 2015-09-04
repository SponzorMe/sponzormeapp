/**
* @Servicio de Usuarios
*
* @author Sebastian
* @version 0.1
*/
'use strict';
(function () {
angular.module('userService', ['ngCookies'])
	.factory('userRequest', function($http,$cookies,$log,BackendVariables) {
		var path = BackendVariables.url; //API path
		//var token = $cookies.get('token');
		var token = $cookies.get('token');
		$log.info("Token in userService:", token);
		return {
			allUsers : function(){
				return $http.get(path + 'users');
			},
			oneUser : function(userId){
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
			}
		}
	});
})();