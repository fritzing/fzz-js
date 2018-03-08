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

    const path1 = '/Applications/Fritzing.app/Contents/MacOS/pdb/core/LED-generic-5mm.fzp';
    expect(fzz.fz.fzps['5mmColorLEDModuleID'].name).toEqual('LED-generic-5mm.fzp');
    expect(fzz.fz.fzps['5mmColorLEDModuleID'].type).toEqual('core');
    expect(fzz.fz.fzps['5mmColorLEDModuleID'].path).toEqual(path1);

    expect(fzz.fz.fzps['WireModuleID'].name).toEqual('wire.fzp');
    expect(fzz.fz.fzps['WireModuleID'].type).toEqual('core-resources');
    expect(fzz.fz.fzps['WireModuleID'].path).toEqual(':/resources/parts/core/wire.fzp');

    expect(fzz.fz.fzps['arduino_Uno_Rev3'].name).toEqual('arduino_Uno_Rev3.fzp');
    expect(fzz.fz.fzps['arduino_Uno_Rev3'].type).toEqual('core');
    expect(fzz.fz.fzps['arduino_Uno_Rev3'].path).toEqual(
      '/Applications/Fritzing.app/Contents/MacOS/pdb/core/arduino_Uno_Rev3.fzp');

    expect(fzz.fz.fzps['pcb-arduino-r3-shield'].name).toEqual('arduino-shield_r3_two_layer.fzp');
    expect(fzz.fz.fzps['pcb-arduino-r3-shield'].type).toEqual('core');
    expect(fzz.fz.fzps['pcb-arduino-r3-shield'].path).toEqual(
      '/Applications/Fritzing.app/Contents/MacOS/pdb/core/arduino-shield_r3_two_layer.fzp');

    expect(fzz.fz.fzps['newLogoImageModuleID'].name).toEqual('newlogoimage.fzp');
    expect(fzz.fz.fzps['newLogoImageModuleID'].type).toEqual('core-resources');
    expect(fzz.fz.fzps['newLogoImageModuleID'].path).toEqual(
      ':/resources/parts/core/newlogoimage.fzp');

    expect(fzz.fz.fzps['LogoTextModuleID'].name).toEqual('logotext.fzp');
    expect(fzz.fz.fzps['LogoTextModuleID'].type).toEqual('core-resources');
    expect(fzz.fz.fzps['LogoTextModuleID'].path).toEqual(
      ':/resources/parts/core/logotext.fzp');

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

    // load all fzps
    fzz.fz.loadFzps()
    .then((data) => {
      // console.log(data[2]);
      expect(data[2].author).toEqual('althaus');
      expect(data[2].date).toEqual('Mo Apr 15 2013');
      done();
    })
    .catch((err) => {
      console.error('Error', err);
      done(err);
    });
  });
});
