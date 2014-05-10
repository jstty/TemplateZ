// Karma configuration
// Generated on Fri Jul 05 2013 00:17:02 GMT-0700 (PDT)


// base path, that will be used to resolve files and exclude
basePath = 'unit';

frameworks = ['qunit'];
plugins = [
	'karma-qunit',
	'karma-chrome-launcher',
	'karma-firefox-launcher'
];

// list of files / patterns to load in the browser
files = [
   QUNIT
  ,QUNIT_ADAPTER

  // core lib
  ,{pattern: '../../lib/*.js', watched: true, included: true, served: true}

  ,{pattern: '*.js', watched: true, included: true, served: true}

];

//<div id="testElement" style="display:none"></div>

// list of files to exclude
exclude = [];

urlRoot = '/__karma/';
proxies = {
  '/': 'http://localhost:8080/test/'
};

// test results reporter to use
// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
reporters = ['progress'];

// web server port
port = 9876;

// cli runner port
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
//browsers = ['Chrome', 'ChromeCanary', 'Firefox', 'Safari'];
browsers = ['Chrome'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
