module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'www/lib/ionic/js/ionic.bundle.js',
      'www/lib/angular-mocks/angular-mocks.js',
      'www/js/**/*.js',
      'www/views/**/*.js',
      'tests/unit/**/*.js',
      'tests/e2e/**/*.js',
    ],
    reporters: ['progress'],
    port: 9876,
    autoWatch: true,
    browsers: ['Chrome']
  });
};
