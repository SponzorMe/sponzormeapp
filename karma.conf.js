module.exports = function( config ){
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    preprocessors:{
      'www/app/**/*.js': ['coverage']
    },
    coverageReporter:{
      includeAllSources: true,
      reporters: [
        {
          type: 'html',
          dir: 'tests/coverage',
          subdir: '.'
        },
        /*{
          type: 'text'
        }*/
      ]
    },
    files: [
      //Vendors
      "www/lib/ionic/js/ionic.bundle.min.js",
      "www/lib/angular-google-places-autocomplete/src/autocomplete.js",
      "www/lib/angular-translate/angular-translate.min.js",
      "www/lib/angular-messages/angular-messages.min.js",
      "www/lib/angular-base64/angular-base64.min.js",
      "www/lib/angular-sanitize/angular-sanitize.min.js",
      "www/lib/underscore/underscore-min.js",
      "www/lib/ngstorage/ngStorage.min.js",
      "www/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
      "www/lib/angular-ios9-uiwebview/angular-ios9-uiwebview.patch.js",
      "www/lib/ionic-platform-web-client/dist/ionic.io.bundle.min.js",
      "www/lib/tabbedSlideBox/tabSlideBox.js",
      "www/lib/aws-sdk/dist/aws-sdk.min.js",
      "www/lib/moment/min/moment.min.js",
      "www/lib/ngCordova/dist/ng-cordova.min.js",
      //Vendors for testing
      "www/lib/angular-mocks/angular-mocks.js",
      'www/lib/chai/chai.js',
      //App
      "www/app/app.module.js",
      "www/app/app.routes.js",
      "www/app/app.constants.js",
      "www/app/app.run.js",
      "www/app/app.values.js",
      "www/app/**/*.service.js",
      "www/app/**/*.module.js",
      "www/app/**/*.directive.js",
      "www/app/**/*.controller.js",
      //Tests
      'tests/unit/**/*.spec.js'
    ]
  });
};
