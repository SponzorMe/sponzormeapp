/// <reference path="../../typings/main.d.ts" />
/**
* @Servicio de utlidades
*
* @author Carlos, Nicolas Molina
* @version 0.2
*/
var imgurService;
(function (imgurService_1) {
    var imgurService = (function () {
        function imgurService($http, $q) {
            this.$http = $http;
            this.$q = $q;
            this.$inject = [
                '$http',
                '$q'
            ];
            this.path = 'https://api.imgur.com/3/';
            this.clientId = "bdff09d775f47b9";
        }
        imgurService.prototype.uploadImage = function (image) {
            var _this = this;
            return this.$http({
                method: 'POST',
                url: this.path + 'image',
                headers: {
                    'Authorization': 'Client-ID ' + this.clientId
                },
                data: {
                    image: image,
                    type: 'base64'
                }
            })
                .then(function (response) { return _this.$q.when(_this._preparateImage(response.data)); })
                .catch(function (response) { return _this.$q.reject(response.data); });
        };
        imgurService.prototype._preparateImage = function (data) {
            return data.data.link;
        };
        return imgurService;
    }());
    imgurService_1.imgurService = imgurService;
    angular
        .module('app')
        .service('imgurService', imgurService);
})(imgurService || (imgurService = {}));
