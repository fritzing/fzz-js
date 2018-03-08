'use strict';

const Program = require('../src/fz/program');

test('Test new Program (empty)', () => {
  let b = new Program();
  expect(b.language).toEqual(null);
  expect(b.source).toEqual(null);
});

test('Test new Program', () => {
  const opt = {
    language: 'ino',
    source: '// hello world',
  };
  let b = new Program(opt);
  expect(b.language).toEqual('ino');
  expect(b.source).toEqual('// hello world');
});
