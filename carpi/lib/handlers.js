'use strict';

const Boom = require('boom');
const Store = require('./store');

/**
 * Route handlers
 * Each handler should be a translation layer between the route handling and business logic.
 */

module.exports = {
    async list (request, reply) {
        
        return reply(await Store.read());
    },

    async create(request, reply) {

        await Store.create(request.payload);

        return reply().code(201);
    },

    async read(request, reply) {

        const car = await Store.read(request.params.id);

        if (!car) {
            return reply(Boom.notFound(`Unable to find Car ID: ${request.params.id}`));
        }

        return reply(car);
    },

    async update(request, reply) {

        const updatedCarId = await Store.update(request.params.id, request.payload);

        if (!updatedCarId) {
            return reply(Boom.notFound(`Unable to update Car ID: ${request.params.id}`));
        }

        return reply();
    },

    async delete(request, reply) {

        const deletedCarId = await Store.delete(request.params.id);

        if (!deletedCarId) {
            return reply(Boom.notFound(`Unable to delete Car ID: ${request.params.id}`));
        }

        return reply();
    }
};
