'use strict';

const Boom = require('boom');
const Store = require('./store');

/**
 * Route handlers
 * Each handler should be a translation layer between the route handling and business logic.
 */

module.exports = {
    list(request, reply) {

        return reply(Store.read());
    },

    create(request, reply) {

        const createdCar = Store.create(request.payload);

        return reply(createdCar).code(201);
    },

    read(request, reply) {

        const car = Store.read(request.params.id);

        if (!car) {
            return reply(Boom.notFound(`Unable to find Car ID: ${request.params.id}`));
        }

        return reply(car);
    },

    update(request, reply) {

        const updatedCar = Store.update(request.params.id, request.payload);

        if (!updatedCar) {
            return reply(Boom.notFound(`Unable to update Car ID: ${request.params.id}`));
        }

        return reply(updatedCar);
    },

    delete(request, reply) {

        const deletedCar = Store.delete(request.params.id);

        if (!deletedCar) {
            return reply(Boom.notFound(`Unable to delete Car ID: ${request.params.id}`));
        }

        return reply(deletedCar);
    }
};
