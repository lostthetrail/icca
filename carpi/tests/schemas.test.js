'use strict';

const Test = require('tape');
const Schemas = require('../lib/schemas');
const Joi = require('joi');

Test('Schema.id value is valid', (assert) => {

    assert.plan(2);

    Joi.validate(1, Schemas.id, (err, id) => {

        assert.error(err, 'should not have an error');
        assert.ok(id, 'shoud have an id');
    });

});

Test('Schema.id value is too small', (assert) => {

    assert.plan(1);

    Joi.validate(-1, Schemas.id, (err, id) => {

        assert.ok(err, 'should have an error');
    });

});

Test('Schema.id value is a string', (assert) => {

    assert.plan(1);

    Joi.validate('hello', Schemas.id, (err, id) => {

        assert.ok(err, 'should have an error');
    });
});

Test('Schema.id value is null', (assert) => {

    assert.plan(1);

    Joi.validate(null, Schemas.id, (err, id) => {

        assert.ok(err, 'should have an error');
    });

});

Test('Schema.car value is valid', (assert) => {

    assert.plan(2);

    Joi.validate({
        color: 'red',
        make: 'honda',
        model: 'civic',
        year: 1995
    }, Schemas.car, (err, car) => {

        assert.error(err, 'should not have an error');
        assert.ok(car, 'should have a car');
    });
});

Test('Schema.car value contains an id', (assert) => {

    assert.plan(1);

    Joi.validate({
        id: 1,
        color: 'red',
        make: 'honda',
        model: 'civic',
        year: 1995
    }, Schemas.car, (err, car) => {

        assert.ok(err, 'should have an error');
    });
});

Test('Schema.car value contains an invalid year', (assert) => {

    assert.plan(1);

    Joi.validate({
        id: 1,
        color: 'red',
        make: 'honda',
        model: 'civic',
        year: 0
    }, Schemas.car, (err, car) => {

        assert.ok(err, 'should have an error');
    });
});

Test('Schema.car value contains an invalid color', (assert) => {

    assert.plan(1);

    Joi.validate({
        id: 1,
        color: 1337,
        make: 'honda',
        model: 'civic',
        year: 0
    }, Schemas.car, (err, car) => {

        assert.ok(err, 'should have an error');
    });
});
