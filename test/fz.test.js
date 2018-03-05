'use strict';

const fs = require('fs');
const {parseFZ} = require('../src/fz/fz');


test('Test parseFZ', (done) => {
  const src = './test/fixtures/Blink/Blink.fz';
  const data = fs.readFileSync(src);
  parseFZ(src, data, (err, fz) => {
    if (err) {
      console.error('parseFZ Error', err);
      done(err);
    }
    // console.log(JSON.stringify(fz.boards, '', '  '));

    // console.log(fz);

    // test metadata
    expect(fz.uri).toEqual(src);
    expect(fz.fritzingVersion).toEqual('0.8.3b.07.27.048f');

    // test the boards
    expect(fz.boards.length).toEqual(1);
    expect(fz.boards[0].title).toEqual('Arduino Shield PCB');
    expect(fz.boards[0].instance).toEqual('PCB1');
    expect(fz.boards[0].width).toEqual('6.9215cm');
    expect(fz.boards[0].height).toEqual('5.33756cm');

    // test the views
    expect(fz.views.breadboard.name).toEqual('breadboardView');
    expect(fz.views.breadboard.backgroundColor).toEqual('#eff3f5');
    expect(fz.views.breadboard.gridSize).toEqual('0.1in');
    expect(fz.views.breadboard.showGrid).toEqual('0');
    expect(fz.views.breadboard.alignToGrid).toEqual('1');
    expect(fz.views.breadboard.viewFromBelow).toEqual('0');

    expect(fz.views.schematic.name).toEqual('schematicView');
    expect(fz.views.schematic.backgroundColor).toEqual('#eff3f5');
    expect(fz.views.schematic.gridSize).toEqual('0.295276in');
    expect(fz.views.schematic.showGrid).toEqual('0');
    expect(fz.views.schematic.alignToGrid).toEqual('1');
    expect(fz.views.schematic.viewFromBelow).toEqual('0');

    expect(fz.views.pcb.name).toEqual('pcbView');
    expect(fz.views.pcb.backgroundColor).toEqual('#a0a8b3');
    expect(fz.views.pcb.gridSize).toEqual('0.05in');
    expect(fz.views.pcb.showGrid).toEqual('1');
    expect(fz.views.pcb.alignToGrid).toEqual('1');
    expect(fz.views.pcb.viewFromBelow).toEqual('0');
    // expect(fz.views.pcb.gpgKeepout).toEqual('0');
    expect(fz.views.pcb.autorouteViaHoleSize).toEqual('0.4mm');
    expect(fz.views.pcb.autorouteTraceWidth).toEqual('24');
    expect(fz.views.pcb.autorouteViaRingThickness).toEqual('0.3mm');
    // expect(fz.views.pcb.drcKeepout).toEqual('0.01in');

    expect(fz.instances[0].moduleIdRef).toEqual('5mmColorLEDModuleID');
    expect(fz.instances[0].modelIndex).toEqual('2017');
    expect(fz.instances[0].path).toEqual('/Applications/Fritzing.app/Contents/MacOS/pdb/core/LED-generic-5mm.fzp');
    // expect(fz.instances[0].property.name).toEqual('color');
    // expect(fz.instances[0].property.value).toEqual('Red (633nm)');
    // expect(fz.instances[0].title).toEqual('LED');

    // console.log(fzz.fz.instances[0]);

    // fz.loadFzps(() => {
    // .then(d => {
    //   console.log('loaded all fzp files');
    //   return d
    // })
    // .catch(e => {
    //     console.error(e);
    // });
    // fzz.fz.instances[0].loadFzp().then(data => {
    //   console.log('OKKKK');

    //   expect(fz.fzps['5mmColorLEDModuleID'].modelIndex).toEqual('2017');
    // });

    done();
  });
});
