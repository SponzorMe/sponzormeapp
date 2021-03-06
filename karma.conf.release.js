module.exports = function( config ){
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    preprocessors:{
      'www/build/js/app.js': ['coverage']
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
      "www/build/js/vendors.js",
      //Vendors for testing
      //"www/lib/ngCordova/dist/ng-cordova-mocks.min.js",
      "www/lib/angular-mocks/angular-mocks.js",
      'www/lib/chai/chai.js',
      'www/lib/chai-spies/chai-spies.js',
      'tests/unit/mockData.js',
      //App
      "www/build/js/app.js",
      //Tests
      'tests/unit/**/*.spec.js'
    ]
  });
};
