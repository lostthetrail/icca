'use strict';

/**
 * Mutable in-memory storage for cars.
 * Could be easily replaced with a SQL, disk or noSQL solution.
 */

// FIXME Confirm ID is unique and can't be duplicated
// FIXME Should ID be ignored in created/updated payloads?
// FIXME Write unit tests

const store = {
    cars: [
        {
            id: 1,
            color: 'Red',
            make: 'Ford',
            model: 'Silverado',
            year: 2017
        },
        {
            id: 2,
            color: 'Blue',
            make: 'Chevy',
            model: 'Camero',
            year: 2014
        }
    ]
};

const findCarIndex = (id) => {

    const index = store.cars.findIndex((car) => {

        return car.id === id;
    });

    if (index === -1) {
        return null;
    }

    return index;
};

module.exports = {
    async create(car) {

        const index = store.cars.push(car);
        return car.id;
    },

    async read(id) {

        if (!id) {
            return store.cars;
        }
        return store.cars[findCarIndex(id)];
    },

    async update(id, car) {

        const index = findCarIndex(id);
        store.cars.splice(index, 1, car);
        return id;
    },

    async delete(id) {

        const index = findCarIndex(id);
        store.cars.splice(index, 1);
        return id;
    }
};