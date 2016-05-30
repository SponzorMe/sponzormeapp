/// <reference path="../../typings/tsd.d.ts" />
var pushModule;
(function (pushModule) {
    var pushService = (function () {
        function pushService($http, $q, IONIC) {
            this.$http = $http;
            this.$q = $q;
            this.IONIC = IONIC;
            this.$inject = [
                '$http',
                '$q',
                'IONIC'
            ];
            this.path = IONIC.URL;
            this.profile = IONIC.PROFILE;
            this.token = IONIC.TOKEN;
        }
        pushService.prototype.sendPushNotification = function (user_ids, notification) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.token
                },
                data: {
                    "user_ids": user_ids,
                    "profile": this.profile,
                    "notification": {
                        "title": notification.title,
                        "message": notification.message,
                        "ios": {
                            "title": notification.title,
                            "message": notification.message,
                            "payload": notification,
                            "content-available": 1
                        },
                        "android": {
                            "title": notification.title,
                            "message": notification.message,
                            "payload": notification,
                            "content-available": 1
                        }
                    }
                }
            })
                .then(function (response) { return _this.$q.when(response.data); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        return pushService;
    }());
    pushModule.pushService = pushService;
    angular
        .module('app')
        .service('pushService', pushService);
})(pushModule || (pushModule = {}));
