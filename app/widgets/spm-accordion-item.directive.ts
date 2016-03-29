/// <reference path="../../typings/main.d.ts" />
// Description:
//  Creates a new Spinner and sets its options
// Usage:
//  <div data-cc-spinner="vm.spinnerOptions"></div>

(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('spmAccordionItem', spmAccordionItem);

  spmAccordionItem.$inject = [];

  function spmAccordionItem() {
    var directive = {
      restrict: 'E',
      replace: true,
      transclude: true,
      require: '^spmAccordion',
      scope: {
        title: '@title',
        model: '@model',
      },
      controller: function() {},
      templateUrl: 'app/widgets/spm-accordion-item.html',
      link: function(scope, element, attrs, controller, transclude){
        scope.active = false;
        controller.addSection(scope);
        scope.activate = function() {
          controller.select(scope);
        };
      }
    };
    return directive;
  }
})();
