'use strict';

const Board = require('./board');

const notationMap = Board.create();

function potentialRook(xin, yin) {

    const potentialMoves = [];

    // up
    for (let yind = yin-1; yind >= 0; yind--) {
        const notation = notationMap[yind][xin];
        potentialMoves.push(notation);
    }

    // down
    for (let yind = yin+1; yind <= 7; yind++) {
        const notation = notationMap[yind][xin];
        potentialMoves.push(notation);
    }

    // left
    for (let xind = xin-1; xind >= 0; xind--) {
        const notation = notationMap[yin][xind];
        potentialMoves.push(notation);
    }

    // right
    for (let xind = xin+1; xind <= 7; xind++) {
        const notation = notationMap[yin][xind];
        potentialMoves.push(notation);
    }

    return potentialMoves;
}

function potentialQueen(xin, yin) {
    let potentialMoves = [];
    
        // up left    
        for (let yind = yin-1, xind = xin-1; yind >= 0 && xind >= 0; yind-- && xind--) {
            const notation = notationMap[yind][xind];
            potentialMoves.push(notation);
        }

        // up right
        for (let yind = yin-1, xind = xin+1; yind >= 0 && xind <= 7; yind-- && xind++) {
            const notation = notationMap[yind][xind];
            potentialMoves.push(notation);
        }

        // down left
        for (let yind = yin+1, xind = xin-1; yind <= 7 && xind >= 0; yind++ && xind--) {
            const notation = notationMap[yind][xind];
            potentialMoves.push(notation);
        }

        // down right
        for (let yind = yin+1, xind = xin+1; yind <= 7 && xind <= 7; yind++ && xind++) {
            const notation = notationMap[yind][xind];
            potentialMoves.push(notation);
        }

        potentialMoves = potentialMoves.concat(potentialRook(xin, yin));
    
        return potentialMoves;
}

function inBounds(x, y) {
    if (x <= 7 && x >= 0 && y <= 7 && y >= 0) {
        return true;
    }
    return false;
}

function findNotation(x, y) {
    // confirm within board boundries
    if (inBounds(x, y)) {
        return notationMap[y][x]
    }
    return null;
}

const knightMoves = [
    [1, 2],
    [2, 1],
    [1, -2],
    [2, -1],
    [-1, 2],
    [-2, 1],
    [-1, -2],
    [-2, -1]
];

function potentialKnight(xin, yin) {

    const potentialMoves = [];
    knightMoves.forEach((offset) => {

        const mxin = xin + offset[0];
        const myin = yin + offset[1];
        const notation = findNotation(mxin, myin);

        if (notation) {
            potentialMoves.push(notation);
        }
    });
    return potentialMoves;
}

function chessercise(piece, position) {

    const {x: xin, y: yin} = Board.find(position)

    if (!inBounds(xin, yin)) {
        throw new Error(`Unsupported position: ${position}`);
    }

    if (piece === 'knight') {
        return potentialKnight(xin, yin).sort();
    } else if (piece === 'queen') {
        return potentialQueen(xin, yin).sort();
    } else if (piece === 'rook') {
        return potentialRook(xin, yin).sort();
    }
    throw new Error(`Unsupported piece: ${piece}`);
}

module.exports = chessercise;