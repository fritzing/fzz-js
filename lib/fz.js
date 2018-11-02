/**
* BUILD ARTIFACT, DO NOT EDIT BY HAND
**/'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parseXml = require('xml2js').parseString;

/**
 * the FZ constructor
 *
 */

var FZ = function () {
  /**
   *
   */
  function FZ(uri) {
    _classCallCheck(this, FZ);

    this.xml = undefined; // store the raw xml data
    this.filename = uri || ''; // store the fzz filename
    this.fritzingVersion = '';
    this.boards = []; // list of FZBoard items
    this.programs = {}; // list of FZProgram items
    this.instances = {}; //
    this.views = {}; //
  }
  /**
   * get the BOM
   */


  _createClass(FZ, [{
    key: 'getBOM',
    value: function getBOM() {
      var bomData = [];
      for (var i = 0; i < this.fz.instances.length; i++) {
        // console.log(this.fz.instances[i]);
        if (this.fz.instances[i].moduleIdRef !== 'WireModuleID' && this.fz.instances[i].moduleIdRef !== 'LogoImageModuleID') {
          var bomItem = {
            moduleIdRef: this.fz.instances[i].moduleIdRef,
            active: true
          };
          bomData.push(bomItem);
        }
      }
      return bomData;
    }
  }]);

  return FZ;
}();

/**
 */


var FZBoard =
/**
 * the FZBoard constructor
 */
function FZBoard() {
  _classCallCheck(this, FZBoard);

  this.moduleId = '';
  this.title = '';
  this.instance = '';
  this.width = '';
  this.height = '';
};

/**
 */


var FZProgram =
/**
 * the FZProgram constructor
 */
function FZProgram() {
  _classCallCheck(this, FZProgram);

  this.language = '';
  this.source = '';
};

// parse fz xml data and return a FZ object.


function parseFZ(filename, src, cb) {
  var tmpFZ = new FZ();
  tmpFZ.filename = filename;
  tmpFZ.xml = src;

  parseXml(src, function (err, xmlDoc) {
    // if (xmlDoc) {
    // console.log('#-------------------------------------');
    // // console.log(JSON.stringify(xmlDoc, '', '  '));
    // console.log(xmlDoc);
    // console.log('#-------------------------------------');

    // tmpFZ.fritzingVersion = xmlDoc.module.$.fritzingVersion
    //
    // var tmpXML = xmlDoc.documentElement.childNodes;
    // console.log(tmpXML);
    //   for (var i = 0; i < tmpXML.length; i++) {
    //     // console.log(tmpXML[i].nodeName);
    //
    //     switch (tmpXML[i].nodeName) {
    //       case 'boards':
    // tmpFZ.boards = parseFZBoards(xmlDoc.module.boards);
    //         break;
    //
    //       case 'programs':
    // tmpFZ.programs = parseFZPrograms(xmlDoc.module.programs);
    //         break;
    //
    //       case 'views':
    // tmpFZ.views = parseFZViews(xmlDoc.module.views);
    //         break;
    //
    //       case 'instances':
    // tmpFZ.instances = parseFZInstances(xmlDoc.module.instances);
    //         break;
    //
    //       default:
    //       // console.log(tmpXML[i]);
    //     }
    //
    //   }
    //
    // }
    //
    // // console.log(tmpFZ);
    // return tmpFZ;

    cb(xmlDoc);
  });
}

function parseFZBoards(xml) {
  // console.log('parseFZBoards', xml);
  var tmpNodes = xml.childNodes;
  // console.log('BOARD', tmpNodes.length, tmpNodes);

  var tmpBoards = [];

  for (var j = 0; j < tmpNodes.length; j++) {
    // console.log(tmpNodes[j]);
    if (tmpNodes[j].nodeName === 'board') {
      // console.log(tmpNodes[j].attributes);

      var tmpBoard = new FZBoard();
      var tmpAttr = tmpNodes[j].attributes;
      for (var a = 0; a < tmpAttr.length; a++) {
        // console.log(tmpAttr[a]);
        switch (tmpAttr[a].name) {
          case 'moduleId':
            tmpBoard.moduleId = tmpAttr[a].nodeValue;
            // console.log('tmpBoard.moduleId', tmpBoard.moduleId);
            break;
          case 'title':
            tmpBoard.title = tmpAttr[a].nodeValue;
            break;
          case 'instance':
            tmpBoard.instance = tmpAttr[a].nodeValue;
            break;
          case 'width':
            // TODO: parse measurement
            tmpBoard.width = tmpAttr[a].nodeValue;
            break;
          case 'height':
            // TODO: parse measurement
            tmpBoard.height = tmpAttr[a].nodeValue;
            break;
          default:
        }
      }
      tmpBoards.push(tmpBoard);
    }
  }
  // console.log('tmpBoards:', tmpBoards);
  return tmpBoards;
}

function parseFZPrograms(xml) {
  // console.log('parseFZPrograms', xml);
  var programs = [];
  for (var i = 0; i < xml.childNodes.length; i++) {
    var tmpNode = xml.childNodes[i];
    // console.log('view', tmpNode);
    if (tmpNode.nodeName === 'program') {
      // console.log(tmpNode);

      var tmpProgram = new FZProgram();
      tmpProgram.source = tmpNode.innerHTML;

      for (var a = 0; a < tmpNode.attributes.length; a++) {
        var tmpAttr = tmpNode.attributes[a];
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
  // console.log('parseFZViews', xml);

  // the object we want to return
  var views = [];

  for (var i = 0; i < xml.childNodes.length; i++) {
    var tmpNode = xml.childNodes[i];
    // console.log('view', tmpNode);

    if (tmpNode.nodeName === 'view') {
      // console.log('attributes', tmpNode.attributes);

      // the view data we push to the views variable
      var tmpView = {
        name: '',
        backgroundColor: '',
        gridSize: '',
        showGrid: true,
        alignToGrid: true,
        viewFromBelow: false,
        gpgKeepout: '',
        autorouteViaHoleSize: '',
        autorouteTraceWidth: '',
        autorouteViaRingThickness: '',
        drcKeepout: ''
      };

      for (var a = 0; a < tmpNode.attributes.length; a++) {
        var tmpAttr = tmpNode.attributes[a];
        switch (tmpAttr.name) {
          case 'name':
            tmpView.name = tmpAttr.nodeValue;
            break;

          case 'backgroundColor':
            tmpView.backgroundColor = tmpAttr.nodeValue;
            break;

          case 'gridSize':
            tmpView.gridSize = tmpAttr.nodeValue;
            break;

          case 'showGrid':
            tmpView.showGrid = tmpAttr.nodeValue;
            break;

          case 'alignToGrid':
            tmpView.alignToGrid = tmpAttr.nodeValue;
            break;

          case 'viewFromBelow':
            tmpView.viewFromBelow = tmpAttr;
            break;
        }
      }

      views.push(tmpView);
    }
  }

  return views;
}

function parseFZInstances(xml) {
  // console.log('parseFZInstances', xml);

  var instances = [];

  for (var i = 0; i < xml.childNodes.length; i++) {
    var tmpNode = xml.childNodes[i];
    // console.log('view', tmpNode);

    if (tmpNode.nodeName === 'instance') {
      // console.log(tmpNode);

      var tmpInstance = {
        moduleIdRef: '',
        modelIndex: '',
        path: '',
        property: {
          name: '',
          value: ''
        },
        title: '',
        views: {
          breadboardView: undefined,
          pcbView: undefined,
          schematicView: undefined
        }
      };

      // get the attributes of the instance tag...
      // console.log('attributes', tmpNode.attributes);
      for (var a = 0; a < tmpNode.attributes.length; a++) {
        var tmpAttr = tmpNode.attributes[a];
        switch (tmpAttr.name) {
          case 'moduleIdRef':
            tmpInstance.moduleIdRef = tmpAttr.nodeValue;
            break;
          case 'modelIndex':
            tmpInstance.modelIndex = tmpAttr.nodeValue;
            break;
          case 'path':
            tmpInstance.path = tmpAttr.nodeValue;
            break;
        }
      }

      // get the instance tag childs...
      // console.log(tmpNode.childNodes);
      for (var j = 0; j < tmpNode.childNodes.length; j++) {
        // console.log('--', j, tmpNode.childNodes[j]);
        switch (tmpNode.childNodes[j].nodeName) {
          // get property...
          case 'property':
            var tmpProp = tmpNode.childNodes[j];
            // console.log('tmpProp:', tmpProp);
            // get attributes...
            for (var pa = 0; pa < tmpProp.attributes.length; pa++) {
              // console.log(tmpProp.attributes[pa]);
              switch (tmpProp.attributes[pa].name) {
                case 'name':
                  tmpInstance.property.name = tmpProp.attributes[pa].nodeValue;
                  break;
                case 'value':
                  tmpInstance.property.value = tmpProp.attributes[pa].nodeValue;
                  break;
              }
            }
            break;

          // get title...
          case 'title':
            // console.log('TITLE', tmpNode.childNodes[j].innerHTML);
            tmpInstance.title = tmpNode.childNodes[j].innerHTML;
            break;

          // get views...
          case 'views':
            tmpInstance.views = parseFZInstancesViews(tmpNode.childNodes[j]);
            break;
        }
      }

      instances.push(tmpInstance);
    }
  }

  return instances;
}

function parseFZInstancesViews(xml) {
  // console.log('call parseFZInstancesViews', xml);
  var tmpViews = {
    breadboardView: undefined,
    pcbView: undefined,
    schematicView: undefined
  };

  for (var i = 0; i < xml.childNodes.length; i++) {
    var tmpNode = xml.childNodes[i];
    // console.log(tmpNode.nodeName);

    var tmpInstanceView = {
      layer: '',
      geometry: {
        x: 0,
        y: 0,
        z: 0
      },
      connectors: []
    };

    switch (tmpNode.nodeName) {
      case 'breadboardView':

        // console.log('BB', tmpNode.childNodes);
        for (var ib = 0; ib < tmpNode.childNodes.length; ib++) {
          // console.log(tmpNode.childNodes[ib]);
          switch (tmpNode.childNodes[ib].nodeName) {
            case 'geometry':
              // console.log('X', 'Y', tmpNode.childNodes[ib].attributes);
              for (var i = 0; i < tmpNode.childNodes[ib].attributes.length; i++) {
                var tmpAttr = tmpNode.childNodes[ib].attributes[i];
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
              for (var ic = 0; ic < tmpCons.length; ic++) {
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

module.exports = {
  FZ: FZ,
  FZBoard: FZBoard,
  FZProgram: FZProgram,
  parseFZ: parseFZ
};