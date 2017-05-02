var webpack = require("webpack");

  // Karma configuration

module.exports = function(config) {
  config.set({
      // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',
      // frameworks to use. available frameworks: https:  //npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
      // Karma plugins loaded
    plugins: [
        'karma-jasmine',
        'karma-coverage',
        'karma-chrome-launcher',
        'karma-htmlfile-reporter',
        'karma-webpack',
        'karma-*'
    ],
    customLaunchers: {
        Chrome_travis_ci: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        }
    },
      // list of files / patterns to load in the browser/testing environment,
      //array which contains all the files needed to start our app with Karma.
    files: [
        './**/*.spec.js'
    ],
      // proxied base paths
      // a proxied path to execute the Angular app in the same path as when we execute locally.
    proxies: {
      // required for component assests fetched by Angular's compiler
    },
  
      // list of files to exclude
    exclude: [
        'node_modules/**/*spec.js'
    ],
  
      // preprocess matching files before serving them to the browser
      // available preprocessors: https:  //npmjs.org/browse/keyword/karma-preprocessor
      // Source files that you wanna generate coverage for.
      // Do not include tests or libraries (these files will be instrumented by Istanbul)
      //regular expression to get to which files we should create the coverage report.
      // Basically all the TypeScript files that doesn’t have a spec inside.
    preprocessors: {
        ['**/!(*.spec).js']: ['coverage'],
        ['**/*.spec.js']: ['webpack', 'sourcemap']
    },
    htmlReporter: {
        outputFile: '../reports/index.html'
    },
    browserNoActivityTimeout: 30000,
      // optionally, configure the reporter
    coverageReporter: {
        type: 'json',
        dir: '../reports',
        subdir: '.',
        file: 'coverage.json',
        includeAllSources: true,
        instrumenterOptions: {
            istanbul: { noCompact:true }
        }
    },
      // test results reporter to use
      // available reporters: https:  //npmjs.org/browse/keyword/karma-reporter
      // Coverage reporter generates the coverage
      // reporters:  ['progress', 'dots', 'coverage'],
    reporters: ['progress', 'html', 'coverage'],
      // web server port
    port: 9876,
    
      // enable / disable colors in the output (reporters and logs)
    colors: true,
  
      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    
      // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
  
      // start these browsers
      // available browser launchers: https:  //npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    
      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
  
      // Concurrency level
      // how many browser should be started simultaneous
    concurrency: Infinity
  });
    if (process.env.APPVEYOR) {
        config.browsers = ['IE'];
        config.singleRun = true;
        config.browserNoActivityTimeout = 100000; // Note: default value (10000) is not enough
    }

    if (process.env.TRAVIS || process.env.CIRCLECI) {
        config.browsers = ['Chrome_travis_ci'];
        config.singleRun = true;
        config.browserNoActivityTimeout = 100000;
    }
};
