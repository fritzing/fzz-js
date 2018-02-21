const parseXml = require('xml2js').parseString;
const FZBoard = require('./fz-board');
const FZView = require('./fz-view');
const FZInstance = require('./fz-instance');

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
    this.views = {}; //
    this.code = {};
    this.svgs = {};
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
      if (xmlDoc.module.instances) tmpFZ.instances = parseFZInstances(xmlDoc.module.instances)

      // tmpFZ.programs = parseFZPrograms(xmlDoc.module.programs);
    }

    cb(null, tmpFZ);
  });
}

function parseFZInstances(xml) {
  let instances = [];
  for (let i = 0; i < xml.length; i++) {
    for (var j = 0; j < xml[i].instance.length; j++) {
      instances.push(parseFZInstance(xml[i].instance[j]));
    }
  }
  return instances;
}

function parseFZInstance(xml) {
  let instance = new FZInstance();
  instance.moduleIdRef = xml.$.moduleIdRef
  instance.modelIndex =xml.$.modelIndex
  instance.path = xml.$.path
  instance.property = xml.property
  instance.title = xml.title
  if (xml.views[0].breadboardView) instance.views.breadboard = xml.views[0].breadboardView
  if (xml.views[0].pcbView) instance.views.pcb = xml.views[0].pcbView
  if (xml.views[0].schematicView) instance.views.schematic = xml.views[0].schematicView
  return instance;
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
  let views = [];
  for (let i = 0; i < xml.length; i++) {
    for (let j = 0; j < xml[i].view.length; j++) {
      views.push(parseFZView(xml[i].view[j]));
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
