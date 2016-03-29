/// <reference path="../../typings/tsd.d.ts" />
// Description:
//  Creates a new Spinner and sets its options
// Usage:
//  <div data-cc-spinner="vm.spinnerOptions"></div>
(function () {
    'use strict';
    angular
        .module('app.widgets')
        .directive('spmCropImage', spmCropImage);
    spmCropImage.$inject = [];
    function spmCropImage() {
        var directive = {
            restrict: 'E',
            transclude: true,
            scope: {
                edit: '=edit'
            },
            template: '<div class="spm-crop">' +
                '<i ng-show="edit" class="icon ion-edit edit"></i>' +
                '<ng-transclude></ng-transclude>' +
                '</div>'
        };
        return directive;
    }
})();
