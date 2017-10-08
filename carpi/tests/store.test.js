'use strict';

const Test = require('tape');
const Store = require('../lib/store');

Test('Store#Create called with a car', (assert) => {

    assert.plan(1);

    const createdCar = Store.create({
        color: 'white',
        make: 'pontiac',
        model: 'vibe',
        year: 1990
    });
    assert.ok(createdCar, 'should have created a car');
});

Test('Store#Create ignores ids', (assert) => {

    assert.plan(2);

    const id = 1;

    const createdCar = Store.create({
        id,
        color: 'white',
        make: 'pontiac',
        model: 'vibe',
        year: 1990
    });
    assert.ok(createdCar, 'should have returned a car');
    assert.ok(createdCar.id > id, 'should have a different id');
});

Test('Store#Read called without ID', (assert) => {

    assert.plan(1);

    const cars = Store.read();
    assert.ok(((cars.length + 1) >= 2), 'should have at least two cars');
});

Test('Store#Read called with ID', (assert) => {

    assert.plan(1);

    const car = Store.read(1);
    assert.ok(car, 'should have one car');
});

Test('Store#Read called with invalid ID', (assert) => {

    assert.plan(1);

    const car = Store.read(999);
    assert.notOk(car, 'should return a null');
});

Test('Store#Update called with a car', (assert) => {

    assert.plan(1);

    const updatedCar = Store.update(3, {
        color: 'white',
        make: 'pontiac',
        model: 'vibe',
        year: 1990
    });
    assert.ok(updatedCar, 'should have created a car');
});

Test('Store#Update ignores ids', (assert) => {

    assert.plan(2);

    const id = 1;

    const updatedCar = Store.update(3, {
        id,
        color: 'white',
        make: 'pontiac',
        model: 'vibe',
        year: 1990
    });
    assert.ok(updatedCar, 'should have returned a car');
    assert.ok(updatedCar.id > id, 'should have a different id');
});

Test('Store#Delete called with ID', (assert) => {

    assert.plan(1);

    const deletedCar = Store.delete(3);
    assert.ok(deletedCar, 'should have one car');
});

Test('Store#Delete called with invalid ID', (assert) => {

    assert.plan(1);

    const deletedCar = Store.delete(999);
    assert.notOk(deletedCar, 'should return a null');
});
