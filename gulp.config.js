module.exports = function() {
    var server    = './src/server/';
    var client    = './src/client/';
    var clientApp = client + 'app/';
    var temp      = './.tmp/';

    var config = {
        // path
        alljs        : [
            './src/**/*.js',
            './*.js'
        ],
        build        : './build/',
        server       : server,
        client       : client,
        index        : client + 'index.html',
        html         : client + '**/*.html',
        css          : temp + "styles.css",
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

        // bower and npm locations
        bower: {
            json      : require( './bower.json' ),
            directory : './bower_components/',
            ignorePath: '../..'
        },

        // node settings
        defaultPort: 7203,
        nodeServer : './src/server/app.js',

        // browser sync
        browserReloadDelay: 1000,

        // template cache
        templateCache: {
            file   : 'templates.js',
            options: {
                module    : "app.core",
                standAlone: false,
                root      : 'app/'
            }
        }
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson : config.bower.json,
            directory : config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};
