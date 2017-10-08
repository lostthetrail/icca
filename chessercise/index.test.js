'use strict';

const Test = require('tape');
const chessercise = require('./index');


// https://en.wikipedia.org/wiki/Queen_(chess)
Test('Queen D4', (assert) => {
    assert.plan(1);
    const ans = chessercise('queen', 'd4');
    assert.deepEqual(ans, ['a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4', 'd1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8', 'a1', 'a7', 'b2', 'b6', 'c5', 'c3', 'e5', 'e3', 'f2', 'f6', 'g1', 'g7', 'h8'].sort());
});

Test('Queen H1', (assert) => {
    assert.plan(1);
    const ans = chessercise('queen', 'h1');
    assert.deepEqual(ans, ['a1', 'a8', 'b1', 'b7', 'c1', 'c6', 'd1', 'd5', 'e1', 'e4', 'f1', 'f3', 'g1', 'g2', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'].sort());
});

// https://en.wikipedia.org/wiki/Rook_(chess)
Test('Rook D4', (assert) => {
    assert.plan(1);
    const ans = chessercise('rook', 'd4');
    assert.deepEqual(ans, ['a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4', 'd1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8'].sort());
});

Test('Rook A1', (assert) => {
    assert.plan(1);
    const ans = chessercise('rook', 'a1');
    assert.deepEqual(ans, ['a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'].sort());
});

// https://en.wikipedia.org/wiki/Knight_(chess)
Test('Knight D2', (assert) => {
    assert.plan(1);
    const ans = chessercise('knight', 'd2');
    assert.deepEqual(ans, ['b1', 'f1', 'b3', 'f3', 'c4', 'e4'].sort());
});

Test('Knight H1', (assert) => {
    assert.plan(1);
    const ans = chessercise('knight', 'h1');
    assert.deepEqual(ans, ['f2', 'g3'].sort());
});

Test('Knight D4', (assert) => {
    assert.plan(1);
    const ans = chessercise('knight', 'd4');
    assert.deepEqual(ans, ['b5', 'b3', 'c2', 'c6', 'e2', 'e6', 'f3', 'f5'].sort());
});

Test('Unsupported piece', (assert) => {
    assert.plan(1);
    assert.throws(() => {chessercise('pawn', 'd4')}, Error);
});

Test('Unsupported position', (assert) => {
    assert.plan(1);
    assert.throws(() => {chessercise('knight', 'x4')}, Error);
});
