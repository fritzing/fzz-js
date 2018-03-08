'use strict';

const FZGeometry = require('../src/fz/geometry');

test('Test new FZGeometry (empty)', () => {
  let b = new FZGeometry();
  expect(b.x).toEqual(0);
  expect(b.y).toEqual(0);
  expect(b.z).toEqual(0);
  expect(b.x1).toEqual(0);
  expect(b.y1).toEqual(0);
  expect(b.x2).toEqual(0);
  expect(b.y2).toEqual(0);
  expect(b.wireFlags).toEqual('');
});

test('Test new FZGeometry', () => {
  const opt = {
    x: 100,
    y: 100,
    z: 1,
    x1: 10,
    y1: 10,
    x2: 20,
    y2: 20,
    wireFlags: '',
  };
  let b = new FZGeometry(opt);
  expect(b.x).toEqual(100);
  expect(b.y).toEqual(100);
  expect(b.z).toEqual(1);
  expect(b.x1).toEqual(10);
  expect(b.y1).toEqual(10);
  expect(b.x2).toEqual(20);
  expect(b.y2).toEqual(20);
  expect(b.wireFlags).toEqual('');
});
