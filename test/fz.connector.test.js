'use strict';

const {FZConnector} = require('../src/fz/connector');

test('Test new FZConnector (empty)', () => {
  let b = new FZConnector();
  expect(b.connectorId).toEqual(null);
  expect(b.layer).toEqual(null);
  expect(b.leg).toEqual({});
  expect(b.geometry).toEqual({});
  expect(b.connects).toEqual({});
});

test('Test new FZConnector', () => {
  const opt = {
    connectorId: 'id1',
    layer: 'lay1',
    leg: {},
    geometry: 'geo1',
    connects: 'con1',
  };
  let b = new FZConnector(opt);
  expect(b.connectorId).toEqual('id1');
  expect(b.layer).toEqual('lay1');
  expect(b.leg).toEqual({});
  expect(b.geometry).toEqual('geo1');
  expect(b.connects).toEqual('con1');
});
