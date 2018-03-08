'use strict';

const FZBoard = require('../src/fz/board');

test('Test new FZBoard (empty)', () => {
  let b = new FZBoard();
  expect(b.moduleId).toEqual(null);
  expect(b.title).toEqual(null);
  expect(b.instance).toEqual(null);
  expect(b.width).toEqual(null);
  expect(b.height).toEqual(null);
});

test('Test new FZBoard', () => {
  const opt = {
    moduleId: 'm1',
    title: 't1',
    instance: 'i1',
    width: 'w1',
    height: 'h1',
  };
  let b = new FZBoard(opt);
  expect(b.moduleId).toEqual('m1');
  expect(b.title).toEqual('t1');
  expect(b.instance).toEqual('i1');
  expect(b.width).toEqual('w1');
  expect(b.height).toEqual('h1');
});
