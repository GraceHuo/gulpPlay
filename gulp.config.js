module.exports = function() {
    var server         = './src/server/';
    var client         = './src/client/';
    var clientApp      = client + 'app/';
    var report         = './report/';
    var temp           = './.tmp/';
    var root           = './';
    var wiredep        = require( 'wiredep' );
    var bowerFiles     = wiredep( { devDependencies: true } )['js'];
    var specRunnerFile = 'specs.html';

    var config = {
        // path
        root         : root,
        alljs        : [
            './src/**/*.js',
            './*.js'
        ],
        build        : './build/',
        server       : server,
        client       : client,
        index        : client + 'index.html',
        html         : client + '**/*.html',
        css          : temp + 'styles.css',
        fonts        : './bower_components/font-awesome/fonts/**/*.*',
        images       : client + 'images/**/*.*',
        htmltemplates: clientApp + '**/*.html',
        js           : [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        less         : client + '/styles/styles.less',
        temp         : temp,
        report       : report,

        // bower and npm locations
        bower   : {
            json      : require( './bower.json' ),
            directory : './bower_components/',
            ignorePath: '../..'
        },
        packages: [
            './package.json',
            './bower.json'
        ],

        // karma settings
        specHelpers           : [client + 'test-helpers/*.js'],
        serverIntegrationSpecs: [client + 'tests/server-integration/**/*.spec.js'],

        // node settings
        defaultPort: 7203,
        nodeServer : './src/server/app.js',

        // browser sync
        browserReloadDelay: 1000,

        // template cache
        templateCache: {
            file   : 'templates.js',
            options: {
                module    : 'app.core',
                standAlone: false,
                root      : 'app/'
            }
        },

        // specs.html, our HTML spec runner
        specRunner    : client + specRunnerFile,
        specRunnerFile: specRunnerFile,
        testlibraries : [
            'node_modules/mocha/mocha.js',
            'node_modules/chai/chai.js',
            'node_modules/mocha-clean/index.js',
            'node_modules/sinon-chai/lib/sinon-chai.js'
        ],
        specs         : [clientApp + '**/*.spec.js']
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson : config.bower.json,
            directory : config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    config.karma = getKarmaOptions();

    return config;


    ////////////////////
    function getKarmaOptions() {
        var options                                             = {
            files        : [].concat(
                bowerFiles,
                config.specHelpers,
                client + '**/*.module.js',
                client + '**/*.js',
                temp + config.templateCache.file,
                config.serverIntegrationSpecs
            ),
            exclude      : [],
            coverage     : {
                dir      : report + 'coverage',
                reporters: [
                    { type: 'html', subdir: 'report-html' },
                    { type: 'lcov', subdir: 'report-lcov' },
                    { type: 'text-summary' }
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }
};
