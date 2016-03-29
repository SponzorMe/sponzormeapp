module.exports = function( config ){
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    preprocessors:{
      'www/js/**/*.js': ['coverage']
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
      "www/lib/ionic-platform-web-client/dist/ionic.io.bundle.min.js",
      "www/lib/angular-ios9-uiwebview/angular-ios9-uiwebview.patch.js",
      "www/lib/angular-google-places-autocomplete/src/autocomplete.js",
      "www/lib/firebase/firebase.js",
      "www/lib/angularfire/dist/angularfire.min.js",
      "www/lib/angular-translate/angular-translate.min.js",
      "www/lib/angular-messages/angular-messages.min.js",
      "www/lib/angular-base64/angular-base64.min.js",
      "www/lib/angular-sanitize/angular-sanitize.min.js",
      "www/lib/underscore/underscore-min.js",
      "www/lib/ngstorage/ngStorage.min.js",
      "www/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
      "www/lib/tabbedSlideBox/tabSlideBox.js",
      "www/lib/aws-sdk/dist/aws-sdk.min.js",
      "www/lib/moment/min/moment.min.js",
      "www/lib/angular-moment/angular-moment.min.js",
      "www/lib/ngCordova/dist/ng-cordova.min.js",
      //Vendors for testing
      //"www/lib/ngCordova/dist/ng-cordova-mocks.min.js",
      "www/lib/angular-mocks/angular-mocks.js",
      'www/lib/chai/chai.js',
      'www/lib/chai-spies/chai-spies.js',
      'tests/unit/mockData/builders/*.builder.js',
      'tests/unit/mockData/mockData.js',
      //App
      "www/js/app.module.js",
      "www/js/app.routes.js",
      "www/js/app.constants.js",
      "www/js/app.values.js",
      "www/js/**/*.module.js",
      "www/js/**/*.service.js",
      "www/js/**/*.directive.js",
      "www/js/**/*.controller.js",
      "www/js/app.run.js",
      //Tests
      //'tests/unit/**/*.service.spec.js',
      //'tests/unit/**/*.controller.spec.js',
      'tests/unit/dashboard-organizer/home.controller.spec.js'
    ]
  });
};
