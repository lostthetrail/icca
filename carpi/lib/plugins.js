'use strict';

const Package = require('../package');

/**
 * List of plugins to be registered to Hapi prior to opening connection(s).
 * Configures console logging and plugins for Swagger (OpenAPI)
 */

module.exports = [
    {
        register: require('good'),
        options: {
            ops: {
                interval: 1000
            },
            reporters: {
                myConsoleReporter: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{ log: '*', response: '*' }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        }
    }, {
        register: require('inert')
    }, {
        register: require('vision')
    }, {
        register: require('hapi-swagger'),
        options: {
            info: {
                title: 'Car API Documentation',
                version: Package.version
            }
        }
    }
];
