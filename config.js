const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome'
    },
    specs: [
        'test/spec.js'
    ],
    onPrepare: () => {
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
              displayStacktrace: "pretty"
            },
            summary: {
              displayDuration: false
            }
          }));
    },
    jasmineNodeOpts: {
        showColors: true,
        silent: true,
        defaultTimeoutInterval: 360000,
        print: function () {}
    }
};

