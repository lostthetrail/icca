'use strict';

const Hoek = require('hoek');
const Server = require('./server');

/**
 * Create the server then start it.
 * We do this in two steps to allow for easy testing without starting the server.
 */

Server.init((server) => {

    server.start((startErr) => {

        Hoek.assert(!startErr);

        server.connections.forEach((connection) => {

            server.log('info', `Server running on: ${connection.info.uri}`);
        });
    });
});
