'use strict';

const Test = require('tape');
const Server = require('../lib/server');

Test('Read all cars', (assert) => {

    assert.plan(2);

    Server.init((server) => {

        server.inject({
            method: 'GET',
            url: '/v1/cars'
        }, ({ statusCode, result }) => {

            assert.equals(statusCode, 200, 'Status code should be 200');
            assert.equals((result.length), 2, 'Two cars should exist');
        });
    });
});

Test('Read a car', (assert) => {

    assert.plan(2);

    Server.init((server) => {

        server.inject({
            method: 'GET',
            url: '/v1/cars/1'
        }, ({ statusCode, result }) => {

            assert.equals(statusCode, 200, 'Status code should be 200');
            assert.ok(result, 'A car should be returned');
        });
    });
});

Test('Create a car', (assert) => {

    assert.plan(3);

    Server.init((server) => {

        server.inject({
            method: 'POST',
            url: '/v1/cars',
            payload: {
                color: 'pink',
                make: 'honda',
                model: 'civic',
                year: 2012
            }
        }, ({ statusCode, result }) => {

            assert.equals(statusCode, 201, 'Status code should be 201');
            assert.ok(result, 'A car should be returned');

            server.inject({
                method: 'GET',
                url: '/v1/cars/3'
            }, ({ statusCode: verifyStatusCode }) => {

                assert.equals(verifyStatusCode, 200, 'Status code should be 200');
            });
        });
    });
});

Test('Update a car', (assert) => {

    assert.plan(4);

    Server.init((server) => {

        const year = 2013;

        server.inject({
            method: 'PUT',
            url: '/v1/cars/3',
            payload: {
                color: 'pink',
                make: 'honda',
                model: 'civic',
                year
            }
        }, ({ statusCode, result }) => {

            assert.equals(statusCode, 200, 'Status code should be 200');
            assert.ok(result, 'A car should be returned');
            assert.equals(result.year, year, 'A car should be returned');

            server.inject({
                method: 'GET',
                url: '/v1/cars/3'
            }, ({ statusCode: verifyStatusCode }) => {

                assert.equals(verifyStatusCode, 200, 'Status code should be 200');
            });
        });
    });
});

Test('Delete a car', (assert) => {

    assert.plan(3);

    Server.init((server) => {

        server.inject({
            method: 'DELETE',
            url: '/v1/cars/3'
        }, ({ statusCode, result }) => {

            assert.equals(statusCode, 200, 'Status code should be 200');
            assert.ok(result, 'A car should be returned');

            server.inject({
                method: 'GET',
                url: '/v1/cars/3'
            }, ({ statusCode: verifyStatusCode }) => {

                assert.equals(verifyStatusCode, 404, 'Status code should be 404');
            });
        });
    });
});
