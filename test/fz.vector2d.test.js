'use strict';

const Vector2D = require('../src/fz/vector2d');

test('Test new Vector2D (empty)', () => {
  let b = new Vector2D();
  expect(b.x).toEqual(0);
  expect(b.y).toEqual(0);
});

test('Test new Vector2D', () => {
  const opt = {
    x: 100,
    y: 200,
  };
  let b = new Vector2D(opt);
  expect(b.x).toEqual(100);
  expect(b.y).toEqual(200);
});
