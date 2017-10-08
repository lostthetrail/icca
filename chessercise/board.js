'use strict';

const xopts = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const yopts = ['8', '7', '6', '5', '4', '3', '2', '1'];

const map = new Array(8);
yopts.forEach((y, yi) => {
    map[yi] = new Array(8);
    xopts.forEach((x, xi) => {
        const notation = `${x}${y}`;
        map[yi][xi] = `${notation}`;
    });
})

function create() {
    const map = new Array(8);
    yopts.forEach((y, yi) => {
        map[yi] = new Array(8);
        xopts.forEach((x, xi) => {
            const notation = `${x}${y}`;
            map[yi][xi] = `${notation}`;
        });
    });
    return map;
}

function find(notation) {
    return {x: xopts.indexOf(notation[0]), y: yopts.indexOf(notation[1])};
}

module.exports = {
    create,
    find
};