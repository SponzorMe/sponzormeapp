module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'www/lib/ionic/js/ionic.bundle.js',
      'www/lib/angular-translate/angular-translate.min.js',
      'www/lib/angular-messages/angular-messages.min.js',
      'www/lib/angular-base64/angular-base64.min.js',
      'www/lib/ngstorage/ngStorage.min.js',
      'www/lib/angular-sanitize/angular-sanitize.min.js',
      'www/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
      'www/lib/imgurUploader/imgurUploader.js',
      'www/lib/moment/min/moment.min.js',
      'www/lib/angular-ios9-uiwebview/angular-ios9-uiwebview.patch.js',
      'www/lib/ionic-platform-web-client/dist/ionic.io.bundle.min.js',
      'www/lib/angular-mocks/angular-mocks.js',
      'www/lib/jquery/dist/jquery.min.js',
      'www/lib/ngCordova/dist/ng-cordova.min.js',
      //'www/js/**/*.js',
      //'www/views/**/*.js',
      'www/app/app.module.js',
      'www/app/**/*.module.js',
      'www/app/**/*.js',

      'tests/unit/**/*.js',
      'tests/e2e/**/*.js',
    ],
    reporters: ['progress'],
    port: 9876,
    autoWatch: true,
    browsers: ['Chrome']
  });
};