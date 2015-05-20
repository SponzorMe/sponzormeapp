angular.module('App').service('$user', function ($http, $q) {
  var _this = this;
  _this.info = {};
  _this.details = {};
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
        return $q.reject({error: "something error"});
      }
      if(!response.data || !response.data.key){
       return $q.reject({error: "invalid user"});
      }
      _this.info.key = response.data.key;
      _this.info.userId = response.data.userId;
      _this.info.email = user.email;
      return response;
    }, function (error) {
      return error;
    });
  };

  _this.getInfo = function (key) {
    var request;
    if(!key){
      return $q.reject({error: "no key provided"});
    }
    request = $http({
      data: {
        key: _this.info.key,
        userId: _this.info.userId
      },
      method : 'POST',
      url: 'http://staging.sponzor.me/api/v1/user/' + key
    });
    return request.then(function (response) {
      console.log(response);
      if(!response.data.User){
        return $q.reject({error: "no user returned"});
      }
      _this.details = response.data.User[0];
      return response;
    }, function (error) {
      return error;
    });
  };


});
