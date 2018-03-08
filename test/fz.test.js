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

    let inst1 = fz.instances[0];
    expect(inst1.moduleIdRef).toEqual('5mmColorLEDModuleID');
    expect(inst1.modelIndex).toEqual('2017');
    expect(inst1.path).toEqual('/Applications/Fritzing.app/Contents/MacOS/pdb/core/LED-generic-5mm.fzp');
    expect(inst1.title).toEqual('LED');
    expect(inst1.property['color']).toEqual('Red (633nm)');
    expect(inst1.views.breadboard.layer).toEqual('breadboard');
    expect(inst1.views.breadboard.bottom).toEqual('');
    expect(inst1.views.breadboard.wireExtra).toEqual('');
    expect(inst1.views.breadboard.geometry.x).toEqual('327.339');
    expect(inst1.views.breadboard.geometry.y).toEqual('-58.2786');
    expect(inst1.views.breadboard.geometry.z).toEqual('2.50003');
    expect(inst1.views.breadboard.geometry.x1).toEqual(0);
    expect(inst1.views.breadboard.geometry.y1).toEqual(0);
    expect(inst1.views.breadboard.geometry.x2).toEqual(0);
    expect(inst1.views.breadboard.geometry.y2).toEqual(0);
    // connectors
    let instbbcon = inst1.views.breadboard.connectors;
    expect(instbbcon[0].connectorId).toEqual('connector0');
    expect(instbbcon[0].connects['connector0'].layer).toEqual('breadboardWire');
    expect(instbbcon[0].connects['connector0'].modelIndex).toEqual('2066');
    expect(instbbcon[0].connects['connector1'].layer).toEqual('breadboardWire');
    expect(instbbcon[0].connects['connector1'].modelIndex).toEqual('1717691');
    expect(instbbcon[0].connects['connector57'].layer).toEqual('breadboardbreadboard');
    expect(instbbcon[0].connects['connector57'].modelIndex).toEqual('1767216');

    expect(instbbcon[1].connectorId).toEqual('connector1');
    expect(instbbcon[1].layer).toEqual('breadboard');
    expect(instbbcon[1].leg).toEqual({});
    expect(instbbcon[1].geometry).toEqual({x: '14.661', y: '36.5085'});
    expect(instbbcon[1].connects['connector1'].modelIndex).toEqual('1717704');
    expect(instbbcon[1].connects['connector1'].layer).toEqual('breadboardWire');
    expect(instbbcon[1].connects['connector56'].modelIndex).toEqual('1767216');
    expect(instbbcon[1].connects['connector56'].layer).toEqual('breadboardbreadboard');

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
