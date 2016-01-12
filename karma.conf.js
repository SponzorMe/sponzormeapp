module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    /*plugins : [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-html-reporter',
    ],*/
    files: [
      //'www/lib/angular/angular.min.js',
      'www/lib/ionic/js/ionic.bundle.min.js',
      //'www/lib/angular-google-places-autocomplete/src/autocomplete.js',
      'www/lib/angular-translate/angular-translate.min.js',
      'www/lib/angular-messages/angular-messages.min.js',
      'www/lib/angular-base64/angular-base64.min.js',
      'www/lib/ngstorage/ngStorage.min.js',
      'www/lib/underscore/underscore-min.js',
      //'www/lib/angular-sanitize/angular-sanitize.min.js',
      'www/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
      'www/lib/moment/min/moment.min.js',
      'www/lib/angular-ios9-uiwebview/angular-ios9-uiwebview.patch.js',
      'www/lib/ionic-platform-web-client/dist/ionic.io.bundle.min.js',
      'www/lib/tabbedSlideBox/tabSlideBox.js',
      'www/lib/ngCordova/dist/ng-cordova.min.js',
      'www/lib/angular-mocks/angular-mocks.js',
      //App
      'www/app/app.module.js',
      'www/app/app.routes.js',
      'www/app/app.constants.js',
      'www/app/app.values.js',
      'www/app/app.run.js',
      'www/app/**/*.module.js',
      //Services
      'www/app/services/*.service.js',
      //Controllers
      'www/app/**/*.controller.js',
      //Test
      'tests/unit/**/*.service.spec.js',
      'tests/unit/**/*.controller.spec.js',
    ],
    singleRun : false,
    autowatch : false,
    browsers: ['Chrome'],
    reporters: ['progress', 'html', 'coverage'],
    coverageReporter:{
      type : 'html',
      dir : 'test-reports/'
    },
    htmlReporter: {
      outputFile: 'test-reports/units.html',
      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: 'A sample project description'
    }
  });
};
