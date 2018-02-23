const parseXml = require('xml2js').parseString;
const FZBoard = require('./board');
const FZInstance = require('./instance');

/**
 * the FZ constructor
 */
class FZ {
  /**
   * @param {String} uri uri of the fz
   */
  constructor(uri) {
    this.xml = undefined; // store the raw xml data
    this.uri = uri || ''; // store the fzz filename
    this.fritzingVersion = '';
    this.boards = {}; // list of FZBoard items
    this.programs = {}; // list of FZProgram items
    this.instances = {}; //
    this.views = {
      breadboard: {
        backgroundColor: '#ffffff',
        gridSize: '0.1in',
        showGrid: 1,
        alignToGrid: 1,
        viewFromBelow: 0,
      },
      schematic: {
        backgroundColor: '#ffffff',
        gridSize: '0.1in',
        showGrid: 1,
        alignToGrid: 1,
        viewFromBelow: 0,
      },
      pcb: {
        backgroundColor: '#333333',
        gridSize: '0.05in',
        showGrid: 1,
        alignToGrid: 1,
        viewFromBelow: 0,
        autorouteViaHoleSize: '0.4mm',
        autorouteTraceWidth: 24,
        autorouteViaRingThickness: '0.3mm',
      },
    };
    this.code = {};

    this.fzps = {};
  }

  /**
   * get the BOM
   * @return {Array}
   */
  getBOM() {
    let bomData = [];
    for (let i = 0; i < this.fz.instances.length; i++) {
      // console.log(this.fz.instances[i]);
      if (this.fz.instances[i].moduleIdRef !== 'WireModuleID' &&
          this.fz.instances[i].moduleIdRef !== 'LogoImageModuleID') {
        let bomItem = {
          moduleIdRef: this.fz.instances[i].moduleIdRef,
          active: true,
        };
        bomData.push(bomItem);
      }
    }
    return bomData;
  }
}

class InstanceView {
  constructor(opt) {
    opt = opt || {};
    this.layer = opt.layer || '';
    this.bottom = opt.bottom || '';
    this.geometry = new Geometry(opt.geometry) || new Geometry();
    this.wireExtra = opt.wireExtra || '';
    this.connectors = opt.connectors || '';
  }
}

class Geometry {
  constructor(opt) {
    opt = opt || {};
    this.x = opt.x || 0;
    this.y = opt.y || 0;
    this.z = opt.z || 0;
    this.x1 = opt.x1 || 0;
    this.y1 = opt.y1 || 0;
    this.x2 = opt.x2 || 0;
    this.y2 = opt.y1 || 0;
    this.wireFlags = opt.wireFlags || '';
  }
}

class Vector2D {
  constructor(opt) {
    this.x = opt.x || 0;
    this.y = opt.y || 0;
  }
}

class Connector {
  constructor(opt) {
    opt = opt || {};
    this.connectorId = opt.connectorId || '';
    this.layer = opt.layer || '';
    this.leg = {};
    this.geometry = opt.geometry || {};
    this.connects = opt.connects || {};
  }
}

class Leg {
  constructor() {
    this.point = new Vector2D();
    this.bezier = null;
  }
}
class Connect {
  constructor() {
    this.connectorId = '',
    this.modelIndex = '';
    this.layer = '';
  }
}

// parse fz xml data and return a FZ object.
function parseFZ(uri, src, cb) {
  let tmpFZ = new FZ();
  tmpFZ.uri = uri;

  parseXml(src, (err, xmlDoc) => {
    if (err) {
      cb(err);
    }

    if (xmlDoc) {
      // console.log('#-------------------------------------');
      // console.log(xmlDoc);
      // console.log('#-------------------------------------');

      // the fz file must be the same name as the filepath/filename.fz
      // var base = src.replace(/^.*[\\\/]/, '');
      // var baseFz = base.slice(0, -1);
      // if (filename !== undefined || filename !== baseFz) {
      //   alert('FZZ NOT VALID')
      //   console.log('OKKK', filename, baseFz);
      // }

      tmpFZ.fritzingVersion = xmlDoc.module.$.fritzingVersion;
      if (xmlDoc.module.boards) tmpFZ.boards = parseFZBoards(xmlDoc.module.boards);
      if (xmlDoc.module.views) tmpFZ.views = parseFZViews(xmlDoc.module.views);
      if (xmlDoc.module.instances) tmpFZ.instances = parseFZInstances(xmlDoc.module.instances);

      // tmpFZ.programs = parseFZPrograms(xmlDoc.module.programs);
    }

    cb(null, tmpFZ);
  });
}

function parseFZInstances(xml) {
  let instances = [];
  for (let i = 0; i < xml.length; i++) {
    for (let j = 0; j < xml[i].instance.length; j++) {
      instances.push(parseFZInstance(xml[i].instance[j]));
    }
  }
  return instances;
}

function parseProperty(xml) {
  let d = {};
  for (let i = 0; i < xml.length; i++) {
    const key = xml[i].$.name;
    d[key] = xml[i].$.value;
  }
  return d;
}

function parseFZInstance(xml) {
  let instance = new FZInstance();
  instance.moduleIdRef = xml.$.moduleIdRef;
  instance.modelIndex =xml.$.modelIndex;
  instance.path = xml.$.path;
  if (xml.property) instance.property = parseProperty(xml.property);
  instance.title = xml.title;
  if (xml.views[0].breadboardView) instance.views.breadboard = parseInstanceView(xml.views[0].breadboardView);
  if (xml.views[0].pcbView) instance.views.pcb = parseInstanceView(xml.views[0].pcbView);
  if (xml.views[0].schematicView) instance.views.schematic = parseInstanceView(xml.views[0].schematicView);
  return instance;
}

function parseInstanceView(xml) {
  let instanceView = new InstanceView({
    layer: xml[0].$.layer,
    bottom: xml[0].$.bottom,
    geometry: xml[0].geometry[0].$,
    wireExtra: xml[0].wireExtra,
    connectors: parseInstanceViewConnectors(xml[0].connectors),
  });
  return instanceView;
}

function parseInstanceViewConnectors(xml) {
  let connectors = [];
  if (xml) {
    for (let i = 0; i < xml[0].connector.length; i++) {
      // console.log(xml[0].connector[i]);
      let connector = new Connector();
      connector.connectorId = xml[0].connector[i].$.connectorId;
      connector.layer = xml[0].connector[i].$.layer;
      connector.geometry = parseGeometry(xml[0].connector[i].geometry);
      connector.connects = parseConnects(xml[0].connector[i].connects);
      connectors.push(connector);
    }
  }
  return connectors;
}

function parseConnects(xml) {
  let connects = {};
  if (xml) {
    if (xml[0]) {
      for (let i = 0; i < xml[0].connect.length; i++) {
        let id = xml[0].connect[i].$.connectorId;
        connects[id] = {
          modelIndex: xml[0].connect[i].$.modelIndex,
          layer: xml[0].connect[i].$.layer,
        };
      }
    }
  }
  return connects;
}

function parseGeometry(xml) {
  let vect = {x: 0, y: 0};
  if (xml) {
    if (xml[0]) {
      vect.x = xml[0].$.x;
      vect.y = xml[0].$.y;
    }
  }
  return vect;
}

function parseFZBoards(xml) {
  let boards = [];
  for (let i = 0; i < xml.length; i++) {
    boards.push(parseFZBoard(xml[i].board));
  }
  return boards;
 }

 function parseFZBoard(xml) {
   let board = new FZBoard();
   board.moduleId = xml[0].$.moduleId;
   board.title = xml[0].$.title;
   board.instance = xml[0].$.instance;
   board.width = xml[0].$.width;
   board.height = xml[0].$.height;
   return board;
 }

function parseFZPrograms(xml) {
  // console.log('parseFZPrograms', xml);
  let programs = [];
  for (let i = 0; i < xml.childNodes.length; i++) {
    let tmpNode = xml.childNodes[i];
    // console.log('view', tmpNode);
    if (tmpNode.nodeName === 'program') {
      // console.log(tmpNode);

      let tmpProgram = new FZProgram();
      tmpProgram.source = tmpNode.innerHTML;

      for (let a = 0; a < tmpNode.attributes.length; a++) {
        let tmpAttr = tmpNode.attributes[a];
        switch (tmpAttr.name) {
          case 'language':
            tmpProgram.language = tmpAttr.nodeValue;
            break;
        }
      }

      programs.push(tmpProgram);
    }
  }
  return programs;
}

function parseFZViews(xml) {
  let views = {
    breadboard: {},
    schematic: {},
    pcb: {},
  };
  for (let j = 0; j < xml[0].view.length; j++) {
    switch (xml[0].view[j].$.name) {
      case 'breadboardView':
        views.breadboard = {
          name: xml[0].view[j].$.name,
          backgroundColor: xml[0].view[j].$.backgroundColor,
          gridSize: xml[0].view[j].$.gridSize,
          showGrid: xml[0].view[j].$.showGrid,
          alignToGrid: xml[0].view[j].$.alignToGrid,
          viewFromBelow: xml[0].view[j].$.viewFromBelow,
        };
        break;

      case 'schematicView':
        views.schematic = {
          name: xml[0].view[j].$.name,
          backgroundColor: xml[0].view[j].$.backgroundColor,
          gridSize: xml[0].view[j].$.gridSize,
          showGrid: xml[0].view[j].$.showGrid,
          alignToGrid: xml[0].view[j].$.alignToGrid,
          viewFromBelow: xml[0].view[j].$.viewFromBelow,
        };
        break;

      case 'pcbView':
        views.pcb = {
          name: xml[0].view[j].$.name,
          backgroundColor: xml[0].view[j].$.backgroundColor,
          gridSize: xml[0].view[j].$.gridSize,
          showGrid: xml[0].view[j].$.showGrid,
          alignToGrid: xml[0].view[j].$.alignToGrid,
          viewFromBelow: xml[0].view[j].$.viewFromBelow,
          gpgKeepout: xml[0].view[j].$.gpgKeepout,
          autorouteViaHoleSize: xml[0].view[j].$.autorouteViaHoleSize,
          autorouteTraceWidth: xml[0].view[j].$.autorouteTraceWidth,
          autorouteViaRingThickness: xml[0].view[j].$.autorouteViaRingThickness,
          drcKeepout: xml[0].view[j].$.drcKeepout,
        };
        break;
    }
  }
  return views;
}

function parseFZView(xml) {
  let view = new FZView();
  view.name = xml.$.name;
  view.backgroundColor = xml.$.backgroundColor;
  view.gridSize = xml.$.gridSize;
  view.showGrid = xml.$.showGrid;
  view.alignToGrid = xml.$.alignToGrid;
  view.viewFromBelow = xml.$.viewFromBelow;
  view.gpgKeepout = xml.$.gpgKeepout;
  view.autorouteViaHoleSize = xml.$.autorouteViaHoleSize;
  view.autorouteTraceWidth = xml.$.autorouteTraceWidth;
  view.autorouteViaRingThickness = xml.$.autorouteViaRingThickness;
  view.drcKeepout = xml.$.drcKeepout;
  return view;
}

// function parseFZInstances(xml) {
//   // console.log('parseFZInstances', xml);
//
//   let instances = [];
//
//   for (let i = 0; i < xml.childNodes.length; i++) {
//     let tmpNode = xml.childNodes[i];
//     // console.log('view', tmpNode);
//
//     if (tmpNode.nodeName === 'instance') {
//       // console.log(tmpNode);
//
//       let tmpInstance = {
//           moduleIdRef: '',
//           modelIndex: '',
//           path: '',
//           property: {
//             name: '',
//             value: '',
//           },
//           title: '',
//           views: {
//             breadboardView: undefined,
//             pcbView: undefined,
//             schematicView: undefined,
//           },
//       };
//
//       // get the attributes of the instance tag...
//       // console.log('attributes', tmpNode.attributes);
//       for (let a = 0; a < tmpNode.attributes.length; a++) {
//         let tmpAttr = tmpNode.attributes[a];
//         switch (tmpAttr.name) {
//           case 'moduleIdRef':
//             tmpInstance.moduleIdRef = tmpAttr.nodeValue;
//             break;
//           case 'modelIndex':
//             tmpInstance.modelIndex = tmpAttr.nodeValue;
//             break;
//           case 'path':
//             tmpInstance.path = tmpAttr.nodeValue;
//             break;
//         }
//       }
//
//       // get the instance tag childs...
//       // console.log(tmpNode.childNodes);
//       for (let j = 0; j < tmpNode.childNodes.length; j++) {
//         // console.log('--', j, tmpNode.childNodes[j]);
//         switch (tmpNode.childNodes[j].nodeName) {
//           // get property...
//           case 'property':
//             var tmpProp = tmpNode.childNodes[j];
//             // console.log('tmpProp:', tmpProp);
//             // get attributes...
//             for (let pa = 0; pa < tmpProp.attributes.length; pa++) {
//               // console.log(tmpProp.attributes[pa]);
//               switch (tmpProp.attributes[pa].name) {
//                 case 'name':
//                   tmpInstance.property.name = tmpProp.attributes[pa].nodeValue;
//                   break;
//                 case 'value':
//                   tmpInstance.property.value = tmpProp.attributes[pa].nodeValue;
//                   break;
//               }
//             }
//             break;
//
//           // get title...
//           case 'title':
//             // console.log('TITLE', tmpNode.childNodes[j].innerHTML);
//             tmpInstance.title = tmpNode.childNodes[j].innerHTML;
//             break;
//
//           // get views...
//           case 'views':
//             tmpInstance.views = parseFZInstancesViews(tmpNode.childNodes[j]);
//             break;
//         }
//       }
//
//       instances.push(tmpInstance);
//     }
//   }
//
//   return instances;
// }

function parseFZInstancesViews(xml) {
  // console.log('call parseFZInstancesViews', xml);
  let tmpViews = {
    breadboardView: undefined,
    pcbView: undefined,
    schematicView: undefined,
  };


  for (var i = 0; i < xml.childNodes.length; i++) {
    let tmpNode = xml.childNodes[i];
    // console.log(tmpNode.nodeName);

    let tmpInstanceView = {
      layer: '',
      geometry: {
        x: 0,
        y: 0,
        z: 0,
      },
      connectors: [],
    };

    switch (tmpNode.nodeName) {
      case 'breadboardView':

        // console.log('BB', tmpNode.childNodes);
        for (let ib = 0; ib < tmpNode.childNodes.length; ib++) {
          // console.log(tmpNode.childNodes[ib]);
          switch (tmpNode.childNodes[ib].nodeName) {
            case 'geometry':
              // console.log('X', 'Y', tmpNode.childNodes[ib].attributes);
              for (var i = 0; i < tmpNode.childNodes[ib].attributes.length; i++) {
                let tmpAttr = tmpNode.childNodes[ib].attributes[i];
                // console.log(tmpAttr);
                switch (tmpAttr.name) {
                  case 'x':
                    tmpInstanceView.geometry.x = tmpAttr.nodeValue;
                    break;
                  case 'y':
                    tmpInstanceView.geometry.y = tmpAttr.nodeValue;
                    break;
                  case 'z':
                    tmpInstanceView.geometry.z = tmpAttr.nodeValue;
                    break;
                }
              }
              break;

            case 'connectors':
            var tmpCons = tmpNode.childNodes[ib].childNodes;
              // console.log(tmpCons);
              for (let ic = 0; ic < tmpCons.length; ic++) {
                switch (tmpCons[ic].nodeName) {
                  case 'connector':
                    // console.log('CON', tmpCons[ic]);

                    break;
                  default:
                }
              }
              break;
          }
        }
        tmpViews.breadboardView = tmpInstanceView;

        break;
    }
  }

  return tmpViews;
}

module.exports = {FZ, parseFZ};
