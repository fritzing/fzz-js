const {loadFZZ, readFZZ} = require('../src/fzz-utils');

test( 'Test LoadFZZ', (done) => {
  const url = 'https://raw.githubusercontent.com/fritzing/creatorkit-code/master/en/Fritzing/Blink.fzz';
  loadFZZ(url, (fzz) => {
    console.log('==> FZZ', fzz);
    // expect(fzz.filepath).toEqual(url)
    // expect(fzz.files.length).toEqual(1)
    // expect(fzz.files[0]).toEqual('Blink.fz')
    done();
  });
});

// test('Test readFZZ', (done) => {
//   var data = fs.readFileSync("./test/fixtures/Blink.fzz")
//   readFZZ(data, (fzz) => {
//     console.log("FZZ", fzz);
//     // assert.ok( fzz.code.totalSources() == 1, "Passed!" );
//     //   console.log(fzz.bom());
//     done()
//   });
// });
