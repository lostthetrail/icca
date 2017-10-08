'use strict';

const Handlers = require('./handlers');
const Schemas = require('./schemas');

/**
 * List of routes supported by the server.
 * Each route contains its method, path, handler, route validation and configurations used by OpenAPI.
 */

module.exports = [
    {
        method: 'GET',
        path: '/v1/cars',
        handler: Handlers.list,
        config: {
            description: 'Read the list of car entries.',
            notes: 'Success(200) - JSON array of Cars',
            tags: ['api', 'cars'],
            validate: {}
        }
    },
    {
        method: 'GET',
        path: '/v1/cars/{id}',
        handler: Handlers.read,
        config: {
            description: 'Read a car entry.',
            notes: 'Success(200) - JSON object of a Car',
            tags: ['api', 'cars'],
            validate: {
                params: {
                    id: Schemas.id
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/v1/cars',
        handler: Handlers.create,
        config: {
            description: 'Create a new car entry.',
            notes: 'Success(201) - JSON object of a newly created Car',
            tags: ['api', 'cars'],
            validate: {
                payload: Schemas.car
            }
        }
    }, {
        method: 'PUT',
        path: '/v1/cars/{id}',
        handler: Handlers.update,
        config: {
            description: 'Update a car entry.',
            notes: `Success: 200 - JSON object of updated Car\n
            Not Found: 404 - No body`,
            notes: 'Success(200) - JSON object of the updated Car. Not Found(404) - No body',
            tags: ['api', 'cars'],
            validate: {
                params: {
                    id: Schemas.id
                },
                payload: Schemas.car
            }
        }
    }, {
        method: 'DELETE',
        path: '/v1/cars/{id}',
        handler: Handlers.delete,
        config: {
            description: 'Delete a car entry.',
            notes: 'Success(200) - JSON object of the deleted Car. Not Found(404) - No body',
            tags: ['api', 'cars'],
            validate: {
                params: {
                    id: Schemas.id
                }
            }
        }
    }
];
