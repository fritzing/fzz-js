const {loadFZZ} = require('../src/fzz-utils');

test( 'Test LoadFZZ', (done) => {
  const url = 'https://raw.githubusercontent.com/fritzing/creatorkit-code/master/en/Fritzing/Blink.fzz';
  loadFZZ(url, (err, fzz) => {
    if (err) {
      console.log('ERROR', err);
      throw err;
    }
    console.log('==> FZZ', fzz);
    expect(fzz.uri).toEqual(url)
    expect(fzz.files.length).toEqual(1)
    expect(fzz.files[0]).toEqual('Blink.fz')
    expect(fzz.fz.fritzingVersion).toEqual('0.8.4b.12.07.8b2c')
    done();
  });
});
