'use strict';

const Joi = require('joi');

/**
 * Schemas for Car API
 */

module.exports = {
    id: Joi.number().integer().min(1).required().description('Unique Car ID').example(1),
    car: Joi.object().keys({
        id: Joi.forbidden(),
        color: Joi.string().lowercase().required().description('Color').example('silver'),
        make: Joi.string().lowercase().required().description('Make (E.g. Subaru)').example('tesla'),
        model: Joi.string().lowercase().required().description('Model (E.g. Outback)').example('pinto'),
        year: Joi.number().integer().min(1808).max(9999).required().description('Year').example(2017)
    })
};
