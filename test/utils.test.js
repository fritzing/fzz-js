'use strict';

const fs = require('fs');
const {loadFZZ, readFZZ} = require('../src/utils');

test('Test loadFZZ', (done) => {
  const url = 'https://raw.githubusercontent.com/fritzing/creatorkit-code/master/en/Fritzing/Blink.fzz';
  loadFZZ(url, (err, fzz) => {
    if (err) {
      console.log('loadFZZ Error', err);
      done(err);
    }
    expect(fzz.uri).toEqual(url);
    expect(fzz.files.length).toEqual(1);
    expect(fzz.files[0]).toEqual('Blink.fz');
    expect(fzz.fz.uri).toEqual('Blink.fz');
    done();
  });
});

test('Test readFZZ', (done) => {
  const data = fs.readFileSync('./test/fixtures/Blink.fzz');
  readFZZ('test', data, (err, fzz) => {
    if (err) {
      console.error('readFileSync Error', err);
      done(err);
    }
    // TODO: expect
    done();
  });
});
