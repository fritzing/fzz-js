const {loadFZZ, readFZZ} = require('../src/utils');
const fs = require('fs');

test( 'Test loadFZZ', (done) => {
  const url = 'https://raw.githubusercontent.com/fritzing/creatorkit-code/master/en/Fritzing/Blink.fzz';
  loadFZZ(url, (err, fzz) => {
    if (err) {
      console.log('ERROR', err);
      throw err;
    }
    // console.log('==> FZZ', fzz);
    expect(fzz.uri).toEqual(url);
    expect(fzz.files.length).toEqual(1);
    expect(fzz.files[0]).toEqual('Blink.fz');
    expect(fzz.fz.uri).toEqual('Blink.fz');
    expect(fzz.fz.fritzingVersion).toEqual('0.8.4b.12.07.8b2c');
    expect(fzz.fz.boards.length).toEqual(1);
    expect(fzz.fz.views.length).toEqual(3);
    console.log('==> FZZ', fzz.fz.views);
    done();
  });
});

test.only( 'Test readFZZ', (done) => {
  const data = fs.readFileSync('./test/fixtures/Blink.fzz');
  readFZZ('test', data, (err, fzz) => {
    if (err) {
      console.log('ERROR', err);
      throw err;
    }
    console.log(fzz.fz.instances);
    done();
  });
});
