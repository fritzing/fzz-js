'use strict';

const {FZInstance} = require('../src/fz/instance');

test('Test new FZInstance (empty)', () => {
  let b = new FZInstance();
  expect(b.moduleIdRef).toEqual('');
  expect(b.modelIndex).toEqual('');
  expect(b.path).toEqual('');
  expect(b.property).toEqual([]);
  expect(b.title).toEqual('');
  expect(b.views.breadboard).toEqual([]);
  expect(b.views.pcb).toEqual([]);
  expect(b.views.schematic).toEqual([]);
});

test('Test new FZInstance', () => {
  const opt = {
    moduleIdRef: 'id1',
    modelIndex: 'in1',
    path: 'p1',
    property: [],
    title: 't1',
    views: {
      breadboard: [],
      pcb: [],
      schematic: [],
    },
  };
  let b = new FZInstance(opt);

  expect(b.moduleIdRef).toEqual('id1');
  expect(b.modelIndex).toEqual('in1');
  expect(b.path).toEqual('p1');
  expect(b.property).toEqual([]);
  expect(b.title).toEqual('t1');
  expect(b.views.breadboard).toEqual([]);
  expect(b.views.pcb).toEqual([]);
  expect(b.views.schematic).toEqual([]);
});
