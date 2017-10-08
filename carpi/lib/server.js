'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');

/**
 * Create Hapi.js server on port 8081 if not overridden by PORT env.
 */

module.exports = {
    init(onStart) {

        const server = new Hapi.Server({
            connections: {
                routes: {
                    response: {
                        emptyStatusCode: 204
                    }
                }
            }
        });

        server.connection({
            port: process.env.PORT || 8081,
            host: 'localhost'
        });

        server.register(require('./plugins'), (registerErr) => {

            Hoek.assert(!registerErr);

            server.route(require('./routes'));

            onStart(server);
        });
    }
};
