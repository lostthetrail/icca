#!/usr/bin/env node
'use strict';

const Yargs = require('yargs');
const Package = require('./package');
const Chalk = require('chalk');
const chessercise = require('./index');
const Board = require('./board');

const argv = Yargs
    .option('piece', {
        alias: 'p',
        describe: 'chess piece.',
        choices: ['queen', 'rook', 'knight'],
        demandOption: true
    })
    .option('position', {
        alias: 'n',
        describe: 'starting position for the chess piece in standard algebraic notation.',
        demandOption: true
    })
    .help()
    .argv

const piece = argv.piece.toLowerCase();
const position = argv.position.toLowerCase();

const results = chessercise(piece, position)

console.log(Chalk.bold.green(`Your ${piece} can move to: ${results.join(', ')}`));

Board.create().forEach((row) => {
    row.forEach((notation) => {
        process.stdout.write('|');
        if (notation == position) {
            process.stdout.write(Chalk.red.bold(notation));
        }
        else if (results.includes(notation)) {
            process.stdout.write(Chalk.green.bold(notation));
        }
        else {
            process.stdout.write(Chalk.gray(notation));
        }
    });
    process.stdout.write('\n');
});
