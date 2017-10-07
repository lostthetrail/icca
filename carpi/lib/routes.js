'use strict';

const Joi = require('joi');
const Handlers = require('./handlers');
const Schemas = require('./schemas');

const IdSchema = Joi.reach(Schemas.car, 'id');

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
            notes: 'Returns a 200 array of Car objects if successful.',
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
            notes: 'Returns a 200 Car object if successful.',
            tags: ['api', 'cars'],
            validate: {
                params: {
                    id: IdSchema
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
            notes: 'Returns an empty body 201 if successful.',
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
            notes: 'Returns an empty body 204 if successful.',
            tags: ['api', 'cars'],
            validate: {
                params: {
                    id: IdSchema
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
            notes: 'Returns an empty body 204 if successful.',
            tags: ['api', 'cars'],
            validate: {
                params: {
                    id: IdSchema
                }
            }
        }
    }
];
