/// <reference path="../../typings/tsd.d.ts" />
// Description:
// Network message online / offline
// Usage:
// <spm-network-message></spm-network-message>
(function () {
    'use strict';
    angular
        .module('app.widgets')
        .directive('spmNetworkMessage', spmNetworkMessage);
    spmNetworkMessage.$inject = [
        '$cordovaNetwork',
        '$rootScope'
    ];
    function spmNetworkMessage($cordovaNetwork, $rootScope) {
        var directive = {
            restrict: 'E',
            controller: controller,
            controllerAs: 'vm',
            templateUrl: 'www/widgets/network-message.html'
        };
        return directive;
        function controller($scope) {
            var vm = this;
            //Attributes
            vm.message = false;
            //activate();
            //////////////
            function activate() {
                vm.message = $cordovaNetwork.isOffline();
                // listen for Online event
                $rootScope.$on('$cordovaNetwork:online', updateNetworkState);
                // listen for Offline event
                $rootScope.$on('$cordovaNetwork:offline', updateNetworkState);
            }
            function updateNetworkState(event, networkState) {
                vm.message = $cordovaNetwork.isOffline();
            }
        }
    }
})();
