'use strict';

/**
 * Mutable in-memory storage for cars.
 * Could be easily replaced with a SQL, disk or noSQL solution.
 */

const store = {
    cars: [
        {
            color: 'red',
            make: 'ford',
            model: 'silverado',
            year: 2017,
            id: 1
        },
        {
            color: 'blue',
            make: 'chevy',
            model: 'camero',
            year: 2014,
            id: 2
        }
    ]
};

const findNextId = (cars) => {

    return Math.max.apply(Math, cars.map((car) => car.id)) + 1;
};

const findCarIndex = (cars, id) => {

    const index = cars.findIndex((car) => {

        return car.id === id;
    });

    if (index === -1) {
        return null;
    }

    return index;
};

module.exports = {
    create(car) {

        const id = findNextId(store.cars);
        const newCar = Object.assign({}, car, { id });

        store.cars.push(newCar);
        return newCar;
    },

    read(id) {

        if (!id) {
            return store.cars;
        }

        const index = findCarIndex(store.cars, id);
        if (index === null) {
            return null;
        }

        return store.cars[findCarIndex(store.cars, id)];
    },

    update(id, car) {

        const index = findCarIndex(store.cars, id);
        if (index === null) {
            return null;
        }

        const updatedCar = Object.assign({}, car, { id });
        store.cars.splice(index, 1, updatedCar);
        return updatedCar;
    },

    delete(id) {

        const index = findCarIndex(store.cars, id);
        if (index === null) {
            return null;
        }
        const delCar = store.cars.splice(index, 1);
        return delCar[0];
    }
};
