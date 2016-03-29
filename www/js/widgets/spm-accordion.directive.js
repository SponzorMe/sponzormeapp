/// <reference path="../../typings/tsd.d.ts" />
// Description:
//  Creates a new Spinner and sets its options
// Usage:
//  <div data-cc-spinner="vm.spinnerOptions"></div>
(function () {
    'use strict';
    angular
        .module('app.widgets')
        .directive('spmAccordion', spmAccordion);
    spmAccordion.$inject = [];
    function spmAccordion() {
        var directive = {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                autoOpen: '@autoOpen',
                type: '@type'
            },
            templateUrl: 'templates/widgets/spm-accordion.html',
            controller: function ($scope) {
                var controller = this;
                var sections = controller.sections = $scope.sections = [];
                var autoOpen = controller.autoOpen = $scope.autoOpen = $scope.autoOpen || true; //auto open opens first tab on render
                controller.select = function (selectSection) {
                    sections.forEach(function (section) {
                        section.scope.active = section.scope === selectSection ? !section.scope.active : false;
                    });
                };
                controller.addSection = function (sectionScope) {
                    sections.push({ scope: sectionScope });
                    if (sections.length === 1 && autoOpen === true) {
                        sections[0].active = true;
                        sections[0].scope.active = true;
                    }
                };
            },
            link: function (scope, element, attrs, controller) {
                scope.autoOpen = controller.autoOpen = scope.autoOpen === "true" ? true : false;
            }
        };
        return directive;
    }
})();
