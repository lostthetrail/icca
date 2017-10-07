'use strict';

const Joi = require('joi');

module.exports = {
    car: Joi.object().keys({
        id: Joi.number().integer().min(1).required().description('Unique Car ID').example(1),
        color: Joi.string().description('Color').example('Silver'),
        make: Joi.string().description('Make (E.g. Subaru)').example('Tesla'),
        model: Joi.string().description('Model (E.g. Outback)').example('Pinto'),
        year: Joi.number().integer().min(1808).max(9999).required().description('Year').example(2017)
    })
};
